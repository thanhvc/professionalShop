/**
 * Created by David Verdú on 17/03/15.
 */
'use strict';

var sha512 = require('sha512')
var loadFixture = require('../load-fixture.js')
var FixtureHelperMod = require('../fixture-helper.js');
var fixture_helper = new FixtureHelperMod.FixtureHelper();

function sleep(ms) {
    var unixtime_ms = new Date().getTime();
    while (new Date().getTime() < unixtime_ms + ms) {
    }
}

//constructor
var FixtureGenerator = function () {

};

exports.home_packs_fixture = function() {
    var fixtures = [
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
                code: 'FUTURE',
                name: 'Futuros'
            }
        },
        {
            type: 'insert',
            table: 'region',
            values: {
                code: 'INDEX',
                name: 'Índices'
            }
        },
        {
            type: 'insert',
            table: 'region',
            values: {
                code: 'ANSA',
                name: 'Sudeste Asiático',
                area_code: 1
            }
        },
        {
            type: 'insert',
            table: 'region',
            values: {
                code: 'CAN',
                name: 'Canadá',
                area_code: 0
            }
        },
        {
            type: 'insert',
            table: 'region',
            values: {
                code: 'CEE',
                name: 'Suiza + Europa del Este + Rusia',
                area_code: 2
            }
        },
        {
            type: 'insert',
            table: 'region',
            values: {
                code: 'CHN',
                name: 'China',
                area_code: 1
            }
        },
        {
            type: 'insert',
            table: 'region',
            values: {
                code: 'GBR',
                name: 'Reino Unido',
                area_code: 2
            }
        },
        {
            type: 'insert',
            table: 'region',
            values: {
                code: 'GMEI',
                name: 'Oriente Medio + Magreb',
                area_code: 2
            }
        },
        {
            type: 'insert',
            table: 'region',
            values: {
                code: 'HKG-SGP',
                name: 'Hong Kong + Singapur',
                area_code: 1
            }
        },
        {
            type: 'insert',
            table: 'region',
            values: {
                code: 'JPN',
                name: 'Japón',
                area_code: 1
            }
        },
        {
            type: 'insert',
            table: 'region',
            values: {
                code: 'KOR',
                name: 'Corea',
                area_code: 1
            }
        },
        {
            type: 'insert',
            table: 'region',
            values: {
                code: 'LATAM',
                name: 'Latino América',
                area_code: 0
            }
        },
        {
            type: 'insert',
            table: 'region',
            values: {
                code: 'NORDEN',
                name: 'Paises Nórdicos',
                area_code: 2
            }
        },
        {
            type: 'insert',
            table: 'region',
            values: {
                code: 'OCEANIA',
                name: 'Australia + Nueva Zelanda',
                area_code: 1
            }
        },
        {
            type: 'insert',
            table: 'region',
            values: {
                code: 'SOUTHASIA',
                name: 'India + Pakistán + Sri Lanka',
                area_code: 1
            }
        },
        {
            type: 'insert',
            table: 'region',
            values: {
                code: 'TWN',
                name: 'Taiwan',
                area_code: 1
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
                code: 'ZAF',
                name: 'Sudáfrica',
                area_code: 2
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
            table: 'currency',
            values: {
                code: 'CAD',
                symbol:'CAD',
                name:'Canadian Dollar'
            }
        },
        {
            type: 'insert',
            table: 'currency',
            values: {
                code: 'USD',
                symbol:'USD',
                name:'US Dollar'
            }
        },
        {
            type: 'insert',
            table: 'currency',
            values: {
                code: 'JPY',
                symbol:'JPY',
                name:'Yen'
            }
        },
        {
            type: 'insert',
            table: 'currency',
            values: {
                code: 'FUT',
                symbol:'FUT',
                name:'FUT'
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
            table: 'exchange',
            values: {
                symbol: 'EX2',
                name: 'exchangeUSA2',
                currency_code: 'CU1',
                region_code:'USA',
                sector_group: 'sector_group1'
            }
        },
        {
            type: 'insert',
            table: 'exchange',
            values: {
                symbol: 'EX3',
                name: 'exchangeUSA3',
                currency_code: 'CU1',
                region_code:'USA',
                sector_group: 'sector_group1'
            }
        },
        {
            type: 'insert',
            table: 'exchange',
            values: {
                symbol: 'EC1',
                name: 'exchangeCAN1',
                currency_code: 'CU1',
                region_code:'CAN',
                sector_group: 'sector_group1'
            }
        },
        {
            type: 'insert',
            table: 'exchange',
            values: {
                symbol: 'EC2',
                name: 'exchangeCAN2',
                currency_code: 'CU1',
                region_code:'CAN',
                sector_group: 'sector_group1'
            }
        },
        {
            type: 'insert',
            table: 'exchange',
            values: {
                symbol: 'EC3',
                name: 'exchangeCAN3',
                currency_code: 'CU1',
                region_code:'CAN',
                sector_group: 'sector_group1'
            }
        },
        {
            type: 'insert',
            table: 'exchange',
            values: {
                symbol: 'EJ1',
                name: 'exchangeJPN1',
                currency_code: 'JPY',
                region_code:'JPN',
                sector_group: 'sector_group1'
            }
        },
        {
            type: 'insert',
            table: 'exchange',
            values: {
                symbol: 'EJ2',
                name: 'exchangeJPN2',
                currency_code: 'JPY',
                region_code:'JPN',
                sector_group: 'sector_group1'
            }
        },
        {
            type: 'insert',
            table: 'exchange',
            values: {
                symbol: 'EJ3',
                name: 'exchangeJPN3',
                currency_code: 'JPY',
                region_code:'JPN',
                sector_group: 'sector_group1'
            }
        },
        {
            type: 'insert',
            table: 'exchange',
            values: {
                symbol: 'EF1',
                name: 'exchangeFUT1',
                currency_code: 'FUT',
                region_code:'FUTURE',
                sector_group: 'sector_groupFUT1'
            }
        },
        {
            type: 'insert',
            table: 'exchange',
            values: {
                symbol: 'EF2',
                name: 'exchangeFUT2',
                currency_code: 'FUT',
                region_code:'FUTURE',
                sector_group: 'sector_groupFUT2'
            }
        },
        {
            type: 'insert',
            table: 'exchange',
            values: {
                symbol: 'EF3',
                name: 'exchangeFUT3',
                currency_code: 'FUT',
                region_code:'FUTURE',
                sector_group: 'sector_groupFUT3'
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
        }
    ];

    // STOCKS =======================================================================================

    var stocks_fixture_data = [
        // ==== América simple packs
        { code: 'USA-S-1', region_code: 'USA', name: 'Estados Unidos Pack I',
          scope_text: 'AMEX, NASDAQ, NYSE, Bulletin Board' },
        { code: 'USA-S-2', region_code: 'USA', name: 'Estados Unidos Pack II',
          scope_text: 'AMEX, NASDAQ, NYSE, Bulletin Board' },
        { code: 'USA-S-4', region_code: 'USA', name: 'Estados Unidos Pack IV',
          scope_text: 'AMEX, NASDAQ, NYSE, Bulletin Board' },
        { code: 'USA-S-3', region_code: 'USA', name: 'Estados Unidos Pack III',
          scope_text: 'AMEX, NASDAQ, NYSE, Bulletin Board' },
        { code: 'USA-S-5', region_code: 'USA', name: 'Estados Unidos Pack V',
          scope_text: 'AMEX, NASDAQ, NYSE, Bulletin Board' },
        { code: 'USA-S-6', region_code: 'USA', name: 'Estados Unidos Pack VI',
          scope_text: 'AMEX, NASDAQ, NYSE, Bulletin Board' },
        { code: 'USA-S-7', region_code: 'USA', name: 'Estados Unidos Pack VII',
          scope_text: 'AMEX, NASDAQ, NYSE, Bulletin Board' },
        { code: 'USA-S-8', region_code: 'USA', name: 'Estados Unidos Pack VIII',
          scope_text: 'AMEX, NASDAQ, NYSE, Bulletin Board' },
        { code: 'USA-S-9', region_code: 'USA', name: 'Estados Unidos Pack IX',
          scope_text: 'AMEX, NASDAQ, NYSE, Bulletin Board' },
        { code: 'USA-S-10', region_code: 'USA', name: 'Estados Unidos Pack X',
          scope_text: 'AMEX, NASDAQ, NYSE, Bulletin Board' },
        { code: 'LATAM-S-1', region_code: 'LATAM', name: 'Latino América Pack I',
          num_patterns: 30,
          scope_text: 'Argentina, Brasil, Chile, México, Perú, Venezuela' },
        { code: 'CAN-S-1', region_code: 'CAN', name: 'Canadá Pack I',
          scope_text: 'Toronto Stock Exchange, Totonto Venture Stock Exchange, CTQS' },
        { code: 'CAN-S-2', region_code: 'CAN', name: 'Canadá Pack II',
          scope_text: 'Toronto Stock Exchange, Totonto Venture Stock Exchange, CTQS' },
        // ==== Asia Pacífico simple packs
        { code: 'TWN-S-1', region_code: 'TWN', name: 'Taiwán Pack I',
          scope_text: 'Taiwan SE, Gretai Securities OTC' },
        { code: 'TWN-S-2', region_code: 'TWN', name: 'Taiwán Pack II',
          scope_text: 'Taiwan SE, Gretai Securities OTC' },
        { code: 'ANSA-S-1', region_code: 'ANSA', name: 'Sudeste Asiático Pack I',
          scope_text: 'Indonesia, Malasia, Tailandia' },
        { code: 'ANSA-S-2', region_code: 'ANSA', name: 'Sudeste Asiático Pack II',
          scope_text: 'Indonesia, Malasia, Tailandia' },
        { code: 'JPN-S-1', region_code: 'JPN', name: 'Japón Pack I',
          scope_text: 'Fukuoka SE, Nagoya SE, Sapporo SE, Tokyo SE' },
        { code: 'JPN-S-2', region_code: 'JPN', name: 'Japón Pack II',
          scope_text: 'Fukuoka SE, Nagoya SE, Sapporo SE, Tokyo SE' },
        { code: 'JPN-S-3', region_code: 'JPN', name: 'Japón Pack III',
          scope_text: 'Fukuoka SE, Nagoya SE, Sapporo SE, Tokyo SE' },
        { code: 'JPN-S-4', region_code: 'JPN', name: 'Japón Pack IV',
          scope_text: 'Fukuoka SE, Nagoya SE, Sapporo SE, Tokyo SE' },
        { code: 'JPN-S-5', region_code: 'JPN', name: 'Japón Pack V',
          scope_text: 'Fukuoka SE, Nagoya SE, Sapporo SE, Tokyo SE' },
        { code: 'JPN-S-6', region_code: 'JPN', name: 'Japón Pack VI',
          scope_text: 'Fukuoka SE, Nagoya SE, Sapporo SE, Tokyo SE' },
        { code: 'JPN-S-7', region_code: 'JPN', name: 'Japón Pack VII',
          scope_text: 'Fukuoka SE, Nagoya SE, Sapporo SE, Tokyo SE' },
        { code: 'JPN-S-8', region_code: 'JPN', name: 'Japón Pack VIII',
          scope_text: 'Fukuoka SE, Nagoya SE, Sapporo SE, Tokyo SE' },
        { code: 'JPN-S-9', region_code: 'JPN', name: 'Japón Pack IX',
          scope_text: 'Fukuoka SE, Nagoya SE, Sapporo SE, Tokyo SE' },
        { code: 'JPN-S-10', region_code: 'JPN', name: 'Japón Pack X',
          scope_text: 'Fukuoka SE, Nagoya SE, Sapporo SE, Tokyo SE' },
        { code: 'SOUTHASIA-S-1', region_code: 'SOUTHASIA', name: 'India + Pakistán + Sri Lanka Pack I',
          scope_text: 'Bombay SE, Calcuta SE, National SE of India, Karachi SE, Colombo SE' },
        { code: 'SOUTHASIA-S-2', region_code: 'SOUTHASIA', name: 'India + Pakistán + Sri Lanka Pack II',
          scope_text: 'Bombay SE, Calcuta SE, National SE of India, Karachi SE, Colombo SE' },
        { code: 'SOUTHASIA-S-3', region_code: 'SOUTHASIA', name: 'India + Pakistán + Sri Lanka Pack III',
          scope_text: 'Bombay SE, Calcuta SE, National SE of India, Karachi SE, Colombo SE' },
        { code: 'KOR-S-1', region_code: 'KOR', name: 'Corea Pack I',
          scope_text: 'Korea SE, KOSDAQ' },
        { code: 'KOR-S-2', region_code: 'KOR', name: 'Corea Pack II',
          scope_text: 'Korea SE, KOSDAQ' },
        { code: 'CHN-S-1', region_code: 'CHN', name: 'China Pack I',
          scope_text: 'Shanghai SE, Shenzhen SE' },
        { code: 'CHN-S-2', region_code: 'CHN', name: 'China Pack II',
          scope_text: 'Shanghai SE, Shenzhen SE' },
        { code: 'OCEANIA-S-1', region_code: 'OCEANIA', name: 'Australia + Nueva Zelanda Pack I',
          scope_text: 'Australian SE, New Zealand SE' },
        { code: 'OCEANIA-S-2', region_code: 'OCEANIA', name: 'Australia + Nueva Zelanda Pack II',
          scope_text: 'Australian SE, New Zealand SE' },
        // ==== Europa África Oriente Medio simple packs
        { code: 'EUR-S-1', region_code: 'EUR', name: 'Zona Euro Pack I',
          scope_text: 'Alemania, Austria, Bélgica, España, Finlandia, Francia, Grecia, Irlanda, Italia, Luxemburgo, Países Bajos, Portugal' },
        { code: 'EUR-S-3', region_code: 'EUR', name: 'Zona Euro Pack III',
          scope_text: 'Alemania, Austria, Bélgica, España, Finlandia, Francia, Grecia, Irlanda, Italia, Luxemburgo, Países Bajos, Portugal' },
        { code: 'EUR-S-2', region_code: 'EUR', name: 'Zona Euro Pack II',
          scope_text: 'Alemania, Austria, Bélgica, España, Finlandia, Francia, Grecia, Irlanda, Italia, Luxemburgo, Países Bajos, Portugal' },
        { code: 'EUR-S-4', region_code: 'EUR', name: 'Zona Euro Pack IV',
          scope_text: 'Alemania, Austria, Bélgica, España, Finlandia, Francia, Grecia, Irlanda, Italia, Luxemburgo, Países Bajos, Portugal' },
        { code: 'EUR-S-5', region_code: 'EUR', name: 'Zona Euro Pack V',
          scope_text: 'Alemania, Austria, Bélgica, España, Finlandia, Francia, Grecia, Irlanda, Italia, Luxemburgo, Países Bajos, Portugal' },
        { code: 'EUR-S-6', region_code: 'EUR', name: 'Zona Euro Pack VI',
          scope_text: 'Alemania, Austria, Bélgica, España, Finlandia, Francia, Grecia, Irlanda, Italia, Luxemburgo, Países Bajos, Portugal' },
        { code: 'EUR-S-7', region_code: 'EUR', name: 'Zona Euro Pack VII',
          scope_text: 'Alemania, Austria, Bélgica, España, Finlandia, Francia, Grecia, Irlanda, Italia, Luxemburgo, Países Bajos, Portugal' },
        { code: 'EUR-S-8', region_code: 'EUR', name: 'Zona Euro Pack VIII',
          scope_text: 'Alemania, Austria, Bélgica, España, Finlandia, Francia, Grecia, Irlanda, Italia, Luxemburgo, Países Bajos, Portugal' },
        { code: 'CEE-S-1', region_code: 'CEE', name: 'Suiza + Europa del Este + Rusia Pack I',
          scope_text: 'Suiza, Hungría, República Checa, Rusia, Croacia' },
        { code: 'ZAF-S-1', region_code: 'ZAF', name: 'Sudáfrica Pack I',
          scope_text: 'Johannesburg SE' },
        { code: 'GBR-S-1', region_code: 'GBR', name: 'Reino Unido Pack I',
          scope_text: 'London SE' },
        { code: 'GBR-S-2', region_code: 'GBR', name: 'Reino Unido Pack II',
          scope_text: 'London SE' },
        { code: 'GBR-S-3', region_code: 'GBR', name: 'Reino Unido Pack III',
          scope_text: 'London SE' },
        { code: 'NORDEN-S-1', region_code: 'NORDEN', name: 'Países Nórdicos Pack I',
          scope_text: 'Dinamarca, Noruega, Suecia, Islandia' },
        { code: 'NORDEN-S-2', region_code: 'NORDEN', name: 'Países Nórdicos Pack II',
          scope_text: 'Dinamarca, Noruega, Suecia, Islandia' },
        { code: 'GMEI-S-1', region_code: 'GMEI', name: 'Oriente Medio + Magreb Pack I',
          scope_text: 'Turquía, Egipto, Marruecos, Jordania, Bathrein, Israel, Kuwait, Omán' }
    ];
    var stocks_fixture_options = { 
        default_pack_type: 'stocks', default_publication_date: '2014-09-15',
        create_published_packs: 1, default_num_patterns: 50,
        published_packs_months : [201410,201411,201412,201501] 
    };
    var stocks_fixtures = fixture_helper.generate_pack_fixtures(stocks_fixture_data,stocks_fixture_options);
    fixtures = fixtures.concat(stocks_fixtures);

    //additional packs to test differences on each month
    var stocks_fixture_data = [
        { code: 'ZZZ-S-Nov', region_code: 'EUR', name: 'Zzz Additional November Pack I',
          scope_text: 'Scope text for November' }
    ];
    var stocks_fixture_options = { 
        default_pack_type: 'stocks', default_publication_date: '2014-09-15',
        create_published_packs: 1, default_num_patterns: 100,
        published_packs_months : [201411] 
    };
    var stocks_fixtures = fixture_helper.generate_pack_fixtures(stocks_fixture_data,stocks_fixture_options);
    fixtures = fixtures.concat(stocks_fixtures);

    var stocks_fixture_data = [
        { code: 'ZZZ-S-Dec', region_code: 'EUR', name: 'Zzz Additional December Pack I',
          scope_text: 'Scope text for December' }
    ];
    var stocks_fixture_options = { 
        default_pack_type: 'stocks', default_publication_date: '2014-09-15',
        create_published_packs: 1, default_num_patterns: 100,
        published_packs_months : [201412] 
    };
    var stocks_fixtures = fixture_helper.generate_pack_fixtures(stocks_fixture_data,stocks_fixture_options);
    fixtures = fixtures.concat(stocks_fixtures);

    var stocks_fixture_data = [
        { code: 'ZZZ-S-Jan', region_code: 'EUR', name: 'Zzz Additional January Pack I',
          scope_text: 'Scope text for January' }
    ];
    var stocks_fixture_options = { 
        default_pack_type: 'stocks', default_publication_date: '2014-09-15',
        create_published_packs: 1, default_num_patterns: 100,
        published_packs_months : [201501] 
    };
    var stocks_fixtures = fixture_helper.generate_pack_fixtures(stocks_fixture_data,stocks_fixture_options);
    fixtures = fixtures.concat(stocks_fixtures);

    //create sector and industry filters for Canada Pack I
    var sector_industry_filters_data = {
        pack_code: 'CAN-S-1', type: 'stocks', first_sector_id: 1, first_industry_id: 1,
        months : [201411,201501], region_code: 'CAN', exchange_symbol: 'EC1',
        values: [
            {name: 'sector1', industries: ['industry1_1','industry1_2']},
            {name: 'sector2', industries: ['industry2_1','industry2_2']}
        ]   
    };
    var sector_industry_filters_fixtures = fixture_helper.generate_sector_industry_filters_fixtures(sector_industry_filters_data);
    fixtures = fixtures.concat(sector_industry_filters_fixtures);

    var sector_industry_filters_data = {
        pack_code: 'CAN-S-1', type: 'stocks', first_sector_id: 5, first_industry_id: 9,
        months : [201412], region_code: 'CAN', exchange_symbol: 'EC2',
        values: [
            {name: 'sector3', industries: ['industry3_1','industry3_2']},
            {name: 'sector4', industries: ['industry4_1','industry4_2']}
        ]   
    };
    var sector_industry_filters_fixtures = fixture_helper.generate_sector_industry_filters_fixtures(sector_industry_filters_data);
    fixtures = fixtures.concat(sector_industry_filters_fixtures);

    //create sector and industry filters for USA Pack I
    var sector_industry_filters_data = {
        pack_code: 'USA-S-1', type: 'stocks', first_sector_id: 7, first_industry_id: 13,
        months : [201411,201412,201501], region_code: 'USA', exchange_symbol: 'EX1',
        values: [
            {name: 'sector5', industries: ['industry5_1','industry5_2']},
            {name: 'sector6', industries: ['industry6_1','industry6_2']}
        ]   
    };
    var sector_industry_filters_fixtures = fixture_helper.generate_sector_industry_filters_fixtures(sector_industry_filters_data);
    fixtures = fixtures.concat(sector_industry_filters_fixtures);

    //create stocks patterns for Canada Pack I in November 2014
    var stocks_patterns_fixture_data = { 
        pack_code: 'CAN-S-1', type: 'stocks', quantity: 50, first_id: 1,
        entry_dates: ['2014-11-01','2014-11-05','2014-11-14','2014-11-15','2014-11-30'],
        exit_dates: ['2014-11-13','2014-11-20','2014-12-05','2014-12-15','2015-01-05'],
        durations: [20,45,120], wins: [14,12,10], losses: [1,3,5], 
        volatilities: [19.20, 5.3, 57.9, 104.2], 
        accumulated_returns: [212.33,100.67,500.1], average_returns: [14.16,9.67,27.5],
        exchange_symbols: ['EC1','EC2','EC3'],
        sectors: ['sector1','sector2'],
        industries: ['industry1_1','industry2_1','industry1_2','industry2_2']
    };
    var stocks_patterns_fixtures = fixture_helper.generate_patterns_and_assets_fixtures(stocks_patterns_fixture_data);
    fixtures = fixtures.concat(stocks_patterns_fixtures);

    //create stocks patterns for Canada Pack I in December 2014
    var stocks_patterns_fixture_data = { 
        pack_code: 'CAN-S-1', type: 'stocks', quantity: 50, first_id: 51, asset_id_digits: 3,
        entry_dates: ['2014-12-01','2014-12-05','2014-12-14','2014-12-15','2014-12-31'],
        exit_dates: ['2014-12-13','2014-12-20','2015-01-05','2015-01-15','2015-02-05'],
        durations: [20,45,120], wins: [14,12,10], losses: [1,3,5], 
        volatilities: [19.20, 5.3, 57.9, 104.2], 
        accumulated_returns: [212.33,100.67,500.1], average_returns: [14.16,9.67,27.5],
        exchange_symbols: ['EC1','EC2','EC3'],
        sectors: ['sector3','sector4'],
        industries: ['industry3_1','industry4_1','industry3_2','industry4_2']
    };
    var stocks_patterns_fixtures = fixture_helper.generate_patterns_and_assets_fixtures(stocks_patterns_fixture_data);
    fixtures = fixtures.concat(stocks_patterns_fixtures);

    //create stocks patterns for Canada Pack I in January 2015
    var stocks_patterns_fixture_data = { 
        pack_code: 'CAN-S-1', type: 'stocks', quantity: 50, first_id: 101,
        entry_dates: ['2015-01-01','2015-01-05','2015-01-14','2015-01-15','2015-01-31'],
        exit_dates: ['2015-01-13','2015-01-20','2015-02-05','2015-02-15','2015-03-05'],
        durations: [20,45,120], wins: [14,12,10], losses: [1,3,5], 
        volatilities: [19.20, 5.3, 57.9, 104.2], 
        accumulated_returns: [212.33,100.67,500.1], average_returns: [14.16,9.67,27.5],
        exchange_symbols: ['EC1','EC2','EC3'],
        sectors: ['sector1','sector2'],
        industries: ['industry1_1','industry2_1','industry1_2','industry2_2']
    };
    var stocks_patterns_fixtures = fixture_helper.generate_patterns_and_assets_fixtures(stocks_patterns_fixture_data);
    fixtures = fixtures.concat(stocks_patterns_fixtures);

    //create stocks patterns for USA Pack I in November 2014
    var stocks_patterns_fixture_data = { 
        pack_code: 'USA-S-1', type: 'stocks', quantity: 50, first_id: 151,
        entry_dates: ['2014-11-01','2014-11-05','2014-11-14','2014-11-15','2014-11-30'],
        exit_dates: ['2014-11-13','2014-11-20','2014-12-05','2014-12-15','2015-01-05'],
        durations: [20,45,120], wins: [14,12,10], losses: [1,3,5], 
        volatilities: [19.20, 5.3, 57.9, 104.2], 
        accumulated_returns: [212.33,100.67,500.1], average_returns: [14.16,9.67,27.5],
        exchange_symbols: ['EX1','EX2','EX3'],
        sectors: ['sector5','sector6'],
        industries: ['industry5_1','industry6_1','industry5_2','industry6_2']
    };
    var stocks_patterns_fixtures = fixture_helper.generate_patterns_and_assets_fixtures(stocks_patterns_fixture_data);
    fixtures = fixtures.concat(stocks_patterns_fixtures);

    // PAIRS ========================================================================================

    var pairs_fixture_data = [
        // ==== América pair packs
        { code: 'USA-P-1', region_code: 'USA', name: 'Estados Unidos Pack I',
          scope_text: 'AMEX, NASDAQ, NYSE, Bulletin Board' },
        { code: 'USA-P-2', region_code: 'USA', name: 'Estados Unidos Pack II',
          scope_text: 'AMEX, NASDAQ, NYSE, Bulletin Board' },
        { code: 'USA-P-3', region_code: 'USA', name: 'Estados Unidos Pack III',
          scope_text: 'AMEX, NASDAQ, NYSE, Bulletin Board' },
        { code: 'USA-P-4', region_code: 'USA', name: 'Estados Unidos Pack IV',
          scope_text: 'AMEX, NASDAQ, NYSE, Bulletin Board' },
        { code: 'USA-P-5', region_code: 'USA', name: 'Estados Unidos Pack V',
          scope_text: 'AMEX, NASDAQ, NYSE, Bulletin Board' },
        { code: 'USA-P-6', region_code: 'USA', name: 'Estados Unidos Pack VI',
          scope_text: 'AMEX, NASDAQ, NYSE, Bulletin Board' },
        // ==== Asia pair packs
        { code: 'JPN-P-1', region_code: 'JPN', name: 'Japón Pack I',
          scope_text: 'Fukuoka SE, Nagoya SE, Sapporo SE, Tokyo SE' },
        { code: 'JPN-P-2', region_code: 'JPN', name: 'Japón Pack II',
          scope_text: 'Fukuoka SE, Nagoya SE, Sapporo SE, Tokyo SE' },
        { code: 'JPN-P-3', region_code: 'JPN', name: 'Japón Pack III',
          scope_text: 'Fukuoka SE, Nagoya SE, Sapporo SE, Tokyo SE' },
        { code: 'JPN-P-4', region_code: 'JPN', name: 'Japón Pack IV',
          scope_text: 'Fukuoka SE, Nagoya SE, Sapporo SE, Tokyo SE' },
        { code: 'JPN-P-5', region_code: 'JPN', name: 'Japón Pack V',
          scope_text: 'Fukuoka SE, Nagoya SE, Sapporo SE, Tokyo SE' },
        { code: 'JPN-P-6', region_code: 'JPN', name: 'Japón Pack VI',
          scope_text: 'Fukuoka SE, Nagoya SE, Sapporo SE, Tokyo SE' },
        // ==== Europa pair packs
        { code: 'EUR-P-1', region_code: 'EUR', name: 'Zona Euro Pack I',
          scope_text: 'Alemania, Austria, Bélgica, España, Finlandia, Francia, Grecia, Irlanda, Italia, Luxemburgo, Países Bajos, Portugal' },
        { code: 'EUR-P-2', region_code: 'EUR', name: 'Zona Euro Pack II',
          scope_text: 'Alemania, Austria, Bélgica, España, Finlandia, Francia, Grecia, Irlanda, Italia, Luxemburgo, Países Bajos, Portugal' },
        { code: 'EUR-P-3', region_code: 'EUR', name: 'Zona Euro Pack III',
          scope_text: 'Alemania, Austria, Bélgica, España, Finlandia, Francia, Grecia, Irlanda, Italia, Luxemburgo, Países Bajos, Portugal' },
        { code: 'EUR-P-4', region_code: 'EUR', name: 'Zona Euro Pack IV',
          scope_text: 'Alemania, Austria, Bélgica, España, Finlandia, Francia, Grecia, Irlanda, Italia, Luxemburgo, Países Bajos, Portugal' },
        { code: 'EUR-P-5', region_code: 'EUR', name: 'Zona Euro Pack V',
          scope_text: 'Alemania, Austria, Bélgica, España, Finlandia, Francia, Grecia, Irlanda, Italia, Luxemburgo, Países Bajos, Portugal' },
        { code: 'EUR-P-6', region_code: 'EUR', name: 'Zona Euro Pack VI',
          scope_text: 'Alemania, Austria, Bélgica, España, Finlandia, Francia, Grecia, Irlanda, Italia, Luxemburgo, Países Bajos, Portugal' }
    ];
    var pairs_fixture_options = { 
        default_pack_type: 'pairs', default_publication_date: '2014-09-15',
        create_published_packs: 1, default_num_patterns: 50,
        published_packs_months : [201410,201411,201412,201501] 
    };
    var pairs_fixtures = fixture_helper.generate_pack_fixtures(pairs_fixture_data,pairs_fixture_options);
    fixtures = fixtures.concat(pairs_fixtures);

    //additional packs to test differences on each month
    var pairs_fixture_data = [
        { code: 'ZZZ-P-Nov', region_code: 'EUR', name: 'Zzz Additional November Pair Pack I',
          scope_text: 'Scope text for November' }
    ];
    var pairs_fixture_options = { 
        default_pack_type: 'pairs', default_publication_date: '2014-09-15',
        create_published_packs: 1, default_num_patterns: 100,
        published_packs_months : [201411] 
    };
    var pairs_fixtures = fixture_helper.generate_pack_fixtures(pairs_fixture_data,pairs_fixture_options);
    fixtures = fixtures.concat(pairs_fixtures);

    var pairs_fixture_data = [
        { code: 'ZZZ-P-Dec', region_code: 'EUR', name: 'Zzz Additional December Pair Pack I',
          scope_text: 'Scope text for December' }
    ];
    var pairs_fixture_options = { 
        default_pack_type: 'pairs', default_publication_date: '2014-09-15',
        create_published_packs: 1, default_num_patterns: 100,
        published_packs_months : [201412] 
    };
    var pairs_fixtures = fixture_helper.generate_pack_fixtures(pairs_fixture_data,pairs_fixture_options);
    fixtures = fixtures.concat(pairs_fixtures);

    var pairs_fixture_data = [
        { code: 'ZZZ-P-Jan', region_code: 'EUR', name: 'Zzz Additional January Pair Pack I',
          scope_text: 'Scope text for January' }
    ];
    var pairs_fixture_options = { 
        default_pack_type: 'pairs', default_publication_date: '2014-09-15',
        create_published_packs: 1, default_num_patterns: 100,
        published_packs_months : [201501] 
    };
    var pairs_fixtures = fixture_helper.generate_pack_fixtures(pairs_fixture_data,pairs_fixture_options);
    fixtures = fixtures.concat(pairs_fixtures);

    //create sector and industry filters for USA Pack I
    var sector_industry_filters_data = {
        pack_code: 'USA-P-1', type: 'pairs', first_sector_id: 13, first_industry_id: 25,
        months : [201411,201501], region_code: 'USA', exchange_symbol: 'EX1',
        values: [
            {name: 'sector1', industries: ['industry1_1','industry1_2']},
            {name: 'sector2', industries: ['industry2_1','industry2_2']}
        ]   
    };
    var sector_industry_filters_fixtures = fixture_helper.generate_sector_industry_filters_fixtures(sector_industry_filters_data);
    fixtures = fixtures.concat(sector_industry_filters_fixtures);

    var sector_industry_filters_data = {
        pack_code: 'USA-P-1', type: 'pairs', first_sector_id: 17, first_industry_id: 33,
        months : [201412], region_code: 'USA', exchange_symbol: 'EX2',
        values: [
            {name: 'sector3', industries: ['industry3_1','industry3_2']},
            {name: 'sector4', industries: ['industry4_1','industry4_2']}
        ]   
    };
    var sector_industry_filters_fixtures = fixture_helper.generate_sector_industry_filters_fixtures(sector_industry_filters_data);
    fixtures = fixtures.concat(sector_industry_filters_fixtures);

    //create sector and industry filters for Japan Pack I
    var sector_industry_filters_data = {
        pack_code: 'JPN-P-1', type: 'pairs', first_sector_id: 19, first_industry_id: 37,
        months : [201411,201412,201501], region_code: 'JPN', exchange_symbol: 'EJ1',
        values: [
            {name: 'sector5', industries: ['industry5_1','industry5_2']},
            {name: 'sector6', industries: ['industry6_1','industry6_2']}
        ]   
    };
    var sector_industry_filters_fixtures = fixture_helper.generate_sector_industry_filters_fixtures(sector_industry_filters_data);
    fixtures = fixtures.concat(sector_industry_filters_fixtures);

    //create pairs patterns for Estados Unidos Pack I in November 2014
    var pairs_patterns_fixture_data = { 
        pack_code: 'USA-P-1', type: 'pairs', quantity: 50, first_id: 201, reverse_pair_assets: 1,
        entry_dates: ['2014-11-01','2014-11-05','2014-11-14','2014-11-15','2014-11-30'],
        exit_dates: ['2014-11-13','2014-11-20','2014-12-05','2014-12-15','2015-01-05'],
        durations: [20,45,120], wins: [14,12,10], losses: [1,3,5], 
        volatilities: [19.20, 5.3, 57.9, 104.2], 
        accumulated_returns: [212.33,100.67,500.1], average_returns: [14.16,9.67,27.5],
        exchange_symbols: ['EX1','EX2','EX3'],
        sectors: ['sector1','sector2'],
        industries: ['industry1_1','industry2_1','industry1_2','industry2_2']
    };
    var pairs_patterns_fixtures = fixture_helper.generate_patterns_and_assets_fixtures(pairs_patterns_fixture_data);
    fixtures = fixtures.concat(pairs_patterns_fixtures);

    //create pairs patterns for Estados Unidos Pack I in December 2014
    var pairs_patterns_fixture_data = { 
        pack_code: 'USA-P-1', type: 'pairs', quantity: 50, first_id: 251, reverse_pair_assets: 1,
        entry_dates: ['2014-12-01','2014-12-05','2014-12-14','2014-12-15','2014-12-31'],
        exit_dates: ['2014-12-13','2014-12-20','2015-01-05','2015-01-15','2015-02-05'],
        durations: [20,45,120], wins: [14,12,10], losses: [1,3,5], 
        volatilities: [19.20, 5.3, 57.9, 104.2], 
        accumulated_returns: [212.33,100.67,500.1], average_returns: [14.16,9.67,27.5],
        exchange_symbols: ['EX1','EX2','EX3'],
        sectors: ['sector3','sector4'],
        industries: ['industry3_1','industry4_1','industry3_2','industry4_2']
    };
    var pairs_patterns_fixtures = fixture_helper.generate_patterns_and_assets_fixtures(pairs_patterns_fixture_data);
    fixtures = fixtures.concat(pairs_patterns_fixtures);

    //create pairs patterns for Estados Unidos Pack I in January 2015
    var pairs_patterns_fixture_data = { 
        pack_code: 'USA-P-1', type: 'pairs', quantity: 50, first_id: 301, reverse_pair_assets: 1,
        entry_dates: ['2015-01-01','2015-01-05','2015-01-14','2015-01-15','2015-01-31'],
        exit_dates: ['2015-01-13','2015-01-20','2015-02-05','2015-02-15','2015-03-05'],
        durations: [20,45,120], wins: [14,12,10], losses: [1,3,5], 
        volatilities: [19.20, 5.3, 57.9, 104.2], 
        accumulated_returns: [212.33,100.67,500.1], average_returns: [14.16,9.67,27.5],
        exchange_symbols: ['EX1','EX2','EX3'],
        sectors: ['sector1','sector2'],
        industries: ['industry1_1','industry2_1','industry1_2','industry2_2']
    };
    var pairs_patterns_fixtures = fixture_helper.generate_patterns_and_assets_fixtures(pairs_patterns_fixture_data);
    fixtures = fixtures.concat(pairs_patterns_fixtures);

    //create pairs patterns for Japan Pack I in November 2014
    var pairs_patterns_fixture_data = { 
        pack_code: 'JPN-P-1', type: 'pairs', quantity: 50, first_id: 351, reverse_pair_assets: 1,
        entry_dates: ['2014-11-01','2014-11-05','2014-11-14','2014-11-15','2014-11-30'],
        exit_dates: ['2014-11-13','2014-11-20','2014-12-05','2014-12-15','2015-01-05'],
        durations: [20,45,120], wins: [14,12,10], losses: [1,3,5], 
        volatilities: [19.20, 5.3, 57.9, 104.2], 
        accumulated_returns: [212.33,100.67,500.1], average_returns: [14.16,9.67,27.5],
        exchange_symbols: ['EJ1','EJ2','EJ3'],
        sectors: ['sector5','sector6'],
        industries: ['industry5_1','industry6_1','industry5_2','industry6_2']
    };
    var pairs_patterns_fixtures = fixture_helper.generate_patterns_and_assets_fixtures(pairs_patterns_fixture_data);
    fixtures = fixtures.concat(pairs_patterns_fixtures);

    // INDICES ========================================================================================

    //indices packs and published packs
    var indices_fixture_data = [
        { code: 'INDEX-S-1', region_code: 'INDEX', name: 'INDEX Pack I',
          scope_text: 'Bolsa, Financieros y Materias Primas' },
        { code: 'INDEX-S-2', region_code: 'INDEX', name: 'INDEX Pack II',
          scope_text: 'Bolsa, Financieros y Materias Primas' }
    ];
    var indices_fixture_options = { 
        default_pack_type: 'indices', default_publication_date: '2014-09-15',
        create_published_packs: 1, default_num_patterns: 50,
        published_packs_months : [201410,201411,201412,201501] 
    };
    var indices_fixtures = fixture_helper.generate_pack_fixtures(indices_fixture_data,indices_fixture_options);
    fixtures = fixtures.concat(indices_fixtures);

    //additional indices packs to test differences on each month
    var indices_fixture_data = [
        { code: 'ZZZ-I-Nov', region_code: 'INDEX', name: 'Zzz Additional November INDEX Pack I',
          scope_text: 'Bolsa, Financieros y Materias Primas' }
    ];
    var indices_fixture_options = { 
        default_pack_type: 'indices', default_publication_date: '2014-09-15',
        create_published_packs: 1, default_num_patterns: 100,
        published_packs_months : [201411] 
    };
    var indices_fixtures = fixture_helper.generate_pack_fixtures(indices_fixture_data,indices_fixture_options);
    fixtures = fixtures.concat(indices_fixtures);

    var indices_fixture_data = [
        { code: 'ZZZ-I-Dec', region_code: 'INDEX', name: 'Zzz Additional December INDEX Pack I',
          scope_text: 'Bolsa, Financieros y Materias Primas' }
    ];
    var indices_fixture_options = { 
        default_pack_type: 'indices', default_publication_date: '2014-09-15',
        create_published_packs: 1, default_num_patterns: 100,
        published_packs_months : [201412] 
    };
    var indices_fixtures = fixture_helper.generate_pack_fixtures(indices_fixture_data,indices_fixture_options);
    fixtures = fixtures.concat(indices_fixtures);

    var indices_fixture_data = [
        { code: 'ZZZ-I-Jan', region_code: 'INDEX', name: 'Zzz Additional January INDEX Pack I',
          scope_text: 'Bolsa, Financieros y Materias Primas' }
    ];
    var indices_fixture_options = { 
        default_pack_type: 'indices', default_publication_date: '2014-09-15',
        create_published_packs: 1, default_num_patterns: 100,
        published_packs_months : [201501] 
    };
    var indices_fixtures = fixture_helper.generate_pack_fixtures(indices_fixture_data,indices_fixture_options);
    fixtures = fixtures.concat(indices_fixtures);

    //create indices patterns for INDEX Pack I in November 2014
    var indices_patterns_fixture_data = { 
        pack_code: 'INDEX-S-1', type: 'indices', quantity: 50, first_id: 401,
        entry_dates: ['2014-11-01','2014-11-05','2014-11-14','2014-11-15','2014-11-30'],
        exit_dates: ['2014-11-13','2014-11-20','2014-12-05','2014-12-15','2015-01-05'],
        durations: [20,45,120], wins: [14,12,10], losses: [1,3,5], 
        volatilities: [19.20, 5.3, 57.9, 104.2], 
        accumulated_returns: [212.33,100.67,500.1], average_returns: [14.16,9.67,27.5],
        exchange_symbols: ['EX1','EX2','EX3']
    };
    var indices_patterns_fixtures = fixture_helper.generate_patterns_and_assets_fixtures(indices_patterns_fixture_data);
    fixtures = fixtures.concat(indices_patterns_fixtures);

    //create indices patterns for INDEX Pack I in December 2014
    var indices_patterns_fixture_data = { 
        pack_code: 'INDEX-S-1', type: 'indices', quantity: 50, first_id: 451,
        entry_dates: ['2014-12-01','2014-12-05','2014-12-14','2014-12-15','2014-12-31'],
        exit_dates: ['2014-12-13','2014-12-20','2015-01-05','2015-01-15','2015-02-05'],
        durations: [20,45,120], wins: [14,12,10], losses: [1,3,5], 
        volatilities: [19.20, 5.3, 57.9, 104.2], 
        accumulated_returns: [212.33,100.67,500.1], average_returns: [14.16,9.67,27.5],
        exchange_symbols: ['EX1','EX2','EX3']
    };
    var indices_patterns_fixtures = fixture_helper.generate_patterns_and_assets_fixtures(indices_patterns_fixture_data);
    fixtures = fixtures.concat(indices_patterns_fixtures);

    //create indices patterns for INDEX Pack I in January 2015
    var indices_patterns_fixture_data = { 
        pack_code: 'INDEX-S-1', type: 'indices', quantity: 50, first_id: 501, 
        entry_dates: ['2015-01-01','2015-01-05','2015-01-14','2015-01-15','2015-01-31'],
        exit_dates: ['2015-01-13','2015-01-20','2015-02-05','2015-02-15','2015-03-05'],
        durations: [20,45,120], wins: [14,12,10], losses: [1,3,5], 
        volatilities: [19.20, 5.3, 57.9, 104.2], 
        accumulated_returns: [212.33,100.67,500.1], average_returns: [14.16,9.67,27.5],
        exchange_symbols: ['EX1','EX2','EX3']
    };
    var indices_patterns_fixtures = fixture_helper.generate_patterns_and_assets_fixtures(indices_patterns_fixture_data);
    fixtures = fixtures.concat(indices_patterns_fixtures);


    //indices pairs packs and published packs
    var indices_pairs_fixture_data = [
        { code: 'INDEX-P-1', region_code: 'INDEX', name: 'INDEX Pair Pack I',
          scope_text: 'Bolsa, Financieros y Materias Primas' }
    ];
    var indices_pairs_fixture_options = { 
        default_pack_type: 'indices_pairs', default_publication_date: '2014-09-15',
        create_published_packs: 1, default_num_patterns: 50,
        published_packs_months : [201410,201411,201412,201501] 
    };
    var indices_pairs_fixtures = fixture_helper.generate_pack_fixtures(indices_pairs_fixture_data,indices_pairs_fixture_options);
    fixtures = fixtures.concat(indices_pairs_fixtures);

    //additional packs to test differences on each month
    var indices_pairs_fixture_data = [
        { code: 'ZZZ-IP-Nov', region_code: 'INDEX', name: 'Zzz Additional November INDEX Pair Pack I',
          scope_text: 'Bolsa, Financieros y Materias Primas' }
    ];
    var indices_pairs_fixture_options = { 
        default_pack_type: 'indices_pairs', default_publication_date: '2014-09-15',
        create_published_packs: 1, default_num_patterns: 100,
        published_packs_months : [201411] 
    };
    var indices_pairs_fixtures = fixture_helper.generate_pack_fixtures(indices_pairs_fixture_data,indices_pairs_fixture_options);
    fixtures = fixtures.concat(indices_pairs_fixtures);

    var indices_pairs_fixture_data = [
        { code: 'ZZZ-IP-Dec', region_code: 'INDEX', name: 'Zzz Additional December INDEX Pair Pack I',
          scope_text: 'Bolsa, Financieros y Materias Primas' }
    ];
    var indices_pairs_fixture_options = { 
        default_pack_type: 'indices_pairs', default_publication_date: '2014-09-15',
        create_published_packs: 1, default_num_patterns: 100,
        published_packs_months : [201412] 
    };
    var indices_pairs_fixtures = fixture_helper.generate_pack_fixtures(indices_pairs_fixture_data,indices_pairs_fixture_options);
    fixtures = fixtures.concat(indices_pairs_fixtures);

    var indices_pairs_fixture_data = [
        { code: 'ZZZ-IP-Jan', region_code: 'INDEX', name: 'Zzz Additional January INDEX Pair Pack I',
          scope_text: 'Bolsa, Financieros y Materias Primas' }
    ];
    var indices_pairs_fixture_options = { 
        default_pack_type: 'indices_pairs', default_publication_date: '2014-09-15',
        create_published_packs: 1, default_num_patterns: 100,
        published_packs_months : [201501] 
    };
    var indices_pairs_fixtures = fixture_helper.generate_pack_fixtures(indices_pairs_fixture_data,indices_pairs_fixture_options);
    fixtures = fixtures.concat(indices_pairs_fixtures);

    //create indices pairs patterns for INDEX Pair Pack I in November 2014
    var indices_patterns_fixture_data = { 
        pack_code: 'INDEX-P-1', type: 'indices_pairs', quantity: 50, first_id: 551, reverse_pair_assets: 1,
        entry_dates: ['2014-11-01','2014-11-05','2014-11-14','2014-11-15','2014-11-30'],
        exit_dates: ['2014-11-13','2014-11-20','2014-12-05','2014-12-15','2015-01-05'],
        durations: [20,45,120], wins: [14,12,10], losses: [1,3,5], 
        volatilities: [19.20, 5.3, 57.9, 104.2], 
        accumulated_returns: [212.33,100.67,500.1], average_returns: [14.16,9.67,27.5],
        exchange_symbols: ['EX1','EX2','EX3']
    };
    var indices_patterns_fixtures = fixture_helper.generate_patterns_and_assets_fixtures(indices_patterns_fixture_data);
    fixtures = fixtures.concat(indices_patterns_fixtures);

    //create indices pairs patterns for INDEX Pair Pack I in December 2014
    var indices_patterns_fixture_data = { 
        pack_code: 'INDEX-P-1', type: 'indices_pairs', quantity: 50, first_id: 601, reverse_pair_assets: 1,
        entry_dates: ['2014-12-01','2014-12-05','2014-12-14','2014-12-15','2014-12-31'],
        exit_dates: ['2014-12-13','2014-12-20','2015-01-05','2015-01-15','2015-02-05'],
        durations: [20,45,120], wins: [14,12,10], losses: [1,3,5], 
        volatilities: [19.20, 5.3, 57.9, 104.2], 
        accumulated_returns: [212.33,100.67,500.1], average_returns: [14.16,9.67,27.5],
        exchange_symbols: ['EX1','EX2','EX3']
    };
    var indices_patterns_fixtures = fixture_helper.generate_patterns_and_assets_fixtures(indices_patterns_fixture_data);
    fixtures = fixtures.concat(indices_patterns_fixtures);

    //create indices pairs patterns for INDEX Pair Pack I in January 2015
    var indices_patterns_fixture_data = { 
        pack_code: 'INDEX-P-1', type: 'indices_pairs', quantity: 50, first_id: 651, 
        entry_dates: ['2015-01-01','2015-01-05','2015-01-14','2015-01-15','2015-01-31'],
        exit_dates: ['2015-01-13','2015-01-20','2015-02-05','2015-02-15','2015-03-05'],
        durations: [20,45,120], wins: [14,12,10], losses: [1,3,5], 
        volatilities: [19.20, 5.3, 57.9, 104.2], 
        accumulated_returns: [212.33,100.67,500.1], average_returns: [14.16,9.67,27.5],
        exchange_symbols: ['EX1','EX2','EX3']
    };
    var indices_patterns_fixtures = fixture_helper.generate_patterns_and_assets_fixtures(indices_patterns_fixture_data);
    fixtures = fixtures.concat(indices_patterns_fixtures);

    // FUTURES ========================================================================================

    //futures packs and published packs
    var futures_fixture_data = [
        { code: 'FUTURE-S-1', region_code: 'FUTURE', name: 'FUTURES Pack I',
          scope_text: 'Chicago Board of Trade Futures, Chicago Mercantile Exchange Futures, EUREX, Euronext Commodities Futures, Hong Kong Futures Exchanges, ICE Canada, ICE Europe, ICE Liffe, ICE US, Kansas City Board of Trade Futures, Minneapolis Grain Exchange Futures, Montreal Options Exchange, New York Mercantile Exchange Futures, NYSE Euronext, Singapore Monetary Exchange, Sydney Futures Exchange, Tokyo Commodity Exchange',
          subname: 'Energía, Metales, Agrícolas, Carnes, Softs, Divisas, Tipos de Interés, Índices Bursátiles' }
    ];
    var futures_fixture_options = { 
        default_pack_type: 'futures', default_publication_date: '2014-09-15',
        create_published_packs: 1, default_num_patterns: 50,
        published_packs_months : [201410,201411,201412,201501] 
    };
    var futures_fixtures = fixture_helper.generate_pack_fixtures(futures_fixture_data,futures_fixture_options);
    fixtures = fixtures.concat(futures_fixtures);

    //additional futures packs to test differences on each month
    var futures_fixture_data = [
        { code: 'ZZZ-FUTURE-S-Nov', region_code: 'FUTURE', name: 'Zzz Additional November FUTURES Pack I',
          scope_text: 'Additional November scope text',
          subname: 'Additional November subname' }
    ];
    var futures_fixture_options = { 
        default_pack_type: 'futures', default_publication_date: '2014-09-15',
        create_published_packs: 1, default_num_patterns: 100,
        published_packs_months : [201411] 
    };
    var futures_fixtures = fixture_helper.generate_pack_fixtures(futures_fixture_data,futures_fixture_options);
    fixtures = fixtures.concat(futures_fixtures);

    var futures_fixture_data = [
        { code: 'ZZZ-FUTURE-S-Dec', region_code: 'FUTURE', name: 'Zzz Additional December FUTURES Pack I',
          scope_text: 'Additional December scope text',
          subname: 'Additional December subname' }
    ];
    var futures_fixture_options = { 
        default_pack_type: 'futures', default_publication_date: '2014-09-15',
        create_published_packs: 1, default_num_patterns: 100,
        published_packs_months : [201412] 
    };
    var futures_fixtures = fixture_helper.generate_pack_fixtures(futures_fixture_data,futures_fixture_options);
    fixtures = fixtures.concat(futures_fixtures);

    var futures_fixture_data = [
        { code: 'ZZZ-FUTURE-S-Jan', region_code: 'FUTURE', name: 'Zzz Additional January FUTURES Pack I',
          scope_text: 'Additional January scope text',
          subname: 'Additional January subname' }
    ];
    var futures_fixture_options = { 
        default_pack_type: 'futures', default_publication_date: '2014-09-15',
        create_published_packs: 1, default_num_patterns: 100,
        published_packs_months : [201501] 
    };
    var futures_fixtures = fixture_helper.generate_pack_fixtures(futures_fixture_data,futures_fixture_options);
    fixtures = fixtures.concat(futures_fixtures);

    //create sector and industry filters for FUTURES Pack I
    var sector_industry_filters_data = {
        pack_code: 'FUTURE-S-1', type: 'futures', first_sector_id: 25, first_industry_id: 49,
        months : [201411,201412,201501], region_code: 'FUTURE', exchange_symbol: 'EF1',
        values: [
            {name: 'NOT_CLASSIFIED', industries: ['NOT_CLASSIFIED']}
        ]   
    };
    var sector_industry_filters_fixtures = fixture_helper.generate_sector_industry_filters_fixtures(sector_industry_filters_data);
    fixtures = fixtures.concat(sector_industry_filters_fixtures);

    var sector_industry_filters_data = {
        pack_code: 'FUTURE-S-1', type: 'futures', first_sector_id: 28, first_industry_id: 52,
        months : [201411,201412,201501], region_code: 'FUTURE', exchange_symbol: 'EF2',
        values: [
            {name: 'NOT_CLASSIFIED', industries: ['NOT_CLASSIFIED']}
        ]   
    };
    var sector_industry_filters_fixtures = fixture_helper.generate_sector_industry_filters_fixtures(sector_industry_filters_data);
    fixtures = fixtures.concat(sector_industry_filters_fixtures);

    var sector_industry_filters_data = {
        pack_code: 'FUTURE-S-1', type: 'futures', first_sector_id: 31, first_industry_id: 55,
        months : [201411,201412,201501], region_code: 'FUTURE', exchange_symbol: 'EF3',
        values: [
            {name: 'NOT_CLASSIFIED', industries: ['NOT_CLASSIFIED']}
        ]   
    };
    var sector_industry_filters_fixtures = fixture_helper.generate_sector_industry_filters_fixtures(sector_industry_filters_data);
    fixtures = fixtures.concat(sector_industry_filters_fixtures);

    //create futures patterns for FUTURES Pack I in November 2014
    var futures_patterns_fixture_data = { 
        pack_code: 'FUTURE-S-1', type: 'futures', quantity: 50, first_id: 701,
        entry_dates: ['2014-11-01','2014-11-05','2014-11-14','2014-11-15','2014-11-30'],
        exit_dates: ['2014-11-13','2014-11-20','2014-12-05','2014-12-15','2015-01-05'],
        durations: [20,45,120], wins: [14,12,10], losses: [1,3,5], 
        volatilities: [19.20, 5.3, 57.9, 104.2], 
        accumulated_returns: [212.33,100.67,500.1], average_returns: [14.16,9.67,27.5],
        exchange_symbols: ['EF1','EF2','EF3'],
        sectors: [''],
        industries: ['']
    };
    var futures_patterns_fixtures = fixture_helper.generate_patterns_and_assets_fixtures(futures_patterns_fixture_data);
    fixtures = fixtures.concat(futures_patterns_fixtures);

    //create futures patterns for FUTURES Pack I in December 2014
    var futures_patterns_fixture_data = { 
        pack_code: 'FUTURE-S-1', type: 'futures', quantity: 50, first_id: 751,
        entry_dates: ['2014-12-01','2014-12-05','2014-12-14','2014-12-15','2014-12-31'],
        exit_dates: ['2014-12-13','2014-12-20','2015-01-05','2015-01-15','2015-02-05'],
        durations: [20,45,120], wins: [14,12,10], losses: [1,3,5], 
        volatilities: [19.20, 5.3, 57.9, 104.2], 
        accumulated_returns: [212.33,100.67,500.1], average_returns: [14.16,9.67,27.5],
        exchange_symbols: ['EF1','EF2','EF3'],
        sectors: [''],
        industries: ['']
    };
    var futures_patterns_fixtures = fixture_helper.generate_patterns_and_assets_fixtures(futures_patterns_fixture_data);
    fixtures = fixtures.concat(futures_patterns_fixtures);

    //create futures patterns for FUTURES Pack I in January 2015
    var futures_patterns_fixture_data = { 
        pack_code: 'FUTURE-S-1', type: 'futures', quantity: 50, first_id: 801, 
        entry_dates: ['2015-01-01','2015-01-05','2015-01-14','2015-01-15','2015-01-31'],
        exit_dates: ['2015-01-13','2015-01-20','2015-02-05','2015-02-15','2015-03-05'],
        durations: [20,45,120], wins: [14,12,10], losses: [1,3,5], 
        volatilities: [19.20, 5.3, 57.9, 104.2], 
        accumulated_returns: [212.33,100.67,500.1], average_returns: [14.16,9.67,27.5],
        exchange_symbols: ['EF1','EF2','EF3'],
        sectors: [''],
        industries: ['']
    };
    var futures_patterns_fixtures = fixture_helper.generate_patterns_and_assets_fixtures(futures_patterns_fixture_data);
    fixtures = fixtures.concat(futures_patterns_fixtures);

    return fixtures;
};

exports.remove_home_packs_fixture = function() {
    return [
        {
            type: 'remove',
            table: 'industry_filter'
        },
        {
            type: 'remove',
            table: 'sector_filter'
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

exports.select_alert_fixture = function(conditions) {
    var conditions = conditions || {};
    return {
            type: 'select',
            table: 'alert',
            //fields: ['id','name','surname','address','city','email_address'],
            condition: conditions
        };
};

