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
                     }}

});


module.exports = Catalog;
