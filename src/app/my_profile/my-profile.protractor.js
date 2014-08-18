/**
 * Created by laia on 11/08/14.
 */

var url = "http://mo.devel.edosoftfactory.com";

 var Profile = function() {

    this.open = function(){
        this.element = element(by.css("no-logged-box"));
    };

    this.loadProfile = function(){

        this.element = element(by.css(".no-logged-box"));
        this.element.click();
        this.fields = element.all(by.css(".ng-valid"));
        this.email = this.fields.get(1).sendKeys('laura@edosoft.es');
        this.pass = this.fields.get(2).sendKeys('prueba1');
        element.all(by.css('.mo-button')).get(0).click();

    };

    this.checkTabs = function(){
        this.tabs = element.all(by.css(".profile-submenu"));
    };

 };

 describe(' homepage', function() {
     var ptor= protractor.getInstance();
     var p = new Profile();

    beforeEach(function() {
        ptor.driver.get(url);
        ptor.ignoreSynchronization = true;
        ptor.sleep(1000) ;
    });

   it('should open the page', function() {
        p.open();
        expect(element(by.css(".sign-background"))).toBeDefined();

    });

    it('should load profile ' ,function(){

        p.loadProfile();
        ptor.driver.get(url + '/profile#top');
        ptor.ignoreSynchronization = true;

    });

    it('should have three tabs' ,function(){
        ptor.driver.get(url + '/profile#top');
        ptor.ignoreSynchronization = true;
        p.checkTabs();
        p.tabs.count().then(function(res){
            expect(res).toBe(3);
        })
        expect(p.tabs.get(0).getText()).toBe('Identificación personal');
        expect(p.tabs.get(1).getText()).toBe('Datos de acceso');
        expect(p.tabs.get(2).getText()).toBe('Mis órdenes');

      });
  });