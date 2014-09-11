describe('The SignUp ', function () {
    beforeEach(angular.mock.module("ngMo"));
    describe('form ', function () {

        var compile;
        var scope;
        var state;
        var template;
        beforeEach(module('ui.router'));//needed to user $state
        beforeEach(module('ui.bootstrap'));//to load $modal
        beforeEach(angular.mock.module('singUp'));//start the module
        beforeEach(inject(function ($templateCache, $compile, $rootScope, $controller, $state, $httpBackend) {

            httpMock = $httpBackend;
            httpMock.when('GET', $rootScope.urlService+'/islogged').respond(200);
            httpMock.when('GET', $rootScope.urlService+'/countries').respond(200);
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

            //incorrect captcha
            statusOK = {
                status: "incorrectCaptcha"
            };
            scope.secondCallback(statusOK);
            scope.$apply();

            //no captcha
            statusOK = {
                status: undefined
            };
            scope.secondCallback(statusOK);
            scope.$apply();

            //submit new user
            scope.submit();
            expect(scope.submit).toNotBe(undefined);

            var res = scope.createNewSubs();
            scope.newSubscriptionMode = undefined;
            scope.createNewSubs();


            scope.clearState();
        });

    });
});


describe('The match directive', function () {

    beforeEach(angular.mock.module("ngMo"));
    beforeEach(angular.mock.module('auth'));

    describe('template', function () {
        var $compile, $scope, httpMock, template, $modal, $cookieStore, $window;

        beforeEach(inject(function (_$compile_, _$rootScope_, $httpBackend, _$modal_, _$cookieStore_, _$window_) {
            $compile = _$compile_;
            $scope = _$rootScope_.$new();
            httpMock = $httpBackend;
            $cookieStore = _$cookieStore_;
            $window = _$window_;

            $window.sessionStorage = { // mocking sessionStorage
                getItem: function (key) {
                    return this[key];
                }
            };

            template = $compile("<match></match>")($scope);
            $scope.$apply();

        }));

        it('should toggle when the user sends the signin form', inject(function () {
            template.triggerHandler('click',[$scope, template, template.children(), 'ctrl']);
            //expect($scope.stateSignInForm).toNotBe(undefined);
        }));
    });
});

describe('The SignUp Service', function () {

    beforeEach(angular.mock.module("ngMo"));
    beforeEach(angular.mock.module('auth'));

    describe('template', function () {
        var $compile, $scope, httpMock, template, service, $cookieStore, $window;

        beforeEach(inject(function (SignUpService,_$compile_, _$rootScope_, $httpBackend, _$modal_, _$cookieStore_, _$window_) {
            $compile = _$compile_;
            service = SignUpService;
            $scope = _$rootScope_.$new();
            httpMock = $httpBackend;
            $cookieStore = _$cookieStore_;
            $window = _$window_;

        }));

        it('should be able to go to first and secod steps', inject(function () {
            service.firstStep();

            service.secondStep();
        }));
    });

});