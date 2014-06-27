
 /** LoginPage.js */
 var LoginPage = function() {

     // All relevant elements
     this.logBox = element(by.css('.no-logged-box'));
     this.signup = element(by.css('.sign-in-box'));
     this.free = element(by.css('.subscribe-free-link'));
     this.link = element(by.id('market-observatory-nav'));
     this.link1 = element(by.id('organization-nav'));

     this.open = function () {
         // Goto the login page
         browser.get('http://46.51.174.51/moshopclient/#');
         browser.ignoreSynchronization = true;
     };

     this.login = function (logBox) {
         this.logBox.click();
     };

     this.checkFadeIn = function () {
         this.logBox.click();
     };


     this.checkFadeOut = function () {

         this.logBox.click();
         this.free.click();
     };

    this.checkOrganizationLink = function () {
        this.link.click();

        this.link1.click();
     };

     this.checkKeepTheSubmenu = function () {
         this.link = element(by.id('what-is-and-what-is-not-nav'));

         this.link.click();


     };

     this.checkShouldShowThPage = function () {
         this.link = element(by.id('what-is-and-what-is-not-nav'));
         this.link.click();
     };
     this.shouldShowTheConditionsPage = function () {
         this.link = element(by.id('service-conditions-nav'));

         this.link.click();
         this.theElem = element(by.css('.public-zone-text'));
     };

     this.shouldShowTheDataProtectionPage = function () {
         this.link = element(by.id('data-protection-nav'));
         this.link.click();
         this.theElem = element(by.css('.public-zone-text container ng-scope'));

     };

     this.shouldShowTheSummary = function () {
         this.link1 = element(by.id('services-nav'));
         this.link1.click();
         this.link = element(by.id('summary-nav'));
         this.link.click();
         this.theElem= element(by.css('.submenu-content ng-scope'));

     };
     this.shouldShowTheProductsAndExchanges  = function () {
         this.link = element(by.id('products-and-exchanges-nav'));
         this.link.click();
         this.theElem = element(by.css('.public-zone-text container ng-scope'));

     };
     this.shouldShowTheDetailedDescription = function () {
         this.link = element(by.id('detailed-description-nav'));
         this.link.click();
         this.theElem= element(by.css('.public-zone-text container ng-scope'));


     };

     this.shouldShowTheFundamentals = function () {
         this.link = element(by.id('fundamentals-nav'));
         this.link.click();
         this.theElem= element(by.css('.public-zone-text container ng-scope'));


     };
     this.shouldShowTheAction = function () {
         this.menu = element(by.id('service-applications-nav'));
         this.menu.click();
         this.link = element(by.id('stocks-nav'));
         this.link.click();
         this.theElem= element(by.css('.text-block-title'));

     };

     this.shouldShowTheFunds = function () {
         this.link = element(by.id('funds-nav'));

         this.link.click();
         this.theElem= element(by.css('.text-block-title'));

     };

     this.shouldShowTheEtfCfdNav = function () {
         this.link = element(by.id('etf-cfd-nav'));

         this.link.click();
         this.theElem= element(by.css('.text-block-title'));


     };
     this.shouldShowTheFutures = function () {
         this.link = element(by.id('futures-nav'));

         this.link.click();
         this.theElem= element(by.css('.public-zone-text container ng-scope'));

     };

     this.shouldShowTheAdvanced = function () {
         this.link = element(by.id('advanced-nav'));
         this.link.click();
         this.theElem= element(by.css('.text-block-title'));
     };

     this.shouldShowTheDiversification = function () {
         this.link = element(by.id('diversification-nav'));

         this.link.click();
         this.theElem= element(by.css('.text-block-title'));


     };
     this.shouldShowThePrices = function () {

         element(by.id('subscriptions-and-prices-nav')).click();
         this.link = element(by.id('prices-nav'));

         this.link.click();
         this.theElem = element(by.css('.text-block-title'));

     };
     this.shouldShowTheProducts = function () {
         this.link = element(by.id('products-nav'));

         this.link.click();
         this.theElem = element(by.css('.text-block-title'));

     };

     this.shouldShowTheSubscriptionTypes = function () {
         this.link = element(by.id('subscription-types-nav'));

         this.link.click();
         this.theElem = element(by.css('.text-block-title'));


     };
     this.shouldShowThePurchase = function () {
         this.link = element(by.id('purchase-nav'));
         this.link.click();
         this.theElem = element(by.css('.text-block-title'));


     };

     this.shouldShowTheFreeSubscription = function () {
         this.link = element(by.id('free-subscription-nav'));

         this.link.click();
         this.theElem = element(by.css('.text-block-title'));

     };
     this.shouldShowTheShoppingGuide = function () {
         this.link = element(by.id('shopping-guide-nav'));

         this.link.click();
         this.theElem = element(by.css('.text-block-title'));


     };


     this.shouldShowTheResources = function () {
         element(by.id('investor-tools-nav')).click();
         this.link = element(by.id('resources-nav'));
         this.link.click();
         this.theElem = element(by.css('.public-zone-text container ng-scope'));

     };

     this.shouldShowTheArticles = function () {
         this.link = element(by.id('articles-nav'));

         this.link.click();
         this.theElem = element(by.css('.text-block-title'));


     };

     this.shouldShowTheSymbols = function(){

         this.link = element(by.id('symbols-and-exchanges-nav'));
         this.link.click();
         this.theElem = element(by.css('.text-block-title'));

     };
     this.shouldshowthemotemplatecollections = function () {
         this.link = element(by.id('mo-template-collections-nav'));

         this.link.click();
         this.theElem = element(by.css('.text-block-title'));


     };

     this.shouldshowthesupport = function () {

         element(by.id('contact-nav')).click();
         this.link = element(by.id('support-nav'));
         this.link.click();


     };

     this.shouldshowthebussines = function () {
         this.link = element(by.id('business-nav'));
         this.link.click();
         this.theElem = element(by.css('.text-block-title'));


     };

     this.shouldshowthejob = function () {
         this.link = element(by.id('job-nav'));

         this.link.click();
         this.theElem = element(by.css('.text-block-title'));


     };

     this.shouldshowthelocalization = function () {
         this.link = element(by.id('localization-nav'));

         this.link.click();
         this.theElem = element(by.css('.text-block-title'));


     };

 };

 describe(' homepage', function() {

     var angularHomepage = new LoginPage();

     it('should open the page', function() {
         angularHomepage.open();
         angularHomepage.login();

         angularHomepage.checkFadeIn();

         angularHomepage.checkFadeOut();


     });

     it('should go to the organization link', function () {

         angularHomepage.checkOrganizationLink();
         expect(browser.isElementPresent(by.css('.orange-title'))).toBe(true);
         expect(browser.isElementPresent(by.css('.menu-not-logged'))).toBe(true);

         angularHomepage.checkKeepTheSubmenu();
         expect(browser.isElementPresent(by.id('what-is-and-what-is-not-nav'))).toBe(true);
         expect(browser.isElementPresent(by.css('.menu-not-logged'))).toBe(true);


         angularHomepage.checkShouldShowThPage();
         expect(browser.isElementPresent(by.css('.menu-not-logged'))).toBe(true);
         expect(element(by.css('.text-block-title'))).toBeDefined();


         angularHomepage.shouldShowTheConditionsPage();
         expect(browser.isElementPresent(by.css('.menu-not-logged'))).toBe(true);
         expect(angularHomepage.theElem).toBeDefined();

         angularHomepage.shouldShowTheDataProtectionPage();
         expect(browser.isElementPresent(by.css('.menu-not-logged'))).toBe(true);
         expect(angularHomepage.theElem).toBeDefined();

         angularHomepage.shouldShowTheSummary();
         expect(angularHomepage.theElem).toBeDefined();
         expect(browser.isElementPresent(by.css('.menu-not-logged'))).toBe(true);

         angularHomepage.shouldShowTheProductsAndExchanges();
         expect(angularHomepage.theElem).toBeDefined();
         expect(browser.isElementPresent(by.css('.menu-not-logged'))).toBe(true);

         angularHomepage.shouldShowTheDetailedDescription();
         expect(angularHomepage.theElem).toBeDefined();
         expect(browser.isElementPresent(by.css('.menu-not-logged'))).toBe(true);

         angularHomepage.shouldShowTheFundamentals();
         expect(angularHomepage.theElem).toBeDefined();
         expect(browser.isElementPresent(by.css('.menu-not-logged'))).toBe(true);

         angularHomepage.shouldShowTheAction();
         expect(angularHomepage.theElem).toBeDefined();
         expect(browser.isElementPresent(by.css('.menu-not-logged'))).toBe(true);


         angularHomepage.shouldShowTheFunds();
         expect(angularHomepage.theElem).toBeDefined();
         expect(browser.isElementPresent(by.css('.menu-not-logged'))).toBe(true);

         angularHomepage.shouldShowTheEtfCfdNav();
         expect(angularHomepage.theElem).toBeDefined();
         expect(browser.isElementPresent(by.css('.menu-not-logged'))).toBe(true);

         angularHomepage.shouldShowTheFutures();
         expect(angularHomepage.theElem).toBeDefined();
         expect(browser.isElementPresent(by.css('.menu-not-logged'))).toBe(true);

         angularHomepage.shouldShowTheAdvanced();
         expect(angularHomepage.theElem).toBeDefined();
         expect(browser.isElementPresent(by.css('.menu-not-logged'))).toBe(true);

         angularHomepage.shouldShowTheDiversification();
         expect(angularHomepage.theElem).toBeDefined();
         expect(browser.isElementPresent(by.css('.menu-not-logged'))).toBe(true);


         angularHomepage.shouldShowThePrices();
         expect(angularHomepage.theElem).toBeDefined();
         expect(browser.isElementPresent(by.css('.menu-not-logged'))).toBe(true);

         angularHomepage.shouldShowTheProducts();
         expect(angularHomepage.theElem).toBeDefined();
         expect(browser.isElementPresent(by.css('.menu-not-logged'))).toBe(true);

         angularHomepage.shouldShowTheSubscriptionTypes();
         expect(angularHomepage.theElem).toBeDefined();
         expect(browser.isElementPresent(by.css('.menu-not-logged'))).toBe(true);

         angularHomepage.shouldShowThePurchase();
         expect(angularHomepage.theElem).toBeDefined();
         expect(browser.isElementPresent(by.css('.menu-not-logged'))).toBe(true);

         angularHomepage.shouldShowTheFreeSubscription();
         expect(angularHomepage.theElem).toBeDefined();
         expect(browser.isElementPresent(by.css('.menu-not-logged'))).toBe(true);

         angularHomepage.shouldShowTheShoppingGuide();
         expect(angularHomepage.theElem).toBeDefined();
         expect(browser.isElementPresent(by.css('.menu-not-logged'))).toBe(true);


         angularHomepage.shouldShowTheResources();
         expect(browser.isElementPresent(by.css('.menu-not-logged'))).toBe(true);

         angularHomepage.shouldShowTheArticles();
         expect(angularHomepage.theElem).toBeDefined();
         expect(browser.isElementPresent(by.css('.menu-not-logged'))).toBe(true);


         angularHomepage.shouldshowthemotemplatecollections();
         expect(angularHomepage.theElem).toBeDefined();
         expect(browser.isElementPresent(by.css('.menu-not-logged'))).toBe(true);


         angularHomepage.shouldShowTheSymbols();
         expect(angularHomepage.theElem).toBeDefined();

         angularHomepage.shouldshowthesupport();
         expect(browser.isElementPresent(by.css('.menu-not-logged'))).toBe(true);

         angularHomepage.shouldshowthebussines();
         expect(angularHomepage.theElem).toBeDefined();
         expect(browser.isElementPresent(by.css('.menu-not-logged'))).toBe(true);

         angularHomepage.shouldshowthejob();
         expect(angularHomepage.theElem).toBeDefined();
         expect(browser.isElementPresent(by.css('.menu-not-logged'))).toBe(true);

         angularHomepage.shouldshowthelocalization();
         expect(angularHomepage.theElem).toBeDefined();
         expect(browser.isElementPresent(by.css('.menu-not-logged'))).toBe(true);

     });

 });
