/**
 * Created by laura on 6/06/14.
 */
angular.module('ngMo.lookup_diary', [
    'ui.router'
])

    .config(function config($stateProvider) {
        $stateProvider.state('lookup-diary', {
            url: '/lookup-diary',
            views: {
                "main": {
                    controller: 'LookupDiaryCtrl',
                    templateUrl: 'lookup_diary/lookup_diary.tpl.html'
                }
            },
            data: {
                pageTitle: 'Seguimiento Diario',
                selectMenu: 'lookup-diary-nav',
                selectSubmenu: '',
                selectItemSubmenu: '',
                moMenuType: 'privateMenu'
            },
            reloadOnSearch: false,//with this option, the controller will not reload the page when it change
            //the params on url
            resolve: {
                MonthSelectorService: "MonthSelectorService",
                PatternsService: "PatternsService",
                TabsService: "TabsService",
                filtering : function(TabsService,MonthSelectorService,$location){

                    var params = $location.search();
                    //just to select a item like a selector for load params
                    var selectors = [{
                        id: 0,
                        "description": "something"
                    },{
                        id: 1,
                        "description": "something"}];
                    //keep separatly in case of change
                    var operations =  [{
                        id: 0,
                        "description": "something"
                    },{
                        id: 1,
                        "description": "something"}];

                    return {
                        active_tab: (typeof params.qacttab !== "undefined" ? parseInt(params.qacttab, 10) : TabsService.getActiveTab() ),
                        month: MonthSelectorService.restartDate(),
                        durationInput: (typeof params.qdur !== "undefined" ? params.qdur : "" ),
                        favourite: (typeof params.qfav !== "undefined" ? params.qfav : "" ),
                        filterName: (typeof params.qname !== "undefined" ? params.qname : "" ),
                        index_type: (typeof params.qindex !== "undefined" ? params.qindex : TabsService.getActiveIndexType() ),
                        rentAverageInput: (typeof params.qaver !== "undefined" ? params.qaver : "" ),
                        rentDiaryInput: (typeof params.qdiar !== "undefined" ? params.qdiar : "" ),
                        rentInput: (typeof params.qrent !== "undefined" ? params.qrent : "" ),
                        selectedAverage: (typeof params.qselaver !== "undefined" ? selectors[parseInt(params.qselaver,10)] : "" ),
                        selectedDuration: (typeof params.qseldur !== "undefined" ? selectors[parseInt(params.qseldur,10)] : "" ),
                        selectedIndustry: (typeof params.qindust !== "undefined" ? params.qindust : "" ),
                        selectedMarket: (typeof params.qmarket !== "undefined" ? params.qmarket : "" ),
                        selectedOperation: (typeof params.qop !== "undefined" ? operations[parseInt(params.qop,10)] : "" ),
                        selectedRegion: (typeof params.qregion !== "undefined" ? params.qregion : "" ),
                        selectedRent:  (typeof params.qselrent !== "undefined" ? selectors[parseInt(params.qselrent,10)] : "" ),
                        selectedRentDiary:  (typeof params.qseldiar !== "undefined" ? selectors[parseInt(params.qseldiar,10)] : "" ),
                        selectedSector: (typeof params.qsector !== "undefined" ? $scope.qsector : ""),
                        selectedVolatility: (typeof params.qselvol !== "undefined" ? selectors[parseInt(params.qselvol ,10)] : "" ),
                        tab_type: (typeof params.qtab !== "undefined" ? params.qtab : "" ),
                        volatilityInput: (typeof params.qvol !== "undefined" ? params.qvol : "" )
                    };
                },
                diaryData: function(LookupDiaryService, filtering) {
                    return LookupDiaryService.getPagedDataAsync(1, filtering).then(function (data){
                        return {
                            patterns: data.patterns,
                            results: data.results,
                            found: data.found
                        };

                    });
                }
            }
        });
    })

    .run(function run() {
    })

    .controller('LookupDiaryCtrl', function ($scope, IsLogged, TabsService, ActualDateService, MonthSelectorService,
                                             LookupDiaryService, $http, $state, $stateParams, $location,
                                             $modal,diaryData,SelectedMonthService,PatternsService) {
        $scope.$on('$stateChangeStart', function (event, toState) {
            IsLogged.isLogged();
        });
        $scope.$on('$stateChangeSuccess', function (event, toState, toParams, fromState, fromParams) {
            if (angular.isDefined(toState.data.pageTitle)) {
                $scope.pageTitle = toState.data.pageTitle + ' | Market Observatory';
            }
        });
        //tabs and variables
        //pattern number for rents
        $scope.rentPattern = /^\d+(\.\d{0,2})?$/;
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
            pageSize: 10,
            currentPage: 1
        };

        /** templates of filters/tables for each tab**/
        var templateTables = [
            {"table": 'lookup_diary/tables/stocks_table.tpl.html',
                "filter": 'lookup_diary/filters/stocks_filters.tpl.html'},

            {"table": 'lookup_diary/tables/pairs_table.tpl.html',
                "filter": 'lookup_diary/filters/pairs_filters.tpl.html'},

            [
                {"table": 'lookup_diary/tables/index_table.tpl.html',
                    "filter": 'lookup_diary/filters/index_filters.tpl.html'},
                {"table": 'lookup_diary/tables/pairs_index_table.tpl.html',
                    "filter": 'lookup_diary/filters/index_filters.tpl.html'}
            ],

            {"table": 'lookup_diary/tables/futures_table.tpl.html',
                "filter": 'lookup_diary/filters/futures_filters.tpl.html'}
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
                    index_type: TabsService.getActiveIndexType(),
                    tab_type: $scope.tabs[TabsService.getActiveTab()].title,
                    active_tab: TabsService.getActiveTab(),
                    //if month is set, we keep the value
                    month: SelectedMonthService.getSelectedMonth(),
                    favourite: false,
                    alarm: false
                },
                selectors: {
                    regions: [

                    ],

                    markets: [
                    ],

                    sectors: [
                    ],

                    industries: [
                    ],

                    operations: [
                        {"id": 0, "description": "Comprar"},
                        {"id": 1, "description": "Vender"}
                    ],
                    comparators: [
                        {"id": 0, "description": "Menor que"},
                        {"id": 1, "description": "Mayor que"}
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
                    $scope.refreshSelectors(['regions', 'markets', 'industries', 'sectors'],$scope.filterOptions.filters, $scope.callBackRefreshSelectors);
                    break;
                case 1:     //pairs
                    $scope.refreshSelectors(['regions', 'industries', 'sectors'],$scope.filterOptions.filters, $scope.callBackRefreshSelectors);
                    break;
                case 2:     //index (pair and index)
                    break;
                case 3:     //futures
                    $scope.refreshSelectors(['markets'],$scope.filterOptions.filters, $scope.callBackRefreshSelectors);
                    break;
            }

        };

       /*$scope.setAlert = function (patternId) {
            var data = LookupDiaryService.setAlert(patternId).then(function (data) {
                $scope.loadPage();
            });
        };*/

        $scope.open = function (patternId, assetName, bearishAssetName, patternType, actualPrice, actualCondition) {

            var modalInstance = $modal.open({
                templateUrl: 'myModalContent.html',
                controller: ModalAlertInstanceCtrl,
                resolve: {
                    patternId: function () {
                        return patternId;
                    },
                    setAlert: function () {
                        return function(patternId, price, condition) {
                            var data = LookupDiaryService.setAlert(patternId, price, condition).then(function (data) {
                                $scope.loadPage();
                            });
                        };
                    },
                    deleteAlert: function () {
                        return function(patternId) {
                            var data = LookupDiaryService.deleteAlert(patternId).then(function (data) {
                                $scope.loadPage();
                            });
                        };
                    },
                    assetName: function () {
                        return assetName;
                    },
                    bearishAssetName: function () {
                        return bearishAssetName;
                    },
                    patternType: function () {
                        return patternType;
                    },
                    actualPrice: function () {
                        return actualPrice;
                    },
                    actualCondition: function () {
                        if (actualCondition == 'GREATER_THAN'){
                            return 0;
                        }else if (actualCondition == 'LESS_THAN'){
                            return 1;
                        }

                    }
                }
            });

            modalInstance.result.then(function () {
            });
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
            $scope.changeTab(TabsService.getActiveTab());//is like change to the same tab
        };

        /* sets the data in the table, and the results/found in the data to be showed in the view*/
        $scope.loadPage = function () {
            var data = LookupDiaryService.getPagedDataAsync($scope.pagingOptions.currentPage, $scope.filterOptions.filters).then(function (data) {
                    $scope.myData = data.patterns;//data.page;
                    $scope.results = data.results;//data.results;
                    $scope.found = data.found;//data.found;
                    if (!$scope.$$phase) {
                        $scope.$apply();
                    }
                });
        };


        /**
         *      make a petition of selectors, the selectors is an array of the selectors required from server
         */

        $scope.refreshSelectors = function (selectors,filters,callback) {
            viewName = $state.$current.self.name;
            LookupDiaryServicegit commit .getSelectors(filters, selectors,callback,viewName);
        };

        $scope.callBackRefreshSelectors =  function (data) {
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
            if (data.hasOwnProperty("industries")) {
                $scope.filterOptions.selectors.industries = data.industries;
                //$scope.filterOptions.filters.selectedIndustry = "";
            }
            if (data.hasOwnProperty("sectors")) {
                $scope.filterOptions.selectors.sectors = data.sectors;
                //$scope.filterOptions.filters.selectedSector = "";
            }
        };

        /**
         *  make a new search with the filters, restart the page and search, for the button Search in the page
         */
        $scope.search = function () {
            $scope.applyFilters();
        };

        /*apply filters to search, restarting the page*/
        $scope.applyFilters = function () {
            $scope.pagingOptions.currentPage = 1; //restart the page
            $scope.checkFilters();//check if selectors and inputs are right
            $scope.saveUrlParams();
            //$scope.loadPage();
        };

        /*check that all rent filters have  values and a selector*/
        $scope.checkFilters = function () {
            //for each input filter filled, the selector linked must be set
            if (!($scope.filterOptions.filters.selectedAverage &&
                $scope.filterOptions.filters.rentAverageInput)) {
                $scope.filterOptions.filters.selectedAverage = "";
                $scope.filterOptions.filters.rentAverageInput = "";
            }
            if (!($scope.filterOptions.filters.rentInput &&
                $scope.filterOptions.filters.selectedRent)) {
                $scope.filterOptions.filters.rentInput = "";
                $scope.filterOptions.filters.selectedRent = "";
            }
            if (!($scope.filterOptions.filters.rentDiaryInput &&
                $scope.filterOptions.filters.selectedRentDiary)) {
                $scope.filterOptions.filters.rentDiaryInput = "";
                $scope.filterOptions.filters.selectedRentDiary = "";
            }
            if (!($scope.filterOptions.filters.volatilityInput &&
                $scope.filterOptions.filters.selectedVolatility)) {
                $scope.filterOptions.filters.volatilityInput = "";
                $scope.filterOptions.filters.selectedVolatility = "";
            }
            if (!($scope.filterOptions.filters.durationInput &&
                $scope.filterOptions.filters.selectedDuration)) {
                $scope.filterOptions.filters.durationInput = "";
                $scope.filterOptions.filters.selectedDuration = "";
            }
        };
        /**
         * specific functions to refresh each selector,
         * This functions are defined to be used in onchange events, this way
         * we dont use watch (for dont overload the scope)
         * note: select Region/operation uses Search, because is like push the button Search..
         */

        $scope.refreshRegion = function () {
            if ($scope.filterOptions.filters.selectedRegion === ""){
                $scope.filterOptions.filters.selectedMarket = "";
            }
            switch (TabsService.getActiveTab()) {
                case 0://stock have markets to refresh
                    $scope.refreshSelectors(['markets', 'industries', 'sectors'],$scope.filterOptions.filters, $scope.callBackRefreshSelectors);
                    break;
                case 1://pairs doesnt have markets
                    $scope.refreshSelectors(['markets', 'industries', 'sectors'],$scope.filterOptions.filters, $scope.callBackRefreshSelectors);
                    break;
                case 3: //futures ONLY have markets
                    $scope.refreshSelectors(['markets'],$scope.filterOptions.filters, $scope.callBackRefreshSelectors);
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
                $scope.refreshSelectors(['industries', 'sectors'],$scope.filterOptions.filters, $scope.callBackRefreshSelectors);
            }
        };
        $scope.selectMarket = function () {
            //in stock is required refresh industries, sectors, in futures and
            //others tabs dont have this selectors
            $scope.refreshMarket();
            $scope.applyFilters();
        };

        //only used in stock
        $scope.refreshSector = function () {
            $scope.refreshSelectors(['industries'],$scope.filterOptions.filters, $scope.callBackRefreshSelectors);
        };
        $scope.selectSector = function () {
            $scope.refreshSector();
            $scope.applyFilters();
        };

        //when we change index type (pairs_index, or index)
        $scope.selectIndexType = function () {
            TabsService.changeActiveIndexType($scope.filterOptions.filters.index_type);
            $scope.applyFilters();
        };


        /**
         * month controls
         * */


        $scope.nextMonth = function () {
            $scope.filterOptions.filters.month = MonthSelectorService.addMonths(1, $scope.filterOptions.filters.month);
            SelectedMonthService.changeSelectedMonth($scope.filterOptions.filters.month);
            $scope.restartFilter();
            $scope.saveUrlParams();

        };
        $scope.previousMonth = function () {
            $scope.filterOptions.filters.month = MonthSelectorService.addMonths(-1, $scope.filterOptions.filters.month);
            SelectedMonthService.changeSelectedMonth($scope.filterOptions.filters.month);
            $scope.restartFilter();
            $scope.saveUrlParams();
        };
        //this function update the Month object in the filter from the value
        $scope.goToMonth = function () {
            var date = $scope.filterOptions.filters.selectMonth.value.split("_");
            var d = new Date(date[1], date[0] - 1, 1);
            $scope.filterOptions.filters.month = MonthSelectorService.setDate(d);
            SelectedMonthService.changeSelectedMonth($scope.filterOptions.filters.month);
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

            if (urlParams.selectedSector) {
                urlParamsSend.qsector = urlParams.selectedSector;
            }

            if (urlParams.selectedIndustry) {
                urlParamsSend.qindust = urlParams.selectedIndustry;
            }
            if (urlParams.selectedOperation) {
                urlParamsSend.qop = urlParams.selectedOperation.id;
            }
            if (urlParams.selectedRent) {
                urlParamsSend.qselrent = urlParams.selectedRent.id;
            }
            if (urlParams.rentInput) {
                urlParamsSend.qrent = urlParams.rentInput;
            }
            if (urlParams.selectedAverage) {
                urlParamsSend.qselaver = urlParams.selectedAverage.id;
            }
            if (urlParams.rentAverageInput) {
                urlParamsSend.qaver = urlParams.rentAverageInput;
            }
            if (urlParams.selectedRentDiary) {
                urlParamsSend.qseldiar = urlParams.selectedRentDiary.id;
            }
            if (urlParams.rentDiaryInput) {
                urlParamsSend.qdiar = urlParams.rentDiaryInput;
            }
            if (urlParams.selectedVolatility) {
                urlParamsSend.qselvol = urlParams.selectedVolatility.id;
            }
            if (urlParams.volatilityInput) {
                urlParamsSend.qvol = urlParams.volatilityInput;
            }
            if (urlParams.selectedDuration) {
                urlParamsSend.qseldur = urlParams.selectedDuration.id;
            }
            if (urlParams.durationInput) {
                urlParamsSend.qdur = urlParams.durationInput;
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

            $location.path('/lookup-diary').search(urlParamsSend);
        };
        $scope.loadUrlParams = function () {
            var params = $location.search();

            var filters = {
                filterName: (typeof params.qname !== "undefined" ? params.qname : "" ),
                selectedOperation: (typeof params.qop !== "undefined" ?  $scope.filterOptions.selectors.operations[parseInt(params.qop,10)] : "" ),
                selectedRent: (typeof params.qselrent !== "undefined" ? $scope.filterOptions.selectors.comparators[parseInt(params.qselrent,10)] : "" ),
                rentInput: (typeof params.qrent !== "undefined" ? params.qrent : "" ),
                selectedAverage: (typeof params.qselaver !== "undefined" ? $scope.filterOptions.selectors.comparators[parseInt(params.qselaver,10)] : "" ),
                rentAverageInput: (typeof params.qaver !== "undefined" ? params.qaver : "" ),
                selectedRentDiary: (typeof params.qseldiar !== "undefined" ? $scope.filterOptions.selectors.comparators[parseInt(params.qseldiar,10)] : "" ),
                rentDiaryInput: (typeof params.qdiar !== "undefined" ? params.qdiar : "" ),
                selectedVolatility: (typeof params.qselvol !== "undefined" ? $scope.filterOptions.selectors.comparators[parseInt(params.qselvol ,10)] : "" ),
                volatilityInput: (typeof params.qvol !== "undefined" ? params.qvol : "" ),
                selectedDuration: (typeof params.qseldur !== "undefined" ? $scope.filterOptions.selectors.comparators[parseInt(params.qseldur,10)] : "" ),
                durationInput: (typeof params.qdur !== "undefined" ? params.qdur : "" ),
                index_type: (typeof params.qindex !== "undefined" ? params.qindex : TabsService.getActiveIndexType() ),
                tab_type: (typeof params.qtab !== "undefined" ? params.qtab : "" ),
                active_tab: (typeof params.qacttab !== "undefined" ? parseInt(params.qacttab, 10) : TabsService.getActiveTab() ),
                favourite: (typeof params.qfav !== "undefined" ? params.qfav : "" ),
                selectedRegion: (typeof params.qregion !== "undefined" ? params.qregion : "" ),
                selectedMarket: (typeof params.qmarket !== "undefined" ? params.qmarket : "" ),
                selectedSector: (typeof params.qsector !== "undefined" ? params.qsector : ""),
                selectedIndustry: (typeof params.qindust !== "undefined" ? params.qindust : "")

            };
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
                var d = new Date(date[1], date[0] - 1, 1);
                filters.month = MonthSelectorService.setDate(d);


            } else {
                //if the date is not passed as param, we load the default date
                var date_restart = new Date();
                date_restart.setDate(1);
                date_restart.setMonth(SelectedMonthService.getSelectedMonth().month-1);
                filters.month = MonthSelectorService.setDate(date_restart);

            }

            //if the tab changed, all the selectors must be reloaded (the markets could be diferents in pari and stocks for example)
            $scope.filterOptions.filters = filters;
            $scope.updateSelectorMonth();
            $scope.pagingOptions.currentPage = (params.pag ? params.pag : 1);
            //if the tab changed, all the selectors must be reloaded (the markets could be diferents in pari and stocks for example)
            if (tabChanged) {
                switch (TabsService.getActiveTab()) {
                    case 0:     //stocks
                        $scope.refreshSelectors(['regions', 'markets', 'industries', 'sectors'],filters, $scope.callBackRefreshSelectors);
                        break;
                    case 1:     //pairs
                        $scope.refreshSelectors(['regions', 'industries', 'sectors'],filters, $scope.callBackRefreshSelectors);
                        break;
                    case 2:     //index (pair and index)
                        break;
                    case 3:     //futures
                        $scope.refreshSelectors(['markets'],filters, $scope.callBackRefreshSelectors);
                        break;
                }
            }
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
            $scope.loadPage();
        }

        //$scope.loadPage();
        $scope.myData = diaryData.patterns;
        $scope.results = diaryData.results;
        $scope.found = diaryData.found;
    })
    .service("LookupDiaryService", function ($http, $window, $rootScope, $q) {

        /*make the string with the params for all the properties of the filter*/
        this.createParamsFromFilter = function (filtering) {
            var urlParams = "";
            for (var property in filtering) {
                if (filtering.hasOwnProperty(property)) { //check if its a property (to exclude technicals property of js)
                    // create the params
                    if ((filtering[property] != null) && (filtering[property] !== "")) {
                        if (typeof filtering[property].id !== "undefined" ) {
                            urlParams += "&" + property + "=" + filtering[property].id;
                        } else {
                            urlParams += "&" + property + "=" + filtering[property];
                        }
                    }
                }
            }
            return urlParams;
        };

        /*Function to load info from server, receives the pageSize, number of page, and the filter object (that have all the filters inside)*/
        this.getPagedDataAsync = function (page, filtering) {
            var deferred = $q.defer();
            var data;
            var urlParam = this.createParamsFromFilter(filtering);

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
                    'month': filtering.month.month,
                    'year': filtering.month.year,
                    'name': filtering.filterName,
                    'region': filtering.selectedRegion,
                    'market': filtering.selectedMarket,
                    'sector': filtering.selectedSector,
                    'industry': filtering.selectedIndustry,
                    'operation': (filtering.selectedOperation  ? filtering.selectedOperation.id : ""),
                    'accumulatedReturn': (filtering.selectedRent  ? filtering.selectedRent.id : ""),
                    'accumulatedInput': filtering.rentInput,
                    'averageReturn': (filtering.selectedAverage  ? filtering.selectedAverage.id : ""),
                    'averageInput': filtering.rentAverageInput,
                    'dailyReturn': (filtering.selectedRentDiary  ? filtering.selectedRentDiary.id : ""),
                    'dailyInput': filtering.rentDiaryInput,
                    'volatility':  (filtering.selectedVolatility  ? filtering.selectedVolatility.id : ""),
                    'volatilityInput': filtering.volatilityInput,
                    'duration':  (filtering.selectedDuration  ? filtering.selectedDuration.id : ""),
                    'durationInput': filtering.durationInput,
                    'favourites': filtering.favourite
                }
            };

            var result = $http.get($rootScope.urlService+'/lookupdiarypatterns', config).then(function (response) {
                // With the data succesfully returned, call our callback
                deferred.resolve();
                return response.data;
            });
            return result;
        };

        this.setAlert = function (patternId, price, condition) {
            var deferred = $q.defer();
            var data;
            config = {
                params: {
                    'patternId': patternId,
                    'token': $window.sessionStorage.token,
                    'price': price,
                    'condition': condition
                }
            };
            var result = $http.get($rootScope.urlService+'/alertpattern', config).then(function (response) {
                // With the data succesfully returned, call our callback
                deferred.resolve();
                return response.data;
            });
            return result;
        };

        this.deleteAlert = function (patternId) {
            var deferred = $q.defer();
            var data;
            config = {
                params: {
                    'patternId': patternId,
                    'token': $window.sessionStorage.token
                }
            };
            var result = $http.get($rootScope.urlService+'/deletealert', config).then(function (response) {
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
        this.getSelectors = function (filtering, selectorsToRefresh, callback, viewName) {
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
                    'view': viewName
                }
            };

            var result = $http.get($rootScope.urlService+'/patternfilters', config).success(function (data) {
                // With the data succesfully returned, call our callback
                callback(data);
            });
        };
    })

;

var ModalAlertInstanceCtrl = function ($scope, $modalInstance, patternId, setAlert, assetName, bearishAssetName, deleteAlert, patternType, actualPrice, actualCondition) {
    $scope.setAlert = setAlert;
    $scope.deleteAlert = deleteAlert;
    $scope.patternId = patternId;
    $scope.assetName = assetName;
    $scope.bearishAssetName = bearishAssetName;
    $scope.patternType = patternType;

    $scope.data = {
        price: (typeof actualPrice !== 'undefined' ? actualPrice : 0),
        price_condition: (typeof actualCondition !== 'undefined' ? actualCondition : 0)
    };

    $scope.ok = function () {
        $scope.setAlert($scope.patternId, $scope.data.price, $scope.data.price_condition);
        $modalInstance.close();
    };

    $scope.close = function () {
        $modalInstance.dismiss('cancel');
    };

    $scope.cancel = function () {
        $scope.deleteAlert($scope.patternId);
        $modalInstance.dismiss('cancel');
    };
};