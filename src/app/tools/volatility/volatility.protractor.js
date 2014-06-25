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
        element(by.css(".float-right")).sendKeys('laiarios@gmail.com');
        element.all(by.css(".float-right")).get(1).sendKeys('prueba1');
        element(by.css(".mo-button")).click();
    };

    this.checkNumberOfLines = function(){

        this.n = element.all(by.css('tr')).count();
    };

    this.checkDataLoaded = function(){
        this.row = element.all(by.css(".rich-table-cell")).get(0);
    };
};

describe('The volatility page ', function() {

    var a = new App();
    it('should appear when volatility link is clicked', function () {
        a.open();
       // a.login();
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

});