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

    .controller('CalendarCtrl', function ($scope,$timeout, TabsService, $location, IsLogged, CalendarService, MonthSelectorService, $modal) {//<- use location.search()
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
                    dayDateInput: "",
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

                    operations: [
                        {"id": 0, "description": "Comprar"},
                        {"id": 1, "description": "Vender"}
                    ]
                }
            };
            if (!$scope.filterOptions.months) {
                $scope.filterOptions.months = MonthSelectorService.getCalendarListMonths();
            }
            //the filter selectMonth keeps the selector right selected, we keep the month and the selector synchronized
            $scope.updateSelectorMonth();

            //refresh all the selectors
            switch (TabsService.getActiveTab()) {
                case 0:     //stocks
                    $scope.refreshSelectors(['regions', 'markets']);
                    break;
                case 1:     //pairs
                    $scope.refreshSelectors(['regions']);
                    break;
                case 2:     //index (pair and index)
                    break;
                case 3:     //futures
                    $scope.refreshSelectors(['markets']);
                    break;
            }
        };
        //synchronize the selector with the month of the filter
        $scope.updateSelectorMonth = function () {
            for (i = 0; i < $scope.filterOptions.months.length; i++) {
                if ($scope.filterOptions.months[i].value === $scope.filterOptions.filters.month.value) {
                    $scope.filterOptions.filters.selectMonth = $scope.filterOptions.months[i];
                }
            }
        };

