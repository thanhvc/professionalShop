describe('My MySubscriptionPacks service', function() {
    var $scope, ctrl, $http, $state,service;
    beforeEach(angular.mock.module("ngMo"));
    beforeEach(angular.mock.module("ngMo.my_subscriptions"));


    beforeEach(inject(function (MySubscriptionPacksService, $rootScope, _$http_, _$httpBackend_, _$state_) {

        service = MySubscriptionPacksService;
        $scope = $rootScope.$new();
        $http = _$httpBackend_;
        $state = _$state_;
        $state.$current = {
            data :{ subPage : 1}
        };

    }));

    it("should be able to load user", function () {
        var month = {month: 8, year: 2014};
        var filters = {index_type : 0, month: month};
        service.obtainPacks(filters);

        filters = { month:month};
        service.obtainPacks(filters);
        expect(service.obtainPacks).toNotBe(undefined);
    });
});
describe('My MyPacks service', function() {
    var $scope, ctrl, $http, $state,service;
    beforeEach(angular.mock.module("ngMo"));
    beforeEach(angular.mock.module("ngMo.my_subscriptions"));


    beforeEach(inject(function (MyPacksService, $rootScope, _$http_, _$httpBackend_, _$state_) {

        service = MyPacksService;
        $scope = $rootScope.$new();
        $http = _$httpBackend_;
        $state = _$state_;
        $state.$current = {
            data :{ subPage : 1}
        };

    }));

    it("should be able to load user", function () {
        var month = {month: 8, year: 2014};
        var filters = {index_type : 0, month: month};
        service.obtainPacks(filters);

        filters = { month:month};
        service.obtainPacks(filters);
        expect(service.obtainPacks).toNotBe(undefined);
    });
});

describe('My subscriptions controller service', function() {
    var $scope, ctrl, $http, $state,$stateParams;
    beforeEach(angular.mock.module("ngMo"));
    beforeEach(angular.mock.module("ngMo.my_subscriptions"));


    beforeEach(inject(function ($controller, $rootScope, _$http_, _$httpBackend_, _$state_, _$stateParams_) {
        $stateParams = _$stateParams_;
        $scope = $rootScope.$new();
        ctrl = $controller;
        $http = _$httpBackend_;
        $state = _$state_;
        $state = {data: {page: 1, pageTitle: 'title'}};
        $controller('MySubscriptionsCtrl', {'$rootScope' : $rootScope, '$scope': $scope, '$state': $state});

    }));

    it("should be able to success when state changes", function () {
        $scope.$broadcast('$stateChangeStart');
        //$scope.$broadcast('$stateChangeSuccess',[null, $state, $stateParams, '', '']);
    });

    it('should restart filter', function(){
        $scope.filterOptions.selectors ={
            months : 8
        };
        $scope.restartFilter();
        expect($scope.restartFilter).toNotBe(undefined);
    });

    it('should go to a given month', function(){
        $scope.goToMonth();
        expect($scope.goToMonth).toNotBe(undefined);
    });

    it('should load page', function() {
        $scope.loadPage();
        expect($scope.loadPage).toNotBe(undefined);
    });
});
