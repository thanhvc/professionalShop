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


describe('My subscriptions controller', function() {
    var $scope, ctrl, $http, $state,$stateParams,tabsService,ShoppingCartService,$filter,MonthSelectorService;
    var date = new Date();

    var month = {month: date.getMonth(), year: date.getYear()};
    var m = date.getMonth()+1;
    var url = '/mysubscriptions?month=' + m;

    var response = {STOCK : {NALA: 'nala', APAC: 'apac', EMEA: 'emea'}, STOCKPAIR : {NALA: 'nala', APAC: 'apac', EMEA: 'emea'}, INDICE : {INDEX: 'index'}, INDICEPAIR: {INDEX: 'index'},FUTURE : {FUTURE: 'future'}};
    beforeEach(angular.mock.module("ngMo"));
    beforeEach(angular.mock.module("ngMo.my_subscriptions"));
    beforeEach(angular.mock.module("ngMo.my_patterns"));


    beforeEach(inject(function ($controller, $rootScope, _$http_, _$httpBackend_, _$state_, _$stateParams_,TabsService,_ShoppingCartService_, _$filter_,_MonthSelectorService_) {
        ShoppingCartService = _ShoppingCartService_;
        MonthSelectorService = _MonthSelectorService_;
        $stateParams = _$stateParams_;
        $filter = _$filter_;
        $scope = $rootScope.$new();
        ctrl = $controller;
        $http = _$httpBackend_;
        $state = _$state_;
        tabsService = TabsService;
        _$state_.data = {pageTitle: 'title'};


        _$httpBackend_.when('GET', $rootScope.urlService + url).respond(200,response);

        $controller('MySubsCtrl', {'$rootScope' : $rootScope, '$scope': $scope, '$state': $state, 'ShoppingCartService' : _ShoppingCartService_});

    }));

    it("should be able to success when start state changes", function () {
        var item = {code: 'code'};
        $scope.$broadcast('$stateChangeStart',[null,item]);
    });

    it("should be able to success when duration changes", function () {
        var content = {americaContent : ['america', 'mexico'], asiaContent: ['china', 'japan'], europeContent : ['england', 'spain'], futuresContent: ['futures'], pairsIndicesContent: ['pairs'], americaPairContent : ['am'], asiaPairContent:['asia'], europePairContent: ['euro'], indicesContent:['index']};
        $scope.mySubscriptionsTablePacks = [content, content,content,content];
        $scope.$broadcast('changeDurationFromCart',[null,$state]);
    });

    it("should let the user remove an item from the cart", function () {
        var day = new Date();
        var date = {month : day.getMonth() + 1};
        var item =  {code: 1234, startDate: MonthSelectorService.getMonthName(date)+ " " + day.getFullYear() };
        var america = {startDate:  new Date(), code: 1234, toBuy: true};
        var asia = {startDate:  new Date(), code: 1234, toBuy: true};
        var europe = {startDate:  new Date(), code: 1234, toBuy: true};
        var indices = {startDate:  new Date(), code: 1234, toBuy: true};
        var futures = {startDate:  new Date(), code: 1234, toBuy: true};
        var pairIndices = {startDate:  new Date(), code: 1234, toBuy: true};
        var americaPair = {startDate:  new Date(), code: 1234, toBuy: true};
        var asiaPair = {startDate:  new Date(), code: 1234, toBuy: true};
        var europePair = {startDate:  new Date(), code: 1234, toBuy: true};
        var content = {americaContent : [america, america,america], asiaContent: [asia,asia,asia], europeContent : [europe,europe], futuresContent: [futures,futures], pairsIndicesContent: [pairIndices,pairIndices], americaPairContent : [americaPair,americaPair], asiaPairContent:[asiaPair,asiaPair], europePairContent: [europePair,europePair], indicesContent:[indices,indices]};
        $scope.mySubscriptionsTablePacks = [content, content,content,content];

        $scope.$broadcast('removeItemFromCart',item);
    });

    it("should let the user remove all item from the cart", function () {
        var content = {americaContent : ['america', 'mexico'], asiaContent: ['china', 'japan'], europeContent : ['england', 'spain'], futuresContent: ['futures'], pairsIndicesContent: ['pairs'], americaPairContent : ['am'], asiaPairContent:['asia'], europePairContent: ['euro'], indicesContent:['index']};
        $scope.mySubscriptionsTablePacks = [content, content,content,content];
        $scope.$broadcast('removeAllItemsFromCart');
    });

    /* -- this function (selectOption is now part of myPacks, and is incomplete (needs verification to renovate option)
    it("should be able to select an option", function () {
        var pack =  {orden: "1"};
        $scope.selectOption(pack);
        expect( $scope.operationPack).toBe(pack);
    });*/

    it("should be able to toggle pack", function () {
        var pack =  {orden: "1"};
        $scope.togglePack(pack);
        expect( $scope.togglePack).toBeDefined();
    });

    it("should be able to change duration's pack", function () {
        var pack =  {orden: "1"};
        $scope.changeDuration(pack);
        expect( $scope.changeDuration).toBeDefined();
    });

    it('should restart filter whether a tab is active or not ', function(){

        $scope.filterOptions = {selectors :{months : 'January'}, filters:{ month: month}};
        $scope.restartFilter();
        expect($scope.durations).toBeDefined();
    });

    it('should go to a given month', function(){
        $scope.goToMonth();
        expect($scope.goToMonth).toBeDefined();
    });

    it('should go convert duration', function(){
        var res = $scope.convertDuration("Mensual");
        expect(res).toBe(0);
    });
    //same as above but goes by another branch
    it('should go convert duration', function(){
        var res = $scope.convertDuration("Trimestral");
        expect(res).toBe(1);
    });
    //sames as above but goes by another branch
    it('should go convert duration', function(){
        var res = $scope.convertDuration("Anual");
        expect(res).toBe(2);
    });

    it('should be able to load the whole page', function(){
        var item = {duration: 'anual', productType: 'INDICE'};
        var item2 = {duration: 'anual', productType: 'INDICE', patternType: "SIMPLE"};
        var item3 = {duration: 'anual', productType: 'STOCK', patternType: "SIMPLE"};
        var item4 = {duration: 'anual', productType: 'STOCK'};
        var item5 = {duration: 'anual', productType: 'FUTURE'};

        var america = {startDate:  new Date(), code: 1234, toBuy: true};
        var asia = {startDate:  new Date(), code: 1234, toBuy: true};
        var europe = {startDate:  new Date(), code: 1234, toBuy: true};
        var indices = {startDate:  new Date(), code: 1234, toBuy: true};
        var futures = {startDate:  new Date(), code: 1234, toBuy: true};
        var pairIndices = {startDate:  new Date(), code: 1234, toBuy: true};
        var americaPair = {startDate:  new Date(), code: 1234, toBuy: true};
        var asiaPair = {startDate:  new Date(), code: 1234, toBuy: true};
        var europePair = {startDate:  new Date(), code: 1234, toBuy: true};
        var content = {americaContent : [america, america,america], asiaContent: [asia,asia,asia], europeContent : [europe,europe], futuresContent: [futures,futures], pairsIndicesContent: [pairIndices,pairIndices], americaPairContent : [americaPair,americaPair], asiaPairContent:[asiaPair,asiaPair,asiaPair], europePairContent: [europePair,europePair], indicesContent:[indices,indices]};
        $scope.mySubscriptionsTablePacks = [content, content,content,content];

        ShoppingCartService.addItemCart(item);
        ShoppingCartService.addItemCart(item2);
        ShoppingCartService.addItemCart(item3);
        ShoppingCartService.addItemCart(item4);

        $http.expectGET($scope.urlService + url);
        $scope.loadPage();
        $http.flush();
        expect($scope.loading).toBe(false);
    });


});
describe('My packs controller service', function() {
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

        _$httpBackend_.when('GET', $rootScope.urlService + '/pack').respond(200,{pack: 'pack'});

        $controller('MyPacksCtrl', {'$rootScope' : $rootScope, '$scope': $scope, '$state': $state});

    }));

    it("should be able to success when state changes", function () {
        $scope.$broadcast('$stateChangeStart');
        //$scope.$broadcast('$stateChangeSuccess',[null, $state, $stateParams, '', '']);
    });

    it("should be able to load the page", function () {

        $http.expectGET($scope.urlService + '/pack');
        $scope.loadPage();
        $http.flush();
        expect($scope.loading).toBe(false);
    });

});
