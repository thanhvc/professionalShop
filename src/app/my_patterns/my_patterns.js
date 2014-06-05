/**
 * Created by robgon on 28/05/14.
 */


angular.module('ngMo.my_patterns', [
    'ui.router',
    'ui.bootstrap'
])
    .config(function config($stateProvider) {
        $stateProvider.state('my-patterns', {
            url: '/patterns',
            views: {
                "main": {
                    controller: 'PatternsCtrl',
                    templateUrl: 'my_patterns/my_patterns.tpl.html'
                }
            },
            data: {
                pageTitle: 'My patterns',
                selectMenu: 'my-patterns-nav',
                selectSubmenu: '',
                selectItemSubmenu: '',
                moMenuType: 'privateMenu'
            }
        });
    })
    .service('TabsService', function () {

        /**Tabs services for private zone**/
        var tabs = [
            {
                title: 'Acciones',
                active: activeTab === 0,
                value: 0
            },
            {
                title: 'Pares',
                active: activeTab === 1,
                value: 1
            },
            {
                title: 'Indices',
                active: activeTab === 2,
                value: 2
            },
            {
                title: 'Futuros',
                active: activeTab === 3,
                value: 3
            }
        ];

        var activeTab = 0;

        this.getTabs = function () {
            return tabs;
        };

        this.getActiveTab = function () {
            return activeTab;
        };

        this.changeActiveTab = function (active) {
            activeTab = active;
        };
    })
    .controller('PatternsCtrl', function PatternsCtrl($scope, $http, TabsService, ActualDateService, PatternsService) {
        //tabs and variables
        /**private models*/
        $scope.selectedTab = TabsService.getActiveTab();
        $scope.actualDate = ActualDateService.actualDate();
        $scope.tabs = TabsService.getTabs();
        $scope.filterOptions = "";//initialization to empty, this object is filled with "restartFilters"
        $scope.totalServerItems = 0;
        /*paging options*/
        $scope.pagingOptions = {
            pageSize: 10,
            currentPage: 1
        };

        /** templates of filters/tables for each tab**/
        var templateTables = [
            {"table": 'my_patterns/tables/stocks_table.tpl.html',
                "filter": 'my_patterns/filters/stocks_filters.tpl.html'},

            {"table": 'my_patterns/tables/pairs_table.tpl.html',
                "filter": 'my_patterns/filters/pairs_filters.tpl.html'},

            {"index": {"table": 'my_patterns/tables/index_table.tpl.html',
                "filter": 'my_patterns/filters/index_filters.tpl.html'},
                "pair_index": {"table": 'my_patterns/tables/pairs_index_table.tpl.html',
                    "filter": 'my_patterns/filters/index_filters.tpl.html'}
            },

            {"table": 'my_patterns/tables/futures_table.tpl.html',
                "filter": 'my_patterns/filters/futures_filters.tpl.html'}
        ];

        /*loads the default filters --> Filters has filters (inputs) and selectors (array of options to select)*/
        $scope.restartFilter = function () {
            $scope.filterOptions = {
                filters: {
                    filterName: "",
                    selectedRegion: "",
                    selectedMarket: "",
                    selectedSector: "",
                    selectedIndustry: "",
                    selectedOperation: "",
                    selectedRent: "",
                    rentInput: "",
                    selectedAverage: "",
                    rentAverageInput: "",
                    selectedRentDiary: "",
                    rentDiaryInput: "",
                    selectedVolatility: "",
                    volatilityInput: "",
                    selectedDuration: "",
                    durationInput: "",
                    index_type: "index",
                    favourite: false},
                selectors: {
                    regions: [
                        {"id": 1, "description": "America"},
                        {"id": 2, "description": "Europa"},
                        {"id": 3, "description": "China"}
                    ],

                    markets: [
                        {"id": 1, "description": "Bombay Stock Exchange"},
                        {"id": 2, "description": "American Stock Exchange"},
                        {"id": 3, "description": "Toronto Stock Exchange"}
                    ],

                    sectors: [
                        {"id": 1, "description": "Sector1"},
                        {"id": 2, "description": "Sector2"}
                    ],

                    industries: [
                        {"id": 1, "description": "Industry1"},
                        {"id": 2, "description": "Industry2"}
                    ],

                    operations: [
                        {"id": 1, "description": "buy"},
                        {"id": 2, "description": "sell"}
                    ],
                    comparators: [
                        {"id": 1, "description": "Menor que"},
                        {"id": 2, "description": "Mayor que"}
                    ]}


            };
        };





        /*load the table template*/
        $scope.getTemplateTable = function () {
            switch (TabsService.getActiveTab()) {
                case 2:
                    return templateTables[TabsService.getActiveTab()][$scope.filterOptions.filters.index_type].table;
                default:
                    return templateTables[TabsService.getActiveTab()].table;
            }

        };
        /*load the filter template*/
        $scope.getTemplateFilter = function () {
            switch (TabsService.getActiveTab()) {
                case 2:
                    return templateTables[TabsService.getActiveTab()][$scope.filterOptions.filters.index_type].filter;
                default:
                    return templateTables[TabsService.getActiveTab()].filter;
            }
        };
        /*changeTab, launches the http get*/
        $scope.changeTab = function (idTab) {
            //we change the page to 1, to load the new tab
            TabsService.changeActiveTab(idTab);
            $scope.pagingOptions.currentPage = 1;
            $scope.restartFilter();
           // $scope.getPagedDataAsync($scope.pagingOptions.pageSize, $scope.pagingOptions.currentPage, null);
            $scope.loadPage();
        };
        /*paginData sets the data in the table, and the results/found in the data to be showed in the view*/
        $scope.loadPage = function () {
            var data= PatternsService.getPagedDataAsync($scope.pagingOptions.pageSize,
                $scope.pagingOptions.currentPage, $scope.filterOptions.filters, function(data){
                    $scope.myData = data;//data.page;
                    /*mocked, this info is loaded from data*/
                    $scope.results = 100;//data.results;
                    $scope.found = 100;//data.found;
                    if (!$scope.$$phase) {
                        $scope.$apply();
                    }
                });

        };

        /*watch for pages*/
        $scope.$watch('pagingOptions', function (newVal, oldVal) {
            if (newVal !== oldVal && newVal.currentPage !== oldVal.currentPage) {
                //$scope.getPagedDataAsync($scope.pagingOptions.pageSize, $scope.pagingOptions.currentPage, $scope.filterOptions.filters, null);
                $scope.loadPage();
            }
        }, true);
        /**FOR FUTURES FILTERS**/
        $scope.$watch('filterOptions', function (newVal, oldVal) {
            if (newVal !== oldVal) {
               // $scope.getPagedDataAsync($scope.pagingOptions.pageSize, $scope.pagingOptions.currentPage, $scope.filterOptions.filters, null);
                $scope.loadPage();
            }
        }, true);
        /*function that is fired when the indexType filter is changed, it loads the table of index/pair index*/
        $scope.changeIndexType = function () {
           // PatternsService.getPagedDataAsync($scope.pagingOptions.pageSize, $scope.pagingOptions.currentPage, null);
            $scope.loadPage();
        };


        /*First load*/
        $scope.restartFilter();
        $scope.loadPage($scope.pagingOptions.pageSize, $scope.pagingOptions.currentPage, null);
    })
    .service("PatternsService", function($http,TabsService){

        /*make the string with the params for all the properties of the filter*/
        this.createParamsFromFilter = function (filtering) {
            var urlParams = "";
            for (var property in filtering) {
                if (filtering.hasOwnProperty(property)) {
                    // create the params
                    urlParams = "&" + property + "=" + filtering[property];
                }
            }
            return urlParams;
        };

        /*Function to load info from server, receives the pageSize, number of page, and the filter object (that have all the filters inside)*/
        this.getPagedDataAsync = function (pageSize, page, filtering,callbackFunc) {
            // setTimeout(function () { //change setTimeOut for $timeOut
            var data;
            /**
             *TODO: THIS IS A MOCKED HTTP REQUEST, THERE ARE A LOT OF JSON DEPENDING ON TYPE, IN THIS CASE WE CHANGE THE JSON TO LOAD
             *       BUT THE TYPE IS PASSED AS A PARAM IN THE FINAL CODE, NOT WILL CALL DIFERENTS URL..
             */


            var urlParam = this.createParamsFromFilter(filtering);
            var url_pattern;
            if (TabsService.getActiveTab() === 0) {//stock
                url_pattern = 'src/app/my_patterns/data/testdataStock.json.js?pageSize=' + pageSize + '&page=' + page + '&type=' + TabsService.getActiveTab();

            } else if (TabsService.getActiveTab() === 1) {//pairs
                url_pattern = 'src/app/my_patterns/data/testdataPairs.json.js?pageSize=' + pageSize + '&page=' + page + '&type=' + TabsService.getActiveTab();
            } else if (TabsService.getActiveTab() === 2) {//index
                if (filtering.index_type === 'index') {
                    url_pattern = 'src/app/my_patterns/data/testdataIndex.json.js?pageSize=' + pageSize + '&page=' + page + '&type=' + TabsService.getActiveTab();
                } else {
                    url_pattern = 'src/app/my_patterns/data/testdataPairs.json.js?pageSize=' + pageSize + '&page=' + page + '&type=' + TabsService.getActiveTab();
                }
            } else {//futures
                url_pattern = 'src/app/my_patterns/data/testdataStock.json.js?pageSize=' + pageSize + '&page=' + page + '&type=' + TabsService.getActiveTab();
            }

            //loads the url
            /*$http.get(url_pattern).success(function (largeLoad) {
               return largeLoad;
            });*/
            var result= $http.get(url_pattern).success(function(data) {
                // With the data succesfully returned, call our callback
                callbackFunc(data);
            });
        };
    });