/**
 * Created by Aitor on 23/09/14.
 */
base_url = 'http://mo.devel.edosoftfactory.com/';
url_suffix = '#/lookup-diary';
var ptor = protractor.getInstance();
var LookupDiary = function () {


    this.open = function () {
        browser.get(base_url);
        browser.ignoreSynchronization = true;
        but = element(by.css(".no-logged-box"));
        but.click();
        element(by.model('fields.email')).sendKeys('aitor.carrera@edosoft.es');
        element(by.model('fields.password')).sendKeys('factory216c');
        element.all(by.css('.mo-button')).get(0).click();
        ptor.sleep(4000);
        browser.setLocation('/lookup-diary');
        ptor.sleep(4000)
    }



};

LookupDiary.prototype = Object.create({}, {
    selectedMonth: { get: function () {
        return element(by.binding('filterOptions.filters.month.monthString')).getAttribute('value');
    }},
    stocksTableFirstRow: {get: function(){
        return element.all(by.repeater("data in myData"))
    }},
    clickOnAlarm: {value: function(row_idx){
        element(by.repeater('data in myData').row(row_idx)).element(by.css('.alarm-column-width')).click();
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

describe('The Daily Lookup', function () {
        var page;
        beforeEach(function () {
            page = new LookupDiary();
            page.open();

        });

        it(' should be able to set a price alert in Stocks', function () {
            value = 12345;
            page.clickOnAlarm(0);
            page.addAlarm(value);
            ptor.sleep(4000);
            text = page.getAlarmValueByRow(0);
            expect(text).toEqual("Mayor que "+value);
            page.clickOnAlarm(0);
            page.removeAlarm(0);
            ptor.sleep(4000);
            text = page.getAlarmValueByRow(0);
            expect(text).toEqual("")





        });


    }
);