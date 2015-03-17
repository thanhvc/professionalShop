/**
 * Created by David Verdú on 17/03/15.
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

function generate_pack_fixtures(info,options) {
    var info = info || [];
    var options = options || {};
    var fixtures = [];

    return fixtures;
}

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
/*
FUTURE    | Futuros                         |          
 INDEX     | Índices                         |          
 ANSA      | Sudeste Asiático                |         1
 CAN       | Canada                          |         0
 CEE       | Suiza + Europa del Este + Rusia |         2
 CHN       | China                           |         1
 GBR       | Reino Unido                     |         2
 GMEI      | Oriente Medio + Magreb          |         2
 HKG-SGP   | Hong Kong + Singapur            |         1
 JPN       | Japón                           |         1
 KOR       | Corea                           |         1
 LATAM     | Latino América                  |         0
 NORDEN    | Paises Nórdicos                 |         2
 OCEANIA   | Australia + Nueva Zelanda       |         1
 SOUTHASIA | India + Pakistan + Sri Lanka    |         1
 TWN       | Taiwan                          |         1
 USA       | Estados Unidos                  |         0
 ZAF       | Sudáfrica                       |         2
 EUR       | Zona EURO                       |         2

*/

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
        //simple packs =====================================================================
        // ==== América simple packs
        {  
            type: 'insert',
            table: 'pack',
            values: {
                code: 'USA-S-1',
                region_code: 'USA',
                name: 'Estados Unidos Pack I',
                product_type: 0,
                publication_date: '2014-11-04',
                scope_text: 'AMEX, NASDAQ, NYSE, Bulletin Board',
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
                scope_text: 'AMEX, NASDAQ, NYSE, Bulletin Board',
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
                name: 'Estados Unidos Pack IV',
                product_type: 0,
                publication_date: '2014-11-04',
                scope_text: 'AMEX, NASDAQ, NYSE, Bulletin Board',
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
                publication_date: '2014-11-04',
                scope_text: 'AMEX, NASDAQ, NYSE, Bulletin Board',
                pattern_type: 0,
                subname: ' '
            }
        },
        {
            type: 'insert',
            table: 'pack',
            values: {
                code: 'USA-S-5',
                region_code: 'USA',
                name: 'Estados Unidos Pack V',
                product_type: 0,
                publication_date: '2014-11-04',
                scope_text: 'AMEX, NASDAQ, NYSE, Bulletin Board',
                pattern_type: 0,
                subname: ' '
            }
        },
        {
            type: 'insert',
            table: 'pack',
            values: {
                code: 'USA-S-6',
                region_code: 'USA',
                name: 'Estados Unidos Pack VI',
                product_type: 0,
                publication_date: '2014-11-04',
                scope_text: 'AMEX, NASDAQ, NYSE, Bulletin Board',
                pattern_type: 0,
                subname: ' '
            }
        },
        {
            type: 'insert',
            table: 'pack',
            values: {
                code: 'USA-S-7',
                region_code: 'USA',
                name: 'Estados Unidos Pack VII',
                product_type: 0,
                publication_date: '2014-11-04',
                scope_text: 'AMEX, NASDAQ, NYSE, Bulletin Board',
                pattern_type: 0,
                subname: ' '
            }
        },
        {
            type: 'insert',
            table: 'pack',
            values: {
                code: 'USA-S-8',
                region_code: 'USA',
                name: 'Estados Unidos Pack VIII',
                product_type: 0,
                publication_date: '2014-11-04',
                scope_text: 'AMEX, NASDAQ, NYSE, Bulletin Board',
                pattern_type: 0,
                subname: ' '
            }
        },
        {
            type: 'insert',
            table: 'pack',
            values: {
                code: 'USA-S-9',
                region_code: 'USA',
                name: 'Estados Unidos Pack IX',
                product_type: 0,
                publication_date: '2014-11-04',
                scope_text: 'AMEX, NASDAQ, NYSE, Bulletin Board',
                pattern_type: 0,
                subname: ' '
            }
        },
        {
            type: 'insert',
            table: 'pack',
            values: {
                code: 'USA-S-10',
                region_code: 'USA',
                name: 'Estados Unidos Pack X',
                product_type: 0,
                publication_date: '2014-11-04',
                scope_text: 'AMEX, NASDAQ, NYSE, Bulletin Board',
                pattern_type: 0,
                subname: ' '
            }
        },
        {
            type: 'insert',
            table: 'pack',
            values: {
                code: 'LATAM-S-1',
                region_code: 'LATAM',
                name: 'Latino América Pack I',
                product_type: 0,
                publication_date: '2014-11-04',
                scope_text: 'Argentina, Brasil, Chile, México, Perú, Venezuela',
                pattern_type: 0,
                subname: ' '
            }
        },
        {
            type: 'insert',
            table: 'pack',
            values: {
                code: 'CAN-S-1',
                region_code: 'CAN',
                name: 'Canadá Pack I',
                product_type: 0,
                publication_date: '2014-11-04',
                scope_text: 'Toronto Stock Exchange, Totonto Venture Stock Exchange, CTQS',
                pattern_type: 0,
                subname: ' '
            }
        },
        {
            type: 'insert',
            table: 'pack',
            values: {
                code: 'CAN-S-2',
                region_code: 'CAN',
                name: 'Canadá Pack II',
                product_type: 0,
                publication_date: '2014-11-04',
                scope_text: 'Toronto Stock Exchange, Totonto Venture Stock Exchange, CTQS',
                pattern_type: 0,
                subname: ' '
            }
        },
        // ==== Asia Pacífico simple packs
        {
            type: 'insert',
            table: 'pack',
            values: {
                code: 'TWN-S-1',
                region_code: 'TWN',
                name: 'Taiwán Pack I',
                product_type: 0,
                publication_date: '2014-11-04',
                scope_text: 'Taiwan SE, Gretai Securities OTC',
                pattern_type: 0,
                subname: ' '
            }
        },
        {
            type: 'insert',
            table: 'pack',
            values: {
                code: 'TWN-S-2',
                region_code: 'TWN',
                name: 'Taiwán Pack II',
                product_type: 0,
                publication_date: '2014-11-04',
                scope_text: 'Taiwan SE, Gretai Securities OTC',
                pattern_type: 0,
                subname: ' '
            }
        },
        {
            type: 'insert',
            table: 'pack',
            values: {
                code: 'ANSA-S-1',
                region_code: 'ANSA',
                name: 'Sudeste Asiático Pack I',
                product_type: 0,
                publication_date: '2014-11-04',
                scope_text: 'Indonesia, Malasia, Tailandia',
                pattern_type: 0,
                subname: ' '
            }
        },
        {
            type: 'insert',
            table: 'pack',
            values: {
                code: 'ANSA-S-2',
                region_code: 'ANSA',
                name: 'Sudeste Asiático Pack II',
                product_type: 0,
                publication_date: '2014-11-04',
                scope_text: 'Indonesia, Malasia, Tailandia',
                pattern_type: 0,
                subname: ' '
            }
        },
        {
            type: 'insert',
            table: 'pack',
            values: {
                code: 'JPN-S-1',
                region_code: 'JPN',
                name: 'Japón Pack I',
                product_type: 0,
                publication_date: '2014-11-04',
                scope_text: 'Fukuoka SE, Nagoya SE, Sapporo SE, Tokyo SE',
                pattern_type: 0,
                subname: ' '
            }
        },
        {
            type: 'insert',
            table: 'pack',
            values: {
                code: 'JPN-S-3',
                region_code: 'JPN',
                name: 'Japón Pack III',
                product_type: 0,
                publication_date: '2014-11-04',
                scope_text: 'Fukuoka SE, Nagoya SE, Sapporo SE, Tokyo SE',
                pattern_type: 0,
                subname: ' '
            }
        },
        {
            type: 'insert',
            table: 'pack',
            values: {
                code: 'JPN-S-2',
                region_code: 'JPN',
                name: 'Japón Pack II',
                product_type: 0,
                publication_date: '2014-11-04',
                scope_text: 'Fukuoka SE, Nagoya SE, Sapporo SE, Tokyo SE',
                pattern_type: 0,
                subname: ' '
            }
        },
        {
            type: 'insert',
            table: 'pack',
            values: {
                code: 'JPN-S-4',
                region_code: 'JPN',
                name: 'Japón Pack IV',
                product_type: 0,
                publication_date: '2014-11-04',
                scope_text: 'Fukuoka SE, Nagoya SE, Sapporo SE, Tokyo SE',
                pattern_type: 0,
                subname: ' '
            }
        },
        {
            type: 'insert',
            table: 'pack',
            values: {
                code: 'JPN-S-5',
                region_code: 'JPN',
                name: 'Japón Pack V',
                product_type: 0,
                publication_date: '2014-11-04',
                scope_text: 'Fukuoka SE, Nagoya SE, Sapporo SE, Tokyo SE',
                pattern_type: 0,
                subname: ' '
            }
        },
        {
            type: 'insert',
            table: 'pack',
            values: {
                code: 'JPN-S-6',
                region_code: 'JPN',
                name: 'Japón Pack VI',
                product_type: 0,
                publication_date: '2014-11-04',
                scope_text: 'Fukuoka SE, Nagoya SE, Sapporo SE, Tokyo SE',
                pattern_type: 0,
                subname: ' '
            }
        },
        {
            type: 'insert',
            table: 'pack',
            values: {
                code: 'JPN-S-7',
                region_code: 'JPN',
                name: 'Japón Pack VII',
                product_type: 0,
                publication_date: '2014-11-04',
                scope_text: 'Fukuoka SE, Nagoya SE, Sapporo SE, Tokyo SE',
                pattern_type: 0,
                subname: ' '
            }
        },
        {
            type: 'insert',
            table: 'pack',
            values: {
                code: 'JPN-S-8',
                region_code: 'JPN',
                name: 'Japón Pack VIII',
                product_type: 0,
                publication_date: '2014-11-04',
                scope_text: 'Fukuoka SE, Nagoya SE, Sapporo SE, Tokyo SE',
                pattern_type: 0,
                subname: ' '
            }
        },
        {
            type: 'insert',
            table: 'pack',
            values: {
                code: 'JPN-S-9',
                region_code: 'JPN',
                name: 'Japón Pack IX',
                product_type: 0,
                publication_date: '2014-11-04',
                scope_text: 'Fukuoka SE, Nagoya SE, Sapporo SE, Tokyo SE',
                pattern_type: 0,
                subname: ' '
            }
        },
        {
            type: 'insert',
            table: 'pack',
            values: {
                code: 'JPN-S-10',
                region_code: 'JPN',
                name: 'Japón Pack X',
                product_type: 0,
                publication_date: '2014-11-04',
                scope_text: 'Fukuoka SE, Nagoya SE, Sapporo SE, Tokyo SE',
                pattern_type: 0,
                subname: ' '
            }
        },
        {
            type: 'insert',
            table: 'pack',
            values: {
                code: 'SOUTHASIA-S-1',
                region_code: 'SOUTHASIA',
                name: 'India + Pakistán + Sri Lanka Pack I',
                product_type: 0,
                publication_date: '2014-11-04',
                scope_text: 'Bombay SE, Calcuta SE, National SE of India, Karachi SE, Colombo SE',
                pattern_type: 0,
                subname: ' '
            }
        },
        {
            type: 'insert',
            table: 'pack',
            values: {
                code: 'SOUTHASIA-S-2',
                region_code: 'SOUTHASIA',
                name: 'India + Pakistán + Sri Lanka Pack II',
                product_type: 0,
                publication_date: '2014-11-04',
                scope_text: 'Bombay SE, Calcuta SE, National SE of India, Karachi SE, Colombo SE',
                pattern_type: 0,
                subname: ' '
            }
        },
        {
            type: 'insert',
            table: 'pack',
            values: {
                code: 'SOUTHASIA-S-3',
                region_code: 'SOUTHASIA',
                name: 'India + Pakistán + Sri Lanka Pack III',
                product_type: 0,
                publication_date: '2014-11-04',
                scope_text: 'Bombay SE, Calcuta SE, National SE of India, Karachi SE, Colombo SE',
                pattern_type: 0,
                subname: ' '
            }
        },
        {
            type: 'insert',
            table: 'pack',
            values: {
                code: 'KOR-S-1',
                region_code: 'KOR',
                name: 'Corea Pack I',
                product_type: 0,
                publication_date: '2014-11-04',
                scope_text: 'Korea SE, KOSDAQ',
                pattern_type: 0,
                subname: ' '
            }
        },
        {
            type: 'insert',
            table: 'pack',
            values: {
                code: 'KOR-S-2',
                region_code: 'KOR',
                name: 'Corea Pack II',
                product_type: 0,
                publication_date: '2014-11-04',
                scope_text: 'Korea SE, KOSDAQ',
                pattern_type: 0,
                subname: ' '
            }
        },
        {
            type: 'insert',
            table: 'pack',
            values: {
                code: 'CHN-S-1',
                region_code: 'CHN',
                name: 'China Pack I',
                product_type: 0,
                publication_date: '2014-11-04',
                scope_text: 'Shanghai SE, Shenzhen SE',
                pattern_type: 0,
                subname: ' '
            }
        },
        {
            type: 'insert',
            table: 'pack',
            values: {
                code: 'CHN-S-2',
                region_code: 'CHN',
                name: 'China Pack II',
                product_type: 0,
                publication_date: '2014-11-04',
                scope_text: 'Shanghai SE, Shenzhen SE',
                pattern_type: 0,
                subname: ' '
            }
        },
        {
            type: 'insert',
            table: 'pack',
            values: {
                code: 'OCEANIA-S-1',
                region_code: 'OCEANIA',
                name: 'Australia + Nueva Zelanda Pack I',
                product_type: 0,
                publication_date: '2014-11-04',
                scope_text: 'Australian SE, New Zealand SE',
                pattern_type: 0,
                subname: ' '
            }
        },
        {
            type: 'insert',
            table: 'pack',
            values: {
                code: 'OCEANIA-S-2',
                region_code: 'OCEANIA',
                name: 'Australia + Nueva Zelanda Pack II',
                product_type: 0,
                publication_date: '2014-11-04',
                scope_text: 'Australian SE, New Zealand SE',
                pattern_type: 0,
                subname: ' '
            }
        },
        // ==== Europa África Oriente Medio simple packs
        {
            type: 'insert',
            table: 'pack',
            values: {
                code: 'EUR-S-1',
                region_code: 'EUR',
                name: 'Zona Euro Pack I',
                product_type: 0,
                publication_date: '2014-11-04',
                scope_text: 'Alemania, Austria, Bélgica, España, Finlandia, Francia, Grecia, Irlanda, Italia, Luxemburgo, Países Bajos, Portugal',
                pattern_type: 0,
                subname: ' '
            }
        },
        {
            type: 'insert',
            table: 'pack',
            values: {
                code: 'EUR-S-2',
                region_code: 'EUR',
                name: 'Zona Euro Pack II',
                product_type: 0,
                publication_date: '2014-11-04',
                scope_text: 'Alemania, Austria, Bélgica, España, Finlandia, Francia, Grecia, Irlanda, Italia, Luxemburgo, Países Bajos, Portugal',
                pattern_type: 0,
                subname: ' '
            }
        },
        {
            type: 'insert',
            table: 'pack',
            values: {
                code: 'EUR-S-3',
                region_code: 'EUR',
                name: 'Zona Euro Pack III',
                product_type: 0,
                publication_date: '2014-11-04',
                scope_text: 'Alemania, Austria, Bélgica, España, Finlandia, Francia, Grecia, Irlanda, Italia, Luxemburgo, Países Bajos, Portugal',
                pattern_type: 0,
                subname: ' '
            }
        },
        {
            type: 'insert',
            table: 'pack',
            values: {
                code: 'EUR-S-4',
                region_code: 'EUR',
                name: 'Zona Euro Pack IV',
                product_type: 0,
                publication_date: '2014-11-04',
                scope_text: 'Alemania, Austria, Bélgica, España, Finlandia, Francia, Grecia, Irlanda, Italia, Luxemburgo, Países Bajos, Portugal',
                pattern_type: 0,
                subname: ' '
            }
        },
        {
            type: 'insert',
            table: 'pack',
            values: {
                code: 'EUR-S-5',
                region_code: 'EUR',
                name: 'Zona Euro Pack V',
                product_type: 0,
                publication_date: '2014-11-04',
                scope_text: 'Alemania, Austria, Bélgica, España, Finlandia, Francia, Grecia, Irlanda, Italia, Luxemburgo, Países Bajos, Portugal',
                pattern_type: 0,
                subname: ' '
            }
        },
        {
            type: 'insert',
            table: 'pack',
            values: {
                code: 'EUR-S-6',
                region_code: 'EUR',
                name: 'Zona Euro Pack VI',
                product_type: 0,
                publication_date: '2014-11-04',
                scope_text: 'Alemania, Austria, Bélgica, España, Finlandia, Francia, Grecia, Irlanda, Italia, Luxemburgo, Países Bajos, Portugal',
                pattern_type: 0,
                subname: ' '
            }
        },
        {
            type: 'insert',
            table: 'pack',
            values: {
                code: 'EUR-S-7',
                region_code: 'EUR',
                name: 'Zona Euro Pack VII',
                product_type: 0,
                publication_date: '2014-11-04',
                scope_text: 'Alemania, Austria, Bélgica, España, Finlandia, Francia, Grecia, Irlanda, Italia, Luxemburgo, Países Bajos, Portugal',
                pattern_type: 0,
                subname: ' '
            }
        },
        {
            type: 'insert',
            table: 'pack',
            values: {
                code: 'EUR-S-8',
                region_code: 'EUR',
                name: 'Zona Euro Pack VIII',
                product_type: 0,
                publication_date: '2014-11-04',
                scope_text: 'Alemania, Austria, Bélgica, España, Finlandia, Francia, Grecia, Irlanda, Italia, Luxemburgo, Países Bajos, Portugal',
                pattern_type: 0,
                subname: ' '
            }
        },
        {
            type: 'insert',
            table: 'pack',
            values: {
                code: 'CEE-S-1',
                region_code: 'CEE',
                name: 'Suiza + Europa del Este + Rusia Pack I',
                product_type: 0,
                publication_date: '2014-11-04',
                scope_text: 'Suiza, Hungría, República Checa, Rusia, Croacia',
                pattern_type: 0,
                subname: ' '
            }
        },
        {
            type: 'insert',
            table: 'pack',
            values: {
                code: 'ZAF-S-1',
                region_code: 'ZAF',
                name: 'Sudáfrica Pack I',
                product_type: 0,
                publication_date: '2014-11-04',
                scope_text: 'Johannesburg SE',
                pattern_type: 0,
                subname: ' '
            }
        },
        {
            type: 'insert',
            table: 'pack',
            values: {
                code: 'GBR-S-1',
                region_code: 'GBR',
                name: 'Reino Unido Pack I',
                product_type: 0,
                publication_date: '2014-11-04',
                scope_text: 'London SE',
                pattern_type: 0,
                subname: ' '
            }
        },
        {
            type: 'insert',
            table: 'pack',
            values: {
                code: 'GBR-S-2',
                region_code: 'GBR',
                name: 'Reino Unido Pack II',
                product_type: 0,
                publication_date: '2014-11-04',
                scope_text: 'London SE',
                pattern_type: 0,
                subname: ' '
            }
        },
        {
            type: 'insert',
            table: 'pack',
            values: {
                code: 'GBR-S-3',
                region_code: 'GBR',
                name: 'Reino Unido Pack III',
                product_type: 0,
                publication_date: '2014-11-04',
                scope_text: 'London SE',
                pattern_type: 0,
                subname: ' '
            }
        },
        {
            type: 'insert',
            table: 'pack',
            values: {
                code: 'NORDEN-S-1',
                region_code: 'NORDEN',
                name: 'Países Nórdicos Pack I',
                product_type: 0,
                publication_date: '2014-11-04',
                scope_text: 'Dinamarca, Noruega, Suecia, Islandia',
                pattern_type: 0,
                subname: ' '
            }
        },
        {
            type: 'insert',
            table: 'pack',
            values: {
                code: 'NORDEN-S-2',
                region_code: 'NORDEN',
                name: 'Países Nórdicos Pack II',
                product_type: 0,
                publication_date: '2014-11-04',
                scope_text: 'Dinamarca, Noruega, Suecia, Islandia',
                pattern_type: 0,
                subname: ' '
            }
        },
        {
            type: 'insert',
            table: 'pack',
            values: {
                code: 'GMEI-S-1',
                region_code: 'GMEI',
                name: 'Oriente Medio + Magreb Pack I',
                product_type: 0,
                publication_date: '2014-11-04',
                scope_text: 'Turquía, Egipto, Marruecos, Jordania, Bathrein, Israel, Kuwait, Omán',
                pattern_type: 0,
                subname: ' '
            }
        },
        //simple published packs =====================================================================
        // ==== América simple published packs
        // ========= November 2014
        {
            type: 'insert',
            table: 'published_packs',
            values: {
                pack_code: 'USA-S-1',
                pack_month: 201411,
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
                pack_month: 201411,
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
                pack_code: 'USA-S-3',
                pack_month: 201411,
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
                pack_code: 'USA-S-4',
                pack_month: 201411,
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
                pack_code: 'USA-S-5',
                pack_month: 201411,
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
                pack_code: 'USA-S-6',
                pack_month: 201411,
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
                pack_code: 'USA-S-7',
                pack_month: 201411,
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
                pack_code: 'USA-S-8',
                pack_month: 201411,
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
                pack_code: 'USA-S-9',
                pack_month: 201411,
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
                pack_code: 'USA-S-10',
                pack_month: 201411, 
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
                pack_code: 'LATAM-S-1',
                pack_month: 201411, 
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
                pack_code: 'CAN-S-1',
                pack_month: 201411, 
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
                pack_code: 'CAN-S-2',
                pack_month: 201411, 
                publication_date: '2014-09-15',
                num_patterns: 50,
                letter_from: 'aaa',
                letter_until: 'zzz'
            }
        },
        // ========= December 2014 (shown only from 15/11/2014)
        {
            type: 'insert',
            table: 'published_packs',
            values: {
                pack_code: 'USA-S-1',
                pack_month: 201412,
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
                pack_month: 201412,
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
                pack_code: 'USA-S-3',
                pack_month: 201412,
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
                pack_code: 'USA-S-4',
                pack_month: 201412,
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
                pack_code: 'USA-S-5',
                pack_month: 201412,
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
                pack_code: 'USA-S-6',
                pack_month: 201412,
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
                pack_code: 'USA-S-7',
                pack_month: 201412,
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
                pack_code: 'USA-S-8',
                pack_month: 201412,
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
                pack_code: 'USA-S-9',
                pack_month: 201412,
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
                pack_code: 'USA-S-10',
                pack_month: 201412, 
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
                pack_code: 'LATAM-S-1',
                pack_month: 201412, 
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
                pack_code: 'CAN-S-1',
                pack_month: 201412, 
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
                pack_code: 'CAN-S-2',
                pack_month: 201412, 
                publication_date: '2014-09-15',
                num_patterns: 50,
                letter_from: 'aaa',
                letter_until: 'zzz'
            }
        },
        // ========= January 2015 (Shown in 15/12/2014)
        {
            type: 'insert',
            table: 'published_packs',
            values: {
                pack_code: 'USA-S-1',
                pack_month: 201501,
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
                pack_month: 201501,
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
                pack_code: 'USA-S-3',
                pack_month: 201501,
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
                pack_code: 'USA-S-4',
                pack_month: 201501,
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
                pack_code: 'USA-S-5',
                pack_month: 201501,
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
                pack_code: 'USA-S-6',
                pack_month: 201501,
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
                pack_code: 'USA-S-7',
                pack_month: 201501,
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
                pack_code: 'USA-S-8',
                pack_month: 201501,
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
                pack_code: 'USA-S-9',
                pack_month: 201501,
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
                pack_code: 'USA-S-10',
                pack_month: 201501, 
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
                pack_code: 'LATAM-S-1',
                pack_month: 201501, 
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
                pack_code: 'CAN-S-1',
                pack_month: 201501, 
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
                pack_code: 'CAN-S-2',
                pack_month: 201501, 
                publication_date: '2014-09-15',
                num_patterns: 50,
                letter_from: 'aaa',
                letter_until: 'zzz'
            }
        },
        // ========= October 2014 (not shown in November)
        {
            type: 'insert',
            table: 'published_packs',
            values: {
                pack_code: 'USA-S-1',
                pack_month: 201410,
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
                pack_month: 201410,
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
                pack_code: 'USA-S-3',
                pack_month: 201410,
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
                pack_code: 'USA-S-4',
                pack_month: 201410,
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
                pack_code: 'USA-S-5',
                pack_month: 201410,
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
                pack_code: 'USA-S-6',
                pack_month: 201410,
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
                pack_code: 'USA-S-7',
                pack_month: 201410,
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
                pack_code: 'USA-S-8',
                pack_month: 201410,
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
                pack_code: 'USA-S-9',
                pack_month: 201410,
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
                pack_code: 'USA-S-10',
                pack_month: 201410, 
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
                pack_code: 'LATAM-S-1',
                pack_month: 201410, 
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
                pack_code: 'CAN-S-1',
                pack_month: 201410, 
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
                pack_code: 'CAN-S-2',
                pack_month: 201410, 
                publication_date: '2014-09-15',
                num_patterns: 50,
                letter_from: 'aaa',
                letter_until: 'zzz'
            }
        },
        // ==== Asia Pacífico simple published packs
        // ========= November 2014
        {
            type: 'insert',
            table: 'published_packs',
            values: {
                pack_code: 'TWN-S-1',
                pack_month: 201411,
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
                pack_code: 'TWN-S-2',
                pack_month: 201411,
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
                pack_code: 'ANSA-S-1',
                pack_month: 201411,
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
                pack_code: 'ANSA-S-2',
                pack_month: 201411,
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
                pack_code: 'JPN-S-1',
                pack_month: 201411,
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
                pack_code: 'JPN-S-2',
                pack_month: 201411,
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
                pack_code: 'JPN-S-3',
                pack_month: 201411,
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
                pack_code: 'JPN-S-4',
                pack_month: 201411,
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
                pack_code: 'JPN-S-5',
                pack_month: 201411,
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
                pack_code: 'JPN-S-6',
                pack_month: 201411,
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
                pack_code: 'JPN-S-7',
                pack_month: 201411,
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
                pack_code: 'JPN-S-8',
                pack_month: 201411,
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
                pack_code: 'JPN-S-9',
                pack_month: 201411,
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
                pack_code: 'JPN-S-10',
                pack_month: 201411,
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
                pack_code: 'SOUTHASIA-S-1',
                pack_month: 201411,
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
                pack_code: 'SOUTHASIA-S-2',
                pack_month: 201411,
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
                pack_code: 'SOUTHASIA-S-3',
                pack_month: 201411,
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
                pack_code: 'KOR-S-1',
                pack_month: 201411,
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
                pack_code: 'KOR-S-2',
                pack_month: 201411,
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
                pack_code: 'CHN-S-1',
                pack_month: 201411,
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
                pack_code: 'CHN-S-2',
                pack_month: 201411,
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
                pack_code: 'OCEANIA-S-1',
                pack_month: 201411,
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
                pack_code: 'OCEANIA-S-2',
                pack_month: 201411,
                publication_date: '2014-09-15',
                num_patterns: 50,
                letter_from: 'aaa',
                letter_until: 'zzz'
            }
        },
        // ========= December 2014 (shown only from 15/11/2014)
        {
            type: 'insert',
            table: 'published_packs',
            values: {
                pack_code: 'TWN-S-1',
                pack_month: 201412,
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
                pack_code: 'TWN-S-2',
                pack_month: 201412,
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
                pack_code: 'ANSA-S-1',
                pack_month: 201412,
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
                pack_code: 'ANSA-S-2',
                pack_month: 201412,
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
                pack_code: 'JPN-S-1',
                pack_month: 201412,
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
                pack_code: 'JPN-S-2',
                pack_month: 201412,
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
                pack_code: 'JPN-S-3',
                pack_month: 201412,
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
                pack_code: 'JPN-S-4',
                pack_month: 201412,
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
                pack_code: 'JPN-S-5',
                pack_month: 201412,
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
                pack_code: 'JPN-S-6',
                pack_month: 201412,
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
                pack_code: 'JPN-S-7',
                pack_month: 201412,
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
                pack_code: 'JPN-S-8',
                pack_month: 201412,
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
                pack_code: 'JPN-S-9',
                pack_month: 201412,
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
                pack_code: 'JPN-S-10',
                pack_month: 201412,
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
                pack_code: 'SOUTHASIA-S-1',
                pack_month: 201412,
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
                pack_code: 'SOUTHASIA-S-2',
                pack_month: 201412,
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
                pack_code: 'SOUTHASIA-S-3',
                pack_month: 201412,
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
                pack_code: 'KOR-S-1',
                pack_month: 201412,
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
                pack_code: 'KOR-S-2',
                pack_month: 201412,
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
                pack_code: 'CHN-S-1',
                pack_month: 201412,
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
                pack_code: 'CHN-S-2',
                pack_month: 201412,
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
                pack_code: 'OCEANIA-S-1',
                pack_month: 201412,
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
                pack_code: 'OCEANIA-S-2',
                pack_month: 201412,
                publication_date: '2014-09-15',
                num_patterns: 50,
                letter_from: 'aaa',
                letter_until: 'zzz'
            }
        },
        // ========= January 2015 (shown only from 15/12/2014)
        {
            type: 'insert',
            table: 'published_packs',
            values: {
                pack_code: 'TWN-S-1',
                pack_month: 201501,
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
                pack_code: 'TWN-S-2',
                pack_month: 201501,
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
                pack_code: 'ANSA-S-1',
                pack_month: 201501,
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
                pack_code: 'ANSA-S-2',
                pack_month: 201501,
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
                pack_code: 'JPN-S-1',
                pack_month: 201501,
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
                pack_code: 'JPN-S-2',
                pack_month: 201501,
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
                pack_code: 'JPN-S-3',
                pack_month: 201501,
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
                pack_code: 'JPN-S-4',
                pack_month: 201501,
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
                pack_code: 'JPN-S-5',
                pack_month: 201501,
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
                pack_code: 'JPN-S-6',
                pack_month: 201501,
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
                pack_code: 'JPN-S-7',
                pack_month: 201501,
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
                pack_code: 'JPN-S-8',
                pack_month: 201501,
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
                pack_code: 'JPN-S-9',
                pack_month: 201501,
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
                pack_code: 'JPN-S-10',
                pack_month: 201501,
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
                pack_code: 'SOUTHASIA-S-1',
                pack_month: 201501,
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
                pack_code: 'SOUTHASIA-S-2',
                pack_month: 201501,
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
                pack_code: 'SOUTHASIA-S-3',
                pack_month: 201501,
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
                pack_code: 'KOR-S-1',
                pack_month: 201501,
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
                pack_code: 'KOR-S-2',
                pack_month: 201501,
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
                pack_code: 'CHN-S-1',
                pack_month: 201501,
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
                pack_code: 'CHN-S-2',
                pack_month: 201501,
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
                pack_code: 'OCEANIA-S-1',
                pack_month: 201501,
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
                pack_code: 'OCEANIA-S-2',
                pack_month: 201501,
                publication_date: '2014-09-15',
                num_patterns: 50,
                letter_from: 'aaa',
                letter_until: 'zzz'
            }
        },
        // ========= October 2014 (Not shown)
        {
            type: 'insert',
            table: 'published_packs',
            values: {
                pack_code: 'TWN-S-1',
                pack_month: 201410,
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
                pack_code: 'TWN-S-2',
                pack_month: 201410,
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
                pack_code: 'ANSA-S-1',
                pack_month: 201410,
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
                pack_code: 'ANSA-S-2',
                pack_month: 201410,
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
                pack_code: 'JPN-S-1',
                pack_month: 201410,
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
                pack_code: 'JPN-S-2',
                pack_month: 201410,
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
                pack_code: 'JPN-S-3',
                pack_month: 201410,
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
                pack_code: 'JPN-S-4',
                pack_month: 201410,
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
                pack_code: 'JPN-S-5',
                pack_month: 201410,
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
                pack_code: 'JPN-S-6',
                pack_month: 201410,
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
                pack_code: 'JPN-S-7',
                pack_month: 201410,
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
                pack_code: 'JPN-S-8',
                pack_month: 201410,
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
                pack_code: 'JPN-S-9',
                pack_month: 201410,
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
                pack_code: 'JPN-S-10',
                pack_month: 201410,
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
                pack_code: 'SOUTHASIA-S-1',
                pack_month: 201410,
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
                pack_code: 'SOUTHASIA-S-2',
                pack_month: 201410,
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
                pack_code: 'SOUTHASIA-S-3',
                pack_month: 201410,
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
                pack_code: 'KOR-S-1',
                pack_month: 201410,
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
                pack_code: 'KOR-S-2',
                pack_month: 201410,
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
                pack_code: 'CHN-S-1',
                pack_month: 201410,
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
                pack_code: 'CHN-S-2',
                pack_month: 201410,
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
                pack_code: 'OCEANIA-S-1',
                pack_month: 201410,
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
                pack_code: 'OCEANIA-S-2',
                pack_month: 201410,
                publication_date: '2014-09-15',
                num_patterns: 50,
                letter_from: 'aaa',
                letter_until: 'zzz'
            }
        },
        // ==== Europa África Oriente Medio simple published packs
        // ========= November 2014
        {
            type: 'insert',
            table: 'published_packs',
            values: {
                pack_code: 'EUR-S-1',
                pack_month: 201411,
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
                pack_code: 'EUR-S-2',
                pack_month: 201411,
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
                pack_code: 'EUR-S-3',
                pack_month: 201411,
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
                pack_code: 'EUR-S-4',
                pack_month: 201411,
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
                pack_code: 'EUR-S-5',
                pack_month: 201411,
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
                pack_code: 'EUR-S-6',
                pack_month: 201411,
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
                pack_code: 'EUR-S-7',
                pack_month: 201411,
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
                pack_code: 'EUR-S-8',
                pack_month: 201411,
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
                pack_code: 'CEE-S-1',
                pack_month: 201411,
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
                pack_code: 'ZAF-S-1',
                pack_month: 201411,
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
                pack_code: 'GBR-S-1',
                pack_month: 201411,
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
                pack_code: 'GBR-S-2',
                pack_month: 201411,
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
                pack_code: 'GBR-S-3',
                pack_month: 201411,
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
                pack_code: 'NORDEN-S-1',
                pack_month: 201411,
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
                pack_code: 'NORDEN-S-2',
                pack_month: 201411,
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
                pack_code: 'GMEI-S-1',
                pack_month: 201411,
                publication_date: '2014-09-15',
                num_patterns: 50,
                letter_from: 'aaa',
                letter_until: 'zzz'
            }
        },
        // ========= December 2014 (Shown since November 15th)
        {
            type: 'insert',
            table: 'published_packs',
            values: {
                pack_code: 'EUR-S-1',
                pack_month: 201412,
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
                pack_code: 'EUR-S-2',
                pack_month: 201412,
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
                pack_code: 'EUR-S-3',
                pack_month: 201412,
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
                pack_code: 'EUR-S-4',
                pack_month: 201412,
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
                pack_code: 'EUR-S-5',
                pack_month: 201412,
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
                pack_code: 'EUR-S-6',
                pack_month: 201412,
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
                pack_code: 'EUR-S-7',
                pack_month: 201412,
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
                pack_code: 'EUR-S-8',
                pack_month: 201412,
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
                pack_code: 'CEE-S-1',
                pack_month: 201412,
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
                pack_code: 'ZAF-S-1',
                pack_month: 201412,
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
                pack_code: 'GBR-S-1',
                pack_month: 201412,
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
                pack_code: 'GBR-S-2',
                pack_month: 201412,
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
                pack_code: 'GBR-S-3',
                pack_month: 201412,
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
                pack_code: 'NORDEN-S-1',
                pack_month: 201412,
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
                pack_code: 'NORDEN-S-2',
                pack_month: 201412,
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
                pack_code: 'GMEI-S-1',
                pack_month: 201412,
                publication_date: '2014-09-15',
                num_patterns: 50,
                letter_from: 'aaa',
                letter_until: 'zzz'
            }
        },
        // ========= October 2014 (Not shown)
        {
            type: 'insert',
            table: 'published_packs',
            values: {
                pack_code: 'EUR-S-1',
                pack_month: 201410,
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
                pack_code: 'EUR-S-2',
                pack_month: 201410,
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
                pack_code: 'EUR-S-3',
                pack_month: 201410,
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
                pack_code: 'EUR-S-4',
                pack_month: 201410,
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
                pack_code: 'EUR-S-5',
                pack_month: 201410,
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
                pack_code: 'EUR-S-6',
                pack_month: 201410,
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
                pack_code: 'EUR-S-7',
                pack_month: 201410,
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
                pack_code: 'EUR-S-8',
                pack_month: 201410,
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
                pack_code: 'CEE-S-1',
                pack_month: 201410,
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
                pack_code: 'ZAF-S-1',
                pack_month: 201410,
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
                pack_code: 'GBR-S-1',
                pack_month: 201410,
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
                pack_code: 'GBR-S-2',
                pack_month: 201410,
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
                pack_code: 'GBR-S-3',
                pack_month: 201410,
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
                pack_code: 'NORDEN-S-1',
                pack_month: 201410,
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
                pack_code: 'NORDEN-S-2',
                pack_month: 201410,
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
                pack_code: 'GMEI-S-1',
                pack_month: 201410,
                publication_date: '2014-09-15',
                num_patterns: 50,
                letter_from: 'aaa',
                letter_until: 'zzz'
            }
        },

/*
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
*/
    ];

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
          scope_text: 'Indonesia, Malasia, Tailandia' }

    ];
    var stocks_fixture_options = { 
        default_pack_type: 'stocks', default_publication_date: '2014-09-15',
        create_published_packs: 1, default_num_patterns: 50,
        published_packs_months : [201410,201411,201412,201501] 
    };
    var stocks_fixtures = generate_pack_fixtures(stocks_fixture_data,stocks_fixture_options);
    fixtures = fixtures.concat(stocks_fixtures);

    return fixtures;
};

exports.remove_home_packs_fixture = function() {
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

