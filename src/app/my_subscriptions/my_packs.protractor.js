
/**
 * Created by laia on 25/06/14.
 */

var Packs = function(){

    this.open = function(){

        //browser.get('http://localhost:63342/mo-shopclient/build/index.html#/my-subscriptions/my-packs');
        browser.get('http://46.51.174.51/moshopclient/#/home/my-suscriptions/my-packs');
        browser.ignoreSynchronization = true;
    };

    this.login = function(){
        element(by.css(".no-logged-box")).click();
        element(by.css(".float-right")).sendKeys('userEmail@gmail.com');
        element.all(by.css(".float-right")).get(1).sendKeys('userpass');


        browser.get('http://46.51.174.51/moshopclient/#/my-subscriptions/my-packs');
    };

    this.checkNumberOfLines = function(){

        this.n = element.all(by.css('tr')).count();
    };

    this.checkDataLoaded = function(){
        this.row = element.all(by.css('.packName')).first();
    };

    this.checkPolicy = function(){
        element.all(by.css(".ng-scope")).first().click();
    }
};

describe('My packs page ', function() {

    var a = new Packs();
    it('should appear when my packs link is clicked', function () {
        a.open();

        expect(browser.isElementPresent(by.css('.container'))).toBe(true);
    });

    it('should have 46 lines', function(){

        a.checkNumberOfLines();
        expect(a.n).toBe(46);
    });

    it('should load the data', function(){
        a.open();
        a.checkDataLoaded();
        expect(a.row.getText()).toBe('Australia + Nueva Zelanda Pack I');
    });

    it('should show the policy info', function(){

        a.checkPolicy();
        expect(browser.isElementPresent(by.css('.container'))).toBe(true);
    });


});
