
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
    //Stocks tab
    getStockArea: {value: function(pos) {
        return this.getActiveContainerTab().all(by.repeater("area in stockAreas")).get(pos);
    }},
    getRegion: {value: function(stock_area_pos,region_pos) {
        return this.getStockArea(stock_area_pos).all(by.repeater("region in area.regions")).get(region_pos);
    }},
    getRegionTitle: {value: function(stock_area_pos,region_pos) {
        return this.getRegion(stock_area_pos,region_pos).element(by.css("tr:first-child td"));
    }},
    getRegionAsset: {value: function(stock_area_pos,region_pos,pos) {
        return this.getRegion(stock_area_pos,region_pos).all(by.repeater("indice in region.assets")).get(pos);
    }},
    getRegionAssetTitle: {value: function(stock_area_pos,region_pos,pos) {
        return this.getRegionAsset(stock_area_pos,region_pos,pos).element(by.css("td.index-name span"));
    }},
    getRegionAssetColumn: {value: function(stock_area_pos,region_pos,pos,column) {
        return this.getRegionAsset(stock_area_pos,region_pos,pos).all(by.css("td")).get(column);
    }},
    getRegionAssetImage: {value: function(stock_area_pos,region_pos,pos,column,type) {
        var type_pos = (type == 'bull' ? 1 : 0);
        return this.getRegionAssetColumn(stock_area_pos,region_pos,pos,column).all(by.css("img")).get(type_pos);
    }},
    getRegionAssetGraph: {value: function(stock_area_pos,region_pos,pos) {
        return this.getRegionAsset(stock_area_pos,region_pos,pos).element(by.css("img.graphic-image"));
    }},
    //Commodities
    getCommoditiesArea: {value: function(pos) {
        return this.getActiveContainerTab().all(by.repeater("area in commoditiesAreas")).get(pos);
    }},
    getCommodityRegion: {value: function(stock_area_pos,region_pos) {
        return this.getCommoditiesArea(stock_area_pos).all(by.repeater("region in area.regions")).get(region_pos);
    }},
    getCommodityRegionTitle: {value: function(stock_area_pos,region_pos) {
        return this.getCommodityRegion(stock_area_pos,region_pos).element(by.css("tr:first-child td"));
    }},
    getCommodityRegionAsset: {value: function(stock_area_pos,region_pos,pos) {
        return this.getCommodityRegion(stock_area_pos,region_pos).all(by.repeater("indice in region.assets")).get(pos);
    }},
    getCommodityRegionAssetTitle: {value: function(stock_area_pos,region_pos,pos) {
        return this.getCommodityRegionAsset(stock_area_pos,region_pos,pos).element(by.css("td.index-name span"));
    }},
    getCommodityRegionAssetColumn: {value: function(stock_area_pos,region_pos,pos,column) {
        return this.getCommodityRegionAsset(stock_area_pos,region_pos,pos).all(by.css("td")).get(column);
    }},
    getCommodityRegionAssetImage: {value: function(stock_area_pos,region_pos,pos,column,type) {
        var type_pos = (type == 'bull' ? 1 : 0);
        return this.getCommodityRegionAssetColumn(stock_area_pos,region_pos,pos,column).all(by.css("img")).get(type_pos);
    }},
    getCommodityRegionAssetGraph: {value: function(stock_area_pos,region_pos,pos) {
        return this.getCommodityRegionAsset(stock_area_pos,region_pos,pos).element(by.css("img.graphic-image"));
    }},
    //Common
    getGraphicPanel: {value: function() {
        return element(by.css("div#graphicPanel"));
    }},
    getGraphicImage: {value: function() {
        return element(by.css("div#graphicPanel img.selected-graphic-image"));
    }},
    goToTab:{value:function(tab_name){
        var tabs_map = {
            'bolsa': 0,
            'commodities': 1,
            's_n_p': 2
        };
        var pos = tabs_map[tab_name];
        return element.all(by.css("ul.nav.nav-tabs li a")).get(pos).click();
    }},
    navTabs : {value: function(){
                        return element.all(by.css("ul.nav.nav-tabs li.ng-isolate-scope"));
                     }}

});


module.exports = TheWeek;
