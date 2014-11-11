/**
 * Created by David Verdú on 11/11/14.
 */
'use strict';
var Calendar = function () {
        //browser.get('/');

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
