
/**
 * Created by David Verdú on 31/12/14.
 */

var loadFixture = require('../../../test-helpers/load-fixture.js');
var fixtureGenerator = require('../../../test-helpers/fixtures/alerts_mail-fixture-generator.js');
var sha512 = require('sha512');
var ptor = protractor.getInstance();
var Home = require('../../../test-helpers/page-objects/home.po.js');
var Helper = require('../../../test-helpers/helper.js');
var DateServerConfigMod = require('../../../test-helpers/date-server-config.js');

describe('Alert notification mails', function () {
        var helper = new Helper();
        var conString = browser.params.sqlCon;
        var queue = [];
        var mutex = 0;

        beforeEach(function () {
            //var fixtures = fixtureGenerator.remove_alerts_mail_fixture();
            //loadFixture.executeQueries(fixtures, conString);
            //ptor.sleep(4000);
            var fixtures = fixtureGenerator.alerts_mail_fixture();
            loadFixture.executeQueries(fixtures, conString);
            browser.ignoreSynchronization = true;
            home = new Home();
            ptor.sleep(2000);
            //home.showLoginBox();
            //home.login('john.snow@thewall.north', 'phantom');
        });

        beforeEach(function () {
            //set date on server
            //var vagrant_id = browser.params.serverVagrantId;
            //var dsc = new DateServerConfigMod.DateServerConfig(vagrant_id);
            //dsc.setServerDateAndRestart("2014-11-10 11:59:20");
            //ptor.sleep(18000);
        });

        afterEach(function () {
            expect(queue.length).toEqual(0); //4 emails should be sent
        });

        afterEach(function () {
            var select_fixture = fixtureGenerator.select_alert_fixture({});
            loadFixture.executeQuery(select_fixture, conString, function(result) {
                expect(result.rowCount).toBe(3); //.It must be 3 alerts left in database. 
            });
        });

        afterEach(function () {
            var select_fixture = fixtureGenerator.select_email_log_fixture();
            loadFixture.executeQuery(select_fixture, conString, function(result) {
                expect(result.rowCount).not.toBe(0); //sometimes fails
                if (result.rowCount > 0) {
                    expect(result.rows[0].type).toBe(5);
                }
                if (result.rowCount > 1) {
                    expect(result.rows[1].type).toBe(5);
                }
            });
        });

        afterEach(function () {
            //home.logout(); //TODO
            ptor.sleep(2000);
            var fixtures = fixtureGenerator.remove_alerts_mail_fixture();
            loadFixture.executeQueries(fixtures, conString);
        });

        it("emails should be sent",function() {
            expect(true).toBe(true);

            queue.push( { sender: 'market.observatory@edosoftfactory.com',
                        receivers: { 'test1.user@foo.bar': true },
                        receiver_email: 'test1.user@foo.bar',
                        receiver_name : "Test1 user",
                        pattern_name : "LONG NAME ASSET 1",
                        condition: "Mayor que 5.0",
                        last_quote: "ltimo: 10.0",
                        close_date: "Fecha de Cierre: 30 octubre 2014",
                        subject: 'Alarma Market Observatory'});

            queue.push( { sender: 'market.observatory@edosoftfactory.com',
                        receivers: { 'test1.user@foo.bar': true },
                        receiver_email: 'test1.user@foo.bar',
                        receiver_name : "Test1 user",
                        pattern_name : "LONG NAME ASSET PAIR 1 1",
                        condition: "Menor que 25.0",
                        last_quote: "Relativa: 20.0",
                        close_date: "Fecha de Cierre: 19 octubre 2014",
                        subject: 'Alarma Market Observatory'});
            
            queue.push( { sender: 'market.observatory@edosoftfactory.com',
                        receivers: { 'test2.user@foo.bar': true },
                        receiver_email: 'test2.user@foo.bar',
                        receiver_name : "Test2 user",
                        pattern_name : "LONG NAME ASSET 2",
                        condition: "Menor que 30.0",
                        last_quote: "ltimo: 15.0",
                        close_date: "Fecha de Cierre: 30 octubre 2014",
                        subject: 'Alarma Market Observatory'});

            queue.push( { sender: 'market.observatory@edosoftfactory.com',
                        receivers: { 'test4.user@foo.bar': true },
                        receiver_email: 'test4.user@foo.bar',
                        receiver_name : "Test4 user",
                        pattern_name : "LONG NAME ASSET PAIR 2 1",
                        condition: "Mayor que 20.0",
                        last_quote: "Relativa: 30.0",
                        close_date: "Fecha de Cierre: 30 octubre 2014",
                        subject: 'Alarma Market Observatory'});


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
            
                expect(true).toBe(true);

                jsdom.env(
                    email.html,
                    ["http://code.jquery.com/jquery.js"],
                    function (errors, window) {
                        expect(window.$("a").attr('href')).toMatch('marketobservatory.com');
                        expect(window.$("span").text()).toMatch(msg.receiver_name);
                        //expect(window.$("span").text()).toMatch("John Doe");
                        expect(window.$("span").text()).toMatch(msg.pattern_name);
                        expect(window.$("span").text()).toMatch(msg.condition);
                        expect(window.$("span").text()).toMatch(msg.last_quote);
                        expect(window.$("span").text()).toMatch(msg.close_date);
                        expect(window.$("span").text()).toMatch("se ha activado la siguiente alarma");
                    }
                );
                        
                //ptor.sleep(12000);


            };
                    
            var ms = require('smtp-tester').init(2025,{"disableDNSValidation":true});
            ms.bind(handler);
            
            //set date on the server 
            var vagrant_id = browser.params.serverVagrantId;
            var dsc = new DateServerConfigMod.DateServerConfig(vagrant_id);
            dsc.setServerDateAndRestart("2014-11-10 11:59:20");

            ptor.sleep(60000);
        });            

});

