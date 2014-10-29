/**
 * Created by aitor on 23/10/14.
 */
'use strict';
//constructor
var MyPatterns = function () {
    //browser.get('/'); <- the constructor will not load the page, we are going to login

};

MyPatterns.prototype =  Object.create({}, {
    showLoginBox : {value: function(){
        element(by.css(".no-logged-box")).click()
    }},
    login:{value:function(user,pass){
        element(by.model('fields.email')).sendKeys(user);
        element(by.model('fields.password')).sendKeys(pass);
        element.all(by.css('.mo-button')).get(0).click();
    }}



});


module.exports = MyPatterns