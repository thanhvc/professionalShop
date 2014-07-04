/**
 * Created by laia on 4/06/14.
 */

var Cart = function() {

    // All relevant elements
    this.items = element.all(by.css('.signup-input'));
    this.input1 = this.items.first();
    this.input2 = this.items.get(1);
    this.input3 = this.items.get(2);
    this.input4 = this.items.last();
    this.error = element.all(by.css('.red-color-form')).get(2);

    this.subtotal = element(by.binding('totalCart'));
    this.total = element(by.binding('subtotalFutures'));


    this.subtotal2 = 0;
    this.total2 = 0;

    this.open = function () {

        browser.get('http://api.mo.devel.edosoftfactory.com/#/catalog/1');
        browser.ignoreSynchronization = true;
    };

    this.checkCart = function () {

        element(by.css('.mo-button')).click();
    };

    this.buyingMore = function(){
        element.all(by.css('ng-binding')).get(0);
        this.button = element(by.css('.mo-button'));
        this.button.click();

        this.button = element(by.css('.buttons-cart-container .mo-button'));//.click();
        this.button.click();
        var icon = element(by.css('.icon-cart')).click();
    };

    this.correctItemsNumber = function(){
        element.all(by.css('ng-binding')).get(0);
        element(by.id("purchase-button")).click();

          browser.get('http://api.mo.devel.edosoftfactory.com/#/catalog/1');
    };

    this.correctSum = function(){
        element(by.repeater('pack in homeTablePack.americaContent track by $index'));
        element(by.css(".purchase-button")).click();

        this.subtotal.getText().then(function(result){
           this.subtotal2 = result.substring(6,12);

        });
        this.total.getText().then(function(result){
            this.total2 = result;//.substring(6,12);

        });
    };
};


describe('The cart functionality is correct', function() {

    var c = new Cart();

 /*   it('should appear the cart', function () {
        c.open();
        c.checkCart();
        expect(browser.isElementPresent(by.css('.shopping-cart-summary'))).toBe(true);
    });

    it('should disappear when buying more', function(){

        c.buyingMore();
        expect(browser.isElementPresent(by.css('.hide-summary-cart'))).toBe(true);

    });


    it('should the correct number of elements in the icon ', function(){

        c.open();
        c.correctItemsNumber();
        var anumber = element(by.css('.icon-cart'));
        var theValue;
        anumber.getText().then(function(aValueStr){
            theValue = Number(aValueStr);
            expect(theValue).toBe(0);
        });

    });

    it('should have the correct sum', function(){

        c.correctSum();
        expect(c.subtotal2).toBe(c.total2);

    });*/
});