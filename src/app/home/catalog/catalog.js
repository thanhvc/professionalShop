angular.module('ngMo.catalog', [
    'ui.router',
    'ui.bootstrap'
])
    .config(function config($stateProvider) {
        $stateProvider.state('catalog', {
            url: '/catalog/:packCode',
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
                            index_type: "",
                            active_tab: "",
                            packCode: $stateParams.packCode
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

    .service('SelectedPackService', function ($http, $rootScope, $q, $state, $stateParams) {

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

            config = {
                params: {
                    'page': page,
                    'packCode': filtering.packCode
                }
            };

            var result = $http.get($rootScope.urlService + '/patternspack', config).then(function (response) {
                // With the data succesfully returned, call our callback
                deferred.resolve();
                return response.data;
            });
            return result;
        };
    })
    .controller('CatalogCtrl', function CatalogController($scope, ActualDateService, initializedData, $stateParams, TabsService,ActiveTabService) {
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
                    $scope.urlSearchCatalog = 'http://finance.yahoo.com/?q=' + input;
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
                active_tab: ActiveTabService.activeTab(),
                packCode: $stateParams.packCode
            },
            selectors: {
                sectors: [
                    {"id": 1, "description": "Sector1"},
                    {"id": 2, "description": "Sector2"}
                ],

                industries: [
                    {"id": 1, "description": "Industry1"},
                    {"id": 2, "description": "Industry2"}
                ]

            }
        };

        $scope.loadPatterns = function () {
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
                } else {
                    $scope.selectedTab = $scope.selectedPack.patternType;
                }
            });
        };

        $scope.setPage = function (page) {
            $scope.pagingOptions.currentPage = page;
            $scope.loadPatterns();
        };

        //if the preload input is already, dont load patterns..
        if ($scope.selectedPack == null) {
            $scope.loadPatterns();
        }

        $scope.getContentUrl = function () {
            return urlTemplatesCatalogTexts[$scope.selectedTab].url;
        };

    }
)

;

