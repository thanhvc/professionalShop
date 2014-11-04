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
