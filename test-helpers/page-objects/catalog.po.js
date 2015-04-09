/**
 * Created by David Verdú on 19/03/15.
 */
'use strict';
var Catalog = function (go_to_page) {
};

Catalog.prototype =  Object.create({}, {
    isCurrentPage : {value: function(){
                            return browser.getLocationAbsUrl().then(function(url) {
                              console.log("current url: " + url); 
                              return (url.indexOf("catalog/") > -1);
                            });
                     }},
    getStartDateLabel:{value: function(){
        return element(by.css("div.start-date-catalog-container"));
    }},
    getPackNameLabel:{value: function(){
        return element(by.css("div.region-catalog-container"));
    }},
    getCurrentDateLabel:{value: function(){
        return element(by.css("span.actual-date-catalog"));
    }},
    getTotalAndFoundPatternsLabel:{value: function(){
        return element(by.css("div.number-patterns-catalog"));
    }},
    getPattern:{value: function(row){
        return element.all(by.repeater("pattern in patterns")).get(row);
    }},
    getPatternName:{value: function(row){
        return this.getPattern(row).all(by.css("td")).get(0);
    }},
    getPatternMarket:{value: function(row){
        return this.getPattern(row).all(by.css("td")).get(1);
    }},
    getPatternSectorIndustry:{value: function(row){
        return this.getPattern(row).all(by.css("td")).get(2);
    }},
    getPatternWin:{value: function(row){
        return this.getPattern(row).all(by.css("td")).get(3);
    }},
    getPatternLoss:{value: function(row){
        return this.getPattern(row).all(by.css("td")).get(4);
    }},
    getPatternAccumulatedReturn:{value: function(row){
        return this.getPattern(row).all(by.css("td")).get(5);
    }},
    getPatternAverageReturn:{value: function(row){
        return this.getPattern(row).all(by.css("td")).get(6);
    }},
    getPatternDuration:{value: function(row){
        return this.getPattern(row).all(by.css("td")).get(7);
    }},
    getPatternVolatility:{value: function(row){
        return this.getPattern(row).all(by.css("td")).get(8);
    }},
    getPatternStatus:{value: function(row,type){
        var type_map = {
            'not_started': 'div.state-sphere.no-started-state',
            'started': 'div.state-sphere.started-state',
            'finished': 'div.state-sphere.finished-state'
        };
        return this.getPattern(row).all(by.css("td")).get(9).element(by.css(type_map[type]));
    }},
    //filters
    getNameFilter:{value: function(){
        return element(by.model("filterOptions.filters.filterName"));
    }},
    getSectorFilter:{value: function(){
        return element(by.model("filterOptions.filters.selectedSector"));
    }},
    getSectorFilterDropdownOption:{value: function(row){
        return element.all(by.repeater("match in matches")).get(row);
    }}

});


module.exports = Catalog;
