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

    })
    .service('ActualDateService', function ($http, $rootScope){
        this.actualDate = function(callbackFunc){
            var result = $http.get($rootScope.urlService+'/actualdate').success(function (data) {
                callbackFunc(data);
            });
        };

        this.actualWeek = function(callbackFunc){
            var result = $http.get($rootScope.urlService+'/numweek').success(function (data) {
                callbackFunc(data);
            });
        };

        this.nextDate = function(callbackFunc){
            var result = $http.get($rootScope.urlService+'/nextdate').success(function (data) {
                callbackFunc(data);
            });
        };

        this.actualDateForWeek = function(callbackFunc){
            var result = $http.get($rootScope.urlService+'/actualdateweek').success(function (data) {
                callbackFunc(data);
            });
        };

    })
    .service('PacksService', function ($http, $rootScope) {
        this.obtainPacks = function (callbackFunc) {
            var europePacks = $http.get($rootScope.urlService+'/homepacks').success(function (data) {
                callbackFunc(data);
            });
        };
    })



    //carousel functions
    .controller('HomeCtrl', function HomeController($scope, $templateCache, $rootScope, PacksService, ActiveTabService, SecondActiveTabService, AnchorLinkService, IsLogged, $state, $stateParams,$translatePartialLoader, $translate) {

        $scope.changePosCart = function () {
            $scope.positionCart = 'top';
        };
        $translatePartialLoader.addPart("home");
        $translate.refresh();
           //views allowed to no redirect, this views are states that load the homeCtrl for tooltips mainly,but dont need check logged status
        $scope.allowed_views= ['service_conditions','products_and_exchanges','summary','detailed_description','volatility'];
        $scope.$on('$stateChangeSuccess', function (event, toState, toParams, fromState, fromParams) {
            if (angular.isDefined(toState.data.pageTitle)) {
                $scope.pageTitle = toState.data.pageTitle + ' | Market Observatory';
            }
            if ($scope.allowed_views.indexOf($state.current.name) === -1) {
                IsLogged.isLogged(true);
            } else {
                IsLogged.isLogged(false);
            }

        });

        $scope.loading = false;
        //if the activated param is set, means that the homepage must show a special message for new users, this param  doesnt activate
        //any method, only shows the message. The activation of user is controlled in activate module
        $scope.justActivated = false;
        if ((typeof $stateParams.activated !== "undefined") && ($stateParams.activated != null))
        {
            $scope.justActivated = true;
        }

        $scope.myInterval = 6000;

        $scope.scrollTo = AnchorLinkService.scrollTo;
        $scope.tooltipOpinions = $templateCache.get("tooltips/opinion.tpl.html");
        $scope.tooltipReliability = $templateCache.get("tooltips/reliatibility.tpl.html");
        $scope.tooltipPeriods = $templateCache.get("tooltips/period.tpl.html");
        $scope.tooltipFact = $templateCache.get("tooltips/fact.tpl.html");

        $scope.myslides = [
            {
                image: 'assets/img/home/home-publi1.png',
                text: '¿Todavía se atreve a Invertir en Bolsa SIN VENTAJAS?'
            },
            {
                image: 'assets/img/home/home-publi2.png',
                text: '¿Son POCO RENTABLES sus Fondos de Inversión?'
            },
            {
                image: 'assets/img/home/home-publi3.png',
                text: '¿No SABE invertir en mercados BRICS y EMERGENTES?'
            },
            {
                image: 'assets/img/home/home-publi4.png',
                text: '¿Quiere ser Experto inversor en ETF\'s o CFD\'s?'
            },
            {
                image: 'assets/img/home/home-publi5.png',
                text: '¿DESCONTENTO con su Fondo de Pensiones?'
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
                "        <li class=\"info-carousel-texts\" ng-repeat=\"slide in slides()\" ng-class=\"{active: isActive(slide)}\" ng-click=\"open(slide)\" ng-mouseenter=\"select(slide)\">" +
                "</li>\n" +
                "    </ol>\n" +
                "    <div class=\"carousel-inner\" ng-transclude></div>\n" +
                "</div>\n" +
                "");

        $scope.tooltipFact = "<div class='custom-tooltip' style='width:300px;'><b>Hecho</b>:<br><p>Algo basado en datos verificables. Si adem&aacute;s el hecho es objetivo, la informaci&oacute;n debe ser completa y revelar todos los detalles.</p></div>";
        $scope.tooltipReliability = "<div class='custom-tooltip' style='width:640px'>En el contexto de Market Observatory, una <strong>Fiabilidad o frecuencia de aciertos 90%</strong> significa que:<br><p><ul class='public-list-first-level'>"+
            "<li class='listadoFlechas textoEstaticoPublicidad'>La mayor parte de los Patrones o estrategias publicadas tienen 0 fallos en 15 a&ntilde;os -frecuencia aciertos 100%- o 1 fallo en 15 a&ntilde;os -frecuencia 93%-</li>"+
            "<li class='listadoFlechas textoEstaticoPublicidad'>El resto de Patrones tiene 2 fallos en 15 a&ntilde;os -frecuencia aciertos del 87%-.</li>"+
            "</ul></p></div>";
        $scope.tooltipPeriodsHome = "<div class='custom-tooltip' style='width:640px'>En el contexto de Market Observatory, un <strong>Periodo &oacute;ptimo</strong> para invertir supone:<br>"+
            "<p><ul class='public-list-first-level'><li class='listadoFlechas textoEstaticoPublicidad'>Maximizar la rentabilidad, con la mayor fiabilidad de aciertos, minimizando"+
            "las p&eacute;rdidas en los a&ntilde;os con fallo y exponi&eacute;ndose al riesgo de mercado durante el menor tiempo posible.</li></ul></p></div>";
        $scope.tooltipOpinions = "<div class='custom-tooltip' style='width:300px'><b>Opini&oacute;n</b>:<br><p>Algo \"personal\" que se expresa y no se puede garantizar que sea verdad. Una opini&oacute;n es similar a una predicci&oacute;n.</p></div>";


        $scope.loadPacks = function () {
            $scope.loading = true;
            var data = PacksService.obtainPacks(function (data) {
                $scope.myData = data;//data.page;
                $scope.loading = false;
                $scope.homeTablePacks = [
                    {
                        title: 'STOCKS',
                        active: ActiveTabService.activeTab() === 0,
                        value: 0,
                        americaContent: $scope.myData.firstTable.STOCK.NALA,
                        asiaContent: $scope.myData.firstTable.STOCK.APAC,
                        europeContent: $scope.myData.firstTable.STOCK.EMEA,
                        url: 'home/tables_packs/stock_table.tpl.html'
                    },
                    {
                        title: 'PAIRS',
                        active: ActiveTabService.activeTab() === 1,
                        value: 1,
                        americaContent: $scope.myData.firstTable.STOCKPAIR.NALA,
                        asiaContent: $scope.myData.firstTable.STOCKPAIR.APAC,
                        europeContent: $scope.myData.firstTable.STOCKPAIR.EMEA,
                        url: 'home/tables_packs/pairs_table.tpl.html'
                    },
                    {
                        title: 'INDICES',
                        active: ActiveTabService.activeTab() === 2,
                        value: 2,
                        indicesContent: $scope.myData.firstTable.INDICE.INDEX,
                        pairsIndicesContent: $scope.myData.firstTable.INDICEPAIR.INDEX,
                        url: 'home/tables_packs/indices_table.tpl.html'
                    },
                    {
                        title: 'FUTURES',
                        active: ActiveTabService.activeTab() === 3,
                        value: 3,
                        futuresContent: $scope.myData.firstTable.FUTURE.FUTURE,
                        url: 'home/tables_packs/futures_table.tpl.html'
                    }
                ];


                if (typeof $scope.myData.secondTable !== "undefined")
                {
                    $scope.homeTablePacks2 = [
                        {
                            title: 'Acciones',
                            active: SecondActiveTabService.activeTab() === 0,
                            value: 0,
                            americaContent: $scope.myData.secondTable.STOCK.NALA,
                            asiaContent: $scope.myData.secondTable.STOCK.APAC,
                            europeContent: $scope.myData.secondTable.STOCK.EMEA,
                            url: 'home/tables_packs/second_stock_table.tpl.html'
                        },
                        {
                            title: 'Pares',
                            active: SecondActiveTabService.activeTab() === 1,
                            value: 1,
                            americaContent: $scope.myData.secondTable.STOCKPAIR.NALA,
                            asiaContent: $scope.myData.secondTable.STOCKPAIR.APAC,
                            europeContent: $scope.myData.secondTable.STOCKPAIR.EMEA,
                            url: 'home/tables_packs/second_pairs_table.tpl.html'
                        },
                        {
                            title: 'Indices',
                            active: SecondActiveTabService.activeTab() === 2,
                            value: 2,
                            indicesContent: $scope.myData.secondTable.INDICE.INDEX,
                            pairsIndicesContent: $scope.myData.secondTable.INDICEPAIR.INDEX,
                            url: 'home/tables_packs/second_indices_table.tpl.html'
                        },
                        {
                            title: 'Futuros',
                            active: SecondActiveTabService.activeTab() === 3,
                            value: 3,
                            futuresContent: $scope.myData.secondTable.FUTURE.FUTURE,
                            url: 'home/tables_packs/second_futures_table.tpl.html'
                        }
                    ];
                }

                if (!$scope.$$phase) {
                    $scope.$apply();
                }
            });
        };

        $scope.loadPacks();

    })


// Please note that $modalInstance represents a modal window (instance) dependency.
// It is not the same as the $modal service used above.
    .directive('carouselControllerProvider', function ($timeout, $modal) {
        return {
            link: function (scope, elem) {
                $timeout(function () {
                    var carousel = elem.find('div')[1];
                    var carouselCtrl = angular.element(carousel).isolateScope();
                    var _modal_ = $modal;
                    var origNext = carouselCtrl.next;
                    carouselCtrl.open = function ($scope) {
                        $scope.infoViews = [
                            {
                                src: 'home/info/majufuri_no_advantages.tpl.html'
                            },
                            {
                                src: 'home/info/syp_investment_funds.tpl.html'
                            },
                            {
                                src: 'home/info/shoprite_brics_and_emerging.tpl.html'
                            },
                            {
                                src: 'home/info/century_etf_cfd.tpl.html'
                            },
                            {
                                src: 'home/info/platinum_pension_fund.tpl.html'
                            },
                            {
                                src: 'home/info/hitachi_hedge_fund.tpl.html'
                            },
                            {
                                src: 'home/info/nyse_low_risk.tpl.html'
                            },
                            {
                                src: 'home/info/british_futures.tpl.html'
                            }

                        ];
                        var modalInstance = $modal.open({
                            templateUrl: 'home/modal.tpl.html',
                            controller: ModalInstanceCtrl,
                            resolve: {
                                infoViews: function () {
                                    return $scope.info_views;
                                },
                                infoSelected: function () {
                                    var items = elem.find('li');
                                    var i = 0;
                                    while (item = items[i]) {
                                        if (item.className.indexOf('active') >= 0) {
                                            return $scope.infoViews[i].src;
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
    .directive('homeTexts', function (ActiveTabService, SecondActiveTabService) {
        urlTemplatesHomeTexts = [
            {url: 'home/home_texts/stock_text.tpl.html'},
            {url: 'home/home_texts/pairs_text.tpl.html'},
            {url: 'home/home_texts/indices_text.tpl.html'},
            {url: 'home/home_texts/futures_text.tpl.html'}
        ];
        selectedTab = ActiveTabService.activeTab();

        secondSelectedTab = SecondActiveTabService.activeTab();
        return {
            controller: function ($scope) {
                $scope.onClickTab = function (idTab) {
                    if (idTab === ActiveTabService.activeTab()){
                        return;
                    }
                    selectedTab = ActiveTabService.changeActiveTab(idTab);
                };

                $scope.onClickSecondTab = function (idTab) {
                    if (idTab === SecondActiveTabService.activeTab()){
                        return;
                    }
                    secondSelectedTab = SecondActiveTabService.changeActiveTab(idTab);
                };
            },
            link: function ($scope) {
                $scope.getContentUrl = function () {
                    return urlTemplatesHomeTexts[selectedTab].url;
                };
            },
            template: '<div ng-include="getContentUrl()"></div>'
        };
    })

;
var ModalInstanceCtrl = function ($scope, $modalInstance, infoSelected) {
    $scope.infoSelected = infoSelected;

    $scope.close = function () {
        $modalInstance.close();
    };

    $scope.openNewWindow = function (url) {
        window.open("#/"+url, "_blank", "toolbar=yes, scrollbars=yes, resizable=yes, width=1000, height=700, top=120, left=500");
    };
};

