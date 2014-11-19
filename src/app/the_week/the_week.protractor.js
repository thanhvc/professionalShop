
/**
 * Created by David Verdú on 18/11/14.
 */

var loadFixture = require('../../../test-helpers/load-fixture.js');
var fixtureGenerator = require('../../../test-helpers/fixtures/the_week-fixture-generator.js');
var sha512 = require('sha512');
var ptor = protractor.getInstance();
var Home = require('../../../test-helpers/page-objects/home.po.js');
var PageLayout = require('../../../test-helpers/page-objects/page_layout.po.js');
var TheWeek = require('../../../test-helpers/page-objects/the_week.po.js');
var Helper = require('../../../test-helpers/helper.js');

describe('The week for non logged in users', function () {
        var home;
        var page_layout;
        var the_week_page;
        var helper = new Helper();
        var conString = browser.params.sqlCon;

        beforeEach(function () {
            var fixtures = fixtureGenerator.the_week_fixture();
            loadFixture.executeQueries(fixtures, conString);
            browser.ignoreSynchronization = true;
            home = new Home();
            page_layout = new PageLayout();
            //page_layout.showLoginBox();
            //page_layout.login('john.snow@thewall.north', 'phantom');
        });

        afterEach(function () {
            //page_layout.logout(); 
            ptor.sleep(2000);
            var fixtures = fixtureGenerator.remove_the_week_fixture();
            loadFixture.executeQueries(fixtures, conString);
            ptor.sleep(2000);
        });

        it('The Week navigation tab should not appear unless user is logged in', function() {
            expect(page_layout.the_weekNavLink().isDisplayed()).toBe(false);
        });

        it('The Week page should not be accessible for non logged in users', function() {
            the_week_page = new TheWeek(true);
            ptor.sleep(2000);
            expect(the_week_page.isCurrentPage()).toBe(false);
            expect(home.isCurrentPage()).toBe(true);
        });
});

describe('The week for logged in users', function () {
        var home;
        var page_layout;
        var the_week_page;
        var helper = new Helper();
        var conString = browser.params.sqlCon;

        beforeEach(function () {
            var fixtures = fixtureGenerator.the_week_fixture();
            loadFixture.executeQueries(fixtures, conString);
            browser.ignoreSynchronization = true;
            home = new Home();
            page_layout = new PageLayout();
            page_layout.showLoginBox();
            page_layout.login('john.snow@thewall.north', 'phantom');
            ptor.sleep(4000);
        });

        afterEach(function () {
            page_layout.logout(); 
            ptor.sleep(2000);
            var fixtures = fixtureGenerator.remove_the_week_fixture();
            loadFixture.executeQueries(fixtures, conString);
            ptor.sleep(2000);
        });
 
        describe('navigation tab',function() {
            it('The Week navigation tab should appear if user is logged in', function() {
                expect(page_layout.the_weekNavLink().isDisplayed()).toBe(true);
            });
    
            it('The Week navigation tab should link to the_week', function() {
                page_layout.the_weekNavLink().click();
                ptor.sleep(4000);
                the_week_page = new TheWeek(false);
                expect(the_week_page.isCurrentPage()).toBe(true);
            });
        });
        
        describe('Inside The Week page', function() {
            beforeEach(function() {
                the_week_page = new TheWeek(true);
                ptor.sleep(4000);
            });
            
            it('should contain three tabs', function() { expect(the_week_page.navTabs().count()).toBe(3); });

            it('should be true', function() { 
                expect(true).toBe(true); 
                ptor.sleep(9000);
            });
        });

});
    
