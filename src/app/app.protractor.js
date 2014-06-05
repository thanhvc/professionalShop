/*
 * Created by laia on 2/06/14.
*
 * Created by Aitor on 28/05/14.*/

//Check if login box fades in

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


// Check if login box stays in

describe('The signin-signup-box ng-scope div', function(){

    beforeEach(function () {
        browser.get('http://46.51.174.51/moshopclient/');
        browser.ignoreSynchronization = true;
    });


    it('should fade in', function () {

        element(by.css(".no-logged-box")).click();

        element(by.css('.sign-in-box')).click();
        expect(browser.isElementPresent(by.css('.sign-in-box'))).toBe(true);



    });
});



describe('The signin-signup-box fades out', function(){

    beforeEach(function () {
        browser.get('http://46.51.174.51/moshopclient/');
        browser.ignoreSynchronization = true;
    });


    it('should fade out', function () {

        element(by.css(".no-logged-box")).click();
        element(by.css(".subscribe-free-link")).click();

        //expect(browser.isElementPresent(by.css('.sign-in-box'))).toBe(false);


    });
});

//Check if Market Observatory Organization URL is ok
describe('The Market Observatory link is ok', function(){

    beforeEach(function () {
        browser.get('http://46.51.174.51/moshopclient/');
        browser.ignoreSynchronization = true;


    });


    it('should go to the organization link', function () {

        var link = element(by.id('organization-nav'));

        link.click;

        expect(browser.isElementPresent(by.css('.orange-title'))).toBe(true);
        expect(browser.isElementPresent(by.css('.menu-not-logged'))).toBe(true);


    });

    it('should keep the submenu item', function () {
        var link = element(by.id('what-is-and-what-is-not-nav'));

        link.click;
        //expect(browser.isElementPresent(by.css('.text-block-title'))).toBe(true);
        expect(browser.isElementPresent(by.css('.what-is-and-what-is-not-nav'))).toBe(false);
        expect(browser.isElementPresent(by.css('.menu-not-logged'))).toBe(true);

    });
    it('should show the page', function () {
        var link = element(by.id('what-is-and-what-is-not-nav'));

        link.click;
        var theElem= element(by.css('.text-block-title'))
        expect(browser.isElementPresent(by.css('.menu-not-logged'))).toBe(true);

        expect(theElem).toBeDefined();

    });

     it('should show the conditions page', function () {
            var link = element(by.id('service-conditions-nav'));

            link.click;
            var theElem= element(by.css('.public-zone-text container ng-scope'));
            expect(browser.isElementPresent(by.css('.menu-not-logged'))).toBe(true);
            expect(theElem).toBeDefined();

        });

      it('should show the data protection page', function () {
            var link = element(by.id('data-protection-nav'));

            link.click;
            var theElem= element(by.css('.public-zone-text container ng-scope'));
            expect(browser.isElementPresent(by.css('.menu-not-logged'))).toBe(true);
            expect(theElem).toBeDefined();

            });



});

//Check if Market Observatory Organization URL is ok

describe('The Service link is ok', function() {

    beforeEach(function () {
        browser.get('http://46.51.174.51/moshopclient/');
        browser.ignoreSynchronization = true;


    });

    it('should show the summary page', function () {
        var link = element(by.id('summary-nav'));

        link.click;
        var theElem= element(by.css('.submenu-content ng-scope'));
        expect(theElem).toBeDefined();
        expect(browser.isElementPresent(by.css('.menu-not-logged'))).toBe(true);

    });

    it('should show the products-and-exchanges page', function () {
        var link = element(by.id('products-and-exchanges-nav'));

        link.click;
        var theElem= element(by.css('.public-zone-text container ng-scope'));
        expect(theElem).toBeDefined();
        expect(browser.isElementPresent(by.css('.menu-not-logged'))).toBe(true);

        });

    it('should show the detailed-description page', function () {
        var link = element(by.id('detailed-description-nav'));

        link.click;
        var theElem= element(by.css('.public-zone-text container ng-scope'));
        expect(theElem).toBeDefined();
        expect(browser.isElementPresent(by.css('.menu-not-logged'))).toBe(true);

        });

    it('should show the fundamentals page', function () {
        var link = element(by.id('fundamentals-nav'));

        link.click;
        var theElem= element(by.css('.public-zone-text container ng-scope'));
        expect(theElem).toBeDefined();
        expect(browser.isElementPresent(by.css('.menu-not-logged'))).toBe(true);

        });

});

