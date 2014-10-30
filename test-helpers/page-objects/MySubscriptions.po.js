/**
 * Created by robgon on 30/10/14.
 */
'use strict';
//constructor
var MySubscriptions = function () {
    //browser.get('/'); <- the constructor will not load the page, we are going to login
    browser.setLocation('/my-subscriptions/my-subscriptions');
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
    }}
});

module.exports = MySubscriptions;