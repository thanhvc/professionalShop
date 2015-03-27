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
                xdescribe("stocks tab", function() {
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

                        it("should be on catalog page", function() {
                            expect(catalog_page.isCurrentPage()).toBe(true);
                            expect(true).toBe(true);
                            //ptor.sleep(10000);
                        });

                    });

                });

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

                describe("futures tab", function() {
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
            });

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