//Check if Market Observatory Organization URL is ok

describe('The Service link is ok', function() {

    beforeEach(function () {
        browser.get('http://46.51.174.51/moshopclient/');
        browser.ignoreSynchronization = true;


    });

    it('should show the summary page', function () {
        var link = element(by.id('stocks-nav'));

        link.click;
        var theElem= element(by.css('.text-block-title'));
        expect(theElem).toBeDefined();
        expect(browser.isElementPresent(by.css('.menu-not-logged'))).toBe(true);

    });

    it('should show the funds page', function () {
        var link = element(by.id('funds-nav'));

        link.click;
        var theElem= element(by.css('.text-block-title'));
        expect(theElem).toBeDefined();
        expect(browser.isElementPresent(by.css('.menu-not-logged'))).toBe(true);


    });

    it('should show the etf-cfd-nav page', function () {
        var link = element(by.id('etf-cfd-nav'));

        link.click;
        var theElem= element(by.css('.text-block-title'));
        expect(theElem).toBeDefined();
        expect(browser.isElementPresent(by.css('.menu-not-logged'))).toBe(true);

        });

    it('should show the futures page', function () {
        var link = element(by.id('futures-nav'));

        link.click;
        var theElem= element(by.css('.public-zone-text container ng-scope'));
        expect(theElem).toBeDefined();
        expect(browser.isElementPresent(by.css('.menu-not-logged'))).toBe(true);

        });

    it('should show the advanced page', function () {
        var link = element(by.id('advanced-nav'));

        link.click;
        var theElem= element(by.css('.text-block-title'));
        expect(theElem).toBeDefined();
        expect(browser.isElementPresent(by.css('.menu-not-logged'))).toBe(true);

        });

    it('should show the diversification page', function () {
        var link = element(by.id('diversification-nav'));

        link.click;
        var theElem= element(by.css('.text-block-title'));
        expect(theElem).toBeDefined();
        expect(browser.isElementPresent(by.css('.menu-not-logged'))).toBe(true);

        });

});


describe('The Suscriptions and prices link is ok', function() {

    beforeEach(function () {
        browser.get('http://46.51.174.51/moshopclient/');
        browser.ignoreSynchronization = true;


    });

    it('should show the prices page', function () {
        var link = element(by.id('prices-nav'));

        link.click;
        var theElem = element(by.css('.text-block-title'));
        expect(theElem).toBeDefined();
        expect(browser.isElementPresent(by.css('.menu-not-logged'))).toBe(true);

    });
     it('should show the products page', function () {
        var link = element(by.id('products-nav'));

        link.click;
        var theElem = element(by.css('.text-block-title'));
        expect(theElem).toBeDefined();
         expect(browser.isElementPresent(by.css('.menu-not-logged'))).toBe(true);

        });

    it('should show the suscription types page', function () {
        var link = element(by.id('subscription-types-nav'));

        link.click;
        var theElem = element(by.css('.text-block-title'));
        expect(theElem).toBeDefined();
        expect(browser.isElementPresent(by.css('.menu-not-logged'))).toBe(true);

    });
    it('should show the purchase page', function () {
        var link = element(by.id('purchase-nav'));

        link.click;
        var theElem = element(by.css('.text-block-title'));
        expect(theElem).toBeDefined();
        expect(browser.isElementPresent(by.css('.menu-not-logged'))).toBe(true);

     });

    it('should show the free-subscription page', function () {
        var link = element(by.id('free-subscription-nav'));

        link.click;
        var theElem = element(by.css('.text-block-title'));
        expect(theElem).toBeDefined();
        expect(browser.isElementPresent(by.css('.menu-not-logged'))).toBe(true);

    });
    it('should show the shopping-guide page', function () {
        var link = element(by.id('shopping-guide-nav'));

        link.click;
        var theElem = element(by.css('.text-block-title'));
        expect(theElem).toBeDefined();
        expect(browser.isElementPresent(by.css('.menu-not-logged'))).toBe(true);

    });


});

