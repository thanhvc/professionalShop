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
    this.graphicName = '';

    this.open = function () {
        browser.get('http://46.51.174.51/moshopclient/#/patterns');
        browser.ignoreSynchronization = true;
    };

    this.checkTable = function(){
        element(by.id("the-week-nav")).click();
        this.table = element(by.css("the-week-table"));
    };

    this.graphicName = function(){
        this.graphic = element(by.css(".graphic-image")).click();
        this.graphic = element(by.id("graphicPanel")).click();
        this.graphicName = $("span[class*=ng-binding]").getText();
    };

    this.showMore = function(){

        this.tableLength = element(by.repeater('region in area.regions')).getSize();
        element(by.css(".toggle-tables-link")).click();

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
        browser.get('http://46.51.174.51/moshopclient/#/patterns');
        browser.ignoreSynchronization = true;
    };

    this.checkTable = function(){
        element(by.css(".ng-isolate-scope")).click();
        this.table =  element(by.css("syp-table"));
    };


    this.graphicName = function(){
        this.graphic = element(by.css(".graphic-image")).click();
        this.graphic = element(by.id("graphicPanel")).click();
        this.graphicName = $("span[class*=ng-binding]").getText();
    };

};

var Commodities = function(){

    this.table = null;
    this.graphic = null;
    this.text = '';
    this.graphicName = '';
    this.open = function () {
        browser.get('http://46.51.174.51/moshopclient/#/patterns');
        browser.ignoreSynchronization = true;
    };

    this.checkTable = function(){
        element(by.css(".ng-isolate-scope")).click();
        this.table =  element(by.css("commodities-table"));
    };


    this.graphicName = function(){
        this.graphic = element(by.css(".graphic-image")).click();
        this.graphic = element(by.id("graphicPanel")).click();
        this.graphicName = $("span[class*=ng-binding]").getText();
    };

};

var Actions = function(){

    this.text = '';
    this.element = null;
    this.element2 = null;

    this.open = function () {
        browser.get('http://46.51.174.51/moshopclient/#/patterns');
        browser.ignoreSynchronization = true;
    };

    this.showMore = function(){
        element(by.css(".toggle-link")).click();
        this.element = element(by.css(".ng-hide"));
    };

    this.showLess = function(){
       element(by.css(".toggle-link")).click();
       this.element = $('a[ng-click*="openModalInstance(\'services/detailed_description/patterns\')"]');
    };

    this.showMoreInfo = function(){

        $('a[ng-click*="openModalInstance(\'services/detailed_description/patterns\')"]').click();
        this.element = element(by.css(".modal-content"));
    };


    this.checkPanels = function(){
        this.text = element.all(by.css('.ng-isolate-scope'));
        this.tables = element.all(by.css('.table-header-top-patterns')).count();

        this.text1 = this.text.get(1).getText();

        this.filters = element.all(by.css('.border-filters')).count();
        this.text2 = this.text.get(2).getText();
        this.text3 = this.text.get(3).getText();
        this.text4 = this.text.get(4).getText();
    };

    this.checkMonth = function(){

        this.element = element.all(by.css('.ng-binding')).get(5);
        this.element2 = element.all(by.css('select'));
        this.element2 = this.element2.first().getAttribute('value');//.then(function(r){return r;});

        return this.element;
     };

    this.checkAmericaRegions = function(){

        this.element = $('select[ng-change*="selectRegion()"]');
        this.element.sendKeys('America');
        this.element2 = $('select[ng-change*="selectMarket()"]');
        this.element2.sendKeys('America Stock Exchange');
    };

    this.checkIndiaRegions = function(){

        this.element.sendKeys('India');
        this.element2 = $('select[ng-change*="selectMarket()"]');
        this.element2.sendKeys('Bombay Stock Exchange');
    };

    this.checkChinaRegions = function(){

        this.element.sendKeys('China');
        this.element2 = $('select[ng-change*="selectMarket()"]');
        this.element2.sendKeys('Shangai Stock Exchange');
    };

    this.checkNumericFields = function(){

        //this.element = $('input[class*="border-filters"]');
        this.element = $('input[name*="rentInput"]');
        this.element.sendKeys('35');

        this.element1 = $('input[name*="rentAverageInput"]');
        this.element1.sendKeys('63');

        this.element2 = $('input[name*="rentDiaryInput"]');
        this.element2.sendKeys('63');

        this.element3 = $('input[name*="volatilityInput"]');
        this.element3.sendKeys('63');

        this.element4 = $('input[name*="durationInput"]');
        this.element4.sendKeys('63');
    };

    this.restoreAll = function(){
        this.element = element(by.css('input[placeholder*="%"]'));
        this.element = this.element.sendKeys('35');
        this.b = $('button[ng-click*="restoreData()"]').click();
    };

    this.goBack = function(){

        this.button = element(by.css('.blue-month-selector'));
        var i;

        for (i = 0; i < 10; i++){ this.button.click();}

        this.button = element(by.css('.blue-month-selector'));
    };

    this.goAhead = function(){

        this.button = $('.blue-month-selector[ng-show*="canMove(1)"]').click();
        this.button = $('.blue-month-selector[ng-show*="canMove(1)"]');

    };
};
describe('The patterns menu is ok', function() {

    var p = new Patterns();

    it('should open correctly', function(){
        p.open();
    });

    it('should have a table', function(){

        p.checkTable();
        expect(p.table).toBeDefined();
    });

    it('should have the correct graphic name', function(){
        p.graphicName();
        expect(p.graphic).toBeDefined();
        expect(p.graphicName).toBe(element(by.css(".index-name")).getText());
    });

    it('should show more options', function(){
        p.showMore();
        expect(p.tableLength).not.toBe(element(by.repeater('region in area.regions')).getSize());
    });

    it('should have the current week', function(){
        p.checkDate();
        var months = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio','Agosto', 'Septiembre','Octubre', 'Noviembre', 'Diciembre'];
        var d = new Date();
        var month = d.getMonth();
        var day = d.getDate();
        var year = d.getFullYear();
        var week = getMonday(new Date());
        week = String(week);
        var w = week.substring(10,1);

        var x = w.substring(7);
        x = Number(x);
        var n = Number(x);
        n = n + 4;
        var t =  x + ' ' + months[month]+ ' / ' + n + ' '+ months[month] + '. Año ' + year + ' (semana ' + weekNo() +')';

        expect(p.text).toBe(t);
    });
});

