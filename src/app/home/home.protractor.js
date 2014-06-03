/**
 * Created by Aitor on 28/05/14.

describe('The login box', function() {
    beforeEach(function () {
        browser.get('http://46.51.174.51/moshopclient/');
        browser.ignoreSynchronization = true;
    });
    it('should appear when login link is clicked', function () {
        element(by.css(".no-logged-box")).click();
        expect(browser.isElementPresent(by.css('.sign-in-box'))).toBe(true);
    });
});
 */