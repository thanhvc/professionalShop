angular.module('ngMo.catalog', [
    'ui.router',
    'ui.bootstrap'
])
    .config(function config($stateProvider) {
        $stateProvider.state('catalog', {
            url: '/catalog/:packCode/:month',
            views: {
                "main": {

                    templateUrl: 'home/catalog/catalog.tpl.html',
                    controller: 'CatalogCtrl'
                }
            },
            data: {
                pageTitle: 'Catalog',
                moMenuType: 'publicMenu'
            },
            resolve: {
                SelectedPackService: "SelectedPackService",
                initializedData: function (SelectedPackService, $stateParams, $state) {
                    pagingOptions = {
                        pageSize: 10,
                        currentPage: 1
                    };
                    filterOptions = {
                        filters: {
                            filterName: "",
                            selectedSector: "",
                            selectedIndustry: "",
                            volatilityInterval: "",
                            durationInterval: "",
                            index_type: "",
                            active_tab: "",
                            packCode: $stateParams.packCode,
                            month: $stateParams.month
                        }};
                    return SelectedPackService.obtainPatternsPack(pagingOptions.currentPage, filterOptions.filters).then(function (data) {

                        return {
                            pack: data.pack,
                            startDate: data.startDate,
                            patterns: data.patterns,
                            results: data.results,
                            found: data.found
                        };


                    });
                }
            }
        });
    })

    .service('SelectedPackService', function ($http, $rootScope, $q, $window, $state, $stateParams) {

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

        this.obtainPatternsPack = function (page, filtering) {
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
                    'packCode': filtering.packCode,
                    'month': filtering.month,
                    'year': filtering.month.year,
                    'name': filtering.filterName,
                    'sector': filtering.selectedSector,
                    'industry': filtering.selectedIndustry,
                    'volatilityInterval': filtering.volatilityInterval,
                    'durationInterval': filtering.durationInterval
                }
            };

            var result = $http.get($rootScope.urlService+'/patternspack', config).then(function (response) {
                // With the data succesfully returned, call our callback
                deferred.resolve();
                return response.data;
            });
            return result;
        };

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

            view = location.hash.replace("#/","");

            config = {
                params: {
                    'sector': filtering.selectedSector,
                    'industry': filtering.selectedIndustry,
                    'token': $window.sessionStorage.token,
                    'productType': parseInt(filtering.active_tab, 10),
                    'indexType': indexType,
                    'month': filtering.month.month,
                    'year': filtering.month.year,
                    'packCode': filtering.packCode,
                    'view': view.substring(0, (view.indexOf("/")))
                }
            };

            var result = $http.get($rootScope.urlService+'/patternfilters', config).success(function (data) {
                // With the data succesfully returned, call our callback
                callback(data);
            });
        };
    })
    .controller('CatalogCtrl', function CatalogController($scope, ActualDateService, initializedData, $stateParams, TabsService,ActiveTabService, SelectedPackService, $location) {
        var data = ActualDateService.actualDate(function (data) {
            $scope.actualDate = data.actualDate;
        });
        $scope.initialData = initializedData;

        $scope.generateSearchUrl = function (provider, input) {
            if (typeof input === 'undefined') {
                input = '';
            }
            switch (provider) {
                case 'Google':
                    $scope.urlSearchCatalog = 'https://www.google.com/finance?q=' + input;
                    break;
                case 'Yahoo':
                    $scope.urlSearchCatalog = 'http://finance.yahoo.com/q?s=' + input+"&ql=1";
                    break;
                case 'Bloomberg':
                    $scope.urlSearchCatalog = 'http://www.bloomberg.com/markets/symbolsearch?query=' + input;
                    break;
            }
            $scope.$watch('urlSearchCatalog', function () {

            });
        };

        urlTemplatesCatalogTexts = [
            {url: 'home/catalog/stocks_catalog.tpl.html'},
            {url: 'home/catalog/pairs_catalog.tpl.html'},
            {url: 'home/catalog/indices_catalog.tpl.html'},
            {url: 'home/catalog/futures_catalog.tpl.html'},
            {url: 'home/catalog/pairs_indices_catalog.tpl.html'}
        ];

        if (typeof $scope.initialData !== "undefined") {
            $scope.selectedPack = $scope.initialData.pack;
            if ($scope.selectedPack != null) {
                $scope.startDate = $scope.initialData.startDate;
                $scope.patterns = $scope.initialData.patterns;
                $scope.results = $scope.initialData.results;
                $scope.found = $scope.initialData.found;
                if ($scope.selectedPack.productType === 'INDICE') {
                    if ($scope.selectedPack.patternType === 1) {
                        $scope.selectedTab = 4;
                    } else {
                        $scope.selectedTab = 2;
                    }
                } else if ($scope.selectedPack.productType === 'FUTURE') {
                    $scope.selectedTab = 3;
                } else {
                    $scope.selectedTab = $scope.selectedPack.patternType;
                }
            }

        } else {
            $scope.selectedPack = null;
        }
        $scope.pagingOptions = {
            pageSize: 10,
            currentPage: 1
        };
        $scope.filterOptions = {
            filters: {
                filterName: "",
                selectedSector: "",
                selectedIndustry: "",
                volatilityInterval: "",
                durationInterval: "",
                index_type: TabsService.getActiveIndexType(),
                active_tab: ActiveTabService.activeTab(),
                packCode: $stateParams.packCode,
                month: $stateParams.month
            },
            selectors: {
                sectors: [
                ],

                industries: [
                ]

            }
        };

        $scope.loadPage = function () {
            var data = SelectedPackService.obtainPatternsPack($scope.pagingOptions.currentPage, $scope.filterOptions.filters).then(function (data) {
                $scope.selectedPack = data.pack;
                $scope.startDate = data.startDate;
                $scope.patterns = data.patterns;
                $scope.results = data.results;
                $scope.found = data.found;
                if ($scope.selectedPack.productType === 'INDICE') {
                    if ($scope.selectedPack.patternType === 1) {
                        $scope.selectedTab = 4;
                    } else {
                        $scope.selectedTab = 2;
                    }
                } else if ($scope.selectedPack.productType === 'FUTURE') {
                    $scope.selectedTab = 3;
                } else {
                    $scope.selectedTab = $scope.selectedPack.patternType;
                }
            });
        };

        $scope.loadFilters = function () {
            $scope.refreshSector();
        };

        $scope.search = function () {
            $scope.pagingOptions.currentPage = 1;
            $scope.loadPage();
        };

        $scope.setPage = function (page) {
            $scope.pagingOptions.currentPage = page;
            $scope.loadPage();
        };

        //if the preload input is already, dont load patterns..
        if ($scope.selectedPack == null) {
            $scope.loadPage();
        }

        $scope.getContentUrl = function () {
            return urlTemplatesCatalogTexts[$scope.selectedTab].url;
        };

        //only used in stock
        $scope.refreshSector = function () {
            $scope.refreshSelectors(['industries']);
        };
        $scope.selectSector = function () {
            $scope.refreshSector();
            $scope.applyFilters();
        };

        $scope.selectIndustry = function () {
            $scope.applyFilters();
        };

        /*apply filters to search, restarting the page*/
        $scope.applyFilters = function () {
            $scope.pagingOptions.currentPage = 1; //restart the page
            $scope.saveUrlParams();
        };

        $scope.saveUrlParams = function () {
            var urlParams = $scope.filterOptions.filters;
            urlParams.page = $scope.pagingOptions.currentPage;
            //we ask each param to include in the url or not
            var urlParamsSend = {};
            if (urlParams.filterName) {
                urlParamsSend.qname = urlParams.filterName;
            }

            if (urlParams.selectedSector) {
                urlParamsSend.qsector = urlParams.selectedSector;
            }

            if (urlParams.selectedIndustry) {
                urlParamsSend.qindust = urlParams.selectedIndustry;
            }

            if (urlParams.durationInput) {
                urlParamsSend.qdur = urlParams.durationInterval;
            }

            if (urlParams.volatilityInput) {
                urlParamsSend.qdur = urlParams.volatilityInterval;
            }

            urlParamsSend.pag = urlParams.page;

            $location.path('/catalog/:packCode/:month').search(urlParamsSend);
        };

        /*loads the default filters --> Filters has filters (inputs) and selectors (array of options to select)*/
        $scope.restartFilter = function () {

            $scope.filterOptions = {
                filters: {
                    filterName: "",
                    selectedSector: "",
                    selectedIndustry: "",
                    volatilityInterval: "",
                    durationInterval: "",
                    durationInput: "",
                    index_type: TabsService.getActiveIndexType(),
                    active_tab: ActiveTabService.activeTab(),
                    packCode: $stateParams.packCode,
                    month: $stateParams.month
                },
                selectors: {
                    sectors: [
                    ],

                    industries: [
                    ]

                }
            };

            //refresh all the selectors
            switch (TabsService.getActiveTab()) {
                case 0:     //stocks
                    $scope.refreshSelectors(['industries', 'sectors']);
                    break;
                case 1:     //pairs
                    $scope.refreshSelectors(['industries', 'sectors']);
                    break;
                case 2:     //index (pair and index)
                    break;
                case 3:     //futures
                    $scope.refreshSelectors(['sectors']);
                    break;
            }

        };


        /**
         *      make a petition of selectors, the selectors is an array of the selectors required from server
         */
        $scope.refreshSelectors = function (selectors) {
            SelectedPackService.getSelectors($scope.filterOptions.filters, selectors, function (data) {
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
            });
        };

        $scope.$on('$locationChangeSuccess', function (event, $stateParams) {
            $scope.loadFilters();
            $scope.loadPage();
        });
        $scope.restartFilter();
    }
)

;


