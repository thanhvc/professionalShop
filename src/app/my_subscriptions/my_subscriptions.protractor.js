/**
 * Created by robgon on 26/09/14.
 */
base_url = 'http://mo.devel.edosoftfactory.com/';
url_suffix = '#/my-subscriptions/my-subscriptions#top';
var ptor = protractor.getInstance();
var MySubscriptions = function () {


    this.open = function () {
        browser.get(base_url);
        browser.ignoreSynchronization = true;
        but = element(by.css(".no-logged-box"));
        but.click();
        element(by.model('fields.email')).sendKeys('roberto.gonzalez@edosoftfactory.com');
        element(by.model('fields.password')).sendKeys('factory216c');
        element.all(by.css('.mo-button')).get(0).click();
        ptor.sleep(4000);
        browser.setLocation('/my-subscriptions/my-subscriptions');
        ptor.sleep(4000)
    }



};

MySubscriptions.prototype = Object.create({}, {
    selectDropdownbyNum: { value: function ( element, optionNum ) {
        if (optionNum){
            var options = element.all(by.tagName('option'))
                .then(function(options){
                    options[optionNum].click();
                });
        }
    }},
    selectedMonth: { get: function () {
        return element(by.binding('filterOptions.filters.selectMonth')).getAttribute('value');
    }},
    stocksTableFirstRow: {get: function(){
        return element.all(by.repeater("pack in mySubscriptionsTablePack.americaContent"));
    }},
    getPurchased: {value: function(row_idx){
        return element(by.repeater("pack in mySubscriptionsTablePack.americaContent track by $index").row(row_idx)).element(by.model("pack.selected")).getAttribute("disabled");
    }},
    getSelector: {value: function(row_idx){
        return element(by.repeater("pack in mySubscriptionsTablePack.americaContent track by $index").row(row_idx)).element(by.model("pack.duration"))/*.getAttribute("disabled")*/;
    }},
    selectMonth: {value: function(opt) {
        return this.selectDropdownbyNum(element(by.model("filterOptions.filters.selectMonth")),opt);
    }},
    addAlarm:{value: function(threshold){
        element(by.model('data.price')).clear().sendKeys(threshold);
        buttons = element.all(by.css('.mo-button.float-left'));
        expect(buttons.count()).toEqual(1);
        buttons.get(0).click()
    }},
    removeAlarm:{value: function(){
        buttons = element.all(by.css('.mo-button.float-right'));
        expect(buttons.count()).toEqual(2);
        buttons.get(1).click()
    }},
    getAlarmValueByRow : {value: function(row_idx){
        return element(by.repeater('data in myData').row(row_idx)).element(by.binding('data.priceAlert')).getText();
    }}
});

describe('the My Subscriptions page', function () {
        var page;
        beforeEach(function () {
            page = new MySubscriptions();
            page.open();

        });

        it(' should be purchased the first element', function () {
            ptor.sleep(4000);
            canadaPurchased = page.getPurchased(0);
            expect(canadaPurchased).toEqual("true");
            //browser.debugger();
            canadaSelector =  page.getSelector(0);
            expect(canadaSelector.getAttribute("disabled")).toEqual("true");
            page.selectMonth(1);
            ptor.sleep(5000);
            /*canadaPurchased = page.getPurchased(0);
            expect(canadaPurchased).toEqual("true");
            canadaSelector =  page.getSelector(0);
            expect(canadaSelector.getAttribute("disabled")).toEqual("true");*/

        });


    }
);