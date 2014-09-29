describe('Payment controller', function()  {
    var $scope, ctrl, $http, $state,isLogged, $stateParams;
    beforeEach(angular.mock.module("ngMo"));
    beforeEach(angular.mock.module("ngMo.payment"));


    beforeEach(inject(function ($controller, $rootScope, _$http_, _$httpBackend_, _$state_, _$stateParams_, IsLogged)  {

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

    it("should success when state changes", function ()  {
        $scope.$broadcast('$stateChangeSuccess',$state,{},{},{});
    });

});
describe('ConfirmPaymentCardCtrl controller', function()  {
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
        $controller('ConfirmPaymentCardCtrl',  {'$rootScope': $rootScope, '$http': _$http_, '$scope': $scope, 'isLogged': IsLogged});

    }));

    it("should success when state start changes", function ()  {
        $scope.$broadcast('$stateChangeStart');

    });

    it("should success when state changes", function ()  {
        $scope.$broadcast('$stateChangeSuccess',$state,{},{},{});
    });

});

describe('SummaryPay controller', function()  {
    var $scope, ctrl, $http, $state,isLogged, $stateParams,paymentService,shoppingCartService;
    beforeEach(angular.mock.module("ngMo"));
    beforeEach(angular.mock.module("ngMo.payment"));


    beforeEach(inject(function ($controller, $rootScope, _$http_, _$httpBackend_, _$state_, _$stateParams_, IsLogged,ShoppingCartService,PaymentService)  {

        ctrl = $controller;
        shoppingCartService = ShoppingCartService;
        $stateParams = _$stateParams_;
        $stateParams.token = 'token';
        $stateParams.PayerID = 1;
        $scope = $rootScope.$new();
        $http = _$httpBackend_;
        $state = _$state_;
        paymentService = PaymentService;
        isLogged = IsLogged;
        $state.$current = {data :  {  pageTitle : 'title', subPage: 1}};
        $state = {data :  {  pageTitle : 'title'}};
        $controller('SummaryPayCtrl',  {'$rootScope': $rootScope, '$http': _$http_, '$scope': $scope, 'isLogged': IsLogged});
        $http.when('POST', $scope.urlService + '/summary-pay').respond(200,new Date());
        $http.when('GET', $scope.urlService + '/islogged').respond(200,new Date());


    }));

    it("should success when state start changes", function ()  {
        $scope.$broadcast('$stateChangeStart');
    });

    it("should success when state changes", function ()  {
        $scope.$broadcast('$stateChangeSuccess',$state,{},{},{});
    });

    it("should notify when PayPal gives an error", function ()  {
        $scope.$broadcast('errorPaypal');
    });

    it("should return the short name of a given month", function ()  {
        $scope.getMonthShortName(new Date());
    });

    it("should translate duration", function ()  {
        var res = $scope.translateDuration(1);
        expect(res).toBeDefined();
    });

    it("should load payment", function ()  {
        $scope.loadPayment();
        expect($scope.loadPayment).toBeDefined();
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
        $http.when('GET', $rootScope.urlService + '/countries').respond(200);
        $http.when('POST', $rootScope.urlService + '/summary-pay').respond(200);
        $http.when('POST', $rootScope.urlService + '/pay-card').respond(200,{status : "ok"});
        $http.when('GET', $rootScope.urlService + '/user').respond(200);

    }));

    it("should success when state start changes", function ()  {
        $scope.$broadcast('$stateChangeStart');
    });

    it('should success when changing state', function(){
        $state.data = {pageTitle : "Market Observatory"};
        $scope.$broadcast('$stateChangeSuccess',$state,{},{},{});
    });

    it('', function(){
        $scope.maestro();
    });

    it('should load summary', function(){

        $scope.loadSummary();
    });

    it('should be able to load a user', function(){
        $scope.loadUser();
        expect($scope.loadUser).toBeDefined();
    });

    it('should let the user pay with credit cart', function(){
        $scope.payForm= { $valid: false};
        $scope.editData = true;
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
        $scope.editData  = true;
        $scope.payWithCard();
        expect($scope.status).toBe("NONE");
    });

});

describe('Payment Service', function()  {
    var $scope, service, $http, $state,shopping;
    beforeEach(angular.mock.module("ngMo"));
    beforeEach(angular.mock.module("ngMo.payment"));


    beforeEach(inject(function (PaymentService, $rootScope, _$http_, _$httpBackend_, _$state_,ShoppingCartService)  {

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
            "productType" : 'STOCK',
            "patternType" : "SIMPLE",
            "date": "28/05/2014",
            "duration": "Mensual"
        };
        shopping.addItemCart(item);
        service.getPayments('', 'callback');
        expect(service.getPayments).toBeDefined();
    });

    //another branch of the test above
    it("should be able to get the payments", function ()  {
        var item = {
            "productType" : 'STOCK',
            "patternType" : "SIMPLE",
            "date": "28/05/2014",
            "duration": "Anual"
        };
        shopping.addItemCart(item);
        service.getPayments('', 'callback');
        expect(service.getPayments).toBeDefined();
    });
      //another branch of the test above
    it("should be able to get the payments", function ()  {
        var item = {
            "productType" : 'STOCK',
            "patternType" : "SIMPLE",
            "date": "28/05/2014",
            "duration": "Trimestral"
        };
        shopping.addItemCart(item);
        service.getPayments('', 'callback');
        expect(service.getPayments).toBeDefined();
    });



    it("should be able to get the duration of a pack by a given id", function ()  {
        service.getDurationFromId(1);
        expect(service.getDurationFromId).toBeDefined();
    });

});