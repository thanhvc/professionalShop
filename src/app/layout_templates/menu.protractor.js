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
        expect(menu.getCssValue('background-color','orange'));


    });

    it('should change the text when changing the tab', function () {

        var link = element.all(by.css('li'));


       // link.get(6).click();

        //var text = element(by.css('text-block-title')).getText();
        //expect(text).toBe('Organizamos');

    });
});
