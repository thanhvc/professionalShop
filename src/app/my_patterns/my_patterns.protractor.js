/**
 * Created by laia on 10/06/14.
 */


var loadFixture = require('../../../test-helpers/load-fixture.js');
var sha512 = require('sha512');
var ptor = protractor.getInstance();
var Home = require('../../../test-helpers/page-objects/home.po.js');
var Helper = require('../../../test-helpers/helper.js');
var fixtureGenerator = require('../../../test-helpers/fixtures/fixture-generator.js');
var MyPatterns = require('../../../test-helpers/page-objects/mypatterns.po.js');
describe('The My Patterns page ', function () {
    var home;
    var myPatterns;
    var helper;
    var conString = browser.params.sqlCon;
    /*'postgres://super:moserverpass@localhost:25432/moserver'*/
    beforeEach(function () {
        helper = new Helper();
        var fixtures = fixtureGenerator.fixture_myPatterns();
        loadFixture.executeQueries(fixtures, conString);
        ptor.sleep(helper.oneSec());
        // loadFixture.loadMultipleFixture(fixture1, fixture2, conString);
        browser.ignoreSynchronization = true;


        home = new Home();
        myPatterns = new MyPatterns();
    });
    afterEach(function () {
        var fixtures = fixtureGenerator.remove_fixtures_subscriptions();
        loadFixture.executeQueries(fixtures, conString);
        ptor.sleep(helper.oneSec());

    });
    it('should be load patterns', function () {
        home.showLoginBox();
        home.login('john.snow@thewall.north', 'phantom');
        ptor.sleep(helper.oneSec());
        browser.get('/');
        ptor.sleep(helper.oneSec());
        myPatterns.goToMyPatterns();
        ptor.sleep(helper.oneSec());
        expect(myPatterns.getSimpleName(0,0).getText()).toEqual("Long name Asset 1");
        ptor.sleep(helper.oneSec());
        expect(myPatterns.getNumberTotalPatterns(0).getText()).toEqual("4");
        expect(myPatterns.getNumberFoundPatterns(0).getText()).toEqual("4");
        myPatterns.goToTab(1);
        ptor.sleep(helper.oneSec());
        //pairs
       myPatterns.getPairName(1,0,0).getText().then(function(data) {
            expect(data).toEqual("Long name Asset Pair 1");
        });
        myPatterns.getPairName(1,0,1).getText().then(function(data) {
            expect(data).toEqual("Long name Asset Pair 1 2");
        });
        ptor.sleep(helper.oneSec());
        expect(myPatterns.getNumberTotalPatterns(1).getText()).toEqual("4");
        expect(myPatterns.getNumberFoundPatterns(1).getText()).toEqual("4");
        //index
         myPatterns.goToTab(2);
        ptor.sleep(helper.oneSec());
        //pairs
        myPatterns.getSimpleName(2,0).getText().then(function(data) {
            expect(data).toEqual("Long name Asset Index 1");
        });
        myPatterns.getSimpleName(2,1).getText().then(function(data) {
            expect(data).toEqual("Long name Asset Index 2");
        });
        ptor.sleep(helper.oneSec());
        expect(myPatterns.getNumberTotalPatterns(2).getText()).toEqual("4");
        expect(myPatterns.getNumberFoundPatterns(2).getText()).toEqual("4");
        myPatterns.selectIndexType(1); // to pairs
        ptor.sleep(helper.oneSec());
        myPatterns.getPairName(2,0,0).getText().then(function(data) {
            expect(data).toEqual("Long name Asset Pair Index 1");
        });
        myPatterns.getPairName(2,0,1).getText().then(function(data) {
            expect(data).toEqual("Long name Asset Pair Index 1 2");
        });
        ptor.sleep(helper.oneSec());
        expect(myPatterns.getNumberTotalPatterns(2).getText()).toEqual("4");
        expect(myPatterns.getNumberFoundPatterns(2).getText()).toEqual("4");
        myPatterns.goToTab(3);
        ptor.sleep(helper.oneSec());
        expect(myPatterns.getSimpleName(3,0).getText()).toEqual("Long name Asset Future 1");
        ptor.sleep(helper.oneSec());
        expect(myPatterns.getNumberTotalPatterns(3).getText()).toEqual("2");
        expect(myPatterns.getNumberFoundPatterns(3).getText()).toEqual("2");

    });

    it('should be load filters', function () {

    });


});

