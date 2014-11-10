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
                            element(by.css("input#submit2")).click();
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
                     }}

});

module.exports = SignUpStep2;
