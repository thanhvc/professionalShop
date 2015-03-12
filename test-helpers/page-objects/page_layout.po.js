/**
 * Created by David Verdú on 11/11/14.
 */
'use strict';
var PageLayout = function () {

};

PageLayout.prototype =  Object.create({}, {
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
    loginValidationErrorsPanel:{value: function(){
        return element(by.css("div.login-panel div.login-bottom-panel"));
    }},
    myAccountLink:{value: function(){
        return element(by.css("a.my-account-link"));
    }},
    calendarNavLink:{value: function(){
        return element(by.css("li#calendar-nav a"));
    }},
    the_weekNavLink:{value: function(){
        return element(by.css("li#the-week-nav a"));
    }},
    expiredModalWindow:{value: function(){
        return element(by.css("div.generic-modal-window.ng-scope"));
    }}

});


module.exports = PageLayout;
