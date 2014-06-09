/**
 * Created by laia on 5/06/14.
 */

describe('The menu is ok', function() {
    beforeEach(function () {
        browser.get('http://46.51.174.51/moshopclient/');
        browser.ignoreSynchronization = true;
    });
    it('should be colored when click', function () {

        var menu = element(by.id("market-observatory-nav"));
        menu.click();
        expect(menu.getCssValue('background-color')).toBe('rgba(255, 130, 0, 1)');


    });

    it('should change the text when changing the tab', function () {

       // var link = element.all(by.css('li'));
       var menu = element(by.id('services-nav'));
       menu.click();
       var submenu = element(by.id('summary-nav'));
       submenu.click();
       var text = element(by.css('text-block-title'));
       //text = text.getText();
       //expect(text).toBe('Resumen');
       //console.log(text.getText());

    });

    it('should get orange when mouse over',function(){

        var menu = element(by.id("market-observatory-nav"));
        menu.click();
        browser.actions().mouseMove($('#organization-nav')).perform();
        var submenu = element(by.id('organization-nav'));
       // expect(submenu.getCssValue('background-color')).toBe('rgba(255, 130, 0, 1)');
        expect(submenu.getCssValue('background-color')).toBe('rgba(0, 0, 0, 0)');
    });

});
