/**
 * Created by robgon on 01/11/14.
 */
'use strict';
var Paypal = function () {

};

Paypal.prototype =  Object.create({}, {
    doPayment: { value: function ( user, password,ptor ) {
        element(by.id("email")).sendKeys(user);
        ptor.sleep(500);
        element(by.id("password")).sendKeys(password);
        ptor.sleep(500);
        element(by.css(".continue")).click().then(
            function() {
                ptor.sleep(5000);
                console.log("going to confirm Pay");
                //confirm Pay
                element(by.id("confirmButtonTop")).click().then(function() {
                    console.log("redirecting to MO");
                });
            }
        );
        ptor.sleep(15000);
    }}
});


module.exports = Paypal;