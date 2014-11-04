/**
 * Created by aitor on 23/10/14.
 */
'use strict';
//constructor
var MyPatterns = function () {
    //browser.get('/'); <- the constructor will not load the page, we are going to login

};

MyPatterns.prototype =  Object.create({}, {
  /*  showLoginBox : {value: function(){
        element(by.css(".no-logged-box")).click()
    }},
    login:{value:function(user,pass){
        element(by.model('fields.email')).sendKeys(user);
        element(by.model('fields.password')).sendKeys(pass);
        element.all(by.css('.mo-button')).get(0).click();
    }},*/
    getSimpleName:{value:function(tab,row) {
        return  element(by.repeater("tab in tabs").row(tab)).element(by.repeater("data in myData").row(row))
            .element(by.css(".name-column-my-patterns"))
            .all(by.tagName("span")).get(1); //the span inside the TD are span -- buy/sell and span --name
    }},
    goToMyPatterns:{value:function(){
        browser.get('/#/patterns');
    }},
    getNumberTotalPatterns:{value:function(tab){
        return element(by.repeater("tab in tabs").row(tab)).element(by.css(".total-patterns")).element(by.css(".ng-binding"));
    }},
    getNumberFoundPatterns:{value:function(tab){
        return element(by.repeater("tab in tabs").row(tab)).element(by.css(".found-patterns")).element(by.css(".ng-binding"));
    }},
    goToTab:{value:function(tab){
        return element(by.repeater("tab in tabs").row(tab)).click();

    }}




});


module.exports = MyPatterns;