describe('The tools link is ok', function() {

    beforeEach(function () {
        browser.get('http://46.51.174.51/moshopclient/');
        browser.ignoreSynchronization = true;


    });

    it('should show the resources page', function () {
        var link = element(by.id('resources-nav'));

        link.click;
        var theElem = element(by.css('.public-zone-text container ng-scope'));
        expect(browser.isElementPresent(by.css('.menu-not-logged'))).toBe(true);

    });

    it('should show the articles page', function () {
        var link = element(by.id('articles-nav'));

        link.click;
        var theElem = element(by.css('.text-block-title'));
        expect(theElem).toBeDefined();
        expect(browser.isElementPresent(by.css('.menu-not-logged'))).toBe(true);

    });
    it('should show the mo-template-collections page', function () {
        var link = element(by.id('mo-template-collections-nav'));

        link.click;
        var theElem = element(by.css('.text-block-title'));
        expect(theElem).toBeDefined();
        expect(browser.isElementPresent(by.css('.menu-not-logged'))).toBe(true);

    });
});

describe('The tools link is ok', function() {

    beforeEach(function () {
        browser.get('http://46.51.174.51/moshopclient/');
        browser.ignoreSynchronization = true;


    });

    it('should show the support page', function () {
        var link = element(by.id('support-nav'));

        link.click;
        var theElem = element(by.css('.text-block-title'));
        expect(browser.isElementPresent(by.css('.menu-not-logged'))).toBe(true);

    });

    it('should show the bussines page', function () {
        var link = element(by.id('bussines-nav'));

        link.click;
        var theElem = element(by.css('.text-block-title'));
        expect(theElem).toBeDefined();
        expect(browser.isElementPresent(by.css('.menu-not-logged'))).toBe(true);

    });

    it('should show the job page', function () {
        var link = element(by.id('job-nav'));

        link.click;
        var theElem = element(by.css('.text-block-title'));
        expect(theElem).toBeDefined();
        expect(browser.isElementPresent(by.css('.menu-not-logged'))).toBe(true);

    });

    it('should show the localization page', function () {
        var link = element(by.id('localization-nav'));

        link.click;
        var theElem = element(by.css('.text-block-title'));
        expect(theElem).toBeDefined();
        expect(browser.isElementPresent(by.css('.menu-not-logged'))).toBe(true);

    });

});

describe('The free suscription link is ok', function() {

    beforeEach(function () {
        browser.get('http://46.51.174.51/moshopclient/');
        browser.ignoreSynchronization = true;


    });

    it('should show the support page', function () {
        var link = element(by.css('subscribe-free-link sign-background'));

        link.click;
        var theElem = element(by.css('.sign-text default-format-text prices-font12'));
        expect(browser.isElementPresent(by.css('.menu-not-logged'))).toBe(true);

    });
});

describe('The application link is ok', function() {

    beforeEach(function () {
        browser.get('http://46.51.174.51/moshopclient/');
        browser.ignoreSynchronization = true;


    });

    it('should show the support page', function () {
        var link = element(by.css('header-img header-size logo-header'));

        link.click;
        var theElem = element(by.css('.ng-scope'));
        expect(browser.isElementPresent(by.css('.menu-not-logged'))).toBe(true);

    });
});



