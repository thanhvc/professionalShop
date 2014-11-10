/**
 * Created by David Verdú on 06/11/14.
 */
'use strict';
var SignUp = function (go_to_page) {
    var go_to_page = go_to_page || true;
    if (go_to_page) {
      //browser.get('/sign-up');
      browser.setLocation('/sign-up');
    }
};

SignUp.prototype =  Object.create({}, {

    isCurrentPage : {value: function(){
                            return browser.getLocationAbsUrl().then(function(url) {
                              console.log("current url: " + url); 
                              return (url.indexOf("sign-up") > -1 && url.indexOf("step2") == -1);
                            });
                     }},
    clickContinue : {value: function(){
                            element(by.css("button#submit1")).click();
                     }},
    errorMessagesCount : {value: function(error_message){
                            var e_messages = element.all(by.css("div.sign-up-block div.red-color-form.ng-hide"));
                            var error_messages = e_messages.count().then(function(length) {
                              return 8 - length;
                            });
                            
                            return error_messages;
                     }},
    getErrorMessageElement : {value: function(error_message){
                            var error_messages_map = {
                                'password_mismatch' : 0,
                                'email_invalid' : 1,
                                'email_mismatch' : 2,
                                'email_used': 3,
                                'password_minlength': 4,
                                'password_invalid_characters': 5,
                                'error_form' : 6,
                                'missing_required_fields' : 7
                            };
                            var e_messages = element.all(by.css("div.sign-up-block div.red-color-form"));
                            var pos = error_messages_map[error_message];
                            
                            console.log("pos: " + pos);
                            return e_messages.get(pos);
                            
                     }},
    fillInEmail : {value: function(value){
                            element(by.model("user.email")).clear();
                            element(by.model("user.email")).sendKeys(value);
                     }},
    fillInEmailConfirmation : {value: function(value){
                            element(by.model("user.email2")).clear();
                            element(by.model("user.email2")).sendKeys(value);
                     }},
    fillInPassword : {value: function(value){
                            element(by.model("user.password")).clear();
                            element(by.model("user.password")).sendKeys(value);
                     }},
    fillInPasswordConfirmation : {value: function(value){
                            element(by.model("user.password2")).clear();
                            element(by.model("user.password2")).sendKeys(value);
                     }}

});


module.exports = SignUp;
