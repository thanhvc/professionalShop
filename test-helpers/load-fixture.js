/**
 * Created by aitor on 21/10/14.
 */
var jsonSql = require('json-sql')();
var pg = require('pg');


var rollback = function(client, done) {
    client.query('ROLLBACK', function(err) {
        //if there was a problem rolling back the query
        //something is seriously messed up.  Return the error
        //to the done function to close & remove this client from
        //the pool.  If you leave a client in the pool with an unaborted
        //transaction weird, hard to diagnose problems might happen.
        return done(err);
    });
};


/*var*/

exports.loadFixture = function(fixture,conString){
    jsonSql.configure({namedValues:false});
    sql = jsonSql.build(fixture);
    console.log(sql.query);
    console.log(sql.values);
    var client = new pg.Client(conString);
    client.connect(function(err) {
        if(err) {
            return console.error('could not connect to postgres', err);
        }
        client.query(sql.query,sql.values, function(err, result) {
            if(err) {
                return console.error('error running query', err);
            }
            console.log(result);
            client.end();
        });
    });
};

/* --TRANSACTIONAL
exports.loadFixture = function (fixture, conString) {
    jsonSql.configure({namedValues: false});
    sql = jsonSql.build(fixture);
    console.log(sql.query);
    console.log(sql.values);
    var client = new pg.Client(conString);
    client.connect();
    var rollback = function(client) {
        //terminating a client connection will
        //automatically rollback any uncommitted transactions
        //so while it's not technically mandatory to call
        //ROLLBACK it is cleaner and more correct
        client.query('ROLLBACK', function() {
            client.end();
        });
    };
    client.query('BEGIN', function(err, result) {
        if(err) return rollback(client);
        client.query(sql.query,sql.values, function(err, result) {
            if(err) return rollback(client);
                client.query('COMMIT', client.end.bind(client));
            });
    });
};*/

/*exports.loadMultipleFixture = function(fixture1,fixture2,conString) {
    console.log("Generation first Fixture---");
    jsonSql.configure({namedValues:false});
    sql = jsonSql.build(fixture1);
    sql2 = jsonSql.build(fixture2);
    console.log(sql.query);
    console.log(sql.values);
    var client = new pg.Client(conString);
    client.connect(function(err) {
        if(err) {
            return console.error('could not connect to postgres', err);
        }
        client.query(sql.query,sql.values, function(err, result) {
            if(err) {
                return console.error('error running query', err);
            } else {
                console.error("first FIXTURE SUCCESS--------");
            }
            client.query(sql2.query,sql2.values, function(err, result) {
                if(err) {
                    return console.error('error running query', err);
                } else {
                    console.error("second FIXTURE SUCCESS--------");
                }

            console.log(result);
            client.end(  pg.connect(function (err, client, done) {);
            });
        });
    });
}*/


exports.loadMultipleFixture = function(fixtures,conString) {
    console.log("Generation first Fixture---");
    jsonSql.configure({namedValues:false});
    sql = jsonSql.build(fixture1);
    sql2 = jsonSql.build(fixture2);
    console.log(sql.query);
    console.log(sql.values);
    //var client = new pg.Client(conString);
    pg.connect(function (err, client, done) {
        if (err) {
            return console.error('could not connect to postgres', err);
        }
        client.query(sql.query, sql.values, function (err, result) {
           // done();
            if (err) {
                return console.error('error running query', err);
            } else {
                console.error("first FIXTURE SUCCESS--------");
            }
            console.log("second Fitures...");
            console.log(sql.query);
            console.log(sql.values);
            pg.connect(function (err, client, done) {
                client.query(sql2.query, sql2.values, function (err, result) {
                    done();
                    if (err) {
                        return console.error('error running query', err);
                    } else {
                        console.error("second FIXTURE SUCCESS--------");
                    }

                    console.log(result);
                    done();
                });
            });
        });
    });
}

exports.executeQueries = function (fixtures,conString) {
    var client = new pg.Client(conString);
    jsonSql.configure({namedValues:false});
    //create a list of queries
    var length = 0;
    var queries = [];
    for (i= 0;i< fixtures.length; i++) {
        queries[i] =  jsonSql.build(fixtures[i]);
    }

    client.connect();

    var rollback = function (client) {
        //terminating a client connection will
        //automatically rollback any uncommitted transactions
        //so while it's not technically mandatory to call
        //ROLLBACK it is cleaner and more correct
        client.query('ROLLBACK', function () {
            client.end();
        });
    };

    var nextQuery = function (client, queries, i) {
        if (i == queries.length - 1) {
            client.query(queries[i].query, queries[i].values, function (err, result) {
                console.log(" query:" + queries[i].query);
                console.log(" values:" + queries[i].values);
                if (err) {
                    console.error('error running query', err);
                    return rollback(client);
                } //disconnect after successful commit
                client.query('COMMIT', client.end.bind(client));
            });
        } else {
            client.query(queries[i].query, queries[i].values, function (err, result) {
                console.log(" query:" + queries[i].query);
                console.log(" values:" + queries[i].values);
                if (err) {
                    console.error('error running query', err);
                    return rollback(client);
                } //disconnect after successful commit
                nextQuery(client, queries,++i);
            });
        }

    };

    client.query('BEGIN', function (err, result) {
        if (err) {
            console.error('error running query', err);
            return rollback(client);
        }
        nextQuery(client,queries,0);
    });
}

/*

 exports.tryConnect = function (conString) {
 var client = new pg.Client(conString);

 client.connect();

 var rollback = function (client) {
 //terminating a client connection will
 //automatically rollback any uncommitted transactions
 //so while it's not technically mandatory to call
 //ROLLBACK it is cleaner and more correct
 client.query('ROLLBACK', function () {
 client.end();
 });
 };

 client.query('BEGIN', function (err, result) {
 if (err) return rollback(client);
 client.query('INSERT INTO region(code,name) VALUES($1,$2)', ['R1','reg1'], function (err, result) {
 console.log("insert REGION - ");
 if (err) {
 return rollback(client);
 }
 client.query('INSERT INTO pack(code,region_code,name,product_type,publication_date,scope_text,pattern_type)' +
 ' VALUES($1,$2,$3,$4,$5,$6,$7) ', ['P1','R1','Pack s1',0,'2014-07-04','simple1',0], function (err, result) {
 console.log("insert PACK - ");
 if (err) {
 return rollback(client);
 }
 //disconnect after successful commit
 client.query('COMMIT', client.end.bind(client));
 });
 });
 });
 }*/
//module.exports = loadFixture;