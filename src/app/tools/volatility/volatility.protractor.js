/**
 * Created by laia on 25/06/14.
 */

var App = function(){

    this.open = function(){

        browser.get('http://localhost:63342/mo-shopclient/build/index.html#/volatility');

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

    this.checkDataLoaded = function(){
        this.row = element.all(by.css(".tableDiaryLinks")).get(0);
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
    }
};

describe('The volatility page ', function() {

    var a = new App();
    it('should appear when volatility link is clicked', function () {
        a.open();
        expect(browser.isElementPresent(by.css('.private-black-title'))).toBe(true);
    });

   it('should have 32 lines', function(){

        a.checkNumberOfLines();
        expect(a.n).toBe(32);
    });


    it ('should load the data', function(){
        a.checkDataLoaded();
        expect(a.row.getText()).toBe('4IMPRINT GROUP PLC');
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
});
