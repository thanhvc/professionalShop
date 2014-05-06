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

    .service('PacksService', function (){

        //Dummies Packs
        var americanPacks = [
            {"region": "Canada", "market": "Toronto Stock", "numberPatterns": "77"},
            {"region": "Estados Unidos Pack I", "market": "AMEX, NASDAQ", "numberPatterns": "83"},
            {"region": "Estados Unidos Pack II", "market": "AMEX, NASDAQ", "numberPatterns": "83"}
        ];

        var asiaPacks = [
            {"region": "Australia", "market": "Australian SE, New Zealand SE", "numberPatterns": "68"},
            {"region": "China", "market": "Shanghai SE, Shenzhen SE", "numberPatterns": "100"},
            {"region": "Corea", "market": "Korea SE, KOSDAQ", "numberPatterns": "100"},
            {"region": "Hong-Kong + Singapur", "market": "Hong Kong SE, Singapore SE, Singapore Securities", "numberPatterns": "100"}
        ];

        var europePacks = [
            {"region": "EURO Zona Pack I", "market": "Alemania, Austria, B&eacute;lgica, Espa&ntilde;a, Finlandia, Francia, Grecia, Irlanda, Italia, Luxemburgo, Pa&iacute;ses Bajos, Portugal", "numberPatterns": "100"},
            {"region": "EURO Zona Pack II", "market": "Alemania, Austria, B&eacute;lgica, Espa&ntilde;a, Finlandia, Francia, Grecia, Irlanda, Italia, Luxemburgo, Pa&iacute;ses Bajos, Portugal", "numberPatterns": "100"},
            {"region": "EURO Zona Pack III", "market": "Alemania, Austria, B&eacute;lgica, Espa&ntilde;a, Finlandia, Francia, Grecia, Irlanda, Italia, Luxemburgo, Pa&iacute;ses Bajos, Portugal", "numberPatterns": "100"},
            {"region": "EURO Zona Pack IV", "market": "Alemania, Austria, B&eacute;lgica, Espa&ntilde;a, Finlandia, Francia, Grecia, Irlanda, Italia, Luxemburgo, Pa&iacute;ses Bajos, Portugal", "numberPatterns": "100"},
            {"region": "EURO Zona Pack V", "market": "Alemania, Austria, B&eacute;lgica, Espa&ntilde;a, Finlandia, Francia, Grecia, Irlanda, Italia, Luxemburgo, Pa&iacute;ses Bajos, Portugal", "numberPatterns": "100"}
        ];

        var indicesPacks = [
            {"region": "Bolsa, Financieros, Materias Primas", "market": "Global, Regional, Pais, Sectorial, Industrial. Tipos de Interés. Materias Primas", "numberPatterns": "100"}
        ];

        var pairs_indicesPacks = [
            {"region": "Bolsa", "market": "Global, Regional, Pais, Sectorial, Industrial", "numberPatterns": "100"}
        ];

        var futuresPacks = [
            {"region": "Energía, Metales, Agrícolas, Carnes, Softs, Divisas, Tipos de Interés", "market": "EUREX, Hong Kong Futures Exchanges, ICE Canada, ICE US, Korean Futures Exchange, Montreal Options Exchange, NYSE Euronext, Singapore Monetary Exchange, Sydney Futures Exchange, Chicago Board of Trade Futures, Chicago Board Options Exchange, Chicago Mercantile Exchange Futures, Kansas City Board of Trade Futures, Minneapolis Grain Exchange Futures, New York Mercantile Exchange Futures, ICE Europe", "numberPatterns": "100"}
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
                case 'indices':
                    return indicesPacks;
                case 'pairs_indices':
                    return pairs_indicesPacks;
                case 'futures':
                    return futuresPacks;
            }
            futuresPacks.j
        };
    })

    //carousel functions
    .controller('HomeCtrl', function HomeController($scope, $templateCache, $rootScope, PacksService) {
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
         "Maximizar la rentabilidad, con la mayor frecuencia de aciertos, reduciendo las p&eacute;rdidas en los a&ntilde;os con fallo y exponi&eacute;ndose al riesgo de mercado durante el menor tiempo posible.</div>";
        $scope.tooltipOpinions = "<div style='width:780px'>Opini&oacute;n:<br>Algo \"personal\" que se expresa y no se puede garantizar que sea verdad. Una opini&oacute;n es similar a una predicci&oacute;n.</div>";

        //Tabs home table Pack's
        $scope.homeTablePacks = [
            {
                title: 'Acciones',
                value: 0,
                americaContent: 'tabla Acciones',
                asiaContent: 'tabla Acciones',
                europeContent: 'tabla Acciones',
                url: 'home/tables_packs/stock_table.tpl.html'
            },
            {
                title: 'Pares',
                value: 1,
                americaContent: 'tabla Pares',
                asiaContent: 'tabla Pares',
                europeContent: 'tabla Pares',
                url: 'home/tables_packs/pairs_table.tpl.html'
            },
            {
                title: 'Indices',
                value: 2,
                indicesContent: 'tabla Indices',
                pairsIndicesContent: 'tabla Indices',
                url: 'home/tables_packs/indices_table.tpl.html'
            },
            {
                title: 'Futuros',
                value: 3,
                futuresContent: 'tabla Futuros',
                url: 'home/tables_packs/futures_table.tpl.html'
            }
        ];

        //obtainPacks(area)
        $scope.homeTablePacks[0].americaContent = PacksService.obtainPacks('america');
        $scope.homeTablePacks[0].asiaContent = PacksService.obtainPacks('asia');
        $scope.homeTablePacks[0].europeContent = PacksService.obtainPacks('europe');

        $scope.homeTablePacks[1].americaContent = PacksService.obtainPacks('america');
        $scope.homeTablePacks[1].asiaContent = PacksService.obtainPacks('asia');
        $scope.homeTablePacks[1].europeContent = PacksService.obtainPacks('europe');

        $scope.homeTablePacks[2].indicesContent = PacksService.obtainPacks('indices');
        $scope.homeTablePacks[2].pairsIndicesContent = PacksService.obtainPacks('pairs_indices');

        $scope.homeTablePacks[3].futuresContent = PacksService.obtainPacks('futures');

        $scope.actualDate = new Date();


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
    .directive('homeTexts',function (){
        urlTemplatesHomeTexts = [
            {url: 'home/home_texts/stock_text.tpl.html'},
            {url: 'home/home_texts/pairs_text.tpl.html'},
            {url: 'home/home_texts/indices_text.tpl.html'},
            {url: 'home/home_texts/futures_text.tpl.html'}
        ];
        selectedTab = 0;
        return {
            controller: function($scope){
                $scope.onClickTab = function(idTab){
                    selectedTab = idTab;
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

;
var ModalInstanceCtrl = function ($scope, $modalInstance, advertisingSelected) {
    $scope.advertisingSelected = advertisingSelected;

    $scope.close = function () {
        $modalInstance.close();
    };
};

