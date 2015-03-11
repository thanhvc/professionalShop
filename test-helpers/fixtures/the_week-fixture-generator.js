
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

//Assumes that today is 17/11/2014 

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
            table: 'pack',
            values: {
                code: 'CAN-S-1',
                region_code: 'CAN',
                name: 'Canada Simple 1',
                product_type: 0,
                publication_date: '2014-11-01',
                scope_text: 'Simple Pack 1 text',
                pattern_type: 0,
                subname: ' '
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
                subscription_date: '2014-11-01',
                start_date: '2014-11-01',
                subscription_duration: 2,
                end_date: '2015-11-01',
                status: 0
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
        //S&P tab group 1
        {
            type: 'insert',
            table: 'asset',
            values: {
                asset_disc: 1,
                symbol: 'SP500_1',
                short_name: 'SP500 E',
                long_name: 'S&P 500 ENERGY',
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
                symbol: 'SP500_1_1',
                short_name: 'SP500 E ES',
                long_name: 'S&P 500 ENERGY EQUIPMENT & SERVICES',
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
                symbol: 'SP500_1_2',
                short_name: 'SP500 E OGC',
                long_name: 'S&P 500 OIL, GAS & CONSUMABLE FUELS',
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
        //S&P tab group 2
        {
            type: 'insert',
            table: 'asset',
            values: {
                asset_disc: 1,
                symbol: 'SP500_2',
                short_name: 'SP500 M',
                long_name: 'S&P 500 MATERIALS',
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
                symbol: 'SP500_2_1',
                short_name: 'SP500 M CH',
                long_name: 'S&P 500 CHEMICALS (INDUSTRY)',
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
                symbol: 'SP500_2_2',
                short_name: 'SP500 M MET',
                long_name: 'S&P 500 METALS & MINING',
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
        //week entries
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
                ordering: 2,
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
                ordering: 3,
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
                ordering: 5,
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
                ordering: 6,
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
        //TAB 2
        {
            type: 'insert',
            table: 'week_entry_data',
            values: {
                id: 7,
                win: 14,
                loss: 2,
                return_value: 0.32,
                return_chart_url: "chart1",
                asset_symbol: 'ASSET1',
                main_asset_id: null,
                week_number: 47,
                year: 2014,
                ordering: 1,
                week_section: 55, //Composite?
                week_area:4, //Materias primas
                week_tab: 1, //Commodities
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
                //main_asset_id: null,
                week_number: 47,
                year: 2014,
                ordering: 2,
                week_section: 55, //Composite?
                week_area:4, //Materias primas
                week_tab: 1, //Commodities
                monday_win: 2,
                monday_loss: 12,
                monday_return_value: -0.58,
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
                return_chart_url: "chart3",
                asset_symbol: 'ASSET3',
                main_asset_id: null,
                week_number: 47,
                year: 2014,
                ordering: 3,
                week_section: 55, //Composite?
                week_area:4, //Materias primas
                week_tab: 1, //Commodities
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
                return_chart_url: "chart4",
                asset_symbol: 'ASSET4',
                main_asset_id: null,
                week_number: 47,
                year: 2014,
                ordering: 4,
                week_section: 56, //Sectors, Components and thematic
                week_area:4, //Materias primas
                week_tab: 1, //Commodities
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
                return_chart_url: "chart5",
                asset_symbol: 'ASSET5',
                main_asset_id: null,
                week_number: 47,
                year: 2014,
                ordering: 5,
                week_section: 56, //Sectors, Components and thematic
                week_area:4, //Materias primas
                week_tab: 1, //Commodities
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
                id: 12,
                win: 13,
                loss: 2,
                return_value: -0.32,
                return_chart_url: "chart6",
                asset_symbol: 'ASSET6',
                main_asset_id: null,
                week_number: 47,
                year: 2014,
                ordering: 6,
                week_section: 56, //Sectors, Components and thematic
                week_area:4, //Materias primas
                week_tab: 1, //Commodities
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
      //TAB 3 S&P 500
        //S&P 500 ENERGY group
        {
            type: 'insert',
            table: 'week_entry_data',
            values: {
                id: 13,
                win: 13,
                loss: 2,
                return_value: -0.32,
                return_chart_url: "chart_1",
                asset_symbol: 'SP500_1',  //S&P 500 ENERGY
                //main_asset_id: null, //S&P group
                week_number: 47,
                year: 2014,
                ordering: 1,
                week_section: 57,
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
                return_chart_url: "chart_1_1",
                asset_symbol: 'SP500_1_1', //S&P 500 ENERGY EQUIPMENT & SERVICES
                main_asset_id: 13,
                week_number: 47,
                year: 2014,
                ordering: 2,
                week_section: 57,
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
                win: 2,
                loss: 13,
                return_value: 0.55,
                return_chart_url: "chart_1_2",
                asset_symbol: 'SP500_1_2', //S&P 500 OIL, GAS & CONSUMABLE FUELS
                main_asset_id: 13,
                week_number: 47,
                year: 2014,
                ordering: 3,
                week_section: 57,
                week_area:5, //
                week_tab: 2, //S&P 500
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
        //S&P 500 MATERIALS group
        {
            type: 'insert',
            table: 'week_entry_data',
            values: {
                id: 16,
                win: 13,
                loss: 2,
                return_value: -0.32,
                return_chart_url: "chart_2",
                asset_symbol: 'SP500_2', //S&P 500 MATERIALS
                main_asset_id: null, //S&P group
                week_number: 47,
                year: 2014,
                ordering: 4,
                week_section: 57,
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
                id: 17,
                win: 13,
                loss: 2,
                return_value: -0.32,
                return_chart_url: "chart_2_1",
                asset_symbol: 'SP500_2_1', //S&P 500 CHEMICALS (INDUSTRY)
                main_asset_id: 16,
                week_number: 47,
                year: 2014,
                ordering: 5,
                week_section: 57,
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
                id: 18,
                win: 2,
                loss: 13,
                return_value: 0.55,
                return_chart_url: "chart_2_2",
                asset_symbol: 'SP500_2_2', //S&P 500 METALS & MINING
                main_asset_id: 16,
                week_number: 47,
                year: 2014,
                ordering: 6,
                week_section: 57,
                week_area:5, //
                week_tab: 2, //S&P 500
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

        //entries for different week number (not used)
        {
            type: 'insert',
            table: 'week_entry_data',
            values: {
                id: 19,
                win: 2,
                loss: 13,
                return_value: 0.55,
                return_chart_url: "chart1",
                asset_symbol: 'ASSET1', 
                main_asset_id: 1,
                week_number: 46,
                year: 2014,
                ordering: 1,
                week_section: 0, //EEUU
                week_area:0, //AMERICA
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
                id: 20,
                win: 2,
                loss: 13,
                return_value: 0.55,
                return_chart_url: "chart2",
                asset_symbol: 'ASSET2', 
                main_asset_id: 1,
                week_number: 46,
                year: 2014,
                ordering: 2,
                week_section: 55, //Composite?
                week_area:4, //Materias primas
                week_tab: 1, //Commodities
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
                id: 21,
                win: 2,
                loss: 13,
                return_value: 0.55,
                return_chart_url: "chart1",
                asset_symbol: 'SP500_1', //S&P 500 METALS & MINING
                week_number: 46,
                year: 2014,
                ordering: 3,
                week_section: 57,
                week_area:5, //
                week_tab: 2, //S&P 500
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
                id: 22,
                win: 2,
                loss: 13,
                return_value: 0.55,
                return_chart_url: "chart1",
                asset_symbol: 'ASSET1', 
                main_asset_id: 1,
                week_number: 48,
                year: 2014,
                ordering: 4,
                week_section: 0, //EEUU
                week_area:0, //AMERICA
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
                id: 23,
                win: 2,
                loss: 13,
                return_value: 0.55,
                return_chart_url: "chart2",
                asset_symbol: 'ASSET2', 
                main_asset_id: 1,
                week_number: 48,
                year: 2014,
                ordering: 5,
                week_section: 55, //Composite?
                week_area:4, //Materias primas
                week_tab: 1, //Commodities
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
                id: 24,
                win: 2,
                loss: 13,
                return_value: 0.55,
                return_chart_url: "chart1",
                asset_symbol: 'SP500_1', //S&P 500 METALS & MINING
                week_number: 48,
                year: 2014,
                ordering: 6,
                week_section: 57,
                week_area:5, //
                week_tab: 2, //S&P 500
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
                id: 25,
                win: 2,
                loss: 13,
                return_value: 0.55,
                return_chart_url: "chart1",
                asset_symbol: 'ASSET1', 
                main_asset_id: 1,
                week_number: 47,
                year: 2013,
                ordering: 7,
                week_section: 0, //EEUU
                week_area:0, //AMERICA
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
                id: 26,
                win: 2,
                loss: 13,
                return_value: 0.55,
                return_chart_url: "chart2",
                asset_symbol: 'ASSET2', 
                main_asset_id: 1,
                week_number: 47,
                year: 2013,
                ordering: 8,
                week_section: 55, //Composite?
                week_area:4, //Materias primas
                week_tab: 1, //Commodities
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
                id: 27,
                win: 2,
                loss: 13,
                return_value: 0.55,
                return_chart_url: "chart1",
                asset_symbol: 'SP500_1', //S&P 500 METALS & MINING
                week_number: 47,
                year: 2013,
                ordering: 9,
                week_section: 57,
                week_area:5, //
                week_tab: 2, //S&P 500
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
            table: 'subscription'
        },
        {
            type: 'remove',
            table: 'pack'
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
            table: 'currency'
        }
    ];
};
