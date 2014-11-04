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
    getName:{value:function(row) {
        return element(by.repeater("data in myData").row(row))
            .element(by.css(".name-column-my-patterns"))
            .all(by.tagName("span")).get(1); //the span inside the TD are span -- buy/sell and span --name
    }},
    goToMyPatterns:{value:function(){
        browser.get('/#/patterns');
    }},
    getNumberTotalPatterns:{value:function(){
        return element(by.css(".total-patterns")).element(by.css(".ng-binding"));
    }},
    getNumberFoundPatterns:{value:function(){
        return element(by.css(".found-patterns")).element(by.css(".ng-binding"));
    }}




});


module.exports = MyPatterns;