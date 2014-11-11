/**
 * Created by David Verdú on 10/11/14.
 */
'use strict';
var SignUpSuccessful = function () {

};

SignUpSuccessful.prototype =  Object.create({}, {

    isCurrentPage : {value: function(){
                            return browser.getLocationAbsUrl().then(function(url) {
                              console.log("current url: " + url); 
                              return (url.indexOf("sign-up-successful") > -1);
                            });
                     }}

});

module.exports = SignUpSuccessful;
