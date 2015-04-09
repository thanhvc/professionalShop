/**
 * Created by David Verdú on 17/03/15.
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
dsc.setServerDate("2014-11-14 11:30:00");
ptor.sleep(9000);

describe('Home page', function () {
        var home;
        var page_layout;
        var catalog_page;
        var helper = new Helper();
        var conString = browser.params.sqlCon;

        beforeEach(function () {
            var fixtures = fixtureGenerator.home_packs_fixture();
            loadFixture.executeQueries(fixtures, conString);
            browser.ignoreSynchronization = true;
            ptor.sleep(3000); //wait for fixtures to load
        });

        afterEach(function () {
            //page_layout.logout(); 
            ptor.sleep(2000);
            var fixtures = fixtureGenerator.remove_home_packs_fixture();
            loadFixture.executeQueries(fixtures, conString);
        });
        
        describe("packs to subscribe in November 14th", function() {
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
                        expect(home.getCurrentMonthTableCurrentTabHeader().getText()).toBe("NOVIEMBRE 2014");
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
                    });

                    describe("go to Canadá Pack I catalog", function() {
                        beforeEach(function() {
                            ptor.sleep(2000);
                            home.getCurrentMonthTableAmericaPackName(0).click();
                            ptor.sleep(2000);
                        });

                        it("should be on catalog page and have the correct patterns", function() {
                            expect(catalog_page.isCurrentPage()).toBe(true);
                            expect(catalog_page.getStartDateLabel().getText()).toBe("Noviembre 2014");
                            expect(catalog_page.getPackNameLabel().getText()).toBe("Canadá Pack I");
                            expect(catalog_page.getCurrentDateLabel().getText()).toBe("Date: 14 Nov. (GMT)");
                            expect(catalog_page.getTotalAndFoundPatternsLabel().getText()).toBe("Número total de patrones: 50; Patrones encontrados: 50");
                            //first pattern
                            expect(catalog_page.getPatternName(0).getText()).toBe("Long name Asset 1");
                            expect(catalog_page.getPatternMarket(0).getText()).toBe("EC1");
                            expect(catalog_page.getPatternSectorIndustry(0).getText()).toBe("Sector1 / Industry1_1");
                            expect(catalog_page.getPatternWin(0).getText()).toBe("14");
                            expect(catalog_page.getPatternLoss(0).getText()).toBe("1");
                            expect(catalog_page.getPatternAccumulatedReturn(0).getText()).toBe("212");
                            expect(catalog_page.getPatternAverageReturn(0).getText()).toBe("14.2");
                            expect(catalog_page.getPatternDuration(0).getText()).toBe("Hasta 1");
                            expect(catalog_page.getPatternVolatility(0).getText()).toBe("19");
                            expect(catalog_page.getPatternStatus(0,'not_started').isDisplayed()).toBe(false);
                            expect(catalog_page.getPatternStatus(0,'started').isDisplayed()).toBe(false);
                            expect(catalog_page.getPatternStatus(0,'finished').isDisplayed()).toBe(true);
                            //second pattern
                            expect(catalog_page.getPatternName(1).getText()).toBe("Long name Asset 10");
                            expect(catalog_page.getPatternMarket(1).getText()).toBe("EC1");
                            expect(catalog_page.getPatternSectorIndustry(1).getText()).toBe("Sector2 / Industry2_1");
                            expect(catalog_page.getPatternWin(1).getText()).toBe("14");
                            expect(catalog_page.getPatternLoss(1).getText()).toBe("1");
                            expect(catalog_page.getPatternAccumulatedReturn(1).getText()).toBe("212");
                            expect(catalog_page.getPatternAverageReturn(1).getText()).toBe("14.2");
                            expect(catalog_page.getPatternDuration(1).getText()).toBe("Hasta 1");
                            expect(catalog_page.getPatternVolatility(1).getText()).toBe("5");
                            expect(catalog_page.getPatternStatus(1,'not_started').isDisplayed()).toBe(true);
                            expect(catalog_page.getPatternStatus(1,'started').isDisplayed()).toBe(false);
                            expect(catalog_page.getPatternStatus(1,'finished').isDisplayed()).toBe(false);
                            //third pattern
                            expect(catalog_page.getPatternName(2).getText()).toBe("Long name Asset 11");
                            expect(catalog_page.getPatternMarket(2).getText()).toBe("EC2");
                            expect(catalog_page.getPatternSectorIndustry(2).getText()).toBe("Sector1 / Industry1_2");
                            expect(catalog_page.getPatternWin(2).getText()).toBe("12");
                            expect(catalog_page.getPatternLoss(2).getText()).toBe("3");
                            expect(catalog_page.getPatternAccumulatedReturn(2).getText()).toBe("101");
                            expect(catalog_page.getPatternAverageReturn(2).getText()).toBe("9.7");
                            expect(catalog_page.getPatternDuration(2).getText()).toBe("De 1 a 3");
                            expect(catalog_page.getPatternVolatility(2).getText()).toBe("57"); //truncated
                            expect(catalog_page.getPatternStatus(2,'not_started').isDisplayed()).toBe(false);
                            expect(catalog_page.getPatternStatus(2,'started').isDisplayed()).toBe(false);
                            expect(catalog_page.getPatternStatus(2,'finished').isDisplayed()).toBe(true);
                            //fourth pattern
                            expect(catalog_page.getPatternName(3).getText()).toBe("Long name Asset 12");
                            expect(catalog_page.getPatternMarket(3).getText()).toBe("EC3");
                            expect(catalog_page.getPatternSectorIndustry(3).getText()).toBe("Sector2 / Industry2_2");
                            expect(catalog_page.getPatternWin(3).getText()).toBe("10");
                            expect(catalog_page.getPatternLoss(3).getText()).toBe("5");
                            expect(catalog_page.getPatternAccumulatedReturn(3).getText()).toBe("500");
                            expect(catalog_page.getPatternAverageReturn(3).getText()).toBe("27.5");
                            expect(catalog_page.getPatternDuration(3).getText()).toBe("Más de 3");
                            expect(catalog_page.getPatternVolatility(3).getText()).toBe("104");
                            expect(catalog_page.getPatternStatus(3,'not_started').isDisplayed()).toBe(false);
                            expect(catalog_page.getPatternStatus(3,'started').isDisplayed()).toBe(true);
                            expect(catalog_page.getPatternStatus(3,'finished').isDisplayed()).toBe(false);
                        });

                        it("should filter catalog by asset name", function() {
                            expect(catalog_page.isCurrentPage()).toBe(true);
                            catalog_page.getNameFilter().sendKeys("5");
                            ptor.sleep(3000);
                            expect(catalog_page.getTotalAndFoundPatternsLabel().getText()).toBe("Número total de patrones: 50; Patrones encontrados: 6");
                            expect(catalog_page.getPatternName(0).getText()).toBe("Long name Asset 15");
                            expect(catalog_page.getPatternName(1).getText()).toBe("Long name Asset 25");
                            expect(catalog_page.getPatternName(2).getText()).toBe("Long name Asset 35");
                            expect(catalog_page.getPatternName(3).getText()).toBe("Long name Asset 45");
                            expect(catalog_page.getPatternName(4).getText()).toBe("Long name Asset 5");
                            expect(catalog_page.getPatternName(5).getText()).toBe("Long name Asset 50");
                        });

                        it("should filter catalog by sector", function() {
                            expect(catalog_page.isCurrentPage()).toBe(true);
                            catalog_page.getSectorFilter().sendKeys("sector");
                            ptor.sleep(1000);
                            expect(catalog_page.getSectorFilterDropdownOption(0).getText()).toBe("Sector1");
                            expect(catalog_page.getSectorFilterDropdownOption(1).getText()).toBe("Sector2");
                            catalog_page.getSectorFilterDropdownOption(0).click();
                            ptor.sleep(3000);
                            expect(catalog_page.getTotalAndFoundPatternsLabel().getText()).toBe("Número total de patrones: 50; Patrones encontrados: 25");
                            expect(catalog_page.getPatternName(0).getText()).toBe("Long name Asset 1");
                            expect(catalog_page.getPatternSectorIndustry(0).getText()).toBe("Sector1 / Industry1_1");
                            expect(catalog_page.getPatternName(1).getText()).toBe("Long name Asset 11");
                            expect(catalog_page.getPatternSectorIndustry(1).getText()).toBe("Sector1 / Industry1_2");
                            expect(catalog_page.getPatternName(2).getText()).toBe("Long name Asset 13");
                            expect(catalog_page.getPatternSectorIndustry(2).getText()).toBe("Sector1 / Industry1_1");
                            expect(catalog_page.getPatternName(3).getText()).toBe("Long name Asset 15");
                            expect(catalog_page.getPatternSectorIndustry(3).getText()).toBe("Sector1 / Industry1_2");
                        });

                        it("should filter catalog by sector and industry", function() {
                            expect(catalog_page.isCurrentPage()).toBe(true);
                            catalog_page.getSectorFilter().sendKeys("sector");
                            ptor.sleep(1000);
                            expect(catalog_page.getSectorFilterDropdownOption(0).getText()).toBe("Sector1");
                            expect(catalog_page.getSectorFilterDropdownOption(1).getText()).toBe("Sector2");
                            catalog_page.getSectorFilterDropdownOption(1).click();
                            ptor.sleep(3000);
                            catalog_page.getIndustryFilter().sendKeys("industry");
                            expect(catalog_page.getIndustryFilterDropdownOption(0).getText()).toBe("Industry2_1");
                            expect(catalog_page.getIndustryFilterDropdownOption(1).getText()).toBe("Industry2_2");
                            catalog_page.getIndustryFilterDropdownOption(1).click();
                            ptor.sleep(3000);
                            expect(catalog_page.getTotalAndFoundPatternsLabel().getText()).toBe("Número total de patrones: 50; Patrones encontrados: 12");
                            expect(catalog_page.getPatternName(0).getText()).toBe("Long name Asset 12");
                            expect(catalog_page.getPatternSectorIndustry(0).getText()).toBe("Sector2 / Industry2_2");
                            expect(catalog_page.getPatternName(1).getText()).toBe("Long name Asset 16");
                            expect(catalog_page.getPatternSectorIndustry(1).getText()).toBe("Sector2 / Industry2_2");
                            expect(catalog_page.getPatternName(2).getText()).toBe("Long name Asset 20");
                            expect(catalog_page.getPatternSectorIndustry(2).getText()).toBe("Sector2 / Industry2_2");
                            expect(catalog_page.getPatternName(3).getText()).toBe("Long name Asset 24");
                            expect(catalog_page.getPatternSectorIndustry(3).getText()).toBe("Sector2 / Industry2_2");
                        });

                        it("should filter catalog by duration", function() {
                            expect(catalog_page.isCurrentPage()).toBe(true);
                            catalog_page.selectDurationFilter(1); //Hasta 1 mes
                            ptor.sleep(2000);
                            expect(catalog_page.getTotalAndFoundPatternsLabel().getText()).toBe("Número total de patrones: 50; Patrones encontrados: 17");
                            expect(catalog_page.getPatternName(0).getText()).toBe("Long name Asset 1");
                            expect(catalog_page.getPatternDuration(0).getText()).toBe("Hasta 1");
                            expect(catalog_page.getPatternName(1).getText()).toBe("Long name Asset 10");
                            expect(catalog_page.getPatternDuration(1).getText()).toBe("Hasta 1");
                            expect(catalog_page.getPatternName(2).getText()).toBe("Long name Asset 13");
                            expect(catalog_page.getPatternDuration(2).getText()).toBe("Hasta 1");
                            expect(catalog_page.getPatternName(3).getText()).toBe("Long name Asset 16");
                            expect(catalog_page.getPatternDuration(2).getText()).toBe("Hasta 1");
                            catalog_page.selectDurationFilter(2); //de 1 a 3 meses
                            ptor.sleep(2000);
                            expect(catalog_page.getTotalAndFoundPatternsLabel().getText()).toBe("Número total de patrones: 50; Patrones encontrados: 17");
                            expect(catalog_page.getPatternName(0).getText()).toBe("Long name Asset 11");
                            expect(catalog_page.getPatternDuration(0).getText()).toBe("De 1 a 3");
                            expect(catalog_page.getPatternName(1).getText()).toBe("Long name Asset 14");
                            expect(catalog_page.getPatternDuration(1).getText()).toBe("De 1 a 3");
                            expect(catalog_page.getPatternName(2).getText()).toBe("Long name Asset 17");
                            expect(catalog_page.getPatternDuration(2).getText()).toBe("De 1 a 3");
                            expect(catalog_page.getPatternName(3).getText()).toBe("Long name Asset 2");
                            expect(catalog_page.getPatternDuration(3).getText()).toBe("De 1 a 3");
                            catalog_page.selectDurationFilter(3); //Más de 3 meses
                            ptor.sleep(2000);
                            expect(catalog_page.getTotalAndFoundPatternsLabel().getText()).toBe("Número total de patrones: 50; Patrones encontrados: 16");
                            expect(catalog_page.getPatternName(0).getText()).toBe("Long name Asset 12");
                            expect(catalog_page.getPatternDuration(0).getText()).toBe("Más de 3");
                            expect(catalog_page.getPatternName(1).getText()).toBe("Long name Asset 15");
                            expect(catalog_page.getPatternDuration(1).getText()).toBe("Más de 3");
                            expect(catalog_page.getPatternName(2).getText()).toBe("Long name Asset 18");
                            expect(catalog_page.getPatternDuration(2).getText()).toBe("Más de 3");
                            expect(catalog_page.getPatternName(3).getText()).toBe("Long name Asset 21");
                            expect(catalog_page.getPatternDuration(3).getText()).toBe("Más de 3");
                        });

                        it("should filter catalog by volatility", function() {
                            expect(catalog_page.isCurrentPage()).toBe(true);
                            catalog_page.selectVolatilityFilter(1); //Menos de 25%
                            ptor.sleep(2000);
                            expect(catalog_page.getTotalAndFoundPatternsLabel().getText()).toBe("Número total de patrones: 50; Patrones encontrados: 26");
                            expect(catalog_page.getPatternName(0).getText()).toBe("Long name Asset 1");
                            expect(catalog_page.getPatternVolatility(0).getText()).toBe("19");
                            expect(catalog_page.getPatternName(1).getText()).toBe("Long name Asset 10");
                            expect(catalog_page.getPatternVolatility(1).getText()).toBe("5");
                            expect(catalog_page.getPatternName(2).getText()).toBe("Long name Asset 13");
                            expect(catalog_page.getPatternVolatility(2).getText()).toBe("19");
                            expect(catalog_page.getPatternName(3).getText()).toBe("Long name Asset 14");
                            expect(catalog_page.getPatternVolatility(3).getText()).toBe("5");
                            catalog_page.selectVolatilityFilter(2); //Entre 25% y 50%
                            ptor.sleep(2000);
                            expect(catalog_page.getTotalAndFoundPatternsLabel().getText()).toBe("Número total de patrones: 50; Patrones encontrados: 0");
                            catalog_page.selectVolatilityFilter(3); //Entre 50% y 75%
                            ptor.sleep(2000);
                            expect(catalog_page.getTotalAndFoundPatternsLabel().getText()).toBe("Número total de patrones: 50; Patrones encontrados: 12");
                            expect(catalog_page.getPatternName(0).getText()).toBe("Long name Asset 11");
                            expect(catalog_page.getPatternVolatility(0).getText()).toBe("57");
                            expect(catalog_page.getPatternName(1).getText()).toBe("Long name Asset 15");
                            expect(catalog_page.getPatternVolatility(1).getText()).toBe("57");
                            expect(catalog_page.getPatternName(2).getText()).toBe("Long name Asset 19");
                            expect(catalog_page.getPatternVolatility(2).getText()).toBe("57");
                            expect(catalog_page.getPatternName(3).getText()).toBe("Long name Asset 23");
                            expect(catalog_page.getPatternVolatility(3).getText()).toBe("57");
                            catalog_page.selectVolatilityFilter(4); //Más de 75%
                            ptor.sleep(2000);
                            expect(catalog_page.getTotalAndFoundPatternsLabel().getText()).toBe("Número total de patrones: 50; Patrones encontrados: 12");
                            expect(catalog_page.getPatternName(0).getText()).toBe("Long name Asset 12");
                            expect(catalog_page.getPatternVolatility(0).getText()).toBe("104");
                            expect(catalog_page.getPatternName(1).getText()).toBe("Long name Asset 16");
                            expect(catalog_page.getPatternVolatility(1).getText()).toBe("104");
                            expect(catalog_page.getPatternName(2).getText()).toBe("Long name Asset 20");
                            expect(catalog_page.getPatternVolatility(2).getText()).toBe("104");
                            expect(catalog_page.getPatternName(3).getText()).toBe("Long name Asset 24");
                            expect(catalog_page.getPatternVolatility(3).getText()).toBe("104");
                        });

                        it("should filter catalog by all filters at the same time", function() {
                            expect(catalog_page.isCurrentPage()).toBe(true);
                            catalog_page.getSectorFilter().sendKeys("sector");
                            ptor.sleep(1000);
                            expect(catalog_page.getSectorFilterDropdownOption(0).getText()).toBe("Sector1");
                            expect(catalog_page.getSectorFilterDropdownOption(1).getText()).toBe("Sector2");
                            catalog_page.getSectorFilterDropdownOption(0).click();
                            ptor.sleep(3000);
                            catalog_page.getIndustryFilter().sendKeys("industry");
                            expect(catalog_page.getIndustryFilterDropdownOption(0).getText()).toBe("Industry1_1");
                            expect(catalog_page.getIndustryFilterDropdownOption(1).getText()).toBe("Industry1_2");
                            catalog_page.getIndustryFilterDropdownOption(0).click();
                            ptor.sleep(3000);
                            catalog_page.getNameFilter().sendKeys("1");
                            ptor.sleep(2000);
                            catalog_page.selectDurationFilter(1); //Hasta 1 mes
                            ptor.sleep(2000);
                            catalog_page.selectVolatilityFilter(1); //Menos de 25%
                            ptor.sleep(2000);
                            expect(catalog_page.getTotalAndFoundPatternsLabel().getText()).toBe("Número total de patrones: 50; Patrones encontrados: 2");
                            //first pattern
                            expect(catalog_page.getPatternName(0).getText()).toBe("Long name Asset 1");
                            expect(catalog_page.getPatternMarket(0).getText()).toBe("EC1");
                            expect(catalog_page.getPatternSectorIndustry(0).getText()).toBe("Sector1 / Industry1_1");
                            expect(catalog_page.getPatternWin(0).getText()).toBe("14");
                            expect(catalog_page.getPatternLoss(0).getText()).toBe("1");
                            expect(catalog_page.getPatternAccumulatedReturn(0).getText()).toBe("212");
                            expect(catalog_page.getPatternAverageReturn(0).getText()).toBe("14.2");
                            expect(catalog_page.getPatternDuration(0).getText()).toBe("Hasta 1");
                            expect(catalog_page.getPatternVolatility(0).getText()).toBe("19");
                            expect(catalog_page.getPatternStatus(0,'not_started').isDisplayed()).toBe(false);
                            expect(catalog_page.getPatternStatus(0,'started').isDisplayed()).toBe(false);
                            expect(catalog_page.getPatternStatus(0,'finished').isDisplayed()).toBe(true);
                            //second pattern
                            expect(catalog_page.getPatternName(1).getText()).toBe("Long name Asset 13");
                            expect(catalog_page.getPatternMarket(1).getText()).toBe("EC1");
                            expect(catalog_page.getPatternSectorIndustry(1).getText()).toBe("Sector1 / Industry1_1");
                            expect(catalog_page.getPatternWin(1).getText()).toBe("14");
                            expect(catalog_page.getPatternLoss(1).getText()).toBe("1");
                            expect(catalog_page.getPatternAccumulatedReturn(1).getText()).toBe("212");
                            expect(catalog_page.getPatternAverageReturn(1).getText()).toBe("14.2");
                            expect(catalog_page.getPatternDuration(1).getText()).toBe("Hasta 1");
                            expect(catalog_page.getPatternVolatility(1).getText()).toBe("19");
                            expect(catalog_page.getPatternStatus(1,'not_started').isDisplayed()).toBe(false);
                            expect(catalog_page.getPatternStatus(1,'started').isDisplayed()).toBe(true);
                            expect(catalog_page.getPatternStatus(1,'finished').isDisplayed()).toBe(false);
                        });

                    }); //end go to Canadá Pack I catalog

                    describe("go to Estados Unidos Pack I catalog", function() {
                        beforeEach(function() {
                            ptor.sleep(2000);
                            home.getCurrentMonthTableAmericaPackName(2).click();
                            ptor.sleep(2000);
                        });

                        it("should be on catalog page and have the correct patterns", function() {
                            expect(catalog_page.isCurrentPage()).toBe(true);
                            expect(catalog_page.getStartDateLabel().getText()).toBe("Noviembre 2014");
                            expect(catalog_page.getPackNameLabel().getText()).toBe("Estados Unidos Pack I");
                            expect(catalog_page.getCurrentDateLabel().getText()).toBe("Date: 14 Nov. (GMT)");
                            expect(catalog_page.getTotalAndFoundPatternsLabel().getText()).toBe("Número total de patrones: 50; Patrones encontrados: 50");
                            //first pattern
                            expect(catalog_page.getPatternName(0).getText()).toBe("Long name Asset 151");
                            expect(catalog_page.getPatternMarket(0).getText()).toBe("EX1");
                            expect(catalog_page.getPatternSectorIndustry(0).getText()).toBe("Sector5 / Industry5_1");
                            expect(catalog_page.getPatternWin(0).getText()).toBe("14");
                            expect(catalog_page.getPatternLoss(0).getText()).toBe("1");
                            expect(catalog_page.getPatternAccumulatedReturn(0).getText()).toBe("212");
                            expect(catalog_page.getPatternAverageReturn(0).getText()).toBe("14.2");
                            expect(catalog_page.getPatternDuration(0).getText()).toBe("Hasta 1");
                            expect(catalog_page.getPatternVolatility(0).getText()).toBe("19");
                            expect(catalog_page.getPatternStatus(0,'not_started').isDisplayed()).toBe(false);
                            expect(catalog_page.getPatternStatus(0,'started').isDisplayed()).toBe(false);
                            expect(catalog_page.getPatternStatus(0,'finished').isDisplayed()).toBe(true);
                            //second pattern
                            expect(catalog_page.getPatternName(1).getText()).toBe("Long name Asset 152");
                            expect(catalog_page.getPatternMarket(1).getText()).toBe("EX2");
                            expect(catalog_page.getPatternSectorIndustry(1).getText()).toBe("Sector6 / Industry6_1");
                            expect(catalog_page.getPatternWin(1).getText()).toBe("12");
                            expect(catalog_page.getPatternLoss(1).getText()).toBe("3");
                            expect(catalog_page.getPatternAccumulatedReturn(1).getText()).toBe("101");
                            expect(catalog_page.getPatternAverageReturn(1).getText()).toBe("9.7");
                            expect(catalog_page.getPatternDuration(1).getText()).toBe("De 1 a 3");
                            expect(catalog_page.getPatternVolatility(1).getText()).toBe("5");
                            expect(catalog_page.getPatternStatus(1,'not_started').isDisplayed()).toBe(false);
                            expect(catalog_page.getPatternStatus(1,'started').isDisplayed()).toBe(true);
                            expect(catalog_page.getPatternStatus(1,'finished').isDisplayed()).toBe(false);
                            //third pattern
                            expect(catalog_page.getPatternName(2).getText()).toBe("Long name Asset 153");
                            expect(catalog_page.getPatternMarket(2).getText()).toBe("EX3");
                            expect(catalog_page.getPatternSectorIndustry(2).getText()).toBe("Sector5 / Industry5_2");
                            expect(catalog_page.getPatternWin(2).getText()).toBe("10");
                            expect(catalog_page.getPatternLoss(2).getText()).toBe("5");
                            expect(catalog_page.getPatternAccumulatedReturn(2).getText()).toBe("500");
                            expect(catalog_page.getPatternAverageReturn(2).getText()).toBe("27.5");
                            expect(catalog_page.getPatternDuration(2).getText()).toBe("Más de 3");
                            expect(catalog_page.getPatternVolatility(2).getText()).toBe("57"); //truncated
                            expect(catalog_page.getPatternStatus(2,'not_started').isDisplayed()).toBe(false);
                            expect(catalog_page.getPatternStatus(2,'started').isDisplayed()).toBe(true);
                            expect(catalog_page.getPatternStatus(2,'finished').isDisplayed()).toBe(false);
                            //fourth pattern
                            expect(catalog_page.getPatternName(3).getText()).toBe("Long name Asset 154");
                            expect(catalog_page.getPatternMarket(3).getText()).toBe("EX1");
                            expect(catalog_page.getPatternSectorIndustry(3).getText()).toBe("Sector6 / Industry6_2");
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

                        it("should filter catalog by all filters at the same time", function() {
                            expect(catalog_page.isCurrentPage()).toBe(true);
                            catalog_page.getSectorFilter().sendKeys("sector");
                            ptor.sleep(1000);
                            expect(catalog_page.getSectorFilterDropdownOption(0).getText()).toBe("Sector5");
                            expect(catalog_page.getSectorFilterDropdownOption(1).getText()).toBe("Sector6");
                            catalog_page.getSectorFilterDropdownOption(0).click();
                            ptor.sleep(3000);
                            catalog_page.getIndustryFilter().sendKeys("industry");
                            expect(catalog_page.getIndustryFilterDropdownOption(0).getText()).toBe("Industry5_1");
                            expect(catalog_page.getIndustryFilterDropdownOption(1).getText()).toBe("Industry5_2");
                            catalog_page.getIndustryFilterDropdownOption(1).click();
                            ptor.sleep(3000);
                            catalog_page.getNameFilter().sendKeys("5");
                            ptor.sleep(2000);
                            catalog_page.selectDurationFilter(3); //Más de 3 meses
                            ptor.sleep(2000);
                            catalog_page.selectVolatilityFilter(3); //Entre 50% y 75%
                            ptor.sleep(2000);
                            expect(catalog_page.getTotalAndFoundPatternsLabel().getText()).toBe("Número total de patrones: 50; Patrones encontrados: 2");
                            //first pattern
                            expect(catalog_page.getPatternName(0).getText()).toBe("Long name Asset 153");
                            expect(catalog_page.getPatternMarket(0).getText()).toBe("EX3");
                            expect(catalog_page.getPatternSectorIndustry(0).getText()).toBe("Sector5 / Industry5_2");
                            expect(catalog_page.getPatternWin(0).getText()).toBe("10");
                            expect(catalog_page.getPatternLoss(0).getText()).toBe("5");
                            expect(catalog_page.getPatternAccumulatedReturn(0).getText()).toBe("500");
                            expect(catalog_page.getPatternAverageReturn(0).getText()).toBe("27.5");
                            expect(catalog_page.getPatternDuration(0).getText()).toBe("Más de 3");
                            expect(catalog_page.getPatternVolatility(0).getText()).toBe("57");
                            expect(catalog_page.getPatternStatus(0,'not_started').isDisplayed()).toBe(false);
                            expect(catalog_page.getPatternStatus(0,'started').isDisplayed()).toBe(true);
                            expect(catalog_page.getPatternStatus(0,'finished').isDisplayed()).toBe(false);
                            //second pattern
                            expect(catalog_page.getPatternName(1).getText()).toBe("Long name Asset 165");
                            expect(catalog_page.getPatternMarket(1).getText()).toBe("EX3");
                            expect(catalog_page.getPatternSectorIndustry(1).getText()).toBe("Sector5 / Industry5_2");
                            expect(catalog_page.getPatternWin(1).getText()).toBe("10");
                            expect(catalog_page.getPatternLoss(1).getText()).toBe("5");
                            expect(catalog_page.getPatternAccumulatedReturn(1).getText()).toBe("500");
                            expect(catalog_page.getPatternAverageReturn(1).getText()).toBe("27.5");
                            expect(catalog_page.getPatternDuration(1).getText()).toBe("Más de 3");
                            expect(catalog_page.getPatternVolatility(1).getText()).toBe("57");
                            expect(catalog_page.getPatternStatus(1,'not_started').isDisplayed()).toBe(true);
                            expect(catalog_page.getPatternStatus(1,'started').isDisplayed()).toBe(false);
                            expect(catalog_page.getPatternStatus(1,'finished').isDisplayed()).toBe(false);
                        });
                    }); //end go to Estados Unidos Pack I catalog

                }); //end stocks tab

                xdescribe("pairs tab", function() {
                    beforeEach(function() {
                        ptor.sleep(3000); //wait for tables to load
                        home.goToCurrentMonthTab('pairs');
                        ptor.sleep(3000); //wait for pairs tab to load
                    });
         
                    it("should have the correct month and year", function() {
                        expect(home.getCurrentMonthTableCurrentTabHeader().getText()).toBe("NOVIEMBRE 2014");
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
                        expect(home.getCurrentMonthTableEuropePackNumPatterns(0).getText()).toBe("50");
                        expect(home.getCurrentMonthTableEuropePackNumPatterns(1).getText()).toBe("50");
                        expect(home.getCurrentMonthTableEuropePackNumPatterns(2).getText()).toBe("50");
                        expect(home.getCurrentMonthTableEuropePackNumPatterns(3).getText()).toBe("50");
                        expect(home.getCurrentMonthTableEuropePackNumPatterns(4).getText()).toBe("50");
                        expect(home.getCurrentMonthTableEuropePackNumPatterns(5).getText()).toBe("50");
                    });

                    describe("go to Estados Unidos Pack I catalog", function() {
                        beforeEach(function() {
                            ptor.sleep(2000);
                            home.getCurrentMonthTableAmericaPackName(0).click();
                            ptor.sleep(2000);
                        });

                        it("should be on catalog page", function() {
                            expect(catalog_page.isCurrentPage()).toBe(true);
                            expect(true).toBe(true);
                            //ptor.sleep(10000);
                        });
                    });

                }); //end pairs tab

                xdescribe("indices tab", function() {
                    beforeEach(function() {
                        ptor.sleep(3000); //wait for tables to load
                        home.goToCurrentMonthTab('indices');
                        ptor.sleep(3000); //wait for indices tab to load
                    });
         
                    it("should have the correct month and year", function() {
                        expect(home.getCurrentMonthTableCurrentTabHeader().getText()).toBe("NOVIEMBRE 2014");
                    });

                    it("should have the correct packs in Indices", function() {
                        expect(home.getCurrentMonthTableIndicesPackName(0).getText()).toBe("INDEX Pack I");
                        expect(home.getCurrentMonthTableIndicesPackName(1).getText()).toBe("INDEX Pack II");
                        expect(home.getCurrentMonthTableIndicesPackNumPatterns(0).getText()).toBe("50");
                        expect(home.getCurrentMonthTableIndicesPackNumPatterns(1).getText()).toBe("50");
                    });

                    it("should have the correct packs in Pair Indices", function() {
                        expect(home.getCurrentMonthTablePairIndicesPackName(0).getText()).toBe("INDEX Pair Pack I");
                        expect(home.getCurrentMonthTablePairIndicesPackNumPatterns(0).getText()).toBe("50");
                    });

                    describe("go to INDEX Pack I catalog", function() {
                        beforeEach(function() {
                            ptor.sleep(2000);
                            home.getCurrentMonthTableIndicesPackName(0).click();
                            ptor.sleep(2000);
                        });

                        it("should be on catalog page", function() {
                            expect(catalog_page.isCurrentPage()).toBe(true);
                            expect(true).toBe(true);
                            //ptor.sleep(10000);
                        });

                    });

                }); //end indices tab

                xdescribe("futures tab", function() {
                    beforeEach(function() {
                        ptor.sleep(3000); //wait for tables to load
                        home.goToCurrentMonthTab('futures');
                        ptor.sleep(3000); //wait for futures tab to load
                    });
         
                    it("should have the correct month and year", function() {
                        expect(home.getCurrentMonthTableCurrentTabHeader().getText()).toBe("NOVIEMBRE 2014");
                    });

                    it("should have the correct packs in Futures", function() {
                        expect(home.getCurrentMonthTableFuturesPackName(0).getText()).toBe("Energía, Metales, Agrícolas, Carnes, Softs, Divisas, Tipos de Interés, Índices Bursátiles");
                        expect(home.getCurrentMonthTableFuturesPackNumPatterns(0).getText()).toBe("50");
                    });

                    describe("go to FUTURES Pack I catalog", function() {
                        beforeEach(function() {
                            ptor.sleep(2000);
                            home.getCurrentMonthTableFuturesPackName(0).click();
                            ptor.sleep(2000);
                        });

                        it("should be on catalog page", function() {
                            expect(catalog_page.isCurrentPage()).toBe(true);
                            expect(true).toBe(true);
                            //ptor.sleep(10000);
                        });

                    });

                }); //end indices tab
            }); //end current month packs

            describe("Next month packs", function() {
                it("table should no be present", function() {
                    expect(home.getNextMonthTableCurrentTabContent().isPresent()).toBe(false);
                });
            });

        });

        xdescribe("packs to subscribe in November 15th", function() {
            beforeEach(function() {
                dsc.setServerDate("2014-11-15 11:30:00");
                ptor.sleep(9000);
                home = new Home(); //go to home page
            });

            describe("Current month packs", function() {
                describe("stocks tab", function() {
                    beforeEach(function() {
                        ptor.sleep(3000); //wait for stocks tab to load
                    });
         
                    it("should have the correct packs in América", function() {
                        expect(true).toBe(true);
                        //ptor.sleep(30000); 
                    });
                });
            });

            describe("Next month packs", function() {
                it("should be displayed", function() {
                    //TODO test table should not be displayed
                    expect(true).toBe(true);
                });

                describe("stocks tab", function() {
                    beforeEach(function() {
                        ptor.sleep(3000); //wait for stocks tab to load
                    });
         
                    it("should have the correct packs in América", function() {
                        expect(true).toBe(true);
                        ptor.sleep(30000); 
                    });
                });
            });

        });

        xdescribe("packs to subscribe in December 1th", function() {
            beforeEach(function() {
                dsc.setServerDate("2014-12-01 11:30:00");
                ptor.sleep(9000);
                home = new Home(); //go to home page
            });

            describe("Current month packs", function() {
                describe("stocks tab", function() {
                    beforeEach(function() {
                        ptor.sleep(3000); //wait for stocks tab to load
                    });
         
                    it("should have the correct packs in América", function() {
                        expect(true).toBe(true);
                        //ptor.sleep(30000); 
                    });
                });
            });

            describe("Next month packs", function() {
                it("should no be displayed", function() {
                    //TODO test table should not be displayed
                    expect(true).toBe(true);
                });
            });

        });

        xdescribe("packs to subscribe in December 15th", function() {
            beforeEach(function() {
                dsc.setServerDate("2014-12-15 11:30:00");
                ptor.sleep(9000);
                home = new Home(); //go to home page
            });

            describe("Current month packs", function() {
                describe("stocks tab", function() {
                    beforeEach(function() {
                        ptor.sleep(3000); //wait for stocks tab to load
                    });
         
                    it("should have the correct packs in América", function() {
                        expect(true).toBe(true);
                        //ptor.sleep(30000); 
                    });
                });
            });

            describe("Next month packs", function() {
                it("should be displayed", function() {
                    //TODO test table should not be displayed
                    expect(true).toBe(true);
                });

                describe("stocks tab", function() {
                    beforeEach(function() {
                        ptor.sleep(3000); //wait for stocks tab to load
                    });
         
                    it("should have the correct packs in América", function() {
                        expect(true).toBe(true);
                        ptor.sleep(30000); 
                    });
                });
            });

        });

});
