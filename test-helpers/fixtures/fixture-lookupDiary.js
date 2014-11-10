/**
 * Created by robgon on 10/11/14.
 */
'use strict';

var sha512 = require('sha512')

function sleep(ms) {
    var unixtime_ms = new Date().getTime();
    while (new Date().getTime() < unixtime_ms + ms) {
    }
}

//constructor
var FixtureGenerator = function () {

};

exports.remove_fixtures_subscriptions = function(){
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
        }
    ];
};

exports.fixture_lookupDiary = function() {
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
                name: 'index',
                area_code: 0
            }
        },{
            type: 'insert',
            table: 'region',
            values: {
                code: 'FUTURE',
                name: 'Futures',
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
                name: 'exchangeCanada1',
                currency_code: 'CU1',
                region_code:'CAN',
                sector_group: 'sector_group1'
            }
        },{
            type: 'insert',
            table: 'exchange',
            values: {
                symbol: 'EX2',
                name: 'exchangeCanada2',
                currency_code: 'CU1',
                region_code:'CAN',
                sector_group: 'sector_group2'
            }
        },{
            type: 'insert',
            table: 'exchange',
            values: {
                symbol: 'EX3',
                name: 'exchangeUSA1',
                currency_code: 'CU1',
                region_code:'USA',
                sector_group: 'sector_group3'
            }
        },{
            type: 'insert',
            table: 'exchange',
            values: {
                symbol: 'EX4',
                name: 'exchangeUSA2',
                currency_code: 'CU1',
                region_code:'USA',
                sector_group: 'sector_group4'
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
                volatility: 5.20,
                exchange_symbol: 'EX1',
                sector: 'sector1 SECTOR CD',
                industry: 'industry1 CD',
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
                volatility: 10.20,
                exchange_symbol: 'EX2',
                sector: 'sector2 SECTOR CD',
                industry: 'industry2 CD',
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
                volatility: 15.20,
                exchange_symbol: 'EX3',
                sector: 'sector3 SECTOR CD',
                industry: 'industry3 CD',
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
                volatility: 20.20,
                exchange_symbol: 'EX4',
                sector: 'sector4 SECTOR CD',
                industry: 'industry4 CD',
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
                pattern_type: 1,
                win: 14,
                loss: 1,
                asset_symbol: 'ASSET1',
                entry_date: '2014-11-11',
                exit_date:'2015-05-03',
                accumulated_return:5.33,
                average_return:5.16,
                daily_return:5.08,
                entry_value:null,
                 effective_entry_date:'2014-12-11',
                exit_value:null,
                effective_exit_date:null,
                pattern_close_chart_url: 'www.chartUrl1.com',
                pattern_six_years_chart_url:'www.sixYearsChartUrl',
                week_trend_chart_url:'www.chartWeekUrl',
                month_trend_chart_url:'monthTrendUrl',
                duration:7,
                best_gain:5.92,
                best_gain_date: '2014-08-07',
                worst_loss:5.30,
                worst_loss_date:'2014-05-08',
                last_performance:5.16,
                bearish_asset_symbol:null,
                bearish_average_return:null,
                bullish_average_return:null,
                bearish_entry_value:null,
                bearish_exit_value:null,
                daily_pair_return: null,
                pair_volatility:null,
                last_performance_date: '2014-11-11',
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
                exit_date:'2015-05-03',
                accumulated_return:10.33,
                average_return:10.16,
                daily_return:10.09,
                entry_value:null,
                 effective_entry_date:'2014-12-11',
                exit_value:null,
                effective_exit_date:null,
                pattern_close_chart_url: 'www.chartUrl1.com',
                pattern_six_years_chart_url:'www.sixYearsChartUrl',
                week_trend_chart_url:'www.chartWeekUrl',
                month_trend_chart_url:'monthTrendUrl',
                duration:11,
                best_gain:10.80,
                best_gain_date: '2014-09-09',
                worst_loss:10.29,
                worst_loss_date:'2014-09-22',
                last_performance:10.16,
                bearish_asset_symbol:null,
                bearish_average_return:null,
                bullish_average_return:null,
                bearish_entry_value:null,
                bearish_exit_value:null,
                daily_pair_return: null,
                pair_volatility:null,
                last_performance_date: '2014-11-11',
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
                pattern_type: 1,
                win: 13,
                loss: 3,
                asset_symbol: 'ASSET3',
                entry_date: '2014-11-11',
                exit_date:'2015-05-03',
                accumulated_return:15.33,
                average_return:15.16,
                daily_return:15.09,
                entry_value:null,
                 effective_entry_date:'2014-12-11',
                exit_value:null,
                effective_exit_date:null,
                pattern_close_chart_url: 'www.chartUrl1.com',
                pattern_six_years_chart_url:'www.sixYearsChartUrl',
                week_trend_chart_url:'www.chartWeekUrl',
                month_trend_chart_url:'monthTrendUrl',
                duration:16,
                best_gain:15.9,
                best_gain_date: '2014-11-10',
                worst_loss:15.1,
                worst_loss_date:'2014-09-08',
                last_performance:15.20,
                bearish_asset_symbol:null,
                bearish_average_return:null,
                bullish_average_return:null,
                bearish_entry_value:null,
                bearish_exit_value:null,
                daily_pair_return: null,
                pair_volatility:null,
                last_performance_date: '2014-11-11',
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
                exit_date:'2015-05-03',
                accumulated_return:20.33,
                average_return:20.16,
                daily_return:20.09,
                entry_value:null,
                 effective_entry_date:'2014-12-11',
                exit_value:null,
                effective_exit_date:null,
                pattern_close_chart_url: 'www.chartUrl1.com',
                pattern_six_years_chart_url:'www.sixYearsChartUrl',
                week_trend_chart_url:'www.chartWeekUrl',
                month_trend_chart_url:'monthTrendUrl',
                duration:21,
                best_gain:20.80,
                best_gain_date: '2014-10-10',
                worst_loss:20.12,
                worst_loss_date:'2014-11-12',
                last_performance:20.15,
                bearish_asset_symbol:null,
                bearish_average_return:null,
                bullish_average_return:null,
                bearish_entry_value:null,
                bearish_exit_value:null,
                daily_pair_return: null,
                pair_volatility:null,
                last_performance_date: '2014-11-11',
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
                pattern_type: 1,
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
                pattern_type: 1,
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
                short_name: 'Asset Pair 1 1',
                long_name: 'Long name Asset Pair 1 1',
                last_quote: 27.9,
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
                sector: 'sector1 SECTOR CD',
                industry: 'industry1 CD',
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
                exchange_symbol: 'EX2',
                sector: 'sector2 SECTOR CD',
                industry: 'industry2 CD',
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
                exchange_symbol: 'EX2',
                sector: 'sector2 SECTOR CD',
                industry: 'industry2 CD',
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
                exchange_symbol: 'EX3',
                sector: 'sector3 SECTOR CD',
                industry: 'industry3 CD',
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
                exchange_symbol: 'EX3',
                sector: 'sector3 SECTOR CD',
                industry: 'industry3 CD',
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
                exchange_symbol: 'EX4',
                sector: 'sector3 SECTOR CD',
                industry: 'industry3 CD',
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
                exchange_symbol: 'EX4',
                sector: 'sector4 SECTOR CD',
                industry: 'industry4 CD',
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
                exit_date:'2015-05-03',
                accumulated_return:5.33,
                average_return:5.16,
                daily_return:5.08,
                entry_value:1,
                effective_entry_date:'2014-12-12',
                exit_value:2,
                effective_exit_date:'2014-10-29',
                pattern_close_chart_url: 'www.chartUrl1.com',
                pattern_six_years_chart_url:'www.sixYearsChartUrl',
                week_trend_chart_url:'www.chartWeekUrl',
                month_trend_chart_url:'monthTrendUrl',
                duration:7,
                best_gain:5.20,
                best_gain_date: '2014-10-01',
                worst_loss:5.09,
                worst_loss_date:'2014-10-02',
                last_performance:5.4,
                bearish_asset_symbol:'ASSET12',
                bearish_average_return:1,
                bullish_average_return:2,
                bearish_entry_value:11,
                bearish_exit_value:22,
                daily_pair_return: 5.13,
                pair_volatility:5.5,
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
                exit_date:'2015-05-03',
                accumulated_return:10.34,
                average_return:10.16,
                daily_return:10.09,
                entry_value:13,
                effective_entry_date:'2014-12-12',
                exit_value:23,
                effective_exit_date:'2014-10-29',
                pattern_close_chart_url: 'www.chartUrl1.com',
                pattern_six_years_chart_url:'www.sixYearsChartUrl',
                week_trend_chart_url:'www.chartWeekUrl',
                month_trend_chart_url:'monthTrendUrl',
                duration:11,
                best_gain:10.8,
                best_gain_date: '2014-11-01',
                worst_loss:10.1,
                worst_loss_date:'2014-11-05',
                last_performance:10.3,
                bearish_asset_symbol:'ASSET22',
                bearish_average_return:13,
                bullish_average_return:4,
                bearish_entry_value:1,
                bearish_exit_value:3,
                daily_pair_return: 23,
                pair_volatility:10.4,
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
                exit_date:'2015-05-03',
                accumulated_return:15.33,
                average_return:15.16,
                daily_return:15.09,
                entry_value:3,
                effective_entry_date:'2014-12-12',
                exit_value:3,
                effective_exit_date:'2014-10-09',
                pattern_close_chart_url: 'www.chartUrl1.com',
                pattern_six_years_chart_url:'www.sixYearsChartUrl',
                week_trend_chart_url:'www.chartWeekUrl',
                month_trend_chart_url:'monthTrendUrl',
                duration:16,
                best_gain:15.13,
                best_gain_date: '2014-10-12',
                worst_loss:15.01,
                worst_loss_date:'2014-09-13',
                last_performance:15.13,
                bearish_asset_symbol:'ASSET32',
                bearish_average_return:13,
                bullish_average_return:14,
                bearish_entry_value:33,
                bearish_exit_value:4,
                daily_pair_return: 4,
                pair_volatility:15.4,
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
                exit_date:'2015-05-03',
                accumulated_return:213.33,
                average_return:20.14,
                daily_return:20.91,
                entry_value:11,
                effective_entry_date:'2014-12-12',
                exit_value:13,
                effective_exit_date:'2014-11-02',
                pattern_close_chart_url: 'www.chartUrl1.com',
                pattern_six_years_chart_url:'www.sixYearsChartUrl',
                week_trend_chart_url:'www.chartWeekUrl',
                month_trend_chart_url:'monthTrendUrl',
                duration:21,
                best_gain:20.50,
                best_gain_date:'2014-10-03',
                worst_loss:20.10,
                worst_loss_date:'2014-10-04',
                last_performance:20.5,
                bearish_asset_symbol:'ASSET42',
                bearish_average_return:12,
                bullish_average_return:13,
                bearish_entry_value:4,
                bearish_exit_value:5,
                daily_pair_return: 6,
                pair_volatility:20.2,
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
                name: 'index Simple 1',
                product_type: 1,
                publication_date: '2014-07-04',
                scope_text: 'index Simple 1 text',
                pattern_type: 0,
                subname: ' '
            }
        },{
            type: 'insert',
            table: 'pack',
            values: {
                code: 'INDEX-S-2',
                region_code: 'INDEX',
                name: 'index Simple 2',
                product_type: 1,
                publication_date: '2014-07-04',
                scope_text: 'index Simple 2 text',
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
                sector_group: 'sectGroup2'
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
                volatility: 5.20,
                exchange_symbol: 'IN1',
                sector: 'sector1 SECTOR CD',
                industry: 'industry1 CD',
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
                volatility: 10.20,
                exchange_symbol: 'IN1',
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
                symbol: 'ASSETI3',
                short_name: 'Asset Index 3',
                long_name: 'Long name Asset Index 3',
                last_quote: 27.7,
                last_quote_date: '2014-10-30',
                price_chart_url: 'www.urlPriceChart.com',
                volatility: 15.20,
                exchange_symbol: 'IN1',
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
                symbol: 'ASSETI4',
                short_name: 'Asset Index 4',
                long_name: 'Long name Asset Index 4',
                last_quote: 27.7,
                last_quote_date: '2014-10-30',
                price_chart_url: 'www.urlPriceChart.com',
                volatility: 20.20,
                exchange_symbol: 'IN1',
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
                id: 9,
                pack_code: 'INDEX-S-1',
                pattern_type: 1,
                win: 14,
                loss: 1,
                asset_symbol: 'ASSETI1',
                entry_date: '2014-11-11',
                exit_date:'2015-05-03',
                accumulated_return:5.33,
                average_return:5.16,
                daily_return:5.08,
                entry_value:null,
                 effective_entry_date:'2014-12-11',
                exit_value:null,
                effective_exit_date:null,
                pattern_close_chart_url: 'www.chartUrl1.com',
                pattern_six_years_chart_url:'www.sixYearsChartUrl',
                week_trend_chart_url:'www.chartWeekUrl',
                month_trend_chart_url:'monthTrendUrl',
                duration:7,
                best_gain:5.40,
                best_gain_date: '2014-11-01',
                worst_loss:5.01,
                worst_loss_date:'2014-10-02',
                last_performance:5.8,
                bearish_asset_symbol:null,
                bearish_average_return:null,
                bullish_average_return:null,
                bearish_entry_value:null,
                bearish_exit_value:null,
                daily_pair_return: null,
                pair_volatility:null,
                last_performance_date: '2014-11-12',
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
                exit_date:'2015-05-03',
                accumulated_return:10.33,
                average_return:10.16,
                daily_return:10.09,
                entry_value:null,
                effective_entry_date:'2014-12-11',
                exit_value:null,
                effective_exit_date:null,
                pattern_close_chart_url: 'www.chartUrl1.com',
                pattern_six_years_chart_url:'www.sixYearsChartUrl',
                week_trend_chart_url:'www.chartWeekUrl',
                month_trend_chart_url:'monthTrendUrl',
                duration:11,
                best_gain:10.40,
                best_gain_date: '2014-10-12',
                worst_loss:10.01,
                worst_loss_date:'2014-10-11',
                last_performance:10.4,
                bearish_asset_symbol:null,
                bearish_average_return:null,
                bullish_average_return:null,
                bearish_entry_value:null,
                bearish_exit_value:null,
                daily_pair_return: null,
                pair_volatility:null,
                last_performance_date: '2014-11-13',
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
                exit_date:'2015-05-03',
                accumulated_return:15.33,
                average_return:15.16,
                daily_return:15.09,
                entry_value:null,
                 effective_entry_date:'2014-12-12',
                exit_value:null,
                effective_exit_date:null,
                pattern_close_chart_url: 'www.chartUrl1.com',
                pattern_six_years_chart_url:'www.sixYearsChartUrl',
                week_trend_chart_url:'www.chartWeekUrl',
                month_trend_chart_url:'monthTrendUrl',
                duration:16,
                best_gain:15.90,
                best_gain_date: '2014-07-01',
                worst_loss:15.30,
                worst_loss_date:'2014-08-01',
                last_performance:15.7,
                bearish_asset_symbol:null,
                bearish_average_return:null,
                bullish_average_return:null,
                bearish_entry_value:null,
                bearish_exit_value:null,
                daily_pair_return: null,
                pair_volatility:null,
                last_performance_date: '2014-12-11',
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
                exit_date:'2015-05-03',
                accumulated_return:20.33,
                average_return:20.16,
                daily_return:20.09,
                entry_value:null,
                 effective_entry_date:'2014-12-12',
                exit_value:null,
                effective_exit_date:null,
                pattern_close_chart_url: 'www.chartUrl1.com',
                pattern_six_years_chart_url:'www.sixYearsChartUrl',
                week_trend_chart_url:'www.chartWeekUrl',
                month_trend_chart_url:'monthTrendUrl',
                duration:21,
                best_gain:20.15,
                best_gain_date: '2014-09-10',
                worst_loss:20.05,
                worst_loss_date:'2014-11-12',
                last_performance:20.34,
                bearish_asset_symbol:null,
                bearish_average_return:null,
                bullish_average_return:null,
                bearish_entry_value:null,
                bearish_exit_value:null,
                daily_pair_return: null,
                pair_volatility:null,
                last_performance_date: '2014-12-11',
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
                name: 'index Pair I',
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
                name: 'index Pair II',
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
                short_name: 'Asset Pair Index 1 1',
                long_name: 'Long name Asset Pair Index 1 1',
                last_quote: 27.9,
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
                sector: 'sector1 SECTOR CD',
                industry: 'industry1 CD',
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
                sector: 'sector1 SECTOR CD',
                industry: 'industry1 CD',
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
                symbol: 'ASSETI31',
                short_name: 'Asset Pair Index 3 1',
                long_name: 'Long name Asset Pair Index 3 1',
                last_quote: 27.7,
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
                symbol: 'ASSETI41',
                short_name: 'Asset Pair Index 4 1',
                long_name: 'Long name Asset Pair Index 4 1',
                last_quote: 27.7,
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
                symbol: 'ASSETI42',
                short_name: 'Asset Pair Index 4 2',
                long_name: 'Long name Asset Pair Index 4 2',
                last_quote: 27.7,
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
                id: 13,
                pack_code: 'INDEX-P-1',
                pattern_type: 1,
                win: 14,
                loss: 1,
                asset_symbol: 'ASSETI11',
                entry_date: '2014-11-11',
                exit_date:'2015-05-03',
                accumulated_return:5.33,
                average_return:5.16,
                daily_return:5.08,
                entry_value:1,
                effective_entry_date:'2014-12-24',
                exit_value:2,
                effective_exit_date:'2014-10-29',
                pattern_close_chart_url: 'www.chartUrl1.com',
                pattern_six_years_chart_url:'www.sixYearsChartUrl',
                week_trend_chart_url:'www.chartWeekUrl',
                month_trend_chart_url:'monthTrendUrl',
                duration:7,
                best_gain:5.02,
                best_gain_date: '2014-10-01',
                worst_loss:5.01,
                worst_loss_date:'2014-10-02',
                last_performance:5.4,
                bearish_asset_symbol:'ASSETI12',
                bearish_average_return:1,
                bullish_average_return:2,
                bearish_entry_value:11,
                bearish_exit_value:22,
                daily_pair_return: 5.13,
                pair_volatility:5.5,
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
                exit_date:'2015-05-03',
                accumulated_return:10.33,
                average_return:10.16,
                daily_return:10.09,
                entry_value:13,
                effective_entry_date:'2014-12-01',
                exit_value:23,
                effective_exit_date:'2014-10-29',
                pattern_close_chart_url: 'www.chartUrl1.com',
                pattern_six_years_chart_url:'www.sixYearsChartUrl',
                week_trend_chart_url:'www.chartWeekUrl',
                month_trend_chart_url:'monthTrendUrl',
                duration:11,
                best_gain:10.13,
                best_gain_date: '2014-11-01',
                worst_loss:10.05,
                worst_loss_date:'2014-11-05',
                last_performance:10.23,
                bearish_asset_symbol:'ASSETI22',
                bearish_average_return:13,
                bullish_average_return:4,
                bearish_entry_value:1,
                bearish_exit_value:3,
                daily_pair_return: 23,
                pair_volatility:10.5,
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
                exit_date:'2015-05-03',
                accumulated_return:15.33,
                average_return:15.16,
                daily_return:15.09,
                entry_value:3,
                effective_entry_date:'2014-12-09',
                exit_value:3,
                effective_exit_date:'2014-10-09',
                pattern_close_chart_url: 'www.chartUrl1.com',
                pattern_six_years_chart_url:'www.sixYearsChartUrl',
                week_trend_chart_url:'www.chartWeekUrl',
                month_trend_chart_url:'monthTrendUrl',
                duration:16,
                best_gain:15.19,
                best_gain_date: '2014-10-12',
                worst_loss:15.01,
                worst_loss_date:'2014-09-13',
                last_performance:15.31,
                bearish_asset_symbol:'ASSETI32',
                bearish_average_return:13,
                bullish_average_return:14,
                bearish_entry_value:33,
                bearish_exit_value:4,
                daily_pair_return: 4,
                pair_volatility:15.7,
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
                exit_date:'2015-05-03',
                accumulated_return:20.33,
                average_return:20.16,
                daily_return:20.09,
                entry_value:11,
                effective_entry_date:'2014-12-01',
                exit_value:13,
                effective_exit_date:'2014-11-02',
                pattern_close_chart_url: 'www.chartUrl1.com',
                pattern_six_years_chart_url:'www.sixYearsChartUrl',
                week_trend_chart_url:'www.chartWeekUrl',
                month_trend_chart_url:'monthTrendUrl',
                duration:21,
                best_gain:20.80,
                best_gain_date:'2014-10-03',
                worst_loss:20.14,
                worst_loss_date:'2014-10-04',
                last_performance:20.45,
                bearish_asset_symbol:'ASSETI42',
                bearish_average_return:12,
                bullish_average_return:13,
                bearish_entry_value:4,
                bearish_exit_value:5,
                daily_pair_return: 6,
                pair_volatility:15.7,
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
        },{/*FUTURES*/
            type: 'insert',
            table: 'exchange',
            values: {
                symbol: 'EXF1',
                name: 'exchangeFuture1',
                currency_code: 'CU1',
                region_code:'FUTURE',
                sector_group: 'sector_group1'
            }
        },{
            type: 'insert',
            table: 'exchange',
            values: {
                symbol: 'EXF2',
                name: 'exchangeFuture2',
                currency_code: 'CU1',
                region_code:'FUTURE',
                sector_group: 'sector_group2'
            }
        },{
            type: 'insert',
            table: 'exchange',
            values: {
                symbol: 'EXF3',
                name: 'exchangeFuture3',
                currency_code: 'CU1',
                region_code:'FUTURE',
                sector_group: 'sector_group3'
            }
        },{
            type: 'insert',
            table: 'exchange',
            values: {
                symbol: 'EXF4',
                name: 'exchangeFuture4',
                currency_code: 'CU1',
                region_code:'FUTURE',
                sector_group: 'sector_group4'
            }
        },
        {
            type: 'insert',
            table: 'pack',
            values: {
                code: 'FUTURE-S-1',
                region_code: 'FUTURE',
                name: 'Futures Pack 1',
                product_type: 2,
                publication_date: '2014-07-04',
                scope_text: 'Futures Pack 1 text',
                pattern_type: 0,
                subname: ' '
            }
        },
        {
            type: 'insert',
            table: 'published_packs',
            values: {
                pack_code: 'FUTURE-S-1',
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
                id: 9,
                pack_code: 'FUTURE-S-1',
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
            table: 'asset',
            values: {
                asset_disc: 1,
                symbol: 'ASSETF1',
                short_name: 'Asset Future 1',
                long_name: 'Long name Asset Future 1',
                last_quote: 27.7,
                last_quote_date: '2014-10-30',
                price_chart_url: 'www.urlPriceChart.com',
                volatility: 5.20,
                exchange_symbol: 'EXF1',
                sector: 'sector1 SECTOR CD',
                industry: 'industry1 CD',
                expiration_year: null,
                expiration_month: null,
                volatility_chart_url: 'www.urlVolatChart.com'
            }
        },{
            type: 'insert',
            table: 'asset',
            values: {
                asset_disc: 1,
                symbol: 'ASSETF2',
                short_name: 'Asset Future 2',
                long_name: 'Long name Asset Future 2',
                last_quote: 27.7,
                last_quote_date: '2014-10-30',
                price_chart_url: 'www.urlPriceChart.com',
                volatility: 10.20,
                exchange_symbol: 'EXF2',
                sector: 'sector2 SECTOR CD',
                industry: 'industry2 CD',
                expiration_year: null,
                expiration_month: null,
                volatility_chart_url: 'www.urlVolatChart.com'
            }
        },{
            type: 'insert',
            table: 'asset',
            values: {
                asset_disc: 1,
                symbol: 'ASSETF3',
                short_name: 'Asset Future 3',
                long_name: 'Long name Asset Future 3',
                last_quote: 27.7,
                last_quote_date: '2014-10-30',
                price_chart_url: 'www.urlPriceChart.com',
                volatility: 15.20,
                exchange_symbol: 'EXF3',
                sector: 'sector3 SECTOR CD',
                industry: 'industry3 CD',
                expiration_year: null,
                expiration_month: null,
                volatility_chart_url: 'www.urlVolatChart.com'
            }
        },{
            type: 'insert',
            table: 'asset',
            values: {
                asset_disc: 1,
                symbol: 'ASSETF4',
                short_name: 'Asset Future 4',
                long_name: 'Long name Asset Future 4',
                last_quote: 27.7,
                last_quote_date: '2014-10-30',
                price_chart_url: 'www.urlPriceChart.com',
                volatility: 20.20,
                exchange_symbol: 'EXF4',
                sector: 'sector2 SECTOR CD',
                industry: 'industry2 CD',
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
                id: 17,
                pack_code: 'FUTURE-S-1',
                pattern_type: 1,
                win: 14,
                loss: 1,
                asset_symbol: 'ASSETF1',
                entry_date: '2014-11-11',
                exit_date:'2015-05-03',
                accumulated_return:5.33,
                average_return:5.16,
                daily_return:5.08,
                entry_value:null,
                 effective_entry_date:'2014-12-11',
                exit_value:null,
                effective_exit_date:null,
                pattern_close_chart_url: 'www.chartUrl1.com',
                pattern_six_years_chart_url:'www.sixYearsChartUrl',
                week_trend_chart_url:'www.chartWeekUrl',
                month_trend_chart_url:'monthTrendUrl',
                duration:7,
                best_gain:5.14,
                best_gain_date: '2014-11-23',
                worst_loss:5.03,
                worst_loss_date:'2014-11-24',
                last_performance:5.11,
                bearish_asset_symbol:null,
                bearish_average_return:null,
                bullish_average_return:null,
                bearish_entry_value:null,
                bearish_exit_value:null,
                daily_pair_return: null,
                pair_volatility:null,
                last_performance_date: '2014-12-20',
                drawdown: -27.31,
                winning_years_mean_rent: 220.41,
                losing_years_mean_rent:-8.08,
                product_type:2,
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
                id: 18,
                pack_code: 'FUTURE-S-1',
                pattern_type: 0,
                win: 13,
                loss: 2,
                asset_symbol: 'ASSETF2',
                entry_date: '2014-11-11',
                exit_date:'2015-05-03',
                accumulated_return:10.33,
                average_return:10.16,
                daily_return:10.09,
                entry_value:null,
                 effective_entry_date:'2014-12-11',
                exit_value:null,
                effective_exit_date:null,
                pattern_close_chart_url: 'www.chartUrl1.com',
                pattern_six_years_chart_url:'www.sixYearsChartUrl',
                week_trend_chart_url:'www.chartWeekUrl',
                month_trend_chart_url:'monthTrendUrl',
                duration:11,
                best_gain:10.56,
                best_gain_date: '2014-09-12',
                worst_loss:10.01,
                worst_loss_date:'2014-11-12',
                last_performance:10.25,
                bearish_asset_symbol:null,
                bearish_average_return:null,
                bullish_average_return:null,
                bearish_entry_value:null,
                bearish_exit_value:null,
                daily_pair_return: null,
                pair_volatility:null,
                last_performance_date: '2014-10-30',
                drawdown: -27.31,
                winning_years_mean_rent: 220.41,
                losing_years_mean_rent:-8.08,
                product_type:2,
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
                id: 19,
                pack_code: 'FUTURE-S-1',
                pattern_type: 1,
                win: 13,
                loss: 2,
                asset_symbol: 'ASSETF3',
                entry_date: '2014-11-11',
                exit_date:'2015-05-03',
                accumulated_return:15.33,
                average_return:15.16,
                daily_return:15.09,
                entry_value:null,
                 effective_entry_date:'2014-12-11',
                exit_value:null,
                effective_exit_date:null,
                pattern_close_chart_url: 'www.chartUrl1.com',
                pattern_six_years_chart_url:'www.sixYearsChartUrl',
                week_trend_chart_url:'www.chartWeekUrl',
                month_trend_chart_url:'monthTrendUrl',
                duration:16,
                best_gain:15.85,
                best_gain_date: '2014-11-13',
                worst_loss:15.34,
                worst_loss_date:'2014-10-10',
                last_performance:15.7,
                bearish_asset_symbol:null,
                bearish_average_return:null,
                bullish_average_return:null,
                bearish_entry_value:null,
                bearish_exit_value:null,
                daily_pair_return: null,
                pair_volatility:null,
                last_performance_date: '2014-12-03',
                drawdown: -27.31,
                winning_years_mean_rent: 220.41,
                losing_years_mean_rent:-8.08,
                product_type:2,
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
                id: 20,
                pack_code: 'FUTURE-S-1',
                pattern_type: 0,
                win: 13,
                loss: 2,
                asset_symbol: 'ASSETF4',
                entry_date: '2014-11-11',
                exit_date:'2015-05-03',
                accumulated_return:20.33,
                average_return:20.16,
                daily_return:20.09,
                entry_value:null,
                 effective_entry_date:'2014-12-11',
                exit_value:null,
                effective_exit_date:null,
                pattern_close_chart_url: 'www.chartUrl1.com',
                pattern_six_years_chart_url:'www.sixYearsChartUrl',
                week_trend_chart_url:'www.chartWeekUrl',
                month_trend_chart_url:'monthTrendUrl',
                duration:21,
                best_gain:20.58,
                best_gain_date: '2014-08-09',
                worst_loss:20.13,
                worst_loss_date:'2014-09-12',
                last_performance:20.14,
                bearish_asset_symbol:null,
                bearish_average_return:null,
                bullish_average_return:null,
                bearish_entry_value:null,
                bearish_exit_value:null,
                daily_pair_return: null,
                pair_volatility:null,
                last_performance_date: '2014-12-14',
                drawdown: -27.31,
                winning_years_mean_rent: 220.41,
                losing_years_mean_rent:-8.08,
                product_type:2,
                bullish_average_win:null,
                bullish_average_loss:null,
                bearish_average_win:null,
                bearish_average_loss:null
            }
        }

    ];
};