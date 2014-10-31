/**
 * Created by aitor on 22/10/14.
 */
'use strict';
var Cart = function () {
    browser.get('/');

};

Cart.prototype =  Object.create({}, {
    selectDropdownbyNum: { value: function ( element, optionNum ) {
        if (optionNum){
            var options = element.all(by.tagName('option'))
                .then(function(options){
                    options[optionNum].click();
                });
        }
    }},
    selectSimpleDuration: {value: function(row,opt) {
        return this.selectDropdownbyNum(element(by.repeater("stockItem in stockItems track by $index")
            .row(row)).element(by.model("stockItem.duration")),opt);
    }},
    getSimpleName: {value: function(row) {
        return element(by.repeater("stockItem in stockItems track by $index")
            .row(row)).all(by.tagName('td')).get(0).getText();
    }}
});


module.exports = Cart