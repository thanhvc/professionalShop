/**
 * Created by laia on 4/06/14.
 */

/* The signup menu is correct*/


var SigunMenu = function() {

    // All relevant elements
    this.items = element.all(by.css('.signup-input'));
    this.input1 = this.items.first();
    this.input2 = this.items.get(1);
    this.input3 = this.items.get(2);
    this.input4 = this.items.last();
    this.error = element.all(by.css('.red-color-form')).get(2);

    this.open = function() {
        // Goto the login page
        browser.get('http://46.51.174.51/moshopclient/#/sign-up');
    }

    this.checkIdenticalInputs = function(){

        this.input1.getAttribute('value').sendKeys('userEmail');
        this.input2.getAttribute('value').sendKeys('userEmail');
        this.input3.getAttribute('value').sendKeys('userpass');
        this.input4.getAttribute('value').sendKeys('userpass');
    }


    this.checkCorrectFormat = function(){
        this.matcher = new RegExp('[\b[a-z0-9._%+-]+@[a-z0-9.-]+\/.[a-z]b.]');

    }

    this.checkAtLeastEightCharacters = function(){
        this.input3.sendKeys('pass');

    }

    this.checkIfAlphanumeris = function(){
        this.input3.sendKeys('***');
        
    }

}
describe('signupMenu', function(){

    var sMenu = new SigunMenu();

    it('should open the page', function() {

        sMenu.open();
        expect(sMenu.items.count()).toBe(4);
        expect(sMenu.input1.getAttribute('type')).toBe('email');
        expect(sMenu.input2.getAttribute('type')).toBe('email');
        expect(sMenu.input3.getAttribute('type')).toBe('password');
        expect(sMenu.input4.getAttribute('type')).toBe('password');

    });

    it(' should have Identical Inputs' , function(){

        sMenu.checkIdenticalInputs();
        expect(sMenu.input1.getAttribute('value')).toBe(sMenu.input2.getAttribute('value'));
        expect(sMenu.input3.getAttribute('value')).toBe(sMenu.input4.getAttribute('value'));
    });

    it('should have the correct format', function(){
        sMenu.checkCorrectFormat();
        sMenu.matcher.test(sMenu.input1.getAttribute('value'));

    });

    it('should have at least 8 characters', function(){

        sMenu.checkAtLeastEightCharacters();
        expect(sMenu.error.getText()).toBeDefined();
    });

    it('should be alphanumeric',function(){
        sMenu.checkIfAlphanumeris();
        expect(sMenu.error.getText()).toBeDefined();
    });

})




var SignupMenuStep2 = function() {

    // All relevant elements
    this.items = element.all(by.css('.signup-input'));
    this.input1 = this.items.first();
    this.input2 = this.items.get(1);
    this.input3 = this.items.get(2);
    this.input4 = this.items.get(3);
    this.input6 = this.items.get(5);
    this.country = element(by.css('.signup-select'));
    this.errorI = element.all(by.css('text-warning-form'));

    this.open = function () {
        browser.get('http://46.51.174.51/moshopclient/#/sign-up-step2');
        browser.ignoreSynchronization = true;
    }

    this.checkValidName = function () {
        this.input1.sendKeys('nameUser*');

    }
    this.checkValidSurname = function () {
        this.input2.sendKeys('surnameUser*');
    }
    this.checkCorrectAddressField = function(){
        this.input3.sendKeys('userAddress');

    }
    this.checkValidCity = function(){
        this.input4.sendKeys('userCity');
    }
    this.checkCountrySelected = function(){
         this.country.sendKeys('Albania');

    }
    this.checkCaptchaSelected = function(){
        this.input6.sendKeys('4');

    }
    this.checkPostalCode = function(){
        this.input4.sendKeys('userPostalCode');

    }
    this.checkConditionsAceppted = function(){
        var conditions = error.last();
        expect(conditions.getText()).toBeDefined();
    }
}

describe('Signup step2 should work', function(){

    var sMenu2 = new SignupMenuStep2();


    it('should have a valid name',function(){

        sMenu2.open();

        sMenu2.checkValidName();
        expect(sMenu2.errorI.first()).toBeDefined();
    });

    it('should have a valid surname',function(){

        sMenu2.checkValidSurname();
        expect(sMenu2.errorI.get(1)).toBeDefined();
    });

    it('should have a valid address',function(){

        sMenu2.checkCorrectAddressField();
        expect(sMenu2.errorI.get(1)).toBe(null);
    });

    it('should have a valid city',function(){

        sMenu2.checkValidCity();
        expect(sMenu2.errorI.get(1)).toBe(null);
    });

    it('should have a country selected', function(){

        sMenu2.checkCountrySelected();
        sMenu2.country.getAttribute('value').then(function(result) {
            expect(result).toBe('1');
        });


    });

    it('should have a  valid captcha', function(){

        sMenu2.checkCaptchaSelected();
        expect(sMenu2.input6.getAttribute('value')).toBe('4');

    });

    it('should have a postal code', function(){

        sMenu2.checkPostalCode();
        expect(sMenu2.errorI.get(1)).toBe(null);
    });




})