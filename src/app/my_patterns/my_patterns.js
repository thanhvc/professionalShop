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
                pageTitle: 'Mis Patrones',
                selectMenu: 'my-patterns-nav',
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
                myPatternsData: function(PatternsService, filtering) {
                    return PatternsService.getPagedDataAsync(1, filtering).then(function (data){
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


        var portfolioTabs = [
            {
                title: 'Acciones',
                active: activeTab === 0,
                value: 0
            },
            {
                title: 'Par Acciones',
                active: activeTab === 1,
                value: 1
            },
            {
                title: 'Indices',
                active: activeTab === 2,
                value: 2
            },
            {
                title: 'Par Indices',
                active: activeTab === 3,
                value: 3
            }
        ];
        var indexTypes = [
            {
                title: "Indices",
                active: activeIndex === 0,
                value: 0
            },
            {
                title: "Pares Indices",
                active: activeIndex === 1,
                value: 1

            }
        ];

        var activeTab = 0;
        var activeIndex = 0;
        var portfolioFlag = false;

        this.getIndexType = function () {
            return indexTypes;
        };

        this.getActiveIndexType = function () {
            return activeIndex;
        };

        this.changeActiveIndexType = function (active) {
            activeIndex = active;
        };

        this.getTabs = function () {
            portfolioFlag = false;
            return tabs;
        };

        this.getPortfolioTabs = function () {
            portfolioFlag = true;
            return portfolioTabs;
        };

        this.getActiveTab = function () {
            if (portfolioFlag){
                activeTab = 2;
                portfolioFlag = false;
            }
            return activeTab;
        };

        this.changeActiveTab = function (active) {
            activeTab = active;
        };

        this.changePortfolioActiveTab = function (active) {
            if (active === 3){
                this.changeActiveIndexType(1);
            }else if (active === 2){
                this.changeActiveIndexType(0);
            }
            activeTab = active;
        };
    })
    .controller('PatternsCtrl', function PatternsCtrl($scope, $http, $state, $stateParams, $location, TabsService, ActualDateService, PatternsService, MonthSelectorService, IsLogged, myPatternsData) {
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
            {"table": 'my_patterns/tables/stocks_table.tpl.html',
                "filter": 'my_patterns/filters/stocks_filters.tpl.html'},

            {"table": 'my_patterns/tables/pairs_table.tpl.html',
                "filter": 'my_patterns/filters/pairs_filters.tpl.html'},

            [
                {"table": 'my_patterns/tables/index_table.tpl.html',
                    "filter": 'my_patterns/filters/index_filters.tpl.html'},
                {"table": 'my_patterns/tables/pairs_index_table.tpl.html',
                    "filter": 'my_patterns/filters/index_filters.tpl.html'}
            ],

            {"table": 'my_patterns/tables/futures_table.tpl.html',
                "filter": 'my_patterns/filters/futures_filters.tpl.html'}
        ];


        $scope.setPage = function (page) {
            $scope.pagingOptions.currentPage = page;
            $scope.saveUrlParams();
        };

        $scope.toggleFavorite = function (patternId){
            var data = PatternsService.setFavorite(patternId).then(function (data) {
                $scope.loadPage();
            });
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
                    month: (restartMonth ? MonthSelectorService.restartDate() : $scope.filterOptions.filters.month),
                    favourite: false
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
            var data = PatternsService.getPagedDataAsync($scope.pagingOptions.currentPage, $scope.filterOptions.filters).then(function (data) {
                    $scope.myData = data.patterns;//data.page;
                    $scope.results = data.results;//data.results;
                    $scope.found = data.found;//data.found;
            });


        };
        /**
         *      make a petition of selectors, the selectors is an array of the selectors required from server
         */
        $scope.refreshSelectors = function (selectors,filters,callback) {
            PatternsService.getSelectors(filters, selectors,callback);
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
           // if ($scope.filterOptions.filters.selectedRegion === ""){
                $scope.filterOptions.filters.selectedMarket = "";
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
            $scope.restartFilter();
            $scope.saveUrlParams();

        };
        $scope.previousMonth = function () {
            $scope.filterOptions.filters.month = MonthSelectorService.addMonths(-1, $scope.filterOptions.filters.month);
            $scope.restartFilter();
            $scope.saveUrlParams();
        };
        //this function update the Month object in the filter from the value
        $scope.goToMonth = function () {
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

            $location.path('/patterns').search(urlParamsSend);
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
                //TEST
                selectedRegion: (typeof params.qregion !== "undefined" ? params.qregion : "" ),
                selectedMarket: (typeof params.qmarket !== "undefined" ? params.qmarket : "" )

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
                filters.month = MonthSelectorService.restartDate();
            }

            //if the tab changed, all the selectors must be reloaded (the markets could be diferents in pari and stocks for example)
            $scope.filterOptions.filters = filters;
            $scope.updateSelectorMonth();
            $scope.pagingOptions.currentPage = (params.pag ? params.pag : 1);
            if (tabChanged) {

                switch (TabsService.getActiveTab()) {
                    case 0:     //stocks
                        $scope.refreshSelectors(['regions', 'markets', 'industries', 'sectors'],filters, function(data) {
                            $scope.callBackRefreshSelectors(data);
                           // $scope.$broadcast("$loadSelectors");
                        });
                        break;
                    case 1:     //pairs
                        $scope.refreshSelectors(['regions', 'industries', 'sectors'],filters,function(data) {
                            $scope.callBackRefreshSelectors(data);
                           // $scope.$broadcast("$loadSelectors");
                        });
                        break;
                    case 2:     //index (pair and index)
                        break;
                    case 3:     //futures
                        $scope.refreshSelectors(['markets'],filters,function(data) {
                            $scope.callBackRefreshSelectors(data);
                           // $scope.$broadcast("$loadSelectors");
                        });
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
        $scope.myData = myPatternsData.patterns;
        $scope.results = myPatternsData.results;
        $scope.found = myPatternsData.found;


    })
    .service("PatternsService", function ($http, $window, $rootScope, $q) {

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

        this.setFavorite = function (patternId) {
            var deferred = $q.defer();
            var data;
            config = {
                params: {
                    'patternId': patternId,
                    'token': $window.sessionStorage.token
                }
            };
            var result = $http.get($rootScope.urlService+'/favoritepattern', config).then(function (response) {
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

            var result = $http.get($rootScope.urlService+'/patterns', config).then(function (response) {
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
                    'sector': filtering.selectedSector,
                    'industry': filtering.selectedIndustry,
                    'token': $window.sessionStorage.token,
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
    })



    .factory('MonthSelectorService', function () {
        var actualDate = {};

        return {

            getMonthName: function (date) {

                var monthString = "";
                switch (date.month) {
                    case 1:
                        monthString = "Enero";
                        break;
                    case 2:
                        monthString = "Febrero";
                        break;
                    case 3:
                        monthString = "Marzo";
                        break;
                    case 4:
                        monthString = "Abril";
                        break;
                    case 5:
                        monthString = "Mayo";
                        break;
                    case 6:
                        monthString = "Junio";
                        break;
                    case 7:
                        monthString = "Julio";
                        break;
                    case 8:
                        monthString = "Agosto";
                        break;
                    case 9:
                        monthString = "Septiembre";
                        break;
                    case 10:
                        monthString = "Octubre";
                        break;
                    case 11:
                        monthString = "Noviembre";
                        break;
                    case 12:
                        monthString = "Diciembre";
                        break;
                    default :
                        monthString = "notFound";
                        break;

                }
                return monthString;
            },
            restartDate: function () {
                var today = new Date();
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
            getListMonths: function () {
                var today = new Date();
                var monthList = [];
                //the list is 10 last months + actual month + next month
                var d = new Date(today.getFullYear(), today.getMonth() - 10, 1);
                for (i = 0; i < 12; i++) {
                    var d_act = (this.setDate(d));
                    monthList.push({
                        id: i,
                        value: d_act.value,
                        name: d_act.monthString + " " + d_act.year
                    });

                    d = new Date(d.getFullYear(), d.getMonth() + 1, 1);
                }
                return monthList;

            },
            getCalendarListMonths: function () {
                var today = new Date();
                var monthList = [];
                var d = new Date(today.getFullYear(), today.getMonth(), 1);
                //the list is actual month + next month
                for (i = 0; i < 2; i++) {
                    var d_act = (this.setDate(d));
                    monthList.push({
                        id: i,
                        value: d_act.value,
                        name: d_act.monthString + " " + d_act.year
                    });

                    d = new Date(d.getFullYear(), d.getMonth() + 1, 1);
                }
                return monthList;
            }
        };

    });