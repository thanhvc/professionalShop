
/**
 * Created by David Verdú on 18/11/14.
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

exports.the_week_fixture = function() {
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
            table: 'currency',
            values: {
                code: 'CU1',
                symbol:'CU1',
                name:'Currency1'
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
            table: 'exchange',
            values: {
                symbol: 'EX1',
                name: 'exchangeCanada1',
                currency_code: 'CU1',
                region_code:'CAN',
                sector_group: 'sector_group1'
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
                volatility: 19.20,
                exchange_symbol: 'EX1',
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
                volatility: 19.20,
                exchange_symbol: 'EX1',
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
                volatility: 19.20,
                exchange_symbol: 'EX1',
                sector: 'sector4 SECTOR CD',
                industry: 'industry4 CD',
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
                symbol: 'ASSET5',
                short_name: 'Asset 5',
                long_name: 'Long name Asset 5',
                last_quote: 27.7,
                last_quote_date: '2014-10-30',
                price_chart_url: 'www.urlPriceChart.com',
                volatility: 19.20,
                exchange_symbol: 'EX1',
                sector: 'sector4 SECTOR CD',
                industry: 'industry4 CD',
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
                symbol: 'ASSET6',
                short_name: 'Asset 6',
                long_name: 'Long name Asset 6',
                last_quote: 27.7,
                last_quote_date: '2014-10-30',
                price_chart_url: 'www.urlPriceChart.com',
                volatility: 19.20,
                exchange_symbol: 'EX1',
                sector: 'sector4 SECTOR CD',
                industry: 'industry4 CD',
                expiration_year: null,
                expiration_month: null,
                volatility_chart_url: 'www.urlVolatChart.com'
            }
        },
        {
            type: 'insert',
            table: 'week_entry_data',
            values: {
                id: 1,
                win: 14,
                loss: 1,
                return_value: -0.32,
                return_chart_url: "chart1",
                asset_symbol: 'ASSET1',
                main_asset_id: null,
                week_number: 47,
                year: 2014,
                ordering: 1,
                week_section: 0, //EEUU
                week_area:0, //AMERICA
                week_tab: 0, //Stocks
                monday_win: 12,
                monday_loss: 2,
                monday_return_value: 0.58,
                tuesday_win: 13,
                tuesday_loss: 2,
                tuesday_return_value: 0.08,
                wednesday_win: 9,
                wednesday_loss: 2,
                wednesday_return_value: 0.44,
                thursday_win: 9,
                thursday_loss: 4,
                thursday_return_value: 0.44,
                friday_win: 9,
                friday_loss: 4,
                friday_return_value: -0.44
            }       
        },
        {
            type: 'insert',
            table: 'week_entry_data',
            values: {
                id: 2,
                win: 13,
                loss: 2,
                return_value: -0.32,
                return_chart_url: "chart2",
                asset_symbol: 'ASSET2',
                main_asset_id: null,
                week_number: 47,
                year: 2014,
                ordering: 3,
                week_section: 0,//EEUU
                week_area:0, //AMERICA
                week_tab: 0, //Stocks
                monday_win: 2,
                monday_loss: 12,
                monday_return_value: 0.58,
                tuesday_win: 13,
                tuesday_loss: 2,
                tuesday_return_value: 0.08,
                wednesday_win: 9,
                wednesday_loss: 2,
                wednesday_return_value: 0.44,
                thursday_win: 9,
                thursday_loss: 4,
                thursday_return_value: 0.44,
                friday_win: 9,
                friday_loss: 4,
                friday_return_value: -0.44
            }       
        },
        {
            type: 'insert',
            table: 'week_entry_data',
            values: {
                id: 3,
                win: 14,
                loss: 1,
                return_value: -0.32,
                return_chart_url: "chart3",
                asset_symbol: 'ASSET3',
                main_asset_id: null,
                week_number: 47,
                year: 2014,
                ordering: 1,
                week_section: 1, //CANADA
                week_area:0, //AMERICA
                week_tab: 0, //Stocks
                monday_win: 12,
                monday_loss: 2,
                monday_return_value: 0.58,
                tuesday_win: 13,
                tuesday_loss: 2,
                tuesday_return_value: 0.08,
                wednesday_win: 9,
                wednesday_loss: 2,
                wednesday_return_value: 0.44,
                thursday_win: 9,
                thursday_loss: 4,
                thursday_return_value: 0.44,
                friday_win: 9,
                friday_loss: 4,
                friday_return_value: -0.44
            }       
        },
        {
            type: 'insert',
            table: 'week_entry_data',
            values: {
                id: 4,
                win: 13,
                loss: 2,
                return_value: -0.32,
                return_chart_url: "chart4",
                asset_symbol: 'ASSET4',
                main_asset_id: null,
                week_number: 47,
                year: 2014,
                ordering: 4,
                week_section: 1, //CANADA
                week_area:0, //AMERICA
                week_tab: 0, //Stocks
                monday_win: 2,
                monday_loss: 12,
                monday_return_value: 0.58,
                tuesday_win: 13,
                tuesday_loss: 2,
                tuesday_return_value: 0.08,
                wednesday_win: 9,
                wednesday_loss: 2,
                wednesday_return_value: 0.44,
                thursday_win: 9,
                thursday_loss: 4,
                thursday_return_value: 0.44,
                friday_win: 9,
                friday_loss: 4,
                friday_return_value: -0.44
            }       
        },
        {
            type: 'insert',
            table: 'week_entry_data',
            values: {
                id: 5,
                win: 14,
                loss: 1,
                return_value: -0.32,
                return_chart_url: "chart5",
                asset_symbol: 'ASSET5',
                main_asset_id: null,
                week_number: 47,
                year: 2014,
                ordering: 1,
                week_section: 12, //CHINA
                week_area:1, //ASIA
                week_tab: 0, //Stocks
                monday_win: 12,
                monday_loss: 2,
                monday_return_value: 0.58,
                tuesday_win: 13,
                tuesday_loss: 2,
                tuesday_return_value: 0.08,
                wednesday_win: 9,
                wednesday_loss: 2,
                wednesday_return_value: 0.44,
                thursday_win: 9,
                thursday_loss: 4,
                thursday_return_value: 0.44,
                friday_win: 9,
                friday_loss: 4,
                friday_return_value: -0.44
            }       
        },
        {
            type: 'insert',
            table: 'week_entry_data',
            values: {
                id: 6,
                win: 2,
                loss: 13,
                return_value: -0.32,
                return_chart_url: "chart6",
                asset_symbol: 'ASSET6',
                main_asset_id: null,
                week_number: 47,
                year: 2014,
                ordering: 2,
                week_section: 12, //CHINA
                week_area:1, //ASIA
                week_tab: 0, //Stocks
                monday_win: 2,
                monday_loss: 12,
                monday_return_value: 0.58,
                tuesday_win: 2,
                tuesday_loss: 13,
                tuesday_return_value: 0.08,
                wednesday_win: 2,
                wednesday_loss: 9,
                wednesday_return_value: 0.44,
                thursday_win: 4,
                thursday_loss: 9,
                thursday_return_value: 0.44,
                friday_win: 4,
                friday_loss: 9,
                friday_return_value: -0.44
            }       
        },
        {
            type: 'insert',
            table: 'week_entry_data',
            values: {
                id: 7,
                win: 14,
                loss: 2,
                return_value: -0.32,
                return_chart_url: "chart1",
                asset_symbol: 'ASSET1',
                main_asset_id: null,
                week_number: 47,
                year: 2014,
                ordering: 1,
                week_section: 0,
                week_area:0, //AMERICA
                week_tab: 1, //Stocks
                monday_win: 12,
                monday_loss: 2,
                monday_return_value: 0.58,
                tuesday_win: 13,
                tuesday_loss: 2,
                tuesday_return_value: 0.08,
                wednesday_win: 9,
                wednesday_loss: 2,
                wednesday_return_value: 0.44,
                thursday_win: 9,
                thursday_loss: 4,
                thursday_return_value: 0.44,
                friday_win: 9,
                friday_loss: 4,
                friday_return_value: -0.44
            }       
        },
        {
            type: 'insert',
            table: 'week_entry_data',
            values: {
                id: 8,
                win: 13,
                loss: 2,
                return_value: -0.32,
                return_chart_url: "chart2",
                asset_symbol: 'ASSET2',
                main_asset_id: null,
                week_number: 47,
                year: 2014,
                ordering: 1,
                week_section: 0,
                week_area:0, //AMERICA
                week_tab: 1, //Stocks
                monday_win: 12,
                monday_loss: 2,
                monday_return_value: 0.58,
                tuesday_win: 13,
                tuesday_loss: 2,
                tuesday_return_value: 0.08,
                wednesday_win: 9,
                wednesday_loss: 2,
                wednesday_return_value: 0.44,
                thursday_win: 9,
                thursday_loss: 4,
                thursday_return_value: 0.44,
                friday_win: 9,
                friday_loss: 4,
                friday_return_value: -0.44
            }       
        },
        {
            type: 'insert',
            table: 'week_entry_data',
            values: {
                id: 9,
                win: 14,
                loss: 1,
                return_value: -0.32,
                return_chart_url: "chart1",
                asset_symbol: 'ASSET1',
                main_asset_id: null,
                week_number: 47,
                year: 2014,
                ordering: 1,
                week_section: 0,
                week_area:0, //AMERICA
                week_tab: 1, //Stocks
                monday_win: 12,
                monday_loss: 2,
                monday_return_value: 0.58,
                tuesday_win: 13,
                tuesday_loss: 2,
                tuesday_return_value: 0.08,
                wednesday_win: 9,
                wednesday_loss: 2,
                wednesday_return_value: 0.44,
                thursday_win: 9,
                thursday_loss: 4,
                thursday_return_value: 0.44,
                friday_win: 9,
                friday_loss: 4,
                friday_return_value: -0.44
            }       
        },
        {
            type: 'insert',
            table: 'week_entry_data',
            values: {
                id: 10,
                win: 13,
                loss: 2,
                return_value: -0.32,
                return_chart_url: "chart2",
                asset_symbol: 'ASSET2',
                main_asset_id: null,
                week_number: 47,
                year: 2014,
                ordering: 1,
                week_section: 0,
                week_area:0, //AMERICA
                week_tab: 1, //Stocks
                monday_win: 12,
                monday_loss: 2,
                monday_return_value: 0.58,
                tuesday_win: 13,
                tuesday_loss: 2,
                tuesday_return_value: 0.08,
                wednesday_win: 9,
                wednesday_loss: 2,
                wednesday_return_value: 0.44,
                thursday_win: 9,
                thursday_loss: 4,
                thursday_return_value: 0.44,
                friday_win: 9,
                friday_loss: 4,
                friday_return_value: -0.44
            }       
        },
        {
            type: 'insert',
            table: 'week_entry_data',
            values: {
                id: 11,
                win: 13,
                loss: 2,
                return_value: -0.32,
                return_chart_url: "chart3",
                asset_symbol: 'ASSET3',
                main_asset_id: null,
                week_number: 47,
                year: 2014,
                ordering: 1,
                week_section: 0,
                week_area:0, //AMERICA
                week_tab: 1, //Stocks
                monday_win: 12,
                monday_loss: 2,
                monday_return_value: 0.58,
                tuesday_win: 13,
                tuesday_loss: 2,
                tuesday_return_value: 0.08,
                wednesday_win: 9,
                wednesday_loss: 2,
                wednesday_return_value: 0.44,
                thursday_win: 9,
                thursday_loss: 4,
                thursday_return_value: 0.44,
                friday_win: 9,
                friday_loss: 4,
                friday_return_value: -0.44
            }       
        },
      //TAB 3 
        {
            type: 'insert',
            table: 'week_entry_data',
            values: {
                id: 12,
                win: 13,
                loss: 2,
                return_value: -0.32,
                return_chart_url: "chart3",
                asset_symbol: 'ASSET3',
                main_asset_id: 1,
                week_number: 47,
                year: 2014,
                ordering: 1,
                week_section: 0,
                week_area:5, //
                week_tab: 2, //S&P 500
                monday_win: 12,
                monday_loss: 2,
                monday_return_value: 0.58,
                tuesday_win: 13,
                tuesday_loss: 2,
                tuesday_return_value: 0.08,
                wednesday_win: 9,
                wednesday_loss: 2,
                wednesday_return_value: 0.44,
                thursday_win: 9,
                thursday_loss: 4,
                thursday_return_value: 0.44,
                friday_win: 9,
                friday_loss: 4,
                friday_return_value: -0.44
            }       
        },
        {
            type: 'insert',
            table: 'week_entry_data',
            values: {
                id: 13,
                win: 13,
                loss: 2,
                return_value: -0.32,
                return_chart_url: "chart3",
                asset_symbol: 'ASSET4',
                main_asset_id: 1,
                week_number: 47,
                year: 2014,
                ordering: 2,
                week_section: 0,
                week_area:5, //
                week_tab: 2, //S&P 500
                monday_win: 12,
                monday_loss: 2,
                monday_return_value: 0.58,
                tuesday_win: 13,
                tuesday_loss: 2,
                tuesday_return_value: 0.08,
                wednesday_win: 9,
                wednesday_loss: 2,
                wednesday_return_value: 0.44,
                thursday_win: 9,
                thursday_loss: 4,
                thursday_return_value: 0.44,
                friday_win: 9,
                friday_loss: 4,
                friday_return_value: -0.44
            }       
        },
        {
            type: 'insert',
            table: 'week_entry_data',
            values: {
                id: 14,
                win: 13,
                loss: 2,
                return_value: -0.32,
                return_chart_url: "chart3",
                asset_symbol: 'ASSET1',
                main_asset_id: 2,
                week_number: 47,
                year: 2014,
                ordering: 1,
                week_section: 0,
                week_area:5, //
                week_tab: 2, //S&P 500
                monday_win: 12,
                monday_loss: 2,
                monday_return_value: 0.58,
                tuesday_win: 13,
                tuesday_loss: 2,
                tuesday_return_value: 0.08,
                wednesday_win: 9,
                wednesday_loss: 2,
                wednesday_return_value: 0.44,
                thursday_win: 9,
                thursday_loss: 4,
                thursday_return_value: 0.44,
                friday_win: 9,
                friday_loss: 4,
                friday_return_value: -0.44
            }       
        },
        {
            type: 'insert',
            table: 'week_entry_data',
            values: {
                id: 15,
                win: 13,
                loss: 2,
                return_value: -0.32,
                return_chart_url: "chart3",
                asset_symbol: 'ASSET2',
                main_asset_id: 2,
                week_number: 47,
                year: 2014,
                ordering: 2,
                week_section: 0,
                week_area:5, //
                week_tab: 2, //S&P 500
                monday_win: 12,
                monday_loss: 2,
                monday_return_value: 0.58,
                tuesday_win: 13,
                tuesday_loss: 2,
                tuesday_return_value: 0.08,
                wednesday_win: 9,
                wednesday_loss: 2,
                wednesday_return_value: 0.44,
                thursday_win: 9,
                thursday_loss: 4,
                thursday_return_value: 0.44,
                friday_win: 9,
                friday_loss: 4,
                friday_return_value: -0.44
            }       
        }

    ];
};

exports.remove_the_week_fixture = function(){
    return [
        {
            type: 'remove',
            table: 'week_entry_data'
        },
        {
            type: 'remove',
            table: 'asset'
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
            table: 'country'
        },
        {
            type: 'remove',
            table: 'region'
        },
        {
            type: 'remove',
            table: 'sector'
        },
        {
            type: 'remove',
            table: 'currency'
        }
    ];
};
