
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

            $http.when('GET', $scope.urlService + '/actualdate').respond(200,{data: new Date()});

        }));

        it('should toggle sign in state', function(){
            var res = service.toggleSignInState();
            expect(res).toNotBe(undefined);
        });it('should toggle sign in state', function(){
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
            $window.localStorage.token = 1;
        }));

        it('should check if a user is logged in or not', function(){

            $http.whenGET($scope.urlService+'/islogged').respond(200,{"data": new Date()});
            $http.expectGET($scope.urlService+'/islogged');
            service.isLogged($http,$window,$scope);
            $http.flush();
            expect(service.isLogged).toNotBe(undefined);
        });

        it('should respond properly when ajax call fails', function(){

            $http.whenGET($scope.urlService+'/islogged').respond(500);
            $http.expectGET($scope.urlService+'/islogged');
            service.isLogged($http,$window,$scope);
            $http.flush();
            expect(service.isLogged).toNotBe(undefined);
        });
    });
});

describe('The signInForm directive', function () {

    beforeEach(angular.mock.module("ngMo"));
    beforeEach(angular.mock.module('auth'));

    describe('template', function () {
        var $compile,$scope,httpMock,template, $modal,$cookieStore, $window,ShoppingCartService;
        var patterns = '/patterns?accumulatedInput=&accumulatedReturn=&averageInput=&averageReturn=&dailyInput=&dailyReturn=&duration=&durationInput=&favourites=&indexType=0&industry=&market=&month=11&name=&operation=&page=1&productType=0&region=&sector=&token=undefined&volatility=&volatilityInput=&year=2014';

        beforeEach(inject(function (_$compile_, _$rootScope_, $httpBackend, _$modal_, _$cookieStore_, _$window_,_ShoppingCartService_) {
            $compile = _$compile_;
            $scope = _$rootScope_.$new();
            httpMock = $httpBackend;
            $cookieStore = _$cookieStore_;
            $window = _$window_;
            ShoppingCartService = _ShoppingCartService_;

            $window.sessionStorage = { // mocking sessionStorage
                getItem: function(key) {
                    return this[key];
                }
            };

            $scope.removeAllItemsCart = ShoppingCartService.removeAllItemsCart;
            $scope.restartSessionCart = ShoppingCartService.restartSessionCart;
            httpMock.when('GET','i18n/common/es.json').respond(200);
            httpMock.when('GET', $scope.urlService + '/islogged').respond(200);
            httpMock.when('GET', $scope.urlService + '/logout').respond(200);
            httpMock.when('GET', $scope.urlService + patterns).respond(200,{patterns :['pattern1', 'pattern2']});
            template = $compile("<sign-in-form></sign-in-form>")($scope);
            $scope.$apply();
            $modal = _$modal_.open({
                templateUrl: 'layout_templates/sign-in-box.tpl.html'
            });
        }));
//COMMENTED TEST FOR DISABLE PURCHASES, THIS TEST MUST WORK WHEN THE PAYMENT METHOD IS ACTIVE AGAIN
        xit('should toggle when the user sends the signin form', inject(function () {
            $scope.toggleSignInForm();
            expect($scope.stateSignInForm).toNotBe(undefined);
        }));
//COMMENTED TEST FOR DISABLE PURCHASES, THIS TEST MUST WORK WHEN THE PAYMENT METHOD IS ACTIVE AGAIN
        xit('should hide the signin form when asked for', inject(function () {
            $scope.hideSignInForm();
            expect($scope.stateSignInForm).toNotBe(undefined);
        }));
//COMMENTED TEST FOR DISABLE PURCHASES, THIS TEST MUST WORK WHEN THE PAYMENT METHOD IS ACTIVE AGAIN
        xit('should success when the user logs in', inject(function () {
            var params = {'name':'userName', 'token': 'userToken'};
            $scope.$broadcast('userLogged',['', params]);
        }));
//COMMENTED TEST FOR DISABLE PURCHASES, THIS TEST MUST WORK WHEN THE PAYMENT METHOD IS ACTIVE AGAIN
        xit('should clear all correlation lists', inject(function () {
            clearAllCorrelationLists();
            expect(clearAllCorrelationLists).toNotBe(undefined);
        }));
//COMMENTED TEST FOR DISABLE PURCHASES, THIS TEST MUST WORK WHEN THE PAYMENT METHOD IS ACTIVE AGAIN
        xit('should clear all portfolio lists', inject(function () {
            clearAllPortfolioLists();
            expect(clearAllPortfolioLists).toNotBe(undefined);
        }));
//COMMENTED TEST FOR DISABLE PURCHASES, THIS TEST MUST WORK WHEN THE PAYMENT METHOD IS ACTIVE AGAIN
        it('should produce 2 input fields and a checkbox', function(){
            expect(template.find('input').length).toEqual(3);
        });

        it('should success when submitting form', function(){
            httpMock.when('GET', $scope.urlService + '/actualdate').respond(200,{actualDate: new Date()});
            httpMock.when('POST', $scope.urlService + '/summary-pay').respond(200,{actualDate: new Date()});
            httpMock.when('POST', $scope.urlService + '/login').respond(200,{login: 'ok', patterns :['pattern1', 'pattern2']});
            httpMock.when('POST', $scope.urlService + '/summary-pay').respond(200,{
            stocks: [],
            totalStocks: 0,
            pairs: [],
            total_pairs: 0,
            index: [],
            total_index: 0,
            pairIndex: [],
            total_pairIndex: 0,
            futures: [],
            total_futures:0,
            total: 0
            });
            $scope.remember = true;
            httpMock.expectPOST($scope.urlService+'/login');
            //httpMock.expectGET($scope.urlService+ patterns);
            $cookieStore.put('token', '1234');
            $scope.fields = {
                "email" : 'userEmail@edosoft.es',
                "password" : 'userpassword'
            };
            $window.localStorage.token = '1';
            $scope.submit();

            $http.expectGET($scope.urlService + '/actualdate');
            httpMock.flush();
        });

        it('should notices the user that he is not registered yet', function(){
            httpMock.when('POST', $scope.urlService + '/login').respond(500, {'reason': "not-activated"});
            $scope.remember = true;
            $cookieStore.put('token', '1234');
            $scope.fields = {
                "email" : undefined,
                "password" : undefined
            };
            $window.localStorage.token = '1';
            $scope.submit();
            httpMock.flush();

            //Check if warning input fields are defined because of the login error
            template = $compile("<sign-in-form></sign-in-form>")($scope);
            $scope.$apply();
            expect(template.find('warning-input')).toBeDefined();
        });

        it('should success when login out', inject(function () {
            httpMock.expectGET($scope.urlService+'/logout');
            $scope.logout();
            httpMock.flush();
            expect($scope.logout).toNotBe(undefined);
        }));

    });
});