/**
 * Created by robgon on 29/10/14.
 */
'use strict';

var sha512 = require('sha512')
var loadFixture = require('../load-fixture.js')

function sleep(ms) {
    var unixtime_ms = new Date().getTime();
    while(new Date().getTime() < unixtime_ms + ms) {}
}

//constructor
var FixtureGenerator = function () {

};

FixtureGenerator.prototype = Object.create({}, {
        generateUser: {value: function (conString, email, password, name) {
            console.log("generating User");

              var  fixture = {
                    type: 'insert',
                    table: 'users',
                    values: {
                        id: 1,
                        name: (name == null ? 'John' : name),
                        surname: 'Snow',
                        creation_date: '10-06-2014',
                        address:'The wall',
                        city:'North',
                        zip_code:'Fr3zz3',
                        email_address: (email == null ? 'john.snow@thewall.north' : email),
                        sha_password: (password == null ? "\\x" + sha512("phantom").toString('hex') : "\\x" + sha512(password).toString('hex')),
                        status: 1
                    }
                }
                loadFixture.loadFixture(fixture,conString);
            sleep(5000);
            return fixture;

        }},
        generateRegion: {value: function(conString, code,name) {
            console.log("generatin Region--------");
            var conString = browser.params.sqlCon;
            var  fixture = {
                type: 'insert',
                table: 'region',
                values: {
                    code: (code == null ? 'REGION1' : code),
                    name: (name == null ? 'Region1' : name)
                }
            }
            loadFixture.loadFixture(fixture,conString);
            sleep(5000);
            return fixture;
        }},
        generatePack: {value: function(conString, code,name,regionCode) {
            console.log("generatin Pack--------");
            var conString = browser.params.sqlCon;
            var fixture = {
                type: 'insert',
                table: 'pack',
                values: {
                    code: (code == null ? 'PACK1' : code),
                    region_code: (regionCode == null ? 'REGION1': regionCode),
                    name: (name==null ? 'Pack Simple 1': name),
                    product_type: 0,
                    publication_date: '2014-07-04',
                    scope_text: 'Simple Pack 1 text',
                    pattern_type: 0,
                    subname: ' '
                }
            }
            loadFixture.loadFixture(fixture,conString);
            sleep(5000);
            return fixture;
        }}
    }

);

module.exports = FixtureGenerator