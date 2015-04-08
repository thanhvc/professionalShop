
/**
 * Created by David Verdú on 12/03/15.
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

exports.login_fixture = function() {
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
                code: 'USA',
                name: 'Zona USA',
                area_code: 2
            }
        },
        {
            type: 'insert',
            table: 'currency',
            values: {
                code: 'CU1',
                symbol:'CU1',
                name:'Currency1'
            }
        },
        {
            type: 'insert',
            table: 'exchange',
            values: {
                symbol: 'EX1',
                name: 'exchangeUSA1',
                currency_code: 'CU1',
                region_code:'USA',
                sector_group: 'sector_group1'
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
        //free pack pattern and free_subscription
        {
            type: 'insert',
            table: 'asset',
            values: {
                asset_disc: 1,
                symbol: 'ASSET11',
                short_name: 'Asset 1 1',
                long_name: 'Long name Asset 1 1',
                last_quote: 10,
                last_quote_date: '2014-10-30',
                price_chart_url: 'www.urlPriceChart.com',
                volatility: 19.20,
                exchange_symbol: 'EX1',
                sector: 'sector1 SECTOR CD',
                industry: 'industry1 CD',
                expiration_year: null,
                expiration_month: null,
                volatility_chart_url: 'www.urlVolatChart.com'
            }
        },
        {
            type: 'insert',
            table: 'asset',
            values: {
                asset_disc: 1,
                symbol: 'ASSET12',
                short_name: 'Asset 1 2',
                long_name: 'Long name Asset 1 2',
                last_quote: 15,
                last_quote_date: '2014-10-30',
                price_chart_url: 'www.urlPriceChart.com',
                volatility: 19.20,
                exchange_symbol: 'EX1',
                sector: 'sector1 SECTOR CD',
                industry: 'industry1 CD',
                expiration_year: null,
                expiration_month: null,
                volatility_chart_url: 'www.urlVolatChart.com'
            }
        },
        {
            type: 'insert',
            table: 'pattern',
            values: {
                pattern_disc: 2,
                id: 1,
                //pack_code: 'USA-P-1',
                pattern_type: 1,
                win: 14,
                loss: 1,
                asset_symbol: 'ASSET11',
                entry_date: '2014-12-03',
                exit_date:'2015-01-15',
                accumulated_return:212.33,
                average_return:14.16,
                daily_return:0.08,
                entry_value:1,
                effective_entry_date:'2014-10-24',
                exit_value:2,
                effective_exit_date:'2014-10-29',
                pattern_close_chart_url: 'www.chartUrl1.com',
                pattern_six_years_chart_url:'www.sixYearsChartUrl',
                week_trend_chart_url:'www.chartWeekUrl',
                month_trend_chart_url:'monthTrendUrl',
                duration:173,
                best_gain:2,
                best_gain_date: '2014-10-01',
                worst_loss:-5,
                worst_loss_date:'2014-10-02',
                last_performance:30, //value compared in alarm
                bearish_asset_symbol:'ASSET12',
                bearish_average_return:1,
                bullish_average_return:2,
                bearish_entry_value:11,
                bearish_exit_value:22,
                daily_pair_return: 12.13,
                pair_volatility:23,
                last_performance_date: '2014-10-30',
                drawdown: -27.31,
                winning_years_mean_rent: 220.41,
                losing_years_mean_rent:-8.08,
                product_type:0,
                bullish_average_win:14,
                bullish_average_loss:1,
                bearish_average_win:13,
                bearish_average_loss:2
            }
        },
        {
            type: 'insert',
            table: 'free_pack_pattern',
            values: {
                free_pack_code: '11',
                pattern_id: 1
            }
        },
        {  //packs
            type: 'insert',
            table: 'pack',
            values: {
                code: 'USA-S-1',
                region_code: 'USA',
                name: 'Estados Unidos Pack I',
                product_type: 0,
                publication_date: '2014-11-04',
                scope_text: 'Estados Unidos Pack I text',
                pattern_type: 0,
                subname: ' '
            }
        },
        {
            type: 'insert',
            table: 'asset',
            values: {
                asset_disc: 1,
                symbol: 'ASSET1',
                short_name: 'Asset 1',
                long_name: 'Long name Asset 1',
                last_quote: 10,
                last_quote_date: '2014-10-30',
                price_chart_url: 'www.urlPriceChart.com',
                volatility: 19.20,
                exchange_symbol: 'EX1',
                sector: 'sector1 SECTOR CD',
                industry: 'industry1 CD',
                expiration_year: null,
                expiration_month: null,
                volatility_chart_url: 'www.urlVolatChart.com'
            }
        },
        {
            type: 'insert',
            table: 'pattern',
            values: {
                pattern_disc: 1,
                id: 2,
                pack_code: 'USA-S-1',
                pattern_type: 0,
                win: 14,
                loss: 1,
                asset_symbol: 'ASSET1',
                entry_date: '2014-12-01',
                exit_date:'2015-01-15',
                accumulated_return:212.33,
                average_return:14.16,
                daily_return:0.08,
                entry_value:null,
                effective_entry_date:null,
                exit_value:null,
                effective_exit_date:null,
                pattern_close_chart_url: 'www.chartUrl1.com',
                pattern_six_years_chart_url:'www.sixYearsChartUrl',
                week_trend_chart_url:'www.chartWeekUrl',
                month_trend_chart_url:'monthTrendUrl',
                duration:173,
                best_gain:null,
                best_gain_date: null,
                worst_loss:null,
                worst_loss_date:null,
                last_performance:null,
                bearish_asset_symbol:null,
                bearish_average_return:null,
                bullish_average_return:null,
                bearish_entry_value:null,
                bearish_exit_value:null,
                daily_pair_return: null,
                pair_volatility:null,
                last_performance_date: null,
                drawdown: -27.31,
                winning_years_mean_rent: 220.41,
                losing_years_mean_rent:-8.08,
                product_type:0,
                bullish_average_win:null,
                bullish_average_loss:null,
                bearish_average_win:null,
                bearish_average_loss:null
            }
        },
        //Pending user on time to sign in and use the application
        {
            type: 'insert',
            table: 'users',
            values: {
                id: 1,
                name: 'Pending user 1',
                surname: '',
                creation_date: '10-11-2014',
                address: 'The wall',
                city: 'North',
                zip_code: 'Fr3zz3',
                email_address: 'pending.user1@foo.bar',
                sha_password: "\\x" + sha512("phantom").toString('hex'),
                status: 0,
                country_code: 'ES'
            }
        },
        {
            type: 'insert',
            table: 'free_subscription',
            values: {
                id: 1,
                free_pack_code: '11',
                user_id: 1, //Pending user 1
                subscription_date: '2014-11-02',
                start_date: '2014-11-10 20:00',
                end_date: '2014-11-25 20:00'
            }
        },
        //Pending user out of time to sign in and use the application
        {
            type: 'insert',
            table: 'users',
            values: {
                id: 2,
                name: 'Pending user',
                surname: '',
                creation_date: '10-11-2014',
                address: 'The wall',
                city: 'North',
                zip_code: 'Fr3zz3',
                email_address: 'pending.user2@foo.bar',
                sha_password: "\\x" + sha512("phantom").toString('hex'),
                status: 0,
                country_code: 'ES'
            }
        },
        {
            type: 'insert',
            table: 'free_subscription',
            values: {
                id: 2,
                free_pack_code: '11',
                user_id: 2, //Pending user 2
                subscription_date: '2014-11-02',
                start_date: '2014-11-01 20:00',
                end_date: '2014-11-16 20:00'
            }
        },
        //Activated user with valid free subscription
        {
            type: 'insert',
            table: 'users',
            values: {
                id: 3,
                name: 'Freepack user 3',
                surname: '',
                creation_date: '10-11-2014',
                address: 'The wall',
                city: 'North',
                zip_code: 'Fr3zz3',
                email_address: 'freepack.user3@foo.bar',
                sha_password: "\\x" + sha512("phantom").toString('hex'),
                status: 1, //activated
                country_code: 'ES'
            }
        },
        {
            type: 'insert',
            table: 'free_subscription',
            values: {
                id: 3,
                free_pack_code: '11',
                user_id: 3, //Freepack user 3
                subscription_date: '2014-11-02',
                start_date: '2014-11-10 20:00',
                end_date: '2014-11-25 20:00'
            }
        },
        //Activated user with expired free subscription
        {
            type: 'insert',
            table: 'users',
            values: {
                id: 4,
                name: 'Freepack user 4',
                surname: '',
                creation_date: '10-11-2014',
                address: 'The wall',
                city: 'North',
                zip_code: 'Fr3zz3',
                email_address: 'freepack.user4@foo.bar',
                sha_password: "\\x" + sha512("phantom").toString('hex'),
                status: 1, //activated
                country_code: 'ES'
            }
        },
        {
            type: 'insert',
            table: 'free_subscription',
            values: {
                id: 4,
                free_pack_code: '11',
                user_id: 4, //Freepack user 4
                subscription_date: '2014-11-02',
                start_date: '2014-11-01 20:00',
                end_date: '2014-11-16 20:00'
            }
        },
        //Activated user with valid pack subscription
        {
            type: 'insert',
            table: 'users',
            values: {
                id: 5,
                name: 'Pack user 5',
                surname: '',
                creation_date: '10-11-2014',
                address: 'The wall',
                city: 'North',
                zip_code: 'Fr3zz3',
                email_address: 'pack.user5@foo.bar',
                sha_password: "\\x" + sha512("phantom").toString('hex'),
                status: 1, //activated
                country_code: 'ES'
            }
        },
        {
            type: 'insert',
            table: 'free_subscription',
            values: {
                id: 5,
                free_pack_code: '11',
                user_id: 5, //Pack user 5
                subscription_date: '2014-11-02',
                start_date: '2014-11-01 20:00',
                end_date: '2014-11-16 20:00' //expired
            }
        },
        {
            type: 'insert',
            table: 'subscription',
            values: {
                subscription_disc: 1,
                id: 1,
                pack_code: 'USA-S-1',
                user_id: 5,
                subscription_date: '2013-11-01',
                start_date: '2013-11-01',
                subscription_duration: 2,
                end_date: '2014-12-01',
                status: 0
            }
        },
        //Activated user with expired pack subscription
        {
            type: 'insert',
            table: 'users',
            values: {
                id: 6,
                name: 'Pack user 6',
                surname: '',
                creation_date: '10-11-2014',
                address: 'The wall',
                city: 'North',
                zip_code: 'Fr3zz3',
                email_address: 'pack.user6@foo.bar',
                sha_password: "\\x" + sha512("phantom").toString('hex'),
                status: 1, //activated
                country_code: 'ES'
            }
        },
        {
            type: 'insert',
            table: 'free_subscription',
            values: {
                id: 6,
                free_pack_code: '11',
                user_id: 6, //Pack user 6
                subscription_date: '2014-11-02',
                start_date: '2014-11-01 20:00',
                end_date: '2014-11-16 20:00' //expired
            }
        },
        {
            type: 'insert',
            table: 'subscription',
            values: {
                subscription_disc: 1,
                id: 2,
                pack_code: 'USA-S-1',
                user_id: 6,
                subscription_date: '2013-11-01',
                start_date: '2013-09-01',
                subscription_duration: 2,
                end_date: '2014-10-01', //expired
                status: 0
            }
        },
        //Activated user with cancelled but still valid pack subscription
        {
            type: 'insert',
            table: 'users',
            values: {
                id: 7,
                name: 'Pack user 7',
                surname: '',
                creation_date: '10-11-2014',
                address: 'The wall',
                city: 'North',
                zip_code: 'Fr3zz3',
                email_address: 'pack.user7@foo.bar',
                sha_password: "\\x" + sha512("phantom").toString('hex'),
                status: 1, //activated
                country_code: 'ES'
            }
        },
        {
            type: 'insert',
            table: 'free_subscription',
            values: {
                id: 7,
                free_pack_code: '11',
                user_id: 7, //Pack user 7
                subscription_date: '2014-11-02',
                start_date: '2014-11-01 20:00',
                end_date: '2014-11-16 20:00' //expired
            }
        },
        {
            type: 'insert',
            table: 'subscription',
            values: {
                subscription_disc: 1,
                id: 3,
                pack_code: 'USA-S-1',
                user_id: 7,
                subscription_date: '2014-08-01',
                start_date: '2014-08-01',
                subscription_duration: 2,
                end_date: '2014-12-01',
                status: 1 //cancelled
            }
        },
    ];
};

exports.remove_login_fixture = function() {
    return [
        {
            type: 'remove',
            table: 'subscription'
        },
        {
            type: 'remove',
            table: 'free_subscription'
        },
        {
            type: 'remove',
            table: 'free_pack_pattern'
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
            table: 'free_pack'
        },
        {
            type: 'remove',
            table: 'pack'
        },
        {
            type: 'remove',
            table: 'email_log'
        },
        {
            type: 'remove',
            table: 'users'
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
