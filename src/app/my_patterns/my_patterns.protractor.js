/**
 * Created by laia on 10/06/14.
 */
var Patterns = function() {

    // All relevant elements
    this.patterns = element(by.id("market-observatory-nav"));
    this.submenu = '';
    this.table = null;
    this.graphic = null;
    this.text = '';
    this.graphic = '';

    this.open = function () {

        browser.get('http://api.mo.devel.edosoftfactory.com#/home');

        browser.ignoreSynchronization = true;

    };

    this.login = function(){
         browser.get('http://api.mo.devel.edosoftfactory.com/#/the-week');

    }

    this.graphicName = function(){

        this.graphic = element.all(by.css('.ng-scope .ng-binding')).get(13).getText();
        this.nameGraphic = element.all(by.css('.ng-binding')).get(13).getText();
    };

    this.showMore = function(){
         browser.get('http://api.mo.devel.edosoftfactory.com/#/the-week');
        element.all(by.css('.toggle-tables-link')).get(0).click();
        this.tableLength = element.all(by.repeater('region in area.regions')).get(0).getSize();

    };

    this.checkDate = function(){
        this.text = element(by.css('.the-week-header')).getText();

    };
};


var SP = function(){

    this.table = null;
    this.graphic = null;
    this.graphicName = '';
    this.open = function () {
        browser.get('http://api.mo.devel.edosoftfactory.com/#/patterns');
        browser.ignoreSynchronization = true;
    };

    this.login = function(){
         browser.get('http://api.mo.devel.edosoftfactory.com/#/the-week');

    }


    this.graphicName = function(){
        this.graphic = element.all(by.css('.ng-scope .ng-binding')).get(13).getText();
        this.nameGraphic = element.all(by.css('.ng-binding')).get(13).getText();
    };

};

var Commodities = function(){

    this.table = null;
    this.graphic = null;
    this.text = '';
    this.graphicName = '';
    this.open = function () {
        browser.get('http://api.mo.devel.edosoftfactory.com/#/patterns');

        browser.ignoreSynchronization = true;
    };
    this.login = function(){
         browser.get('http://api.mo.devel.edosoftfactory.com/#/the-week');

    }

    this.graphicName = function(){
       this.graphic = element.all(by.css('.ng-scope .ng-binding')).get(13).getText();
       this.nameGraphic = element.all(by.css('.ng-binding')).get(13).getText();
    };

};

