/**
 * Created by davver on 06/03/15.
 */
'use strict';
var Reactivate = function (go_to_page) {
    //var go_to_page = go_to_page || true;
    //if (go_to_page) {
    //    browser.get('/reactivate');
    //}
};

Reactivate.prototype =  Object.create({}, {
    goToPage : {value:function(){
        browser.get('/reactivate');
    }},
    isCurrentPage : {value: function(){
                            return browser.getLocationAbsUrl().then(function(url) {
                              console.log("current url: " + url); 
                              return (url.indexOf("reactivate") > -1);
                            });
                     }}

});


module.exports = Reactivate;
