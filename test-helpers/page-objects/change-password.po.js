/**
 * Created by David Verdú on 17/12/14.
 */
'use strict';
var ChangePassword = function (token) {
    var token = token || '1111111111111111';
    if (token) {
      //browser.get('/sign-up');
      browser.setLocation('/change-password/'+token);
    }
};

ChangePassword.prototype =  Object.create({}, {

    isCurrentPage : {value: function(){
                            return browser.getLocationAbsUrl().then(function(url) {
                              console.log("current url: " + url); 
                              return (url.indexOf("change-password") > -1);
                            });
                     }},
    getValidationMessages : {value: function(){
                            return element.all(by.css("table.reactivate-box div.prices-font12"));
                     }},
    getValidationMessage : {value: function(validation_message){
                            var validation_messages_map = {
                                'password_mismatch' : 0,
                                'invalid_password' : 1,
                                'password_incorrect_pattern' : 2,
                                'incorrect_token': 3,
                                'password_correctly_modified': 4
                            };
                            var val_messages = this.getValidationMessages();
                            var pos = validation_messages_map[validation_message];
                            
                            console.log("pos: " + pos);
                            return val_messages.get(pos);
                     }},
    clickChangePassword : {value: function(){
                            element(by.css("form table.reactivate-box button.mo-button")).click();
                     }},
    fillInPassword : {value: function(value){
                            element(by.model("password")).clear();
                            element(by.model("password")).sendKeys(value);
                     }},
    fillInPasswordConfirmation : {value: function(value){
                            element(by.model("password2")).clear();
                            element(by.model("password2")).sendKeys(value);
                     }}

});

module.exports = ChangePassword;
