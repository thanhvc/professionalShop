/**
 * Created by laia on 11/08/14.
 */

 var url = "http://mo.devel.edosoftfactory.com";

 var Profile = function() {

    this.open = function(){
        this.element = element(by.css(".sign-background"));
    };

    this.login = function(){
        this.element.click();
        this.fields = element.all(by.css("float-right"));
        this.email = this.fields.get(0).sendKeys('laura@edosoft.es');
        this.pass = this.fields.get(1).sendKeys('prueba1');
        element(by.css('mo-button')).click();
    };

    this.loadProfile = function(){
        this.profile = element(by.css("my-account-link")).click();
    };

    this.checkTabs = function(){
        this.tabs = element.all(by.css("table-page-index"));
        this.tabsNumber = this.tabs[0].children[0].children.length;
    };

    this.checkData = function(){
        this.tabs = element.all(by.css("table-page-index"));
        this.tabsNumber = this.tabs[0].children[0].children[1].click();
        this.text = element(by.css("orange-title"));
    };

    this.checkOrders = function(){
        this.tabs = element.all(by.css("table-page-index"));
        this.tabsNumber = this.tabs[0].children[0].children[2].click();
        this.text = element(by.css("orange-title"));
    };

    this.dataOk = function(){
        this.fields = element.all(by.css("profile-input"));
        this.name = this.fields[0];
        this.surname = this.fields[1];
        this.address = this.fields[2];
        this.city = this.fields[3];
        this.code = this.fields[4];

    };

     this.emailUnable = function(){
        this.tabs = element.all(by.css("table-page-index"));
        this.tabsNumber = this.tabs[0].children[0].children[1].click();
        this.fields = element.all(by.css("profile-input"));
        this.email = this.fields[0].sendKeys('newEmail');
    };

    this.changePass = function(){
        this.tabs = element.all(by.css("table-page-index"));
        this.tabsNumber = this.tabs[0].children[0].children[1].click();
        this.fields = element.all(by.css("signup-input"));
        this.email = this.fields[0].sendKeys('newEmail');
        this.currentPass = this.fields[1].sendKeys('prueba1');
        this.newPass = this.fields[2].sendKeys('prueba12');
        this.pass = this.fields[3].sendKeys('prueba12');
    };

 };

 describe(' homepage', function() {


    var p = new Profile();
    beforeEach(function() {
        browser.get(url);
    });

    it('should open the page', function() {

        p.open();
       expect(element(by.css(".sign-background"))).toBeDefined();
    });

   /* it('should let the user be log in' ,function(){
       p.login();
       expect(element(by.css(".private-black-title")).getText().toBe("Mis Patrones"));
    });

    it('should load profile ' ,function(){
       p.loadProfile();
       expect(element(by.css(".orange-title")).getText().toBe("Identificación Personal"));
    });

    it('should have three tabs' ,function(){
       p.checkTabs();
       expect(tabsNumbers.toBe(3));
    });

    it('should a password tab' ,function(){
       p.checkData();
       expect(p.text.toBe('Cambiar Password'));
    });

    it('should an orders tab' ,function(){
       p.checkOrders();
       expect(p.text.toBe('Mis órdenes'));
    });

    it('should have data ok' ,function(){
       p.dataOk();
       expect(p.name.toBe('laura'));
       expect(p.surname.toBe('Aleman'));
       expect(p.address.toBe('La viña, 25'));
       expect(p.city.toBe('Las Palmas de GC'));
       expect(p.code.toBe('35017'));
    });

    it('should have email unable' ,function(){
       p.emailUnable();
       expect(p.email.toBe('laura@edosoft.es'));
    });*/

  });