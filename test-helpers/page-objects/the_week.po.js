
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
    navTabs : {value: function(){
                        return element.all(by.css("ul.nav.nav-tabs li.ng-isolate-scope"));
                     }}

});


module.exports = TheWeek;
