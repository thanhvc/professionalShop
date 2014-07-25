/**
 * Created by laia on 25/06/14.
 */

var App = function(){

    this.open = function(){

        browser.get('http://mo.devel.edosoftfactory.com/#/volatility');

        browser.ignoreSynchronization = true;
    };

    this.login = function(){
        element(by.css(".no-logged-box")).click();
        element(by.css(".float-right")).sendKeys('userEmail@gmail.com');
        element.all(by.css(".float-right")).get(1).sendKeys('userpass');
        element(by.css(".mo-button")).click();
    };

    this.checkNumberOfLines = function(){

        this.n = element.all(by.css('tr')).count();
    };

    this.checkTableLoaded = function(){
        this.row = element(by.css('.rich-table'));
    };

    this.showMoreInfo = function(){
        element(by.css('toggle-link')).click();
    };

    this.showLessInfo = function(){
        this.element = element(by.css('show-less'));
        this.element.click();
    };

    this.showMoreInfoButton = function(){
        this.element = element.all(by.css('a')).get(49);
    };

    this.loadGraphic = function(){
        this.vol = element(by.repeater('data in myData').row(0).column('{{data.asset.volatility}}'));

    };

    this.changePairsTab = function(){
        this.tab = element.all(by.css('nav-tabs > ng-isolate-scope')).get(1);

    };

    this.changeIndexTab = function(){
        this.tab = element.all(by.css('nav-tabs > ng-isolate-scope')).get(2);
        this.cell = element(by.css('pairs-table-vol'));
    };

    this.changeFuturesTab = function(){
        this.tab = element.all(by.css('nav-tabs > ng-isolate-scope')).get(3);
        this.cell = element(by.css('pairs-table-vol'));
    };

    this.pagination = function(){
        element.all(by.css('.ng-scope')).get(1).click();

    };
};

describe('The volatility page ', function() {

    var a = new App();
    a.open();

    it('should appear when volatility link is clicked', function () {

        expect(browser.isElementPresent(by.css('.ng-isolate-scope'))).toBeDefined();
    });

   it('should have 10 lines', function(){

        a.checkNumberOfLines();
        expect(a.n).toBe(64);
    });


    it ('should load the table', function(){
        a.checkTableLoaded();
        expect(a.row).toBeDefined();
    });

    if('should show more info', function(){

        a.showMoreInfo();
        expect(browser.isElementPresent(by.css('.show-less'))).toBe(true);
    });

    if('should show more info button', function(){

        a.showMoreInfoButton();
        expect(a.element).toBeDefined();
    });

    if('should show less info ', function(){

        a.showMoreLessButton();
        expect(a.element).not.toBeDefined();
    });

    it('should load a graphic', function(){
        a.loadGraphic();
        expect(browser.isElementPresent(by.css('move'))).toBeDefined();
    });

    it('should change to pairs tab',function(){

        a.changePairsTab();
        //expect(browser.isElementPresent(by.css('subscribeTableHead'))).toBeDefined();

        a.loadGraphic();
        expect(browser.isElementPresent(by.css('move'))).toBeDefined();

        a.checkNumberOfLines();
        expect(a.n).toBe(64);

        a.changeIndexTab();
        expect(a.cell).toBeDefined();

        a.pagination();
        expect(a.cell).toBeDefined();
    });

    it('should change index tab',function(){

        a.changeIndexTab();
        expect(a.cell).toBeDefined();

        a.loadGraphic();
        expect(browser.isElementPresent(by.css('move'))).toBeDefined();

        a.checkNumberOfLines();
        expect(a.n).toBe(64);

        a.changeFuturesTab();
        expect(a.cell).toBeDefined();

        a.pagination();
        expect(a.cell).toBeDefined();
    });

    it('should futures tab',function(){

        a.changeFuturesTab();
        expect(a.cell).toBeDefined();

        a.loadGraphic();
        expect(browser.isElementPresent(by.css('move'))).toBeDefined();

        a.checkNumberOfLines();
        expect(a.n).toBe(64);

        a.changeIndexTab();
        expect(a.cell).toBeDefined();

        a.pagination();
        expect(a.cell).toBeDefined();
    });

    it('should have the pagination working ok',function(){

        a.pagination();
        expect(a.cell).toBeDefined();

    });
});
