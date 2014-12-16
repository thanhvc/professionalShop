/**
 * Created by David Verdú on 15/12/14.
 */
'use strict';
var ForgottenPassword = function (go_to_page) {
    var go_to_page = go_to_page || true;
    if (go_to_page) {
      //browser.get('/sign-up');
      browser.setLocation('/forgotten-password');
    }
};

ForgottenPassword.prototype =  Object.create({}, {

    isCurrentPage : {value: function(){
                            return browser.getLocationAbsUrl().then(function(url) {
                              console.log("current url: " + url); 
                              return (url.indexOf("forgotten-password") > -1);
                            });
                     }},
    errorMessagesCount : {value: function(error_message){
                            return 0;
                     }},
    fillInEmail : {value: function(value){
                            element(by.model("emailRemember")).clear();
                            element(by.model("emailRemember")).sendKeys(value);
                     }},
    clickContinue : {value: function(){
                            return element(by.css("div.forget-password-container button.mo-button")).click();
                     }}
});

module.exports = ForgottenPassword;
