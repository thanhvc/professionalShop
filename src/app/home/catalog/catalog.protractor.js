/**
 * Created by laia on 4/06/14.
 */

describe('The cart functionality is corret', function() {

    beforeEach(function () {
        browser.get('http://46.51.174.51/moshopclient');
        browser.ignoreSynchronization = true;
    });


    it('should appear the cart', function () {

        element(by.repeater('pack in homeTablePack.americaContent track by $index').row(0)).click();

        element(by.id("purchase-button")).click();
        expect(browser.isElementPresent(by.css('.shopping-cart-summary'))).toBe(true);
    });

    it('should disappear when buying more', function(){

        element(by.repeater('pack in homeTablePack.americaContent track by $index').row(0)).click();

        element(by.id("purchase-button")).click();
        var button = element.all(by.css(".mo-button"));
        button.get(1).click();

        var icon = element(by.css('.icon-cart')).click();

        expect(browser.isElementPresent(by.css('.hide-summary-cart'))).toBe(true);

    });

    it('should the correct number of elements in the icon ', function(){

        browser.get('http://46.51.174.51/moshopclient');

        element(by.repeater('pack in homeTablePack.americaContent track by $index').row(0)).click();
        element(by.id("purchase-button")).click();
        browser.get('http://46.51.174.51/moshopclient');
        element(by.repeater('pack in homeTablePack.americaContent track by $index').row(2)).click();
        element(by.id("purchase-button")).click();

        var anumber = element(by.binding('numItemsCart'));
        var theValue;
        anumber.getText().then(function(aValueStr){
            theValue = Number(aValueStr);
            expect(theValue).toBe(1);


        });

    });

    it('should have the correct sum', function(){

        browser.get('http://46.51.174.51/moshopclient');

        element(by.repeater('pack in homeTablePack.americaContent track by $index').row(0)).click();
        element(by.id("purchase-button")).click();

        var subtotal = element(by.binding('totalCart'));
        var total = element(by.binding('subtotalFutures'));


        var subtotal2, total2;
        subtotal.getText().then(function(result){
            subtotal2 = result.substring(6,12);

        });
        total.getText().then(function(result){
            total2 = result;//.substring(6,12);

        });
        expect(subtotal2).toBe(total2);


    });
});