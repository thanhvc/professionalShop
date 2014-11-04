/**
 * Created by aitor on 22/10/14.
 */
'use strict';
var Cart = function () {
    browser.get('/');

};

Cart.prototype =  Object.create({}, {
    selectDropdownbyNum: { value: function ( element, optionNum ) {
            var options = element.all(by.tagName('option'))
                .then(function(options){
                    console.log("selecting option:"+optionNum+" in Cart");
                    if (typeof options[optionNum] ==="undefined") {
                        console.log("selecting option "+optionNum+" is not defined!");
                    } else {
                        options[optionNum].click();
                    }
                });
    }},
    selectSimpleDuration: {value: function(row,opt) {
        return this.selectDropdownbyNum(element(by.repeater("stockItem in stockItems track by $index")
            .row(row)).element(by.model("stockItem.duration")),opt);
    }},
    getSimpleName: {value: function(row) {
        return element(by.repeater("stockItem in stockItems track by $index")
            .row(row)).all(by.tagName('td')).get(0);
    }},
    getSelector: {value: function(row_idx){
        return element(by.repeater("stockItem in stockItems track by $index")
            .row(row_idx)).element(by.model("stockItem.duration"));
    }},
    getPurchaseButton: {value: function(){
        return element(by.css(".shopping-cart-container")).all(by.css(".mo-button")).get(1);
    }}
});


module.exports = Cart