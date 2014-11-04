/**
 * Created by robgon on 29/10/14.
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

exports.generateUser = function (conString, email, password, name) {
    console.log("generating User");

    var fixture = {
        type: 'insert',
        table: 'users',
        values: {
            id: 1,
            name: (name == null ? 'John' : name),
            surname: 'Snow',
            creation_date: '10-06-2014',
            address: 'The wall',
            city: 'North',
            zip_code: 'Fr3zz3',
            email_address: (email == null ? 'john.snow@thewall.north' : email),
            sha_password: (password == null ? "\\x" + sha512("phantom").toString('hex') : "\\x" + sha512(password).toString('hex')),
            status: 1
        }
    }
    loadFixture.loadFixture(fixture, conString);
    sleep(5000);
    return fixture;

};
exports.generateRegion = function (conString, code, name) {
    console.log("generatin Region--------");
    var conString = browser.params.sqlCon;
    var fixture = {
        type: 'insert',
        table: 'region',
        values: {
            code: (code == null ? 'REGION1' : code),
            name: (name == null ? 'Region1' : name)
        }
    }
    loadFixture.loadFixture(fixture, conString);
    sleep(5000);
    return fixture;
};

exports.generatePack = function (conString, code, name, regionCode) {
    console.log("generatin Pack--------");
    var conString = browser.params.sqlCon;
    var fixture = {
        type: 'insert',
        table: 'pack',
        values: {
            code: (code == null ? 'PACK1' : code),
            region_code: (regionCode == null ? 'REGION1' : regionCode),
            name: (name == null ? 'Pack Simple 1' : name),
            product_type: 0,
            publication_date: '2014-07-04',
            scope_text: 'Simple Pack 1 text',
            pattern_type: 0,
            subname: ' '
        }
    }
    loadFixture.loadFixture(fixture, conString);
    sleep(5000);
    return fixture;
};

exports.my_subscription_fixture = function() {
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
            table: 'users',
            values: {
                id: 1,
                name: 'John',
                surname: 'Snow',
                creation_date: '10-06-2014',
                address: 'The wall',
                city: 'North',
                zip_code: 'Fr3zz3',
                email_address: 'john.snow@thewall.north',
                sha_password: "\\x" + sha512("phantom").toString('hex'),
                status: 1,
                country_code: 'ES'
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
            table: 'pack',
            values: {
                code: 'CAN-S-1',
                region_code: 'CAN',
                name: 'Canada Simple 1',
                product_type: 0,
                publication_date: '2014-07-04',
                scope_text: 'Simple Pack 1 text',
                pattern_type: 0,
                subname: ' '
            }
        },{
            type: 'insert',
            table: 'pack',
            values: {
                code: 'CAN-S-2',
                region_code: 'CAN',
                name: 'Canada Simple II',
                product_type: 0,
                publication_date: '2014-07-04',
                scope_text: 'Simple Pack 2 text',
                pattern_type: 0,
                subname: ' '
            }
        },
        {
            type: 'insert',
            table: 'published_packs',
            values: {
                pack_code: 'CAN-S-1',
                pack_month: 201411, //date of the month of the pack ALWAYS actual month
                publication_date: '2014-09-15',
                num_patterns: 50,
                letter_from: 'aaa',
                letter_until: 'zzz'
            }
        },{
            type: 'insert',
            table: 'published_packs',
            values: {
                pack_code: 'CAN-S-2',
                pack_month: 201411, //date of the month of the pack ALWAYS actual month
                publication_date: '2014-09-15',
                num_patterns: 50,
                letter_from: 'aaa',
                letter_until: 'zzz'
            }
        }, {
            type: 'insert',
            table: 'subscription',
            values: {
                subscription_disc: 1,
                id: 1,
                pack_code: 'CAN-S-2',
                user_id: 1,
                subscription_date: '2014-09-05',
                start_date: '2014-09-01',
                subscription_duration: 2,
                end_date: '2015-09-01',
                status: 0
            }
        },{
            type: 'insert',
            table: 'currency',
            values: {
                code: 'CU1',
                symbol:'CU1',
                name:'Currency1'
            }
        },{
            type: 'insert',
            table: 'exchange',
            values: {
                symbol: 'EX1',
                name: 'exchange1',
                currency_code: 'CU1',
                region_code:'CAN',
                sector_group: 'SectGroup1'
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
                last_quote: 27.7,
                last_quote_date: '2014-10-30',
                price_chart_url: 'www.urlPriceChart.com',
                volatility: 19.20,
                exchange_symbol: 'EX1',
                sector: 'Sector1',
                industry: 'Industry1',
                expiration_year: null,
                expiration_month: null,
                volatility_chart_url: 'www.urlVolatChart.com'
            }
        }, {
            type: 'insert',
            table: 'pattern',
            values: {
                pattern_disc: 1,
                id: 1,
                pack_code: 'CAN-S-1',
                pattern_type: 0,
                win: 14,
                loss: 1,
                asset_symbol: 'ASSET1',
                entry_date: '2014-11-11',
                exit_date:'2014-05-03',
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
        }
    ];
};

exports.remove_fixtures_subscriptions = function(){
    return [
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
        }
    ];
};