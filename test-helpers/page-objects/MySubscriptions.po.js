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
    selectDropdownbyNum: { value:  function (element, index, milliseconds) {
        element.all(by.tagName('option'))
            .then(function (options) {
                console.log("selecting option:"+index+" in MySubscriptions");
                if (typeof options[index] ==="undefined") {
                    console.log("selecting option "+index+" is not defined!");
                } else {
                    options[index].click();
                }
            });
        if (typeof milliseconds != 'undefined') {
            browser.sleep(milliseconds);
        }
    }},
    selectedMonth: { get: function () {
        return element(by.binding('filterOptions.filters.selectMonth')).getAttribute('value');
    }},
    stocksTableFirstRow: {get: function(){
        return element.all(by.repeater("pack in mySubscriptionsTablePack.americaContent"));
    }},
    /*
    * select a row and show if is check as purchased
    * */
    getPurchased: {value: function(row_idx){
       return element(by.repeater("pack in mySubscriptionsTablePack.americaContent track by $index").row(row_idx)).element(by.model("pack.selected"));
        if (selected != null) {
            console.log("element found");
            return selected;
        } else {
            console.log("element not purchased");
            return false;
        }
    }},
    getCheckBoxToBuy: {value: function(row_idx) {
        return element(by.repeater("pack in mySubscriptionsTablePack.americaContent track by $index").row(row_idx)).element(by.model("pack.toBuy"));
    }},
    getSelector: {value: function(row_idx){
        return element(by.repeater("pack in mySubscriptionsTablePack.americaContent track by $index").row(row_idx)).element(by.model("pack.duration"))/*.getAttribute("disabled")*/;
    }},
    selectMonth: {value: function(opt) {
        return this.selectDropdownbyNum(element(by.model("filterOptions.filters.selectMonth")),opt);
    }},
    selectDuration: {value: function(row,opt) {
        console.log("selecting Duration in sub for row:"+row);
        return this.selectDropdownbyNum(element(by.repeater("pack in mySubscriptionsTablePack.americaContent track by $index")
            .row(row)).element(by.model("pack.duration")),opt);
    }},
    getNamePack: {value: function(row_idx) {
        return element(by.repeater("pack in mySubscriptionsTablePack.americaContent track by $index")
            .row(row_idx)).all(by.tagName('td')).get(0).element(by.tagName('span'));
    }}
});

module.exports = MySubscriptions;