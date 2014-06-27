/**
 * Created by laia on 4/06/14.
 */

var Cart = function () {

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
        browser.get('http://mo.devel.edosoftfactory.com');
        browser.ignoreSynchronization = true;
    };

    this.checkCart = function () {

        element(by.repeater('pack in homeTablePack.americaContent track by $index').row(0)).click();
        element(by.id("purchase-button")).click();
    };

    this.buyingMore = function () {
        element(by.repeater('pack in homeTablePack.americaContent track by $index'));//.row(0);//.click());
        //element.all(by.css('pack in homeTablePack.americaContent track by $index')).get(0).click();//.row(0);//.click());

        element(by.id("purchase-button")).click();
        var button = element.all(by.css(".mo-button"));
        button.get(1).click();

        var icon = element(by.css('.icon-cart')).click();
    };

    this.correctItemsNumber = function () {
        element(by.repeater('pack in homeTablePack.americaContent track by $index').row(0)).click();
        element(by.id("purchase-button")).click();
        browser.get('http://mo.devel.edosoftfactory.com');
        element(by.repeater('pack in homeTablePack.americaContent track by $index').row(2)).click();
        element(by.id("purchase-button")).click();
    };

    this.correctSum = function () {
        element(by.repeater('pack in homeTablePack.americaContent track by $index'));//.row(0)).click();
        element(by.id("purchase-button")).click();

        this.subtotal.getText().then(function (result) {
            this.subtotal2 = result.substring(6, 12);

        });
        this.total.getText().then(function (result) {
            this.total2 = result;//.substring(6,12);

        });
    };
};


describe('The cart functionality is corret', function () {

    var c = new Cart();

    it('should appear the cart', function () {
        c.open();
        c.checkCart();
        expect(browser.isElementPresent(by.css('.shopping-cart-summary'))).toBe(true);
    });

    it('should disappear when buying more', function () {
        // c.open();
        c.buyingMore();
        expect(browser.isElementPresent(by.css('.hide-summary-cart'))).toBe(true);

    });


    it('should the correct number of elements in the icon ', function () {

        c.open();
        c.correctItemsNumber();
        var anumber = element(by.binding('numItemsCart'));
        var theValue;
        anumber.getText().then(function (aValueStr) {
            theValue = Number(aValueStr);
            expect(theValue).toBe(1);
        });

    });

    it('should have the correct sum', function () {
        // c.open();
        c.correctSum();
        expect(c.subtotal2).toBe(c.total2);

    });
});