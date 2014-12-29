/**
 * Created by David Verdú on 22/12/14.
 */

var loadFixture = require('../../../test-helpers/load-fixture.js');
var fixtureGenerator = require('../../../test-helpers/fixtures/expired_packs_mail-fixture-generator.js');
var sha512 = require('sha512');
var ptor = protractor.getInstance();
var Home = require('../../../test-helpers/page-objects/home.po.js');
var Helper = require('../../../test-helpers/helper.js');
var DateServerConfigMod = require('../../../test-helpers/date-server-config.js');

//set date on server
var vagrant_id = browser.params.serverVagrantId;
var dsc = new DateServerConfigMod.DateServerConfig(vagrant_id);
dsc.setServerDateAndRestart("2014-12-01 11:59:30");
ptor.sleep(18000);

describe('Expired pack notification mails', function () {
        var helper = new Helper();
        var conString = browser.params.sqlCon;
        var queue = [];

        beforeEach(function () {
            var fixtures = fixtureGenerator.expired_packs_mail_fixture();
            loadFixture.executeQueries(fixtures, conString);
            browser.ignoreSynchronization = true;
            home = new Home();
            ptor.sleep(2000);
            //home.showLoginBox();
            //home.login('john.snow@thewall.north', 'phantom');
        });

        afterEach(function () {
            //home.logout(); //TODO
            ptor.sleep(2000);
            var fixtures = fixtureGenerator.remove_expired_packs_mail_fixture();
            loadFixture.executeQueries(fixtures, conString);
        });

        it("emails should be sent",function() {
            expect(true).toBe(true);

            queue.push( { sender: 'market.observatory@edosoftfactory.com',
                        receivers: { 'test1.user@foo.bar': true },
                        receiver_name : "Test1 user",
                        packs: [{name: "Estados Unidos Pack I", period: "November 2013 December 2014"},
                                {name: "Estados Unidos Pack II", period: "September 2014 December 2014"},
                                {name: "Estados Unidos Pair Pack I", period: "November 2014 December 2014"}
                        ],                                
                        subject: 'Aviso Fin Subscripcion Market Observatory'});

            queue.push( { sender: 'market.observatory@edosoftfactory.com',
                        receivers: { 'test2.user@foo.bar': true },
                        receiver_name : "Test2 user",
                        packs: [{name: "Estados Unidos Pair Pack I", period: "November 2013 December 2014"},
                                {name: "Estados Unidos Pair Pack II", period: "September 2014 December 2014"}
                        ],                                
                        subject: 'Aviso Fin Subscripcion Market Observatory'});

            handler = function(addr,id,email) {
                expect(queue.length).not.toEqual(0);
                msg = queue.shift();
                console.log(addr);
                console.log(id);
                console.log(email);
                expect(email.sender).toEqual(msg.sender);
                expect(email.receivers).toEqual(msg.receivers);
                expect(email.subject).toEqual(msg.subject);
                var jsdom = require("jsdom");
            
                jsdom.env(
                    email.html,
                    ["http://code.jquery.com/jquery.js"],
                    function (errors, window) {
                        expect(window.$("a").attr('href')).toMatch('\^http:\\/\\/mo\\.devel\\.edosoftfactory.com/');
                        expect(window.$("span").text()).toMatch(msg.receiver_name);
                        expect(window.$("span").text()).toMatch('John Doe');
                        for (var i=0;i<msg.packs.length;i++) {
                            expect(window.$("ul li").text()).toMatch(msg.packs[i].name);
                            expect(window.$("ul li").text()).toMatch(msg.packs[i].period);
                        }
                    }
                );
            };
                    
            var ms = require('smtp-tester').init(2025,{"disableDNSValidation":true});
            ms.bind(handler);
            ptor.sleep(9000);
            ptor.sleep(60000);
            expect(queue.length).toEqual(0); //2 emails should be sent
        });            

});
