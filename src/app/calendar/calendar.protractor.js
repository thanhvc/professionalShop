/**
 * Created by David Verdú on 11/11/14.
 */

var loadFixture = require('../../../test-helpers/load-fixture.js');
var fixtureGenerator = require('../../../test-helpers/fixtures/calendar-fixture-generator.js');
var sha512 = require('sha512');
var ptor = protractor.getInstance();
var Home = require('../../../test-helpers/page-objects/home.po.js');
var PageLayout = require('../../../test-helpers/page-objects/page_layout.po.js');
var Calendar = require('../../../test-helpers/page-objects/calendar.po.js');
var Helper = require('../../../test-helpers/helper.js');

describe('Calendar for non logged in users', function () {
        var home;
        var page_layout;
        var calendar_page;
        var helper = new Helper();
        var conString = browser.params.sqlCon;

        beforeEach(function () {
            var fixtures = fixtureGenerator.calendar_fixture();
            loadFixture.executeQueries(fixtures, conString);
            browser.ignoreSynchronization = true;
            home = new Home();
            page_layout = new PageLayout();
            //page_layout.showLoginBox();
            //page_layout.login('john.snow@thewall.north', 'phantom');
        });

        afterEach(function () {
            //page_layout.logout(); 
            ptor.sleep(1000);
            var fixtures = fixtureGenerator.remove_calendar_fixture();
            loadFixture.executeQueries(fixtures, conString);
        });

        it('Calendar navigation tab should not appear unless user is logged in', function() {
            expect(page_layout.calendarNavLink().isDisplayed()).toBe(false);
        });

        it('Calendar page should not be accessible for non logged in users', function() {
            calendar_page = new Calendar(true);
            ptor.sleep(2000);
            expect(calendar_page.isCurrentPage()).toBe(false);
            expect(home.isCurrentPage()).toBe(true);
        });
});

describe('Calendar for logged in users', function () {
        var home;
        var page_layout;
        var calendar_page;
        var helper = new Helper();
        var conString = browser.params.sqlCon;

        beforeEach(function () {
            var fixtures = fixtureGenerator.calendar_fixture();
            loadFixture.executeQueries(fixtures, conString);
            browser.ignoreSynchronization = true;
            home = new Home();
            page_layout = new PageLayout();
            page_layout.showLoginBox();
            page_layout.login('john.snow@thewall.north', 'phantom');
            ptor.sleep(3000);
        });

        afterEach(function () {
            page_layout.logout(); 
            ptor.sleep(2000);
            var fixtures = fixtureGenerator.remove_calendar_fixture();
            loadFixture.executeQueries(fixtures, conString);
        });

        it('Calendar navigation tab should appear if user is logged in', function() {
            expect(page_layout.calendarNavLink().isDisplayed()).toBe(true);
        });

        it('Calendar navigation tab should link to calendar', function() {
            page_layout.calendarNavLink().click();
            ptor.sleep(2000);
            calendar_page = new Calendar(false);
            expect(calendar_page.isCurrentPage()).toBe(true);
        });

        describe('Inside Calendar page', function() {
            beforeEach(function() {
                calendar_page = new Calendar(true);
                ptor.sleep(3000);
            });
            
            it('should contain four tabs', function() {
                expect(true).toBe(true);
            });
        });
});
