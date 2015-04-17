/**
 * Created by robgon on 28/05/14.
 */


angular.module('ngMo.volatility', [
    'ui.router',
    'ui.bootstrap'
])
    .config(function config($stateProvider) {
        $stateProvider.state('volatility', {
            url: '/volatility',
            views: {
                "main": {
                    controller: 'VolatilityCtrl',
                    templateUrl: 'tools/volatility/volatility.tpl.html',
                    reloadOnSearch: false//with this option, the controller will not reload the page when it change
                    //the params on url
                }
            },
            data: {
                pageTitle: 'Volatilidad',
                selectMenu: 'tools-nav',
                selectSubmenu: 'submenu1',
                selectItemSubmenu: 'volatility-nav',
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

    .controller('VolatilityCtrl', function VolatilityCtrl($filter,$scope,$rootScope, $http, $state, $stateParams, $location, TabsService,PatternsService, ActualDateService, VolatilityService, MonthSelectorService, IsLogged,
                                                          SelectedMonthService, UserApplyFilters, $translatePartialLoader,now) {
        $scope.$on('$stateChangeStart', function (event, toState) {
            IsLogged.isLogged(true);
        });
        $scope.$on('$stateChangeSuccess', function (event, toState, toParams, fromState, fromParams) {
            if (angular.isDefined(toState.data.pageTitle)) {
                $scope.pageTitle = toState.data.pageTitle + ' | Market Observatory';
            }
            IsLogged.isLogged(true);
        });
        $translatePartialLoader.addPart("tools");
        $scope.loading = true;
        $scope.loadingFilters = false;
        //this shows if the user is filtering by volat filter, this is used to control the selector and the input of volat filter
        $scope.filteringVolat = false;

        $scope.startLoading = function() {
            $scope.loading = true;
            $scope.myData = [];
        };
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

        $scope.closeGraph = function() {
            if (typeof $scope.graph !== "undefined" && $scope.graph != null) {
                setTimeout(function(){
                    //event.srcElement.parentElement.className ='graphic-div';
                    $scope.graph.className='graphic-div move-to-the-right';
                    $scope.graph.addEventListener('transitionend', function(event2) {
                        if ($scope.graph != null) {
                            $scope.graph.style.cssText = 'display:none';
                            $scope.graph.parentNode.removeChild($scope.graph);//remove the htmlDom object
                            $scope.graph = null;
                        }

                    });
                },0);
            }
        };

        $scope.loadGraphic = function (inputEvent,name1,type,name2,pair,url) {

            if (typeof $scope.graph !== "undefined" && $scope.graph != null) {
                $scope.graph.parentNode.removeChild($scope.graph);//remove the htmlDom object
                $scope.graph = null;
            }

            var elemDiv = document.createElement('div');

            var h = '';
            var w = '';

            h = inputEvent.target.parentElement.parentElement.parentElement.offsetHeight + 90;
            w = inputEvent.target.parentElement.parentElement.parentElement.offsetWidth + 2;

            var elemTitle = document.createElement('span');

            //check the name (if is simple or pair)
            //name1 is obligatory, name2 is optional (to check if is pair or not)
            //if pair, then name1 is buy name 2 is sell

            elemTitle.innerHTML = name1;

            var containerTitle = document.createElement("div");
            containerTitle.className = 'title-container-graphic';
            //elemTitle.innerHTML = inputEvent.srcElement.parentElement.parentElement.children[0].children[0].innerHTML;
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
                if (type === 'BULLISH') {
                    elemTitle.className = 'buy-color';
                } else {
                    elemTitle.className = 'sell-color';
                }
                containerTitle.appendChild(elemTitle);
            }

            elemDiv.className = 'graphic-div';
            elemDiv.style.cssText += 'height:' + h + 'px;';
            elemDiv.style.cssText += 'width:' + w + 'px;';
            var img = document.createElement('img');
            /*if (url == null){
                //mocked graph
                img.src = "assets/img/graphic.png";
            } else {*/
                //real graph
                img.src=url;
            //}
            img.className ="graphic-image-div";

            var closeButton = document.createElement('img');
            closeButton.src = "assets/img/close_modal.png";
            closeButton.className = 'close-graphic-button';
            closeButton.onclick = function (event) {
                $scope.closeGraph();
            };
            elemDiv.appendChild(containerTitle);
            elemDiv.appendChild(closeButton);
            elemDiv.appendChild(img);
            inputEvent.target.parentElement.parentElement.parentElement.parentElement.insertBefore(elemDiv, null);


            setTimeout(function(){
                elemDiv.className+=' move';

            },0);

            $scope.graph = elemDiv;
            return 0;

        };

        /** templates of filters/tables for each tab**/
        var templateTables = [
            {"table": 'tools/volatility/tables/stocks_table.tpl.html',
                "filter": 'tools/volatility/filters/stocks_filters.tpl.html'},

            {"table": 'tools/volatility/tables/pairs_table.tpl.html',
                "filter": 'tools/volatility/filters/pairs_filters.tpl.html'},

            [
                {"table": 'tools/volatility/tables/index_table.tpl.html',
                    "filter": 'tools/volatility/filters/index_filters.tpl.html'},
                {"table": 'tools/volatility/tables/pairs_index_table.tpl.html',
                    "filter": 'tools/volatility/filters/pairs_index_filters.tpl.html'}
            ],

            {"table": 'tools/volatility/tables/futures_table.tpl.html',
                "filter": 'tools/volatility/filters/futures_filters.tpl.html'},
            {"table": 'tools/volatility/tables/forex_table.tpl.html',
                "filter": 'tools/volatility/filters/forex_filters.tpl.html'}
        ];



        $scope.setPage = function (page) {
            $scope.pagingOptions.currentPage = page;
            $scope.saveUrlParams();
        };

        $scope.toggleFavorite = function (patternId,asset1,asset2,toFav){
            var isPair= false;
            if ($scope.filterOptions.filters.active_tab === 1 || ($scope.filterOptions.filters.active_tab ===2 && $scope.filterOptions.filters.index_type ==="1")) {
                isPair = true;
            }
            var data = VolatilityService.setFavorite(patternId,isPair).then(function (data) {
                //$scope.loadPage();
                $scope.toggleFavIcon(asset1,asset2,!toFav);
            });
        };



        //mark as favorite (or quit fav) in the actual page by the asset name
        $scope.toggleFavIcon = function(asset1,asset2,addToFav) {
            //assetName to search, and addToFav is add or delete
            for (i=0 ; i< $scope.myData.length;i++) {
                if ($scope.myData[i].name === asset1) {
                    var check = false;
                    if (asset2 !=null) {
                        if ($scope.myData[i].name2 === asset2) {
                            check = true;
                        }
                    } else {
                        check = true;
                    }
                    if (check) {
                        if (addToFav && !$scope.myData[i].fav) {
                            $scope.myData[i].fav = true;
                        } else if (!addToFav && $scope.myData[i].fav) {
                            $scope.myData[i].fav = false;
                        }
                    }
                }
            }

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
                    month: (restartMonth ? MonthSelectorService.restartDate(now) : $scope.filterOptions.filters.month),
                    favourite: false},
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
                        {"id": 0, "description": "TOOLS.buy"},
                        {"id": 1, "description": "TOOLS.sell"}
                    ],
                    operationsIndex: [
                        {"id": 0, "description": "TOOLS.bullish"},
                        {"id": 1, "description": "TOOLS.bearish"}
                    ],
                    comparators: [
                        {"id": 1, "description": "TOOLS.gt"},
                        {"id": 0, "description": "TOOLS.lt"}

                    ],

                    comparatorsConversor: [1,0]//the comparatos in pos[0] means 1 and viceversa (posterior changes..) so use this conversor for pos/value


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
                case 4: //forex
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
            if (idTab === TabsService.getActiveTab()){
                return;
            }
            //we change the page to 1, to load the new tab
            $scope.startLoading();
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
            var data = VolatilityService.getPagedDataAsync($scope.pagingOptions.currentPage, $scope.filterOptions.filters).then(function (data) {
                $scope.loading = false;
                $scope.myData = data.patterns;//data.page;
                if ($scope.myData.length <=0){
                    $scope.appliedFilters = UserApplyFilters.userAppliedFilters($scope.filterOptions.filters);
                }else{
                    $scope.appliedFilters = false;
                }
                $scope.results = data.results;//data.results;
                $scope.found = data.found;//data.found;
            });


        };
        /**
         *      make a petition of selectors, the selectors is an array of the selectors required from server
         */
        $scope.refreshSelectors = function (selectors,filters,callback) {
            viewName = $state.$current.self.name;
            $scope.loadingFilters = true;
            PatternsService.getSelectors(filters, selectors,callback,viewName);
        };

        $scope.callBackRefreshSelectors =  function (data) {
            //checks the data received, when a selector is refreshed, the value selected is also cleaned
            if (data.hasOwnProperty("regions")) {
                $scope.filterOptions.selectors.regions = data.regions;
                //$scope.filterOptions.filters.selectedRegion = "";
            }

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

            if (data.hasOwnProperty("industries")) {
                $scope.filterOptions.selectors.industries = data.industries;
                //$scope.filterOptions.filters.selectedIndustry = "";
            }
            if (data.hasOwnProperty("sectors")) {
                $scope.filterOptions.selectors.sectors = data.sectors;
                //$scope.filterOptions.filters.selectedSector = "";
            }

            if (typeof data.selectedMarket != 'undefined') {
                $scope.filterOptions.filters.selectedMarket = data.selectedMarket;
            }
            if (typeof data.selectedSector != 'undefined') {
                $scope.filterOptions.filters.selectedSector = data.selectedSector;
            }
            $scope.loadingFilters = false;
        };


        /**
         *  make a new search with the filters, restart the page and search, for the button Search in the page
         */
        $scope.search = function () {
            $scope.startLoading();

            $scope.applyFilters();
        };

        $scope.searchVolat = function () {
            //if the user is filtering by the 2 filters (selector and input)
            //the app start searching, if not, the filter is set to null, but we need check if the actual table is filtered, to
            //search by default filter
            if (($scope.filterOptions.filters.selectedVolatility !== "" && $scope.filterOptions.filters.selectedVolatility !== null) &&
                ($scope.filterOptions.filters.volatilityInput !== "" && $scope.filterOptions.filters.volatilityInput !== null)) {
                $scope.search();
            } else if ($scope.filteringVolat) {
                $scope.search();
            }
        };

        /*apply filters to search, restarting the page*/
        $scope.applyFilters = function () {
            $scope.pagingOptions.currentPage = 1; //restart the page
            $scope.checkFilters();//check if selectors and inputs are right
            $scope.saveUrlParams();
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
            /*if (!($scope.filterOptions.filters.volatilityInput &&
                $scope.filterOptions.filters.selectedVolatility)) {
                $scope.filterOptions.filters.volatilityInput = "";
                $scope.filterOptions.filters.selectedVolatility = "";
            }*/
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
            // if ($scope.filterOptions.filters.selectedRegion === ""){
            $scope.filterOptions.filters.selectedMarket = "";
            $scope.filterOptions.filters.selectedSector = "";
            $scope.filterOptions.filters.selectedIndustry = "";
            // }
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
            $scope.filterOptions.filters.selectedMarket = "";
            $scope.refreshRegion();
            $scope.applyFilters();

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
            $scope.startLoading();
            TabsService.changeActiveIndexType($scope.filterOptions.filters.index_type);
            $scope.restartFilter();
            $scope.applyFilters();
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
                urlParamsSend.qselrent = urlParams.selectedRent;
            }
            if (urlParams.rentInput) {
                urlParamsSend.qrent = urlParams.rentInput;
            }
            if (urlParams.selectedAverage) {
                urlParamsSend.qselaver = urlParams.selectedAverage;
            }
            if (urlParams.rentAverageInput) {
                urlParamsSend.qaver = urlParams.rentAverageInput;
            }
            if (urlParams.selectedRentDiary) {
                urlParamsSend.qseldiar = urlParams.selectedRentDiary;
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
                urlParamsSend.qseldur = urlParams.selectedDuration;
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

            $location.path('/volatility').search(urlParamsSend);
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
                selectedIndustry: (typeof params.qindust !== "undefined" ? params.qindust : "")
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
                    actual_date = new Date(now.getTime());//new Date();
                    d = new Date(actual_date.getFullYear(),actual_date.getMonth(),1);
                }
                filters.month = MonthSelectorService.setDate(d);



            } else {
                //if the date is not passed as param, we load the default date
                var date_restart = new Date(now.getTime());//new Date();
                filters.month = MonthSelectorService.restartDate(now);
            }

            //if the tab changed, all the selectors must be reloaded (the markets could be diferents in pari and stocks for example)
            if (tabChanged) {

                switch (TabsService.getActiveTab()) {
                    case 0:     //stocks
                        $scope.refreshSelectors(['regions', 'markets', 'industries', 'sectors'],filters, $scope.callBackRefreshSelectors);
                        break;
                    case 1:     //pairs
                        $scope.refreshSelectors(['regions', 'industries', 'sectors'],filters,$scope.callBackRefreshSelectors);
                        break;
                    case 2:     //index (pair and index)
                        break;
                    case 3:     //futures
                        $scope.refreshSelectors(['markets'],filters, $scope.callBackRefreshSelectors);
                        break;
                    case 4:     //forex
                        break;
                }
            }


            //for a special case to load the selectors, we need save the region,market,...
            //if the location.search region,market.. values are not the same that the filters, we need
            //to reload the selectors...
            if ((typeof params.qregion !== 'undefined') && ($scope.filterOptions.filters.selectedRegion !== params.qregion)) {
                //if region is distinct, refresh all selectors
                $scope.filterOptions.filters.selectedRegion = (params.qregion ? params.qregion : "" );
                filters.selectedRegion = $scope.filterOptions.filters.selectedRegion;
                $scope.refreshRegion();
                filters.selectedMarket = (params.qmarket ? params.qmarket : "");
                filters.selectedSector = (params.qsector ? params.qsector : "" );
                filters.selectedIndustry = (params.qindust ? params.qindust : "" );
            }
            else if ((typeof params.qmarket !== 'undefined') && ($scope.filterOptions.filters.selectedMarket !== params.qmarket)) {
                //region similar, but not market
                $scope.filterOptions.filters.selectedRegion = (params.qregion ? params.qregion : "" );
                $scope.filterOptions.filters.selectedMarket = (params.qmarket ? params.qmarket : "");
                filters.selectedRegion = $scope.filterOptions.filters.selectedRegion;
                filters.selectedMarket = $scope.filterOptions.filters.selectedMarket;
                $scope.refreshMarket();
                filters.selectedSector = (params.qsector ? params.qsector : "" );
                filters.selectedIndustry = (params.qindust ? params.qindust : "" );
            } else if ((typeof params.qsector !== 'undefined') && ($scope.filterOptions.filters.selectedSector !== params.qsector)) {
                //region and market similar, but not sector
                $scope.filterOptions.filters.selectedRegion = (params.qregion ? params.qregion : "" );
                $scope.filterOptions.filters.selectedMarket = (params.qmarket ? params.qmarket : "");
                $scope.filterOptions.filters.selectedSector = (params.qsector ? params.qsector : "" );
                filters.selectedRegion = $scope.filterOptions.filters.selectedRegion;
                filters.selectedMarket = $scope.filterOptions.filters.selectedMarket;
                filters.selectedSector = $scope.filterOptions.filters.selectedSector;

                $scope.refreshSector();
                $scope.filterOptions.filters.selectedIndustry = (params.qindust ? params.qindust : "" );
            } else {
                //or all are similar, or only industry is distinct (in that case all selectors are the same)
                filters.selectedRegion = (params.qregion ? params.qregion : "" );
                filters.selectedMarket = (params.qmarket ? params.qmarket : "");
                filters.selectedSector = (params.qsector ? params.qsector : "" );
                filters.selectedIndustry = (params.qindust ? params.qindust : "" );
            }
            $scope.filterOptions.filters = filters;
            $scope.updateSelectorMonth();
            $scope.pagingOptions.currentPage = (params.pag ? params.pag : 1);

            //check if is filtering by volat filter
            if (($scope.filterOptions.filters.selectedVolatility !== "" && $scope.filterOptions.filters.selectedVolatility !== null) &&
                ($scope.filterOptions.filters.volatilityInput !== "" && $scope.filterOptions.filters.volatilityInput !== null))  {
               $scope.filteringVolat = true;
            }  else {
                $scope.filteringVolat = false;
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

    })

    .directive('selectedGraphicVolatility', function () {
        return {
            controller: function ($scope, $timeout, $state, TabsService){
                $scope.openGraph = false;


                $scope.showSelectedGraphic = function (e, name, type, name2, pair, url) {
                    $scope.animateClose = false;
                    if ($scope.openGraph === true){
                        $timeout( function(){
                            $scope.openGraph = true;
                        },800);
                    }else{
                        $scope.openGraph = true;
                    }

                    $scope.selectedGraphic = {
                        indiceName:  name,
                        type: type,
                        secondIndiceName: name2,
                        isPair: pair,
                        url:  (typeof url !== "undefined" ? url : "")
                    };
                    if (TabsService.getActiveTab() == 1 || (TabsService.getActiveTab() == 2 && $scope.filterOptions.filters.index_type == 1)) {
                        $scope.myStyle ={'height' : '450px'};
                    }
                };

                $scope.hideSelectedGraphicVol = function () {
                    if ($scope.openGraph === true) {
                        $scope.animateClose = true;
                        $timeout( function(){
                            $scope.animateClose = false;
                            $scope.openGraph = false;
                            $scope.selectedGraphic = {
                                indiceName:  '',
                                url: ''
                            };
                        },1000);

                    }
                };

                $scope.$on("body-click",function(){$scope.hideSelectedGraphicVol();});
            },
            link: function($scope) {
                $scope.$watch('openGraph', function(){});
            },

            templateUrl: "tools/volatility/graphPanel.tpl.html"
        };
    })


    .service("VolatilityService", function ($http, $window, $rootScope, $q) {

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

        this.setFavorite = function (patternId,isPair) {
            var deferred = $q.defer();
            var data;

            config = {
                params: {
                    'patternId': patternId,
                    'isPair':isPair
                    //'token': $window.localStorage.token
                }
            };
            var result = $http.get($rootScope.urlService+'/favoriteasset', config).then(function (response) {
                // With the data succesfully returned, call our callback
                deferred.resolve();
                return response.data;
            });
            return result;
        };

        /*Function to load info from server, receives the pageSize, number of page, and the filter object (that have all the filters inside)*/
        this.getPagedDataAsync = function (page, filtering) {
            var deferred = $q.defer();
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
                   // 'token': $window.localStorage.token,
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

            var result = $http.get($rootScope.urlService+'/volatility-patterns', config).then(function (response) {
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
                    //'token': $window.localStorage.token,
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