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
    this.text = '';
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

    this.showMore = function(){

       // this.tableLength = element(by.repeater('.sector in sypSectors')).getSize();
      //  element(by.css(".toggle-tables-link")).click();

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

    this.open = function () {
        browser.get('http://46.51.174.51/moshopclient/#/patterns');
        browser.ignoreSynchronization = true;
    };

    this.showMore = function(){
        element(by.css(".toggle-link")).click();
        this.element = element(by.css(".ng-hide"));
    };

    this.showLess = function(){
       // element(by.css(".toggle-link")).click();

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

    it('should show more options', function(){
        s.showMore();
       // expect(s.tableLength).not.toBe(element(by.repeater('region in area.regions')).getSize());
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

describe('Pattern menu should be ok', function(){

    var a = new Actions();

    a.open();

    it('should show more text', function(){

        a.showMore();
        expect(a.element).toBeDefined();
    });
    it('should show less text', function(){

        a.showLess();
        //expect(element(by.css(".ng-hide"))).not.toBeDefined();
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