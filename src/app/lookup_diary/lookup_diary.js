/**
 * Created by laura on 6/06/14.
 */

//TODO: rename this module to daily_lookup
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
            reloadOnSearch: false,
            resolve: {
                IsLogged: "IsLogged",
                logged: function(IsLogged) {
                    IsLogged.isLogged();
                },
                now:function ($http, $rootScope) {
                    return $http({method: 'GET', url: $rootScope.urlService + '/actualdate'}).then(function(result) {
                        return new Date(result.data.actualDate);
                    });
                }
            }
        });
    })

    .run(function run() {
    })

    .controller('LookupDiaryCtrl', function ($q,$filter,$scope, IsLogged, TabsService, ActualDateService, MonthSelectorDiaryService,$timeout,
                                             LookupDiaryService, $http, $state, $stateParams, $location,
                                             $modal,SelectedMonthDiaryService,PatternsService, ExpirationYearFromPatternName,UserApplyFilters, $rootScope, $translatePartialLoader,now) {
        $scope.$on('$stateChangeStart', function (event, toState) {
            IsLogged.isLogged(true);
        });
        MonthSelectorDiaryService.setDefaultDate(now);
        SelectedMonthDiaryService.setSelectedMonth(now);
        $scope.tabs = TabsService.getTabs();
        $scope.$on('$stateChangeSuccess', function (event, toState, toParams, fromState, fromParams) {
            IsLogged.isLogged(true);
            if (angular.isDefined(toState.data.pageTitle)) {
                $scope.pageTitle = toState.data.pageTitle + ' | Market Observatory';
            }
        });
        $scope.waitForFilters = false;//say if is necessary wait for the selectors to load the patterns (only true when change month and a region is selected)
        $scope.changingMonth = false;//says if the user is changing month
        //
        $translatePartialLoader.addPart("followup");

        //event for keypress in input search name, launch the filters if press enter
        $scope.submitName = function(keyEvent) {
            if (keyEvent.which === 13) {
                $scope.search();
            }

        };

        $scope.filterStructure = function(restartRegion) {
            selectedRegion = "";
            if ($scope.filterOptions) {
                if (typeof $scope.filterOptions.filters !== "undefined") {
                    if (typeof $scope.filterOptions.filters.selectedRegion !== "undefined") {
                        selectedRegion = $scope.filterOptions.filters.selectedRegion;
                    }
                }
            }
            $scope.filterOptions = {
                filters: {
                    filterName: "",
                    selectedRegion: (restartRegion ? "" : selectedRegion),
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
                    month: SelectedMonthDiaryService.getSelectedMonth(),
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
                        {"id": 0, "description": "FOLLOW.buy"},
                        {"id": 1, "description": "FOLLOW.sell"}
                    ],
                    operationsIndex: [
                        {"id": 0, "description": "FOLLOW.bullish"},
                        {"id": 1, "description": "FOLLOW.bearish"}
                    ],
                    comparators: [
                        {"id": 1, "description": "FOLLOW.gt"},
                        {"id": 0, "description": "FOLLOW.lt"}
                    ],

                    comparatorsConversor: [1,0]//the comparatos in pos[0] means 1 and viceversa (posterior changes..) so use this conversor for pos/value


                }
            };
            if (!$scope.filterOptions.months) {
                $scope.filterOptions.months = MonthSelectorDiaryService.getListMonths(true);
            }
        };

        $scope.filterStructure(false);
        $scope.loading = true;//loading patterns
        $scope.loadingFilters = false;
        //tabs and variables
        //pattern number for rents
        $scope.rentPattern = /^[-+]?\d+(\.\d{0,2})?$/;
        $scope.daysPattern = /^\d+$/;
        /**private models*/
        $scope.selectedTab = TabsService.getActiveTab();

        var data = ActualDateService.actualDate(function (data) {
            $scope.actualDate = data.actualDate;
        });


        //$scope.filterOptions = "";//initialization to empty, this object is filled with "restartFilters"
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
                "filter": 'lookup_diary/filters/futures_filters.tpl.html'},
            {"table": 'lookup_diary/tables/forex_table.tpl.html',
                "filter": 'lookup_diary/filters/forex_filters.tpl.html'}
        ];


        $scope.setPage = function (page) {
            $scope.pagingOptions.currentPage = page;
            $scope.saveUrlParams();
        };

        /*loads the default filters --> Filters has filters (inputs) and selectors (array of options to select)*/
        //restartRegion says if is obligatory restart the region selector
        $scope.restartFilter = function (callServer, restartRegion) {
            $scope.pagingOptions.currentPage = 1;
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
            $scope.filterStructure(restartRegion);

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
                case 4: //forex
                    break;
            }

        };

       /*$scope.setAlert = function (patternId) {
            var data = LookupDiaryService.setAlert(patternId).then(function (data) {
                $scope.loadPage();
            });
        };*/

        //start loading set loading = true to show loading message and empty the table
        $scope.startLoading = function() {

            $scope.loading = true;
            $scope.myData =[];
        };

        $scope.open = function (patternId, assetName, bearishAssetName, patternType, actualPrice, actualCondition, lastPrice) {

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

                    },
                    lastPrice : function () {
                        return lastPrice;
                    }
                }
            });

            modalInstance.result.then(function () {
            });
        };

        $scope.openNotes = function (pattern) {

            var modalNotesInstance = $modal.open({
                templateUrl: 'notesContent.html',
                controller: ModalNotesInstanceCtrl,
                resolve: {
                    pattern: function () {
                        return pattern;
                    },
                    month: function () {
                        return $scope.filterOptions.filters.month.month;
                    }
                }
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
            if (idTab === TabsService.getActiveTab()){
                return;
            }
            $scope.startLoading();
            //we change the page to 1, to load the new tab
            TabsService.changeActiveTab(idTab);
            $scope.restartFilter(true,true);
            $scope.applyFilters();
        };

        //check if exists some filter active, or is default search with all
        $scope.isFilterActive = function() {
            if ($scope.filterOptions.filters.durationInput!== "") {
                return true;
            }
            if ($scope.filterOptions.filters.favourite!== "") {
                return true;
            }
            if ($scope.filterOptions.filters.filterName!== "") {
                return true;
            }
            if ($scope.filterOptions.filters.rentAverageInput!== "") {
                return true;
            }
            if ($scope.filterOptions.filters.rentDiaryInput!== "") {
                return true;
            }
            if ($scope.filterOptions.filters.rentInput!== "") {
                return true;
            }
            if ($scope.filterOptions.filters.selectedAverage!== "") {
                return true;
            }
            if ($scope.filterOptions.filters.selectedDuration!== "") {
                return true;
            }
            if ($scope.filterOptions.filters.selectedIndustry!== "") {
                return true;
            }
            if ($scope.filterOptions.filters.selectedMarket!== "") {
                return true;
            }
            if ($scope.filterOptions.filters.selectedOperation!== "") {
                return true;
            }
            if ($scope.filterOptions.filters.selectedRegion!== "") {
                return true;
            }
            if ($scope.filterOptions.filters.selectedRent!== "") {
                return true;
            }
            if ($scope.filterOptions.filters.selectedRentDiary!== "") {
                return true;
            }
            if ($scope.filterOptions.filters.selectedSector!== "") {
                return true;
            }
            if ($scope.filterOptions.filters.selectedVolatility!== "") {
                return true;
            }
            if ($scope.filterOptions.filters.volatilityInput!== "") {
                return true;
            }
            if ($scope.filterOptions.filters.alarm !== false) {
                return true;
            }
            return false;
        };
        //restore filters and load page
        $scope.restoreData = function () {
            if ($scope.isFilterActive()) {
                $scope.myData= [];
                $scope.loading = true;
                $scope.dataLoaded = false; //Not showming data until they have been loaded
                $scope.restartFilter(true,true);
                $scope.applyFilters();
            }

        };



        /* sets the data in the table, and the results/found in the data to be showed in the view*/
        $scope.loadPage = function () {
            $scope.loading= true;
            var data = LookupDiaryService.getPagedDataAsync($scope.pagingOptions.currentPage, $scope.filterOptions.filters).then(function (data) {
                if (data.productType === parseInt($scope.filterOptions.filters.active_tab, 10)) {
                    $scope.myData = data.patterns;//data.page;
                    if ($scope.myData.length <= 0) {
                        $scope.appliedFilters = UserApplyFilters.userAppliedFilters($scope.filterOptions.filters);
                    } else {
                        $scope.appliedFilters = false;
                    }
                    $scope.results = data.results;//data.results;
                    $scope.found = data.found;//data.found;
                    $scope.loading = false;
                    if (!$scope.$$phase) {
                        $scope.$apply();
                    }
                }
                }, function(dataError) {
                //console.log("error");
                if (dataError.status === 401) {
                    IsLogged.unLog();
                }

            });
        };


        /**
         *      make a petition of selectors, the selectors is an array of the selectors required from server
         */

        $scope.refreshSelectors = function (selectors,filters,callback) {
            viewName = $state.$current.self.name;
            $scope.loadingFilters = true;
            LookupDiaryService.getSelectors(filters, selectors,callback,viewName);
        };

        $scope.callBackRefreshSelectors =  function (data) {
            if (typeof data.active_tab != 'undefined') {
                if (parseInt(data.active_tab,10) !== $scope.filterOptions.filters.active_tab) {
                    return;//the active_tab of the request is not the actual active_tab
                }
            }
            //check if the server says to clear the selectedRegion filter
            if (data.clearRegion) {
                $scope.filterOptions.filters.selectedRegion = "";
            }
            //checks the data received, when a selector is refreshed, the value selected is also cleaned
            if (data.hasOwnProperty("markets")) {
                $scope.filterOptions.selectors.markets = data.markets;
                if (typeof data.selectedRegion != 'undefined') {
                    $scope.filterOptions.filters.selectedRegion = data.selectedRegion;
                }
                for (i=0;i<$scope.filterOptions.selectors.markets.length;i++) {
                    $scope.filterOptions.selectors.markets[i].description = $filter('capitalize')( $scope.filterOptions.selectors.markets[i].description);
                }
                //$scope.filterOptions.filters.selectedMarket = "";
            }
            if (data.hasOwnProperty("regions")) {
                $scope.filterOptions.selectors.regions = data.regions;
                //$scope.filterOptions.filters.selectedRegion = "";
            }
            if (data.hasOwnProperty("industries")) {
                $scope.filterOptions.selectors.industries = data.industries;
                for (i=0;i<$scope.filterOptions.selectors.industries.length-1;i++) {
                    $scope.filterOptions.selectors.industries[i].description = $filter('capitalize')( $scope.filterOptions.selectors.industries[i].description);
                }
                //$scope.filterOptions.filters.selectedIndustry = "";
            }
            if (data.hasOwnProperty("sectors")) {
                $scope.filterOptions.selectors.sectors = data.sectors;
                for (i=0;i<$scope.filterOptions.selectors.sectors.length-1;i++) {
                    $scope.filterOptions.selectors.sectors[i].description = $filter('capitalize')( $scope.filterOptions.selectors.sectors[i].description);
                    $scope.filterOptions.selectors.sectors[i].description = $scope.filterOptions.selectors.sectors[i].description.substr(0,$scope.filterOptions.selectors.sectors[i].description.length-7);
                }
                //$scope.filterOptions.filters.selectedSector = "";
            }

            if (typeof data.selectedMarket != 'undefined') {
                $scope.filterOptions.filters.selectedMarket = data.selectedMarket;
            }
            if (typeof data.selectedSector != 'undefined') {
                $scope.filterOptions.filters.selectedSector = data.selectedSector;
            }
            if (typeof data.selectedIndustry != 'undefined') {
                $scope.filterOptions.filters.selectedIndustry = data.selectedIndustry;
            }
            $scope.loadingFilters = false;
            if ($scope.waitForFilters) {
                $scope.waitForFilters = false;

                //the page is waiting for patterns to load
                $scope.loadPage();
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
            $scope.startLoading();
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
            $scope.filterOptions.filters.selectedMarket = "";
            $scope.filterOptions.filters.selectedSector = "";
            $scope.filterOptions.filters.selectedIndustry = "";
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

        $scope.goToDetail = function (patternId){
            if ($scope.graph == null) {
                $state.go('detail',{patternId: patternId});
                //graph is not open
            }
        };

        $scope.goToPairDetail = function (patternId){
            if ($scope.graph == null) {
                $state.go('pairDetail',{patternId: patternId});
                //graph is not open
            }
        };

        $scope.closeGraph = function() {
            if (typeof $scope.graph !== "undefined" && $scope.graph != null) {

                    //event.srcElement.parentElement.className ='graphic-div';
                    $scope.graph.className='div-graph-lookup-diary move-to-the-right';
                    $timeout(function() {
                        if ($scope.graph != null) {
                            $scope.graph.style.cssText = 'display:none';
                            $scope.graph.parentNode.removeChild($scope.graph);//remove the htmlDom object
                            $scope.graph = null;
                        }

                    },1000);
            }
        };
        //open a graph and sve it to $scope.graph
        $scope.loadGraphic = function (inputEvent,name1,type,name2,pair,url) {
            //preload img
            preloadImg = document.getElementsByClassName("preloadImg");
            if (preloadImg != null) {
                preloadImg.src = url;
            }
            if (typeof $scope.graph !== "undefined" && $scope.graph != null) {
                $scope.graph.parentNode.removeChild($scope.graph);//remove the htmlDom object
                $scope.graph = null;
            }

            var elemDiv = document.createElement('div');
            var h = 450; //inputEvent.srcElement.parentElement.parentElement.parentElement.parentElement.parentElement.offsetHeight;
            var w = 951;//inputEvent.srcElement.parentElement.parentElement.parentElement.parentElement.parentElement.offsetWidth;

            if (typeof inputEvent.srcElement !== "undefined") {
                h = inputEvent.srcElement.parentElement.parentElement.parentElement.parentElement.parentElement.offsetHeight;
                w = inputEvent.srcElement.parentElement.parentElement.parentElement.parentElement.parentElement.offsetWidth;
            } else if (typeof inputEvent.currentTarget !== "undefined"){
                h = inputEvent.currentTarget.parentNode.parentNode.parentNode.parentNode.offsetHeight;
                w = inputEvent.currentTarget.parentNode.parentNode.parentNode.parentNode.offsetWidth;

            }


            var elemTitle = document.createElement('span');

            //check the name (if is simple or pair)
            //name1 is obligatory, name2 is optional (to check if is pair or not)
            //if pair, then name1 is buy name 2 is sell

            elemTitle.innerHTML = name1;
            var img = document.createElement('img');
            if (url !== null) {
                img.src = url;
            }
            var containerTitle = document.createElement("div");
            if (pair) {

                elemTitle.className = 'buy-color';
                if (name2 != null) {
                    var elemTitleSeparator = document.createElement('span');
                    elemTitleSeparator.innerText = " / ";
                    var elemTitle2 = document.createElement('span');
                    elemTitle2.className = 'sell-color';
                    elemTitle2.innerHTML = name2;
                    containerTitle.appendChild(elemTitle);
                    containerTitle.appendChild(elemTitleSeparator);
                    containerTitle.appendChild(elemTitle2);
                }

            } else {
                if ($scope.filterOptions.filters.active_tab !== 4) {
                    if (type === 'BULLISH') {
                        elemTitle.className = 'buy-color';
                    } else {
                        elemTitle.className = 'sell-color';
                    }
                }
                containerTitle.appendChild(elemTitle);
            }
            /*if (url !== null) {
                img.src = url;
            }*/
            img.className ="graphic-image-div-lookup-diary";
            elemDiv.className = 'div-graph-lookup-diary';
            elemDiv.style.cssText += 'height:' + h + 'px;';
            elemDiv.style.cssText += 'width:' + w + 'px;';


            var closeButton = document.createElement('div');
            //closeButton.src = "assets/img/close_modal.png";
            closeButton.className = 'close-graphic-button-diary-lookup';
            closeButton.onclick = function (event) {

                $scope.closeGraph();
            };
            elemDiv.appendChild(containerTitle);
            elemDiv.appendChild(closeButton);
            elemDiv.appendChild(img);
            elemDiv.className+=' move';
            //$timeout(function(){
                if (typeof inputEvent.srcElement !== "undefined") {
                    inputEvent.srcElement.parentElement.parentElement.parentElement.parentElement.parentElement.parentElement.insertBefore(elemDiv, null);
                } else if (typeof inputEvent.target !== "undefined") {
                    inputEvent.target.parentElement.parentElement.parentElement.parentElement.insertBefore(elemDiv, null);
                }


                $scope.graph = elemDiv;
            //},50);
            return 0;

        };



        //refresh selectors depending of market
        $scope.refreshMarket = function () {
            $scope.filterOptions.filters.selectedSector = "";
            $scope.filterOptions.filters.selectedIndustry = "";
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
            $scope.filterOptions.filters.selectedIndustry = "";
            $scope.refreshSelectors(['industries'],$scope.filterOptions.filters, $scope.callBackRefreshSelectors);
        };
        $scope.selectSector = function () {
            $scope.refreshSector();
            $scope.applyFilters();
        };

        //only used in stock
        $scope.refreshIndustry = function () {
            $scope.refreshSelectors(['industries'],$scope.filterOptions.filters, $scope.callBackRefreshSelectors);
        };
        $scope.selectIndustry = function () {
            $scope.refreshIndustry();
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
            $scope.changingMonth= true;
            $scope.startLoading();
            $scope.filterOptions.filters.month = MonthSelectorDiaryService.addMonths(1, $scope.filterOptions.filters.month);
            SelectedMonthDiaryService.changeSelectedMonth($scope.filterOptions.filters.month);
            $scope.restartFilter(true,false);
            $scope.saveUrlParams();

        };
        $scope.previousMonth = function () {
            $scope.changingMonth= true;
            $scope.startLoading();
            $scope.filterOptions.filters.month = MonthSelectorDiaryService.addMonths(-1, $scope.filterOptions.filters.month);
            SelectedMonthDiaryService.changeSelectedMonth($scope.filterOptions.filters.month);
            $scope.restartFilter(true,false);
            $scope.saveUrlParams();
        };
        //this function update the Month object in the filter from the value
        $scope.goToMonth = function () {
            $scope.changingMonth= true;
            $scope.startLoading();
            var date = $scope.filterOptions.filters.selectMonth.value.split("_");
            var d = new Date(date[1], date[0] - 1, 1);
            $scope.filterOptions.filters.month = MonthSelectorDiaryService.setDate(d);
            SelectedMonthDiaryService.changeSelectedMonth($scope.filterOptions.filters.month);
            $scope.restartFilter(true,false);
            $scope.saveUrlParams();
        };
        //synchronize the selector with the month of the filter
        $scope.updateSelectorMonth = function () {
            if ($scope.filterOptions.filters.month == null) {
                $scope.filterOptions.filters.month = SelectedMonthDiaryService.setSelectedMonth(now);
            }
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

        //check if a date in format 'MM_YYYY' exists in the months selector
        $scope.isCorrectDate= function(date){

            for (i=0; i< $scope.filterOptions.months.length;i++) {
                if ($scope.filterOptions.months[i].value === date) {
                    return true;
                }
            }
            return false;
        };

        ///urlParams control
        $scope.saveUrlParams = function () {
            var urlParams = $scope.filterOptions.filters;
            urlParams.page = $scope.pagingOptions.currentPage;
            //we ask each param to include in the url or not

            var urlParamsSend = {};
            urlParamsSend.found= $scope.found;
            if (urlParams.alarm) {
                urlParamsSend.qalarm = urlParams.alarm;
            }
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
            //check if the new urlParamsSend are equals that the filters that are already in the url,if they are equals,
            //we launch loadPage
            url = $location.search();
            if (JSON.stringify(url) === JSON.stringify(urlParamsSend) ) {
                if (!$scope.waitForFilters) {
                    $scope.loadPage();
                }
            } else {
                $location.path('/lookup-diary').search(urlParamsSend);
            }

        };
        $scope.loadUrlParams = function () {
            var params = $location.search();

            var filters = {
                filterName: (typeof params.qname !== "undefined" ? params.qname : "" ),
                selectedRent: (typeof params.qselrent !== "undefined" ? $scope.filterOptions.selectors.comparators[$scope.filterOptions.selectors.comparatorsConversor[parseInt(params.qselrent,10)]] : "" ),
                rentInput: (typeof params.qrent !== "undefined" ? params.qrent : "" ),
                selectedAverage: (typeof params.qselaver !== "undefined" ? $scope.filterOptions.selectors.comparators[$scope.filterOptions.selectors.comparatorsConversor[parseInt(params.qselaver,10)]] : "" ),
                rentAverageInput: (typeof params.qaver !== "undefined" ? params.qaver : "" ),
                selectedRentDiary: (typeof params.qseldiar !== "undefined" ? $scope.filterOptions.selectors.comparators[$scope.filterOptions.selectors.comparatorsConversor[parseInt(params.qseldiar,10)]] : "" ),
                rentDiaryInput: (typeof params.qdiar !== "undefined" ? params.qdiar : "" ),
                selectedVolatility: (typeof params.qselvol !== "undefined" ? $scope.filterOptions.selectors.comparators[$scope.filterOptions.selectors.comparatorsConversor[parseInt(params.qselvol ,10)]] : "" ),
                volatilityInput: (typeof params.qvol !== "undefined" ? params.qvol : "" ),
                selectedDuration: (typeof params.qseldur !== "undefined" ? $scope.filterOptions.selectors.comparators[$scope.filterOptions.selectors.comparatorsConversor[parseInt(params.qseldur,10)]] : "" ),
                durationInput: (typeof params.qdur !== "undefined" ? params.qdur : "" ),
                index_type: (typeof params.qindex !== "undefined" ? params.qindex : TabsService.getActiveIndexType() ),
                tab_type: (typeof params.qtab !== "undefined" ? params.qtab : "" ),
                active_tab: (typeof params.qacttab !== "undefined" ? parseInt(params.qacttab, 10) : TabsService.getActiveTab() ),
                favourite: (typeof params.qfav !== "undefined" ? params.qfav : "" ),
                selectedRegion: (typeof params.qregion !== "undefined" ? params.qregion : "" ),
                selectedMarket: (typeof params.qmarket !== "undefined" ? params.qmarket : "" ),
                selectedSector: (typeof params.qsector !== "undefined" ? params.qsector : ""),
                selectedIndustry: (typeof params.qindust !== "undefined" ? params.qindust : ""),
                alarm: (typeof params.qalarm !== "undefined" ? params.qalarm : "")

            };
            //special case for index
            if ((filters.active_tab === 2)) {//case of index
                //only for index, not pair index
                if ((filters.index_type ===0) || (filters.index_type ==="0")) {
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
                    actual_date = new Date(now.getTime());//new Date();
                    d = new Date(actual_date.getFullYear(),actual_date.getMonth(),1);
                }
                filters.month = MonthSelectorDiaryService.setDate(d);
                //month specified ? and region specified? then waitForFilters
                if (($scope.filterOptions.filters.month != null && $scope.filterOptions.filters.month.value !== params.month) && (filters.selectedRegion !== "")) {
                    $scope.waitForFilters = true;
                }
                //or may be changingMonth =true and selectedRegion
                if (($scope.changingMonth && filters.selectedRegion !=="")) {
                    $scope.waitForFilters = true;
                    $scope.changingMonth = false;
                }
            } else {
                //if the date is not passed as param, we load the default date
                var date_restart = new Date(now.getTime());//new Date();
                date_restart.setDate(1);
               // date_restart.setMonth(SelectedMonthDiaryService.getSelectedMonth().month-1); --actual month
                filters.month = MonthSelectorDiaryService.setDate(date_restart);

            }

            //if the tab changed, all the selectors must be reloaded (the markets could be diferents in pari and stocks for example)
            $scope.filterOptions.filters = filters;
            $scope.updateSelectorMonth();
            $scope.pagingOptions.currentPage = (params.pag ? params.pag : 1);
            $scope.found = (params.found ? params.found : 0);
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
                    case 4: //forex
                        break;
                }
            }
        };




        /**PDF GENERATION**/

        $scope.getDailyPdf = function () {
            var deferred = $q.defer();
            var filtering = $scope.filterOptions.filters;
            var data;
            var indexType = null;

            if (typeof filtering.index_type !== "undefined") {
                indexType = parseInt(filtering.index_type, 10);
            } else {
                indexType = 0;
            }
            config = {
                params: {
                    //'token': $window.localStorage.token,
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

            var result = $http.get($rootScope.urlService+'/lookupdiarypdf', config).then(function (response) {
                // With the data succesfully returned, call our callback
                deferred.resolve();
                return response.data;
            });
            return result;
        };
        $scope.generatePdf = function () {
            if ($scope.isDisabled) {
                return;
            }
            $scope.isDisabled=true;
            $scope.getDailyPdf().then(function (data) {
                var filename = "lookupdiary" + /*productType +*/ ".pdf";
                var element = angular.element('<a/>');
                element.attr({

                    href: 'data:attachment/pdf;base64,' + encodeURI(data),
                    target: '_blank',
                    download: filename
                });
                document.body.appendChild(element[0]);

                $timeout(function() {
                    element[0].click();
                    $scope.isDisabled = false;
                });
            });
        };

        $scope.$on('$locationChangeSuccess', function (event, $stateParams) {
            $scope.loadUrlParams();
            if (!$scope.waitForFilters) {
                //if wait for filters, then not load, the callbacks fitlers will load the page
                $scope.loadPage();
            }
        });
        /*First load on page ready*/
        //$scope.restartFilter(false,false);

        $scope.$on('body-click',function() {
            $scope.closeGraph();
        });


        //Expiration service
        $scope.getYearFromPatternName= function (patternName, expirationDate) {
            return ExpirationYearFromPatternName.getExpirationYearFromPatternName(patternName, expirationDate);
        };

        //in case of refresh..
        if ($location.search()) {
            //if the paramsUrl are  passed, we load the page with the filters
            $scope.loadUrlParams();
            if (!$scope.waitForFilters) {
                $scope.loadPage();
            }
        }


    })
    .service("SelectedMonthDiaryService", function (MonthSelectorDiaryService) {
        var selectedMonth = null;

        this.setSelectedMonth = function(now){
            selectedMonth = MonthSelectorDiaryService.restartDate(now);
            return selectedMonth;
        };

        this.getSelectedMonth = function () {
            return selectedMonth;
        };

        this.changeSelectedMonth = function (month) {
            selectedMonth = month;
        };

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
                    //'token': $window.localStorage.token,
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
                    'favourites': filtering.favourite,
                    'alarm' : filtering.alarm
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
                    //'token': $window.localStorage.token,
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
                    'patternId': patternId
                   // 'token': $window.localStorage.token
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
                   // 'token': $window.localStorage.token,
                    'productType': parseInt(filtering.active_tab, 10),
                    'indexType': indexType,
                    'month': filtering.month.month,
                    'year': filtering.month.year,
                    'view': viewName,
                    'active_tab':filtering.active_tab
                }
            };

            var result = $http.get($rootScope.urlService+'/patternfilters', config).success(function (data) {
                // With the data succesfully returned, call our callback
                callback(data);
            });
        };
    }).factory('MonthSelectorDiaryService', function () {
        var actualDate = {};
        var savedDate = null;

        return {

            setDefaultDate: function(now) {
                savedDate = new Date(now);
            },

            getMonthName: function (date) {

                var monthString = "";
                switch (date.month) {
                    case 1:
                        monthString = "JANUARY";
                        break;
                    case 2:
                        monthString = "FEBRUARY";
                        break;
                    case 3:
                        monthString = "MARCH";
                        break;
                    case 4:
                        monthString = "APRIL";
                        break;
                    case 5:
                        monthString = "MAY";
                        break;
                    case 6:
                        monthString = "JUNE";
                        break;
                    case 7:
                        monthString = "JULY";
                        break;
                    case 8:
                        monthString = "AUGUST";
                        break;
                    case 9:
                        monthString = "SEPTEMBER";
                        break;
                    case 10:
                        monthString = "OCTOBER";
                        break;
                    case 11:
                        monthString = "NOVEMBER";
                        break;
                    case 12:
                        monthString = "DECEMBER";
                        break;
                    default :
                        monthString = "notFound";
                        break;

                }
                return monthString;
            },
            restartDate: function (now) {
               // var today = new Date();
                savedDate = new Date(now.getTime());
                var today = new Date(now.getTime());
                var mm = today.getMonth() + 1; //January is 0!
                var yyyy = today.getFullYear();
                actualDate = {
                    month: mm,
                    year: yyyy,
                    monthString: "",
                    value: mm + "_" + yyyy
                };
                actualDate.monthString = this.getMonthName(actualDate);
                return actualDate;
            },
            setDate: function (date) {
                var mm = date.getMonth() + 1; //January is 0!
                var yyyy = date.getFullYear();
                actualDate = {
                    month: mm,
                    year: yyyy,
                    monthString: "",
                    value: mm + "_" + yyyy
                };
                actualDate.monthString = this.getMonthName(actualDate);
                return actualDate;
            },
            addMonths: function (months, date) { /*add Months accepts months in positive (to add) or negative (to substract)*/
                var d = new Date(date.year, date.month - 1, 1);
                d.setMonth(d.getMonth() + months);
                actualDate = {
                    month: d.getMonth() + 1,
                    year: d.getFullYear(),
                    monthString: "",
                    value: (d.getMonth() + 1) + "_" + d.getFullYear()
                };
                actualDate.monthString = this.getMonthName(actualDate);
                return actualDate;
            },
            getListMonths: function (diaryMode) {
                //var today = new Date();
                var today = savedDate;
                var monthList = [];
                //the list is 10 last months + actual month + next month if today is <=15, if not
                //is 11 last months + actual month
                if (diaryMode){
                    months = 11;
                } else {
                    if (today.getDate() > 14) {
                        months = 10;
                    } else {
                        months = 11;
                    }
                }

                var d = new Date(today.getFullYear(), today.getMonth() - months, 1);
                for (i = 0; i < 12; i++) {
                    var d_act = (this.setDate(d));
                    monthList.push({
                        id: i,
                        value: d_act.value,
                        name: d_act.monthString + " " + d_act.year,
                        month: d_act.monthString,
                        year: d_act.year
                    });

                    d = new Date(d.getFullYear(), d.getMonth() + 1, 1);
                }
                return monthList;

            },
            getCalendarListMonths: function () {
                //var today = new Date();
                var today = savedDate;
                var monthList = [];
                var d = new Date(today.getFullYear(), today.getMonth(), 1);
                //the list is actual month + next month
                for (i = 0; i < 2; i++) {
                    var d_act = (this.setDate(d));
                    monthList.push({
                        id: i,
                        value: d_act.value,
                        name: d_act.monthString + " " + d_act.year,
                        month: d_act.monthString,
                        year: d_act.year
                    });

                    d = new Date(d.getFullYear(), d.getMonth() + 1, 1);
                }
                return monthList;
            },
            getMySubscriptionsListMonth: function () {
                //var today = new Date();
                var today = savedDate;
                var monthList = [];
                var d = new Date(today.getFullYear(), today.getMonth(), 1);
                //the list is actual month + next month if day today is greater than 15
                if (today.getDate() < 15){
                    numMonths = 1;
                }else{
                    numMonths = 2;
                }
                for (i = 0; i < numMonths; i++) {
                    var d_act = (this.setDate(d));
                    monthList.push({
                        id: i,
                        value: d_act.value,
                        name: d_act.monthString + " " + d_act.year,
                        month: d_act.monthString,
                        year: d_act.year
                    });

                    d = new Date(d.getFullYear(), d.getMonth() + 1, 1);
                }
                return monthList;
            }


        };

    })

