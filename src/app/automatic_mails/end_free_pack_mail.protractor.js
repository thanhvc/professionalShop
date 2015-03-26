
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
        var mutex = 0;

        beforeEach(function () {
            //set date on server
            var vagrant_id = browser.params.serverVagrantId;
            var dsc = new DateServerConfigMod.DateServerConfig(vagrant_id);
            dsc.setServerDateAndRestart("2014-11-17 15:39:20");
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
            expect(queue.length).toEqual(0); //3 emails should be sent
        });

        afterEach(function () {
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
                        email_log_type: 11,
                        email_method: 'html',
                        content_sentences: ["Ha concluido el acceso a los contenidos de la"],
                        subject: 'Fin de Suscripción Gratis 15 días'});

            queue.push( { sender: 'market.observatory@edosoftfactory.com',
                        receivers: { 'test4.user@foo.bar': true },
                        receiver_email: 'test4.user@foo.bar',
                        receiver_name : "Test4 user",
                        email_log_type: 11,
                        email_method: 'html',
                        content_sentences: ["Ha concluido el acceso a los contenidos de la"],
                        subject: 'Fin de Suscripción Gratis 15 días'});
            
            queue.push( { sender: 'market.observatory@edosoftfactory.com',
                        receivers: { 'test2.user@foo.bar': true },
                        receiver_email: 'test2.user@foo.bar',
                        receiver_name : "Test2 user",
                        email_log_type: 12,
                        email_method: 'html',
                        content_sentences: ["Recuerde que el acceso online a los contenidos","22 de noviembre de 2014"],
                        subject: 'Acceso a contenidos de MarketObservatory'});


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
           
                var email_method = msg.email_method || 'html';
                var content = (email_method === 'html' ? email.html : email.body); 

                jsdom.env(
                    content,
                    ["http://code.jquery.com/jquery.js"],
                    function (errors, window) {
                        expect(window.$("a").attr('href')).toMatch('marketobservatory.com');
                        expect(window.$("span").text()).toMatch(msg.receiver_name);
                        for (var i=0;i<msg.content_sentences.length;i++) {
                            expect(window.$("span").text()).toMatch(msg.content_sentences[i]);
                        }
                    }
                );
                        
                ptor.sleep(10000);
                var select_fixture = fixtureGenerator.select_email_log_fixture({destiny_address: msg.receiver_email});
                loadFixture.executeQuery(select_fixture, conString, function(result) {
                    expect(result.rowCount).toBe(1); //sometimes it fails unexpectly
                    if (result.rowCount == 1) {
                        expect(result.rows[0].type).toBe(msg.email_log_type);
                    }
                });
            };
                    
            var ms = require('smtp-tester').init(2025,{"disableDNSValidation":true});
            ms.bind(handler);
            ptor.sleep(9000);
            ptor.sleep(60000);
        });            

});
