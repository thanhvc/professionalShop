/**
 * Created by laia on 26/06/14.
 *//*

*/
/**
 * Created by laia on 26/06/14.
 *//*

*/
/**
 * Created by laia on 25/06/14.
 */

var Packs = function(){

    this.open = function(){
        browser.get('http://localhost:63342/mo-shopclient/build/index.html#');
        browser.ignoreSynchronization = true;
    };

    this.login = function(){
        element(by.css(".no-logged-box")).click();
        element(by.css(".float-right")).sendKeys('laia@gmail.com');
        element.all(by.css(".float-right")).get(1).sendKeys('prueba12');
        element(by.css(".mo-button")).click();
        browser.get('http://localhost:63342/mo-shopclient/build/index.html#/my-subscriptions/my-packs')
    };

    this.checkNumberOfLines = function(){

        this.n = element.all(by.css('tr')).count();
    };

    this.checkDataLoaded = function(){
        this.row = element.all(by.css(".tableDiaryLinks")).get(0);
    };
};

describe('My packs page ', function() {

    var a = new Packs();
    it('should appear when volatility link is clicked', function () {
        a.open();
        a.login();
        expect(browser.isElementPresent(by.css('.private-black-title'))).toBe(true);
    });

    it('should have 46 lines', function(){

        a.checkNumberOfLines();
        expect(a.n).toBe(46);
    });

    it('should load the data', function(){

        a.checkDataLoaded();
        expect(a.row.getText()).toBe('Australia + Nueva Zelanda Pack I');
    })


});
