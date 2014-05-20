/**
 * Each section of the site has its own module. It probably also has
 * submodules, though this boilerplate is too simple to demonstrate it. Within
 * `src/app/home`, however, could exist several additional folders representing
 * additional modules that would then be listed as dependencies of this one.
 * For example, a `note` section could have the submodules `note.create`,
 * `note.delete`, `note.edit`, etc.
 *
 * Regardless, so long as dependencies are managed correctly, the build process
 * will automatically take take of the rest.
 *
 * The dependencies block here is also where component dependencies should be
 * specified, as shown below.
 */
angular.module('ngMo.home', [
    'ui.router',
    'ui.bootstrap'
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
                pageTitle: 'Catalog'
            }
        });
    })
    .service('ActualDateService', function (){
        this.actualDate = function(){
            return new Date();
        };
    })
    .service('PacksService', function ($sce){

        //Dummies Packs
        var americanPacks = [
            {
                "id": 1,
                "region": "Canada",
                "market": "Toronto Stock",
                "numberPatterns": "77"
            },
            {
                "id": 2,
                "region": "Estados Unidos Pack I",
                "market": "AMEX, NASDAQ",
                "numberPatterns": "83"
            },
            {
                "id": 3,
                "region": "Estados Unidos Pack II",
                "market": "AMEX, NASDAQ",
                "numberPatterns": "83"}
        ];

        var asiaPacks = [
            {
                "id": 4,
                "region": "Australia",
                "market": "Australian SE, New Zealand SE",
                "numberPatterns": "68"
            },
            {
                "id": 5,
                "region": "China",
                "market": "Shanghai SE, Shenzhen SE",
                "numberPatterns": "100"
            },
            {
                "id": 6,
                "region": "Corea",
                "market": "Korea SE, KOSDAQ",
                "numberPatterns": "100"
            },
            {
                "id": 7,
                "region": "Hong-Kong + Singapur",
                "market": "Hong Kong SE, Singapore SE, Singapore Securities",
                "numberPatterns": "100"
            }
        ];

        var europePacks = [
            {
                "id": 8,
                "region": "EURO Zona Pack I",
                "market": $sce.trustAsHtml("Alemania, Austria, B&eacute;lgica, Espa&ntilde;a, Finlandia, Francia, Grecia, Irlanda, Italia, Luxemburgo, Pa&iacute;ses Bajos, Portugal"),
                "numberPatterns": "100"
            },
            {
                "id": 9,
                "region": "EURO Zona Pack II",
                "market": $sce.trustAsHtml("Alemania, Austria, B&eacute;lgica, Espa&ntilde;a, Finlandia, Francia, Grecia, Irlanda, Italia, Luxemburgo, Pa&iacute;ses Bajos, Portugal"),
                "numberPatterns": "100"
            },
            {
                "id": 10,
                "region": "EURO Zona Pack III",
                "market": $sce.trustAsHtml("Alemania, Austria, B&eacute;lgica, Espa&ntilde;a, Finlandia, Francia, Grecia, Irlanda, Italia, Luxemburgo, Pa&iacute;ses Bajos, Portugal"),
                "numberPatterns": "100"
            },
            {
                "id": 11,
                "region": "EURO Zona Pack IV",
                "market": $sce.trustAsHtml("Alemania, Austria, B&eacute;lgica, Espa&ntilde;a, Finlandia, Francia, Grecia, Irlanda, Italia, Luxemburgo, Pa&iacute;ses Bajos, Portugal"),
                "numberPatterns": "100"
            },
            {
                "id": 12,
                "region": "EURO Zona Pack V",
                "market": $sce.trustAsHtml("Alemania, Austria, B&eacute;lgica, Espa&ntilde;a, Finlandia, Francia, Grecia, Irlanda, Italia, Luxemburgo, Pa&iacute;ses Bajos, Portugal"),
                "numberPatterns": "100"
            }
        ];

        var americanPairsPacks = [
            {
                "id": 13,
                "region": "Estados Unidos Pack I",
                "market": "AMEX, NASDAQ, NYSE, Bulletin Board",
                "numberPatterns": "100"
            },
            {
                "id": 14,
                "region": "Estados Unidos Pack II",
                "market": "AMEX, NASDAQ, NYSE, Bulletin Board",
                "numberPatterns": "100"
            },
            {
                "id": 15,
                "region": "Estados Unidos Pack III",
                "market": "AMEX, NASDAQ, NYSE, Bulletin Board",
                "numberPatterns": "100"
            }
        ];

        var asiaPairsPacks = [
            {
                "id": 16,
                "region": $sce.trustAsHtml("Jap&oacute;n Pack I"),
                "market": "Fukuoka SE, Nagoya SE, Sapporo SE, Tokyo SE",
                "numberPatterns": "100"
            },
            {
                "id": 17,
                "region": $sce.trustAsHtml("Jap&oacute;n Pack II"),
                "market": "Fukuoka SE, Nagoya SE, Sapporo SE, Tokyo SE",
                "numberPatterns": "100"
            },
            {
                "id": 18,
                "region": $sce.trustAsHtml("Jap&oacute;n Pack III"),
                "market": "Fukuoka SE, Nagoya SE, Sapporo SE, Tokyo SE",
                "numberPatterns": "100"
            }
        ];

        var europePairsPacks = [
            {
                "id": 19,
                "region": "EURO Zona Pack I",
                "market": $sce.trustAsHtml("Alemania, Austria, B&eacute;lgica, Espa&ntilde;a, Finlandia, Francia, Grecia, Irlanda, Italia, Luxemburgo, Pa&iacute;ses Bajos, Portugal"),
                "numberPatterns": "100"
            },
            {
                "id": 20,
                "region": "EURO Zona Pack II",
                "market": $sce.trustAsHtml("Alemania, Austria, B&eacute;lgica, Espa&ntilde;a, Finlandia, Francia, Grecia, Irlanda, Italia, Luxemburgo, Pa&iacute;ses Bajos, Portugal"),
                "numberPatterns": "100"
            },
            {
                "id": 21,
                "region": "EURO Zona Pack III",
                "market": $sce.trustAsHtml("Alemania, Austria, B&eacute;lgica, Espa&ntilde;a, Finlandia, Francia, Grecia, Irlanda, Italia, Luxemburgo, Pa&iacute;ses Bajos, Portugal"),
                "numberPatterns": "100"
            }
        ];

        var indicesPacks = [
            {
                "id": 22,
                "region": "Bolsa, Financieros, Materias Primas",
                "market": $sce.trustAsHtml("Global, Regional, Pais, Sectorial, Industrial. Tipos de Inter&eacute;s. Materias Primas"),
                "numberPatterns": "100"
            }
        ];

        var pairs_indicesPacks = [
            {
                "id": 23,
                "region": "Bolsa",
                "market": "Global, Regional, Pais, Sectorial, Industrial",
                "numberPatterns": "100"
            }
        ];

        var futuresPacks = [
            {
                "id": 24,
                "region": $sce.trustAsHtml("Energ&iacute;a, Metales, Agr&iacute;colas, Carnes, Softs, Divisas, Tipos de Inter&eacute;s"),
                "market": "EUREX, Hong Kong Futures Exchanges, ICE Canada, ICE US, Korean Futures Exchange, Montreal Options Exchange, NYSE Euronext, Singapore Monetary Exchange, Sydney Futures Exchange, Chicago Board of Trade Futures, Chicago Board Options Exchange, Chicago Mercantile Exchange Futures, Kansas City Board of Trade Futures, Minneapolis Grain Exchange Futures, New York Mercantile Exchange Futures, ICE Europe",
                "numberPatterns": "100"
            }
        ];
        //******

        this.obtainPacks = function (area) {
            switch (area){
                case 'america':
                    return americanPacks;
                case 'asia':
                    return asiaPacks;
                case 'europe':
                    return europePacks;
                case 'americaPairs':
                    return americanPairsPacks;
                case 'asiaPairs':
                    return asiaPairsPacks;
                case 'europePairs':
                    return europePairsPacks;
                case 'indices':
                    return indicesPacks;
                case 'pairs_indices':
                    return pairs_indicesPacks;
                case 'futures':
                    return futuresPacks;
            }
        };
    })

    .service('SelectedPackService', function ($sce){

        //Dummies Patterns Pack
        var patternsPack =
            {
                "id": 1,
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
                        "volatility": 406,
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
                "id": patternsPack.id,
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

    //carousel functions
    .controller('HomeCtrl', function HomeController($scope, $templateCache, $rootScope, PacksService, $sce, ActiveTabService) {
        $scope.myInterval = 6000;

        $scope.myslides = [
            {
                image: 'assets/img/home/home-publi1.png',
                text: '¿Todavía se atreve a Invertir en Bolsa SIN VENTAJAS?'
            },
            {
                image: 'assets/img/home/home-publi2.png',
                text: '¿Son POCO Rentables sus Fondos de Inversión?'
            },
            {
                image: 'assets/img/home/home-publi3.png',
                text: '¿No Sabe invertir en mercados BRICS y EMERGENTES?'
            },
            {
                image: 'assets/img/home/home-publi4.png',
                text: '¿Quiere ser Experto inversor en ETF\'s o CFD\'s?'
            },
            {
                image: 'assets/img/home/home-publi5.png',
                text: '¿Descontento con su FONDO de PENSIONES?'
            },
            {
                image: 'assets/img/home/home-publi6.png',
                text: '¡APRENDA a invertir como un Hedge Fund!'
            },
            {
                image: 'assets/img/home/home-publi7.png',
                text: '¿Busca estrategias rentables de BAJO RIESGO?'
            },
            {
                image: 'assets/img/home/home-publi8.png',
                text: '¿Opera en Futuros SIN Información PROFESIONAL?'
            }

        ];

        //Overwrite template Bootstrap UI carousel
        $templateCache.put("template/carousel/carousel.html",
                "<div ng-mouseenter=\"pause()\" ng-mouseleave=\"play()\" class=\"carousel\">\n" +
                "    <ol class=\"carousel-indicators\" ng-show=\"slides().length > 1\">\n" +
                "        <li class=\"advertising-carousel-texts\" ng-repeat=\"slide in slides()\" ng-class=\"{active: isActive(slide)}\" ng-click=\"open(slide)\" ng-mouseenter=\"select(slide)\">" +
                "</li>\n" +
                "    </ol>\n" +
                "    <div class=\"carousel-inner\" ng-transclude></div>\n" +
                "</div>\n" +
                "");

        $scope.tooltipFact = "<div style='width:780px'>Hecho:<br>Algo basado en datos verificables. Si adem&aacute;s el hecho es objetivo, la informaci&oacute;n debe ser completa y revelar todos los detalles.</div>";
        $scope.tooltipReliability = "<div style='width:640px'>En Market Observatory, una <strong>Fiabilidad o Frecuencia 90%</strong> de aciertos significa:<br><ul class='public-list-first-level'>"+
            "<li class='listadoFlechas textoEstaticoPublicidad'>La mayor parte de los Patrones o Estrategias publicadas en la Web tienen 0 fallos en 15 a&ntilde;os -fiabilidad 100%- o 1 fallo en 15 a&ntilde;os -fiabilidad del 93%-</li>"+
            "<li class='listadoFlechas textoEstaticoPublicidad'>El resto de Patrones tienen 2 fallos en 15 a&ntilde;os -fiabilidad del 87%-.</li>"+
        "</ul></div>";
        $scope.tooltipPeriods = "<div style='width:780px'>En Market Observatory, un <strong>Periodo &oacute;ptimo</strong> para invertir supone:<br>"+
         "<ul class='public-list-first-level'><li class='listadoFlechas textoEstaticoPublicidad'>Maximizar la rentabilidad, con la mayor frecuencia de aciertos, reduciendo las p&eacute;rdidas en los a&ntilde;os con fallo y exponi&eacute;ndose al riesgo de mercado durante el menor tiempo posible.</li></ul></div>";
        $scope.tooltipOpinions = "<div style='width:780px'>Opini&oacute;n:<br>Algo \"personal\" que se expresa y no se puede garantizar que sea verdad. Una opini&oacute;n es similar a una predicci&oacute;n.</div>";

        //Tabs home table Pack's
        $scope.homeTablePacks = [
            {
                title: 'Acciones',
                active: ActiveTabService.activeTab() === 0,
                value: 0,
                americaContent: PacksService.obtainPacks('america'),
                asiaContent: PacksService.obtainPacks('asia'),
                europeContent: PacksService.obtainPacks('europe'),
                url: 'home/tables_packs/stock_table.tpl.html'
            },
            {
                title: 'Pares',
                active: ActiveTabService.activeTab() === 1,
                value: 1,
                americaContent: PacksService.obtainPacks('americaPairs'),
                asiaContent: PacksService.obtainPacks('asiaPairs'),
                europeContent: PacksService.obtainPacks('europePairs'),
                url: 'home/tables_packs/pairs_table.tpl.html'
            },
            {
                title: 'Indices',
                active: ActiveTabService.activeTab() === 2,
                value: 2,
                indicesContent: PacksService.obtainPacks('indices'),
                pairsIndicesContent: PacksService.obtainPacks('pairs_indices'),
                url: 'home/tables_packs/indices_table.tpl.html'
            },
            {
                title: 'Futuros',
                active: ActiveTabService.activeTab() === 3,
                value: 3,
                futuresContent: PacksService.obtainPacks('futures'),
                url: 'home/tables_packs/futures_table.tpl.html'
            }
        ];

        $scope.actualDate = new Date();

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


// Please note that $modalInstance represents a modal window (instance) dependency.
// It is not the same as the $modal service used above.
.directive('carouselControllerProvider', function($timeout,$modal){
        return {
            link:function(scope, elem){
                $timeout(function(){
                    var carousel = elem.find('div')[1];
                    var carouselCtrl = angular.element(carousel).isolateScope();
                    var _modal_ = $modal;
                    var origNext = carouselCtrl.next;
                    carouselCtrl.open = function($scope){
                        $scope.advertisingViews = [
                            {
                                src: 'home/advertising/majufuri_no_advantages.tpl.html'
                            },
                            {
                                src: 'home/advertising/syp_investment_funds.tpl.html'
                            },
                            {
                                src: 'home/advertising/shoprite_brics_and_emerging.tpl.html'
                            },
                            {
                                src: 'home/advertising/century_etf_cfd.tpl.html'
                            },
                            {
                                src: 'home/advertising/platinum_pension_fund.tpl.html'
                            },
                            {
                                src: 'home/advertising/hitachi_hedge_fund.tpl.html'
                            },
                            {
                                src: 'home/advertising/nyse_low_risk.tpl.html'
                            },
                            {
                                src: 'home/advertising/british_futures.tpl.html'
                            }

                        ];
                        var modalInstance = $modal.open({
                            templateUrl: 'home/advertising_modal.tpl.html',
                            controller: ModalInstanceCtrl,
                            resolve: {
                                advertisingViews: function () {
                                    return $scope.advertising_views;
                                },
                                advertisingSelected: function () {
                                    var items = elem.find('li');
                                    var i = 0;
                                    while(item = items[i]) {
                                        if (item.className.indexOf('active') >= 0){
                                            return $scope.advertisingViews[i].src;
                                        }
                                        i++;
                                    }
                                }
                            }
                        });
                    };

                });
            }
        };
    })

    //home texts that change when change product type tab
    .directive('homeTexts',function (ActiveTabService){
        urlTemplatesHomeTexts = [
            {url: 'home/home_texts/stock_text.tpl.html'},
            {url: 'home/home_texts/pairs_text.tpl.html'},
            {url: 'home/home_texts/indices_text.tpl.html'},
            {url: 'home/home_texts/futures_text.tpl.html'}
        ];
        selectedTab = ActiveTabService.activeTab();
        return {
            controller: function($scope){
                $scope.onClickTab = function(idTab){
                    selectedTab =ActiveTabService.changeActiveTab(idTab);
                };
            },
            link: function($scope) {
                $scope.getContentUrl = function() {
                    return urlTemplatesHomeTexts[selectedTab].url;
                };
            },
            template: '<div ng-include="getContentUrl()"></div>'
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
var ModalInstanceCtrl = function ($scope, $modalInstance, advertisingSelected) {
    $scope.advertisingSelected = advertisingSelected;

    $scope.close = function () {
        $modalInstance.close();
    };
};

