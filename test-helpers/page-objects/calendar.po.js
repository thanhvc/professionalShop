/**
 * Created by David Verdú on 11/11/14.
 */
'use strict';
var Calendar = function (go_to_page) {
    var go_to_page = go_to_page || true;
    if (go_to_page) {
      browser.setLocation('/calendar');
    }
};

Calendar.prototype =  Object.create({}, {
    isCurrentPage : {value: function(){
                            return browser.getLocationAbsUrl().then(function(url) {
                              console.log("current url: " + url); 
                              return (url.indexOf("calendar") > -1);
                            });
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
    getContainerTab: {value: function(tab_name) {
        var tabs_map = {
            'stocks': 0,
            'pairs': 1,
            'indices': 2,
            'futures': 3
        };
        var pos = tabs_map[tab_name];
        return element.all(by.css("div.tab-content div.tab-pane")).get(pos);
    }},
    getActiveContainerTab: {value: function() {
        return element(by.css("div.tab-content div.tab-pane.active"));
    }},
    goToTab:{value:function(tab_name){
        var tabs_map = {
            'stocks': 0,
            'pairs': 1,
            'indices': 2,
            'futures': 3
        };
        var pos = tabs_map[tab_name];
        return element(by.repeater("ctab in tabs").row(pos)).click();
    }},
    getSimpleName:{value:function(row) {
        return this.getActiveContainerTab().all(by.repeater("pattern in myData").row(row))
            .all(by.tagName("td")).get(0)
            .all(by.tagName("span")).get(0);
    }},
    getPairName:{value:function(row,pattern) {
        var spanPos = "";
        if (pattern == 0) {
            spanPos = ".buy-color";
        } else {
            spanPos = ".sell-color";
        }
        return  this.getActiveContainerTab().all(by.repeater("pattern in myData").row(row))
            /*.element(by.css(".name-with-sides-column-my-patterns"))*/
            .all(by.tagName("td")).get(0)
            .element(by.css(spanPos)); //the span inside the TD are span -- buy/sell and span --name
    }},
    getPatterns:{value:function(){
        return this.getActiveContainerTab().all(by.repeater("pattern in myData"));
    }},
    getPatternDaySlots:{value:function(row) {
        return this.getActiveContainerTab().all(by.repeater("pattern in myData").row(row))
            .all(by.repeater("day in daysOfMonth"));
    }},
    getPatternDayBearishSlot:{value:function(row,column) {
        return this.getActiveContainerTab().all(by.repeater("pattern in myData").row(row))
            .all(by.css("td span.bearish-year")).get(column);
    }},
    getPatternDayBullishSlot:{value:function(row,column) {
        return this.getActiveContainerTab().all(by.repeater("pattern in myData").row(row))
            .all(by.css("td span.bullish-year")).get(column);
    }},
    getPatternDayPairSlot:{value:function(row,column) {
        return this.getActiveContainerTab().all(by.repeater("pattern in myData").row(row))
            .all(by.css("td span.pairs-letter")).get(column);
    }},
    getMonthFilter:{value:function() {
        return this.getActiveContainerTab().element(by.model("filterOptions.filters.selectMonth"));
    }},
    selectMonthFilter:{value:function(index) {
        this.selectDropdownbyNum(this.getMonthFilter(),index,4000);
    }},
    getIndexTypeFilter:{value:function() {
        return this.getActiveContainerTab().element(by.model("filterOptions.filters.index_type"));
    }},
    selectIndexTypeFilter:{value:function(index_type) {
        var index_type_map = {'index': 0, 'pairs': 1};
        this.selectDropdownbyNum(this.getIndexTypeFilter(),index_type_map[index_type],4000);
    }},
    getOrderFilter:{value:function() {
        return this.getActiveContainerTab().element(by.model("filterOptions.filters.order"));
    }},
    selectOrderFilter:{value:function(filter) {
        var filters_map = { 'entry_date': 0, 'exit_date': 1};
        this.selectDropdownbyNum(this.getOrderFilter(),filters_map[filter],4000);
    }},
    getRegionFilter:{value:function() {
        return this.getActiveContainerTab().element(by.model("filterOptions.filters.selectedRegion"));
    }},
    selectRegionFilter:{value:function(index) {
        this.selectDropdownbyNum(this.getRegionFilter(),index,4000);
    }},
    getMarketFilter:{value:function() {
        return this.getActiveContainerTab().element(by.model("filterOptions.filters.selectedMarket"));
    }},
    selectMarketFilter:{value:function(index) {
        this.selectDropdownbyNum(this.getMarketFilter(),index,4000);
    }},
    getOperationFilter:{value:function() {
        return this.getActiveContainerTab().element(by.model("filterOptions.filters.selectedOperation"));
    }},
    selectOperationFilter:{value:function(index) {
        this.selectDropdownbyNum(this.getOperationFilter(),index,4000);
    }},
    getFavouriteFilter:{value:function() {
        return this.getActiveContainerTab().element(by.model("filterOptions.filters.favourite"));
    }},
    getInDayDateInputFilter:{value:function(value) {
        //return this.getActiveContainerTab().element(by.model("filterOptions.filters.dayDateInput"));
        return this.getActiveContainerTab().element(by.input("dayInput"));
    }},
    fillInDayDateInputFilter:{value:function(value) {
        this.getActiveContainerTab().element(by.model("filterOptions.filters.dayDateInput")).clear();
        this.getActiveContainerTab().element(by.model("filterOptions.filters.dayDateInput")).sendKeys(value);
        this.getActiveContainerTab().element(by.css("div.calendar-filters-container")).click();
        return value;
    }},
    navTabs : {value: function(){
                        return element.all(by.css("ul.nav.nav-tabs li.ng-isolate-scope"));
                     }}

});


module.exports = Calendar;
