
/**
 * Created by David Verdú on 31/12/14.
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

exports.alerts_mail_fixture = function() {
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
                publication_date: '2014-11-04',
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
                publication_date: '2014-11-04',
                scope_text: 'Estados Unidos Pack II text',
                pattern_type: 0,
                subname: ' '
            }
        },
        {
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
            table: 'published_packs',
            values: {
                pack_code: 'USA-S-2',
                pack_month: 201411, //date of the month of the pack ALWAYS actual month
                publication_date: '2014-09-15',
                num_patterns: 50,
                letter_from: 'aaa',
                letter_until: 'zzz'
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
            table: 'asset',
            values: {
                asset_disc: 1,
                symbol: 'ASSET2',
                short_name: 'Asset 2',
                long_name: 'Long name Asset 2',
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
                pattern_disc: 1,
                id: 1,
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
                asset_symbol: 'ASSET2',
                entry_date: '2014-12-04',
                exit_date:'2015-01-20',
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
        { //PAIR PACK
            type: 'insert',
            table: 'pack',
            values: {
                code: 'USA-P-1',
                region_code: 'USA',
                name: 'Estados Unidos Pack I',
                product_type: 0,
                publication_date: '2014-11-04',
                scope_text: 'Estados Unidos Pack I text',
                pattern_type: 1,
                subname: ' '
            }
        },
        {
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
        },
        {
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
        },
        {
            type: 'insert',
            table: 'asset',
            values: {
                asset_disc: 1,
                symbol: 'ASSET21',
                short_name: 'Asset Pair 2 1',
                long_name: 'Long name Asset Pair 2 1',
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
        },
        {
            type: 'insert',
            table: 'asset',
            values: {
                asset_disc: 1,
                symbol: 'ASSET22',
                short_name: 'Asset Pair 2 2',
                long_name: 'Long name Asset Pair 2 2',
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
        },
        {
            type: 'insert',
            table: 'pattern',
            values: {
                pattern_disc: 2,
                id: 3,
                pack_code: 'USA-P-1',
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
                last_performance:20,
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
                id: 4,
                pack_code: 'USA-P-1',
                pattern_type: 1,
                win: 14,
                loss: 1,
                asset_symbol: 'ASSET21',
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
                last_performance:30,
                bearish_asset_symbol:'ASSET22',
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
        //subscriptions
        {
            type: 'insert',
            table: 'subscription',
            values: {
                subscription_disc: 1,
                id: 1,
                pack_code: 'USA-S-1',
                user_id: 1,
                subscription_date: '2013-11-01',
                start_date: '2013-11-01',
                subscription_duration: 2,
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
                pack_code: 'USA-P-1',
                user_id: 1,
                subscription_date: '2013-11-01',
                start_date: '2013-11-01',
                subscription_duration: 2,
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
                pack_code: 'USA-S-1',
                user_id: 2,
                subscription_date: '2013-11-01',
                start_date: '2013-11-01',
                subscription_duration: 2,
                end_date: '2014-12-01',
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
                user_id: 2,
                subscription_date: '2013-11-01',
                start_date: '2013-11-01',
                subscription_duration: 2,
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
                pack_code: 'USA-S-1',
                user_id: 3,
                subscription_date: '2013-11-01',
                start_date: '2013-11-01',
                subscription_duration: 2,
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
                pack_code: 'USA-P-1',
                user_id: 3,
                subscription_date: '2013-11-01',
                start_date: '2013-11-01',
                subscription_duration: 2,
                end_date: '2014-12-01',
                status: 0
            }
        },
    /**
     * Alerts
     */
        {
            type: 'insert',
            table: 'alert',
            values: {
                id: 1,
                pattern_id: 1,
                user_id: 1,
                price: 5,
                condition:0 // > condition
            }
        },
        {
            type: 'insert',
            table: 'alert',
            values: {
                id: 2,
                pattern_id: 2,
                user_id: 1,
                price: 20,
                condition:0 // > condition
            }
        },
        {
            type: 'insert',
            table: 'alert',
            values: {
                id: 3,
                pattern_id: 3,//pair1
                user_id: 1,
                price: 25,
                condition:1 // < condition
            }
        },
        {
            type: 'insert',
            table: 'alert',
            values: {
                id: 4,
                pattern_id: 2,
                user_id: 2,
                price: 30,
                condition:1 // < condition
            }
        },
        {
            type: 'insert',
            table: 'alert',
            values: {
                id: 5,
                pattern_id: 4,//pair2
                user_id: 2,
                price: 25,
                condition:1 // < condition
            }
        },
        {
            type: 'insert',
            table: 'alert',
            values: {
                id: 6,
                pattern_id: 1,
                user_id: 3,
                price: 50,
                condition:0 // > condition
            }
        },
        {
            type: 'insert',
            table: 'alert',
            values: {
                id: 7,
                pattern_id: 2,
                user_id: 3,
                price: 50,
                condition:0 // > condition
            }
        },
        //free pack pattern and free_subscription
        {
            type: 'insert',
            table: 'pattern',
            values: {
                pattern_disc: 2,
                id: 5,
                //pack_code: 'USA-P-1',
                pattern_type: 1,
                win: 14,
                loss: 1,
                asset_symbol: 'ASSET21',
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
                bearish_asset_symbol:'ASSET22',
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
                pattern_id: 5
            }
        },
        {
            type: 'insert',
            table: 'free_subscription',
            values: {
                id: 1,
                free_pack_code: '11',
                user_id: 4, //Test4 user
                subscription_date: '2014-11-02',
                start_date: '2014-11-02 20:00',
                end_date: '2014-11-16 20:00'
            }
        },
        {
            type: 'insert',
            table: 'alert',
            values: {
                id: 8,
                pattern_id: 5, //pattern in free pack
                user_id: 4, //Test4 user
                price: 20,
                condition:0 // > condition
            }
        },
        //expired subscription packs and patterns that are not notified by email when an alarm is set 
        { //PAIR PACK
            type: 'insert',
            table: 'pack',
            values: {
                code: 'USA-P-2',
                region_code: 'USA',
                name: 'Estados Unidos Pack II',
                product_type: 0,
                publication_date: '2014-11-04',
                scope_text: 'Estados Unidos Pack II text',
                pattern_type: 1,
                subname: ' '
            }
        },
        {
            type: 'insert',
            table: 'published_packs',
            values: {
                pack_code: 'USA-P-2',
                pack_month: 201411, //date of the month of the pack ALWAYS actual month
                publication_date: '2014-09-15',
                num_patterns: 50,
                letter_from: 'aaa',
                letter_until: 'zzz'
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
        },
        {
            type: 'insert',
            table: 'asset',
            values: {
                asset_disc: 1,
                symbol: 'ASSET32',
                short_name: 'Asset Pair 3 2',
                long_name: 'Long name Asset Pair 3 2',
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
        },
        {
            type: 'insert',
            table: 'pattern',
            values: {
                pattern_disc: 2,
                id: 6,
                pack_code: 'USA-P-2',
                pattern_type: 1,
                win: 14,
                loss: 1,
                asset_symbol: 'ASSET31',
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
                last_performance:20,
                bearish_asset_symbol:'ASSET32',
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
        { //expired subscription
            type: 'insert',
            table: 'subscription',
            values: {
                subscription_disc: 1,
                id: 7,
                pack_code: 'USA-P-2',
                user_id: 4,
                subscription_date: '2013-11-01',
                start_date: '2013-10-01',
                subscription_duration: 2,
                end_date: '2014-11-01',
                status: 0
            }
        },
        {
            type: 'insert',
            table: 'alert',
            values: {
                id: 9,
                pattern_id: 6, //pattern in expired pack
                user_id: 4, //Test4 user
                price: 20,
                condition:0 // > condition
            }
        },
    ];
};

exports.remove_alerts_mail_fixture = function() {
    return [
        {
            type: 'remove',
            table: 'alert'
        },
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

exports.select_renewal_fixture = function(conditions) {
    var conditions = conditions || {};
    return {
            type: 'select',
            table: 'renewal',
            //fields: ['id','name','surname','address','city','email_address'],
            condition: conditions
        };
};
