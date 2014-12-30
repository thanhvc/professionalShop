
/**
 * Created by David Verdú on 29/12/14.
 */

var loadFixture = require('../../../test-helpers/load-fixture.js');
var fixtureGenerator = require('../../../test-helpers/fixtures/end_free_pack_mail-fixture-generator.js');
var sha512 = require('sha512');
var ptor = protractor.getInstance();
var Home = require('../../../test-helpers/page-objects/home.po.js');
var Helper = require('../../../test-helpers/helper.js');
var DateServerConfigMod = require('../../../test-helpers/date-server-config.js');

describe('End free pack notification mails', function () {
        var helper = new Helper();
        var conString = browser.params.sqlCon;
        var queue = [];

        beforeEach(function () {
            //set date on server
            var vagrant_id = browser.params.serverVagrantId;
            var dsc = new DateServerConfigMod.DateServerConfig(vagrant_id);
            dsc.setServerDateAndRestart("2014-11-17 15:39:30");
            //dsc.setServerDateAndRestart("2014-11-17 11:59:30");
            ptor.sleep(18000);
        });

        beforeEach(function () {
            //var fixtures = fixtureGenerator.remove_end_free_pack_mail_fixture();
            //loadFixture.executeQueries(fixtures, conString);
            //ptor.sleep(4000);
            var fixtures = fixtureGenerator.end_free_pack_mail_fixture();
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
            var fixtures = fixtureGenerator.remove_end_free_pack_mail_fixture();
            loadFixture.executeQueries(fixtures, conString);
        });

        it("emails should be sent",function() {
            expect(true).toBe(true);

            queue.push( { sender: 'market.observatory@edosoftfactory.com',
                        receivers: { 'test1.user@foo.bar': true },
                        receiver_email: 'test1.user@foo.bar',
                        receiver_name : "Test1 user",
                        subject: 'Aviso Fin Subscripcion Market Observatory'});

            queue.push( { sender: 'market.observatory@edosoftfactory.com',
                        receivers: { 'test4.user@foo.bar': true },
                        receiver_email: 'test4.user@foo.bar',
                        receiver_name : "Test4 user",
                        subject: 'Aviso Fin Subscripcion Market Observatory'});
            
            queue.push( { sender: 'market.observatory@edosoftfactory.com',
                        receivers: { 'test2.user@foo.bar': true },
                        receiver_email: 'test2.user@foo.bar',
                        receiver_name : "Test2 user",
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
                        expect(window.$("a").attr('href')).toMatch('\^mo\\.devel\\.edosoftfactory.com');
                        expect(window.$("span").text()).toMatch(msg.receiver_name);
                        expect(window.$("span").text()).toMatch("Su periodo de");
                        expect(window.$("span").text()).toMatch("Gratuita ha concluido");
                    }
                );
                        
                ptor.sleep(2000);
                var select_fixture = fixtureGenerator.select_email_log_fixture({destiny_address: msg.receiver_email});
                loadFixture.executeQuery(select_fixture, conString, function(result) {
                    expect(result.rowCount).toBe(1);
                    if (result.rowCount == 1) {
                        expect(result.rows[0].type).toBe(11);
                    }
                });
            };
                    
            var ms = require('smtp-tester').init(2025,{"disableDNSValidation":true});
            ms.bind(handler);
            ptor.sleep(9000);
            ptor.sleep(60000);
            //expect(queue.length).toEqual(0); //3 emails should be sent
        });            

});
