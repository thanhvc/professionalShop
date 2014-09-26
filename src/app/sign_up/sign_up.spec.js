describe('The SignUp ', function () {
    beforeEach(angular.mock.module("ngMo"));
    describe('form ', function () {

        var compile;
        var scope;
        var state;
        var template,httpMock,$location;
        var data = {password: "pass", length: 1};
        beforeEach(module('ui.router'));//needed to user $state
        beforeEach(module('ui.bootstrap'));//to load $modal
        beforeEach(angular.mock.module('singUp'));//start the module
        beforeEach(inject(function ($templateCache, $compile, $rootScope, $controller, $state, _$location_, $httpBackend) {

            httpMock = $httpBackend;
            $location = _$location_;
            httpMock.when('GET', $rootScope.urlService+'/islogged').respond(200);
            httpMock.when('GET', $rootScope.urlService+'/countries').respond(200);
            httpMock.when('POST', $rootScope.urlService+'/login').respond(200,{'result': 'ok'});
            httpMock.when('POST', $rootScope.urlService+'/testemail').respond(
                {
                    result: "ok"
                });
            httpMock.when('POST', $rootScope.urlService+'/user').respond({
                status: "ok"
            });
            //create an empty scope
            scope = $rootScope.$new();
            //declare the controller and inject our empty scope
            $controller('SignupCtrl', {$scope: scope});
            state = $state;
            compile = $compile;
            template = $templateCache;
        }));
        // tests start here

        it(' ', function () {
            state.go('signup');
            scope.$apply();
            //testing the user initialization
            expect(scope.user).toNotBe(undefined);
            //testing the patterns

            //namePattern (letters, spaces, and allowed special characters)
            var name = "Double name";
            expect(scope.namePattern.test(name)).toBe(true);
            name = "Invalid n4m3";
            expect(scope.namePattern.test(name)).toBe(false);
            name = "name'special chäracters";
            expect(scope.namePattern.test(name)).toBe(true);
            name = "name with ¿invalid chars?";
            expect(scope.namePattern.test(name)).toBe(false);

            //zipPattern (numbers and letters)

            var zipCode = "1234";
            expect(scope.zipPattern.test(zipCode)).toBe(true);
            zipcode = "¿invalid zip?";
            expect(scope.zipPattern.test(zipCode)).toBe(false);

            //captCha (only numbers)

            var captcha = "123";
            expect(scope.captchaPattern.test(captcha)).toBe(true);
            captcha = "abc";
            expect(scope.captchaPattern.test(captcha)).toBe(false);
            captcha = "1 2";
            expect(scope.captchaPattern.test(captcha)).toBe(false);
            captcha = "2abc";
            expect(scope.captchaPattern.test(captcha)).toBe(false);
            captcha = "ab2";
            expect(scope.captchaPattern.test(captcha)).toBe(false);

            //testing steps
            //expect(scope.countries.length > 0).toBe(true);
            scope.user = {
                email: '',
                email2: '',
                password: '',
                password2: '',
                name: '',
                surname: '',
                address: '',
                city: '',
                postal: '',
                country: '',
                conditions: '',
                captcha: ''
            };

            //used mail (probably change in a future)
            scope.user.email = "test@test";
            scope.sendFirstStep();
            scope.$apply();
            expect(state.$current.url.source).toEqual("/sign-up"); //is not go to step 2
            scope.user.email = "test2@test2.com";
            // scope.sendFirstStep();
            //scope.$apply();
            statusOK = {
                result: "ok",
                status: "ok"
            };
            scope.firstCallback(statusOK);
            scope.$apply();
            //now must be in the step2
            expect(state.$current.url.source).toEqual("/sign-up-step2");

            scope.formReg = {$valid: false}; // the form must be valid to go to successful sign up
            scope.sendSecondStep();
            scope.$apply();
            //the form is not valid, we stay in the step 2
            expect(state.$current.url.source).toEqual("/sign-up-step2");

            //now we accept the form
            scope.formReg.$valid = true; // the form must be valid to go to successful sign up
            scope.user.captcha = "22";//the only valid captcha is 4 in this moment
            scope.sendSecondStep();
            scope.$apply();
            expect(state.$current.url.source).toEqual("/sign-up-step2");

            scope.user.captcha = "4";//the only valid captcha is 4 in this moment
            scope.secondCallback(statusOK);
            scope.$apply();

            expect(state.$current.url.source).toEqual("/sign-up-successful");

            var result = {username: "used"};
            scope.firstCallback(result);

            //another branch
            result = {};
            scope.firstCallback(result);
            expect(scope.errorForm).toBe(true);

            //clear state
            scope.clearState();
            expect(scope.result).toBe("");

            //other branch of secondCallback
            result = {username: "used", status: "incorrectCaptcha"};
            scope.secondCallback(result);

            //other branch of secondCallback
            result = {username: "used", status: ""};
            scope.secondCallback(result);
            scope.newSubscriptionMode = "signup";
            scope.$apply();
            scope.createNewSubs();

            scope.newSubscriptionMode = "login";
            scope.$apply();
            scope.createNewSubs();

            scope.submit();
            expect(scope.submit).toBeDefined();
        });

    });
});

describe('The match directive', function () {

    beforeEach(angular.mock.module("ngMo"));

    describe('template', function () {
        var $compile;
        var $scope;
        var $state;
        var httpMock;

        beforeEach(module('templates-app'));
        beforeEach(angular.mock.module('singUp'));//start the module
        beforeEach(inject(function (_$compile_, _$rootScope_, _$state_, $httpBackend) {
            $compile = _$compile_;
            $scope = _$rootScope_.$new();
            $state = _$state_;
            httpMock = $httpBackend;
        }));

        it('should respond to a click event', inject(function () {
            var template = $compile("<watch></watch>")($scope);
            $scope.$apply();
            template.triggerHandler('click');
        }));
    });
});

describe('The signup service', function () {

    beforeEach(angular.mock.module("ngMo"));

    describe('template', function () {
        var $compile;
        var $scope;
        var $state;
        var httpMock,service,user;
        var result = {status :"ok"};

        beforeEach(module('templates-app'));
        beforeEach(angular.mock.module('singUp'));//start the module
        beforeEach(inject(function (SignUpService,_$compile_, _$rootScope_, _$state_, $httpBackend) {
            service = SignUpService;
            $compile = _$compile_;
            $scope = _$rootScope_.$new();
            $state = _$state_;
            httpMock = $httpBackend;
            httpMock.when('POST', _$rootScope_.urlService + '/testemail').respond(200,result);
            httpMock.when('POST', _$rootScope_.urlService + '/user').respond(200,result);
            user = {id: 1};
        }));

        it('should test email', inject(function () {
            httpMock.expectPOST($scope.urlService + '/testemail');
            service.firstStep(user,function(){var i = result;});
            httpMock.flush();
        }));


        it('should check if user is ok', inject(function () {
            httpMock.expectPOST($scope.urlService + '/user');
            service.secondStep(user,function(){var i = result;});
            httpMock.flush();
        }));

    });
});
