
describe('The SignInFormState Service ', function () {

    beforeEach(angular.mock.module("auth"));
    beforeEach(module('templates-app'));

    describe('template', function () {

        var service;
        var $scope;
        var $compile;
        var $http;

        beforeEach(inject(function (SignInFormState, _$rootScope_, _$compile_, _$httpBackend_) {

            service = SignInFormState;
            $scope = _$rootScope_;
            $compile = _$compile_;
            $http = _$httpBackend_;

        }));

        it('should toggle sign in state', function(){
            var res = service.toggleSignInState();
            expect(res).toNotBe(undefined);
        });it('should toggle sign in state', function(){
           var res = service.hideSignInState();
        });
    });
});

describe('The IsLogged Service ', function () {

    beforeEach(angular.mock.module("auth"));
    beforeEach(module('templates-app'));

    describe('template', function () {

        var service;
        var $scope;
        var $compile;
        var $http;
        var $window;

        beforeEach(inject(function (IsLogged, _$rootScope_, _$compile_,_$window_, _$httpBackend_) {

            service = IsLogged;
            $scope = _$rootScope_;
            $compile = _$compile_;
            $http = _$httpBackend_;
            $window = _$window_;

        }));

        it('should check if a user is logged in or not', function(){
            service.isLogged($http,$window,$scope);
            expect(service.isLogged).toNotBe(undefined);
        });
    });
});

describe('The signInForm directive', function () {

    beforeEach(angular.mock.module("ngMo"));
    beforeEach(angular.mock.module('auth'));

    describe('template', function () {
        var $compile,$scope,httpMock,template, $modal,$cookieStore, $window;
        var patternsFilters = '/patternsfilters?indexType=0&industry=&market=&month=9&productType=0&region=&sector=&token=undefined&view=&year=2014';

        beforeEach(inject(function (_$compile_, _$rootScope_, $httpBackend, _$modal_, _$cookieStore_, _$window_) {
            $compile = _$compile_;
            $scope = _$rootScope_.$new();
            httpMock = $httpBackend;
            $cookieStore = _$cookieStore_;
            $window = _$window_;

            $window.sessionStorage = { // mocking sessionStorage
                getItem: function(key) {
                    return this[key];
                }
            };

            httpMock.when('GET', $scope.urlService + '/islogged').respond(200);
            httpMock.when('POST', $scope.urlService + '/login').respond(200);
            httpMock.when('GET', $scope.urlService + '/logout').respond(200);
            httpMock.when('GET', $scope.urlService + patternsFilters).respond(200);
            template = $compile("<sign-in-form></sign-in-form>")($scope);
            $scope.$apply();
            $modal = _$modal_.open({
                templateUrl: 'layout_templates/sign-in-box.tpl.html'
            });
        }));

        it('should toggle when the user sends the signin form', inject(function () {
            $scope.toggleSignInForm();
            expect($scope.stateSignInForm).toNotBe(undefined);
        }));

        it('should hide the signin form when asked for', inject(function () {
            $scope.hideSignInForm();
            expect($scope.stateSignInForm).toNotBe(undefined);
        }));

        it('should success when login out', inject(function () {
            $scope.logout();
            expect($scope.logout).toNotBe(undefined);
        }));

        it('should success when the user logs in', inject(function () {
            var params = {'name':'userName', 'token': 'userToken'};
            $scope.$broadcast('userLogged',['', params]);
        }));

        it('should clear all correlation lists', inject(function () {
            clearAllCorrelationLists();
            expect(clearAllCorrelationLists).toNotBe(undefined);
        }));

        it('should clear all portfolio lists', inject(function () {
            clearAllPortfolioLists();
            expect(clearAllPortfolioLists).toNotBe(undefined);
        }));

        it('should produce 2 input fields and a checkbox', function(){
            expect(template.find('input').length).toEqual(3);
        });

        it('should success when submitting form', function(){
            $cookieStore.put('token', '1234');
            $scope.fields = {
                "email" : 'userEmail@edosoft.es',
                "password" : 'userpassword'
            };
            $window.sessionStorage.token = '1';
            $scope.submit();
        });


    });
});