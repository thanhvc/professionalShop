/**
 * Created by aitor on 22/10/14.
 */
'use strict';
var Home = function () {
        browser.get('/');

};

Home.prototype =  Object.create({}, {
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
    }},
    signupLink:{value: function(){
        return element(by.css("div.signin-signup-box a.subscribe-free-link"));
    }},
    logoutLink:{value: function(){
        return element(by.css(".log-out-link"));
    }},
    myAccountLink:{value: function(){
        return element(by.css("a.my-account-link"));
    }}



});


module.exports = Home;