///urlParams control
        $scope.saveUrlParams = function () {
            var urlParams = $scope.filterOptions.filters;
            urlParams.page = $scope.pagingOptions.currentPage;
            //we ask each param to include in the url or not
            var urlParamsSend = {};
            if (urlParams.dayDateInput) {
                urlParamsSend.qday = urlParams.dayDateInput;
            }
            if (urlParams.selectedRegion) {
                urlParamsSend.qregion = urlParams.selectedRegion;
            }
            if (urlParams.selectedMarket) {
                urlParamsSend.qmarket = urlParams.selectedMarket;
            }
            if (urlParams.selectedOperation) {
                urlParamsSend.qop = urlParams.selectedOperation;
            }
            if (urlParams.index_type) {
                urlParamsSend.qindex = urlParams.index_type;
            }
            if (urlParams.tab_type) {
                urlParamsSend.qtab = urlParams.tab_type;
            }
            if (urlParams.active_tab === 0 || (urlParams.active_tab)) {
                urlParamsSend.qacttab = urlParams.active_tab;
            }
            if (urlParams.favourite) {
                urlParamsSend.qfav = urlParams.favourite;
            }
            urlParamsSend.qorder = urlParams.order;
            urlParamsSend.pag = urlParams.page;
            urlParamsSend.month = (urlParams.month.month + "_" + urlParams.month.year);

            $location.path('/calendar').search(urlParamsSend);
        };

        $scope.isCorrectDate = function (date) {

            for (i = 0; i < $scope.filterOptions.months.length; i++) {
                if ($scope.filterOptions.months[i].value === date) {
                    return true;
                }
            }
            return false;
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
            var params = $location.search();

            var filters = {
                filterName: (params.qname ? params.qname : "" ),
                selectedOperation: (params.qop ? params.qop : "" ),
                dayInput: (params.qday ? params.qday : "" ),
                durationInput: (params.qdur ? params.qdur : "" ),
                index_type: (params.qindex ? params.qindex : TabsService.getActiveIndexType() ),
                tab_type: (params.qtab ? params.qtab : "" ),
                active_tab: (params.qacttab ? parseInt(params.qacttab, 10) : TabsService.getActiveTab() ),
                favourite: (params.qfav ? params.qfav : "" ),
                order: (params.qorder ? params.qorder : 0),
                selectedMarket: (params.qmarket ? params.qmarket : ""),
                selectedRegion: (params.qregion ? params.qregion : ""),
                dayDateInput: (params.qday ? params.qday : null)

            };
            //special case for index
            if ((filters.active_tab === 2)) {//case of index

                $scope.selectedTypeIndice = parseInt(filters.index_type, 10);
                //only for index, not pair index
                if ((filters.index_type === 0) || (filters.index_type === "0")) {
                    filters.selectedOperation = (typeof params.qop !== "undefined" ? $scope.filterOptions.selectors.operationsIndex[parseInt(params.qop, 10)] : "" );
                } else {
                    filters.selectedOperation = "";
                }

            } else {
                filters.selectedOperation = (typeof params.qop !== "undefined" ? $scope.filterOptions.selectors.operations[parseInt(params.qop, 10)] : "" );
            }


            //special cases:
            var tabChanged = false;
            //if the params tab is different of the actual tab
            if (($scope.filterOptions.filters.active_tab !== params.qacttab)) {
                //change tab
                TabsService.changeActiveTab((params.qacttab ? parseInt(params.qacttab, 10) : TabsService.getActiveTab()));
                for (i = 0; i < $scope.tabs.length; i++) {
                    if ($scope.tabs[i].value === TabsService.getActiveTab()) {
                        $scope.tabs[i].active = true;
                        tabChanged = true;
                    } else {
                        $scope.tabs[i].active = false;
                    }
                }
            }
            $scope.selectedTab = TabsService.getActiveTab();
            //after set the tab, check if is a index and diferent type
            $scope.urlSelected = templateTables[$scope.transformTab($scope.selectedTab, $scope.selectedTypeIndice)];


            //if the month is defined in the params
            if (params.month) {
                var date = params.month.split("_");
                var d;
                //check if the date of the param is correct (is in the selector)
                //if not, just select the actualmonth
                if ($scope.isCorrectDate(params.month)) {
                    d = new Date(date[1], date[0] - 1, 1);
                } else {
                    actual_date = new Date();
                    d = new Date(actual_date.getFullYear(), actual_date.getMonth(), 1);
                }
                filters.month = MonthSelectorService.setDate(d);


            } else {
                //if the date is not passed as param, we load the default date
                //var date_restart = new Date();
                //filters.month = MonthSelectorService.restartDate();
                //var date_restart = new Date();
                //date_restart.setDate(1);
                //date_restart.setMonth(MonthSelectorService.getSelectedMonth().month-1);
                filters.month = MonthSelectorService.restartDate();
            }

            $scope.filterOptions.filters = filters;
            $scope.updateSelectorMonth();
            //if the tab changed, all the selectors must be reloaded (the markets could be diferents in pari and stocks for example)
            if (tabChanged) {
                switch (TabsService.getActiveTab()) {
                    case 0:     //stocks
                        $scope.refreshSelectors(['regions', 'markets']);
                        break;
                    case 1:     //pairs
                        $scope.refreshSelectors(['regions']);
                        break;
                    case 2:     //index (pair and index)
                        break;
                    case 3:     //futures
                        $scope.refreshSelectors(['markets']);
                        break;
                }
            }
        };

        $scope.changeTab = function (idTab) {

            $scope.urlSelected = templateTables[idTab];
            $scope.selectedTab = idTab;

            TabsService.changeActiveTab(idTab);
            $scope.restartFilter();
            $scope.applyFilters();
            $scope.pagingOptions.currentPage = 1;
            //save params to load data
            $scope.myData = [];
            $scope.saveUrlParams();
        };

        $scope.selectedTypeIndice = TabsService.getActiveIndexType();//now load index from service


        $scope.getDayOfWeek = function (dayOfMonth, lastDateMonth) {
            var daysOfWeek = ['Do', 'Lu', 'Ma', 'Mi', 'Ju', 'Vi', 'Sa'];
            var dayOfWeek = new Date($scope.filterOptions.filters.month.year, $scope.filterOptions.filters.month.month-1, dayOfMonth);
            return daysOfWeek[dayOfWeek.getDay()];
        };

        $scope.lastDateMonth = function () {

            var dat = CalendarService.getLastDayOfMonth($scope.filterOptions.filters.month.month, function (data) {
                $scope.lastDayOfMonth = data.lastDateMonth;

                if (!$scope.$$phase) {
                    $scope.$apply();
                }
            });
        };

        $scope.obtainDays = function () {

            var data = CalendarService.getPagedDataAsync($scope.pagingOptions.pageSize,
                $scope.pagingOptions.currentPage, $scope.filterOptions.filters, function (data) {
                    if (data.patterns.length > 0) {

                    }
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
        //function for paint a pattern depending on its date
        $scope.mustPaint = function (dayOfMonth, pattern) {
            var actualDate = $scope.filterOptions.filters.month;
            afterStart = false;
            beforeEnd = false;
            today = new Date();
            yesterday = new Date();
            tomorrow = new Date();//we compare entryDate and exitDate to yesterday and tomorrow
            //because the compare dates could not work with equals, but works fine with the operators < >
            today.setDate(dayOfMonth.dayOfMonth);
            today.setFullYear(actualDate.year);
            today.setMonth(actualDate.month - 1);
            today.setSeconds(0);
            today.setHours(0);
            today.setMinutes(0);
            today.setMilliseconds(0);
            yesterday.setTime(today.getTime() - (1 * 24 * 60 * 60 * 1000));
            tomorrow.setTime(today.getTime() + (1 * 24 * 60 * 60 * 1000));
            entryDate = new Date(pattern.entryDate);
            exitDate = new Date(pattern.exitDate);
            if (entryDate < tomorrow && exitDate > yesterday) {
                return true;
            } else {
                return false;
            }


        };

        $scope.checkFilters = function () {
            //for each input filter filled, the selector linked must be set
            if ($scope.filterOptions.filters.dayDateInput < 1 ||
                $scope.filterOptions.filters.dayDateInput > $scope.lastDayOfMonth) {
                return;
            }
        };

        $scope.search = function () {
            $scope.applyFilters();
        };
        //order Search is the same but with a wait of 5 seconds, is used in the order selector
        $scope.orderSearch = function () {
            $timeout(function () {
                $scope.applyFilters();
            }, 2000);
        };

        /*apply filters to search, restarting the page*/
        $scope.applyFilters = function () {
            $scope.pagingOptions.currentPage = 1; //restart the page
            $scope.checkFilters();//check if selectors and inputs are right
            $scope.saveUrlParams();
            $scope.lastDateMonth();
            $scope.obtainDays();
        };

        $scope.refreshRegion = function () {
            $scope.filterOptions.filters.selectedMarket = "";
            switch (TabsService.getActiveTab()) {
                case 0://stock have markets to refresh
                case 1:
                case 3://futures ONLY have markets
                    $scope.refreshSelectors(['markets']);
                    break;
                default://others doesnt have selectors to refresh
                    break;
            }
        };
        $scope.selectRegion = function () {
            $scope.refreshRegion();
            $scope.applyFilters();

        };

        //refresh selectors depending of market
        $scope.refreshMarket = function () {
            if (TabsService.getActiveTab() === 0) {
                $scope.refreshSelectors(['industries', 'sectors']);
            }
        };
        $scope.selectMarket = function () {
            //in stock is required refresh industries, sectors, in futures and
            //others tabs dont have this selectors
            $scope.refreshMarket();
            $scope.applyFilters();
        };

        //when we change index type (pairs_index, or index)
        $scope.selectIndexType = function () {
            TabsService.changeActiveIndexType($scope.filterOptions.filters.index_type);
            $scope.selectedTypeIndice = $scope.filterOptions.filters.index_type;
            $scope.urlSelected = templateTables[$scope.transformTab($scope.selectedTab, $scope.selectedTypeIndice)];
            $scope.applyFilters();
        };

        $scope.goToMonth = function () {
            var date = $scope.filterOptions.filters.selectMonth.value.split("_");
            var d = new Date(date[1], date[0] - 1, 1);
            $scope.filterOptions.filters.month = MonthSelectorService.setDate(d);
            $scope.restartFilter();
            $scope.saveUrlParams();
        };

        /**
         *      make a petition of selectors, the selectors is an array of the selectors required from server
         */
        $scope.refreshSelectors = function (selectors) {
            CalendarService.getSelectors($scope.filterOptions.filters, selectors, function (data) {
                //checks the data received, when a selector is refreshed, the value selected is also cleaned
                if (data.hasOwnProperty("markets")) {
                    $scope.filterOptions.selectors.markets = data.markets;
                    if (typeof data.selectedRegion != 'undefined') {
                        $scope.filterOptions.filters.selectedRegion = data.selectedRegion;
                    }
                    //$scope.filterOptions.filters.selectedMarket = "";
                }
                if (data.hasOwnProperty("regions")) {
                    $scope.filterOptions.selectors.regions = data.regions;
                    //$scope.filterOptions.filters.selectedRegion = "";
                }
            });
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

        $scope.obtainCalendarPdf = function () {
            var data = CalendarService.generateCalendarPdf($scope.filterOptions.filters).then(function (data) {
                var productType = "Acciones";
                switch (TabsService.getActiveTab()) {
                    case 0:     //stocks
                        productType = "Acciones";
                        break;
                    case 1:     //pairs
                        productType = "Par_Acciones";
                        break;
                    case 2:     //index (pair and index)
                        if ($scope.filterOptions.filters.index_type == 1) {
                            productType = "Par_Indices";
                        } else {
                            productType = "Indices";
                        }
                        break;
                    case 3:     //futures
                        productType = "Futuros";
                        break;
                }
                var filename = "calendar-" + productType + ".pdf";
                var element = angular.element('<a/>');
                element.attr({
                    href: 'data:attachment/pdf;base64,' + encodeURI(data),
                    target: '_blank',
                    download: filename
                })[0].click();
            });
        };
    })

    .service("CalendarService", function ($http, $window, $rootScope, $q) {

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

            var indexType = null;

            if (typeof filtering.index_type !== "undefined") {
                indexType = parseInt(filtering.index_type, 10);
            } else {
                indexType = 0;
            }

            config = {
                params: {
                    'page': page,
                    'token': $window.sessionStorage.token,
                    'productType': parseInt(filtering.active_tab, 10),
                    'indexType': indexType,
                    'order': parseInt(filtering.order, 10),
                    'dayDateInput': filtering.dayDateInput,
                    'month': filtering.month.month,
                    'year': filtering.month.year,
                    'region': filtering.selectedRegion,
                    'market': filtering.selectedMarket,
                    'operation': filtering.selectedOperation,
                    'favourites': filtering.favourite
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
            var data;

            var indexType = null;

            if (typeof filtering.index_type !== "undefined") {
                indexType = parseInt(filtering.index_type, 10);
            } else {
                indexType = 0;
            }

            config = {
                params: {
                    'region': filtering.selectedRegion,
                    'market': filtering.selectedMarket,
                    'sector': filtering.selectedSector,
                    'industry': filtering.selectedIndustry,
                    'token': $window.sessionStorage.token,
                    'productType': parseInt(filtering.active_tab, 10),
                    'indexType': indexType,
                    'month': filtering.month.month,
                    'year': filtering.month.year,
                    'view': location.hash.replace("/#","")
                }
            };

            var result = $http.get($rootScope.urlService+'/patternfilters', config).success(function (data) {
                // With the data succesfully returned, call our callback
                callback(data);
            });

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

        this.generateCalendarPdf = function (filtering) {
            var deferred = $q.defer();

            var indexType = null;

            if (typeof filtering.index_type !== "undefined") {
                indexType = parseInt(filtering.index_type, 10);
            } else {
                indexType = 0;
            }

            config = {
                headers: {
                    'order': parseInt(filtering.order, 10),
                    'productType': parseInt(filtering.active_tab, 10),
                    'indexType': indexType,
                    'month': filtering.month.month,
                    'year': filtering.month.year,
                    'token': $window.sessionStorage.token
                }
            };

            var result = $http.post($rootScope.urlService+'/calendarpdf', config).then(function (response) {
                // With the data succesfully returned, call our callback
                deferred.resolve();
                return response.data;
            });
            return result;
        };
    })

;
/*
var ModalCalendarPdfInstanceCtrl = function ($scope, $modalInstance, setRegion, selectedRegion, order, regions, selectedDate, selectedTab) {
    $scope.selectedRegion = selectedRegion;
    $scope.selectedTab = selectedTab;
    $scope.regions = regions;
    $scope.selectedDate = selectedDate;
    $scope.order = order;
    $scope.setRegion = setRegion;
    $scope.showText = false;

    $scope.data = {
        region: (typeof $scope.selectedRegion !== 'undefined' ? selectedRegion : 0),
        order: (typeof order !== 'undefined' ? order : 0)
    };

    $scope.ok = function () {
        if ($scope.data.region === ''){
            $scope.showText = true;
            return;
        }else{
            $scope.showText = false;
        }
        $scope.setRegion($scope.data.region, $scope.data.order, $scope.selectedDate, $scope.selectedTab);
        $modalInstance.close();
    };

    $scope.close = function () {
        $modalInstance.dismiss('cancel');
    };

    $scope.cancel = function () {
        $modalInstance.dismiss('cancel');
    };
};

var ModalCalendarPdfOkCtrl = function ($scope, $modalInstance) {
    $scope.close = function () {
        $modalInstance.dismiss('cancel');
    };
};
    */