/*
var Patterns = function() {

    // All relevant elements
    this.patterns = element(by.id("market-observatory-nav"));
    this.submenu = '';
    this.table = null;
    this.graphic = null;
    this.text = '';
    this.graphic = '';

    var ptor = protractor.getInstance();
    this.open = function () {

        browser.get(url +'/home');
        browser.ignoreSynchronization = true;

    };

    this.login = function(){
         browser.get(url+'/#/the-week');

    }

    this.graphicName = function(){



    };

    this.checkPanels = function(){

        browser.get(url + '/the-week');

        ptor = protractor.getInstance();
        ptor.waitForAngular();



    };
    this.showMore = function(){
        browser.get(url + '/the-week');

        ptor = protractor.getInstance();
        ptor.waitForAngular();

        this.info = element(by.css(".toggle-link"));
        this.moreInfo = element(by.css(".show"));

    };

    this.checkDate = function(){
        browser.get(url + '/the-week');
        //this.text = $('div > .the-week-header');
    };
};


var SP = function(){

    this.table = null;
    this.graphic = null;
    this.graphicName = '';
    this.open = function () {
        browser.get(url + '/#/patterns');
        browser.ignoreSynchronization = true;
    };

    this.login = function(){
         browser.get(url +'/#/the-week');

    }

    this.graphicName = function(){
        this.graphic = element.all(by.css('.ng-scope .ng-binding')).get(10).getText();
        this.nameGraphic = element.all(by.css('.ng-binding')).get(10).getText();
    };

};

var Commodities = function(){

    this.table = null;
    this.graphic = null;
    this.text = '';
    this.graphicName = '';
    this.open = function () {
        browser.get(url +'#/patterns');
        browser.ignoreSynchronization = true;
    };
    this.login = function(){
         browser.get(url + '#/the-week');

    }

    this.graphicName = function(){
       this.graphic = element.all(by.css('.ng-scope .ng-binding')).get(10).getText();
       this.nameGraphic = element.all(by.css('.ng-binding')).get(10).getText();
    };

};

var Actions = function(){

    this.text = '';
    this.element = null;
    this.element2 = null;

    this.open = function () {
        browser.get('http://mo.devel.edosoftfactory.com/#/patterns');
         browser.ignoreSynchronization = true;
    };
    this.login = function(){
         browser.get(url + '#/home/the-week');
    }

    this.showMoreInfo = function(){

        this.element = element(by.css(".modal-content"));
    };



    this.checkMonth = function(){

        this.element = element.all(by.css('.ng-binding')).get(5);
        this.element2 = element.all(by.css('select'));
        this.element2 = this.element2.first().getAttribute('value');

        return this.element;
     };

    this.checkAmericaRegions = function(){

        this.element= element.all(by.css('.border-filters')).get(0);
        this.element.sendKeys('America');
        this.element2= element.all(by.css('.border-filters')).get(1);
        this.element2.sendKeys('America Stock Exchange');
    };

    this.checkIndiaRegions = function(){

        this.element= element.all(by.css('.border-filters')).get(0);
        this.element.sendKeys('India');
        this.element2= element.all(by.css('.border-filters')).get(1);

        this.element2.clear();
        this.element2.sendKeys('Bombay Stock Exchange');
    };

    this.checkChinaRegions = function(){

        this.element= element.all(by.css('.border-filters')).get(0);
        this.element.sendKeys('China');
        this.element2= element.all(by.css('.border-filters')).get(1);
        this.element2.clear();
        this.element2.sendKeys('Shangai Stock Exchange');
    };

    this.checkNumericFields = function(){

        this.element = element.all(by.css('.border-filters')).get(9);
        this.element.sendKeys('35');

        this.element1 = element.all(by.css('.border-filters')).get(10);
        this.element1.sendKeys('63');


        this.element2 = element.all(by.css('.border-filters')).get(11);
        this.element2.sendKeys('63');

        this.element3 = element.all(by.css('.border-filters')).get(12);
        this.element3.sendKeys('63');


        this.element4 = element.all(by.css('.border-filters')).get(13);
        this.element4.sendKeys('63');
    };

    this.restoreAll = function(){
        this.element = element.all(by.css('input[placeholder*="%"]')).get(0);
        this.element = this.element.sendKeys('35');
        this.b = element.all(by.css('button')).get(1).click();
    };

     this.goBack = function(){

        this.button = element.all(by.css('.border-filters')).get(0);
        var i;

        for (i = 0; i < 10; i++){ this.button.click();}

        this.button = element(by.css('.blue-month-selector'));
    };


    this.goAhead = function(){

       this.button = element.all(by.css('.border-filters')).get(0).click();
       this.button = element.all(by.css('.border-filters')).get(0);

    };


    this.checkURL = function(){
        browser.get(url + 'patterns?qname=prueba&month=6_2014&qregion=10&qpage=1&qmarket=1&qsector=1&qindust=1&qop=1');

        this.name = element.all(by.css('input')).get(3).getAttribute('value');
        this.region = element.all(by.css('select')).get(0).getAttribute('value');
        this.sector = element.all(by.css('select.border-filters')).get(3).getAttribute('value');
        this.month = '6';
        this.element2 = element.all(by.css('.ng-binding'));
        this.element2.get(5).getText().then(function(r){
            var t = String(r);
            this.element2 = r;

        });

        this.market = element.all(by.css('select.border-filters')).get(2).getAttribute('value');
        this.indust = element.all(by.css('select.border-filters')).get(4).getAttribute('value');
        this.op = element.all(by.css('select.border-filters')).get(5).getAttribute('value');
         browser.get(url + 'patterns?qindex=index&tab=Acciones&acttab=0&selrent=1&qrent=11&qselaver=1&qseldiar=1&qdiar=33&qselvol=1&qvol=44&qseldur=1&qdur=55&qfav=1');

        this.acttab = element.all(by.css('.ng-binding')).get(1).getCssValue('background-color');
        this.index = element.all(by.css('select.ng-pristine')).get(0).getAttribute('value');
        this.selaver = element.all(by.css('select.border-filters')).get(7).getAttribute('value');

        this.seldiar = element.all(by.css('select.border-filters')).get(8).getAttribute('value');
        this.selvol = element.all(by.css('select.border-filters')).get(9).getAttribute('value');
        this.seldur = element.all(by.css('select.border-filters')).get(10).getAttribute('value');
        this.diar = element.all(by.css('input')).get(6).getAttribute('value');
        this.vol = element.all(by.css('input')).get(7).getAttribute('value');
        this.dur = element.all(by.css('input')).get(8).getAttribute('value');
        this.fav = element.all(by.css('input')).get(9).getAttribute('value');
        this.selrent = element.all(by.css('select')).get(6).getAttribute('value');
        this.rent = element.all(by.css('input')).get(4).getAttribute('value');

        return this.element2;

    };



};
describe('The patterns menu', function() {

    var p = new Patterns();

    it('should open correctly', function(){
        p.open();
    });




    it('should have the correct number of panels', function(){
        p.checkPanels();
    });

    it('should show more options', function(){
       p.showMore();
       expect(p.info).toBeDefined();
       expect(p.moreInfo).toBeDefined();
    });

    it('should have the current week', function(){
        p.checkDate();
        var months = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio','Agosto', 'Septiembre','Octubre', 'Noviembre', 'Diciembre'];
        var d = new Date();
        var month = d.getMonth() + 1;
        var day = d.getDate();
        var year = d.getFullYear();
        var week = getMonday(new Date());
        week = String(week);
        var w = week.substring(10,1);

        var x = w.substring(7);
        x = Number(x);
        var n = Number(x);
        n = n + 4;
        var w2 = weekNo() + 1;
        var t =  x + ' ' + months[month-1]+ ' / ' + n + ' '+ months[month-1] + '. Año ' + year + ' (semana ' + w2 +')';


    });

});


describe('The S&P table is ok', function(){

    var s = new SP();

    s.open();



});


describe('The Commodities table is ok', function(){

    var c = new Commodities();

    c.open();




});


describe('Actions menu', function(){

    var a = new Actions();




});

function getMonday(d) {
    d = new Date(d);
    var day = d.getDay(),
        diff = d.getDate() - day + (day === 0 ? -6:1); // adjust when day is sunday
    return new Date(d.setDate(diff));
}


function weekNo() {
    var totalDays = 0;
    now = new Date();
    years=now.getYear();
    if (years < 1000){
        years+=1900;}
    var days = new Array(12); // Array to hold the total days in a month
    days[0] = 31;
    days[2] = 31;
    days[3] = 30;
    days[4] = 31;
    days[5] = 30;
    days[6] = 31;
    days[7] = 31;
    days[8] = 30;
    days[9] = 31;
    days[10] = 30;
    days[11] = 31;

    //  Check to see if this is a leap year

    if (Math.round(now.getYear()/4) == now.getYear()/4) {
        days[1] = 29;
    }else{
        days[1] = 28;
    }

    //  If this is January no need for any fancy calculation otherwise figure out the
    //  total number of days to date and then determine what week

    if (now.getMonth() === 0) {
        totalDays = totalDays + now.getDate();
    }else{
        var curMonth = now.getMonth();
        for (var count = 1; count <= curMonth; count++) {
            totalDays = totalDays + days[count - 1];
        }
        totalDays = totalDays + now.getDate();
    }
    var week = Math.round(totalDays/7);
    return week;
}

function getMonth(m){

    var months = ['enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio','julio', 'agosto', 'septiembre', 'octubre', 'noviembre', 'diciembre'];

    var i = -1;
    for (i= 0; i < 12; i++) {
        if (months[i] == m) {
            break;
        }
    }

    if (i != -1){
        var j = 0;
        for (j= 0;j < 10; j++){
            i = (j+i+2)%12;
        }

    }

    return i;
}

function getMonthNumber(m){

    var months = ['enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio','julio', 'agosto', 'septiembre', 'octubre', 'noviembre', 'diciembre'];

    var i = -1;
    for (i= 0; i < 12; i++) {
        if (months[i] == m) {
            break;
        }
    }
    if (i == 12) {

        i = -1;
    }
    return i;
}*/