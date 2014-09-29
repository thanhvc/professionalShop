describe('My profile controller', function()  { 
    var $scope, ctrl, $http, $state; 
    beforeEach(angular.mock.module("ngMo")); 
    beforeEach(angular.mock.module("ngMo.my_profile")); 
 
 
    beforeEach(inject(function ($controller, $rootScope, _$http_, _$httpBackend_, _$state_)  { 
     
        //_$httpBackend_.when('GET', $rootScope.urlService + '/homepacks').respond(200); 
        ctrl = $controller; 
        $scope = $rootScope.$new(); 
        $http = _$httpBackend_; 
        $state = _$state_; 
        $state.$current = {data :  {  pageTitle : 'title', subPage: 1}};
        $state = {data :  {  pageTitle : 'title'}};
        $controller('ProfileCtrl',  {'$rootScope': $rootScope, '$http': _$http_, '$scope': $scope });
     
     })); 
 
    it("should be able to restart user", function ()  { 
        $scope.restartUser(); 
        expect($scope.restartUser).toNotBe(undefined); 
     }); 
 
    it("should be able to save user", function ()  { 
        $scope.saveUser(); 
        expect($scope.saveUser).toNotBe(undefined); 
     }); 
 
    it("should be able to save users Password", function ()  { 
        $scope.savePassword(); 
        expect($scope.savePassword).toNotBe(undefined); 
     }); 
 
    it("should success when state start changes", function ()  { 
        $scope.$broadcast('$stateChangeStart');
     });

    it("should success when state  changes", function ()  {
        $scope.$broadcast('stateChangeSuccess',$state,{},{},{});
     });

 });

describe('Orders controller', function()  {
    var $scope, ctrl, $http, $state;
    beforeEach(angular.mock.module("ngMo"));
    beforeEach(angular.mock.module("ngMo.my_profile"));


    beforeEach(inject(function ($controller, $rootScope, _$http_, _$httpBackend_, _$state_)  {

        //_$httpBackend_.when('GET', $rootScope.urlService + '/homepacks').respond(200);
        ctrl = $controller;
        $scope = $rootScope.$new();
        $http = _$httpBackend_;
        $state = _$state_;
        $state.$current = {data :  {  pageTitle : 'title', subPage: 1}};
        $state = {data :  {  pageTitle : 'title'}};
        $state = {current :  {  name: "profile.orders"}};
        $controller('OrdersCtrl',  {'$rootScope': $rootScope, '$http': _$http_, '$scope': $scope });

     }));

    it("should success when state start changes", function ()  {
        $scope.$broadcast('$stateChangeStart');
    });

    it("should success when state  changes", function ()  {
        $scope.$broadcast('stateChangeSuccess',$state,{},{},{});
    });


 });


describe('Profile service', function()  {
    var $scope, ctrl, $http, $state,service;
    beforeEach(angular.mock.module("ngMo"));
    beforeEach(angular.mock.module("ngMo.my_profile"));

    var config = {"X-Session-Token": "1", "Accept": "application/json, text/plain, */*"};
    beforeEach(inject(function (ProfileService, $rootScope, _$http_, _$httpBackend_, _$state_)  {

        service = ProfileService;
        $scope = $rootScope.$new();
        $http = _$httpBackend_;
        $state = _$state_;
        $state.$current = {data :  {  pageTitle : 'title', subPage: 1}};
        $state = {data :  {  pageTitle : 'title'}};
        $state = {current :  {  name: "profile.orders"}};

        _$httpBackend_.when('GET', $rootScope.urlService + '/user',config).respond(200,{status: "user_ok"});

     }));

    it("should load a user", function ()  {
        $http.expectGET($scope.urlService + '/user',config);
        service.loadUser('callback');
    });

 });