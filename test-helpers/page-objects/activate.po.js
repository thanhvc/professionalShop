/**
 * Created by David Verdú on 15/12/14.
 */
'use strict';
var Activate = function (activation_code) {
    var activation_code = activation_code || '1111111111111111';
    if (activation_code) {
      //browser.get('/sign-up');
      browser.setLocation('/activate/'+activation_code);
    }
};

Activate.prototype =  Object.create({}, {

    isCurrentPage : {value: function(){
                            return browser.getLocationAbsUrl().then(function(url) {
                              console.log("current url: " + url); 
                              return (url.indexOf("activate") > -1);
                            });
                     }}

});

module.exports = Activate;
