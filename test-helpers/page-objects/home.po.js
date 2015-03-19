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
    //Current month packs table
    getCurrentMonthTableCurrentTabContent:{value: function(){
        return element(by.css("div#tabsHome div.tab-pane.active"));
    }},
    getCurrentMonthTableCurrentTabHeader:{value: function(){
        return this.getCurrentMonthTableCurrentTabContent().all(by.css("tr.header-table-pack > td")).get(0);
    }},
    getCurrentMonthTableAmericaPack:{value: function(row){
        return this.getCurrentMonthTableCurrentTabContent().all(by.repeater("pack in homeTablePack.americaContent track by $index")).get(row);
    }},
    getCurrentMonthTableAmericaPackName:{value: function(row){
        return this.getCurrentMonthTableAmericaPack(row).all(by.css("td")).get(0);
    }},
    getCurrentMonthTableAmericaPackNumPatterns:{value: function(row){
        return this.getCurrentMonthTableAmericaPack(row).all(by.css("td")).get(2);
    }},
    getCurrentMonthTableAsiaPack:{value: function(row){
        return this.getCurrentMonthTableCurrentTabContent().all(by.repeater("pack in homeTablePack.asiaContent track by $index")).get(row);
    }},
    getCurrentMonthTableAsiaPackName:{value: function(row){
        return this.getCurrentMonthTableAsiaPack(row).all(by.css("td")).get(0);
    }},
    getCurrentMonthTableAsiaPackNumPatterns:{value: function(row){
        return this.getCurrentMonthTableAsiaPack(row).all(by.css("td")).get(2);
    }},
    getCurrentMonthTableEuropePack:{value: function(row){
        return this.getCurrentMonthTableCurrentTabContent().all(by.repeater("pack in homeTablePack.europeContent track by $index")).get(row);
    }},
    getCurrentMonthTableEuropePackName:{value: function(row){
        return this.getCurrentMonthTableEuropePack(row).all(by.css("td")).get(0);
    }},
    getCurrentMonthTableEuropePackNumPatterns:{value: function(row){
        return this.getCurrentMonthTableEuropePack(row).all(by.css("td")).get(2);
    }},
    //Next month packs table
    getNextMonthTableCurrentTabContent:{value: function(){
        return element(by.css("div#tabsHome2 div.tab-pane.active"));
    }},

});


module.exports = Home;
