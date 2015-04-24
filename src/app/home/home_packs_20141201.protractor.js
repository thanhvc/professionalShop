/**
 * Created by David Verdú on 14/04/15.
 */

var loadFixture = require('../../../test-helpers/load-fixture.js');
var fixtureGenerator = require('../../../test-helpers/fixtures/home_packs-fixture-generator.js');
var sha512 = require('sha512');
var ptor = protractor.getInstance();
var Home = require('../../../test-helpers/page-objects/home.po.js');
var Catalog = require('../../../test-helpers/page-objects/catalog.po.js');
var PageLayout = require('../../../test-helpers/page-objects/page_layout.po.js');
var Helper = require('../../../test-helpers/helper.js');
var DateServerConfigMod = require('../../../test-helpers/date-server-config.js');

//set date on server
var vagrant_id = browser.params.serverVagrantId;
var dsc = new DateServerConfigMod.DateServerConfig(vagrant_id);
dsc.setServerDate("2014-12-01 11:30:00");

//load fixtures once
var conString = browser.params.sqlCon;
var fixtures = fixtureGenerator.home_packs_fixture();
loadFixture.executeQueries(fixtures, conString);
ptor.sleep(11000);

describe('Home page', function () {
        var home;
        var page_layout;
        var catalog_page;
        var helper = new Helper();
        var conString = browser.params.sqlCon;

        beforeEach(function () {
            //var fixtures = fixtureGenerator.home_packs_fixture();
            //loadFixture.executeQueries(fixtures, conString);
            browser.ignoreSynchronization = true;
            ptor.sleep(1000);
            //ptor.sleep(11000); //wait for fixtures to load
        });

        afterEach(function () {
            //page_layout.logout(); 
            //ptor.sleep(2000);
            //var fixtures = fixtureGenerator.remove_home_packs_fixture();
            //loadFixture.executeQueries(fixtures, conString);
        });
        
        describe("packs to subscribe in December 1st", function() {
            beforeEach(function() {
                catalog_page = new Catalog();
                home = new Home(); //go to home page
            });

            describe("Current month packs", function() {
                describe("stocks tab", function() {
                    beforeEach(function() {
                        ptor.sleep(3000); //wait for stocks tab to load
                    });
         
                    it("should have the correct month and year", function() {
                        expect(home.getCurrentMonthTableCurrentTabHeader().getText()).toBe("DICIEMBRE 2014");
                    });

                    it("should have the correct packs in América", function() {
                        expect(home.getCurrentMonthTableAmericaPackName(0).getText()).toBe("Canadá Pack I");
                        expect(home.getCurrentMonthTableAmericaPackName(1).getText()).toBe("Canadá Pack II");
                        expect(home.getCurrentMonthTableAmericaPackName(2).getText()).toBe("Estados Unidos Pack I");
                        expect(home.getCurrentMonthTableAmericaPackName(3).getText()).toBe("Estados Unidos Pack II");
                        expect(home.getCurrentMonthTableAmericaPackName(4).getText()).toBe("Estados Unidos Pack III");
                        expect(home.getCurrentMonthTableAmericaPackName(5).getText()).toBe("Estados Unidos Pack IV");
                        expect(home.getCurrentMonthTableAmericaPackName(6).getText()).toBe("Estados Unidos Pack V");
                        expect(home.getCurrentMonthTableAmericaPackName(7).getText()).toBe("Estados Unidos Pack VI");
                        expect(home.getCurrentMonthTableAmericaPackName(8).getText()).toBe("Estados Unidos Pack VII");
                        expect(home.getCurrentMonthTableAmericaPackName(9).getText()).toBe("Estados Unidos Pack VIII");
                        expect(home.getCurrentMonthTableAmericaPackName(10).getText()).toBe("Estados Unidos Pack IX");
                        expect(home.getCurrentMonthTableAmericaPackName(11).getText()).toBe("Estados Unidos Pack X");
                        expect(home.getCurrentMonthTableAmericaPackName(12).getText()).toBe("Latino América Pack I");
                        expect(home.getCurrentMonthTableAmericaPackNumPatterns(0).getText()).toBe("50");
                        expect(home.getCurrentMonthTableAmericaPackNumPatterns(1).getText()).toBe("50");
                        expect(home.getCurrentMonthTableAmericaPackNumPatterns(2).getText()).toBe("50");
                        expect(home.getCurrentMonthTableAmericaPackNumPatterns(3).getText()).toBe("50");
                        expect(home.getCurrentMonthTableAmericaPackNumPatterns(4).getText()).toBe("50");
                        expect(home.getCurrentMonthTableAmericaPackNumPatterns(5).getText()).toBe("50");
                        expect(home.getCurrentMonthTableAmericaPackNumPatterns(6).getText()).toBe("50");
                        expect(home.getCurrentMonthTableAmericaPackNumPatterns(7).getText()).toBe("50");
                        expect(home.getCurrentMonthTableAmericaPackNumPatterns(8).getText()).toBe("50");
                        expect(home.getCurrentMonthTableAmericaPackNumPatterns(9).getText()).toBe("50");
                        expect(home.getCurrentMonthTableAmericaPackNumPatterns(10).getText()).toBe("50");
                        expect(home.getCurrentMonthTableAmericaPackNumPatterns(11).getText()).toBe("50");
                        expect(home.getCurrentMonthTableAmericaPackNumPatterns(12).getText()).toBe("30"); //odd pack with 30 patterns
                    });

                    it("should have the correct packs in Asia", function() {
                        expect(home.getCurrentMonthTableAsiaPackName(0).getText()).toBe("Australia + Nueva Zelanda Pack I");
                        expect(home.getCurrentMonthTableAsiaPackName(1).getText()).toBe("Australia + Nueva Zelanda Pack II");
                        expect(home.getCurrentMonthTableAsiaPackName(2).getText()).toBe("China Pack I");
                        expect(home.getCurrentMonthTableAsiaPackName(3).getText()).toBe("China Pack II");
                        expect(home.getCurrentMonthTableAsiaPackName(4).getText()).toBe("Corea Pack I");
                        expect(home.getCurrentMonthTableAsiaPackName(5).getText()).toBe("Corea Pack II");
                        expect(home.getCurrentMonthTableAsiaPackName(6).getText()).toBe("India + Pakistán + Sri Lanka Pack I");
                        expect(home.getCurrentMonthTableAsiaPackName(7).getText()).toBe("India + Pakistán + Sri Lanka Pack II");
                        expect(home.getCurrentMonthTableAsiaPackName(8).getText()).toBe("India + Pakistán + Sri Lanka Pack III");
                        expect(home.getCurrentMonthTableAsiaPackName(9).getText()).toBe("Japón Pack I");
                        expect(home.getCurrentMonthTableAsiaPackName(10).getText()).toBe("Japón Pack II");
                        expect(home.getCurrentMonthTableAsiaPackName(11).getText()).toBe("Japón Pack III");
                        expect(home.getCurrentMonthTableAsiaPackName(12).getText()).toBe("Japón Pack IV");
                        expect(home.getCurrentMonthTableAsiaPackName(13).getText()).toBe("Japón Pack V");
                        expect(home.getCurrentMonthTableAsiaPackName(14).getText()).toBe("Japón Pack VI");
                        expect(home.getCurrentMonthTableAsiaPackName(15).getText()).toBe("Japón Pack VII");
                        expect(home.getCurrentMonthTableAsiaPackName(16).getText()).toBe("Japón Pack VIII");
                        expect(home.getCurrentMonthTableAsiaPackName(17).getText()).toBe("Japón Pack IX");
                        expect(home.getCurrentMonthTableAsiaPackName(18).getText()).toBe("Japón Pack X");
                        expect(home.getCurrentMonthTableAsiaPackName(19).getText()).toBe("Sudeste Asiático Pack I");
                        expect(home.getCurrentMonthTableAsiaPackName(20).getText()).toBe("Sudeste Asiático Pack II");
                        expect(home.getCurrentMonthTableAsiaPackName(21).getText()).toBe("Taiwán Pack I");
                        expect(home.getCurrentMonthTableAsiaPackName(22).getText()).toBe("Taiwán Pack II");
                        expect(home.getCurrentMonthTableAsiaPackNumPatterns(0).getText()).toBe("50");
                        expect(home.getCurrentMonthTableAsiaPackNumPatterns(1).getText()).toBe("50");
                        expect(home.getCurrentMonthTableAsiaPackNumPatterns(2).getText()).toBe("50");
                        expect(home.getCurrentMonthTableAsiaPackNumPatterns(3).getText()).toBe("50");
                        expect(home.getCurrentMonthTableAsiaPackNumPatterns(4).getText()).toBe("50");
                        expect(home.getCurrentMonthTableAsiaPackNumPatterns(5).getText()).toBe("50");
                        expect(home.getCurrentMonthTableAsiaPackNumPatterns(6).getText()).toBe("50");
                        expect(home.getCurrentMonthTableAsiaPackNumPatterns(7).getText()).toBe("50");
                        expect(home.getCurrentMonthTableAsiaPackNumPatterns(8).getText()).toBe("50");
                        expect(home.getCurrentMonthTableAsiaPackNumPatterns(9).getText()).toBe("50");
                        expect(home.getCurrentMonthTableAsiaPackNumPatterns(10).getText()).toBe("50");
                        expect(home.getCurrentMonthTableAsiaPackNumPatterns(11).getText()).toBe("50");
                        expect(home.getCurrentMonthTableAsiaPackNumPatterns(12).getText()).toBe("50");
                        expect(home.getCurrentMonthTableAsiaPackNumPatterns(13).getText()).toBe("50");
                        expect(home.getCurrentMonthTableAsiaPackNumPatterns(14).getText()).toBe("50");
                        expect(home.getCurrentMonthTableAsiaPackNumPatterns(15).getText()).toBe("50");
                        expect(home.getCurrentMonthTableAsiaPackNumPatterns(16).getText()).toBe("50");
                        expect(home.getCurrentMonthTableAsiaPackNumPatterns(17).getText()).toBe("50");
                        expect(home.getCurrentMonthTableAsiaPackNumPatterns(18).getText()).toBe("50");
                        expect(home.getCurrentMonthTableAsiaPackNumPatterns(19).getText()).toBe("50");
                        expect(home.getCurrentMonthTableAsiaPackNumPatterns(20).getText()).toBe("50");
                        expect(home.getCurrentMonthTableAsiaPackNumPatterns(21).getText()).toBe("50");
                        expect(home.getCurrentMonthTableAsiaPackNumPatterns(22).getText()).toBe("50");
                    });

                    it("should have the correct packs in Europe", function() {
                        expect(home.getCurrentMonthTableEuropePackName(0).getText()).toBe("Oriente Medio + Magreb Pack I");
                        expect(home.getCurrentMonthTableEuropePackName(1).getText()).toBe("Países Nórdicos Pack I");
                        expect(home.getCurrentMonthTableEuropePackName(2).getText()).toBe("Países Nórdicos Pack II");
                        expect(home.getCurrentMonthTableEuropePackName(3).getText()).toBe("Reino Unido Pack I");
                        expect(home.getCurrentMonthTableEuropePackName(4).getText()).toBe("Reino Unido Pack II");
                        expect(home.getCurrentMonthTableEuropePackName(5).getText()).toBe("Reino Unido Pack III");
                        expect(home.getCurrentMonthTableEuropePackName(6).getText()).toBe("Sudáfrica Pack I");
                        expect(home.getCurrentMonthTableEuropePackName(7).getText()).toBe("Suiza + Europa del Este + Rusia Pack I");
                        expect(home.getCurrentMonthTableEuropePackName(8).getText()).toBe("Zona Euro Pack I");
                        expect(home.getCurrentMonthTableEuropePackName(9).getText()).toBe("Zona Euro Pack II");
                        expect(home.getCurrentMonthTableEuropePackName(10).getText()).toBe("Zona Euro Pack III");
                        expect(home.getCurrentMonthTableEuropePackName(11).getText()).toBe("Zona Euro Pack IV");
                        expect(home.getCurrentMonthTableEuropePackName(12).getText()).toBe("Zona Euro Pack V");
                        expect(home.getCurrentMonthTableEuropePackName(13).getText()).toBe("Zona Euro Pack VI");
                        expect(home.getCurrentMonthTableEuropePackName(14).getText()).toBe("Zona Euro Pack VII");
                        expect(home.getCurrentMonthTableEuropePackName(15).getText()).toBe("Zona Euro Pack VIII");
                        expect(home.getCurrentMonthTableEuropePackName(16).getText()).toBe("Zzz Additional December Pack I"); //to test different packs depending on month
                        expect(home.getCurrentMonthTableEuropePackNumPatterns(0).getText()).toBe("50");
                        expect(home.getCurrentMonthTableEuropePackNumPatterns(1).getText()).toBe("50");
                        expect(home.getCurrentMonthTableEuropePackNumPatterns(2).getText()).toBe("50");
                        expect(home.getCurrentMonthTableEuropePackNumPatterns(3).getText()).toBe("50");
                        expect(home.getCurrentMonthTableEuropePackNumPatterns(4).getText()).toBe("50");
                        expect(home.getCurrentMonthTableEuropePackNumPatterns(5).getText()).toBe("50");
                        expect(home.getCurrentMonthTableEuropePackNumPatterns(6).getText()).toBe("50");
                        expect(home.getCurrentMonthTableEuropePackNumPatterns(7).getText()).toBe("50");
                        expect(home.getCurrentMonthTableEuropePackNumPatterns(8).getText()).toBe("50");
                        expect(home.getCurrentMonthTableEuropePackNumPatterns(9).getText()).toBe("50");
                        expect(home.getCurrentMonthTableEuropePackNumPatterns(10).getText()).toBe("50");
                        expect(home.getCurrentMonthTableEuropePackNumPatterns(11).getText()).toBe("50");
                        expect(home.getCurrentMonthTableEuropePackNumPatterns(12).getText()).toBe("50");
                        expect(home.getCurrentMonthTableEuropePackNumPatterns(13).getText()).toBe("50");
                        expect(home.getCurrentMonthTableEuropePackNumPatterns(14).getText()).toBe("50");
                        expect(home.getCurrentMonthTableEuropePackNumPatterns(15).getText()).toBe("50");
                        expect(home.getCurrentMonthTableEuropePackNumPatterns(16).getText()).toBe("100");
                    });

                    describe("go to Canadá Pack I catalog", function() {
                        beforeEach(function() {
                            ptor.sleep(2000);
                            home.getCurrentMonthTableAmericaPackName(0).click();
                            ptor.sleep(2000);
                        });

                        it("should be on catalog page and have the correct patterns", function() {
                            expect(catalog_page.isCurrentPage()).toBe(true);
                            expect(catalog_page.getStartDateLabel().getText()).toBe("Diciembre 2014");
                            expect(catalog_page.getPackNameLabel().getText()).toBe("Canadá Pack I");
                            expect(catalog_page.getCurrentDateLabel().getText()).toBe("Date: 01 Dic. (GMT)");
                            expect(catalog_page.getTotalAndFoundPatternsLabel().getText()).toBe("Número total de patrones: 50; Patrones encontrados: 50");
                            //first pattern
                            expect(catalog_page.getPatternName(0).getText()).toBe("Long name Asset 051");
                            expect(catalog_page.getPatternMarket(0).getText()).toBe("EC1");
                            expect(catalog_page.getPatternSectorIndustry(0).getText()).toBe("Sector3 / Industry3_1");
                            expect(catalog_page.getPatternWin(0).getText()).toBe("14");
                            expect(catalog_page.getPatternLoss(0).getText()).toBe("1");
                            expect(catalog_page.getPatternAccumulatedReturn(0).getText()).toBe("212");
                            expect(catalog_page.getPatternAverageReturn(0).getText()).toBe("14.2");
                            expect(catalog_page.getPatternDuration(0).getText()).toBe("Hasta 1");
                            expect(catalog_page.getPatternVolatility(0).getText()).toBe("19");
                            expect(catalog_page.getPatternStatus(0,'not_started').isDisplayed()).toBe(false);
                            expect(catalog_page.getPatternStatus(0,'started').isDisplayed()).toBe(true);
                            expect(catalog_page.getPatternStatus(0,'finished').isDisplayed()).toBe(false);
                            //second pattern
                            expect(catalog_page.getPatternName(1).getText()).toBe("Long name Asset 052");
                            expect(catalog_page.getPatternMarket(1).getText()).toBe("EC2");
                            expect(catalog_page.getPatternSectorIndustry(1).getText()).toBe("Sector4 / Industry4_1");
                            expect(catalog_page.getPatternWin(1).getText()).toBe("12");
                            expect(catalog_page.getPatternLoss(1).getText()).toBe("3");
                            expect(catalog_page.getPatternAccumulatedReturn(1).getText()).toBe("101");
                            expect(catalog_page.getPatternAverageReturn(1).getText()).toBe("9.7");
                            expect(catalog_page.getPatternDuration(1).getText()).toBe("De 1 a 3");
                            expect(catalog_page.getPatternVolatility(1).getText()).toBe("5");
                            expect(catalog_page.getPatternStatus(1,'not_started').isDisplayed()).toBe(true);
                            expect(catalog_page.getPatternStatus(1,'started').isDisplayed()).toBe(false);
                            expect(catalog_page.getPatternStatus(1,'finished').isDisplayed()).toBe(false);
                            //third pattern
                            expect(catalog_page.getPatternName(2).getText()).toBe("Long name Asset 053");
                            expect(catalog_page.getPatternMarket(2).getText()).toBe("EC3");
                            expect(catalog_page.getPatternSectorIndustry(2).getText()).toBe("Sector3 / Industry3_2");
                            expect(catalog_page.getPatternWin(2).getText()).toBe("10");
                            expect(catalog_page.getPatternLoss(2).getText()).toBe("5");
                            expect(catalog_page.getPatternAccumulatedReturn(2).getText()).toBe("500");
                            expect(catalog_page.getPatternAverageReturn(2).getText()).toBe("27.5");
                            expect(catalog_page.getPatternDuration(2).getText()).toBe("Más de 3");
                            expect(catalog_page.getPatternVolatility(2).getText()).toBe("57"); //truncated
                            expect(catalog_page.getPatternStatus(2,'not_started').isDisplayed()).toBe(true);
                            expect(catalog_page.getPatternStatus(2,'started').isDisplayed()).toBe(false);
                            expect(catalog_page.getPatternStatus(2,'finished').isDisplayed()).toBe(false);
                            //fourth pattern
                            expect(catalog_page.getPatternName(3).getText()).toBe("Long name Asset 054");
                            expect(catalog_page.getPatternMarket(3).getText()).toBe("EC1");
                            expect(catalog_page.getPatternSectorIndustry(3).getText()).toBe("Sector4 / Industry4_2");
                            expect(catalog_page.getPatternWin(3).getText()).toBe("14");
                            expect(catalog_page.getPatternLoss(3).getText()).toBe("1");
                            expect(catalog_page.getPatternAccumulatedReturn(3).getText()).toBe("212");
                            expect(catalog_page.getPatternAverageReturn(3).getText()).toBe("14.2");
                            expect(catalog_page.getPatternDuration(3).getText()).toBe("Hasta 1");
                            expect(catalog_page.getPatternVolatility(3).getText()).toBe("104");
                            expect(catalog_page.getPatternStatus(3,'not_started').isDisplayed()).toBe(true);
                            expect(catalog_page.getPatternStatus(3,'started').isDisplayed()).toBe(false);
                            expect(catalog_page.getPatternStatus(3,'finished').isDisplayed()).toBe(false);
                        });

                        it("should filter catalog by asset name", function() {
                            expect(catalog_page.isCurrentPage()).toBe(true);
                            catalog_page.getNameFilter().sendKeys("4");
                            ptor.sleep(3000);
                            expect(catalog_page.getTotalAndFoundPatternsLabel().getText()).toBe("Número total de patrones: 50; Patrones encontrados: 5");
                            expect(catalog_page.getPatternName(0).getText()).toBe("Long name Asset 054");
                            expect(catalog_page.getPatternName(1).getText()).toBe("Long name Asset 064");
                            expect(catalog_page.getPatternName(2).getText()).toBe("Long name Asset 074");
                            expect(catalog_page.getPatternName(3).getText()).toBe("Long name Asset 084");
                            expect(catalog_page.getPatternName(4).getText()).toBe("Long name Asset 094");
                        });

                        it("should filter catalog by sector", function() {
                            expect(catalog_page.isCurrentPage()).toBe(true);
                            catalog_page.getSectorFilter().sendKeys("sector");
                            ptor.sleep(1000);
                            expect(catalog_page.getSectorFilterDropdownOption(0).getText()).toBe("Sector3");
                            expect(catalog_page.getSectorFilterDropdownOption(1).getText()).toBe("Sector4");
                            catalog_page.getSectorFilterDropdownOption(0).click();
                            ptor.sleep(3000);
                            expect(catalog_page.getTotalAndFoundPatternsLabel().getText()).toBe("Número total de patrones: 50; Patrones encontrados: 25");
                            expect(catalog_page.getPatternName(0).getText()).toBe("Long name Asset 051");
                            expect(catalog_page.getPatternSectorIndustry(0).getText()).toBe("Sector3 / Industry3_1");
                            expect(catalog_page.getPatternName(1).getText()).toBe("Long name Asset 053");
                            expect(catalog_page.getPatternSectorIndustry(1).getText()).toBe("Sector3 / Industry3_2");
                            expect(catalog_page.getPatternName(2).getText()).toBe("Long name Asset 055");
                            expect(catalog_page.getPatternSectorIndustry(2).getText()).toBe("Sector3 / Industry3_1");
                            expect(catalog_page.getPatternName(3).getText()).toBe("Long name Asset 057");
                            expect(catalog_page.getPatternSectorIndustry(3).getText()).toBe("Sector3 / Industry3_2");
                        });

                        it("should filter catalog by sector and industry", function() {
                            expect(catalog_page.isCurrentPage()).toBe(true);
                            catalog_page.getSectorFilter().sendKeys("sector");
                            ptor.sleep(1000);
                            expect(catalog_page.getSectorFilterDropdownOption(0).getText()).toBe("Sector3");
                            expect(catalog_page.getSectorFilterDropdownOption(1).getText()).toBe("Sector4");
                            catalog_page.getSectorFilterDropdownOption(1).click();
                            ptor.sleep(3000);
                            catalog_page.getIndustryFilter().sendKeys("industry");
                            expect(catalog_page.getIndustryFilterDropdownOption(0).getText()).toBe("Industry4_1");
                            expect(catalog_page.getIndustryFilterDropdownOption(1).getText()).toBe("Industry4_2");
                            catalog_page.getIndustryFilterDropdownOption(1).click();
                            ptor.sleep(3000);
                            expect(catalog_page.getTotalAndFoundPatternsLabel().getText()).toBe("Número total de patrones: 50; Patrones encontrados: 12");
                            expect(catalog_page.getPatternName(0).getText()).toBe("Long name Asset 054");
                            expect(catalog_page.getPatternSectorIndustry(0).getText()).toBe("Sector4 / Industry4_2");
                            expect(catalog_page.getPatternName(1).getText()).toBe("Long name Asset 058");
                            expect(catalog_page.getPatternSectorIndustry(1).getText()).toBe("Sector4 / Industry4_2");
                            expect(catalog_page.getPatternName(2).getText()).toBe("Long name Asset 062");
                            expect(catalog_page.getPatternSectorIndustry(2).getText()).toBe("Sector4 / Industry4_2");
                            expect(catalog_page.getPatternName(3).getText()).toBe("Long name Asset 066");
                            expect(catalog_page.getPatternSectorIndustry(3).getText()).toBe("Sector4 / Industry4_2");
                        });

                        it("should filter catalog by duration", function() {
                            expect(catalog_page.isCurrentPage()).toBe(true);
                            catalog_page.selectDurationFilter(1); //Hasta 1 mes
                            ptor.sleep(2000);
                            expect(catalog_page.getTotalAndFoundPatternsLabel().getText()).toBe("Número total de patrones: 50; Patrones encontrados: 17");
                            expect(catalog_page.getPatternName(0).getText()).toBe("Long name Asset 051");
                            expect(catalog_page.getPatternDuration(0).getText()).toBe("Hasta 1");
                            expect(catalog_page.getPatternName(1).getText()).toBe("Long name Asset 054");
                            expect(catalog_page.getPatternDuration(1).getText()).toBe("Hasta 1");
                            expect(catalog_page.getPatternName(2).getText()).toBe("Long name Asset 057");
                            expect(catalog_page.getPatternDuration(2).getText()).toBe("Hasta 1");
                            expect(catalog_page.getPatternName(3).getText()).toBe("Long name Asset 060");
                            expect(catalog_page.getPatternDuration(3).getText()).toBe("Hasta 1");
                            catalog_page.selectDurationFilter(2); //de 1 a 3 meses
                            ptor.sleep(2000);
                            expect(catalog_page.getTotalAndFoundPatternsLabel().getText()).toBe("Número total de patrones: 50; Patrones encontrados: 17");
                            expect(catalog_page.getPatternName(0).getText()).toBe("Long name Asset 052");
                            expect(catalog_page.getPatternDuration(0).getText()).toBe("De 1 a 3");
                            expect(catalog_page.getPatternName(1).getText()).toBe("Long name Asset 055");
                            expect(catalog_page.getPatternDuration(1).getText()).toBe("De 1 a 3");
                            expect(catalog_page.getPatternName(2).getText()).toBe("Long name Asset 058");
                            expect(catalog_page.getPatternDuration(2).getText()).toBe("De 1 a 3");
                            expect(catalog_page.getPatternName(3).getText()).toBe("Long name Asset 061");
                            expect(catalog_page.getPatternDuration(3).getText()).toBe("De 1 a 3");
                            catalog_page.selectDurationFilter(3); //Más de 3 meses
                            ptor.sleep(2000);
                            expect(catalog_page.getTotalAndFoundPatternsLabel().getText()).toBe("Número total de patrones: 50; Patrones encontrados: 16");
                            expect(catalog_page.getPatternName(0).getText()).toBe("Long name Asset 053");
                            expect(catalog_page.getPatternDuration(0).getText()).toBe("Más de 3");
                            expect(catalog_page.getPatternName(1).getText()).toBe("Long name Asset 056");
                            expect(catalog_page.getPatternDuration(1).getText()).toBe("Más de 3");
                            expect(catalog_page.getPatternName(2).getText()).toBe("Long name Asset 059");
                            expect(catalog_page.getPatternDuration(2).getText()).toBe("Más de 3");
                            expect(catalog_page.getPatternName(3).getText()).toBe("Long name Asset 062");
                            expect(catalog_page.getPatternDuration(3).getText()).toBe("Más de 3");
                        });

                        it("should filter catalog by volatility", function() {
                            expect(catalog_page.isCurrentPage()).toBe(true);
                            catalog_page.selectVolatilityFilter(1); //Menos de 25%
                            ptor.sleep(2000);
                            expect(catalog_page.getTotalAndFoundPatternsLabel().getText()).toBe("Número total de patrones: 50; Patrones encontrados: 26");
                            expect(catalog_page.getPatternName(0).getText()).toBe("Long name Asset 051");
                            expect(catalog_page.getPatternVolatility(0).getText()).toBe("19");
                            expect(catalog_page.getPatternName(1).getText()).toBe("Long name Asset 052");
                            expect(catalog_page.getPatternVolatility(1).getText()).toBe("5");
                            expect(catalog_page.getPatternName(2).getText()).toBe("Long name Asset 055");
                            expect(catalog_page.getPatternVolatility(2).getText()).toBe("19");
                            expect(catalog_page.getPatternName(3).getText()).toBe("Long name Asset 056");
                            expect(catalog_page.getPatternVolatility(3).getText()).toBe("5");
                            catalog_page.selectVolatilityFilter(2); //Entre 25% y 50%
                            ptor.sleep(2000);
                            expect(catalog_page.getTotalAndFoundPatternsLabel().getText()).toBe("Número total de patrones: 50; Patrones encontrados: 0");
                            catalog_page.selectVolatilityFilter(3); //Entre 50% y 75%
                            ptor.sleep(2000);
                            expect(catalog_page.getTotalAndFoundPatternsLabel().getText()).toBe("Número total de patrones: 50; Patrones encontrados: 12");
                            expect(catalog_page.getPatternName(0).getText()).toBe("Long name Asset 053");
                            expect(catalog_page.getPatternVolatility(0).getText()).toBe("57");
                            expect(catalog_page.getPatternName(1).getText()).toBe("Long name Asset 057");
                            expect(catalog_page.getPatternVolatility(1).getText()).toBe("57");
                            expect(catalog_page.getPatternName(2).getText()).toBe("Long name Asset 061");
                            expect(catalog_page.getPatternVolatility(2).getText()).toBe("57");
                            expect(catalog_page.getPatternName(3).getText()).toBe("Long name Asset 065");
                            expect(catalog_page.getPatternVolatility(3).getText()).toBe("57");
                            catalog_page.selectVolatilityFilter(4); //Más de 75%
                            ptor.sleep(2000);
                            expect(catalog_page.getTotalAndFoundPatternsLabel().getText()).toBe("Número total de patrones: 50; Patrones encontrados: 12");
                            expect(catalog_page.getPatternName(0).getText()).toBe("Long name Asset 054");
                            expect(catalog_page.getPatternVolatility(0).getText()).toBe("104");
                            expect(catalog_page.getPatternName(1).getText()).toBe("Long name Asset 058");
                            expect(catalog_page.getPatternVolatility(1).getText()).toBe("104");
                            expect(catalog_page.getPatternName(2).getText()).toBe("Long name Asset 062");
                            expect(catalog_page.getPatternVolatility(2).getText()).toBe("104");
                            expect(catalog_page.getPatternName(3).getText()).toBe("Long name Asset 066");
                            expect(catalog_page.getPatternVolatility(3).getText()).toBe("104");
                        });

                        it("should filter catalog by all filters at the same time", function() {
                            expect(catalog_page.isCurrentPage()).toBe(true);
                            catalog_page.getSectorFilter().sendKeys("sector");
                            ptor.sleep(1000);
                            expect(catalog_page.getSectorFilterDropdownOption(0).getText()).toBe("Sector3");
                            expect(catalog_page.getSectorFilterDropdownOption(1).getText()).toBe("Sector4");
                            catalog_page.getSectorFilterDropdownOption(0).click();
                            ptor.sleep(3000);
                            catalog_page.getIndustryFilter().sendKeys("industry");
                            expect(catalog_page.getIndustryFilterDropdownOption(0).getText()).toBe("Industry3_1");
                            expect(catalog_page.getIndustryFilterDropdownOption(1).getText()).toBe("Industry3_2");
                            catalog_page.getIndustryFilterDropdownOption(0).click();
                            ptor.sleep(3000);
                            catalog_page.getNameFilter().sendKeys("7");
                            ptor.sleep(2000);
                            catalog_page.selectDurationFilter(1); //Hasta 1 mes
                            ptor.sleep(2000);
                            catalog_page.selectVolatilityFilter(1); //Menos de 25%
                            ptor.sleep(2000);
                            expect(catalog_page.getTotalAndFoundPatternsLabel().getText()).toBe("Número total de patrones: 50; Patrones encontrados: 2");
                            //first pattern
                            expect(catalog_page.getPatternName(0).getText()).toBe("Long name Asset 075");
                            expect(catalog_page.getPatternMarket(0).getText()).toBe("EC1");
                            expect(catalog_page.getPatternSectorIndustry(0).getText()).toBe("Sector3 / Industry3_1");
                            expect(catalog_page.getPatternWin(0).getText()).toBe("14");
                            expect(catalog_page.getPatternLoss(0).getText()).toBe("1");
                            expect(catalog_page.getPatternAccumulatedReturn(0).getText()).toBe("212");
                            expect(catalog_page.getPatternAverageReturn(0).getText()).toBe("14.2");
                            expect(catalog_page.getPatternDuration(0).getText()).toBe("Hasta 1");
                            expect(catalog_page.getPatternVolatility(0).getText()).toBe("19");
                            expect(catalog_page.getPatternStatus(0,'not_started').isDisplayed()).toBe(true);
                            expect(catalog_page.getPatternStatus(0,'started').isDisplayed()).toBe(false);
                            expect(catalog_page.getPatternStatus(0,'finished').isDisplayed()).toBe(false);
                            //second pattern
                            expect(catalog_page.getPatternName(1).getText()).toBe("Long name Asset 087");
                            expect(catalog_page.getPatternMarket(1).getText()).toBe("EC1");
                            expect(catalog_page.getPatternSectorIndustry(1).getText()).toBe("Sector3 / Industry3_1");
                            expect(catalog_page.getPatternWin(1).getText()).toBe("14");
                            expect(catalog_page.getPatternLoss(1).getText()).toBe("1");
                            expect(catalog_page.getPatternAccumulatedReturn(1).getText()).toBe("212");
                            expect(catalog_page.getPatternAverageReturn(1).getText()).toBe("14.2");
                            expect(catalog_page.getPatternDuration(1).getText()).toBe("Hasta 1");
                            expect(catalog_page.getPatternVolatility(1).getText()).toBe("19");
                            expect(catalog_page.getPatternStatus(1,'not_started').isDisplayed()).toBe(true);
                            expect(catalog_page.getPatternStatus(1,'started').isDisplayed()).toBe(false);
                            expect(catalog_page.getPatternStatus(1,'finished').isDisplayed()).toBe(false);
                        });

                    }); //end go to Canadá Pack I catalog

                }); //end stocks tab

                describe("pairs tab", function() {
                    beforeEach(function() {
                        ptor.sleep(3000); //wait for tables to load
                        home.goToCurrentMonthTab('pairs');
                        ptor.sleep(3000); //wait for pairs tab to load
                    });
         
                    it("should have the correct month and year", function() {
                        expect(home.getCurrentMonthTableCurrentTabHeader().getText()).toBe("DICIEMBRE 2014");
                    });

                    it("should have the correct packs in América", function() {
                        expect(home.getCurrentMonthTableAmericaPackName(0).getText()).toBe("Estados Unidos Pack I");
                        expect(home.getCurrentMonthTableAmericaPackName(1).getText()).toBe("Estados Unidos Pack II");
                        expect(home.getCurrentMonthTableAmericaPackName(2).getText()).toBe("Estados Unidos Pack III");
                        expect(home.getCurrentMonthTableAmericaPackName(3).getText()).toBe("Estados Unidos Pack IV");
                        expect(home.getCurrentMonthTableAmericaPackName(4).getText()).toBe("Estados Unidos Pack V");
                        expect(home.getCurrentMonthTableAmericaPackName(5).getText()).toBe("Estados Unidos Pack VI");
                        expect(home.getCurrentMonthTableAmericaPackNumPatterns(0).getText()).toBe("50");
                        expect(home.getCurrentMonthTableAmericaPackNumPatterns(1).getText()).toBe("50");
                        expect(home.getCurrentMonthTableAmericaPackNumPatterns(2).getText()).toBe("50");
                        expect(home.getCurrentMonthTableAmericaPackNumPatterns(3).getText()).toBe("50");
                        expect(home.getCurrentMonthTableAmericaPackNumPatterns(4).getText()).toBe("50");
                        expect(home.getCurrentMonthTableAmericaPackNumPatterns(5).getText()).toBe("50");
                    });

                    it("should have the correct packs in Asia", function() {
                        expect(home.getCurrentMonthTableAsiaPackName(0).getText()).toBe("Japón Pack I");
                        expect(home.getCurrentMonthTableAsiaPackName(1).getText()).toBe("Japón Pack II");
                        expect(home.getCurrentMonthTableAsiaPackName(2).getText()).toBe("Japón Pack III");
                        expect(home.getCurrentMonthTableAsiaPackName(3).getText()).toBe("Japón Pack IV");
                        expect(home.getCurrentMonthTableAsiaPackName(4).getText()).toBe("Japón Pack V");
                        expect(home.getCurrentMonthTableAsiaPackName(5).getText()).toBe("Japón Pack VI");
                        expect(home.getCurrentMonthTableAsiaPackNumPatterns(0).getText()).toBe("50");
                        expect(home.getCurrentMonthTableAsiaPackNumPatterns(1).getText()).toBe("50");
                        expect(home.getCurrentMonthTableAsiaPackNumPatterns(2).getText()).toBe("50");
                        expect(home.getCurrentMonthTableAsiaPackNumPatterns(3).getText()).toBe("50");
                        expect(home.getCurrentMonthTableAsiaPackNumPatterns(4).getText()).toBe("50");
                        expect(home.getCurrentMonthTableAsiaPackNumPatterns(5).getText()).toBe("50");
                    });

                    it("should have the correct packs in Europe", function() {
                        expect(home.getCurrentMonthTableEuropePackName(0).getText()).toBe("Zona Euro Pack I");
                        expect(home.getCurrentMonthTableEuropePackName(1).getText()).toBe("Zona Euro Pack II");
                        expect(home.getCurrentMonthTableEuropePackName(2).getText()).toBe("Zona Euro Pack III");
                        expect(home.getCurrentMonthTableEuropePackName(3).getText()).toBe("Zona Euro Pack IV");
                        expect(home.getCurrentMonthTableEuropePackName(4).getText()).toBe("Zona Euro Pack V");
                        expect(home.getCurrentMonthTableEuropePackName(5).getText()).toBe("Zona Euro Pack VI");
                        expect(home.getCurrentMonthTableEuropePackName(6).getText()).toBe("Zzz Additional December Pair Pack I");
                        expect(home.getCurrentMonthTableEuropePackNumPatterns(0).getText()).toBe("50");
                        expect(home.getCurrentMonthTableEuropePackNumPatterns(1).getText()).toBe("50");
                        expect(home.getCurrentMonthTableEuropePackNumPatterns(2).getText()).toBe("50");
                        expect(home.getCurrentMonthTableEuropePackNumPatterns(3).getText()).toBe("50");
                        expect(home.getCurrentMonthTableEuropePackNumPatterns(4).getText()).toBe("50");
                        expect(home.getCurrentMonthTableEuropePackNumPatterns(5).getText()).toBe("50");
                        expect(home.getCurrentMonthTableEuropePackNumPatterns(6).getText()).toBe("100");
                    });

                    describe("go to Estados Unidos Pack I catalog", function() {
                        beforeEach(function() {
                            ptor.sleep(2000);
                            home.getCurrentMonthTableAmericaPackName(0).click();
                            ptor.sleep(2000);
                        });

                        it("should be on catalog page and have the correct patterns", function() {
                            expect(catalog_page.isCurrentPage()).toBe(true);
                            expect(catalog_page.getStartDateLabel().getText()).toBe("Diciembre 2014");
                            expect(catalog_page.getPackNameLabel().getText()).toBe("Estados Unidos Pack I");
                            expect(catalog_page.getCurrentDateLabel().getText()).toBe("Date: 01 Dic. (GMT)");
                            expect(catalog_page.getTotalAndFoundPatternsLabel().getText()).toBe("Número total de patrones: 50; Patrones encontrados: 50");
                            //first pattern
                            expect(catalog_page.getPairPatternName(0,0).getText()).toBe("Long name Asset 251 1");
                            expect(catalog_page.getPairPatternName(0,1).getText()).toBe("Long name Asset 251 2");
                            expect(catalog_page.getPairPatternMarket(0,0).getText()).toBe("EX1");
                            expect(catalog_page.getPairPatternMarket(0,1).getText()).toBe("EX1");
                            expect(catalog_page.getPairPatternSectorIndustry(0,0).getText()).toBe("Sector3 / Industry3_1");
                            expect(catalog_page.getPairPatternSectorIndustry(0,1).getText()).toBe("Sector3 / Industry3_1");
                            expect(catalog_page.getPatternWin(0).getText()).toBe("14");
                            expect(catalog_page.getPatternLoss(0).getText()).toBe("1");
                            expect(catalog_page.getPatternAccumulatedReturn(0).getText()).toBe("212");
                            expect(catalog_page.getPatternAverageReturn(0).getText()).toBe("14.2");
                            expect(catalog_page.getPatternDuration(0).getText()).toBe("Hasta 1");
                            expect(catalog_page.getPatternVolatility(0).getText()).toBe("19");
                            expect(catalog_page.getPatternStatus(0,'not_started').isDisplayed()).toBe(false);
                            expect(catalog_page.getPatternStatus(0,'started').isDisplayed()).toBe(true);
                            expect(catalog_page.getPatternStatus(0,'finished').isDisplayed()).toBe(false);
                            //second pattern
                            expect(catalog_page.getPairPatternName(1,0).getText()).toBe("Long name Asset 252 1");
                            expect(catalog_page.getPairPatternName(1,1).getText()).toBe("Long name Asset 252 2");
                            expect(catalog_page.getPairPatternMarket(1,0).getText()).toBe("EX2");
                            expect(catalog_page.getPairPatternMarket(1,1).getText()).toBe("EX2");
                            expect(catalog_page.getPairPatternSectorIndustry(1,0).getText()).toBe("Sector4 / Industry4_1");
                            expect(catalog_page.getPairPatternSectorIndustry(1,1).getText()).toBe("Sector4 / Industry4_1");
                            expect(catalog_page.getPatternWin(1).getText()).toBe("12");
                            expect(catalog_page.getPatternLoss(1).getText()).toBe("3");
                            expect(catalog_page.getPatternAccumulatedReturn(1).getText()).toBe("101");
                            expect(catalog_page.getPatternAverageReturn(1).getText()).toBe("9.7");
                            expect(catalog_page.getPatternDuration(1).getText()).toBe("De 1 a 3");
                            expect(catalog_page.getPatternVolatility(1).getText()).toBe("5");
                            expect(catalog_page.getPatternStatus(1,'not_started').isDisplayed()).toBe(true);
                            expect(catalog_page.getPatternStatus(1,'started').isDisplayed()).toBe(false);
                            expect(catalog_page.getPatternStatus(1,'finished').isDisplayed()).toBe(false);
                            //third pattern
                            expect(catalog_page.getPairPatternName(2,0).getText()).toBe("Long name Asset 253 1");
                            expect(catalog_page.getPairPatternName(2,1).getText()).toBe("Long name Asset 253 2");
                            expect(catalog_page.getPairPatternMarket(2,0).getText()).toBe("EX3");
                            expect(catalog_page.getPairPatternMarket(2,1).getText()).toBe("EX3");
                            expect(catalog_page.getPairPatternSectorIndustry(2,0).getText()).toBe("Sector3 / Industry3_2");
                            expect(catalog_page.getPairPatternSectorIndustry(2,1).getText()).toBe("Sector3 / Industry3_2");
                            expect(catalog_page.getPatternWin(2).getText()).toBe("10");
                            expect(catalog_page.getPatternLoss(2).getText()).toBe("5");
                            expect(catalog_page.getPatternAccumulatedReturn(2).getText()).toBe("500");
                            expect(catalog_page.getPatternAverageReturn(2).getText()).toBe("27.5");
                            expect(catalog_page.getPatternDuration(2).getText()).toBe("Más de 3");
                            expect(catalog_page.getPatternVolatility(2).getText()).toBe("57"); //truncated
                            expect(catalog_page.getPatternStatus(2,'not_started').isDisplayed()).toBe(true);
                            expect(catalog_page.getPatternStatus(2,'started').isDisplayed()).toBe(false);
                            expect(catalog_page.getPatternStatus(2,'finished').isDisplayed()).toBe(false);
                            //fourth pattern
                            expect(catalog_page.getPairPatternName(3,0).getText()).toBe("Long name Asset 254 1");
                            expect(catalog_page.getPairPatternName(3,1).getText()).toBe("Long name Asset 254 2");
                            expect(catalog_page.getPairPatternMarket(3,0).getText()).toBe("EX1");
                            expect(catalog_page.getPairPatternMarket(3,1).getText()).toBe("EX1");
                            expect(catalog_page.getPairPatternSectorIndustry(3,0).getText()).toBe("Sector4 / Industry4_2");
                            expect(catalog_page.getPairPatternSectorIndustry(3,1).getText()).toBe("Sector4 / Industry4_2");
                            expect(catalog_page.getPatternWin(3).getText()).toBe("14");
                            expect(catalog_page.getPatternLoss(3).getText()).toBe("1");
                            expect(catalog_page.getPatternAccumulatedReturn(3).getText()).toBe("212");
                            expect(catalog_page.getPatternAverageReturn(3).getText()).toBe("14.2");
                            expect(catalog_page.getPatternDuration(3).getText()).toBe("Hasta 1");
                            expect(catalog_page.getPatternVolatility(3).getText()).toBe("104");
                            expect(catalog_page.getPatternStatus(3,'not_started').isDisplayed()).toBe(true);
                            expect(catalog_page.getPatternStatus(3,'started').isDisplayed()).toBe(false);
                            expect(catalog_page.getPatternStatus(3,'finished').isDisplayed()).toBe(false);
                        });

                        it("should filter catalog by asset name", function() {
                            expect(catalog_page.isCurrentPage()).toBe(true);
                            catalog_page.getNameFilter().click();
                            catalog_page.getNameFilter().sendKeys("7");
                            catalog_page.getStartDateLabel().click(); //click outside filter
                            ptor.sleep(4000);
                            //TODO sometimes it fails due to angular quirks
                            expect(catalog_page.getTotalAndFoundPatternsLabel().getText()).toBe("Número total de patrones: 50; Patrones encontrados: 14");
                            expect(catalog_page.getPairPatternName(0,0).getText()).toBe("Long name Asset 257 1");
                            expect(catalog_page.getPairPatternName(0,1).getText()).toBe("Long name Asset 257 2");
                            expect(catalog_page.getPairPatternName(1,0).getText()).toBe("Long name Asset 267 1");
                            expect(catalog_page.getPairPatternName(1,1).getText()).toBe("Long name Asset 267 2");
                            expect(catalog_page.getPairPatternName(2,0).getText()).toBe("Long name Asset 270 1");
                            expect(catalog_page.getPairPatternName(2,1).getText()).toBe("Long name Asset 270 2");
                        });

                        it("should filter catalog by sector", function() {
                            expect(catalog_page.isCurrentPage()).toBe(true);
                            catalog_page.getSectorFilter().sendKeys("sector");
                            ptor.sleep(1000);
                            expect(catalog_page.getSectorFilterDropdownOption(0).getText()).toBe("Sector3");
                            expect(catalog_page.getSectorFilterDropdownOption(1).getText()).toBe("Sector4");
                            catalog_page.getSectorFilterDropdownOption(0).click();
                            ptor.sleep(3000);
                            expect(catalog_page.getTotalAndFoundPatternsLabel().getText()).toBe("Número total de patrones: 50; Patrones encontrados: 25");
                            expect(catalog_page.getPairPatternName(0,0).getText()).toBe("Long name Asset 251 1");
                            expect(catalog_page.getPairPatternName(0,1).getText()).toBe("Long name Asset 251 2");
                            expect(catalog_page.getPairPatternSectorIndustry(0,0).getText()).toBe("Sector3 / Industry3_1");
                            expect(catalog_page.getPairPatternSectorIndustry(0,1).getText()).toBe("Sector3 / Industry3_1");
                            expect(catalog_page.getPairPatternName(1,0).getText()).toBe("Long name Asset 253 1");
                            expect(catalog_page.getPairPatternName(1,1).getText()).toBe("Long name Asset 253 2");
                            expect(catalog_page.getPairPatternSectorIndustry(1,0).getText()).toBe("Sector3 / Industry3_2");
                            expect(catalog_page.getPairPatternSectorIndustry(1,1).getText()).toBe("Sector3 / Industry3_2");
                            expect(catalog_page.getPairPatternName(2,0).getText()).toBe("Long name Asset 255 1");
                            expect(catalog_page.getPairPatternName(2,1).getText()).toBe("Long name Asset 255 2");
                            expect(catalog_page.getPairPatternSectorIndustry(2,0).getText()).toBe("Sector3 / Industry3_1");
                            expect(catalog_page.getPairPatternSectorIndustry(2,1).getText()).toBe("Sector3 / Industry3_1");
                        });

                        it("should filter catalog by sector and industry", function() {
                            expect(catalog_page.isCurrentPage()).toBe(true);
                            catalog_page.getSectorFilter().sendKeys("sector");
                            ptor.sleep(1000);
                            expect(catalog_page.getSectorFilterDropdownOption(0).getText()).toBe("Sector3");
                            expect(catalog_page.getSectorFilterDropdownOption(1).getText()).toBe("Sector4");
                            catalog_page.getSectorFilterDropdownOption(1).click();
                            ptor.sleep(3000);
                            catalog_page.getIndustryFilter().sendKeys("industry");
                            expect(catalog_page.getIndustryFilterDropdownOption(0).getText()).toBe("Industry4_1");
                            expect(catalog_page.getIndustryFilterDropdownOption(1).getText()).toBe("Industry4_2");
                            catalog_page.getIndustryFilterDropdownOption(1).click();
                            ptor.sleep(3000);
                            expect(catalog_page.getTotalAndFoundPatternsLabel().getText()).toBe("Número total de patrones: 50; Patrones encontrados: 12");
                            expect(catalog_page.getPairPatternName(0,0).getText()).toBe("Long name Asset 254 1");
                            expect(catalog_page.getPairPatternName(0,1).getText()).toBe("Long name Asset 254 2");
                            expect(catalog_page.getPairPatternSectorIndustry(0,0).getText()).toBe("Sector4 / Industry4_2");
                            expect(catalog_page.getPairPatternSectorIndustry(0,1).getText()).toBe("Sector4 / Industry4_2");
                            expect(catalog_page.getPairPatternName(1,0).getText()).toBe("Long name Asset 258 1");
                            expect(catalog_page.getPairPatternName(1,1).getText()).toBe("Long name Asset 258 2");
                            expect(catalog_page.getPairPatternSectorIndustry(1,0).getText()).toBe("Sector4 / Industry4_2");
                            expect(catalog_page.getPairPatternSectorIndustry(1,1).getText()).toBe("Sector4 / Industry4_2");
                            expect(catalog_page.getPairPatternName(2,0).getText()).toBe("Long name Asset 262 1");
                            expect(catalog_page.getPairPatternName(2,1).getText()).toBe("Long name Asset 262 2");
                            expect(catalog_page.getPairPatternSectorIndustry(2,0).getText()).toBe("Sector4 / Industry4_2");
                            expect(catalog_page.getPairPatternSectorIndustry(2,1).getText()).toBe("Sector4 / Industry4_2");
                        });

                        it("should filter catalog by duration", function() {
                            expect(catalog_page.isCurrentPage()).toBe(true);
                            catalog_page.selectDurationFilter(1); //Hasta 1 mes
                            ptor.sleep(2000);
                            expect(catalog_page.getTotalAndFoundPatternsLabel().getText()).toBe("Número total de patrones: 50; Patrones encontrados: 17");
                            expect(catalog_page.getPairPatternName(0,0).getText()).toBe("Long name Asset 251 1");
                            expect(catalog_page.getPairPatternName(0,1).getText()).toBe("Long name Asset 251 2");
                            expect(catalog_page.getPatternDuration(0).getText()).toBe("Hasta 1");
                            expect(catalog_page.getPairPatternName(1,0).getText()).toBe("Long name Asset 254 1");
                            expect(catalog_page.getPairPatternName(1,1).getText()).toBe("Long name Asset 254 2");
                            expect(catalog_page.getPatternDuration(1).getText()).toBe("Hasta 1");
                            expect(catalog_page.getPairPatternName(2,0).getText()).toBe("Long name Asset 257 1");
                            expect(catalog_page.getPairPatternName(2,1).getText()).toBe("Long name Asset 257 2");
                            expect(catalog_page.getPatternDuration(2).getText()).toBe("Hasta 1");
                            expect(catalog_page.getPairPatternName(3,0).getText()).toBe("Long name Asset 260 1");
                            expect(catalog_page.getPairPatternName(3,1).getText()).toBe("Long name Asset 260 2");
                            expect(catalog_page.getPatternDuration(3).getText()).toBe("Hasta 1");
                            catalog_page.selectDurationFilter(2); //de 1 a 3 meses
                            ptor.sleep(2000);
                            expect(catalog_page.getTotalAndFoundPatternsLabel().getText()).toBe("Número total de patrones: 50; Patrones encontrados: 17");
                            expect(catalog_page.getPairPatternName(0,0).getText()).toBe("Long name Asset 252 1");
                            expect(catalog_page.getPairPatternName(0,1).getText()).toBe("Long name Asset 252 2");
                            expect(catalog_page.getPatternDuration(0).getText()).toBe("De 1 a 3");
                            expect(catalog_page.getPairPatternName(1,0).getText()).toBe("Long name Asset 255 1");
                            expect(catalog_page.getPairPatternName(1,1).getText()).toBe("Long name Asset 255 2");
                            expect(catalog_page.getPatternDuration(1).getText()).toBe("De 1 a 3");
                            expect(catalog_page.getPairPatternName(2,0).getText()).toBe("Long name Asset 258 1");
                            expect(catalog_page.getPairPatternName(2,1).getText()).toBe("Long name Asset 258 2");
                            expect(catalog_page.getPatternDuration(2).getText()).toBe("De 1 a 3");
                            expect(catalog_page.getPairPatternName(3,0).getText()).toBe("Long name Asset 261 1");
                            expect(catalog_page.getPairPatternName(3,1).getText()).toBe("Long name Asset 261 2");
                            expect(catalog_page.getPatternDuration(3).getText()).toBe("De 1 a 3");
                            catalog_page.selectDurationFilter(3); //Más de 3 meses
                            ptor.sleep(2000);
                            expect(catalog_page.getTotalAndFoundPatternsLabel().getText()).toBe("Número total de patrones: 50; Patrones encontrados: 16");
                            expect(catalog_page.getPairPatternName(0,0).getText()).toBe("Long name Asset 253 1");
                            expect(catalog_page.getPairPatternName(0,1).getText()).toBe("Long name Asset 253 2");
                            expect(catalog_page.getPatternDuration(0).getText()).toBe("Más de 3");
                            expect(catalog_page.getPairPatternName(1,0).getText()).toBe("Long name Asset 256 1");
                            expect(catalog_page.getPairPatternName(1,1).getText()).toBe("Long name Asset 256 2");
                            expect(catalog_page.getPatternDuration(1).getText()).toBe("Más de 3");
                            expect(catalog_page.getPairPatternName(2,0).getText()).toBe("Long name Asset 259 1");
                            expect(catalog_page.getPairPatternName(2,1).getText()).toBe("Long name Asset 259 2");
                            expect(catalog_page.getPatternDuration(2).getText()).toBe("Más de 3");
                            expect(catalog_page.getPairPatternName(3,0).getText()).toBe("Long name Asset 262 1");
                            expect(catalog_page.getPairPatternName(3,1).getText()).toBe("Long name Asset 262 2");
                            expect(catalog_page.getPatternDuration(3).getText()).toBe("Más de 3");
                        });

                        it("should filter catalog by volatility", function() {
                            expect(catalog_page.isCurrentPage()).toBe(true);
                            catalog_page.selectVolatilityFilter(1); //Menos de 25%
                            ptor.sleep(2000);
                            expect(catalog_page.getTotalAndFoundPatternsLabel().getText()).toBe("Número total de patrones: 50; Patrones encontrados: 26");
                            expect(catalog_page.getPairPatternName(0,0).getText()).toBe("Long name Asset 251 1");
                            expect(catalog_page.getPairPatternName(0,1).getText()).toBe("Long name Asset 251 2");
                            expect(catalog_page.getPatternVolatility(0).getText()).toBe("19");
                            expect(catalog_page.getPairPatternName(1,0).getText()).toBe("Long name Asset 252 1");
                            expect(catalog_page.getPairPatternName(1,1).getText()).toBe("Long name Asset 252 2");
                            expect(catalog_page.getPatternVolatility(1).getText()).toBe("5");
                            expect(catalog_page.getPairPatternName(2,0).getText()).toBe("Long name Asset 255 1");
                            expect(catalog_page.getPairPatternName(2,1).getText()).toBe("Long name Asset 255 2");
                            expect(catalog_page.getPatternVolatility(2).getText()).toBe("19");
                            expect(catalog_page.getPairPatternName(3,0).getText()).toBe("Long name Asset 256 1");
                            expect(catalog_page.getPairPatternName(3,1).getText()).toBe("Long name Asset 256 2");
                            expect(catalog_page.getPatternVolatility(3).getText()).toBe("5");
                            catalog_page.selectVolatilityFilter(2); //Entre 25% y 50%
                            ptor.sleep(2000);
                            expect(catalog_page.getTotalAndFoundPatternsLabel().getText()).toBe("Número total de patrones: 50; Patrones encontrados: 0");
                            catalog_page.selectVolatilityFilter(3); //Entre 50% y 75%
                            ptor.sleep(2000);
                            expect(catalog_page.getTotalAndFoundPatternsLabel().getText()).toBe("Número total de patrones: 50; Patrones encontrados: 12");
                            expect(catalog_page.getPairPatternName(0,0).getText()).toBe("Long name Asset 253 1");
                            expect(catalog_page.getPairPatternName(0,1).getText()).toBe("Long name Asset 253 2");
                            expect(catalog_page.getPatternVolatility(0).getText()).toBe("57");
                            expect(catalog_page.getPairPatternName(1,0).getText()).toBe("Long name Asset 257 1");
                            expect(catalog_page.getPairPatternName(1,1).getText()).toBe("Long name Asset 257 2");
                            expect(catalog_page.getPatternVolatility(1).getText()).toBe("57");
                            expect(catalog_page.getPairPatternName(2,0).getText()).toBe("Long name Asset 261 1");
                            expect(catalog_page.getPairPatternName(2,1).getText()).toBe("Long name Asset 261 2");
                            expect(catalog_page.getPatternVolatility(2).getText()).toBe("57");
                            expect(catalog_page.getPairPatternName(3,0).getText()).toBe("Long name Asset 265 1");
                            expect(catalog_page.getPairPatternName(3,1).getText()).toBe("Long name Asset 265 2");
                            expect(catalog_page.getPatternVolatility(3).getText()).toBe("57");
                            catalog_page.selectVolatilityFilter(4); //Más de 75%
                            ptor.sleep(2000);
                            expect(catalog_page.getTotalAndFoundPatternsLabel().getText()).toBe("Número total de patrones: 50; Patrones encontrados: 12");
                            expect(catalog_page.getPairPatternName(0,0).getText()).toBe("Long name Asset 254 1");
                            expect(catalog_page.getPairPatternName(0,1).getText()).toBe("Long name Asset 254 2");
                            expect(catalog_page.getPatternVolatility(0).getText()).toBe("104");
                            expect(catalog_page.getPairPatternName(1,0).getText()).toBe("Long name Asset 258 1");
                            expect(catalog_page.getPairPatternName(1,1).getText()).toBe("Long name Asset 258 2");
                            expect(catalog_page.getPatternVolatility(1).getText()).toBe("104");
                            expect(catalog_page.getPairPatternName(2,0).getText()).toBe("Long name Asset 262 1");
                            expect(catalog_page.getPairPatternName(2,1).getText()).toBe("Long name Asset 262 2");
                            expect(catalog_page.getPatternVolatility(2).getText()).toBe("104");
                            expect(catalog_page.getPairPatternName(3,0).getText()).toBe("Long name Asset 266 1");
                            expect(catalog_page.getPairPatternName(3,1).getText()).toBe("Long name Asset 266 2");
                            expect(catalog_page.getPatternVolatility(3).getText()).toBe("104");
                        });

                        it("should filter catalog by all filters at the same time", function() {
                            expect(catalog_page.isCurrentPage()).toBe(true);
                            //filter by sector
                            catalog_page.getSectorFilter().sendKeys("sector");
                            ptor.sleep(1000);
                            expect(catalog_page.getSectorFilterDropdownOption(0).getText()).toBe("Sector3");
                            expect(catalog_page.getSectorFilterDropdownOption(1).getText()).toBe("Sector4");
                            catalog_page.getSectorFilterDropdownOption(0).click();
                            ptor.sleep(3000);
                            expect(catalog_page.getTotalAndFoundPatternsLabel().getText()).toBe("Número total de patrones: 50; Patrones encontrados: 25");
                            //filter by industry	
                            catalog_page.getIndustryFilter().sendKeys("industry");
                            expect(catalog_page.getIndustryFilterDropdownOption(0).getText()).toBe("Industry3_1");
                            expect(catalog_page.getIndustryFilterDropdownOption(1).getText()).toBe("Industry3_2");
                            catalog_page.getIndustryFilterDropdownOption(0).click();
                            ptor.sleep(3000);
                            expect(catalog_page.getTotalAndFoundPatternsLabel().getText()).toBe("Número total de patrones: 50; Patrones encontrados: 13");
                            //filter by name
                            catalog_page.getNameFilter().click();
                            ptor.sleep(1000);
                            catalog_page.getNameFilter().sendKeys("7");
                            ptor.sleep(4000);
                            catalog_page.getStartDateLabel().click(); //click outside filter
                            ptor.sleep(1000);
                            //TODO sometimes it fails
                            //filter by duration
                            catalog_page.selectDurationFilter(1); //Hasta 1 mes
                            ptor.sleep(3000);
                            //filter by volatility
                            catalog_page.selectVolatilityFilter(1); //Menos de 25%
                            ptor.sleep(3000);
                            expect(catalog_page.getTotalAndFoundPatternsLabel().getText()).toBe("Número total de patrones: 50; Patrones encontrados: 2");
                            expect(catalog_page.getPairPatternName(0,0).getText()).toBe("Long name Asset 275 1");
                            expect(catalog_page.getPairPatternName(0,1).getText()).toBe("Long name Asset 275 2");
                            expect(catalog_page.getPairPatternName(1,0).getText()).toBe("Long name Asset 287 1");
                            expect(catalog_page.getPairPatternName(1,1).getText()).toBe("Long name Asset 287 2");
                        });

                    }); //end go to Estados Unidos Pack

                }); //end pairs tab

                describe("indices tab", function() {
                    beforeEach(function() {
                        ptor.sleep(3000); //wait for tables to load
                        home.goToCurrentMonthTab('indices');
                        ptor.sleep(3000); //wait for indices tab to load
                    });
         
                    it("should have the correct month and year", function() {
                        expect(home.getCurrentMonthTableCurrentTabHeader().getText()).toBe("DICIEMBRE 2014");
                    });

                    it("should have the correct packs in Indices", function() {
                        expect(home.getCurrentMonthTableIndicesPackName(0).getText()).toBe("INDEX Pack I");
                        expect(home.getCurrentMonthTableIndicesPackName(1).getText()).toBe("INDEX Pack II");
                        expect(home.getCurrentMonthTableIndicesPackName(2).getText()).toBe("Zzz Additional December INDEX Pack I");
                        expect(home.getCurrentMonthTableIndicesPackNumPatterns(0).getText()).toBe("50");
                        expect(home.getCurrentMonthTableIndicesPackNumPatterns(1).getText()).toBe("50");
                        expect(home.getCurrentMonthTableIndicesPackNumPatterns(2).getText()).toBe("100");
                    });

                    it("should have the correct packs in Pair Indices", function() {
                        expect(home.getCurrentMonthTablePairIndicesPackName(0).getText()).toBe("INDEX Pair Pack I");
                        expect(home.getCurrentMonthTablePairIndicesPackName(1).getText()).toBe("Zzz Additional December INDEX Pair Pack I");
                        expect(home.getCurrentMonthTablePairIndicesPackNumPatterns(0).getText()).toBe("50");
                        expect(home.getCurrentMonthTablePairIndicesPackNumPatterns(1).getText()).toBe("100");
                    });

                    describe("go to INDEX Pack I catalog", function() {
                        beforeEach(function() {
                            ptor.sleep(2000);
                            home.getCurrentMonthTableIndicesPackName(0).click();
                            ptor.sleep(2000);
                        });

                        it("should be on catalog page and have the correct patterns", function() {
                            expect(catalog_page.isCurrentPage()).toBe(true);
                            expect(true).toBe(true);
                            expect(catalog_page.getStartDateLabel().getText()).toBe("Diciembre 2014");
                            expect(catalog_page.getPackNameLabel().getText()).toBe("INDEX Pack I");
                            expect(catalog_page.getCurrentDateLabel().getText()).toBe("Date: 01 Dic. (GMT)");
                            expect(catalog_page.getTotalAndFoundPatternsLabel().getText()).toBe("Número total de patrones: 50; Patrones encontrados: 50");
                            //first pattern
                            expect(catalog_page.getPatternName(0).getText()).toBe("Long name Asset 451");
                            expect(catalog_page.getIndexPatternIssuer(0).getText()).toBe("EX1");
                            expect(catalog_page.getIndexPatternWin(0).getText()).toBe("14");
                            expect(catalog_page.getIndexPatternLoss(0).getText()).toBe("1");
                            expect(catalog_page.getIndexPatternAccumulatedReturn(0).getText()).toBe("212");
                            expect(catalog_page.getIndexPatternAverageReturn(0).getText()).toBe("14.2");
                            expect(catalog_page.getIndexPatternDuration(0).getText()).toBe("Hasta 1");
                            expect(catalog_page.getIndexPatternVolatility(0).getText()).toBe("19");
                            expect(catalog_page.getIndexPatternStatus(0,'not_started').isDisplayed()).toBe(false);
                            expect(catalog_page.getIndexPatternStatus(0,'started').isDisplayed()).toBe(true);
                            expect(catalog_page.getIndexPatternStatus(0,'finished').isDisplayed()).toBe(false);
                            //second pattern
                            expect(catalog_page.getPatternName(1).getText()).toBe("Long name Asset 452");
                            expect(catalog_page.getIndexPatternIssuer(1).getText()).toBe("EX2");
                            expect(catalog_page.getIndexPatternWin(1).getText()).toBe("12");
                            expect(catalog_page.getIndexPatternLoss(1).getText()).toBe("3");
                            expect(catalog_page.getIndexPatternAccumulatedReturn(1).getText()).toBe("101");
                            expect(catalog_page.getIndexPatternAverageReturn(1).getText()).toBe("9.7");
                            expect(catalog_page.getIndexPatternDuration(1).getText()).toBe("De 1 a 3");
                            expect(catalog_page.getIndexPatternVolatility(1).getText()).toBe("5");
                            expect(catalog_page.getIndexPatternStatus(1,'not_started').isDisplayed()).toBe(true);
                            expect(catalog_page.getIndexPatternStatus(1,'started').isDisplayed()).toBe(false);
                            expect(catalog_page.getIndexPatternStatus(1,'finished').isDisplayed()).toBe(false);
                            //third pattern
                            expect(catalog_page.getPatternName(2).getText()).toBe("Long name Asset 453");
                            expect(catalog_page.getIndexPatternIssuer(2).getText()).toBe("EX3");
                            expect(catalog_page.getIndexPatternWin(2).getText()).toBe("10");
                            expect(catalog_page.getIndexPatternLoss(2).getText()).toBe("5");
                            expect(catalog_page.getIndexPatternAccumulatedReturn(2).getText()).toBe("500");
                            expect(catalog_page.getIndexPatternAverageReturn(2).getText()).toBe("27.5");
                            expect(catalog_page.getIndexPatternDuration(2).getText()).toBe("Más de 3");
                            expect(catalog_page.getIndexPatternVolatility(2).getText()).toBe("57"); //truncated
                            expect(catalog_page.getIndexPatternStatus(2,'not_started').isDisplayed()).toBe(true);
                            expect(catalog_page.getIndexPatternStatus(2,'started').isDisplayed()).toBe(false);
                            expect(catalog_page.getIndexPatternStatus(2,'finished').isDisplayed()).toBe(false);
                            //fourth pattern
                            expect(catalog_page.getPatternName(3).getText()).toBe("Long name Asset 454");
                            expect(catalog_page.getIndexPatternIssuer(3).getText()).toBe("EX1");
                            expect(catalog_page.getIndexPatternWin(3).getText()).toBe("14");
                            expect(catalog_page.getIndexPatternLoss(3).getText()).toBe("1");
                            expect(catalog_page.getIndexPatternAccumulatedReturn(3).getText()).toBe("212");
                            expect(catalog_page.getIndexPatternAverageReturn(3).getText()).toBe("14.2");
                            expect(catalog_page.getIndexPatternDuration(3).getText()).toBe("Hasta 1");
                            expect(catalog_page.getIndexPatternVolatility(3).getText()).toBe("104");
                            expect(catalog_page.getIndexPatternStatus(3,'not_started').isDisplayed()).toBe(true);
                            expect(catalog_page.getIndexPatternStatus(3,'started').isDisplayed()).toBe(false);
                            expect(catalog_page.getIndexPatternStatus(3,'finished').isDisplayed()).toBe(false);
                        });

                        it("should filter catalog by asset name", function() {
                            expect(catalog_page.isCurrentPage()).toBe(true);
                            catalog_page.getNameFilter().sendKeys("7");
                            ptor.sleep(3000);
                            expect(catalog_page.getTotalAndFoundPatternsLabel().getText()).toBe("Número total de patrones: 50; Patrones encontrados: 14");
                            expect(catalog_page.getPatternName(0).getText()).toBe("Long name Asset 457");
                            expect(catalog_page.getPatternName(1).getText()).toBe("Long name Asset 467");
                            expect(catalog_page.getPatternName(2).getText()).toBe("Long name Asset 470");
                            expect(catalog_page.getPatternName(3).getText()).toBe("Long name Asset 471");
                            expect(catalog_page.getPatternName(4).getText()).toBe("Long name Asset 472");
                            expect(catalog_page.getPatternName(5).getText()).toBe("Long name Asset 473");
                        });

                        it("should filter catalog by duration", function() {
                            expect(catalog_page.isCurrentPage()).toBe(true);
                            catalog_page.selectDurationFilter(1); //Hasta 1 mes
                            ptor.sleep(2000);
                            expect(catalog_page.getTotalAndFoundPatternsLabel().getText()).toBe("Número total de patrones: 50; Patrones encontrados: 17");
                            expect(catalog_page.getPatternName(0).getText()).toBe("Long name Asset 451");
                            expect(catalog_page.getIndexPatternDuration(0).getText()).toBe("Hasta 1");
                            expect(catalog_page.getPatternName(1).getText()).toBe("Long name Asset 454");
                            expect(catalog_page.getIndexPatternDuration(1).getText()).toBe("Hasta 1");
                            expect(catalog_page.getPatternName(2).getText()).toBe("Long name Asset 457");
                            expect(catalog_page.getIndexPatternDuration(2).getText()).toBe("Hasta 1");
                            expect(catalog_page.getPatternName(3).getText()).toBe("Long name Asset 460");
                            expect(catalog_page.getIndexPatternDuration(3).getText()).toBe("Hasta 1");
                            catalog_page.selectDurationFilter(2); //de 1 a 3 meses
                            ptor.sleep(2000);
                            expect(catalog_page.getTotalAndFoundPatternsLabel().getText()).toBe("Número total de patrones: 50; Patrones encontrados: 17");
                            expect(catalog_page.getPatternName(0).getText()).toBe("Long name Asset 452");
                            expect(catalog_page.getIndexPatternDuration(0).getText()).toBe("De 1 a 3");
                            expect(catalog_page.getPatternName(1).getText()).toBe("Long name Asset 455");
                            expect(catalog_page.getIndexPatternDuration(1).getText()).toBe("De 1 a 3");
                            expect(catalog_page.getPatternName(2).getText()).toBe("Long name Asset 458");
                            expect(catalog_page.getIndexPatternDuration(2).getText()).toBe("De 1 a 3");
                            expect(catalog_page.getPatternName(3).getText()).toBe("Long name Asset 461");
                            expect(catalog_page.getIndexPatternDuration(3).getText()).toBe("De 1 a 3");
                            catalog_page.selectDurationFilter(3); //Más de 3 meses
                            ptor.sleep(2000);
                            expect(catalog_page.getTotalAndFoundPatternsLabel().getText()).toBe("Número total de patrones: 50; Patrones encontrados: 16");
                            expect(catalog_page.getPatternName(0).getText()).toBe("Long name Asset 453");
                            expect(catalog_page.getIndexPatternDuration(0).getText()).toBe("Más de 3");
                            expect(catalog_page.getPatternName(1).getText()).toBe("Long name Asset 456");
                            expect(catalog_page.getIndexPatternDuration(1).getText()).toBe("Más de 3");
                            expect(catalog_page.getPatternName(2).getText()).toBe("Long name Asset 459");
                            expect(catalog_page.getIndexPatternDuration(2).getText()).toBe("Más de 3");
                            expect(catalog_page.getPatternName(3).getText()).toBe("Long name Asset 462");
                            expect(catalog_page.getIndexPatternDuration(3).getText()).toBe("Más de 3");
                        });

                        it("should filter catalog by volatility", function() {
                            expect(catalog_page.isCurrentPage()).toBe(true);
                            catalog_page.selectVolatilityFilter(1); //Menos de 25%
                            ptor.sleep(2000);
                            expect(catalog_page.getTotalAndFoundPatternsLabel().getText()).toBe("Número total de patrones: 50; Patrones encontrados: 26");
                            expect(catalog_page.getPatternName(0).getText()).toBe("Long name Asset 451");
                            expect(catalog_page.getIndexPatternVolatility(0).getText()).toBe("19");
                            expect(catalog_page.getPatternName(1).getText()).toBe("Long name Asset 452");
                            expect(catalog_page.getIndexPatternVolatility(1).getText()).toBe("5");
                            expect(catalog_page.getPatternName(2).getText()).toBe("Long name Asset 455");
                            expect(catalog_page.getIndexPatternVolatility(2).getText()).toBe("19");
                            expect(catalog_page.getPatternName(3).getText()).toBe("Long name Asset 456");
                            expect(catalog_page.getIndexPatternVolatility(3).getText()).toBe("5");
                            catalog_page.selectVolatilityFilter(2); //Entre 25% y 50%
                            ptor.sleep(2000);
                            expect(catalog_page.getTotalAndFoundPatternsLabel().getText()).toBe("Número total de patrones: 50; Patrones encontrados: 0");
                            catalog_page.selectVolatilityFilter(3); //Entre 50% y 75%
                            ptor.sleep(2000);
                            expect(catalog_page.getTotalAndFoundPatternsLabel().getText()).toBe("Número total de patrones: 50; Patrones encontrados: 12");
                            expect(catalog_page.getPatternName(0).getText()).toBe("Long name Asset 453");
                            expect(catalog_page.getIndexPatternVolatility(0).getText()).toBe("57");
                            expect(catalog_page.getPatternName(1).getText()).toBe("Long name Asset 457");
                            expect(catalog_page.getIndexPatternVolatility(1).getText()).toBe("57");
                            expect(catalog_page.getPatternName(2).getText()).toBe("Long name Asset 461");
                            expect(catalog_page.getIndexPatternVolatility(2).getText()).toBe("57");
                            expect(catalog_page.getPatternName(3).getText()).toBe("Long name Asset 465");
                            expect(catalog_page.getIndexPatternVolatility(3).getText()).toBe("57");
                            catalog_page.selectVolatilityFilter(4); //Más de 75%
                            ptor.sleep(2000);
                            expect(catalog_page.getTotalAndFoundPatternsLabel().getText()).toBe("Número total de patrones: 50; Patrones encontrados: 12");
                            expect(catalog_page.getPatternName(0).getText()).toBe("Long name Asset 454");
                            expect(catalog_page.getIndexPatternVolatility(0).getText()).toBe("104");
                            expect(catalog_page.getPatternName(1).getText()).toBe("Long name Asset 458");
                            expect(catalog_page.getIndexPatternVolatility(1).getText()).toBe("104");
                            expect(catalog_page.getPatternName(2).getText()).toBe("Long name Asset 462");
                            expect(catalog_page.getIndexPatternVolatility(2).getText()).toBe("104");
                            expect(catalog_page.getPatternName(3).getText()).toBe("Long name Asset 466");
                            expect(catalog_page.getIndexPatternVolatility(3).getText()).toBe("104");
                        });

                        it("should filter catalog by all filters at the same time", function() {
                            expect(catalog_page.isCurrentPage()).toBe(true);
                            catalog_page.getNameFilter().sendKeys("7");
                            ptor.sleep(2000);
                            catalog_page.selectDurationFilter(1); //Hasta 1 mes
                            ptor.sleep(2000);
                            catalog_page.selectVolatilityFilter(1); //Menos de 25%
                            ptor.sleep(2000);
                            expect(catalog_page.getTotalAndFoundPatternsLabel().getText()).toBe("Número total de patrones: 50; Patrones encontrados: 3");
                            expect(catalog_page.getPatternName(0).getText()).toBe("Long name Asset 472");
                            expect(catalog_page.getPatternName(1).getText()).toBe("Long name Asset 475");
                            expect(catalog_page.getPatternName(2).getText()).toBe("Long name Asset 487");
                        });

                    }); //end go to INDEX Pack I

                    describe("go to INDEX Pair Pack I catalog", function() {
                        beforeEach(function() {
                            ptor.sleep(2000);
                            home.getCurrentMonthTablePairIndicesPackName(0).click();
                            ptor.sleep(2000);
                        });

                        it("should be on catalog page and have the correct patterns", function() {
                            expect(catalog_page.isCurrentPage()).toBe(true);
                            expect(true).toBe(true);
                            expect(catalog_page.getStartDateLabel().getText()).toBe("Diciembre 2014");
                            expect(catalog_page.getPackNameLabel().getText()).toBe("INDEX Pair Pack I");
                            expect(catalog_page.getCurrentDateLabel().getText()).toBe("Date: 01 Dic. (GMT)");
                            expect(catalog_page.getTotalAndFoundPatternsLabel().getText()).toBe("Número total de patrones: 50; Patrones encontrados: 50");
                            //first pattern
                            expect(catalog_page.getPairPatternName(0,0).getText()).toBe("Long name Asset 601 1");
                            expect(catalog_page.getPairPatternName(0,1).getText()).toBe("Long name Asset 601 2");
                            expect(catalog_page.getIndexPairPatternIssuer(0,0).getText()).toBe("EX1");
                            expect(catalog_page.getIndexPairPatternIssuer(0,1).getText()).toBe("EX1");
                            expect(catalog_page.getIndexPatternWin(0).getText()).toBe("14");
                            expect(catalog_page.getIndexPatternLoss(0).getText()).toBe("1");
                            expect(catalog_page.getIndexPatternAccumulatedReturn(0).getText()).toBe("212");
                            expect(catalog_page.getIndexPatternAverageReturn(0).getText()).toBe("14.2");
                            expect(catalog_page.getIndexPatternDuration(0).getText()).toBe("Hasta 1");
                            expect(catalog_page.getIndexPatternVolatility(0).getText()).toBe("19");
                            expect(catalog_page.getIndexPatternStatus(0,'not_started').isDisplayed()).toBe(false);
                            expect(catalog_page.getIndexPatternStatus(0,'started').isDisplayed()).toBe(true);
                            expect(catalog_page.getIndexPatternStatus(0,'finished').isDisplayed()).toBe(false);
                            //second pattern
                            expect(catalog_page.getPairPatternName(1,0).getText()).toBe("Long name Asset 602 1");
                            expect(catalog_page.getPairPatternName(1,1).getText()).toBe("Long name Asset 602 2");
                            expect(catalog_page.getIndexPairPatternIssuer(1,0).getText()).toBe("EX2");
                            expect(catalog_page.getIndexPairPatternIssuer(1,1).getText()).toBe("EX2");
                            expect(catalog_page.getIndexPatternWin(1).getText()).toBe("12");
                            expect(catalog_page.getIndexPatternLoss(1).getText()).toBe("3");
                            expect(catalog_page.getIndexPatternAccumulatedReturn(1).getText()).toBe("101");
                            expect(catalog_page.getIndexPatternAverageReturn(1).getText()).toBe("9.7");
                            expect(catalog_page.getIndexPatternDuration(1).getText()).toBe("De 1 a 3");
                            expect(catalog_page.getIndexPatternVolatility(1).getText()).toBe("5");
                            expect(catalog_page.getIndexPatternStatus(1,'not_started').isDisplayed()).toBe(true);
                            expect(catalog_page.getIndexPatternStatus(1,'started').isDisplayed()).toBe(false);
                            expect(catalog_page.getIndexPatternStatus(1,'finished').isDisplayed()).toBe(false);
                            //third pattern
                            expect(catalog_page.getPairPatternName(2,0).getText()).toBe("Long name Asset 603 1");
                            expect(catalog_page.getPairPatternName(2,1).getText()).toBe("Long name Asset 603 2");
                            expect(catalog_page.getIndexPairPatternIssuer(2,0).getText()).toBe("EX3");
                            expect(catalog_page.getIndexPairPatternIssuer(2,1).getText()).toBe("EX3");
                            expect(catalog_page.getIndexPatternWin(2).getText()).toBe("10");
                            expect(catalog_page.getIndexPatternLoss(2).getText()).toBe("5");
                            expect(catalog_page.getIndexPatternAccumulatedReturn(2).getText()).toBe("500");
                            expect(catalog_page.getIndexPatternAverageReturn(2).getText()).toBe("27.5");
                            expect(catalog_page.getIndexPatternDuration(2).getText()).toBe("Más de 3");
                            expect(catalog_page.getIndexPatternVolatility(2).getText()).toBe("57"); //truncated
                            expect(catalog_page.getIndexPatternStatus(2,'not_started').isDisplayed()).toBe(true);
                            expect(catalog_page.getIndexPatternStatus(2,'started').isDisplayed()).toBe(false);
                            expect(catalog_page.getIndexPatternStatus(2,'finished').isDisplayed()).toBe(false);
                            //fourth pattern
                            expect(catalog_page.getPairPatternName(3,0).getText()).toBe("Long name Asset 604 1");
                            expect(catalog_page.getPairPatternName(3,1).getText()).toBe("Long name Asset 604 2");
                            expect(catalog_page.getIndexPairPatternIssuer(3,0).getText()).toBe("EX1");
                            expect(catalog_page.getIndexPairPatternIssuer(3,1).getText()).toBe("EX1");
                            expect(catalog_page.getIndexPatternWin(3).getText()).toBe("14");
                            expect(catalog_page.getIndexPatternLoss(3).getText()).toBe("1");
                            expect(catalog_page.getIndexPatternAccumulatedReturn(3).getText()).toBe("212");
                            expect(catalog_page.getIndexPatternAverageReturn(3).getText()).toBe("14.2");
                            expect(catalog_page.getIndexPatternDuration(3).getText()).toBe("Hasta 1");
                            expect(catalog_page.getIndexPatternVolatility(3).getText()).toBe("104");
                            expect(catalog_page.getIndexPatternStatus(3,'not_started').isDisplayed()).toBe(true);
                            expect(catalog_page.getIndexPatternStatus(3,'started').isDisplayed()).toBe(false);
                            expect(catalog_page.getIndexPatternStatus(3,'finished').isDisplayed()).toBe(false);
                        });

                        it("should filter catalog by asset name", function() {
                            expect(catalog_page.isCurrentPage()).toBe(true);
                            catalog_page.getNameFilter().sendKeys("7");
                            ptor.sleep(3000);
                            expect(catalog_page.getTotalAndFoundPatternsLabel().getText()).toBe("Número total de patrones: 50; Patrones encontrados: 5");
                            expect(catalog_page.getPairPatternName(0,0).getText()).toBe("Long name Asset 607 1");
                            expect(catalog_page.getPairPatternName(0,1).getText()).toBe("Long name Asset 607 2");
                            expect(catalog_page.getPairPatternName(1,0).getText()).toBe("Long name Asset 617 1");
                            expect(catalog_page.getPairPatternName(1,1).getText()).toBe("Long name Asset 617 2");
                            expect(catalog_page.getPairPatternName(2,0).getText()).toBe("Long name Asset 627 1");
                            expect(catalog_page.getPairPatternName(2,1).getText()).toBe("Long name Asset 627 2");
                            expect(catalog_page.getPairPatternName(3,0).getText()).toBe("Long name Asset 637 1");
                            expect(catalog_page.getPairPatternName(3,1).getText()).toBe("Long name Asset 637 2");
                            expect(catalog_page.getPairPatternName(4,0).getText()).toBe("Long name Asset 647 1");
                            expect(catalog_page.getPairPatternName(4,1).getText()).toBe("Long name Asset 647 2");
                        });

                        it("should filter catalog by duration", function() {
                            expect(catalog_page.isCurrentPage()).toBe(true);
                            catalog_page.selectDurationFilter(1); //Hasta 1 mes
                            ptor.sleep(2000);
                            expect(catalog_page.getTotalAndFoundPatternsLabel().getText()).toBe("Número total de patrones: 50; Patrones encontrados: 17");
                            expect(catalog_page.getPairPatternName(0,0).getText()).toBe("Long name Asset 601 1");
                            expect(catalog_page.getPairPatternName(0,1).getText()).toBe("Long name Asset 601 2");
                            expect(catalog_page.getIndexPatternDuration(0).getText()).toBe("Hasta 1");
                            expect(catalog_page.getPairPatternName(1,0).getText()).toBe("Long name Asset 604 1");
                            expect(catalog_page.getPairPatternName(1,1).getText()).toBe("Long name Asset 604 2");
                            expect(catalog_page.getIndexPatternDuration(1).getText()).toBe("Hasta 1");
                            expect(catalog_page.getPairPatternName(2,0).getText()).toBe("Long name Asset 607 1");
                            expect(catalog_page.getPairPatternName(2,1).getText()).toBe("Long name Asset 607 2");
                            expect(catalog_page.getIndexPatternDuration(2).getText()).toBe("Hasta 1");
                            expect(catalog_page.getPairPatternName(3,0).getText()).toBe("Long name Asset 610 1");
                            expect(catalog_page.getPairPatternName(3,1).getText()).toBe("Long name Asset 610 2");
                            expect(catalog_page.getIndexPatternDuration(3).getText()).toBe("Hasta 1");
                            catalog_page.selectDurationFilter(2); //de 1 a 3 meses
                            ptor.sleep(2000);
                            expect(catalog_page.getTotalAndFoundPatternsLabel().getText()).toBe("Número total de patrones: 50; Patrones encontrados: 17");
                            expect(catalog_page.getPairPatternName(0,0).getText()).toBe("Long name Asset 602 1");
                            expect(catalog_page.getPairPatternName(0,1).getText()).toBe("Long name Asset 602 2");
                            expect(catalog_page.getIndexPatternDuration(0).getText()).toBe("De 1 a 3");
                            expect(catalog_page.getPairPatternName(1,0).getText()).toBe("Long name Asset 605 1");
                            expect(catalog_page.getPairPatternName(1,1).getText()).toBe("Long name Asset 605 2");
                            expect(catalog_page.getIndexPatternDuration(1).getText()).toBe("De 1 a 3");
                            expect(catalog_page.getPairPatternName(2,0).getText()).toBe("Long name Asset 608 1");
                            expect(catalog_page.getPairPatternName(2,1).getText()).toBe("Long name Asset 608 2");
                            expect(catalog_page.getIndexPatternDuration(2).getText()).toBe("De 1 a 3");
                            expect(catalog_page.getPairPatternName(3,0).getText()).toBe("Long name Asset 611 1");
                            expect(catalog_page.getPairPatternName(3,1).getText()).toBe("Long name Asset 611 2");
                            expect(catalog_page.getIndexPatternDuration(3).getText()).toBe("De 1 a 3");
                            catalog_page.selectDurationFilter(3); //Más de 3 meses
                            ptor.sleep(2000);
                            expect(catalog_page.getTotalAndFoundPatternsLabel().getText()).toBe("Número total de patrones: 50; Patrones encontrados: 16");
                            expect(catalog_page.getPairPatternName(0,0).getText()).toBe("Long name Asset 603 1");
                            expect(catalog_page.getPairPatternName(0,1).getText()).toBe("Long name Asset 603 2");
                            expect(catalog_page.getIndexPatternDuration(0).getText()).toBe("Más de 3");
                            expect(catalog_page.getPairPatternName(1,0).getText()).toBe("Long name Asset 606 1");
                            expect(catalog_page.getPairPatternName(1,1).getText()).toBe("Long name Asset 606 2");
                            expect(catalog_page.getIndexPatternDuration(1).getText()).toBe("Más de 3");
                            expect(catalog_page.getPairPatternName(2,0).getText()).toBe("Long name Asset 609 1");
                            expect(catalog_page.getPairPatternName(2,1).getText()).toBe("Long name Asset 609 2");
                            expect(catalog_page.getIndexPatternDuration(2).getText()).toBe("Más de 3");
                            expect(catalog_page.getPairPatternName(3,0).getText()).toBe("Long name Asset 612 1");
                            expect(catalog_page.getPairPatternName(3,1).getText()).toBe("Long name Asset 612 2");
                            expect(catalog_page.getIndexPatternDuration(3).getText()).toBe("Más de 3");
                        });

                        it("should filter catalog by volatility", function() {
                            expect(catalog_page.isCurrentPage()).toBe(true);
                            catalog_page.selectVolatilityFilter(1); //Menos de 25%
                            ptor.sleep(2000);
                            expect(catalog_page.getTotalAndFoundPatternsLabel().getText()).toBe("Número total de patrones: 50; Patrones encontrados: 26");
                            expect(catalog_page.getPairPatternName(0,0).getText()).toBe("Long name Asset 601 1");
                            expect(catalog_page.getPairPatternName(0,1).getText()).toBe("Long name Asset 601 2");
                            expect(catalog_page.getIndexPatternVolatility(0).getText()).toBe("19");
                            expect(catalog_page.getPairPatternName(1,0).getText()).toBe("Long name Asset 602 1");
                            expect(catalog_page.getPairPatternName(1,1).getText()).toBe("Long name Asset 602 2");
                            expect(catalog_page.getIndexPatternVolatility(1).getText()).toBe("5");
                            expect(catalog_page.getPairPatternName(2,0).getText()).toBe("Long name Asset 605 1");
                            expect(catalog_page.getPairPatternName(2,1).getText()).toBe("Long name Asset 605 2");
                            expect(catalog_page.getIndexPatternVolatility(2).getText()).toBe("19");
                            expect(catalog_page.getPairPatternName(3,0).getText()).toBe("Long name Asset 606 1");
                            expect(catalog_page.getPairPatternName(3,1).getText()).toBe("Long name Asset 606 2");
                            expect(catalog_page.getIndexPatternVolatility(3).getText()).toBe("5");
                            catalog_page.selectVolatilityFilter(2); //Entre 25% y 50%
                            ptor.sleep(2000);
                            expect(catalog_page.getTotalAndFoundPatternsLabel().getText()).toBe("Número total de patrones: 50; Patrones encontrados: 0");
                            catalog_page.selectVolatilityFilter(3); //Entre 50% y 75%
                            ptor.sleep(2000);
                            expect(catalog_page.getTotalAndFoundPatternsLabel().getText()).toBe("Número total de patrones: 50; Patrones encontrados: 12");
                            expect(catalog_page.getPairPatternName(0,0).getText()).toBe("Long name Asset 603 1");
                            expect(catalog_page.getPairPatternName(0,1).getText()).toBe("Long name Asset 603 2");
                            expect(catalog_page.getIndexPatternVolatility(0).getText()).toBe("57");
                            expect(catalog_page.getPairPatternName(1,0).getText()).toBe("Long name Asset 607 1");
                            expect(catalog_page.getPairPatternName(1,1).getText()).toBe("Long name Asset 607 2");
                            expect(catalog_page.getIndexPatternVolatility(1).getText()).toBe("57");
                            expect(catalog_page.getPairPatternName(2,0).getText()).toBe("Long name Asset 611 1");
                            expect(catalog_page.getPairPatternName(2,1).getText()).toBe("Long name Asset 611 2");
                            expect(catalog_page.getIndexPatternVolatility(2).getText()).toBe("57");
                            expect(catalog_page.getPairPatternName(3,0).getText()).toBe("Long name Asset 615 1");
                            expect(catalog_page.getPairPatternName(3,1).getText()).toBe("Long name Asset 615 2");
                            expect(catalog_page.getIndexPatternVolatility(3).getText()).toBe("57");
                            catalog_page.selectVolatilityFilter(4); //Más de 75%
                            ptor.sleep(2000);
                            expect(catalog_page.getTotalAndFoundPatternsLabel().getText()).toBe("Número total de patrones: 50; Patrones encontrados: 12");
                            expect(catalog_page.getPairPatternName(0,0).getText()).toBe("Long name Asset 604 1");
                            expect(catalog_page.getPairPatternName(0,1).getText()).toBe("Long name Asset 604 2");
                            expect(catalog_page.getIndexPatternVolatility(0).getText()).toBe("104");
                            expect(catalog_page.getPairPatternName(1,0).getText()).toBe("Long name Asset 608 1");
                            expect(catalog_page.getPairPatternName(1,1).getText()).toBe("Long name Asset 608 2");
                            expect(catalog_page.getIndexPatternVolatility(1).getText()).toBe("104");
                            expect(catalog_page.getPairPatternName(2,0).getText()).toBe("Long name Asset 612 1");
                            expect(catalog_page.getPairPatternName(2,1).getText()).toBe("Long name Asset 612 2");
                            expect(catalog_page.getIndexPatternVolatility(2).getText()).toBe("104");
                            expect(catalog_page.getPairPatternName(3,0).getText()).toBe("Long name Asset 616 1");
                            expect(catalog_page.getPairPatternName(3,1).getText()).toBe("Long name Asset 616 2");
                            expect(catalog_page.getIndexPatternVolatility(3).getText()).toBe("104");
                        });

                        it("should filter catalog by all filters at the same time", function() {
                            expect(catalog_page.isCurrentPage()).toBe(true);
                            catalog_page.getNameFilter().sendKeys("3");
                            ptor.sleep(4000);
                            catalog_page.selectDurationFilter(1); //Hasta 1 mes
                            ptor.sleep(2000);
                            catalog_page.selectVolatilityFilter(1); //Menos de 25%
                            ptor.sleep(2000);
                            expect(catalog_page.getTotalAndFoundPatternsLabel().getText()).toBe("Número total de patrones: 50; Patrones encontrados: 3");
                            expect(catalog_page.getPairPatternName(0,0).getText()).toBe("Long name Asset 613 1");
                            expect(catalog_page.getPairPatternName(0,1).getText()).toBe("Long name Asset 613 2");
                            expect(catalog_page.getPairPatternName(1,0).getText()).toBe("Long name Asset 634 1");
                            expect(catalog_page.getPairPatternName(1,1).getText()).toBe("Long name Asset 634 2");
                            expect(catalog_page.getPairPatternName(2,0).getText()).toBe("Long name Asset 637 1");
                            expect(catalog_page.getPairPatternName(2,1).getText()).toBe("Long name Asset 637 2");
                        });

                    });//end INDEX pair Pack I

                }); //end indices tab

                describe("futures tab", function() {
                    beforeEach(function() {
                        ptor.sleep(3000); //wait for tables to load
                        home.goToCurrentMonthTab('futures');
                        ptor.sleep(3000); //wait for futures tab to load
                    });
         
                    it("should have the correct month and year", function() {
                        expect(home.getCurrentMonthTableCurrentTabHeader().getText()).toBe("DICIEMBRE 2014");
                    });

                    it("should have the correct packs in Futures", function() {
                        expect(home.getCurrentMonthTableFuturesPackName(0).getText()).toBe("Energía, Metales, Agrícolas, Carnes, Softs, Divisas, Tipos de Interés, Índices Bursátiles");
                        expect(home.getCurrentMonthTableFuturesPackName(1).getText()).toBe("Additional December subname");
                        expect(home.getCurrentMonthTableFuturesPackNumPatterns(0).getText()).toBe("50");
                        expect(home.getCurrentMonthTableFuturesPackNumPatterns(1).getText()).toBe("100");
                    });

                    describe("go to FUTURES Pack I catalog", function() {
                        beforeEach(function() {
                            ptor.sleep(2000);
                            home.getCurrentMonthTableFuturesPackName(0).click();
                            ptor.sleep(2000);
                        });

                        it("should be on catalog page and have the correct patterns", function() {
                            expect(catalog_page.isCurrentPage()).toBe(true);
                            expect(catalog_page.getStartDateLabel().getText()).toBe("Diciembre 2014");
                            expect(catalog_page.getPackNameLabel().getText()).toBe("FUTURES Pack I");
                            expect(catalog_page.getCurrentDateLabel().getText()).toBe("Date: 01 Dic. (GMT)");
                            expect(catalog_page.getTotalAndFoundPatternsLabel().getText()).toBe("Número total de patrones: 50; Patrones encontrados: 50");
                            //first pattern
                            expect(catalog_page.getPatternName(0).getText()).toBe("Long name Asset 751");
                            expect(catalog_page.getFuturePatternIssuer(0).getText()).toBe("EF1");
                            expect(catalog_page.getFuturePatternWin(0).getText()).toBe("14");
                            expect(catalog_page.getFuturePatternLoss(0).getText()).toBe("1");
                            expect(catalog_page.getFuturePatternAccumulatedReturn(0).getText()).toBe("212");
                            expect(catalog_page.getFuturePatternAverageReturn(0).getText()).toBe("14.2");
                            expect(catalog_page.getFuturePatternDuration(0).getText()).toBe("Hasta 1");
                            expect(catalog_page.getFuturePatternVolatility(0).getText()).toBe("19");
                            expect(catalog_page.getFuturePatternStatus(0,'not_started').isDisplayed()).toBe(false);
                            expect(catalog_page.getFuturePatternStatus(0,'started').isDisplayed()).toBe(true);
                            expect(catalog_page.getFuturePatternStatus(0,'finished').isDisplayed()).toBe(false);
                            //second pattern
                            expect(catalog_page.getPatternName(1).getText()).toBe("Long name Asset 752");
                            expect(catalog_page.getFuturePatternIssuer(1).getText()).toBe("EF2");
                            expect(catalog_page.getFuturePatternWin(1).getText()).toBe("12");
                            expect(catalog_page.getFuturePatternLoss(1).getText()).toBe("3");
                            expect(catalog_page.getFuturePatternAccumulatedReturn(1).getText()).toBe("101");
                            expect(catalog_page.getFuturePatternAverageReturn(1).getText()).toBe("9.7");
                            expect(catalog_page.getFuturePatternDuration(1).getText()).toBe("De 1 a 3");
                            expect(catalog_page.getFuturePatternVolatility(1).getText()).toBe("5");
                            expect(catalog_page.getFuturePatternStatus(1,'not_started').isDisplayed()).toBe(true);
                            expect(catalog_page.getFuturePatternStatus(1,'started').isDisplayed()).toBe(false);
                            expect(catalog_page.getFuturePatternStatus(1,'finished').isDisplayed()).toBe(false);
                            //third pattern
                            expect(catalog_page.getPatternName(2).getText()).toBe("Long name Asset 753");
                            expect(catalog_page.getFuturePatternIssuer(2).getText()).toBe("EF3");
                            expect(catalog_page.getFuturePatternWin(2).getText()).toBe("10");
                            expect(catalog_page.getFuturePatternLoss(2).getText()).toBe("5");
                            expect(catalog_page.getFuturePatternAccumulatedReturn(2).getText()).toBe("500");
                            expect(catalog_page.getFuturePatternAverageReturn(2).getText()).toBe("27.5");
                            expect(catalog_page.getFuturePatternDuration(2).getText()).toBe("Más de 3");
                            expect(catalog_page.getFuturePatternVolatility(2).getText()).toBe("57"); //truncated
                            expect(catalog_page.getFuturePatternStatus(2,'not_started').isDisplayed()).toBe(true);
                            expect(catalog_page.getFuturePatternStatus(2,'started').isDisplayed()).toBe(false);
                            expect(catalog_page.getFuturePatternStatus(2,'finished').isDisplayed()).toBe(false);
                            //fourth pattern
                            expect(catalog_page.getPatternName(3).getText()).toBe("Long name Asset 754");
                            expect(catalog_page.getFuturePatternIssuer(3).getText()).toBe("EF1");
                            expect(catalog_page.getFuturePatternWin(3).getText()).toBe("14");
                            expect(catalog_page.getFuturePatternLoss(3).getText()).toBe("1");
                            expect(catalog_page.getFuturePatternAccumulatedReturn(3).getText()).toBe("212");
                            expect(catalog_page.getFuturePatternAverageReturn(3).getText()).toBe("14.2");
                            expect(catalog_page.getFuturePatternDuration(3).getText()).toBe("Hasta 1");
                            expect(catalog_page.getFuturePatternVolatility(3).getText()).toBe("104");
                            expect(catalog_page.getFuturePatternStatus(3,'not_started').isDisplayed()).toBe(true);
                            expect(catalog_page.getFuturePatternStatus(3,'started').isDisplayed()).toBe(false);
                            expect(catalog_page.getFuturePatternStatus(3,'finished').isDisplayed()).toBe(false);
                        });

                        it("should filter catalog by asset name", function() {
                            expect(catalog_page.isCurrentPage()).toBe(true);
                            catalog_page.getNameFilter().sendKeys("8");
                            ptor.sleep(3000);
                            expect(catalog_page.getTotalAndFoundPatternsLabel().getText()).toBe("Número total de patrones: 50; Patrones encontrados: 15");
                            expect(catalog_page.getPatternName(0).getText()).toBe("Long name Asset 758");
                            expect(catalog_page.getPatternName(1).getText()).toBe("Long name Asset 768");
                            expect(catalog_page.getPatternName(2).getText()).toBe("Long name Asset 778");
                            expect(catalog_page.getPatternName(3).getText()).toBe("Long name Asset 780");
                            expect(catalog_page.getPatternName(4).getText()).toBe("Long name Asset 781");
                            expect(catalog_page.getPatternName(5).getText()).toBe("Long name Asset 782");
                        });

                        it("should filter catalog by group", function() {
                            expect(catalog_page.isCurrentPage()).toBe(true);
                            catalog_page.getIndustryFilter().sendKeys("FUT");
                            expect(catalog_page.getIndustryFilterDropdownOption(0).getText()).toBe("Exchangefut1");
                            expect(catalog_page.getIndustryFilterDropdownOption(1).getText()).toBe("Exchangefut2");
                            expect(catalog_page.getIndustryFilterDropdownOption(2).getText()).toBe("Exchangefut3");
                            catalog_page.getIndustryFilterDropdownOption(1).click();
                            ptor.sleep(3000);
                            expect(catalog_page.getTotalAndFoundPatternsLabel().getText()).toBe("Número total de patrones: 50; Patrones encontrados: 17");
                            expect(catalog_page.getPatternName(0).getText()).toBe("Long name Asset 752");
                            expect(catalog_page.getFuturePatternIssuer(0).getText()).toBe("EF2");
                            expect(catalog_page.getPatternName(1).getText()).toBe("Long name Asset 755");
                            expect(catalog_page.getFuturePatternIssuer(1).getText()).toBe("EF2");
                            expect(catalog_page.getPatternName(2).getText()).toBe("Long name Asset 758");
                            expect(catalog_page.getFuturePatternIssuer(2).getText()).toBe("EF2");
                            expect(catalog_page.getPatternName(3).getText()).toBe("Long name Asset 761");
                            expect(catalog_page.getFuturePatternIssuer(3).getText()).toBe("EF2");
                        });

                        it("should filter catalog by duration", function() {
                            expect(catalog_page.isCurrentPage()).toBe(true);
                            catalog_page.selectDurationFilter(1); //Hasta 1 mes
                            ptor.sleep(2000);
                            expect(catalog_page.getTotalAndFoundPatternsLabel().getText()).toBe("Número total de patrones: 50; Patrones encontrados: 17");
                            expect(catalog_page.getPatternName(0).getText()).toBe("Long name Asset 751");
                            expect(catalog_page.getIndexPatternDuration(0).getText()).toBe("Hasta 1");
                            expect(catalog_page.getPatternName(1).getText()).toBe("Long name Asset 754");
                            expect(catalog_page.getIndexPatternDuration(1).getText()).toBe("Hasta 1");
                            expect(catalog_page.getPatternName(2).getText()).toBe("Long name Asset 757");
                            expect(catalog_page.getIndexPatternDuration(2).getText()).toBe("Hasta 1");
                            expect(catalog_page.getPatternName(3).getText()).toBe("Long name Asset 760");
                            expect(catalog_page.getIndexPatternDuration(3).getText()).toBe("Hasta 1");
                            catalog_page.selectDurationFilter(2); //de 1 a 3 meses
                            ptor.sleep(2000);
                            expect(catalog_page.getTotalAndFoundPatternsLabel().getText()).toBe("Número total de patrones: 50; Patrones encontrados: 17");
                            expect(catalog_page.getPatternName(0).getText()).toBe("Long name Asset 752");
                            expect(catalog_page.getIndexPatternDuration(0).getText()).toBe("De 1 a 3");
                            expect(catalog_page.getPatternName(1).getText()).toBe("Long name Asset 755");
                            expect(catalog_page.getIndexPatternDuration(1).getText()).toBe("De 1 a 3");
                            expect(catalog_page.getPatternName(2).getText()).toBe("Long name Asset 758");
                            expect(catalog_page.getIndexPatternDuration(2).getText()).toBe("De 1 a 3");
                            expect(catalog_page.getPatternName(3).getText()).toBe("Long name Asset 761");
                            expect(catalog_page.getIndexPatternDuration(3).getText()).toBe("De 1 a 3");
                            catalog_page.selectDurationFilter(3); //Más de 3 meses
                            ptor.sleep(2000);
                            expect(catalog_page.getTotalAndFoundPatternsLabel().getText()).toBe("Número total de patrones: 50; Patrones encontrados: 16");
                            expect(catalog_page.getPatternName(0).getText()).toBe("Long name Asset 753");
                            expect(catalog_page.getIndexPatternDuration(0).getText()).toBe("Más de 3");
                            expect(catalog_page.getPatternName(1).getText()).toBe("Long name Asset 756");
                            expect(catalog_page.getIndexPatternDuration(1).getText()).toBe("Más de 3");
                            expect(catalog_page.getPatternName(2).getText()).toBe("Long name Asset 759");
                            expect(catalog_page.getIndexPatternDuration(2).getText()).toBe("Más de 3");
                            expect(catalog_page.getPatternName(3).getText()).toBe("Long name Asset 762");
                            expect(catalog_page.getIndexPatternDuration(3).getText()).toBe("Más de 3");
                        });

                        it("should filter catalog by volatility", function() {
                            expect(catalog_page.isCurrentPage()).toBe(true);
                            catalog_page.selectVolatilityFilter(1); //Menos de 25%
                            ptor.sleep(2000);
                            expect(catalog_page.getTotalAndFoundPatternsLabel().getText()).toBe("Número total de patrones: 50; Patrones encontrados: 26");
                            expect(catalog_page.getPatternName(0).getText()).toBe("Long name Asset 751");
                            expect(catalog_page.getIndexPatternVolatility(0).getText()).toBe("19");
                            expect(catalog_page.getPatternName(1).getText()).toBe("Long name Asset 752");
                            expect(catalog_page.getIndexPatternVolatility(1).getText()).toBe("5");
                            expect(catalog_page.getPatternName(2).getText()).toBe("Long name Asset 755");
                            expect(catalog_page.getIndexPatternVolatility(2).getText()).toBe("19");
                            expect(catalog_page.getPatternName(3).getText()).toBe("Long name Asset 756");
                            expect(catalog_page.getIndexPatternVolatility(3).getText()).toBe("5");
                            catalog_page.selectVolatilityFilter(2); //Entre 25% y 50%
                            ptor.sleep(2000);
                            expect(catalog_page.getTotalAndFoundPatternsLabel().getText()).toBe("Número total de patrones: 50; Patrones encontrados: 0");
                            catalog_page.selectVolatilityFilter(3); //Entre 50% y 75%
                            ptor.sleep(2000);
                            expect(catalog_page.getTotalAndFoundPatternsLabel().getText()).toBe("Número total de patrones: 50; Patrones encontrados: 12");
                            expect(catalog_page.getPatternName(0).getText()).toBe("Long name Asset 753");
                            expect(catalog_page.getIndexPatternVolatility(0).getText()).toBe("57");
                            expect(catalog_page.getPatternName(1).getText()).toBe("Long name Asset 757");
                            expect(catalog_page.getIndexPatternVolatility(1).getText()).toBe("57");
                            expect(catalog_page.getPatternName(2).getText()).toBe("Long name Asset 761");
                            expect(catalog_page.getIndexPatternVolatility(2).getText()).toBe("57");
                            expect(catalog_page.getPatternName(3).getText()).toBe("Long name Asset 765");
                            expect(catalog_page.getIndexPatternVolatility(3).getText()).toBe("57");
                            catalog_page.selectVolatilityFilter(4); //Más de 75%
                            ptor.sleep(2000);
                            expect(catalog_page.getTotalAndFoundPatternsLabel().getText()).toBe("Número total de patrones: 50; Patrones encontrados: 12");
                            expect(catalog_page.getPatternName(0).getText()).toBe("Long name Asset 754");
                            expect(catalog_page.getIndexPatternVolatility(0).getText()).toBe("104");
                            expect(catalog_page.getPatternName(1).getText()).toBe("Long name Asset 758");
                            expect(catalog_page.getIndexPatternVolatility(1).getText()).toBe("104");
                            expect(catalog_page.getPatternName(2).getText()).toBe("Long name Asset 762");
                            expect(catalog_page.getIndexPatternVolatility(2).getText()).toBe("104");
                            expect(catalog_page.getPatternName(3).getText()).toBe("Long name Asset 766");
                            expect(catalog_page.getIndexPatternVolatility(3).getText()).toBe("104");
                        });
                        
                        it("should filter catalog by all filters at the same time", function() {
                            expect(catalog_page.isCurrentPage()).toBe(true);
                            catalog_page.getIndustryFilter().sendKeys("FUT");
                            expect(catalog_page.getIndustryFilterDropdownOption(0).getText()).toBe("Exchangefut1");
                            expect(catalog_page.getIndustryFilterDropdownOption(1).getText()).toBe("Exchangefut2");
                            expect(catalog_page.getIndustryFilterDropdownOption(2).getText()).toBe("Exchangefut3");
                            catalog_page.getIndustryFilterDropdownOption(0).click();
                            ptor.sleep(3000);
                            catalog_page.getNameFilter().sendKeys("6");
                            ptor.sleep(2000);
                            catalog_page.selectDurationFilter(1); //Hasta 1 mes
                            ptor.sleep(2000);
                            catalog_page.selectVolatilityFilter(1); //Menos de 25%
                            ptor.sleep(2000);
                            expect(catalog_page.getTotalAndFoundPatternsLabel().getText()).toBe("Número total de patrones: 50; Patrones encontrados: 3");
                            expect(catalog_page.getPatternName(0).getText()).toBe("Long name Asset 760");
                            expect(catalog_page.getPatternName(1).getText()).toBe("Long name Asset 763");
                            expect(catalog_page.getPatternName(2).getText()).toBe("Long name Asset 796");
                        });
                    });

                }); //end futures tab

            }); //end current month packs

            describe("Next month packs", function() {
                it("table should not be present", function() {
                    ptor.sleep(3000);
                    expect(home.getNextMonthTableCurrentTabContent().isPresent()).toBe(false);
                });
            }); //end next month packs

        });

        it("delete database fixtures", function() {
            var fixtures = fixtureGenerator.remove_home_packs_fixture();
            loadFixture.executeQueries(fixtures, conString);
            ptor.sleep(6000);
            expect(true).toBe(true);
        });

        //Pending dates: November 15th, December 1st, December 15th

});
