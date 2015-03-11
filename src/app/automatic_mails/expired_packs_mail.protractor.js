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
//dsc.setServerDateAndRestart("2014-12-01 11:59:30");
dsc.setServerDateAndRestart("2014-12-01 00:04:30");
ptor.sleep(18000);

describe('Expired pack notification mails', function () {
        var helper = new Helper();
        var conString = browser.params.sqlCon;
        var queue = [];
        var mutex = 0;

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
            expect(queue.length).toEqual(0); //2 emails should be sent
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
                        receiver_email : "test1.user@foo.bar",
                        receiver_name : "Test1 user",
                        //packs: [{name: "Estados Unidos Pack I", period: "noviembre 2013 diciembre 2014"},
                        //        {name: "Estados Unidos Pack II", period: "Septiembre 2014 diciembre 2014"},
                        //        {name: "Estados Unidos Pair Pack I", period: "noviembre 2014 diciembre 2014"}
                        //],                                
                        packs: [{name: "Estados Unidos Pack I", period: "noviembre 2013 noviembre 2014"},
                                {name: "Estados Unidos Pack II", period: "septiembre 2014 noviembre 2014"},
                                {name: "Estados Unidos Pair Pack I", period: "noviembre 2014 noviembre 2014"}
                        ],                                
                        subject: 'Aviso Fin Subscripción Market Observatory'});

            queue.push( { sender: 'market.observatory@edosoftfactory.com',
                        receivers: { 'test2.user@foo.bar': true },
                        receiver_email : "test2.user@foo.bar",
                        receiver_name : "Test2 user",
                        //packs: [{name: "Estados Unidos Pair Pack I", period: "noviembre 2013 diciembre 2014"},
                        //        {name: "Estados Unidos Pair Pack II", period: "Septiembre 2014 diciembre 2014"}
                        //],                                
                        packs: [{name: "Estados Unidos Pair Pack I", period: "noviembre 2013 noviembre 2014"},
                                {name: "Estados Unidos Pair Pack II", period: "septiembre 2014 noviembre 2014"}
                        ],                                
                        subject: 'Aviso Fin Subscripción Market Observatory'});

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
                expect(email.subject).toEqual(msg.subject);
                var jsdom = require("jsdom");
            
                jsdom.env(
                    email.html,
                    ["http://code.jquery.com/jquery.js"],
                    function (errors, window) {
                        expect(window.$("a").attr('href')).toMatch('marketobservatory.com');
                        expect(window.$("span").text()).toMatch(msg.receiver_name);
                        for (var i=0;i<msg.packs.length;i++) {
                            expect(window.$("ul li").text()).toMatch(msg.packs[i].name);
                            expect(window.$("ul li").text()).toMatch(msg.packs[i].period);
                        }
                    }
                );
                        
                ptor.sleep(11000);

                var select_fixture = fixtureGenerator.select_email_log_fixture({destiny_address: msg.receiver_email} );
                loadFixture.executeQuery(select_fixture, conString, function(result) {
                    expect(result.rowCount).not.toBe(0); //sometimes fails
                    if (result.rowCount > 0) {
                        expect(result.rows[0].type).toBe(9);
                    }
                    if (result.rowCount > 1) {
                        expect(result.rows[1].type).toBe(9);
                    }
                });
            };
                    
            var ms = require('smtp-tester').init(2025,{"disableDNSValidation":true});
            ms.bind(handler);
            ptor.sleep(9000);
            ptor.sleep(60000);
        });            

});
