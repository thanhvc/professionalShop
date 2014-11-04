/**
 * Created by robgon on 01/11/14.
 */
'use strict';
var PaymentPage = function () {

};

PaymentPage.prototype =  Object.create({}, {
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
    getTemsCheckBox: {value: function() {
        return element(by.model("conditions"));
    }},
    getCancelButton: {value: function() {
        return element(by.name("cancel-pay"));
    }},
    getPayButton: {value: function(){
        return element(by.name("pay-button"));
    }},
    getTermsErrorMessage: {value: function(){
        return element(by.id("noAceptaCondicionesCamp"));
    }},
    getLoadingMessage: {value: function() {
        return element(by.css(".doing-payment"));
    }}
});


module.exports = PaymentPage;