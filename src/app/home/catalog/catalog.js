angular.module('ngMo.catalog', [
    'ui.router'
])
    .config(function config($stateProvider) {
        $stateProvider.state('catalog', {
            url: '/catalog/:packId',
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

    .service('SelectedPackService', function ($state){

        //Dummies Patterns Pack
        var patternsPack =
        {
            "id": $state.params.packId,
            "region": "Canada",
            "productType": 0,
            "startDate": "Mayo 2014",
            "numberPatterns": 77,
            "patterns": [
                {
                    "name": "ABACUS MINING & EXPLORATION CORPO",
                    "market": "TSXV",
                    "sector": "",
                    "industry": "",
                    "gain": 15,
                    "lost": 0,
                    "accumulated": 298,
                    "average": 19.88,
                    "duration": "Hasta 1",
                    "volatility": 40,
                    "state": "Sin Comenzar"
                },
                {
                    "name": "ABCOURT MINES INC.",
                    "market": "TSXV",
                    "sector": "",
                    "industry": "",
                    "gain": 15,
                    "lost": 0,
                    "accumulated": 235,
                    "average": 15.64,
                    "duration": "De 1 a 3",
                    "volatility": 10,
                    "state": "Comenzado"
                },
                {
                    "name": "ABEN RESOURCES LTD.",
                    "market": "TSXV",
                    "sector": "",
                    "industry": "",
                    "gain": 14,
                    "lost": 1,
                    "accumulated": 379,
                    "average": 25.27,
                    "duration": "De 1 a 3",
                    "volatility": 70,
                    "state": "Finalizado"
                },
                {
                    "name": "TOTAL TELCOM INC.",
                    "market": "TSXV",
                    "sector": "Information Technology",
                    "industry": "Communication",
                    "gain": 15,
                    "lost": 0,
                    "accumulated": 422,
                    "average": 28.1,
                    "duration": "Mas de 3",
                    "volatility": 302,
                    "state": "Comenzado"
                }
            ]
        };

        this.obtainSelectedPack = function (page, numItemsPerPage) {
            var to = page*numItemsPerPage;
            var from = to-numItemsPerPage;
            /**
             * TODO: replace return patternsPack by http call
             */
            //return patternsPack;
            var tempPatternPack = {
                "id": $state.params.packId,
                "region": patternsPack.region,
                "productType": patternsPack.productType,
                "startDate": patternsPack.startDate,
                "numberPatterns": patternsPack.numberPatterns,
                "patterns": []
            };

            return tempPatternPack;
        };

        this.obtainSelectedPatternsPack = function () {
            return patternsPack;
        };
    })
    .controller('CatalogCtrl', function CatalogController($scope, ActualDateService){
        var data = ActualDateService.actualDate(function (data) {
            $scope.actualDate = data.actualDate;
        });

        $scope.generateSearchUrl = function (provider, input) {
            if (typeof input === 'undefined'){
                input = '';
            }
            switch (provider){
                case 'Google':
                    $scope.urlSearchCatalog = 'https://www.google.com/finance?q='+input;
                    break;
                case 'Yahoo':
                    $scope.urlSearchCatalog = 'http://finance.yahoo.com/?q='+input;
                    break;
                case 'Bloomberg':
                    $scope.urlSearchCatalog = 'http://www.bloomberg.com/markets/symbolsearch?query='+input;
                    break;
            }
            $scope.$watch('urlSearchCatalog', function () {

            });
        };
    })

    //pack selected catalog
    .directive('selectedPackCatalog',function (ActiveTabService){
        urlTemplatesCatalogTexts = [
            {url: 'home/catalog/stocks_catalog.tpl.html'},
            {url: 'home/catalog/pairs_catalog.tpl.html'},
            {url: 'home/catalog/indices_catalog.tpl.html'},
            {url: 'home/catalog/futures_catalog.tpl.html'}
        ];

        return {

            controller: function($scope, ShoppingCartService, SelectedPackService, $filter){

                $scope.selectedAllPatternPack = SelectedPackService.obtainSelectedPatternsPack();

                $scope.selectedPack=SelectedPackService.obtainSelectedPack();


                /**
                 * TODO: Change pageSize to 10
                 */
                $scope.pageSize = 2;
                $scope.maxSize = 8;

                //filterName is used for pass custom filter name. Default undefined
                $scope.changeFilter = function (item,filterName) {
                    if (typeof filterName === 'undefined'){
                        filterName = 'filter';
                    }
                    $scope.currentPage = 1;
                    $scope.selectedPack.patterns = $filter(filterName)($scope.selectedAllPatternPack.patterns, item);
                    $scope.totalItems = $scope.selectedPack.patterns.length;
                };

                /**
                 * TODO: selectedTab should be obtained for the selectedPack (productType)
                 */
                selectedTab = $scope.selectedPack.productType;
            },
            link: function($scope) {
                $scope.getContentUrl = function() {
                    return urlTemplatesCatalogTexts[selectedTab].url;
                };
                $scope.changeFilter('');
            },
            template: '<div ng-include="getContentUrl()"></div>'
        };
    })

    //filter catalog volatility by range
    .filter('VolatilityCatalogFilter', function () {
        return function (items, option) {
            var tempPatterns = [];
            switch (option){
                case "<25":
                    angular.forEach(items, function (item) {
                        if (item.volatility < 25){
                            tempPatterns.push(item);
                        }
                    });
                    return tempPatterns;
                case ">25<50":
                    angular.forEach(items, function (item) {
                        if (item.volatility >= 25 && item.volatility < 50){
                            tempPatterns.push(item);
                        }
                    });
                    return tempPatterns;
                case ">50<75":
                    angular.forEach(items, function (item) {
                        if (item.volatility >= 50 && item.volatility < 75){
                            tempPatterns.push(item);
                        }
                    });
                    return tempPatterns;
                case ">75":
                    angular.forEach(items, function (item) {
                        if (item.volatility > 75){
                            tempPatterns.push(item);
                        }
                    });
                    return tempPatterns;
            }
            return items;
        };
    })

    //filter for offset items
    .filter('startFrom', function () {
        return function (input, start) {
            start = +start; //parse to int
            return input.slice(start);
        };
    })


;

