/**
 * Created by aitor on 22/10/14.
 */
'use strict';
var Home = function (go_to_page) {
    var go_to_page = go_to_page || true;
    if (go_to_page) {
        browser.get('/');
    }
};

Home.prototype =  Object.create({}, {
    isCurrentPage : {value: function(){
                            return browser.getLocationAbsUrl().then(function(url) {
                              console.log("current url: " + url); 
                              return (url.indexOf("home") > -1);
                            });
                     }},
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
    loginLink:{value: function(){
        return element(by.css(".no-logged-box"));
    }},
    logoutLink:{value: function(){
        return element(by.css(".log-out-link"));
    }},
    myAccountLink:{value: function(){
        return element(by.css("a.my-account-link"));
    }},
    activatedUserMessage:{value: function(){
        return element(by.css("div.activated-user-message"));
    }}



});


module.exports = Home;
