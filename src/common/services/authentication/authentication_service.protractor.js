/**
 * Created by Roberto on 10/06/14.
 */


var loadFixture = require('../../../../test-helpers/load-fixture.js');
var sha512 = require('sha512');
var ptor = protractor.getInstance();
var Home = require('../../../../test-helpers/page-objects/home.po.js');
var Helper = require('../../../../test-helpers/helper.js');
var expiredUsersFixture = require('../../../../test-helpers/fixtures/expired-users-fixture.js');
var LookupDiary = require('../../../../test-helpers/page-objects/lookupDiary.po.js');
describe('The Login page ', function () {





    var home;
    var lookupDiary;
    var helper;
    var conString = browser.params.sqlCon;
    /*'postgres://super:moserverpass@localhost:25432/moserver'*/
    beforeEach(function () {
        helper = new Helper();
        var fixtures = expiredUsersFixture.fixture_expired_users();
        loadFixture.executeQueries(fixtures, conString);
        ptor.sleep(helper.oneSec());
        // loadFixture.loadMultipleFixture(fixture1, fixture2, conString);
        browser.ignoreSynchronization = true;


        home = new Home();
        lookupDiary = new LookupDiary();
    });
    afterEach(function () {
        var fixtures = expiredUsersFixture.remove_fixtures_expired_users();
        loadFixture.executeQueries(fixtures, conString);
        ptor.sleep(helper.oneSec());

    });
    it('should be deny the access', function () {
        home.showLoginBox();
        home.login('to_expire@thewall.north', 'phantom');
        ptor.sleep(helper.oneSec());
        expect(ptor.getCurrentUrl()).toContain('/home');
        expect(home.getExpiredModal()).not.toBeNull();;
        /*lookupDiary.goToLookupDiary();
        ptor.sleep(helper.oneSec());

        expect(ptor.getCurrentUrl()).toContain('/lookup-diary');
        expect(lookupDiary.getSimpleName(0,0).getText()).toEqual("Long name Asset 1");
        ptor.sleep(helper.oneSec());
        expect(lookupDiary.getNumberTotalPatterns(0).getText()).toEqual("4");
        expect(lookupDiary.getNumberFoundPatterns(0).getText()).toEqual("4");
        lookupDiary.goToTab(1);
        ptor.sleep(helper.oneSec());
        //pairs
        lookupDiary.getPairName(1,0,0).getText().then(function(data) {
            expect(data).toEqual("Long name Asset Pair 1 1");
        });
        lookupDiary.getPairName(1,0,1).getText().then(function(data) {
            expect(data).toEqual("Long name Asset Pair 1 2");
        });
        ptor.sleep(helper.oneSec());
        expect(lookupDiary.getNumberTotalPatterns(1).getText()).toEqual("4");
        expect(lookupDiary.getNumberFoundPatterns(1).getText()).toEqual("4");
        //index
        lookupDiary.goToTab(2);
        ptor.sleep(helper.oneSec());
        //pairs
        lookupDiary.getSimpleName(2,0).getText().then(function(data) {
            expect(data).toEqual("Long name Asset Index 1");
        });
        lookupDiary.getSimpleName(2,1).getText().then(function(data) {
            expect(data).toEqual("Long name Asset Index 2");
        });
        ptor.sleep(helper.oneSec());
        expect(lookupDiary.getNumberTotalPatterns(2).getText()).toEqual("4");
        expect(lookupDiary.getNumberFoundPatterns(2).getText()).toEqual("4");
        lookupDiary.selectIndexType(1); // to pairs
        ptor.sleep(helper.oneSec());
        lookupDiary.getPairName(2,0,0).getText().then(function(data) {
            expect(data).toEqual("Long name Asset Pair Index 1 1");
        });
        lookupDiary.getPairName(2,0,1).getText().then(function(data) {
            expect(data).toEqual("Long name Asset Pair Index 1 2");
        });
        ptor.sleep(helper.oneSec());
        expect(lookupDiary.getNumberTotalPatterns(2).getText()).toEqual("4");
        expect(lookupDiary.getNumberFoundPatterns(2).getText()).toEqual("4");
        lookupDiary.goToTab(3);
        ptor.sleep(helper.oneSec());
        expect(lookupDiary.getSimpleName(3,0).getText()).toEqual("Long name Asset Future 1");
        ptor.sleep(helper.oneSec());
        expect(lookupDiary.getNumberTotalPatterns(3).getText()).toEqual("4");
        expect(lookupDiary.getNumberFoundPatterns(3).getText()).toEqual("4");*/

    });



});
