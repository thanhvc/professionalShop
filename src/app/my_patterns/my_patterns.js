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

                    ],

                    markets: [
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

            //refresh all the selectors
            switch (TabsService.getActiveTab()) {
                case 0:     //stocks
                    $scope.refreshSelectors(['regions', 'markets', 'industries', 'sectors']);
                    break;
                case 1:     //pairs
                    $scope.refreshSelectors(['regions',  'industries', 'sectors']);
                    break;
                case 2:     //index (pair and index)
                    break;
                case 3:     //futures
                    $scope.refreshSelectors(['markets']);
                    break;
            }

        };


        /*load the table template*/
        $scope.getTemplateTable = function () {
            switch (TabsService.getActiveTab()) {
                case 2:         //index
                    return templateTables[TabsService.getActiveTab()][$scope.filterOptions.filters.index_type].table;
                default:        //others
                    return templateTables[TabsService.getActiveTab()].table;
            }

        };
        /*load the filter template*/
        $scope.getTemplateFilter = function () {
            switch (TabsService.getActiveTab()) {
                case 2:         //index
                    return templateTables[TabsService.getActiveTab()][$scope.filterOptions.filters.index_type].filter;
                default:        //others
                    return templateTables[TabsService.getActiveTab()].filter;
            }
        };
        /*changeTab, launches the http get*/
        $scope.changeTab = function (idTab) {
            //we change the page to 1, to load the new tab
            TabsService.changeActiveTab(idTab);
            $scope.restartFilter();
            $scope.applyFilters();
        };

        //restore filters and load page
        $scope.restoreData = function () {
            $scope.changeTab(TabsService.getActiveTab);//is like change to the same tab
        };

        /* sets the data in the table, and the results/found in the data to be showed in the view*/
        $scope.loadPage = function () {
            var data = PatternsService.getPagedDataAsync($scope.pagingOptions.pageSize,
                $scope.pagingOptions.currentPage, $scope.filterOptions.filters, function (data) {
                    $scope.myData = data;//data.page;
                    /*mocked, this info is loaded from data*/
                    $scope.results = 100;//data.results;
                    $scope.found = 100;//data.found;
                    if (!$scope.$$phase) {
                        $scope.$apply();
                    }
                });

        };


        /**
         *      make a petition of selectors, the selectors is an array of the selectors required from server
         */
        $scope.refreshSelectors = function (selectors) {
            PatternsService.getSelectors($scope.filterOptions.filters, selectors, function (data) {
                //checks the data received
                if (data.hasOwnProperty("markets")) {
                    $scope.filterOptions.selectors.markets = data.markets;
                }
                if (data.hasOwnProperty("regions")) {
                    $scope.filterOptions.selectors.regions = data.regions;
                }
                if (data.hasOwnProperty("industries")) {
                    $scope.filterOptions.selectors.industries = data.industries;
                }
                if (data.hasOwnProperty("sectors")) {
                    $scope.filterOptions.selectors.sectors = data.sectors;
                }
            });
        };

        /**
         *  make a new search with the filters, restart the page and search, for the button Search in the page
         */
        $scope.search = function () {
            switch (TabsService.getActiveTab()) {
                case 0://stock have markets to refresh
                    $scope.refreshSelectors( ['markets', 'industries', 'sectors']);
                    break;
                case 1://pairs doesnt have markets
                    $scope.refreshSelectors( ['markets', 'industries', 'sectors']);
                    break;
                case 3: //futures ONLY have markets
                    $scope.refreshSelectors( ['markets']);
                    break;
                default://others doesnt have selectors to refresh
                    break;
            }

            $scope.applyFilters();
        };

        /*apply filters to search, restarting the page*/
        $scope.applyFilters = function () {
            $scope.pagingOptions.currentPage = 1; //restart the page
            $scope.loadPage();
        };
        /**
         * specific functions to refresh each selector,
         * This functions are defined to be used in onchange events, this way
         * we dont use watch (for dont overload the scope)
         * note: select Region/operation uses Search, because is like push the button Search..
         */


        $scope.selectMarket = function () {
            //in stock is required refresh industries, sectors, in futures and
            //others tabs dont have this selectors
            if (TabsService.getActiveTab() === 0) {
                $scope.refreshSelectors(['industries', 'sectors']);
            }
            $scope.applyFilters();
        };

        //only used in stock
        $scope.selectSector = function () {
            $scope.refreshSelectors(['industries']);
            $scope.applyFilters();
        };

        /**
         * watch for pages
         * */
        $scope.$watch('pagingOptions', function (newVal, oldVal) {
            if (newVal !== oldVal && newVal.currentPage !== oldVal.currentPage) {
                //$scope.getPagedDataAsync($scope.pagingOptions.pageSize, $scope.pagingOptions.currentPage, $scope.filterOptions.filters, null);
                $scope.loadPage();
            }
        }, true);
        /**FOR FUTURES FILTERS*
         $scope.$watch('filterOptions', function (newVal, oldVal) {
            if (newVal !== oldVal) {
               // $scope.getPagedDataAsync($scope.pagingOptions.pageSize, $scope.pagingOptions.currentPage, $scope.filterOptions.filters, null);
                $scope.loadPage();
            }
        }, true);
         */
        /*function that is fired when the indexType filter is changed, it loads the table of index/pair index*/
        $scope.changeIndexType = function () {
            // PatternsService.getPagedDataAsync($scope.pagingOptions.pageSize, $scope.pagingOptions.currentPage, null);
            $scope.loadPage();
        };

        /*First load on page ready*/
        $scope.restartFilter();
        $scope.loadPage();
    })
    .service("PatternsService", function ($http, TabsService) {

        /*make the string with the params for all the properties of the filter*/
        this.createParamsFromFilter = function (filtering) {
            var urlParams = "";
            for (var property in filtering) {
                if (filtering.hasOwnProperty(property)) { //check if its a property (to exclude technicals property of js)
                    // create the params
                    if ((filtering[property] != null) && (filtering[property] !== "")) {
                        urlParams += "&" + property + "=" + filtering[property];
                    }
                }
            }
            return urlParams;
        };

        /*Function to load info from server, receives the pageSize, number of page, and the filter object (that have all the filters inside)*/
        this.getPagedDataAsync = function (pageSize, page, filtering, callbackFunc) {
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
            var result = $http.get(url_pattern).success(function (data) {
                // With the data succesfully returned, call our callback
                callbackFunc(data);
            });
        };

        /**
         *
         * @param filtering - is the object with the filters
         * @param selectorsToRefresh - the list of selectors requested
         */
        this.getSelectors = function (filtering, selectorsToRefresh, callback) {
            //the filtering object could contains some filters that are required for get the specified selectors
            //for example, to get the markets, the selected region is required (if there is not region, means all..)
            //the http petition will use the callback function to load the info received from server
            var data = {};
            /*mocked -- we are going to check the selectors needed and check filters */
            //mocked lists:
            var eeuuMarkets = [
                {"id": 1, "description": "American Stock Exchange"},
                {"id": 2, "description": "Nasdaq Stock Exchange"},
                {"id": 3, "description": "New York Stock Exchange"}
            ];
            var indianMarkets = [
                {"id": 4, "description": "Bombay Stock Exchange"},
                {"id": 5, "description": "National Stock Exchange"}
            ];

            var chinaMarkets = [
                {"id": 6, "description": "Shangai Stock Exchange"},
                {"id": 7, "description": "Shenzhen Stock Exchange"}
            ];

            if (selectorsToRefresh.indexOf("regions")>-1) {
                //load regions (always all regions)
                data.regions = [
                    {"id": 1, "description": "America"},
                    {"id": 2, "description": "India"},
                    {"id": 3, "description": "China"}
                ];
            }
            if (selectorsToRefresh.indexOf("markets")>-1) {
                //load markets , check if region is selected.
                //NOTE: IN A REAL CASE ALL THE FILTERS INFLUENCE THE LIST RECEIVED, NOT ONLY THE REGION
                //the cases are in string (not INT) so we use expressions to check the value
                switch (true) {
                    case /1/.test(filtering.selectedRegion): //america
                        data.markets = eeuuMarkets;
                        break;
                    case /2/.test(filtering.selectedRegion):
                        data.markets = indianMarkets;
                        break;
                    case /3/.test(filtering.selectedRegion):
                        data.markets = chinaMarkets;
                        break;
                    default :
                        data.markets = eeuuMarkets.concat(indianMarkets.concat(chinaMarkets));
                }
            }

            //the sectors and industries are always same, to dont make large code
            if (selectorsToRefresh.indexOf("sectors")>-1) {
                data.sectors = [
                    {"id": 1, "description": "Sector1"},
                    {"id": 2, "description": "Sector2"}
                ];
            }

            if (selectorsToRefresh.indexOf("industries")>-1) {
                data.industries = [
                    {"id": 1, "description": "Industry1"},
                    {"id": 2, "description": "Industry2"}
                ];
            }

            callback(data);

        };
    });