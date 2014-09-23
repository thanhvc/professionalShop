/**
 * Created by Aitor on 23/09/14.
 */
base_url = 'http://mo.devel.edosoftfactory.com/'
url_suffix = '#/lookup-diary'
var ptor = protractor.getInstance();;
var LookupDiary = function () {


    this.open = function () {
        browser.get(base_url);
        browser.ignoreSynchronization = true;
        but = element(by.css(".no-logged-box"));
        but.click();
        element(by.model('fields.email')).sendKeys('aitor.carrera@edosoft.es');
        element(by.model('fields.password')).sendKeys('factory216c');
        element.all(by.css('.mo-button')).get(0).click();
        ptor.sleep(4000)
        browser.setLocation('/lookup-diary');
        ptor.sleep(4000)
    }



};

LookupDiary.prototype = Object.create({}, {
    selectedMonth: { get: function () {
        return element(by.binding('filterOptions.filters.month.monthString + " " + filterOptions.filters.month.year')).getAttribute('value')
    }}


});

describe('The Daily Lookup', function () {
        var page;
        beforeEach(function () {
            page = new LookupDiary();
            page.open();

        });

        it(' month filter should show current month', function () {
                    var d = new Date();
                    browser.get(base_url + url_suffix);

                    var month = new Array();
                    month[0] = "January";
                    month[1] = "February";
                    month[2] = "March";
                    month[3] = "April";
                    month[4] = "May";
                    month[5] = "June";
                    month[6] = "July";
                    month[7] = "August";
                    month[8] = "September";
                    month[9] = "October";
                    month[10] = "November";
                    month[11] = "December";
                    var n = month[d.getMonth()];

                    expect(page.selectedMonth).toEqual(n);
        });


    }
)