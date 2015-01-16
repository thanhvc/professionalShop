

/**
 * Created by David Verdú on 30/12/14.
 */

var loadFixture = require('../../../test-helpers/load-fixture.js');
var fixtureGenerator = require('../../../test-helpers/fixtures/publication_and_renew_mail-fixture-generator.js');
var sha512 = require('sha512');
var ptor = protractor.getInstance();
var Home = require('../../../test-helpers/page-objects/home.po.js');
var Helper = require('../../../test-helpers/helper.js');
var DateServerConfigMod = require('../../../test-helpers/date-server-config.js');

describe('Pack renewal notification mails', function () {
        var helper = new Helper();
        var conString = browser.params.sqlCon;
        var queue = [];
        var mutex = 0;

        beforeEach(function () {
            //var fixtures = fixtureGenerator.remove_publication_and_renew_mail_fixture();
            //loadFixture.executeQueries(fixtures, conString);
            //ptor.sleep(4000);
            var fixtures = fixtureGenerator.publication_and_renew_mail_fixture();
            loadFixture.executeQueries(fixtures, conString);
            browser.ignoreSynchronization = true;
            home = new Home();
            ptor.sleep(2000);
            //home.showLoginBox();
            //home.login('john.snow@thewall.north', 'phantom');
        });

        beforeEach(function () {
            //set date on server
            var vagrant_id = browser.params.serverVagrantId;
            var dsc = new DateServerConfigMod.DateServerConfig(vagrant_id);
            dsc.setServerDateAndRestart("2014-11-15 12:59:20");
            ptor.sleep(18000);
        });

        afterEach(function () {
            expect(queue.length).toEqual(0); //1 email should be sent
        });

        afterEach(function () {


                var select_fixture = fixtureGenerator.select_renewal_fixture();
                loadFixture.executeQuery(select_fixture, conString, function(result) {
                    expect(result.rowCount).toBe(2);
                    if (result.rowCount > 0) {
                        expect(result.rows[0].status).toBe(1);
                    }
                });



        });

        afterEach(function () {
            //home.logout(); //TODO
            ptor.sleep(2000);
            var fixtures = fixtureGenerator.remove_publication_and_renew_mail_fixture();
            loadFixture.executeQueries(fixtures, conString);
        });

        it("emails should be sent",function() {
            expect(true).toBe(true);

            queue.push( { sender: 'market.observatory@edosoftfactory.com',
                        receivers: { 'test3.user@foo.bar': true },
                        receiver_email: 'test3.user@foo.bar',
                        receiver_name : "Test3 user",
                        packs : [ {name: "Estados Unidos Pack I", code: "USA-S-1"},
                                  {name: "Estados Unidos Pack II", code: "USA-S-2"}],
                        subject: 'Renovación Pack Market Observatory'});


            handler = function(addr,id,email) {
                expect(queue.length).not.toEqual(0);
                var msg;
                var succeed = false;
                while(!succeed){
                    while(mutex>0){ ptor.sleep(100); }
                    var m=mutex++;   //"Simultaneously" read and increment
                    if(m>0)mutex--;
                    else{
                        //Critical section =============
                        msg = queue.shift();
                        //Critical section =============
                        succeed=true;
                        mutex--;
                    }
                }
                console.log(addr);
                console.log(id);
                console.log(email);
                expect(email.sender).toEqual(msg.sender);
                expect(email.receivers).toEqual(msg.receivers);
                //expect(email.subject).toEqual(msg.subject);
                var jsdom = require("jsdom");
            
                jsdom.env(
                    email.html,
                    ["http://code.jquery.com/jquery.js"],
                    function (errors, window) {
                        expect(window.$("span").text()).toMatch(msg.receiver_name);
                        expect(window.$("span").text()).toMatch("Uno o varios packs que");
                        expect(window.$("span").text()).toMatch("pendiente de renovar");
                        for (var i=0;i<msg.packs.length;i++) {
                            expect(window.$("ul li").text()).toMatch("Renovar " + msg.packs[i].name);
                            expect(window.$("ul li:nth-child(" + (i+1) +") a").attr("href")).toMatch("renew-pack/" + msg.packs[i].code);
                        }
                    }
                );
                        
                ptor.sleep(10000);
                var select_fixture = fixtureGenerator.select_email_log_fixture({destiny_address: msg.receiver_email});
                loadFixture.executeQuery(select_fixture, conString, function(result) {
                    expect(result.rowCount).toBe(1);
                    if (result.rowCount == 1) {
                        expect(result.rows[0].type).toBe(6);
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
