/**
 * Created by laia on 5/06/14.
 */

var Menu = function() {

    // All relevant elements
    this.menu = element(by.id("market-observatory-nav"));
    this.submenu = '';
    this.text = '';
    this.table = null;

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

    this.checkTranslation = function(){

        element(by.css('.flag-gb')).click();
        this.menu = element(by.id('services-nav'));

    };

    this.checkTable = function(){
        this.table = element(by.css('.header-table-pack'));
    };

    this.checkPatternNumber = function(){
        this.text = element.all(by.css('ng-binding')).last();
    };

    this.checkData = function(){
        element.all(by.css('ng-binding')).each(function(element) {
            expect(element.getText()).not.toBe('');
        });
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


    it('should not have a translation available', function(){
        m.checkTranslation();
        expect(m.menu.getText()).toBe('Servicios');
    });

    it('it should show the main table', function(){

        m.checkTable();
        expect(m.table).toBeDefined();
    });

    it('it should have the correct number of elements', function(){

        m.checkPatternNumber();
        expect(m.text).not.toBe('0');
    });

    it('it should have data in every cell', function(){

        m.checkData();
    });
});
