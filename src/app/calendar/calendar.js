angular.module('ngMo.calendar', [
    'ui.router'
])

    .config(function config($stateProvider) {
        $stateProvider.state('calendar', {
            url: '/calendar',
            views: {
                "main": {
                    controller: 'CalendarCtrl',
                    templateUrl: 'calendar/calendar.tpl.html'
                }
            },
            data: {
                pageTitle: 'Calendario',
                selectMenu: 'calendar-nav',
                selectSubmenu: '',
                selectItemSubmenu: '',
                moMenuType: 'privateMenu'
            },
            reloadOnSearch: false
        });
    })

    .run(function run() {
    })

    .controller('CalendarCtrl', function ($scope, TabsService, $location, IsLogged, CalendarService, MonthSelectorService, ActualDateService) {//<- use location.search()
        $scope.$on('$stateChangeStart', function (event, toState) {
            IsLogged.isLogged();
        });
        $scope.$on('$stateChangeSuccess', function (event, toState, toParams, fromState, fromParams) {
            if (angular.isDefined(toState.data.pageTitle)) {
                $scope.pageTitle = toState.data.pageTitle + ' | Market Observatory';
            }
        });

        $scope.selectedTab = TabsService.getActiveTab();
        $scope.tabs = TabsService.getTabs();
        $scope.filterOptions = "";//initialization to empty, this object is filled with "restartFilters"
        $scope.day = '';


        var templateTables = [
            'calendar/calendar_tables/calendar-stock-table.tpl.html',
            'calendar/calendar_tables/calendar-pairs-table.tpl.html',
            'calendar/calendar_tables/calendar-indices-table.tpl.html',
            'calendar/calendar_tables/calendar-futures-table.tpl.html',
            'calendar/calendar_tables/calendar-pairs-indices-table.tpl.html'
        ];

        $scope.pagingOptions = {
            pageSize: 15,
            currentPage: 1
        };

        $scope.setPage = function (page) {
            $scope.pagingOptions.currentPage = page;
            $scope.saveUrlParams();
        };


        /*loads the default filters --> Filters has filters (inputs) and selectors (array of options to select)*/
        $scope.restartFilter = function () {
            var restartMonth = true;
            var restartMonthList = true;
            if ($scope.filterOptions.filters) {
                if ($scope.filterOptions.filters.month) {
                    restartMonth = false;
                }
                if ($scope.filterOptions.selectors.months) {
                    restartMonthList = false;
                }
            }
            $scope.filterOptions = {
                filters: {
                    selectedRegion: "",
                    selectedMarket: "",
                    selectedOperation: "",
                    order: 0,
                    index_type: TabsService.getActiveIndexType(),
                    tab_type: $scope.tabs[TabsService.getActiveTab()].title,
                    active_tab: TabsService.getActiveTab(),
                    //if month is set, we keep the value
                    month: (restartMonth ? MonthSelectorService.restartDate() : $scope.filterOptions.filters.month),
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
                    ]

                }
            };
            if (!$scope.filterOptions.months) {
                $scope.filterOptions.months = MonthSelectorService.getListMonths();
            }
            //the filter selectMonth keeps the selector right selected, we keep the month and the selector synchronized
            $scope.updateSelectorMonth();

            //refresh all the selectors
            switch (TabsService.getActiveTab()) {
                case 0:     //stocks
                    $scope.refreshSelectors(['regions', 'markets', 'industries', 'sectors']);
                    break;
                case 1:     //pairs
                    $scope.refreshSelectors(['regions', 'industries', 'sectors']);
                    break;
                case 2:     //index (pair and index)
                    break;
                case 3:     //futures
                    $scope.refreshSelectors(['markets']);
                    break;
            }
        };


        $scope.saveUrlParams = function () {
            var urlParams = {};
            urlParams.pag = $scope.pagingOptions.currentPage;
            urlParams.qacttab = $scope.selectedTab;
            urlParams.qindex = TabsService.getActiveIndexType();
            $location.path('/calendar').search(urlParams);
        };

        //synchronize the selector with the month of the filter
        $scope.updateSelectorMonth = function () {
            for (i = 0; i < $scope.filterOptions.months.length; i++) {
                if ($scope.filterOptions.months[i].value === $scope.filterOptions.filters.month.value) {
                    $scope.filterOptions.filters.selectMonth = $scope.filterOptions.months[i];
                }
            }
        };

        $scope.loadUrlParams = function () {
            var urlParams = $location.search();
            $scope.selectedTab = (urlParams.qacttab ? urlParams.qacttab : TabsService.getActiveTab());
            $scope.selectedTypeIndice = (urlParams.qindex ? urlParams.qindex : TabsService.getActiveIndexType() );
            $scope.selectedMonth = ($scope.calendarMonths[0]).value;
            $scope.selectedOrder = 0;
            TabsService.changeActiveTab(parseInt($scope.selectedTab, 10));
            $scope.urlSelected = templateTables[$scope.transformTab($scope.selectedTab, $scope.selectedTypeIndice)];
            $scope.tabs = TabsService.getTabs();
            $scope.tabs[TabsService.getActiveTab()].active = true;
            $scope.filterOptions.filters.active_tab = $scope.selectedTab;
        };


        $scope.changeTab = function (idTab) {


            // $scope.obtainDays(idTab);
            $scope.selectedMonth = ($scope.calendarMonths[0]).value;
            $scope.selectedOrder = 0;
            $scope.selectedTypeIndice = 0;
            $scope.urlSelected = templateTables[idTab];
            $scope.selectedTab = idTab;

            TabsService.changeActiveTab(idTab);
            $scope.restartFilter();
            $scope.applyFilters();
            $scope.pagingOptions.currentPage = 1;
            //save params to load data
            $scope.saveUrlParams();
        };

        $scope.calendarMonths = [
            {
                value: 0,
                description: "Junio 2014"
            },
            {
                value: 1,
                description: "Julio 2014"
            }
        ];

        $scope.calendarRegions = [
            {
                id: 1,
                description: "Estados Unidos"
            },
            {
                id: 2,
                description: "EURO Zona"
            }
        ];

        $scope.calendarMarkets = [
            {
                id: 1,
                description: "American Stock Exchange"
            },
            {
                id: 2,
                description: "NASDAQ Stock Exchange"
            }
        ];

        $scope.selectedMonth = ($scope.calendarMonths[0]).value;
        $scope.selectedOrder = 0;
        $scope.selectedTypeIndice = TabsService.getActiveIndexType();//now load index from service


        $scope.getDayOfWeek = function (dayOfMonth, lastDateMonth) {
            var daysOfWeek = ['Do', 'Lu', 'Ma', 'Mi', 'Ju', 'Vi', 'Sa'];
            var dayOfWeek = new Date(2014, 6 - 1, dayOfMonth);
            return daysOfWeek[dayOfWeek.getDay()];
        };

        $scope.lastDateMonth = function () {

            var dat = CalendarService.getLastDayOfMonth(7 - 1, function (data) {
                $scope.lastDayOfMonth = data.lastDateMonth;

                if (!$scope.$$phase) {
                    $scope.$apply();
                }
            });
        };

        $scope.obtainDays = function () {

            var data = CalendarService.getPagedDataAsync($scope.pagingOptions.pageSize,
                $scope.pagingOptions.currentPage, $scope.filterOptions.filters, function (data) {
                    $scope.myData = data.patterns;//data.page;
                    $scope.results = data.results;//data.results;
                    $scope.found = data.found;//data.found;
                    $scope.daysOfMonth = [];
                    for (var i = 1; i <= $scope.lastDayOfMonth; i++) {
                        $scope.daysOfMonth.push({
                            dayOfWeek: $scope.getDayOfWeek(i, $scope.lastDayOfMonth),
                            dayOfMonth: i
                        });
                    }
                    if (!$scope.$$phase) {
                        $scope.$apply();
                    }
                });


        };

        $scope.search = function () {
            $scope.applyFilters();
        };

        /*apply filters to search, restarting the page*/
        $scope.applyFilters = function () {
            $scope.pagingOptions.currentPage = 1; //restart the page
            //$scope.checkFilters();//check if selectors and inputs are right
            $scope.saveUrlParams();
            $scope.lastDateMonth();
            $scope.obtainDays();
        };

        /**
         *      make a petition of selectors, the selectors is an array of the selectors required from server
         */
        $scope.refreshSelectors = function (selectors) {
            CalendarService.getSelectors($scope.filterOptions.filters, selectors, function (data) {
                //checks the data received, when a selector is refreshed, the value selected is also cleaned
                if (data.hasOwnProperty("markets")) {
                    $scope.filterOptions.selectors.markets = data.markets;
                    $scope.filterOptions.filters.selectedMarket = "";
                }
                if (data.hasOwnProperty("regions")) {
                    $scope.filterOptions.selectors.regions = data.regions;
                    $scope.filterOptions.filters.selectedRegion = "";
                }
                if (data.hasOwnProperty("industries")) {
                    $scope.filterOptions.selectors.industries = data.industries;
                    $scope.filterOptions.filters.selectedIndustry = "";
                }
                if (data.hasOwnProperty("sectors")) {
                    $scope.filterOptions.selectors.sectors = data.sectors;
                    $scope.filterOptions.filters.selectedSector = "";
                }
            });
        };

        $scope.changeIndiceFilter = function (selectedTypeIndice) {
            if (parseInt(selectedTypeIndice, 10) === 0) {
                $scope.urlSelected = templateTables[2];
            } else {
                $scope.urlSelected = templateTables[4];
            }
            TabsService.changeActiveIndexType(parseInt(selectedTypeIndice, 10));
            $scope.selectedTypeIndice = selectedTypeIndice;
        };
        //function to convert the service tab to the local tab system
        $scope.transformTab = function (idTab, idIndex) {
            if (parseInt(idTab, 10) === 2) {//is Index
                if (parseInt(idIndex, 10) === 0) {
                    return 2;
                } else {
                    return 4;
                }

            } else {
                return idTab;
            }
        };

        $scope.$on('$locationChangeSuccess', function (event, $stateParams) {
            $scope.loadUrlParams();
            $scope.lastDateMonth();
            $scope.obtainDays();
        });

        $scope.restartFilter();

        if ($location.search()) {
            $scope.loadUrlParams();
            $scope.lastDateMonth();
            $scope.obtainDays();
        }

        $scope.lastDateMonth();
        $scope.obtainDays();

        $scope.urlSelected = templateTables[$scope.transformTab($scope.selectedTab, $scope.selectedTypeIndice)];

    })

    .service("CalendarService", function ($http, $window, $rootScope) {

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
            var data;
            var urlParam = this.createParamsFromFilter(filtering);

            config = {
                params: {
                    'page': page,
                    'token': $window.sessionStorage.token,
                    'productType': parseInt(filtering.active_tab, 10),
                    'indexType': parseInt(filtering.active_tab, 10),
                    'order': parseInt(filtering.order, 10)
                }
            };

            var result = $http.get($rootScope.urlService+'/calendarpatterns', config).success(function (data) {
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

            if (selectorsToRefresh.indexOf("regions") > -1) {
                //load regions (always all regions)
                data.regions = [
                    {"id": 1, "description": "America"},
                    {"id": 2, "description": "India"},
                    {"id": 3, "description": "China"}
                ];
            }
            if (selectorsToRefresh.indexOf("markets") > -1) {
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
            if (selectorsToRefresh.indexOf("sectors") > -1) {
                data.sectors = [
                    {"id": 1, "description": "Sector1"},
                    {"id": 2, "description": "Sector2"}
                ];
            }

            if (selectorsToRefresh.indexOf("industries") > -1) {
                data.industries = [
                    {"id": 1, "description": "Industry1"},
                    {"id": 2, "description": "Industry2"}
                ];
            }

            callback(data);

        };

        this.getLastDayOfMonth = function (month, callbackFunc) {

            config = {
                params: {
                    'month': month,
                    'token': $window.sessionStorage.token
                }
            };
            var result = $http.get($rootScope.urlService+'/lastdaymonth', config).success(function (data) {
                // With the data succesfully returned, call our callback
                callbackFunc(data);
            });
        };
    })

;