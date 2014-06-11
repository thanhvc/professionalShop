/**
 * Created by robgon on 10/06/14.
 */
describe('The Patterns view ', function () {
    beforeEach(angular.mock.module("ngMo"));
    beforeEach(module('ui.router'));
    beforeEach(module('ui.bootstrap'));

    beforeEach(inject(function ($templateCache, $compile, $rootScope, $controller, $state, $httpBackend) {
        //create an empty scope
        scope = $rootScope.$new();
        //declare the controller and inject our empty scope
        $controller('PatternsCtrl', {$scope: scope});
        state = $state;
        compile = $compile;
        template = $templateCache;
        httpMock = $httpBackend;
        httpMock.when('GET', 'src/app/my_patterns/data/testdataStock.json.js?pageSize=10&page=1').respond([
            {
                "Id": "20000",
                "name": "EMERA ",
                "name_tooltip": "CANADIAN NATIONAL (NASDAQ)",
                "type": "buy",
                "Sector": "Industrial",
                "Industry": "",
                "Merc": "TSX",
                "Merc_tooltip": "Toronto Stock Exchange",
                "Year": "13",
                "Year_Perd": "2",
                "Enter": "01/may/14",
                "Exit": "01/may/14",
                "Rent_acum": "85",
                "Rent_average": "5.7",
                "Rent_Diary": "0.06",
                "Days": "100",
                "Vol": "13",
                "Fav": false,
                "Est": "Sin Comenzar"
            },
            {
                "Id": "30000",
                "name": "SPAN AMERICAN ",
                "name_tooltip": "CANADIAN NATIONAL (NASDAQ)",
                "type": "buy",
                "Sector": "Industrial",
                "Industry": "",
                "Merc": "TSX",
                "Merc_tooltip": "Toronto Stock Exchange",
                "Year": "13",
                "Year_Perd": "2",
                "Enter": "01/may/14",
                "Exit": "01/may/14",
                "Rent_acum": "85",
                "Rent_average": "5.7",
                "Rent_Diary": "0.06",
                "Days": "100",
                "Vol": "13",
                "Fav": false,
                "Est": "Finalizado"
            }
        ]);
    }));


    it(' in the initialization ', function () {
        state.go('my-patterns');
        scope.$apply();
        expect(scope.filterOptions.filters).toBeDefined();
        expect(scope.filterOptions.selectors.regions).toBeDefined();
        expect(scope.pagingOptions.currentPage).toEqual(1);


    });


});