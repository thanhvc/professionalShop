/**
 * Created by David Verdú on 06/11/14.
 */
'use strict';
var SignUp = function () {
    //browser.get('/sign-up');
    browser.setLocation('/sign-up');
};

SignUp.prototype =  Object.create({}, {

    clickContinue : {value: function(){
                            element(by.css("button#submit1")).click()
                     }}

/*
    showLoginBox : {value: function(){
                            element(by.css(".no-logged-box")).click()
                     }},
    login:{value:function(user,pass){
        element(by.model('fields.email')).sendKeys(user);
        element(by.model('fields.password')).sendKeys(pass);
        element.all(by.css('.mo-button')).get(0).click();
    }},
    logout:{value: function(){
        element(by.css(".log-out-link")).click();
    }}
*/

});


module.exports = SignUp;
