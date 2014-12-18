
/**
 * Created by David Verdú on 17/12/14.
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

exports.change_password_fixture = function() {
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
                name: 'Pending user',
                surname: '',
                creation_date: '2014-10-06',
                address: 'The wall',
                city: 'North',
                zip_code: 'Fr3zz3',
                email_address: 'pending.user@foo.bar',
                sha_password: "\\x" + sha512("phantom").toString('hex'),
                status: 0,
                sign_up_token: '111111111KAOPMMGFNL8',
                country_code: 'ES'
            }
        },
        {
            type: 'insert',
            table: 'users',
            values: {
                id: 2,
                name: 'Registered user',
                surname: '',
                creation_date: '2014-10-06',
                address: 'The wall',
                city: 'North',
                zip_code: 'Fr3zz3',
                email_address: 'registered.user@foo.bar',
                sha_password: "\\x" + sha512("phantom").toString('hex'),
                status: 1,
                sign_up_token: '00001111222233334444',
                change_password_date: '2014-11-17 11:00:00',
                country_code: 'ES'
            }
        },
        {
            type: 'insert',
            table: 'users',
            values: {
                id: 3,
                name: 'Expired user',
                surname: '',
                creation_date: '2014-10-06',
                address: 'The wall',
                city: 'North',
                zip_code: 'Fr3zz3',
                email_address: 'expired.user@foo.bar',
                sha_password: "\\x" + sha512("phantom").toString('hex'),
                status: 2,
                country_code: 'ES'
            }
        },
        {
            type: 'insert',
            table: 'users',
            values: {
                id: 4,
                name: 'Ontime user',
                surname: '',
                creation_date: '2014-11-17',
                address: 'The wall',
                city: 'North',
                zip_code: 'Fr3zz3',
                email_address: 'ontime.user@foo.bar',
                sha_password: "\\x" + sha512("phantom").toString('hex'),
                status: 1,
                sign_up_token: 'LVK567V01KAOPMMGFNL8',
                change_password_date: '2014-11-17 09:30:00',
                country_code: 'ES'
            }
        },
        {
            type: 'insert',
            table: 'users',
            values: {
                id: 5,
                name: 'out_of_time user',
                surname: '',
                creation_date: '2014-10-06',
                address: 'The wall',
                city: 'North',
                zip_code: 'Fr3zz3',
                email_address: 'out_of_time.user@foo.bar',
                sha_password: "\\x" + sha512("phantom").toString('hex'),
                status: 1,
                sign_up_token: 'ABCD1111222233334444',
                change_password_date: '2014-11-17 06:30',
                country_code: 'ES'
            }
        },
        {
            type: 'insert',
            table: 'free_subscription',
            values: {
                id: 1,
                free_pack_code: '11',
                subscription_date: '2014-11-17',
                start_date: '2014-11-17',
                end_date: '2014-12-05',
                user_id: 4
            }
        }
    ];
};

exports.remove_change_password_fixture = function() {
    return [
        {
            type: 'remove',
            table: 'free_subscription'
        },
        {
            type: 'remove',
            table: 'email_log'
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

exports.select_user_fixture = function(conditions) {
    var conditions = conditions || {};
    return {
            type: 'select',
            table: 'users',
            //fields: ['id','name','surname','address','city','email_address'],
            condition: conditions
        };
};

exports.select_email_log_fixture = function(conditions) {
    var conditions = conditions || {};
    return {
            type: 'select',
            table: 'email_log',
            //fields: ['id','name','surname','address','city','email_address'],
            condition: conditions
        };
};

exports.select_free_subscription_fixture = function(conditions) {
    var conditions = conditions || {};
    return {
            type: 'select',
            table: 'free_subscription',
            //fields: ['id','name','surname','address','city','email_address'],
            condition: conditions
        };
};

