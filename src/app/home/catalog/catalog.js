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

    .service('SelectedPackService', function ($state) {

        //Dummies Patterns Pack
        var patternsPack = [
            {   "id": 1,
                "region": "Canada",
                "patternType": "stock",
                "productType": 0,
                "startDate": "Mayo 2014", "date":"01/05/2014",
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
            },
            {
                "id": 2,
                "region": "Estados Unidos Pack I",
                "patternType": "stock",
                "productType": 0,
                "startDate": "Mayo 2014", "date":"01/05/2014",
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
                    }]
            },
            {
                "id": 3,
                "region": "Estados Unidos Pack II",
                "patternType": "stock",
                "productType": 0,
                "startDate": "Mayo 2014", "date":"01/05/2014",
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
                    }]
            },
            {
                "id": 4,
                "region": "Australia",
                "patternType": "stock",
                "productType": 0,
                "startDate": "Mayo 2014", "date":"01/05/2014",
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
                    }]
            },
            {
                "id": 5,
                "region": "China",
                "patternType": "stock",
                "productType": 0,
                "startDate": "Mayo 2014", "date":"01/05/2014",
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
                    }]
            },
            {
                "id": 6,
                "region": "Corea",
                "patternType": "stock",
                "productType": 0,
                "startDate": "Mayo 2014", "date":"01/05/2014",
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
                    }]
            },
            {
                "id": 7,
                "region": "Hong kong",
                "patternType": "stock",
                "productType": 0,
                "startDate": "Mayo 2014", "date":"01/05/2014",
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
                    }]
            },
            {
                "id": 8,
                "region": "Estados Unidos Pack I",
                "patternType": "stock",
                "productType": 0,
                "startDate": "Mayo 2014", "date":"01/05/2014",
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
                    }]
            },
            {
                "id": 9,
                "region": "Estados Unidos Pack I",
                "patternType": "stock",
                "productType": 0,
                "startDate": "Mayo 2014", "date":"01/05/2014",
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
                    }]
            },
            {
                "id": 10,
                "region": "Estados Unidos Pack I",
                "patternType": "stock",
                "productType": 0,
                "startDate": "Mayo 2014", "date":"01/05/2014",
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
                    }]
            },
            {
                "id": 11,
                "region": "Estados Unidos Pack I",
                "patternType": "stock",
                "productType": 0,
                "startDate": "Mayo 2014", "date":"01/05/2014",
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
                    }]
            },
            {
                "id": 12,
                "region": "Estados Unidos Pack I",
                "patternType": "stock",
                "productType": 0,
                "startDate": "Mayo 2014", "date":"01/05/2014",
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
                    }]
            },
            {
                "id": 13,
                "region": "Estados Unidos Pack I",
                "patternType": "pair",
                "productType": 1,
                "startDate": "Mayo 2014", "date":"01/05/2014",
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
                    }]
            },
            {
                "id": 14,
                "region": "Estados Unidos Pack I",
                "patternType": "pair",
                "productType": 1,
                "startDate": "Mayo 2014", "date":"01/05/2014",
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
                    }]
            },
            {
                "id": 15,
                "region": "Estados Unidos Pack I",
                "patternType": "pair",
                "productType": 1,
                "startDate": "Mayo 2014", "date":"01/05/2014",
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
                    }]
            },
            {
                "id": 16,
                "region": "Estados Unidos Pack I",
                "patternType": "pair",
                "productType": 1,
                "startDate": "Mayo 2014", "date":"01/05/2014",
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
                    }]
            },
            {
                "id": 17,
                "region": "Estados Unidos Pack I",
                "patternType": "pair",
                "productType": 1,
                "startDate": "Mayo 2014", "date":"01/05/2014",
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
                    }]
            },
            {
                "id": 18,
                "region": "Estados Unidos Pack I",
                "patternType": "pair",
                "productType": 1,
                "startDate": "Mayo 2014", "date":"01/05/2014",
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
                    }]
            },
            {
                "id": 19,
                "region": "Estados Unidos Pack I",
                "patternType": "pair",
                "productType": 1,
                "startDate": "Mayo 2014", "date":"01/05/2014",
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
                    }]
            },
            {
                "id": 20,
                "region": "Estados Unidos Pack I",
                "patternType": "pair",
                "productType": 1,
                "startDate": "Mayo 2014", "date":"01/05/2014",
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
                    }]
            },
            {
                "id": 21,
                "region": "Estados Unidos Pack I",
                "patternType": "pair",
                "productType": 1,
                "startDate": "Mayo 2014", "date":"01/05/2014",
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
                    }]
            },
            {
                "id": 22,
                "region": "Estados Unidos Pack I",
                "patternType": "index",
                "productType": 2,
                "startDate": "Mayo 2014", "date":"01/05/2014",
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
                    }]
            },
            {
                "id": 23,
                "region": "Estados Unidos Pack I",
                "patternType": "pairIndex",
                "productType": 3,
                "startDate": "Mayo 2014", "date":"01/05/2014",
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
                    }]
            },
            {
                "id": 24,
                "region": "Estados Unidos Pack I",
                "patternType": "future",
                "productType": 4,
                "startDate": "Mayo 2014", "date":"01/05/2014",
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
                    }]
            }
                ];

        this.obtainSelectedPack = function (page, numItemsPerPage) {
            var to = page * numItemsPerPage;
            var from = to - numItemsPerPage;
            /**
             * TODO: replace return patternsPack by http call
             */
            //return patternsPack;
             var i = null;
            for (j=0;j<patternsPack.length;j++) {
                if (patternsPack[j].id.toString() === $state.params.packId ) {
                    i = j;
                    break;
                }
            }
            if (i == null) {
                return;
            }
            var tempPatternPack = {
                "id": $state.params.packId,
                "region": patternsPack[i].region,
                "productType": patternsPack[i].productType,
                "startDate": patternsPack[i].startDate,
                "patternType": patternsPack[i].patternType,
                "numberPatterns": patternsPack[i].numberPatterns,
                "patterns": patternsPack[i].patterns,
                "date": patternsPack[i].date
            };

            return tempPatternPack;
        };

        this.obtainSelectedPatternsPack = function () {
            var i = null;
            for (j=0;j<patternsPack.length;j++) {
                if (patternsPack[j].id.toString() === $state.params.packId ) {
                    i = j;
                    break;
                }
            }
            if (i == null) {
                return;
            }
            var tempPatternPack = {
                "id": $state.params.packId,
                "region": patternsPack[i].region,
                "productType": patternsPack[i].productType,
                "startDate": patternsPack[i].startDate,
                "patternType": patternsPack[i].patternType,
                "numberPatterns": patternsPack[i].numberPatterns,
                "patterns": patternsPack[i].patterns,
                "date": patternsPack[i].date
            };

            return tempPatternPack;
        };
    })
    .controller('CatalogCtrl', function CatalogController($scope, ActualDateService) {
        $scope.actualDate = ActualDateService.actualDate();

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
    .directive('selectedPackCatalog', function (ActiveTabService) {
        urlTemplatesCatalogTexts = [
            {url: 'home/catalog/stocks_catalog.tpl.html'},
            {url: 'home/catalog/pairs_catalog.tpl.html'},
            {url: 'home/catalog/indices_catalog.tpl.html'},
            {url: 'home/catalog/futures_catalog.tpl.html'}
        ];

        return {

            controller: function ($scope, ShoppingCartService, SelectedPackService, $filter) {

                $scope.selectedAllPatternPack = SelectedPackService.obtainSelectedPatternsPack();

                $scope.selectedPack = SelectedPackService.obtainSelectedPack();


                /**
                 * TODO: Change pageSize to 10
                 */
                $scope.pageSize = 2;
                $scope.maxSize = 8;

                //filterName is used for pass custom filter name. Default undefined
                $scope.changeFilter = function (item, filterName) {
                    if (typeof filterName === 'undefined') {
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
                /**check**/
            },
            link: function ($scope) {
                $scope.getContentUrl = function () {
                    /*TODO: the url pages are not full, only works the stock page... */
                    //return urlTemplatesCatalogTexts[selectedTab].url;
                    return urlTemplatesCatalogTexts[0].url;
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
            switch (option) {
                case "<25":
                    angular.forEach(items, function (item) {
                        if (item.volatility < 25) {
                            tempPatterns.push(item);
                        }
                    });
                    return tempPatterns;
                case ">25<50":
                    angular.forEach(items, function (item) {
                        if (item.volatility >= 25 && item.volatility < 50) {
                            tempPatterns.push(item);
                        }
                    });
                    return tempPatterns;
                case ">50<75":
                    angular.forEach(items, function (item) {
                        if (item.volatility >= 50 && item.volatility < 75) {
                            tempPatterns.push(item);
                        }
                    });
                    return tempPatterns;
                case ">75":
                    angular.forEach(items, function (item) {
                        if (item.volatility > 75) {
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

