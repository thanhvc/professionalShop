/**
 * Created by David Verdú on 11/11/14.
 */
'use strict';
var Calendar = function (go_to_page) {
    var go_to_page = go_to_page || true;
    if (go_to_page) {
      //browser.get('/sign-up');
      browser.setLocation('/calendar');
    }
};

Calendar.prototype =  Object.create({}, {
    isCurrentPage : {value: function(){
                            return browser.getLocationAbsUrl().then(function(url) {
                              console.log("current url: " + url); 
                              return (url.indexOf("calendar") > -1);
                            });
                     }}

});


module.exports = Calendar;
