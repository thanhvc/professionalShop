/**
 * Created by laia on 4/06/14.
 */

describe('The signup menu is ok', function(){

    beforeEach(function () {
        browser.get('http://46.51.174.51/moshopclient/#/sign-up');
        browser.ignoreSynchronization = true;
    });

    it('should have 4 inputs', function () {

        var items = element.all(by.css('.signup-input'));
        expect(items.count()).toBe(4);

        var input1 = items.get(0);

        input1.getAttribute('type').then(function(result) {
            expect(result).toBe('email');
        });

        var input2 =  items.get(1);
        input2.getAttribute('type').then(function(result) {
            expect(result).toBe('email');
        });

        var input3 = items.get(2);
        input3.getAttribute('type').then(function(result) {
            expect(result).toBe('password');
        });

        var input4 = items.last();
        input4.getAttribute('type').then(function(result) {
            expect(result).toBe('password');
        });

    });

    it('should have identical emails', function(){

         var inputs = element.all(by.css('.signup-input'));
         var input1 = inputs.first();
         var input2 = inputs.get(1);

         input1.sendKeys('user@gmail.com');
         input2.sendKeys('user@gmail.com');
         expect(input1.getAttribute('value')).toBe((input2).getAttribute('value'));
     });



    it('should have the correct format', function(){

         var input1 = element(by.css('.signup-input'));
         input1.sendKeys('user@gmail.com');

         var matcher = new RegExp('[\b[a-z0-9._%+-]+@[a-z0-9.-]+\/.[a-z]b.]');
         matcher.test(input1.getAttribute('value'));


     });

    it('should have identical passwords', function(){

        var items = element.all(by.css('.signup-input'));
        var input3 = items.get(2);
        var input4 = items.last();
        input3.sendKeys('password');
        input4.sendKeys('password');
        expect(input3.getAttribute('value')).toBe(input4.getAttribute('value'));

    });

    it('should have at least 8 characters', function(){

        var items = element.all(by.css('.signup-input'));
        var input3 = items.get(2);
        input3.sendKeys('pass');

        var error = element.all(by.css('.red-color-form'));
        error = error.get(2);
        expect(error.getText()).toBeDefined();
    });

    it('should be alphanumerics', function(){

        var items = element.all(by.css('.signup-input'));
        var input3 = items.get(2);
        input3.sendKeys('***');
        var error = element.all(by.css('.red-color-form'));
        error = error.get(2);
        expect(error.getText()).toBeDefined();

    });
});


describe('The signup step 2 is ok', function() {

    beforeEach(function () {
        browser.get('http://46.51.174.51/moshopclient/#/sign-up-step2');
        browser.ignoreSynchronization = true;
    });
    it('should have a valid name', function(){
        var items = element.all(by.css('.signup-input'));
        var input1 = items.get(1);
        input1.sendKeys('nameUser*');

        var error = element(by.css('.text-warning-form'));
        expect(error.getText()).toBeDefined();

    });

    it('should have a valid surname', function(){

        var items = element.all(by.css('.signup-input'));
        var surname = items.get(1);
        surname.sendKeys('surnameUser*');
        var error = element(by.css('.text-warning-form'));
        expect(error.getText()).toBeDefined();


    });

    it('should have an address field with less than 200 characters', function(){

        var items = element.all(by.css('.signup-input'));
        var add = items.get(2);
        add.sendKeys('userAddress');

        var error = element.all(by.css('.text-warning-form'));
        var invalid = error.get(1);
        expect(invalid.getText()).toBe('');

    });

    it('should have a valid city', function(){

        var items = element.all(by.css('.signup-input'));
        var city = items.get(3);
        city.sendKeys('userCity');

        var error = element.all(by.css('.text-warning-form'));
        var invalid = error.get(1);
        expect(invalid.getText()).toBe('');


    });

    it('should have a country selected', function() {

        var country = element(by.css('.signup-select'));
        country.sendKeys('Albania');
        country.getAttribute('value').then(function(result){
            expect(result).toBe('1');
        });

    });
    it('should have a captcha selected', function() {

        var items = element.all(by.css('.signup-input'));
        var captcha = items.get(5);
        captcha.sendKeys('4');
        expect(captcha.getAttribute('value')).toBe('4');

    });

    it('should have a postal code', function() {

        var items = element.all(by.css('.signup-input'));
        var postal = items.get(4);
        postal.sendKeys('userPostalCode');
        var error = element.all(by.css('.text-warning-form'));
        var invalid = error.get(1);
        expect(invalid.getText()).toBe('');

    });

    it('should have the conditions accepted', function() {
        var error = element.all(by.css('.text-warning-form'));
        var conditions = error.last();
        expect(conditions.getText()).toBeDefined();

    });


});