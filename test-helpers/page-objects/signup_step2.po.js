/**
 * Created by David Verdú on 10/11/14.
 */
'use strict';
var SignUpStep2 = function (go_to_page) {

};

SignUpStep2.prototype =  Object.create({}, {

    isCurrentPage : {value: function(){
                            return browser.getLocationAbsUrl().then(function(url) {
                              console.log("current url: " + url); 
                              return (url.indexOf("sign-up-step2") > -1);
                            });
                     }},
    clickSignUp : {value: function(){
                            return element(by.css("input#submit2")).click();
                     }},
    fillInName : {value: function(value){
                            element(by.model("user.name")).clear();
                            element(by.model("user.name")).sendKeys(value);
                     }},
    fillInSurname : {value: function(value){
                            element(by.model("user.surname")).clear();
                            element(by.model("user.surname")).sendKeys(value);
                     }},
    fillInAddress : {value: function(value){
                            element(by.model("user.address")).clear();
                            element(by.model("user.address")).sendKeys(value);
                     }},
    fillInCity : {value: function(value){
                            element(by.model("user.city")).clear();
                            element(by.model("user.city")).sendKeys(value);
                     }},
    fillInPostal : {value: function(value){
                            element(by.model("user.postal")).clear();
                            element(by.model("user.postal")).sendKeys(value);
                     }},
    selectCountry : {value: function(value){
                            element(by.css("select#country option:nth-child(2)")).click();
                     }},
    fillInCaptcha : {value: function(value){
                            element(by.model("user.captcha")).clear();
                            element(by.model("user.captcha")).sendKeys(value);
                     }},
    checkAcceptTermConditions : {value: function(){
                            element(by.css("input#conditions")).click();
                     }},
    errorMessagesCount : {value: function(error_message){
                            var e_messages = element.all(by.css("table.signup-table-step2 div.text-warning-form span.ng-hide"));
                            var error_messages = e_messages.count().then(function(length) {
                              return 5 - length;
                            });
                            
                            return error_messages;
                     }},
    getErrorMessageElement : {value: function(error_message){
                            var error_messages_map = {
                                'missing_required_fields' : 0,
                                'error_in_fields': 1,
                                'signup_error': 2,
                                'terms_contidions_must_be_accepted': 3,
                                'captcha_error': 4
                            };
                            var e_messages = element.all(by.css("table.signup-table-step2 div.text-warning-form span"));
                            var pos = error_messages_map[error_message];
                            
                            console.log("pos: " + pos);
                            return e_messages.get(pos);
                            
                     }}

});

module.exports = SignUpStep2;
