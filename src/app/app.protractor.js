/*
 * Created by laia on 2/06/14.
*
 * Created by Aitor on 28/05/14.*/

//Check if login box fades in
var App = function(){

    this.open = function(){

        browser.get('http://46.51.174.51/moshopclient/#/home');
        browser.ignoreSynchronization = true;
    };

    this.clickF = function(){
        element(by.css(".no-logged-box")).click();
    };

    this.fadeIn = function(){

        element(by.css(".no-logged-box")).click();
    };

    this.fadeOut = function(){

        element(by.css(".no-logged-box")).click();
        element(by.css(".subscribe-free-link")).click();
    };
};

describe('The login box', function() {

    var a = new App();
    it('should appear when login link is clicked', function () {
        a.open();
        a.clickF();
        expect(browser.isElementPresent(by.css('.sign-in-box'))).toBe(true);
    });

    it('should fade in', function () {
        a.fadeIn();
        expect(browser.isElementPresent(by.css('.sign-in-box'))).toBe(true);

    });

    it('should fade out', function () {
        a.fadeOut();
      //  expect(browser.isElementPresent(by.css('.sign-in-box'))).toBe(false);
    });
});



