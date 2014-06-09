/**
 * Created by laia on 5/06/14.
 */

var Menu = function() {

    // All relevant elements
    this.menu = element(by.id("market-observatory-nav"));
    this.submenu = '';
    this.text = '';

    this.open = function () {
        browser.get('http://46.51.174.51/moshopclient');
        browser.ignoreSynchronization = true;
    };

    this.clickFunction = function(){

        this.menu.click();
    };

    this.navigate = function(){
        this.menu = element(by.id('services-nav'));
        this.menu.click();
        this.submenu = element(by.id('summary-nav'));
        this.submenu.click();
        this.text = element(by.css('.text-block-title'));
        this.text = this.text.getText();
    };

    this.hover = function(){
        this.menu = element(by.id("market-observatory-nav"));
        this.menu.click();
        browser.actions().mouseMove($('#organization-nav')).perform();
        this.submenu = element(by.id('organization-nav'));
    };
};

describe('The menu is ok', function() {

    var m = new Menu();
    it('should be colored when click', function () {

        m.open();
        m.clickFunction();
        expect(m.menu.getCssValue('background-color')).toBe('rgba(255, 130, 0, 1)');


    });

    it('should change the text when changing the tab', function () {

        m.navigate();
        expect(m.text).toBe('Resumen');

    });


    it('should get orange when mouse over',function(){
        m.hover();
        expect(m.menu.getCssValue('background-color')).toBe('rgba(255, 130, 0, 1)');
    });

});
