angular.module('ngMo.catalog', [
    'ui.router'
])
    .config(function config($stateProvider) {
        $stateProvider.state('catalog', {
            url: '/catalog/:packCode/:month',
            views: {
                "main": {
                    controller: 'HomeCtrl',
                    templateUrl: 'home/catalog/catalog.tpl.html'
                }
            },
            data: {
                pageTitle: 'Catalog',
                moMenuType: 'publicMenu'
            }
        });
    })

    .service('SelectedPackService', function ($http, $rootScope, $q, $state) {

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
                    'packCode': $state.params.packCode,
                    'month': $state.params.month
                }
            };

            var result = $http.get($rootScope.urlService+'/patternspack', config).then(function (response) {
                // With the data succesfully returned, call our callback
                deferred.resolve();
                return response.data;
            });
            return result;
        };
    })
    .controller('CatalogCtrl', function CatalogController($scope, ActualDateService){
        var data = ActualDateService.actualDate(function (data) {
            $scope.actualDate = data.actualDate;
        });

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
    })

    //pack selected catalog
    .directive('selectedPackCatalog', function () {
        urlTemplatesCatalogTexts = [
            {url: 'home/catalog/stocks_catalog.tpl.html'},
            {url: 'home/catalog/pairs_catalog.tpl.html'},
            {url: 'home/catalog/indices_catalog.tpl.html'},
            {url: 'home/catalog/futures_catalog.tpl.html'},
            {url: 'home/catalog/pairs_indices_catalog.tpl.html'}
        ];

        return {

            controller: function ($scope, ShoppingCartService, SelectedPackService, TabsService, ActiveTabService) {

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
                        active_tab: ActiveTabService.activeTab()
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
                        if ($scope.selectedPack.productType === 'INDICE'){
                            if ($scope.selectedPack.patternType === 1) {
                                $scope.selectedTab = 4;
                            }
                        }
                    });
                };

                $scope.setPage = function (page) {
                    $scope.pagingOptions.currentPage = page;
                    $scope.loadPatterns();
                };

                $scope.loadPatterns();

                $scope.selectedTab = ActiveTabService.activeTab();

            },
            link: function ($scope) {
                $scope.getContentUrl = function () {
                    return urlTemplatesCatalogTexts[$scope.selectedTab].url;
                };
            },
            template: '<div ng-include="getContentUrl()"></div>'
        };
    })
;

