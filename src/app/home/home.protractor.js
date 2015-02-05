
var url = 'http://marketobservatory.com/';

 /** LoginPage.js */
 var LoginPage = function() {

     // All relevant elements
     this.logBox = element(by.css('.no-logged-box'));
     this.signup = element(by.css('.sign-in-box'));
     this.free = element(by.css('.subscribe-free-link'));
     this.link = element(by.id('market-observatory-nav'));
     this.link1 = element(by.id('organization-nav'));
     this.link1 = element(by.id('organization-nav'));

     this.open = function () {
         // Goto the login page
         browser.get(url);
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

         element(by.id('market-observatory-nav')).click();
         this.link = element(by.id('what-is-and-what-is-not-nav'));
         this.link.click();

     };

     this.checkShouldShowThePage = function () {
         element(by.id('market-observatory-nav')).click();
         this.link = element(by.id('service-conditions-nav'));
         this.link.click();
     };
     this.shouldShowTheConditionsPage = function () {

         element(by.id('market-observatory-nav')).click();
         this.link = element(by.id('service-conditions-nav'));
         this.link.click();
         this.theElem = element(by.css('.public-zone-text'));
     };

     this.shouldShowTheDataProtectionPage = function () {
         element(by.id('market-observatory-nav')).click();
         this.link = element(by.id('data-protection-nav')).click();
         this.theElem = element(by.css('.public-zone-text container ng-scope'));
     };

     this.shouldShowTheSummary = function () {
         this.link1 = element(by.id('services-nav')).click();
         this.link = element(by.id('summary-nav'));
         this.link.click();

     };
     this.shouldShowTheProductsAndExchanges  = function () {
         this.link1 = element(by.id('services-nav')).click();
         this.link = element(by.id('products-and-exchanges-nav'));
         this.link.click();

     };
     this.shouldShowTheDetailedDescription = function () {
         this.link1 = element(by.id('services-nav')).click();
         this.link = element(by.id('detailed-description-nav'));
         this.link.click();

     };

     this.shouldShowTheFundamentals = function () {
         this.link1 = element(by.id('services-nav')).click();
         this.link = element(by.id('fundamentals-nav'));
         this.link.click();


     };
     this.shouldShowTheAction = function () {
         this.menu = element(by.id('service-applications-nav'));
         this.menu.click();
         this.link = element(by.id('stocks-nav'));
         this.link.click();


     };

     this.shouldShowTheFunds = function () {

         this.menu = element(by.id('service-applications-nav')).click();
         this.link = element(by.id('funds-nav'));
         this.link.click();

     };

     this.shouldShowTheEtfCfdNav = function () {
         element(by.id('service-applications-nav')).click();
         this.link = element(by.id('etf-cfd-nav')).click();

     };

      this.shouldShowThePairs = function () {
         element(by.id('service-applications-nav')).click();
         this.link = element(by.id('pairs-nav')).click();

     };
     this.shouldShowTheFutures = function () {
         element(by.id('service-applications-nav')).click();
         this.link = element(by.id('futures-nav')).click();

     };

     this.shouldShowTheAdvanced = function () {
         element(by.id('service-applications-nav')).click();
         this.link = element(by.id('advanced-nav')).click();

     };

     this.shouldShowTheDiversification = function () {
         element(by.id('service-applications-nav')).click();
         this.link = element(by.id('diversification-nav')).click();

     };
     this.shouldShowThePrices = function () {

         element(by.id('subscriptions-and-prices-nav')).click();
         this.link = element(by.id('prices-nav')).click();

     };
     this.shouldShowTheProducts = function () {
         element(by.id('subscriptions-and-prices-nav')).click();
         this.link = element(by.id('products-nav'));
         this.link.click();

     };

     this.shouldShowTheSubscriptionTypes = function () {
         element(by.id('subscriptions-and-prices-nav')).click();
         this.link = element(by.id('subscription-types-nav'));
         this.link.click();

     };
     this.shouldShowThePurchase = function () {
         element(by.id('subscriptions-and-prices-nav')).click();
         this.link = element(by.id('purchase-nav'));
         this.link.click();

     };

     this.shouldShowTheFreeSubscription = function () {
         element(by.id('subscriptions-and-prices-nav')).click();
         this.link = element(by.id('free-subscription-nav')).click();

     };
     this.shouldShowTheShoppingGuide = function () {
         element(by.id('subscriptions-and-prices-nav')).click();
         this.link = element(by.id('shopping-guide-nav')).click();

     };

     this.shouldShowTheResources = function () {
         element(by.id('investor-tools-nav')).click();
         element(by.id('resources-nav')).click();

     };

     this.shouldShowTheArticles = function () {
         element(by.id('investor-tools-nav')).click();
         this.link = element(by.id('articles-nav')).click();

     };

     this.shouldShowTheSymbols = function(){
         element(by.id('investor-tools-nav')).click();
         this.link = element(by.id('symbols-and-exchanges-nav')).click();


     };
     this.shouldshowthemotemplatecollections = function () {
         element(by.id('investor-tools-nav')).click();
         this.link = element(by.id('mo-template-collections-nav'));
         this.link.click();
     };

     this.shouldshowthesupport = function () {

         element(by.id('contact-nav')).click();
         element(by.id('support-nav')).click();

     };

     this.shouldshowthebussines = function () {
         element(by.id('contact-nav')).click();
         element(by.id('business-nav')).click();

     };

     this.shouldshowthejob = function () {
         element(by.id('contact-nav')).click();
         this.link = element(by.id('job-nav')).click();

     };

     this.shouldshowthelocalization = function () {

         element(by.id('contact-nav')).click();
         this.link = element(by.id('localization-nav')).click();
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
         expect(browser.isElementPresent(by.css('.text-block-title'))).toBeDefined();


         angularHomepage.checkKeepTheSubmenu();
         expect(browser.isElementPresent(by.css('.text-block-title'))).toBeDefined();

         angularHomepage.shouldShowTheConditionsPage();
         expect(browser.isElementPresent(by.css('.text-block-title'))).toBeDefined();
         expect(angularHomepage.theElem).toBeDefined();

         angularHomepage.shouldShowTheDataProtectionPage();
         expect(browser.isElementPresent(by.css('.menu-not-logged'))).toBe(true);
         expect(angularHomepage.theElem).toBeDefined();


         angularHomepage.shouldShowTheSummary();
         expect(browser.isElementPresent(by.css('.text-block-title'))).toBeDefined();


         angularHomepage.shouldShowTheProductsAndExchanges();
         expect(browser.isElementPresent(by.css('.text-block-title'))).toBeDefined();


         angularHomepage.shouldShowTheDetailedDescription();
         expect(browser.isElementPresent(by.css('.text-block-title'))).toBeDefined();


         angularHomepage.shouldShowTheFundamentals();
         expect(browser.isElementPresent(by.css('.text-block-title'))).toBeDefined();

         angularHomepage.shouldShowTheAction();
         expect(browser.isElementPresent(by.css('.text-block-title'))).toBeDefined();

         angularHomepage.shouldShowTheFunds();
         expect(browser.isElementPresent(by.css('.text-block-title'))).toBeDefined();

         angularHomepage.shouldShowTheEtfCfdNav();
         expect(browser.isElementPresent(by.css('.text-block-title'))).toBeDefined();

         angularHomepage.shouldShowTheFutures();
         expect(browser.isElementPresent(by.css('.text-block-title'))).toBeDefined();

         angularHomepage.shouldShowThePairs();
         expect(browser.isElementPresent(by.css('.text-block-title'))).toBeDefined();

         angularHomepage.shouldShowTheAdvanced();
         expect(browser.isElementPresent(by.css('.text-block-title'))).toBeDefined();

         angularHomepage.shouldShowTheDiversification();
         expect(browser.isElementPresent(by.css('.text-block-title'))).toBeDefined();

         angularHomepage.shouldShowThePrices();
         expect(browser.isElementPresent(by.css('.text-block-title'))).toBeDefined();

         angularHomepage.shouldShowTheProducts();
         expect(browser.isElementPresent(by.css('.text-block-title'))).toBeDefined();

         angularHomepage.shouldShowTheSubscriptionTypes();
         expect(browser.isElementPresent(by.css('.text-block-title'))).toBeDefined();

         angularHomepage.shouldShowThePurchase();
         expect(browser.isElementPresent(by.css('.text-block-title'))).toBeDefined();

         angularHomepage.shouldShowTheFreeSubscription();
         expect(browser.isElementPresent(by.css('.text-block-title'))).toBeDefined();

         angularHomepage.shouldShowTheShoppingGuide();
         expect(browser.isElementPresent(by.css('.text-block-title'))).toBeDefined();

         angularHomepage.shouldShowTheResources();
         expect(browser.isElementPresent(by.css('.text-block-title'))).toBeDefined();

         angularHomepage.shouldShowTheArticles();
         expect(browser.isElementPresent(by.css('.text-block-title'))).toBeDefined();

         angularHomepage.shouldshowthemotemplatecollections();
         expect(browser.isElementPresent(by.css('.text-block-title'))).toBeDefined();

         angularHomepage.shouldShowTheSymbols();
         expect(browser.isElementPresent(by.css('.text-block-title'))).toBeDefined();

         angularHomepage.shouldshowthesupport();
         expect(browser.isElementPresent(by.css('.text-block-title'))).toBeDefined();

         angularHomepage.shouldshowthebussines();
         expect(browser.isElementPresent(by.css('.text-block-title'))).toBeDefined();

         angularHomepage.shouldshowthejob();
         expect(browser.isElementPresent(by.css('.text-block-title'))).toBeDefined();

         angularHomepage.shouldshowthelocalization();
         expect(browser.isElementPresent(by.css('.text-block-title'))).toBeDefined();

     });

 });
