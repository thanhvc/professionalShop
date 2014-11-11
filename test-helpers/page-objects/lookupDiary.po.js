/**
 * Created by aitor on 23/10/14.
 */
'use strict';
//constructor
var LookupDiary = function () {
    //browser.get('/'); <- the constructor will not load the page, we are going to login

};

LookupDiary.prototype =  Object.create({}, {
    getContainerTab: {value: function(tab) {
        return element.all(by.css(".tab-pane")).get(tab);
    }},

    selectDropdownbyNum: { value:  function (element, index, milliseconds) {
        element.all(by.tagName('option'))
            .then(function (options) {
                if (typeof options[index] ==="undefined") {
                    console.log("selecting option "+index+" is not defined!");
                } else {
                    options[index].click();
                }
            });
        if (typeof milliseconds != 'undefined') {
            browser.sleep(milliseconds);
        }
    }},
    /*  showLoginBox : {value: function(){
     element(by.css(".no-logged-box")).click()
     }},
     login:{value:function(user,pass){
     element(by.model('fields.email')).sendKeys(user);
     element(by.model('fields.password')).sendKeys(pass);
     element.all(by.css('.mo-button')).get(0).click();
     }},*/
    getSimpleName:{value:function(tab,row) {
        return  this.getContainerTab(tab).element(by.repeater("data in myData").row(row))
            /*.element(by.css(".name-column-my-patterns"))*/
            .all(by.tagName("td")).get(1)
            .element(by.tagName("div")).element(by.tagName("span")); //the span inside the TD are span -- buy/sell and span --name
    }},
    //tab 0-3, row, and pattern (buy=0,sell=1)
    getPairName:{value:function(tab,row,pattern) {
        var spanPos = "";
        if (pattern == 0) {
            spanPos = ".buy-color";
        } else {
            spanPos = ".sell-color";
        }
        return  this.getContainerTab(tab).element(by.repeater("data in myData").row(row))
            /*.element(by.css(".name-with-sides-column-my-patterns"))*/
            .all(by.tagName("td")).get(1)
            .element(by.css(spanPos)); //the span inside the TD are span -- buy/sell and span --name
    }},
    goToLookupDiary:{value:function(){
        browser.get('/#/lookup-diary');
    }},
    getNumberTotalPatterns:{value:function(tab){
        return this.getContainerTab(tab).element(by.css(".total-patterns")).element(by.css(".ng-binding"));
    }},
    getNumberFoundPatterns:{value:function(tab){
        return this.getContainerTab(tab).element(by.css(".found-patterns")).element(by.css(".ng-binding"));
    }},
    goToTab:{value:function(tab){
        return element(by.repeater("ctab in tabs").row(tab)).click();

    }},
    selectIndexType:{value:function(opt){
        return this.selectDropdownbyNum( element.all(by.css(".tab-pane")).get(2).element(by.model("filterOptions.filters.index_type")),opt);
    }},
    getNameFilter:{value:function(tab) {
        return this.getContainerTab(tab).element(by.model("filterOptions.filters.filterName"));
    }},
    getSearchButton:{value:function(tab) {
        //return this.getContainerTab(tab).all(by.css(".mo-button")).get(0);
        return this.getContainerTab(tab).element(by.buttonText("Buscar"));
    }},
    getRegionFilter: {value: function(tab) {
        return this.getContainerTab(tab).element(by.model("filterOptions.filters.selectedRegion"));
    }},
    selectRegion:{value: function(tab,opt) { //0 -> Select Region, 1 -> first region, (canada for example..)
        return this.selectDropdownbyNum(this.getRegionFilter(tab),opt);
    }},
    getExchangeFilter: {value: function(tab) {
        return this.getContainerTab(tab).element(by.model("filterOptions.filters.selectedMarket"));
    }},
    selectExchange:{value: function(tab,opt) { //0 -> Select Region, 1 -> first region, (canada for example..)
        return this.selectDropdownbyNum(this.getExchangeFilter(tab),opt);
    }},
    getSectorFilter:{value: function(tab) {
        return this.getContainerTab(tab).element(by.model("filterOptions.filters.selectedSector"));
    }},
    selectSector: {value: function(tab,opt) {
        return this.selectDropdownbyNum(this.getSectorFilter(tab),opt);
    }},
    getIndustryFilter:{value: function(tab) {
        return this.getContainerTab(tab).element(by.model("filterOptions.filters.selectedIndustry"));
    }},
    selectIndustry: {value: function(tab,opt) {
        return this.selectDropdownbyNum(this.getIndustryFilter(tab),opt);
    }},
    getOperationFilter:{value: function(tab) {
        return this.getContainerTab(tab).element(by.model("filterOptions.filters.selectedOperation"));
    }},
    selectOperation:{value: function(tab,opt) {
        return this.selectDropdownbyNum(this.getOperationFilter(tab),opt);
    }},
    getLastRentFilter:{value:function(tab) {
        return this.getContainerTab(tab).element(by.model("filterOptions.filters.selectedRent"));
    }},
    selectLastRentFilter:{value:function(tab,opt) {
        return this.selectDropdownbyNum(this.getLastRentFilter(tab),opt);
    }},
    getLastRentInput:{value:function(tab) {
        return this.getContainerTab(tab).element(by.model("filterOptions.filters.rentInput"));
    }},
    getBestGainFilter:{value: function(tab) {
        return this.getContainerTab(tab).element(by.model("filterOptions.filters.selectedAverage"));
    }},
    selectBestGainFilter:{value:function(tab,opt) {
        return this.selectDropdownbyNum(this.getBestGainFilter(tab),opt);
    }},
    getBestGainInput:{value:function(tab) {
        return this.getContainerTab(tab).element(by.model("filterOptions.filters.rentAverageInput"));
    }},
    getWorstLossFilter:{value:function(tab) {
        return this.getContainerTab(tab).element(by.model("filterOptions.filters.selectedRentDiary"));
    }},
    selectWorstLossFilter:{value:function(tab,opt) {
        return this.selectDropdownbyNum(this.getWorstLossFilter(tab),opt);
    }},
    getWorstLossInput:{value:function(tab) {
        return this.getContainerTab(tab).element(by.model("filterOptions.filters.rentDiaryInput"));
    }},
    getVolatFilter:{value: function(tab) {
        return this.getContainerTab(tab).element(by.model("filterOptions.filters.selectedVolatility"));
    }},
    selectVolatFilter:{value:function(tab,opt) {
        return this.selectDropdownbyNum(this.getVolatFilter(tab),opt);
    }},
    getVolatInput:{value:function(tab) {
        return this.getContainerTab(tab).element(by.model("filterOptions.filters.volatilityInput"));
    }},
    getDurationFilter:{value:function(tab) {
        return this.getContainerTab(tab).element(by.model("filterOptions.filters.selectedDuration"));
    }},
    selectDurationFilter:{value:function(tab,opt) {
        return this.selectDropdownbyNum(this.getDurationFilter(tab),opt);
    }},
    getDurationInput:{value:function(tab) {
        return this.getContainerTab(tab).element(by.model("filterOptions.filters.durationInput"));
    }},
    getFavFilter:{value:function(tab) {
        return this.getContainerTab(tab).element(by.model("filterOptions.filters.favourite"));
    }},
    clickOnAlarm: {value: function(tab,row_idx){
        return this.getContainerTab(tab).element(by.repeater('data in myData').row(row_idx)).element(by.css('.alarm-column-width')).click();
    }},
    addAlarm:{value: function(threshold){
        element(by.model('data.price')).clear().sendKeys(threshold);
        console.log("added :"+threshold);
        var buttons = element.all(by.css('.mo-button.float-left'));
        expect(buttons.count()).toEqual(1);
        buttons.get(0).click()
    }},
    removeAlarm:{value: function(){
        var buttons = element.all(by.css('.mo-button.float-right'));
        expect(buttons.count()).toEqual(2);
        buttons.get(1).click()
    }},
    getAlarmValueByRow : {value: function(tab,row_idx){
        return this.getContainerTab(tab).element(by.repeater('data in myData').row(row_idx)).element(by.binding('data.priceAlert')).getText();
    }}



});


module.exports = LookupDiary;