describe('Payment controller', function()  {
    var $scope, ctrl, $http, $state,isLogged, $stateParams;
    beforeEach(angular.mock.module("ngMo"));
    beforeEach(angular.mock.module("ngMo.payment"));


    beforeEach(inject(function ($controller, $rootScope, _$http_, _$httpBackend_, _$state_, _$stateParams_, IsLogged)  {

        //_$httpBackend_.when('GET', $rootScope.urlService + '/homepacks').respond(200);
        ctrl = $controller;
        $stateParams = _$stateParams_;
        $stateParams.token = 'token';
        $stateParams.PayerID = 1;
        $scope = $rootScope.$new();
        $http = _$httpBackend_;
        $state = _$state_;
        isLogged = IsLogged;
        $state.$current = {data :  {  pageTitle : 'title', subPage: 1}};
        $state = {data :  {  pageTitle : 'title'}};
        $controller('ConfirmPaymentCtrl',  {'$rootScope': $rootScope, '$http': _$http_, '$scope': $scope, 'isLogged': IsLogged});

    }));

    it("should success when state start changes", function ()  {
        $scope.$broadcast('$stateChangeStart');
        expect($scope.goToPatterns).toNotBe(undefined);
    });

});

describe('SummaryPay controller', function()  {
    var $scope, ctrl, $http, $state,isLogged, $stateParams;
    beforeEach(angular.mock.module("ngMo"));
    beforeEach(angular.mock.module("ngMo.payment"));


    beforeEach(inject(function ($controller, $rootScope, _$http_, _$httpBackend_, _$state_, _$stateParams_, IsLogged)  {

        //_$httpBackend_.when('GET', $rootScope.urlService + '/homepacks').respond(200);
        ctrl = $controller;
        $stateParams = _$stateParams_;
        $stateParams.token = 'token';
        $stateParams.PayerID = 1;
        $scope = $rootScope.$new();
        $http = _$httpBackend_;
        $state = _$state_;
        isLogged = IsLogged;
        $state.$current = {data :  {  pageTitle : 'title', subPage: 1}};
        $state = {data :  {  pageTitle : 'title'}};
        $controller('SummaryPayCtrl',  {'$rootScope': $rootScope, '$http': _$http_, '$scope': $scope, 'isLogged': IsLogged});

    }));

    it("should success when state start changes", function ()  {
        $scope.$broadcast('$stateChangeStart');

    });

    it("should notify when PayPal gives an error", function ()  {
        $scope.$broadcast('errorPaypal');
    });

    it("should return the short name of a given month", function ()  {
        $scope.getMonthShortName(new Date());
    });

    it("should let the user pay", function ()  {
        $scope.conditions = true;
        $scope.doPayment();
        expect($scope.errorConditions).toBe(false);

        //anothe branch
        $scope.conditions = false;
        $scope.doPayment();
        expect($scope.errorConditions).toBe(true);
    });



});
describe('CreditPayCtrl controller', function()  {
    var $scope, ctrl, $http, $state,isLogged, $stateParams;
    beforeEach(angular.mock.module("ngMo"));
    beforeEach(angular.mock.module("ngMo.payment"));


    beforeEach(inject(function ($controller, $rootScope, _$http_, _$httpBackend_, _$state_, _$stateParams_, IsLogged)  {

        //_$httpBackend_.when('GET', $rootScope.urlService + '/homepacks').respond(200);
        ctrl = $controller;
        $stateParams = _$stateParams_;
        $stateParams.token = 'token';
        $stateParams.PayerID = 1;
        $scope = $rootScope.$new();
        $http = _$httpBackend_;
        $state = _$state_;
        isLogged = IsLogged;
        $state.$current = {data :  {  pageTitle : 'title', subPage: 1}};
        $state = {data :  {  pageTitle : 'title'}};
        $controller('CreditPayCtrl',  {'$rootScope': $rootScope, '$http': _$http_, '$scope': $scope, 'isLogged': IsLogged});

    }));

    it("should success when state start changes", function ()  {
        $scope.$broadcast('$stateChangeStart');

    });

    it('', function(){
        $scope.maestro();
    });

    it('should load summary', function(){
        $scope.loadSummary();
    });

    it('should let the user pay with credit cart', function(){
        $scope.payForm= { $valid: false};
        $scope.payWithCard();
        expect($scope.status).toBe("NONE");
    });
    //same test as above but must enter another branch
    it('should let the user pay with credit cart', function(){
        $scope.stockItems = ['item1'];
        $scope.pairsItems = ['item1'];
        $scope.indicesItems = ['item1'];
        $scope.pairsIndicesItems = ['item1'];
        $scope.futuresItems = ['item1'];
        $scope.payForm= { $valid: true};
        $scope.payWithCard();
        expect($scope.status).toBe("NONE");
    });

});

describe('Payment Service', function()  {
    var $scope, service, $http, $state,shopping;
    beforeEach(angular.mock.module("ngMo"));
    beforeEach(angular.mock.module("ngMo.my_profile"));


    beforeEach(inject(function (PaymentService, $rootScope, _$http_, _$httpBackend_, _$state_,ShoppingCartService)  {

        //_$httpBackend_.when('GET', $rootScope.urlService + '/homepacks').respond(200);
        service = PaymentService;
        shopping = ShoppingCartService;
        $scope = $rootScope.$new();
        $http = _$httpBackend_;
        $state = _$state_;
        $state.$current = {data :  {  pageTitle : 'title', subPage: 1}};
        $state = {data :  {  pageTitle : 'title'}};


    }));

    it("should be able to get the payments", function ()  {
        var item = {
            "productType" : 0,
            "patternType" : "STOCK"
        };
        shopping.addItemCart(item);
        service.getPayments('', 'callback');
        expect(service.getPayments).toNotBe(undefined);
    });

    it("should be able to get the duration of a pack by a given id", function ()  {
        service.getDurationFromId(1);
        expect(service.getDurationFromId).toNotBe(undefined);
    });

});