;

var ModalAlertInstanceCtrl = function ($scope, $modalInstance, patternId, setAlert, assetName, bearishAssetName, deleteAlert, patternType, actualPrice, actualCondition, lastPrice, $timeout) {
    $scope.setAlert = setAlert;
    $scope.deleteAlert = deleteAlert;
    $scope.patternId = patternId;
    $scope.assetName = assetName;
    $scope.bearishAssetName = bearishAssetName;
    $scope.patternType = patternType;
    $scope.showAlertMessage = false;
    $scope.rentPattern = /^[-+]?\d+(\.\d{0,2})?$/;
    $scope.focusPrice = true;

    $scope.data = {
        price: (typeof actualPrice !== 'undefined' ? actualPrice : 0),
        price_condition: (typeof actualCondition !== 'undefined' ? actualCondition : 0)
    };

    $scope.ok = function () {
        if (typeof $scope.data.price === 'undefined'){
            $scope.showAlertMessageCorrectValue = true;
            $timeout(function () {
                $scope.showAlertMessageCorrectValue = false;
            }, 2000);
            return;
        }
        if ($scope.data.price_condition === 0 || $scope.data.price_condition === "0"){
            if ($scope.data.price >= lastPrice){
                $scope.setAlert($scope.patternId, $scope.data.price, $scope.data.price_condition);
                $modalInstance.close();
            }else{
                $scope.showAlertMessage = true;
                $timeout(function () {
                    $scope.showAlertMessage = false;
                }, 2000);
            }
        }else if ($scope.data.price_condition === 1 || $scope.data.price_condition === "1"){
            if ($scope.data.price <= lastPrice){
                $scope.setAlert($scope.patternId, $scope.data.price, $scope.data.price_condition);
                $modalInstance.close();
            }else{
                $scope.showAlertMessage = true;
                $timeout(function () {
                    $scope.showAlertMessage = false;
                }, 2000);
            }
        }
    };

    $scope.close = function () {
        $modalInstance.dismiss('cancel');
    };

    $scope.cancel = function () {
        $scope.deleteAlert($scope.patternId);
        $modalInstance.dismiss('cancel');
    };

};

var ModalNotesInstanceCtrl = function ($scope, $modalInstance, pattern) {

    $scope.data = {
        assetName: (typeof pattern.name !== 'undefined' ? pattern.name : ''),
        notes: (typeof pattern.notes !== 'undefined' ? pattern.notes : ''),
        bearishAssetName: (typeof pattern.name2 !== 'undefined' ? pattern.name2 : ''),
        bearishNotes: (typeof pattern.notes2 !== 'undefined' ? pattern.notes2 : ''),
        month: (typeof month !== 'undefined' ? month : '')
    };

    $scope.close = function () {
        $modalInstance.dismiss('cancel');
    };
};
