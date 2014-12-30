
/**
 * Created by David Verdú on 29/12/14.
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

exports.end_free_pack_mail_fixture = function() {
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
            table: 'region',
            values: {
                code: 'CAN',
                name: 'Canada',
                area_code: 0
            }
        },
        {
            type: 'insert',
            table: 'region',
            values: {
                code: 'USA',
                name: 'Estados Unidos',
                area_code: 0
            }
        },
        {
            type: 'insert',
            table: 'sector',
            values: {
                id: 'sector1 SECTOR CD',
                sector_group:'sector_group1'
            }
        },
        {
            type: 'insert',
            table: 'sector',
            values: {
                id: 'sector2 SECTOR CD',
                sector_group:'sector_group2'
            }
        },{
            type: 'insert',
            table: 'sector',
            values: {
                id: 'sector3 SECTOR CD',
                sector_group:'sector_group3'
            }
        },
        {
            type: 'insert',
            table: 'sector',
            values: {
                id: 'sector4 SECTOR CD',
                sector_group:'sector_group4'
            }
        },
        {
            type: 'insert',
            table: 'industry',
            values: {
                id: 'industry1 CD',
                sector_group:'sector_group1',
                sector_id: 'sector1 SECTOR CD'
            }
        },
        {
            type: 'insert',
            table: 'industry',
            values: {
                id: 'industry2 CD',
                sector_group:'sector_group2',
                sector_id: 'sector2 SECTOR CD'
            }
        },{
            type: 'insert',
            table: 'industry',
            values: {
                id: 'industry3 CD',
                sector_group:'sector_group3',
                sector_id: 'sector3 SECTOR CD'
            }
        },{
            type: 'insert',
            table: 'industry',
            values: {
                id: 'industry4 CD',
                sector_group:'sector_group4',
                sector_id: 'sector4 SECTOR CD'
            }
        },
        {
            type: 'insert',
            table: 'free_pack',
            values: {
                code: '11',
                name: 'Free Pack 1',
                region_code: 'EUR',
                publication_date: '10-11-2014'
            }
        },
        {
            type: 'insert',
            table: 'users',
            values: {
                id: 1,
                name: 'Test1 user',
                surname: '',
                creation_date: '2014-11-10',
                address: 'The wall',
                city: 'North',
                zip_code: 'Fr3zz3',
                email_address: 'test1.user@foo.bar',
                sha_password: "\\x" + sha512("phantom").toString('hex'),
                status: 1,
                country_code: 'ES'
            }
        },
        {
            type: 'insert',
            table: 'users',
            values: {
                id: 2,
                name: 'Test2 user',
                surname: '',
                creation_date: '2014-11-10',
                address: 'The wall',
                city: 'North',
                zip_code: 'Fr3zz3',
                email_address: 'test2.user@foo.bar',
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
                name: 'Test3 user',
                surname: '',
                creation_date: '2014-11-10',
                address: 'The wall',
                city: 'North',
                zip_code: 'Fr3zz3',
                email_address: 'test3.user@foo.bar',
                sha_password: "\\x" + sha512("phantom").toString('hex'),
                status: 1,
                country_code: 'ES'
            }
        },
        {
            type: 'insert',
            table: 'users',
            values: {
                id: 4,
                name: 'Test4 user',
                surname: '',
                creation_date: '2014-11-10',
                address: 'The wall',
                city: 'North',
                zip_code: 'Fr3zz3',
                email_address: 'test4.user@foo.bar',
                sha_password: "\\x" + sha512("phantom").toString('hex'),
                status: 1,
                country_code: 'ES'
            }
        },
        {  //simple packs
            type: 'insert',
            table: 'pack',
            values: {
                code: 'USA-S-1',
                region_code: 'USA',
                name: 'Estados Unidos Pack I',
                product_type: 0,
                publication_date: '2014-07-04',
                scope_text: 'Estados Unidos Pack I text',
                pattern_type: 0,
                subname: ' '
            }
        },
        {
            type: 'insert',
            table: 'pack',
            values: {
                code: 'USA-S-2',
                region_code: 'USA',
                name: 'Estados Unidos Pack II',
                product_type: 0,
                publication_date: '2014-07-04',
                scope_text: 'Estados Unidos Pack II text',
                pattern_type: 0,
                subname: ' '
            }
        },
        {
            type: 'insert',
            table: 'free_subscription',
            values: {
                id: 1,
                free_pack_code: '11',
                user_id: 1, //Test1 user
                subscription_date: '2014-11-02',
                start_date: '2014-11-02 20:00',
                end_date: '2014-11-16 20:00'
            }
        },
        {
            type: 'insert',
            table: 'free_subscription',
            values: {
                id: 2,
                free_pack_code: '11',
                user_id: 2, //Test2 user
                subscription_date: '2014-11-08',
                start_date: '2014-11-08 14:00',
                end_date: '2014-11-23 14:00'
            }
        },
        {
            type: 'insert',
            table: 'free_subscription',
            values: {
                id: 3,
                free_pack_code: '11',
                user_id: 3, //Test3 user
                subscription_date: '2014-10-30',
                start_date: '2014-10-30 13:00',
                end_date: '2014-11-14 13:00'
            }
        },
        {
            type: 'insert',
            table: 'free_subscription',
            values: {
                id: 4,
                free_pack_code: '11',
                user_id: 4, //Test4 user
                subscription_date: '2014-11-02',
                start_date: '2014-11-02 10:00',
                end_date: '2014-11-16 10:00'
            }
        }
    ];
};

exports.remove_end_free_pack_mail_fixture = function() {
    return [
        {
            type: 'remove',
            table: 'industry'
        },
        {
            type: 'remove',
            table: 'sector'
        },
        {
            type: 'remove',
            table: 'email_log'
        },
        {
            type: 'remove',
            table: 'bill'
        },
        {
            type: 'remove',
            table: 'payment_item'
        },
        {
            type: 'remove',
            table: 'payment'
        },
        {
            type: 'remove',
            table: 'subscription'
        },
        {
            type: 'remove',
            table: 'published_packs'
        },
        {
            type: 'remove',
            table: 'pattern'
        },
        {
            type: 'remove',
            table: 'asset'
        },
        {
            type: 'remove',
            table: 'exchange'
        },
        {
            type: 'remove',
            table: 'currency'
        },
        {
            type: 'remove',
            table: 'pack'
        },
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

