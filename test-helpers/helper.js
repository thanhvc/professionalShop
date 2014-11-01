/**
 * Created by robgon on 01/11/14.
 */
'use strict';
var Helper = function () {

};

Helper.prototype =  Object.create({}, {
    /*hasClass indicates if the element and the cls (classname) are equals
    *  -> expect(hasClass(element(by.name('getoffer')), 'ngDirty')).toBe(true);
    * */
    hasClass: {value: function (element, cls) {
        return element.getAttribute('class').then(function (classes) {
            return classes.split(' ').indexOf(cls) !== -1;
        });
    }}
});

module.exports = Helper;