describe('The S&P table is ok', function(){

    var s = new SP();

    s.open();

    it('should show the table', function(){

        s.checkTable();
        expect(s.table).toBeDefined();
    });

    it('should have the correct graphic name', function(){
        s.graphicName();
        expect(s.graphic).toBeDefined();
        expect(s.graphicName).toBe(element(by.css(".index-name")).getText());
    });

});


describe('The Commodities table is ok', function(){

    var c = new Commodities();

    c.open();

    it('should show the table', function(){

        c.checkTable();
        expect(c.table).toBeDefined();
    });

    it('should have the correct graphic name', function(){
        c.graphicName();
        expect(c.graphic).toBeDefined();
        expect(c.graphicName).toBe(element(by.css(".index-name")).getText());
    });

});

describe('Pattern menu', function(){

    var a = new Actions();

    it('should show more text', function(){
        a.open();
        a.showMore();
        expect(a.element).toBeDefined();
    });
    it('should show less text', function(){
        a.open();
        a.showLess();
        expect(element(by.css(".ng-hide"))).toBe(null);
    });

    it('should have 4 panels', function(){
        a.checkPanels();

        expect(a.text1).toBe('Acciones');
        expect(a.text2).toBe('Pares');
        expect(a.text3).toBe('Indices');
        expect(a.text4).toBe('Futuros');
        expect(a.tables).toBe(4);
        expect(a.filters).toBe(68);
    });


    it('should have the correct America regions', function(){

        a.checkAmericaRegions();
        expect(a.element.getAttribute('value')).toBe('1');
        expect(a.element2.getAttribute('value')).toBe('1');
    });
    it('should have the correct India regions', function(){

        a.checkIndiaRegions();
        expect(a.element.getAttribute('value')).toBe('1');
        expect(a.element2.getAttribute('value')).toBe('1');
    });
    it('should have the correct China regions', function(){

        a.checkChinaRegions();
        expect(a.element.getAttribute('value')).toBe('1');
        expect(a.element2.getAttribute('value')).toBe('1');
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
        expect(a.button).toBe(null);
    });

    it('should go ahead', function(){

        a.goAhead();
        expect(a.button).toBe(null);
    });

    it('should show the correct month',function(){

        a.checkMonth();
        var t;
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
         expect(a.element).toBe(null);

    });

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