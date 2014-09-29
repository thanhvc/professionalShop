angular.module('ngMo.correlation', [
    'ui.router'
])

    .config(function config($stateProvider) {
        $stateProvider.state('correlation', {
            url: '/correlation',
            views: {
                "main": {
                    controller: 'CorrelationCtrl',
                    templateUrl: 'tools/correlation/correlation.tpl.html'
                }
            },
            data: {
                pageTitle: 'Correlación',
                selectMenu: 'tools-nav',
                selectSubmenu: 'submenu1',
                selectItemSubmenu: 'correlation-nav',
                moMenuType: 'privateMenu'
            }
        });
    })

    .run(function run() {
    })

    .controller('CorrelationCtrl', function ($scope, $rootScope, $http, $state, $stateParams, $location, TabsService,
                                             ActualDateService, MonthSelectorService, IsLogged, CorrelationService, $window, PatternsService, $timeout,UserApplyFilters, SelectedMonthService) {

        $scope.$on('$stateChangeSuccess', function (event, toState, toParams, fromState, fromParams) {
            if (angular.isDefined(toState.data.pageTitle)) {
                $scope.pageTitle = toState.data.pageTitle + ' | Market Observatory';
            }
            IsLogged.isLogged(true);
        });

        $scope.moving = false; //moving between tables
        $scope.startLoading = function() {

            $scope.loading = true;
            $scope.myData =[];
        };

        $scope.startMoving = function() {
            $scope.moving = true;
        };
        $scope.endMoving = function() {
            $scope.moving = false;
        };
        $scope.loading = true;
        $scope.calculating = false;
        //tabs and variables
        //pattern number for rents
        $scope.rentPattern = /^[-+]?\d+(\.\d{0,2})?$/;
        $scope.daysPattern = /^\d+$/;
        /**private models*/
        $scope.selectedTab = TabsService.getActiveTab();
        var data = ActualDateService.actualDate(function (data) {
            $scope.actualDate = data.actualDate;
        });
        $scope.tabs = TabsService.getTabs();
        $scope.filterOptions = "";//initialization to empty, this object is filled with "restartFilters"
        $scope.totalServerItems = 0;
        /*paging options*/
        $scope.pagingOptions = {
            pageSize: 15,
            currentPage: 1
        };

        $scope.selectedPatterns = {};

        /** templates of filters/tables for each tab**/
        var templateTables = [
            {"table": 'tools/correlation/tables/stocks_table.tpl.html',
                "filter": 'tools/correlation/filters/stocks_filters.tpl.html'},

            {"table": 'tools/correlation/tables/pairs_table.tpl.html',
                "filter": 'tools/correlation/filters/pairs_filters.tpl.html'},

            [
                {"table": 'tools/correlation/tables/index_table.tpl.html',
                    "filter": 'tools/correlation/filters/index_filters.tpl.html'},
                {"table": 'tools/correlation/tables/pairs_index_table.tpl.html',
                    "filter": 'tools/correlation/filters/index_filters.tpl.html'}
            ],

            {"table": 'tools/correlation/tables/futures_table.tpl.html',
                "filter": 'tools/correlation/filters/futures_filters.tpl.html'}
        ];


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
                    filterName: "",

                    selectedMarket: "",
                    selectedOperation: "",
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
                    ],
                    operationsIndex: [
                        {"id": 0, "description": "Alcista"},
                        {"id": 1, "description": "Bajista"}
                    ],
                    comparators: [
                        {"id": 0, "description": "Menor que"},
                        {"id": 1, "description": "Mayor que"}
                    ],

                    comparatorsConversor: [1,0]//the comparatos in pos[0] means 1 and viceversa (posterior changes..) so use this conversor for pos/value


                }
            };
            if ($scope.filterOptions.filters.active_tab === 0) {
                $scope.filterOptions.selectedRegion = (typeof $scope.correlationList !== "undefined" && $scope.correlationList.length > 0 ? $scope.filterOptions.filters.selectedRegion: "");
            } else if ($scope.filterOptions.filters.active_tab === 1) {
                $scope.filterOptions.selectedRegion = (typeof $scope.correlationList !== "undefined" && $scope.correlationList.length > 0 ? $scope.filterOptions.filters.selectedRegionPair: "");
            } else {
                $scope.filterOptions.selectedRegion = "";
            }

            if (!$scope.filterOptions.months) {
                $scope.filterOptions.months = MonthSelectorService.getListMonths();
            }
            //the filter selectMonth keeps the selector right selected, we keep the month and the selector synchronized
            $scope.updateSelectorMonth();

            //refresh all the selectors
            switch (TabsService.getActiveTab()) {
                case 0:     //stocks
                    $scope.refreshSelectors(['regions', 'markets'],$scope.filterOptions.filters, $scope.callBackRefreshSelectors);
                    break;
                case 1:     //pairs
                    $scope.refreshSelectors(['regions'],$scope.filterOptions.filters, $scope.callBackRefreshSelectors);
                    break;
                case 2:     //index (pair and index)
                    break;
                case 3:     //futures
                    $scope.refreshSelectors(['markets'],$scope.filterOptions.filters, $scope.callBackRefreshSelectors);
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
            $scope.startLoading();
            //we change the page to 1, to load the new tab
            TabsService.changeActiveTab(idTab);
            $scope.filterOptions.filters.active_tab = idTab;

            $scope.pagingOptions.currentPage = 1;

            $scope.restartFilter();
            $scope.applyFilters();

            $scope.clearResults();
            loadCorrelationList();
        };

        $scope.clearResults = function () {
            $scope.correlationData = [];
            $scope.correlationCaption1 = [];
            $scope.correlationCaption2 = [];
            $scope.correlationList = [];
        };

        //restore filters and load page
        $scope.restoreData = function () {
            $scope.changeTab(TabsService.getActiveTab());//is like change to the same tab
        };

        loadCorrelationList = function () {
            $scope.correlationList = [];
            switch ($scope.filterOptions.filters.active_tab) {
                case 0://STOCK
                    if ((typeof $window.sessionStorage.correlationStocks !== "undefined") && ($window.sessionStorage.correlationStocks !== "undefined") ) {
                        $scope.correlationList = angular.fromJson($window.sessionStorage.correlationStocks);
                        //load the locked region only if there is selected patterns
                        if ($scope.correlationList.length >0) {
                            if (typeof $window.sessionStorage.correlationRegion !== "undefined" && ($window.sessionStorage.correlationRegion !== "undefined")) {
                                $scope.filterOptions.filters.selectedRegion = $window.sessionStorage.correlationRegion;
                            }
                        }
                    }
                    else{
                        $scope.correlationList = [];
                    }
                    break;
                case 1://PAIRS
                    if ((typeof $window.sessionStorage.correlationStockPairs !== "undefined") && $window.sessionStorage.correlationStockPairs !== "undefined") {
                        $scope.correlationList = angular.fromJson($window.sessionStorage.correlationStockPairs);
                        //load the locked region only if there is selected patterns
                        if ($scope.correlationList.length >0) {
                            if (typeof $window.sessionStorage.correlationRegionPair !== "undefined" && ($window.sessionStorage.correlationRegionPair !== "undefined")) {
                                $scope.filterOptions.filters.selectedRegion = $window.sessionStorage.correlationRegionPair;
                            }
                        }
                    } else {
                        $scope.correlationList = [];
                    }
                    break;
                case 2://INDEX
                    if ($scope.filterOptions.filters.index_type === "0") {//SIMPLE INDEX
                        if ((typeof $window.sessionStorage.correlationIndices !== "undefined") && ($window.sessionStorage.correlationIndices !== "undefined")) {
                            $scope.correlationList = angular.fromJson($window.sessionStorage.correlationIndices);
                        }else {
                            $scope.correlationList = [];
                        }
                    } else {//PAIR INDEX
                        if ((typeof $window.sessionStorage.correlationIndicePairs !== "undefined") && ($window.sessionStorage.correlationIndicePairs !== "undefined"))  {
                            $scope.correlationList = angular.fromJson($window.sessionStorage.correlationIndicePairs);
                        } else {
                            $scope.correlationList = [];
                        }
                    }
                    break;
                case 3://FUTURES
                    if ((typeof $window.sessionStorage.correlationFutures !== "undefined") && ($window.sessionStorage.correlationFutures !== "undefined")) {
                        $scope.correlationList = angular.fromJson($window.sessionStorage.correlationFutures);
                    }
                    else {
                        $scope.correlationList = [];
                    }
                    break;
            }

        };

        /* sets the data in the table, and the results/found in the data to be showed in the view*/
        $scope.loadPage = function () {

            loadCorrelationList();
            //index and futures are not considering regions to filter, and makes some wrong situations, so clear in that case, maybe are set from other tabs
            if ($scope.filterOptions.filters.selectedRegion ==="INDEX" || $scope.filterOptions.filters.selectedRegion  ==="FUTURE" ) {
                $scope.filterOptions.filters.selectedRegion = "";
            }
            //in the case of being load index or futures, just clear the region
            if ($scope.filterOptions.filters.active_tab === 2 || $scope.filterOptions.filters.active_tab ===3 ) {
                $scope.filterOptions.filters.selectedRegion = "";
            }

            if ($scope.correlationList.length>0) {
                if ($scope.filterOptions.filters.active_tab ===0) {
                    $scope.filterOptions.filters.selectedRegion = $window.sessionStorage.correlationRegion;
                } else if ($scope.filterOptions.filters.active_tab ===1) {
                    $scope.filterOptions.filters.selectedRegion = $window.sessionStorage.correlationRegionPair;
                }
            }
            var data = CorrelationService.getPagedDataAsync($scope.pagingOptions.pageSize,
                $scope.pagingOptions.currentPage, $scope.filterOptions.filters, null, null, $scope.correlationList, function (data) {
                    $scope.loading = false;
                    $scope.myData = data.patterns;//data.page;

                    if ($scope.myData.length <=0){
                        $scope.appliedFilters = UserApplyFilters.userAppliedFilters($scope.filterOptions.filters);
                    }else{
                        $scope.appliedFilters = false;
                    }
                    //when the market is changed, we
                    $scope.refreshRegion();
                    $scope.correlationList = data.correlationPatterns;
                    updateCorrelationListSessionStorage(data.correlationPatterns);
                    if ($scope.correlationList.length > 0){
                            $scope.filterOptions.filters.selectedRegion = data.selectedRegion;
                    }
                    $scope.results = data.results;//data.results;
                    $scope.found = data.found;//data.found;
                    if (!$scope.$$phase) {
                        $scope.$apply();
                    }
                });
        };

        updateCorrelationListSessionStorage = function (correlationPatterns){
            switch ($scope.filterOptions.filters.active_tab) {
                case 0:
                    if (typeof $window.sessionStorage.correlationStocks === 'undefined'){
                        $window.sessionStorage.correlationStocks = [];
                        $scope.pagingOptions.currentPage = 1;
                    }
                    $window.sessionStorage.correlationStocks = JSON.stringify(correlationPatterns);
                    if (correlationPatterns.length === 0) {
                        delete $window.sessionStorage.correlationRegion;
                    }
                    break;
                case 1:
                    if (typeof $window.sessionStorage.correlationStockPairs === 'undefined'){
                        $window.sessionStorage.correlationStockPairs = [];
                        $scope.pagingOptions.currentPage = 1;
                    }
                    $window.sessionStorage.correlationStockPairs = JSON.stringify(correlationPatterns);
                    if (correlationPatterns.length === 0) {
                        delete $window.sessionStorage.correlationRegionPair;
                    }
                    break;
                case 2:
                    if ($scope.filterOptions.filters.index_type === "0"){
                        if (typeof $window.sessionStorage.correlationIndices === 'undefined'){
                            $window.sessionStorage.correlationIndices = [];
                            $scope.pagingOptions.currentPage = 1;
                        }
                        $window.sessionStorage.correlationIndices = JSON.stringify(correlationPatterns);
                    }else{
                        if (typeof $window.sessionStorage.correlationIndicePairs === 'undefined'){
                            $window.sessionStorage.correlationIndicePairs = [];
                            $scope.pagingOptions.currentPage = 1;
                        }
                        $window.sessionStorage.correlationIndicePairs = JSON.stringify(correlationPatterns);
                    }
                    break;
                case 3:
                    if (typeof $window.sessionStorage.correlationFutures === 'undefined'){
                        $window.sessionStorage.correlationFutures = [];
                        $scope.pagingOptions.currentPage = 1;
                    }
                    $window.sessionStorage.correlationFutures = JSON.stringify(correlationPatterns);
                    break;
            }
        };

        $scope.addToCorrelationList = function (pattern) {

            if ($scope.correlationList.length < 10 && !$scope.moving ) {
                /*if ($scope.correlationList.length === 0) {
                    $scope.pagingOptions.currentPage = 1;
                }*/
                $scope.startMoving();
                var data = CorrelationService.getPagedDataAsync($scope.pagingOptions.pageSize,
                    $scope.pagingOptions.currentPage, $scope.filterOptions.filters, pattern, 0, $scope.correlationList, function (data) {
                        $scope.endMoving();
                        $scope.myData = data.patterns;//data.page;
                        $scope.correlationList = data.correlationPatterns;
                        updateCorrelationListSessionStorage(data.correlationPatterns);
                        if ($scope.correlationList.length > 0){
                            $scope.filterOptions.filters.selectedRegion = data.selectedRegion;
                            var pag = $scope.pagingOptions.currentPage;
                            $scope.setRegion();
                            $scope.pagingOptions.currentPage = pag;
                            if ($scope.filterOptions.filters.active_tab === 0) {
                                //if is simple stock, we save the selectedRegion
                                $window.sessionStorage.correlationRegion = $scope.filterOptions.filters.selectedRegion;
                            } else if ($scope.filterOptions.filters.active_tab ===1) {
                                $window.sessionStorage.correlationRegionPair = $scope.filterOptions.filters.selectedRegion;
                            }
                        }
                        $scope.results = data.results;//data.results;
                        $scope.found = data.found;//data.found;
                        if (!$scope.$$phase) {
                            $scope.$apply();
                        }
                    });
            }
        };

        $scope.deleteFromCorrelationList = function (pattern) {
            if (!$scope.moving) {
                $scope.startMoving();
                var data = CorrelationService.getPagedDataAsync($scope.pagingOptions.pageSize,
                    $scope.pagingOptions.currentPage, $scope.filterOptions.filters, pattern, 1, $scope.correlationList, function (data) {
                        $scope.endMoving();
                        $scope.myData = data.patterns;//data.page;
                        $scope.correlationList = data.correlationPatterns;
                        updateCorrelationListSessionStorage(data.correlationPatterns);
                        $scope.results = data.results;//data.results;
                        $scope.found = data.found;//data.found;
                        if (!$scope.$$phase) {
                            $scope.$apply();
                        }
                    });
            }
        };

        $scope.toggleFavorite = function (patternId){
            var data = PatternsService.setFavorite(patternId).then(function (data) {
                $scope.loadPage();
            });
        };

        $scope.clearAllCorrelationLists = function () {
            $window.sessionStorage.removeItem("correlationStocks");
            $window.sessionStorage.removeItem("correlationStockPairs");
            $window.sessionStorage.removeItem("correlationIndices");
            $window.sessionStorage.removeItem("correlationIndicePairs");
            $window.sessionStorage.removeItem("correlationFutures");
        };


        $scope.clearCorrelationList = function () {
            $scope.correlationList = [];
            switch ($scope.filterOptions.filters.active_tab) {
                case 0:
                    $window.sessionStorage.removeItem("correlationStocks");
                    break;
                case 1:
                    $window.sessionStorage.removeItem("correlationStockPairs");
                    break;
                case 2:
                    if ($scope.filterOptions.filters.index_type === "0"){
                        $window.sessionStorage.removeItem("correlationIndices");
                    }else{
                        $window.sessionStorage.removeItem("correlationIndicePairs");
                    }
                    break;
                case 3:
                    $window.sessionStorage.removeItem("correlationFutures");
                    break;
            }
            $scope.correlationData = [];
            $scope.loadPage();
        };

        $scope.correlate = function () {

            if ($scope.correlationList.length > 0) {
                $scope.calculating = true;
                var data = CorrelationService.getCorrelationData($scope.correlationList, $scope.filterOptions.filters).then(function (data) {
                    $scope.calculating = false;
                 $scope.correlationData = data.correlationResults;
                 $scope.pairCorrelationData = data.pairCorrelationResults;
                 $scope.lastUpdateDateCorrelation = data.lastUpdateDateCorrelation;
                 $scope.correlationCaption1 = data.caption1;
                 $scope.correlationCaption2 = data.caption2;
                 });

            }
        };

        /**
         *      make a petition of selectors, the selectors is an array of the selectors required from server
         */
        $scope.refreshSelectors = function (selectors) {
            CorrelationService.getSelectors($scope.filterOptions.filters, selectors, function (data) {
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

        /**
         *  make a new search with the filters, restart the page and search, for the button Search in the page
         */
        $scope.search = function () {
            $scope.startLoading();
            $scope.applyFilters();
        };

        /*apply filters to search, restarting the page*/
        $scope.applyFilters = function () {
            //$scope.pagingOptions.currentPage = 1; //restart the page

            $scope.saveUrlParams();
            //$scope.loadPage();
        };

        $scope.pagingOptions = {
            pageSize: 15,
            currentPage: 1
        };

        /**
         * specific functions to refresh each selector,
         * This functions are defined to be used in onchange events, this way
         * we dont use watch (for dont overload the scope)
         * note: select Region/operation uses Search, because is like push the button Search..
         */

        $scope.refreshRegion = function () {
            //$scope.filterOptions.filters.selectedMarket = "";
            switch (TabsService.getActiveTab()) {
                case 0://stock have markets to refresh
                    $scope.refreshSelectors(['markets']);
                    break;
                case 1://pairs doesnt have markets
                    $scope.refreshSelectors(['markets']);
                    break;
                case 3: //futures ONLY have markets
                    $scope.refreshSelectors(['markets']);
                    break;
                default://others doesnt have selectors to refresh
                    break;
            }
        };
        $scope.selectRegion = function () {
            $scope.filterOptions.filters.selectedMarket = "";
            $scope.startLoading();
            $scope.pagingOptions.currentPage = 1;
            $scope.setRegion();
        };

        $scope.setRegion = function (){

            $scope.refreshRegion();
            $scope.applyFilters();
        };

        //refresh selectors depending of market
        $scope.refreshMarket = function () {
            if (TabsService.getActiveTab() === 0) {
                $scope.refreshSelectors();
            }
        };

        $scope.selectMarket = function () {
            $scope.startLoading();
            $scope.pagingOptions.currentPage = 1;
            //in stock is required refresh industries, sectors, in futures and
            //others tabs dont have this selectors
            $scope.refreshMarket();
            $scope.applyFilters();
        };

        //when we change index type (pairs_index, or index)
        $scope.selectIndexType = function () {
            $scope.startLoading();
            TabsService.changeActiveIndexType($scope.filterOptions.filters.index_type);
            $scope.applyFilters();
            loadCorrelationList();
            $scope.clearResults();
            $scope.loadPage();
        };


        /**
         * month controls
         * */


        $scope.nextMonth = function () {
            $scope.startLoading();
            $scope.filterOptions.filters.month = MonthSelectorService.addMonths(1, $scope.filterOptions.filters.month);
            $scope.restartFilter();
            $scope.saveUrlParams();

        };
        $scope.previousMonth = function () {
            $scope.startLoading();
            $scope.filterOptions.filters.month = MonthSelectorService.addMonths(-1, $scope.filterOptions.filters.month);
            $scope.restartFilter();
            $scope.saveUrlParams();
        };
        //this function update the Month object in the filter from the value
        $scope.goToMonth = function () {
            $scope.startLoading();
            var date = $scope.filterOptions.filters.selectMonth.value.split("_");
            var d = new Date(date[1], date[0] - 1, 1);
            $scope.filterOptions.filters.month = MonthSelectorService.setDate(d);
            $scope.restartFilter();
            $scope.saveUrlParams();
        };
        //synchronize the selector with the month of the filter
        $scope.updateSelectorMonth = function () {
            for (i = 0; i < $scope.filterOptions.months.length; i++) {
                if ($scope.filterOptions.months[i].value === $scope.filterOptions.filters.month.value) {
                    $scope.filterOptions.filters.selectMonth = $scope.filterOptions.months[i];
                }
            }
        };

        $scope.canMove = function (direction) {
            if (direction > 0) {
                return (($scope.filterOptions.months[11].value !== $scope.filterOptions.filters.month.value));
            }
            else {
                return (($scope.filterOptions.months[0].value !== $scope.filterOptions.filters.month.value));
            }
        };

        ///urlParams control
        $scope.saveUrlParams = function () {
            var urlParams = $scope.filterOptions.filters;
            urlParams.page = $scope.pagingOptions.currentPage;
            //we ask each param to include in the url or not
            var urlParamsSend = {};
            if (urlParams.filterName) {
                urlParamsSend.qname = urlParams.filterName;
            }

            if (urlParams.selectedRegion) {
                urlParamsSend.qregion = urlParams.selectedRegion;
            }

            if (urlParams.selectedMarket) {
                urlParamsSend.qmarket = urlParams.selectedMarket;
            }

            if (urlParams.selectedOperation) {
                urlParamsSend.qop = urlParams.selectedOperation.id;
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
            urlParamsSend.pag = urlParams.page;
            urlParamsSend.month = (urlParams.month.month + "_" + urlParams.month.year);

            $location.path('/correlation').search(urlParamsSend);
        };


        //check if a date in format 'MM_YYYY' exists in the months selector
        $scope.isCorrectDate= function(date){

            for (i=0; i< $scope.filterOptions.months.length;i++) {
                if ($scope.filterOptions.months[i].value === date) {
                    return true;
                }
            }
            return false;
        };

        $scope.loadUrlParams = function () {
            var params = $location.search();

            var filters = {
                filterName: (params.qname ? params.qname : "" ),
                index_type: (params.qindex ? params.qindex : TabsService.getActiveIndexType() ),
                tab_type: (params.qtab ? params.qtab : "" ),
                active_tab: (params.qacttab ? parseInt(params.qacttab, 10) : TabsService.getActiveTab() ),
                favourite: (params.qfav ? params.qfav : "" ),
                selectedRegion: (typeof params.qregion !== "undefined" ? params.qregion : "" ),
                selectedMarket: (typeof params.qmarket !== "undefined" ? params.qmarket : "" )
            };
            //special case for index
            if ((filters.active_tab === 2)) {//case of index
                //only for index, not pair index
                if ((filters.index_type ===0) || (filters.index_type ==="0"))  {
                    filters.selectedOperation= (typeof params.qop !== "undefined" ?  $scope.filterOptions.selectors.operationsIndex[parseInt(params.qop,10)] : "" );
                } else {
                    filters.selectedOperation="";
                }

            } else {
                filters.selectedOperation= (typeof params.qop !== "undefined" ?  $scope.filterOptions.selectors.operations[parseInt(params.qop,10)] : "" );
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
                    d = new Date(actual_date.getFullYear(),actual_date.getMonth(),1);
                }
                filters.month = MonthSelectorService.setDate(d);


            } else {
                //if the date is not passed as param, we load the default date
                var date_restart = new Date();
                filters.month = MonthSelectorService.restartDate();
            }

            $scope.filterOptions.filters = filters;
            $scope.updateSelectorMonth();
            $scope.pagingOptions.currentPage = (params.pag ? params.pag : 1);
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

        $scope.generatePdf = function () {
            var data = CorrelationService.getCorrelationPdf($scope.correlationList, $scope.filterOptions.filters).then(function (data) {
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
                var filename = "correlation-" + productType + ".pdf";
                var element = angular.element('<a/>');
                element.attr({

                    href: 'data:attachment/pdf;base64,' + encodeURI(data),
                    target: '_blank',
                    download: filename
                });
                document.body.appendChild(element[0]);

                $timeout(function() {
                    element[0].click();
                });
            });
        };

        $scope.generateCorrelationExcel = function () {
            var data = CorrelationService.getCorrelationExcel($scope.correlationList, $scope.filterOptions.filters).then(function (data) {
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
                var filename = "correlation-" + productType + ".xls";
                var element = angular.element('<a/>');
                element.attr({
                    href: 'data:attachment/vnd.ms-excel;base64,' + encodeURI(data),
                    target: '_blank',
                    download: filename
                });
                document.body.appendChild(element[0]);

                //var elem = document.getElementById("download_file");
                $timeout(function() {
                    element[0].click();
                });
            });
        };

        $scope.$on('$locationChangeSuccess', function (event, $stateParams) {
            $scope.loadUrlParams();
            $scope.loadPage();
        });
        /*First load on page ready*/
        $scope.restartFilter();
        if ($location.search()) {
            //if the paramsUrl are  passed, we load the page with the filters
            $scope.loadUrlParams();
        }

        loadCorrelationList();
        $scope.loadPage();

    })
    .service("CorrelationService", function ($http, $window, $rootScope, $q) {

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
        this.getPagedDataAsync = function (pageSize, page, filtering, patternId, operation, correlationList, callbackFunc) {
            var data;
            var urlParam = this.createParamsFromFilter(filtering);

            var correlationIdsList = [];
            if (correlationList.length > 0) {
                for (var i = 0; i < correlationList.length; i++) {
                    correlationIdsList.push(correlationList[i].id);

                }
            }

            var indexType = null;

            if (typeof filtering.index_type !== "undefined") {
                indexType = parseInt(filtering.index_type, 10);
            } else {
                indexType = 0;
            }

            //Operation -> Add or delete Pattern to correlationList

            config = {
                params: {
                    'patternId': patternId,
                    'add_delete': operation,
                    'page': page,
                    'token': $window.localStorage.token,
                    'productType': parseInt(filtering.active_tab, 10),
                    'indexType': indexType,
                    'correlationList': correlationIdsList,
                    'month': filtering.month.month,
                    'year': filtering.month.year,
                    'name': filtering.filterName,
                    'region': filtering.selectedRegion,
                    'market': filtering.selectedMarket,
                    'operation': (filtering.selectedOperation  ? filtering.selectedOperation.id : ""),
                    'favourites': filtering.favourite
                }
            };

            var result = $http.get($rootScope.urlService+'/correlationpatterns', config).success(function (data) {
                // With the data succesfully returned, call our callback
                callbackFunc(data);
            }).
                error(function(data) {
                    callbackFunc(data);
                });
        };

        this.getCorrelationData = function (correlationList, filtering) {
            var deferred = $q.defer();

            var correlationIdsList = [];
            if (correlationList.length > 0) {
                for (var i = 0; i < correlationList.length; i++) {
                    correlationIdsList.push(correlationList[i].id);

                }
            }

            var indexType = null;

            if (typeof filtering.index_type !== "undefined") {
                indexType = parseInt(filtering.index_type, 10);
            } else {
                indexType = 0;
            }

            config = {
                params: {
                    'correlationList': correlationIdsList,
                    'token': $window.localStorage.token,
                    'productType': parseInt(filtering.active_tab, 10),
                    'indexType': indexType
                }
            };

            var result = $http.get($rootScope.urlService+'/correlationresult', config).then(function (response) {
                // With the data succesfully returned, call our callback
                deferred.resolve();
                return response.data;
            });
            return result;
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
                    'token': $window.localStorage.token,
                    'productType': parseInt(filtering.active_tab, 10),
                    'indexType': indexType,
                    'month': filtering.month.month,
                    'year': filtering.month.year,
                    'view': location.hash.replace("#/","").substring(0, (location.hash.indexOf("?")-2))
                }
            };

            var result = $http.get($rootScope.urlService+'/patternfilters', config).success(function (data) {
                // With the data succesfully returned, call our callback
                callback(data);
            });

        };

        this.getCorrelationPdf = function (correlationList, filtering) {
            var deferred = $q.defer();

            var correlationIdsList = [];
            if (correlationList.length > 0) {
                for (var i = 0; i < correlationList.length; i++) {
                    correlationIdsList.push(correlationList[i].id);

                }
            }

            var indexType = null;

            if (typeof filtering.index_type !== "undefined") {
                indexType = parseInt(filtering.index_type, 10);
            } else {
                indexType = 0;
            }

            config = {
                params: {
                    'correlationList': correlationIdsList,
                    'token': $window.localStorage.token,
                    'productType': parseInt(filtering.active_tab, 10),
                    'indexType': indexType
                }
            };

            var result = $http.get($rootScope.urlService+'/correlationpdf', config).then(function (response) {
                // With the data succesfully returned, call our callback
                deferred.resolve();
                return response.data;
            });
            return result;
        };

        this.getCorrelationExcel = function (correlationList, filtering) {
            var deferred = $q.defer();

            var correlationIdsList = [];
            if (correlationList.length > 0) {
                for (var i = 0; i < correlationList.length; i++) {
                    correlationIdsList.push(correlationList[i].id);

                }
            }

            var indexType = null;

            if (typeof filtering.index_type !== "undefined") {
                indexType = parseInt(filtering.index_type, 10);
            } else {
                indexType = 0;
            }

            config = {
                params: {
                    'correlationList': correlationIdsList,
                    'token': $window.localStorage.token,
                    'productType': parseInt(filtering.active_tab, 10),
                    'indexType': indexType
                }
            };

            var result = $http.get($rootScope.urlService+'/correlationexcel', config).then(function (response) {
                // With the data succesfully returned, call our callback
                deferred.resolve();
                return response.data;
            });
            return result;
        };
    })
;