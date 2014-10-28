/**
 * Created by aitor on 21/10/14.
 */
var jsonSql = require('json-sql')();
var pg = require('pg');

var loadFixture = function(fixture,conString){
    jsonSql.configure({namedValues:false})
    sql = jsonSql.build(fixture)
    console.log(sql.query)
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
}
module.exports = loadFixture;