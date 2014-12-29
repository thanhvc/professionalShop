
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
            table: 'pack',
            values: {
                code: 'USA-S-3',
                region_code: 'USA',
                name: 'Estados Unidos Pack III',
                product_type: 0,
                publication_date: '2014-07-04',
                scope_text: 'Estados Unidos Pack III text',
                pattern_type: 0,
                subname: ' '
            }
        },
        {
            type: 'insert',
            table: 'pack',
            values: {
                code: 'USA-S-4',
                region_code: 'USA',
                name: 'Estados Unidos Unsubscribed Pack IV',
                product_type: 0,
                publication_date: '2014-07-04',
                scope_text: 'Estados Unidos Unsubscribed Pack IV text',
                pattern_type: 0,
                subname: ' '
            }
        },
        { //PAIR PACKS
            type: 'insert',
            table: 'pack',
            values: {
                code: 'USA-P-1',
                region_code: 'USA',
                name: 'Estados Unidos Pair Pack I',
                product_type: 0,
                publication_date: '2014-07-04',
                scope_text: 'Estados Unidos Pack I text',
                pattern_type: 1,
                subname: ' '
            }
        },
        {
            type: 'insert',
            table: 'pack',
            values: {
                code: 'USA-P-2',
                region_code: 'USA',
                name: 'Estados Unidos Pair Pack II',
                product_type: 0,
                publication_date: '2014-07-04',
                scope_text: 'Estados Unidos Pack II text',
                pattern_type: 1,
                subname: ' '
            }
        },
        {
            type: 'insert',
            table: 'pack',
            values: {
                code: 'USA-P-3',
                region_code: 'USA',
                name: 'Estados Unidos Unsubscribed Pair Pack III',
                product_type: 0,
                publication_date: '2014-07-04',
                scope_text: 'Estados Unidos Unsubscribed Pair Pack III text',
                pattern_type: 1,
                subname: ' '
            }
        },
        {
            type: 'insert',
            table: 'subscription',
            values: {
                subscription_disc: 1,
                id: 1,
                pack_code: 'USA-S-1',
                user_id: 1, //Test1 user
                subscription_date: '2013-11-01',
                start_date: '2013-11-01',
                subscription_duration: 2, //YEAR SUBSCRIPTION
                end_date: '2014-12-01',
                status: 0
            }
        },
        {
            type: 'insert',
            table: 'subscription',
            values: {
                subscription_disc: 1,
                id: 2,
                pack_code: 'USA-S-2',
                user_id: 1, //Test1 user
                subscription_date: '2014-09-01',
                start_date: '2014-09-01',
                subscription_duration: 1, //TRIMESTRAL SUBSCRIPTION
                end_date: '2014-12-01',
                status: 0
            }
        },
        {
            type: 'insert',
            table: 'subscription',
            values: {
                subscription_disc: 1,
                id: 3,
                pack_code: 'USA-S-3',
                user_id: 1, //Test1 user
                subscription_date: '2014-10-01',
                start_date: '2014-10-01',
                subscription_duration: 1, //TRIMESTRAL SUBSCRIPTION
                end_date: '2015-01-01',
                status: 0
            }
        },
        {
            type: 'insert',
            table: 'subscription',
            values: {
                subscription_disc: 1,
                id: 4,
                pack_code: 'USA-P-1',
                user_id: 1, //Test1 user
                subscription_date: '2014-11-01',
                start_date: '2014-11-01',
                subscription_duration: 0, //MONTHLY SUBSCRIPTION
                end_date: '2014-12-01',
                status: 0
            }
        },
        {
            type: 'insert',
            table: 'subscription',
            values: {
                subscription_disc: 1,
                id: 5,
                pack_code: 'USA-P-1',
                user_id: 2, //Test2 user
                subscription_date: '2013-11-01',
                start_date: '2013-11-01',
                subscription_duration: 2, //ANUAL SUBSCRIPTION
                end_date: '2014-12-01',
                status: 0
            }
        },
        {
            type: 'insert',
            table: 'subscription',
            values: {
                subscription_disc: 1,
                id: 6,
                pack_code: 'USA-P-2',
                user_id: 2, //Test2 user
                subscription_date: '2014-09-01',
                start_date: '2014-09-01',
                subscription_duration: 1, //TRIMESTRAL SUBSCRIPTION
                end_date: '2014-12-01',
                status: 0
            }
        },
        {
            type: 'insert',
            table: 'subscription',
            values: {
                subscription_disc: 1,
                id: 7,
                pack_code: 'USA-S-2',
                user_id: 2, //Test2 user
                subscription_date: '2014-10-01',
                start_date: '2014-10-01',
                subscription_duration: 1, //TRIMESTRAL SUBSCRIPTION
                end_date: '2015-01-01',
                status: 0
            }
        },
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
            table: 'users'
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
            type:'remove',
            table: 'exchange'
        },
        {
            type:'remove',
            table: 'currency'
        },
        {
            type: 'remove',
            table: 'pack'
        },
        {
            type: 'remove',
            table: 'region'
        },
        {
            type: 'remove',
            table: 'country'
        },
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

