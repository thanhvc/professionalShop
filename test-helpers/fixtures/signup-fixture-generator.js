
/**
 * Created by David Verdú on 10/11/14.
 */
'use strict';

var sha512 = require('sha512')
var loadFixture = require('../load-fixture.js')

function sleep(ms) {
    var unixtime_ms = new Date().getTime();
    while (new Date().getTime() < unixtime_ms + ms) {
    }
}

//constructor
var FixtureGenerator = function () {

};

exports.signup_fixture = function() {
    return [
        {
            type: 'insert',
            table: 'country',
            values: {
                code: 'ES',
                name: 'Spain'
            }
        },
        {
            type: 'insert',
            table: 'region',
            values: {
                code: 'EUR',
                name: 'Zona EURO',
                area_code: 2
            }
        },
        {
            type: 'insert',
            table: 'free_pack',
            values: {
                code: '10',
                name: 'Free Pack',
                region_code: 'EUR',
                publication_date: '10-10-2014'
            }
        },
        {
            type: 'insert',
            table: 'free_pack',
            values: {
                code: '11',
                name: 'Latest Free Pack',
                region_code: 'EUR',
                publication_date: '10-11-2014'
            }
        },
        {
            type: 'insert',
            table: 'users',
            values: {
                id: 1,
                name: 'Pending',
                surname: 'User',
                creation_date: '10-06-2014',
                address: 'The wall',
                city: 'North',
                zip_code: 'Fr3zz3',
                email_address: 'pending.user@foo.bar',
                sha_password: "\\x" + sha512("phantom").toString('hex'),
                status: 0,
                country_code: 'ES'
            }
        },
        {
            type: 'insert',
            table: 'users',
            values: {
                id: 2,
                name: 'Registered',
                surname: 'User',
                creation_date: '10-06-2014',
                address: 'The wall',
                city: 'North',
                zip_code: 'Fr3zz3',
                email_address: 'registered.user@foo.bar',
                sha_password: "\\x" + sha512("phantom").toString('hex'),
                status: 1,
                country_code: 'ES'
            }
        },
        {
            type: 'insert',
            table: 'users',
            values: {
                id: 3,
                name: 'Expired',
                surname: 'User',
                creation_date: '10-06-2014',
                address: 'The wall',
                city: 'North',
                zip_code: 'Fr3zz3',
                email_address: 'expired.user@foo.bar',
                sha_password: "\\x" + sha512("phantom").toString('hex'),
                status: 2,
                country_code: 'ES'
            }
        }
    ];
};

exports.remove_signup_fixture = function() {
    return [
        {
            type: 'remove',
            table: 'free_subscription'
        },
        {
            type: 'remove',
            table: 'free_pack'
        },
        {
            type: 'remove',
            table: 'users'
        },
        {
            type: 'remove',
            table: 'region'
        },
        {
            type: 'remove',
            table: 'country'
        }
    ];
};

