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

exports.fixture_myPatterns = function() {
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
            table: 'region',
            values: {
                code: 'USA',
                name: 'Estados Unidos',
                area_code: 0
            }
        },
        {
            type: 'insert',
            table: 'region',
            values: {
                code: 'INDEX',
                name: 'Index',
                area_code: 0
            }
        },
        {/*SIMPLES*/
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
                pack_code: 'USA-S-1',
                pack_month: 201411, //date of the month of the pack ALWAYS actual month
                publication_date: '2014-09-15',
                num_patterns: 50,
                letter_from: 'aaa',
                letter_until: 'zzz'
            }
        },

        {
            type: 'insert',
            table: 'subscription',
            values: {
                subscription_disc: 1,
                id: 1,
                pack_code: 'CAN-S-1',
                user_id: 1,
                subscription_date: '2014-09-05',
                start_date: '2014-09-01',
                subscription_duration: 2,
                end_date: '2015-09-01',
                status: 0
            }
        },{
            type: 'insert',
            table: 'subscription',
            values: {
                subscription_disc: 1,
                id: 2,
                pack_code: 'USA-S-1',
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
        },{
            type: 'insert',
            table: 'asset',
            values: {
                asset_disc: 1,
                symbol: 'ASSET2',
                short_name: 'Asset 2',
                long_name: 'Long name Asset 2',
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
        },
        {
            type: 'insert',
            table: 'asset',
            values: {
                asset_disc: 1,
                symbol: 'ASSET3',
                short_name: 'Asset 3',
                long_name: 'Long name Asset 3',
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
        },
        {
            type: 'insert',
            table: 'asset',
            values: {
                asset_disc: 1,
                symbol: 'ASSET4',
                short_name: 'Asset 4',
                long_name: 'Long name Asset 4',
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
        },
        {
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
        },
        {
            type: 'insert',
            table: 'pattern',
            values: {
                pattern_disc: 1,
                id: 2,
                pack_code: 'CAN-S-1',
                pattern_type: 0,
                win: 13,
                loss: 2,
                asset_symbol: 'ASSET2',
                entry_date: '2014-11-11',
                exit_date:'2014-05-03',
                accumulated_return:213.33,
                average_return:15.16,
                daily_return:0.09,
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
        {
            type: 'insert',
            table: 'pattern',
            values: {
                pattern_disc: 1,
                id: 3,
                pack_code: 'USA-S-1',
                pattern_type: 0,
                win: 13,
                loss: 3,
                asset_symbol: 'ASSET3',
                entry_date: '2014-11-11',
                exit_date:'2014-05-03',
                accumulated_return:213.33,
                average_return:15.16,
                daily_return:0.09,
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
        {
            type: 'insert',
            table: 'pattern',
            values: {
                pattern_disc: 1,
                id: 4,
                pack_code: 'USA-S-1',
                pattern_type: 0,
                win: 13,
                loss: 2,
                asset_symbol: 'ASSET4',
                entry_date: '2014-11-11',
                exit_date:'2014-05-03',
                accumulated_return:213.33,
                average_return:15.16,
                daily_return:0.09,
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
        /*PAIRS*/
        {
            type: 'insert',
            table: 'pack',
            values: {
                code: 'CAN-P-1',
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
                code: 'USA-P-1',
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
            table: 'published_packs',
            values: {
                pack_code: 'CAN-P-1',
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
                pack_code: 'USA-P-1',
                pack_month: 201411, //date of the month of the pack ALWAYS actual month
                publication_date: '2014-09-15',
                num_patterns: 50,
                letter_from: 'aaa',
                letter_until: 'zzz'
            }
        },
        {
            type: 'insert',
            table: 'subscription',
            values: {
                subscription_disc: 1,
                id: 3,
                pack_code: 'CAN-P-1',
                user_id: 1,
                subscription_date: '2014-09-05',
                start_date: '2014-09-01',
                subscription_duration: 2,
                end_date: '2015-09-01',
                status: 0
            }
        },{
            type: 'insert',
            table: 'subscription',
            values: {
                subscription_disc: 1,
                id: 4,
                pack_code: 'USA-P-1',
                user_id: 1,
                subscription_date: '2014-09-05',
                start_date: '2014-09-01',
                subscription_duration: 2,
                end_date: '2015-09-01',
                status: 0
            }
        } ,
        {
            type: 'insert',
            table: 'asset',
            values: {
                asset_disc: 1,
                symbol: 'ASSET11',
                short_name: 'Asset Pair 1',
                long_name: 'Long name Asset Pair 1',
                last_quote: 27.9,
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
        },{
            type: 'insert',
            table: 'asset',
            values: {
                asset_disc: 1,
                symbol: 'ASSET12',
                short_name: 'Asset Pair 1 2',
                long_name: 'Long name Asset Pair 1 2',
                last_quote: 27.9,
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
        },{
            type: 'insert',
            table: 'asset',
            values: {
                asset_disc: 1,
                symbol: 'ASSET21',
                short_name: 'Asset Pair 2 1',
                long_name: 'Long name Asset Pair 2 1',
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
        },{
            type: 'insert',
            table: 'asset',
            values: {
                asset_disc: 1,
                symbol: 'ASSET22',
                short_name: 'Asset Pair 2 2',
                long_name: 'Long name Asset Pair 2 2',
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
        },
        {
            type: 'insert',
            table: 'asset',
            values: {
                asset_disc: 1,
                symbol: 'ASSET31',
                short_name: 'Asset Pair 3 1',
                long_name: 'Long name Asset Pair 3 1',
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
        },{
            type: 'insert',
            table: 'asset',
            values: {
                asset_disc: 1,
                symbol: 'ASSET32',
                short_name: 'Asset Pair 3 2',
                long_name: 'Long name Asset Pair 3 2',
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
        },
        {
            type: 'insert',
            table: 'asset',
            values: {
                asset_disc: 1,
                symbol: 'ASSET41',
                short_name: 'Asset Pair 4 1',
                long_name: 'Long name Asset Pair 4 1',
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
        },
        {
            type: 'insert',
            table: 'asset',
            values: {
                asset_disc: 1,
                symbol: 'ASSET42',
                short_name: 'Asset Pair 4 1',
                long_name: 'Long name Asset Pair 4 2',
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
        },
        {
            type: 'insert',
            table: 'pattern',
            values: {
                pattern_disc: 2,
                id: 5,
                pack_code: 'CAN-P-1',
                pattern_type: 1,
                win: 14,
                loss: 1,
                asset_symbol: 'ASSET11',
                entry_date: '2014-11-11',
                exit_date:'2014-05-03',
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
                last_performance:1.4,
                bearish_asset_symbol:'ASSET12',
                bearish_average_return:1,
                bullish_average_return:2,
                bearish_entry_value:11,
                bearish_exit_value:22,
                daily_pair_return: 12.13,
                pair_volatility:23,
                last_performance_date: '2014-10-19',
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
            table: 'pattern',
            values: {
                pattern_disc: 2,
                id: 6,
                pack_code: 'CAN-P-1',
                pattern_type: 1,
                win: 13,
                loss: 2,
                asset_symbol: 'ASSET21',
                entry_date: '2014-11-11',
                exit_date:'2014-05-03',
                accumulated_return:213.33,
                average_return:15.16,
                daily_return:0.09,
                entry_value:13,
                effective_entry_date:'2014-10-01',
                exit_value:23,
                effective_exit_date:'2014-10-29',
                pattern_close_chart_url: 'www.chartUrl1.com',
                pattern_six_years_chart_url:'www.sixYearsChartUrl',
                week_trend_chart_url:'www.chartWeekUrl',
                month_trend_chart_url:'monthTrendUrl',
                duration:173,
                best_gain:13,
                best_gain_date: '2014-11-01',
                worst_loss:10,
                worst_loss_date:'2014-11-05',
                last_performance:3,
                bearish_asset_symbol:'ASSET22',
                bearish_average_return:13,
                bullish_average_return:4,
                bearish_entry_value:1,
                bearish_exit_value:3,
                daily_pair_return: 23,
                pair_volatility:12,
                last_performance_date: '2014-10-11',
                drawdown: -27.31,
                winning_years_mean_rent: 220.41,
                losing_years_mean_rent:-8.08,
                product_type:0,
                bullish_average_win:11,
                bullish_average_loss:4,
                bearish_average_win:13,
                bearish_average_loss:2
            }
        },
        {
            type: 'insert',
            table: 'pattern',
            values: {
                pattern_disc: 2,
                id: 7,
                pack_code: 'USA-S-1',
                pattern_type: 0,
                win: 13,
                loss: 3,
                asset_symbol: 'ASSET31',
                entry_date: '2014-11-11',
                exit_date:'2014-05-03',
                accumulated_return:213.33,
                average_return:15.16,
                daily_return:0.09,
                entry_value:3,
                effective_entry_date:'2014-10-09',
                exit_value:3,
                effective_exit_date:'2014-10-09',
                pattern_close_chart_url: 'www.chartUrl1.com',
                pattern_six_years_chart_url:'www.sixYearsChartUrl',
                week_trend_chart_url:'www.chartWeekUrl',
                month_trend_chart_url:'monthTrendUrl',
                duration:173,
                best_gain:13,
                best_gain_date: '2014-10-12',
                worst_loss:-2,
                worst_loss_date:'2014-09-13',
                last_performance:3,
                bearish_asset_symbol:'ASSET32',
                bearish_average_return:13,
                bullish_average_return:14,
                bearish_entry_value:33,
                bearish_exit_value:4,
                daily_pair_return: 4,
                pair_volatility:5,
                last_performance_date: '2014-10-14',
                drawdown: -27.31,
                winning_years_mean_rent: 220.41,
                losing_years_mean_rent:-8.08,
                product_type:0,
                bullish_average_win:15,
                bullish_average_loss:0,
                bearish_average_win:13,
                bearish_average_loss:2
            }
        },
        {
            type: 'insert',
            table: 'pattern',
            values: {
                pattern_disc: 2,
                id: 8,
                pack_code: 'USA-P-1',
                pattern_type: 1,
                win: 13,
                loss: 2,
                asset_symbol: 'ASSET41',
                entry_date: '2014-11-11',
                exit_date:'2014-05-03',
                accumulated_return:213.33,
                average_return:15.16,
                daily_return:0.09,
                entry_value:11,
                effective_entry_date:'2014-11-01',
                exit_value:13,
                effective_exit_date:'2014-11-02',
                pattern_close_chart_url: 'www.chartUrl1.com',
                pattern_six_years_chart_url:'www.sixYearsChartUrl',
                week_trend_chart_url:'www.chartWeekUrl',
                month_trend_chart_url:'monthTrendUrl',
                duration:173,
                best_gain:-2,
                best_gain_date:'2014-10-03',
                worst_loss:-3,
                worst_loss_date:'2014-10-04',
                last_performance:2,
                bearish_asset_symbol:'ASSET42',
                bearish_average_return:12,
                bullish_average_return:13,
                bearish_entry_value:4,
                bearish_exit_value:5,
                daily_pair_return: 6,
                pair_volatility:7,
                last_performance_date: '2014-10-01',
                drawdown: -27.31,
                winning_years_mean_rent: 220.41,
                losing_years_mean_rent:-8.08,
                product_type:0,
                bullish_average_win:12,
                bullish_average_loss:3,
                bearish_average_win:11,
                bearish_average_loss:4
            }
        },{ /*INDEX*/
            type: 'insert',
            table: 'pack',
            values: {
                code: 'INDEX-S-1',
                region_code: 'INDEX',
                name: 'Index Simple 1',
                product_type: 1,
                publication_date: '2014-07-04',
                scope_text: 'Index Simple 1 text',
                pattern_type: 0,
                subname: ' '
            }
        },{
            type: 'insert',
            table: 'pack',
            values: {
                code: 'INDEX-S-2',
                region_code: 'INDEX',
                name: 'Index Simple 2',
                product_type: 1,
                publication_date: '2014-07-04',
                scope_text: 'Index Simple 2 text',
                pattern_type: 0,
                subname: ' '
            }
        },
        {
            type: 'insert',
            table: 'published_packs',
            values: {
                pack_code: 'INDEX-S-1',
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
                pack_code: 'INDEX-S-2',
                pack_month: 201411, //date of the month of the pack ALWAYS actual month
                publication_date: '2014-09-15',
                num_patterns: 50,
                letter_from: 'aaa',
                letter_until: 'zzz'
            }
        },

        {
            type: 'insert',
            table: 'subscription',
            values: {
                subscription_disc: 1,
                id: 5,
                pack_code: 'INDEX-S-1',
                user_id: 1,
                subscription_date: '2014-09-05',
                start_date: '2014-09-01',
                subscription_duration: 2,
                end_date: '2015-09-01',
                status: 0
            }
        },{
            type: 'insert',
            table: 'subscription',
            values: {
                subscription_disc: 1,
                id: 6,
                pack_code: 'INDEX-S-2',
                user_id: 1,
                subscription_date: '2014-09-05',
                start_date: '2014-09-01',
                subscription_duration: 2,
                end_date: '2015-09-01',
                status: 0
            }
        },
        {
            type: 'insert',
            table: 'exchange',
            values: {
                symbol: 'IN1',
                name: 'exchangeIndex1',
                currency_code: 'CU1',
                region_code:'INDEX',
                sector_group: 'SectGroup2'
            }
        },
        {
            type: 'insert',
            table: 'asset',
            values: {
                asset_disc: 1,
                symbol: 'ASSETI1',
                short_name: 'Asset Index 1',
                long_name: 'Long name Asset Index 1',
                last_quote: 27.7,
                last_quote_date: '2014-10-30',
                price_chart_url: 'www.urlPriceChart.com',
                volatility: 19.20,
                exchange_symbol: 'IN1',
                sector: 'Sector1',
                industry: 'Industry1',
                expiration_year: null,
                expiration_month: null,
                volatility_chart_url: 'www.urlVolatChart.com'
            }
        },{
            type: 'insert',
            table: 'asset',
            values: {
                asset_disc: 1,
                symbol: 'ASSETI2',
                short_name: 'Asset Index 2',
                long_name: 'Long name Asset Index 2',
                last_quote: 27.7,
                last_quote_date: '2014-10-30',
                price_chart_url: 'www.urlPriceChart.com',
                volatility: 19.20,
                exchange_symbol: 'IN1',
                sector: 'Sector1',
                industry: 'Industry1',
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
                symbol: 'ASSETI3',
                short_name: 'Asset Index 3',
                long_name: 'Long name Asset Index 3',
                last_quote: 27.7,
                last_quote_date: '2014-10-30',
                price_chart_url: 'www.urlPriceChart.com',
                volatility: 19.20,
                exchange_symbol: 'IN1',
                sector: 'Sector1',
                industry: 'Industry1',
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
                symbol: 'ASSETI4',
                short_name: 'Asset Index 4',
                long_name: 'Long name Asset Index 4',
                last_quote: 27.7,
                last_quote_date: '2014-10-30',
                price_chart_url: 'www.urlPriceChart.com',
                volatility: 19.20,
                exchange_symbol: 'IN1',
                sector: 'Sector1',
                industry: 'Industry1',
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
                id: 9,
                pack_code: 'INDEX-S-1',
                pattern_type: 1,
                win: 14,
                loss: 1,
                asset_symbol: 'ASSETI1',
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
        },
        {
            type: 'insert',
            table: 'pattern',
            values: {
                pattern_disc: 1,
                id: 10,
                pack_code: 'INDEX-S-1',
                pattern_type: 0,
                win: 13,
                loss: 2,
                asset_symbol: 'ASSETI2',
                entry_date: '2014-11-11',
                exit_date:'2014-05-03',
                accumulated_return:213.33,
                average_return:15.16,
                daily_return:0.09,
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
        {
            type: 'insert',
            table: 'pattern',
            values: {
                pattern_disc: 1,
                id: 11,
                pack_code: 'INDEX-S-2',
                pattern_type: 1,
                win: 13,
                loss: 3,
                asset_symbol: 'ASSETI3',
                entry_date: '2014-11-11',
                exit_date:'2014-05-03',
                accumulated_return:213.33,
                average_return:15.16,
                daily_return:0.09,
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
        {
            type: 'insert',
            table: 'pattern',
            values: {
                pattern_disc: 1,
                id: 12,
                pack_code: 'INDEX-S-2',
                pattern_type: 0,
                win: 13,
                loss: 2,
                asset_symbol: 'ASSETI4',
                entry_date: '2014-11-11',
                exit_date:'2014-05-03',
                accumulated_return:213.33,
                average_return:15.16,
                daily_return:0.09,
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
        /*INDEX PAIRS*/
        {
            type: 'insert',
            table: 'pack',
            values: {
                code: 'INDEX-P-1',
                region_code: 'INDEX',
                name: 'Index Pair I',
                product_type: 1,
                publication_date: '2014-07-04',
                scope_text: 'PairIndex  Pack 1 text',
                pattern_type: 1,
                subname: ' '
            }
        },{
            type: 'insert',
            table: 'pack',
            values: {
                code: 'INDEX-P-2',
                region_code: 'INDEX',
                name: 'Index Pair II',
                product_type: 1,
                publication_date: '2014-07-04',
                scope_text: 'PairIndex Pack II text',
                pattern_type: 1,
                subname: ' '
            }
        },
        {
            type: 'insert',
            table: 'published_packs',
            values: {
                pack_code: 'INDEX-P-1',
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
                pack_code: 'INDEX-P-2',
                pack_month: 201411, //date of the month of the pack ALWAYS actual month
                publication_date: '2014-09-15',
                num_patterns: 50,
                letter_from: 'aaa',
                letter_until: 'zzz'
            }
        },
        {
            type: 'insert',
            table: 'subscription',
            values: {
                subscription_disc: 1,
                id: 7,
                pack_code: 'INDEX-P-1',
                user_id: 1,
                subscription_date: '2014-09-05',
                start_date: '2014-09-01',
                subscription_duration: 2,
                end_date: '2015-09-01',
                status: 0
            }
        },{
            type: 'insert',
            table: 'subscription',
            values: {
                subscription_disc: 1,
                id: 8,
                pack_code: 'INDEX-P-2',
                user_id: 1,
                subscription_date: '2014-09-05',
                start_date: '2014-09-01',
                subscription_duration: 2,
                end_date: '2015-09-01',
                status: 0
            }
        } ,
        {
            type: 'insert',
            table: 'asset',
            values: {
                asset_disc: 1,
                symbol: 'ASSETI11',
                short_name: 'Asset Pair Index 1',
                long_name: 'Long name Asset Pair Index 1',
                last_quote: 27.9,
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
        },{
            type: 'insert',
            table: 'asset',
            values: {
                asset_disc: 1,
                symbol: 'ASSETI12',
                short_name: 'Asset Pair Index Index 1 2',
                long_name: 'Long name Asset Pair Index 1 2',
                last_quote: 27.9,
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
        },{
            type: 'insert',
            table: 'asset',
            values: {
                asset_disc: 1,
                symbol: 'ASSETI21',
                short_name: 'Asset Pair Index 2 1',
                long_name: 'Long name Asset Pair Index 2 1',
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
        },{
            type: 'insert',
            table: 'asset',
            values: {
                asset_disc: 1,
                symbol: 'ASSETI22',
                short_name: 'Asset Pair Index 2 2',
                long_name: 'Long name Asset Pair Index 2 2',
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
        },
        {
            type: 'insert',
            table: 'asset',
            values: {
                asset_disc: 1,
                symbol: 'ASSETI31',
                short_name: 'Asset Pair Index 3 1',
                long_name: 'Long name Asset Pair Index 3 1',
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
        },{
            type: 'insert',
            table: 'asset',
            values: {
                asset_disc: 1,
                symbol: 'ASSETI32',
                short_name: 'Asset Pair Index 3 2',
                long_name: 'Long name Asset Pair Index 3 2',
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
        },
        {
            type: 'insert',
            table: 'asset',
            values: {
                asset_disc: 1,
                symbol: 'ASSETI41',
                short_name: 'Asset Pair Index 4 1',
                long_name: 'Long name Asset Pair Index 4 1',
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
        },
        {
            type: 'insert',
            table: 'asset',
            values: {
                asset_disc: 1,
                symbol: 'ASSETI42',
                short_name: 'Asset Pair Index 4 2',
                long_name: 'Long name Asset Pair Index 4 2',
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
        },
        {
            type: 'insert',
            table: 'pattern',
            values: {
                pattern_disc: 2,
                id: 13,
                pack_code: 'INDEX-P-1',
                pattern_type: 1,
                win: 14,
                loss: 1,
                asset_symbol: 'ASSETI11',
                entry_date: '2014-11-11',
                exit_date:'2014-05-03',
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
                last_performance:1.4,
                bearish_asset_symbol:'ASSETI12',
                bearish_average_return:1,
                bullish_average_return:2,
                bearish_entry_value:11,
                bearish_exit_value:22,
                daily_pair_return: 12.13,
                pair_volatility:23,
                last_performance_date: '2014-10-19',
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
            table: 'pattern',
            values: {
                pattern_disc: 2,
                id: 14,
                pack_code: 'INDEX-P-1',
                pattern_type: 1,
                win: 13,
                loss: 2,
                asset_symbol: 'ASSETI21',
                entry_date: '2014-11-11',
                exit_date:'2014-05-03',
                accumulated_return:213.33,
                average_return:15.16,
                daily_return:0.09,
                entry_value:13,
                effective_entry_date:'2014-10-01',
                exit_value:23,
                effective_exit_date:'2014-10-29',
                pattern_close_chart_url: 'www.chartUrl1.com',
                pattern_six_years_chart_url:'www.sixYearsChartUrl',
                week_trend_chart_url:'www.chartWeekUrl',
                month_trend_chart_url:'monthTrendUrl',
                duration:173,
                best_gain:13,
                best_gain_date: '2014-11-01',
                worst_loss:10,
                worst_loss_date:'2014-11-05',
                last_performance:3,
                bearish_asset_symbol:'ASSETI22',
                bearish_average_return:13,
                bullish_average_return:4,
                bearish_entry_value:1,
                bearish_exit_value:3,
                daily_pair_return: 23,
                pair_volatility:12,
                last_performance_date: '2014-10-11',
                drawdown: -27.31,
                winning_years_mean_rent: 220.41,
                losing_years_mean_rent:-8.08,
                product_type:0,
                bullish_average_win:11,
                bullish_average_loss:4,
                bearish_average_win:13,
                bearish_average_loss:2
            }
        },
        {
            type: 'insert',
            table: 'pattern',
            values: {
                pattern_disc: 2,
                id: 15,
                pack_code: 'INDEX-P-2',
                pattern_type: 0,
                win: 13,
                loss: 3,
                asset_symbol: 'ASSETI31',
                entry_date: '2014-11-11',
                exit_date:'2014-05-03',
                accumulated_return:213.33,
                average_return:15.16,
                daily_return:0.09,
                entry_value:3,
                effective_entry_date:'2014-10-09',
                exit_value:3,
                effective_exit_date:'2014-10-09',
                pattern_close_chart_url: 'www.chartUrl1.com',
                pattern_six_years_chart_url:'www.sixYearsChartUrl',
                week_trend_chart_url:'www.chartWeekUrl',
                month_trend_chart_url:'monthTrendUrl',
                duration:173,
                best_gain:13,
                best_gain_date: '2014-10-12',
                worst_loss:-2,
                worst_loss_date:'2014-09-13',
                last_performance:3,
                bearish_asset_symbol:'ASSETI32',
                bearish_average_return:13,
                bullish_average_return:14,
                bearish_entry_value:33,
                bearish_exit_value:4,
                daily_pair_return: 4,
                pair_volatility:5,
                last_performance_date: '2014-10-14',
                drawdown: -27.31,
                winning_years_mean_rent: 220.41,
                losing_years_mean_rent:-8.08,
                product_type:0,
                bullish_average_win:15,
                bullish_average_loss:0,
                bearish_average_win:13,
                bearish_average_loss:2
            }
        },
        {
            type: 'insert',
            table: 'pattern',
            values: {
                pattern_disc: 2,
                id: 16,
                pack_code: 'INDEX-P-2',
                pattern_type: 1,
                win: 13,
                loss: 2,
                asset_symbol: 'ASSETI41',
                entry_date: '2014-11-11',
                exit_date:'2014-05-03',
                accumulated_return:213.33,
                average_return:15.16,
                daily_return:0.09,
                entry_value:11,
                effective_entry_date:'2014-11-01',
                exit_value:13,
                effective_exit_date:'2014-11-02',
                pattern_close_chart_url: 'www.chartUrl1.com',
                pattern_six_years_chart_url:'www.sixYearsChartUrl',
                week_trend_chart_url:'www.chartWeekUrl',
                month_trend_chart_url:'monthTrendUrl',
                duration:173,
                best_gain:-2,
                best_gain_date:'2014-10-03',
                worst_loss:-3,
                worst_loss_date:'2014-10-04',
                last_performance:2,
                bearish_asset_symbol:'ASSETI42',
                bearish_average_return:12,
                bullish_average_return:13,
                bearish_entry_value:4,
                bearish_exit_value:5,
                daily_pair_return: 6,
                pair_volatility:7,
                last_performance_date: '2014-10-01',
                drawdown: -27.31,
                winning_years_mean_rent: 220.41,
                losing_years_mean_rent:-8.08,
                product_type:0,
                bullish_average_win:12,
                bullish_average_loss:3,
                bearish_average_win:11,
                bearish_average_loss:4
            }
        }
    ];
};