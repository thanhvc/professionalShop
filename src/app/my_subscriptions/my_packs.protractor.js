
/**
 * Created by laia on 25/06/14.
 */

var Packs = function(){

    this.open = function(){

        browser.get('http://mo.devel.edosoftfactory.com');
        browser.ignoreSynchronization = true;
    };

    this.login = function(){
        element(by.css(".no-logged-box")).click();
        element(by.css(".float-right")).sendKeys('userEmail@gmail.com');
        element.all(by.css(".float-right")).get(1).sendKeys('userpass');


        browser.get('http://api.devel.edosoftfactory.com/#/my-subscriptions/my-packs');
    };

    this.checkNumberOfLines = function(){

        this.n = element.all(by.css('tr')).count();
    };

    this.checkDataLoaded = function(){
        browser.get('http://api.devel.edosoftfactory.com/#/my-subscriptions/my-packs');

        this.rows = element.all(by.css('td'));
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

    it('should have 60 lines', function(){

        a.checkNumberOfLines();
        expect(a.n).toBe(60);
    });

    it('should load the data', function(){
        a.open();

        a.checkDataLoaded();
        expect(a.rows.count()).toBe(152);
    });

    it('should show the policy info', function(){

        a.checkPolicy();
        expect(browser.isElementPresent(by.css('.container'))).toBe(true);
    });


});
