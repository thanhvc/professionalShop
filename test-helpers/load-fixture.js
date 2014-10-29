/**
 * Created by aitor on 21/10/14.
 */
var jsonSql = require('json-sql')();
var pg = require('pg');

/*var*/  exports.loadFixture = function(fixture,conString){
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

exports.loadMultipleFixture = function(fixture1,fixture2,conString) {
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
            client.end();
            });
        });
    });
}
//module.exports = loadFixture;