var Actions = function(){

    this.text = '';
    this.element = null;
    this.element2 = null;

    this.open = function () {
        browser.get('http://api.mo.devel.edosoftfactory.com/#/patterns');
         browser.ignoreSynchronization = true;
    };
    this.login = function(){
         browser.get('http://api.mo.devel.edosoftfactory.com/#/home/the-week');
    }

    this.showMoreInfo = function(){

        this.element = element(by.css(".modal-content"));
    };


    this.checkPanels = function(){

        this.text = element.all(by.css('.ng-isolate-scope'));
        this.tables = element.all(by.css('.table-header-top-patterns')).count();

        this.text1 = this.text.get(1).getText();

        this.filters = element.all(by.css('.border-filters')).count();
        this.text2 = this.text.get(2).getText();
        this.text3 = this.text.get(3).getText();
        //this.text4 = this.text.get(4).getText();
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
        browser.get('http://api.mo.devel.edosoftfactory.coml/patterns?qname=prueba&month=6_2014&qregion=10&qpage=1&qmarket=1&qsector=1&qindust=1&qop=1');

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
         browser.get('http://api.mo.devel.edosoftfactory.com/patterns?qindex=index&tab=Acciones&acttab=0&selrent=1&qrent=11&qselaver=1&qseldiar=1&qdiar=33&qselvol=1&qvol=44&qseldur=1&qdur=55&qfav=1');

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
describe('The patterns menu is ok', function() {

    var p = new Patterns();

    it('should open correctly', function(){
        p.open();
    });


    it('should have the correct graphic name', function(){
        p.login();
        p.graphicName();
        expect(p.graphic).toBe(p.nameGraphic);

    });


    it('should show more options', function(){
        p.showMore();
        expect(p.tableLength).not.toBe(3);

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
        var t =  x + ' ' + months[month]+ ' / ' + n + ' '+ months[month] + '. Año ' + year + ' (semana ' + w2 +')';

        expect(p.text).toBe(t);
    });

});


describe('The S&P table is ok', function(){

    var s = new SP();

    s.open();

       it('should have the correct graphic name', function(){
         s.login();
       s.graphicName();
        expect(s.graphic).toBe(s.nameGraphic);

    });

});


describe('The Commodities table is ok', function(){

    var c = new Commodities();

    c.open();


   it('should have the correct graphic name', function(){
        c.graphicName();
        expect(c.graphic).toBe(c.nameGraphic);
    });

});


describe('Actions menu', function(){

    var a = new Actions();

    it('should have 4 panels', function(){
        a.checkPanels();

        expect(a.text1).toBe('Bolsa');
        expect(a.text2).toBe('Commodities');
        expect(a.text3).toBe('S&P');
       // expect(a.text4).toBe('Futuros');
        expect(a.tables).toBe(0);
        expect(a.filters).toBe(0);

    });

/*
    it('should have the correct America regions', function(){

        a.checkAmericaRegions();
        expect(a.element.getAttribute('value')).toBe('11');
        expect(a.element2.getAttribute('value')).toBe('America Stock Exchange');
    });


    it('should have the correct India regions', function(){

        a.checkIndiaRegions();
        expect(a.element.getAttribute('value')).toBe('11');
        expect(a.element2.getAttribute('value')).toBe('Bombay Stock Exchange');
    });


    it('should have the correct China regions', function(){

        a.checkChinaRegions();
        expect(a.element.getAttribute('value')).toBe('11');
        expect(a.element2.getAttribute('value')).toBe('Shangai Stock Exchange');
    });


    it('should have numeric fields', function(){
        a.checkNumericFields();
        expect(a.element.getCssValue('background-color')).toBe('rgba(255, 255, 255, 1)');
        expect(a.element1.getCssValue('background-color')).toBe('rgba(255, 255, 255, 1)');
        expect(a.element2.getCssValue('background-color')).toBe('rgba(255, 255, 255, 1)');
        expect(a.element3.getCssValue('background-color')).toBe('rgba(255, 255, 255, 1)');
        expect(a.element4.getCssValue('background-color')).toBe('rgba(255, 255, 255, 1)');
    });


    it('should reset the values', function(){
        a.open();
        a.restoreAll();
        expect(a.element.getText()).toBe('');
    });


    it('should go back', function(){

        a.goBack();
        expect(a.button).toBeDefined();
    });

    it('should go ahead', function(){

        a.goAhead();
        expect(a.button).toBeDefined();
    });

    it('should show the correct month',function(){

        a.checkMonth();
        var t,v;
        a.element.getText().then(function(r) {
            t = String(r);
            t= t.substring(0, t.indexOf('2')-1).toLowerCase();

            expect(a.element2).toBe(getMonth(t).toString());
        });


    });


    it('should show more info',function(){
         a.open();
         a.showMoreInfo();
         expect(a.element).toBeDefined();

    });


    it('should show less info',function(){
         a.open();
         a.showLess();
         expect(a.element).toBeDefined();

    });


    it('should have a correct URL', function(){

        a.element2 = a.checkURL();
        expect(a.name).toBe('prueba');
        expect(a.region).toBe('9');
        expect(a.op).toBe('1');

        expect(a.index).toBe('10');

        a.element2.get(5).getText().then(function(r){
            var t = String(r);
            t= t.substring(0, t.indexOf('2')-1).toLowerCase();
            t = getMonthNumber(t);
            expect('7').toBe((t+1).toString());
        });

        expect(a.acttab).toBe('rgba(255, 130, 0, 1)');
        expect(a.market).toBe('1');
        expect(a.rent).toBe('11');
        expect(a.selaver).toBe('1');
        expect(a.seldiar).toBe('1');
        expect(a.selvol).toBe('1');
        expect(a.seldur).toBe('1');
        expect(a.vol).toBe('44');
        expect(a.diar).toBe('33');
        expect(a.dur).toBe('55');
    });
*/

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
}