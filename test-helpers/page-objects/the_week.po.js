
/**
 * Created by David Verdú on 18/11/14.
 */
'use strict';
var TheWeek = function (go_to_page) {
    var go_to_page = go_to_page || true;
    if (go_to_page) {
      browser.setLocation('/the-week');
    }
};

TheWeek.prototype =  Object.create({}, {
    isCurrentPage : {value: function(){
                            return browser.getLocationAbsUrl().then(function(url) {
                              console.log("current url: " + url); 
                              return (url.indexOf("the-week") > -1);
                            });
                     }},
    header : {value: function(){
                        return element(by.css("div.the-week-header"));
                     }},
    getActiveContainerTab: {value: function() {
        return element(by.css("div.tab-content div.tab-pane.active"));
    }},
    getStockArea: {value: function(pos) {
        return element.all(by.repeater("area in stockAreas")).get(pos);
    }},
    getRegion: {value: function(stock_area_pos,region_pos) {
        return this.getStockArea(stock_area_pos).element.all(by.repeater("region in area.regions")).get(pos);
    }},
    goToTab:{value:function(tab_name){
        var tabs_map = {
            'bolsa': 0,
            'commodities': 1,
            's_n_p': 2
        };
        var pos = tabs_map[tab_name];
        return element(by.css("ul.nav.nav-tabs li a").row(pos)).click();
    }},
    navTabs : {value: function(){
                        return element.all(by.css("ul.nav.nav-tabs li.ng-isolate-scope"));
                     }}

});


module.exports = TheWeek;
