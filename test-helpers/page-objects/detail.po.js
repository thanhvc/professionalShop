/**
 * Created by robgon on 11/11/14.
 */
/**
 * Created by aitor on 23/10/14.
 */
'use strict';
//constructor
var Detail = function () {
    //browser.get('/'); <- the constructor will not load the page, we are going to login

};

Detail.prototype =  Object.create({}, {
    getContainerTab: {value: function(tab) {
        return element.all(by.css(".tab-pane")).get(tab);
    }},
    getHistoricalRow: {value: function(row) {
        return element(by.repeater("row in myData").row(row));
    }},

    goToDetail:{value:function(id){
        browser.get('/#/detail/'+id);
    }},
    getHeader: {value:function() {
        return element(by.css(".detail-header"));
    }},
    getBuyType: {value: function() {
        return this.getHeader().all(by.tagName("tr")).get(0).all(by.tagName("th")).get(0).all(by.tagName("span")).get(0);
    }},
    getSellType: {value: function() {
        return this.getHeader().all(by.tagName("tr")).get(0).all(by.tagName("th")).get(0).all(by.tagName("span")).get(1);
    }},
    getEntryDate: {value: function() {
        return this.getHeader().all(by.tagName("tr")).get(0).all(by.tagName("th")).get(4);
    }},
    getCurrency: {value: function() {
        return this.getHeader().all(by.tagName("tr")).get(0).all(by.tagName("th")).get(5).element(by.tagName("div"));
    }},
    getExitDate: {value: function() {
        return this.getHeader().all(by.tagName("tr")).get(1).all(by.tagName("th")).get(1);
    }},
    getSectorIndustry: {value: function() {
        return this.getHeader().all(by.tagName("tr")).get(0).all(by.tagName("th")).get(2).element(by.tagName("b"));
    }},
    getName: {value: function() {
        return this.getHeader().all(by.tagName("tr")).get(0).all(by.tagName("th")).get(1).element(by.tagName("b"));
    }},
    getHistoricalTd: {value: function(row,td) {
        return this.getHistoricalRow(row).all(by.tagName("td")).get(td);
    }},
    getIdTd: {value:function(row) {
        return this.getHistoricalTd(row,0);
    }},
    getHistoricalEntryDate: {value: function(row) {
        return this.getHistoricalTd(row,1);
    }},
    getHistoricalEntryValue: {value: function(row) {
        return this.getHistoricalTd(row,2).element(by.tagName("b"));
    }},
    getHistoricalExitDate: {value: function(row) {
        return this.getHistoricalTd(row,3);
    }},
    getHistoricalExitValue: {value: function(row) {
        return this.getHistoricalTd(row,4).element(by.tagName("b"));
    }},
    getHistoricalRent: {value: function(row) {
        return this.getHistoricalTd(row,5).element(by.tagName("b"));
    }},
    getHistoricalBestGainDate: {value: function(row) {
        return this.getHistoricalTd(row,6).element(by.tagName("span"));
    }},
    getHistoricalBestGainValue: {value: function(row) {
        return this.getHistoricalTd(row,7).element(by.tagName("span"));
    }},
    getHistoricalWorstLossDate: {value: function(row) {
        return this.getHistoricalTd(row,8).element(by.tagName("span"));
    }},
    getHistoricalWorstLossValue: {value: function(row) {
        return this.getHistoricalTd(row,9).element(by.tagName("span"));
    }},
    getImageYear: {value: function() {
        return element(by.css(".div-graph-detail")).element(by.tagName("img"));
    }},
    closeImageYear: {value: function() {
        return element(by.css(".pdf-icon-detail")).click();
    }},
    getSummaryTable: {value: function() {
        return element(by.css(".summary-table")).element(by.tagName("tbody"));
    }},
    getWinningYears: {value: function() {
        return this.getSummaryTable().all(by.tagName("tr")).get(0).all(by.tagName("td")).get(1);
    }},
    getWinningAccumulated: {value: function(){
        return this.getSummaryTable().all(by.tagName("tr")).get(0).all(by.tagName("td")).get(2);
    }},
    getWinningAverage: {value: function(){
        return this.getSummaryTable().all(by.tagName("tr")).get(0).all(by.tagName("td")).get(3);
    }},
    getWinningDiary: {value: function(){
        return this.getSummaryTable().all(by.tagName("tr")).get(0).all(by.tagName("td")).get(4);
    }},
    getWinningDuration: {value: function(){
        return this.getSummaryTable().all(by.tagName("tr")).get(0).all(by.tagName("td")).get(5);
    }},
    getLossYears: {value: function() {
        return this.getSummaryTable().all(by.tagName("tr")).get(1).all(by.tagName("td")).get(1);
    }},
    getLossAccumulated: {value: function(){
        return this.getSummaryTable().all(by.tagName("tr")).get(1).all(by.tagName("td")).get(2);
    }},
    getLossAverage: {value: function(){
        return this.getSummaryTable().all(by.tagName("tr")).get(1).all(by.tagName("td")).get(3);
    }},
    getLossDiary: {value: function(){
        return this.getSummaryTable().all(by.tagName("tr")).get(1).all(by.tagName("td")).get(4);
    }},
    getLossDuration: {value: function(){
        return this.getSummaryTable().all(by.tagName("tr")).get(1).all(by.tagName("td")).get(5);
    }},
    getTotalYears: {value: function() {
        return this.getSummaryTable().all(by.tagName("tr")).get(2).all(by.tagName("td")).get(1);
    }},
    getTotalAccumulated: {value: function(){
        return this.getSummaryTable().all(by.tagName("tr")).get(2).all(by.tagName("td")).get(2);
    }},
    getTotalAverage: {value: function(){
        return this.getSummaryTable().all(by.tagName("tr")).get(2).all(by.tagName("td")).get(3);
    }},
    getTotalDiary: {value: function(){
        return this.getSummaryTable().all(by.tagName("tr")).get(2).all(by.tagName("td")).get(4);
    }},
    getTotalDuration: {value: function(){
        return this.getSummaryTable().all(by.tagName("tr")).get(2).all(by.tagName("td")).get(5);
    }},
    getSamePeriodEntryDate: {value: function() {
        return element(by.css(".index-same-period-table")).element(by.tagName("thead"))
            .all(by.tagName("tr")).get(0).all(by.tagName("th")).get(2);
    }},
    getSamePeriodExitDate: {value: function() {
        return element(by.css(".index-same-period-table")).element(by.tagName("thead"))
            .all(by.tagName("tr")).get(1).all(by.tagName("th")).get(1);
    }},
    getSamePeriodTable: {value: function() {
        return element(by.css(".index-same-period-table")).element(by.tagName("tbody"));
    }},
    getSamePeriodName: {value: function(row) {
        return this.getSamePeriodTable().all(by.tagName("tr")).get(row).all(by.tagName("td")).get(0);
    }},
    getSamePeriodAccumulated: {value: function(row) {
        return this.getSamePeriodTable().all(by.tagName("tr")).get(row).all(by.tagName("td")).get(1);
    }},
    getSamePeriodAverage: {value: function(row) {
        return this.getSamePeriodTable().all(by.tagName("tr")).get(row).all(by.tagName("td")).get(2);
    }},
    getSamePeriodUpYears: {value: function(row) {
        return this.getSamePeriodTable().all(by.tagName("tr")).get(row).all(by.tagName("td")).get(3);
    }},
    getSamePeriodDownYears: {value: function(row) {
        return this.getSamePeriodTable().all(by.tagName("tr")).get(row).all(by.tagName("td")).get(4);
    }},
    getGraphHeader: {value: function(pos) {
        return element.all(by.css(".graphic-header")).get(pos);
    }},
    getGraph : {value: function(pos) {
        return element.all(by.css(".graphic-container")).get(pos).element(by.tagName("img"));
    }}


});


module.exports = Detail;