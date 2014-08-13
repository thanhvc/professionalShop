/**
 * Created by laura on 6/06/14.
 */
angular.module('ngMo.my_subscriptions', [
    'ui.router'
])

    .config(function config($stateProvider) {
        $stateProvider.state('my-subscriptions', {
            url: '/my-subscriptions',
            views: {
                "main": {
                    controller: 'MySubscriptionsCtrl',
                    templateUrl: 'my_subscriptions/my_subscriptions.tpl.html'
                },
                "my-subscriptions-view@my-subscriptions": {
                    templateUrl: 'my_subscriptions/my-subscriptions-table.tpl.html'
                }
            },
            data: {
                pageTitle: 'Mis Suscripciones',
                selectMenu: 'my-subscriptions-nav',
                selectSubmenu: '',
                selectItemSubmenu: '',
                moMenuType: 'privateMenu',
                subPage: 'my-subscriptions'
            },
            resolve:{
                MonthSelectorService: "MonthSelectorService",
                TabsService: "TabsService",
                filtering : function(TabsService,MonthSelectorService){
                    return {
                        active_tab: TabsService.getActiveTab(),
                        month: MonthSelectorService.restartDate()
                    };
                },
                myPatternsData: function(MyPacksService, filtering) {
                    return MyPacksService.getPagedDataAsync(1, filtering).then(function (data){
                        return {
                            patterns: data.patterns,
                            results: data.results,
                            found: data.found
                        };

                    });
                }

            }
        })
            //substates of my-subscriptions
            .state('my-subscriptions.my-subscriptions', {
                url: '/my-subscriptions',
                views: {
                    "my-subscriptions-view": {
                        templateUrl: 'my_subscriptions/my-subscriptions-table.tpl.html'
                    }
                },
                data: {
                    subPage: 'my-subscriptions'
                }
            })
            .state('my-subscriptions.my-packs', {
                url: '/my-packs',
                views: {
                    "my-subscriptions-view": {
                        templateUrl: 'my_subscriptions/my-packs-table.tpl.html'
                    }
                },
                data: {
                    subPage: 'my-packs'
                }
            })



        ;
    })

    .run(function run() {
    })

   .service('MySubscriptionPacksService', function (){

        //Dummies Packs
        var americanPacks = [
            {
                id: 1,
                region: "Canada",
                market: "Toronto Stock",
                purchased: true,
                purchase: true,
                startDate: new Date(2014, 05, 01),
                duration: "Trimestral"
            },
            {
                id: 2,
                region: "Estados Unidos Pack I",
                market: "AMEX, NASDAQ",
                purchased: false,
                purchase: false,
                startDate: new Date(2014, 05, 01),
                duration: "Mensual"
            },
            {
                id: 3,
                region: "Estados Unidos Pack II",
                market: "AMEX, NASDAQ",
                purchased: false,
                purchase: false,
                startDate: new Date(2014, 05, 01),
                duration: "Anual"
            }
        ];

        var asiaPacks = [
            {
                id: 4,
                region: "Australia",
                market: "Australian SE, New Zealand SE",
                purchased: true,
                purchase: true,
                startDate: new Date(2014, 05, 01),
                duration: "Mensual"
            },
            {
                id: 5,
                region: "China",
                market: "Shanghai SE, Shenzhen SE",
                purchased: false,
                purchase: false,
                startDate: new Date(2014, 05, 01),
                duration: "Trimestral"
            },
            {
                id: 6,
                region: "Corea",
                market: "Korea SE, KOSDAQ",
                purchased: true,
                purchase: true,
                startDate: new Date(2014, 05, 01),
                duration: "Anual"
            },
            {
                id: 7,
                region: "Hong-Kong + Singapur",
                market: "Hong Kong SE, Singapore SE, Singapore Securities",
                purchased: false,
                purchase: false,
                startDate: new Date(2014, 05, 01),
                duration: "Mensual"
            }
        ];

        var europePacks = [
            {
                id: 8,
                region: "EURO Zona Pack I",
                market: "Alemania, Austria, Bélgica, España, Finlandia, Francia, Grecia, Irlanda, Italia, Luxemburgo, Países Bajos, Portugal",
                purchased: false,
                purchase: false,
                startDate: new Date(2014, 05, 01),
                duration: "Mensual"
            },
            {
                id: 9,
                region: "EURO Zona Pack II",
                market: "Alemania, Austria, Bélgica, España, Finlandia, Francia, Grecia, Irlanda, Italia, Luxemburgo, Países Bajos, Portugal",
                purchased: true,
                purchase: true,
                startDate: new Date(2014, 05, 01),
                duration: "Anual"
            },
            {
                id: 10,
                region: "EURO Zona Pack III",
                market: "Alemania, Austria, Bélgica, España, Finlandia, Francia, Grecia, Irlanda, Italia, Luxemburgo, Países Bajos, Portugal",
                purchased: false,
                purchase: false,
                startDate: new Date(2014, 05, 01),
                duration: "Anual"
            },
            {
                id: 11,
                region: "EURO Zona Pack IV",
                market: "Alemania, Austria, Bélgica, España, Finlandia, Francia, Grecia, Irlanda, Italia, Luxemburgo, Países Bajos, Portugal",
                purchased: false,
                purchase: false,
                startDate: new Date(2014, 05, 01),
                duration: "Trimestral"
            },
            {
                id: 12,
                region: "EURO Zona Pack V",
                market: "Alemania, Austria, Bélgica, España, Finlandia, Francia, Grecia, Irlanda, Italia, Luxemburgo, Países Bajos, Portugal",
                purchased: false,
                purchase: false,
                startDate: new Date(2014, 05, 01),
                duration: "Mensual"
            }
        ];

        var americanPairsPacks = [
            {
                id: 13,
                region: "Estados Unidos Pack I",
                market: "AMEX, NASDAQ, NYSE, Bulletin Board",
                purchased: false,
                purchase: false,
                startDate: new Date(2014, 05, 01),
                duration: "Mensual"
            },
            {
                id: 14,
                region: "Estados Unidos Pack II",
                market: "AMEX, NASDAQ, NYSE, Bulletin Board",
                purchased: true,
                purchase: true,
                startDate: new Date(2014, 05, 01),
                duration: "Mensual"
            },
            {
                id: 15,
                region: "Estados Unidos Pack III",
                market: "AMEX, NASDAQ, NYSE, Bulletin Board",
                purchased: true,
                purchase: true,
                startDate: new Date(2014, 05, 01),
                duration: "Mensual"
            }
        ];

        var asiaPairsPacks = [
            {
                id: 16,
                region: "Japón Pack I",
                market: "Fukuoka SE, Nagoya SE, Sapporo SE, Tokyo SE",
                purchased: false,
                purchase: false,
                startDate: new Date(2014, 05, 01),
                duration: "Anual"
            },
            {
                id: 17,
                region: "Japón Pack II",
                market: "Fukuoka SE, Nagoya SE, Sapporo SE, Tokyo SE",
                purchased: true,
                purchase: true,
                startDate: new Date(2014, 05, 01),
                duration: "Anual"
            },
            {
                id: 18,
                region: "Japón Pack III",
                market: "Fukuoka SE, Nagoya SE, Sapporo SE, Tokyo SE",
                purchased: false,
                purchase: false,
                startDate: new Date(2014, 05, 01),
                duration: "Trimestral"
            }
        ];

        var europePairsPacks = [
            {
                id: 19,
                region: "EURO Zona Pack I",
                market: "Alemania, Austria, Bélgica, España, Finlandia, Francia, Grecia, Irlanda, Italia, Luxemburgo, Países Bajos, Portugal",
                purchased: false,
                purchase: false,
                startDate: new Date(2014, 05, 01),
                duration: "Trimestral"
            },
            {
                id: 20,
                region: "EURO Zona Pack II",
                market: "Alemania, Austria, Bélgica, España, Finlandia, Francia, Grecia, Irlanda, Italia, Luxemburgo, Países Bajos, Portugal",
                purchased: false,
                purchase: false,
                startDate: new Date(2014, 05, 01),
                duration: "Mensual"
            },
            {
                id: 21,
                region: "EURO Zona Pack III",
                market: "Alemania, Austria, Bélgica, España, Finlandia, Francia, Grecia, Irlanda, Italia, Luxemburgo, Países Bajos, Portugal",
                purchased: false,
                purchase: false,
                startDate: new Date(2014, 05, 01),
                duration: "Anual"
            }
        ];

        var indicesPacks = [
            {
                id: 22,
                region: "Bolsa, Financieros, Materias Primas",
                market: "Global, Regional, Pais, Sectorial, Industrial. Tipos de Interés. Materias Primas",
                purchased: false,
                purchase: false,
                startDate: new Date(2014, 05, 01),
                duration: "Anual"
            }
        ];

        var pairs_indicesPacks = [
            {
                id: 23,
                region: "Bolsa",
                market: "Global, Regional, Pais, Sectorial, Industrial",
                purchased: true,
                purchase: true,
                startDate: new Date(2014, 05, 01),
                duration: "Trimestral"
            }
        ];

        var futuresPacks = [
            {
                id: 24,
                region: "Energía, Metales, Agrícolas, Carnes, Softs, Divisas, Tipos de Interés",
                market: "EUREX, Hong Kong Futures Exchanges, ICE Canada, ICE US, Korean Futures Exchange, Montreal Options Exchange, NYSE Euronext, Singapore Monetary Exchange, Sydney Futures Exchange, Chicago Board of Trade Futures, Chicago Board Options Exchange, Chicago Mercantile Exchange Futures, Kansas City Board of Trade Futures, Minneapolis Grain Exchange Futures, New York Mercantile Exchange Futures, ICE Europe",
                purchased: false,
                purchase: false,
                startDate: new Date(2014, 05, 01),
                duration: "Mensual"
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

    .service('MyPacksService', function($q,$http,$rootScope,$window,MonthSelectorService){
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
                    'year': filtering.month.year
                }
            };

            var result = $http.get($rootScope.urlService+'/pack',config).then(function (response) {
                // With the data succesfully returned, call our callback
                deferred.resolve();

                return response.data;
            });
            return result;
        };

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

        var stocksPacks = [
            {
                id: 1,
                packName: "Canada",
                startDate: new Date(2014, 05, 01),
                finishDate: new Date(2014, 11, 01)
            },
            {
                id: 2,
                packName: "Estados Unidos Pack I",
                startDate: new Date(2014, 05, 01),
                finishDate: new Date(2014, 11, 01)
            },
            {
                id: 3,
                packName: "Latino América Pack I",
                startDate: new Date(2014, 05, 01),
                finishDate: new Date(2014, 11, 01)
            }
        ];

        var pairsPacks = [
            {
                id: 1,
                packName: "Estados Unidos Pack I",
                startDate: new Date(2014, 05, 01),
                finishDate: new Date(2014, 11, 01)
            },
            {
                id: 2,
                packName: "Estados Unidos Pack II",
                startDate: new Date(2014, 05, 01),
                finishDate: new Date(2014, 11, 01)
            }
        ];

        var indicesPacks = [
            {
                id: 1,
                packName: "INDICES Pack I",
                startDate: new Date(2014, 05, 01),
                finishDate: new Date(2014, 11, 01)
            }
        ];

        var pairsIndicesPacks = [
            {
                id: 1,
                packName: "PARES INDICES Pack I",
                startDate: new Date(2014, 05, 01),
                finishDate: new Date(2014, 11, 01)
            }
        ];

        var futuresPacks = [
            {
                id: 1,
                packName: "Futures Pack I",
                startDate: new Date(2014, 05, 01),
                finishDate: new Date(2014, 11, 01)
            }
        ];
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
                title: 'Par Acciones',
                active: activeTab === 1,
                value: 1
            },
            {
                title: 'Índices',
                active: activeTab === 2,
                value: 2
            },
            {
                title: 'Futuros',
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
            return tabs;
        };

        this.getActiveTab = function () {
            return activeTab;
        };

        this.changeActiveTab = function (active) {
            activeTab = active;
        };
    })
    .controller('MySubscriptionsCtrl', function ($scope, MonthSelectorService,TabsService,PatternsService,ActiveTabService, MySubscriptionPacksService, IsLogged, MyPacksService,$window,$q,$rootScope,$http) {

        $scope.filterOptions = "";
        $scope.$on('$stateChangeStart', function (event, toState){
            IsLogged.isLogged();
        });

        $scope.$on('$stateChangeSuccess', function (event, toState, toParams, fromState, fromParams) {
            if (angular.isDefined(toState.data.pageTitle)) {
                $scope.pageTitle = toState.data.pageTitle + ' | Market Observatory';
                $scope.subPage = toState.data.subPage;
            }
        });

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
                    index_type: TabsService.getActiveIndexType(),
                    active_tab: TabsService.getActiveTab(),
                    //if month is set, we keep the value
                    month: (restartMonth ? MonthSelectorService.restartDate() : $scope.filterOptions.filters.month),
                    favourite: false
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
                    $scope.refreshSelectors(['regions', 'markets', 'industries', 'sectors']);
                    break;
                case 1:     //pairs
                    $scope.refreshSelectors(['regions', 'industries', 'sectors']);
                    break;
                case 2:     //index (pair and index)
                    break;
                case 3:     //futures
                    $scope.refreshSelectors(['markets']);
                    break;
            }

        };

        $scope.refreshSelectors = function (selectors) {
            PatternsService.getSelectors($scope.filterOptions.filters, selectors, function (data) {
                //checks the data received, when a selector is refreshed, the value selected is also cleaned

            });
        };

        $scope.pagingOptions = {
            pageSize: 10,
            currentPage: 1
        };

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

        $scope.loadPage = function () {
            var defer = $q.defer();
            var data = MyPacksService.getPagedDataAsync($scope.pagingOptions.currentPage, $scope.filterOptions.filters).then(function (data) {
                $scope.myData = data.packs;

            });

        };

        $scope.restartFilter();
        $scope.loadPage();

        $scope.mySubscriptionsTablePacks = [
            {
                title: 'Acciones',
                active: ActiveTabService.activeTab() === 0,
                value: 0,
                americaContent: MySubscriptionPacksService.obtainPacks('america'),
                asiaContent: MySubscriptionPacksService.obtainPacks('asia'),
                europeContent: MySubscriptionPacksService.obtainPacks('europe'),
                url: 'my_subscriptions/tables_packs/stock_table.tpl.html'
            },
            {
                title: 'Pares',
                active: ActiveTabService.activeTab() === 1,
                value: 1,
                americaContent: MySubscriptionPacksService.obtainPacks('americaPairs'),
                asiaContent: MySubscriptionPacksService.obtainPacks('asiaPairs'),
                europeContent: MySubscriptionPacksService.obtainPacks('europePairs'),
                url: 'my_subscriptions/tables_packs/pairs_table.tpl.html'
            },
            {
                title: 'Indices',
                active: ActiveTabService.activeTab() === 2,
                value: 2,
                indicesContent: MySubscriptionPacksService.obtainPacks('indices'),
                pairsIndicesContent: MySubscriptionPacksService.obtainPacks('pairs_indices'),
                url: 'my_subscriptions/tables_packs/indices_table.tpl.html'
            },
            {
                title: 'Futuros',
                active: ActiveTabService.activeTab() === 3,
                value: 3,
                futuresContent: MySubscriptionPacksService.obtainPacks('futures'),
                url: 'my_subscriptions/tables_packs/futures_table.tpl.html'
            }
        ];

        $scope.myPacksTablePacks = [
            {
                title: 'Acciones',
                active: ActiveTabService.activeTab() === 0,
                value: 0,
                content: MyPacksService.obtainPacks('stocks'),
                url: 'my_subscriptions/tables_my_packs/stock_table.tpl.html'
            },
            {
                title: 'Pares',
                active: ActiveTabService.activeTab() === 1,
                value: 1,
                content: MyPacksService.obtainPacks('pairs'),

                url: 'my_subscriptions/tables_my_packs/pairs_table.tpl.html'
            },
            {
                title: 'Índices',
                active: ActiveTabService.activeTab() === 2,
                value: 2,
                content: MyPacksService.obtainPacks('indices'),

                url: 'my_subscriptions/tables_my_packs/indices_table.tpl.html'
            },
            {
                title: 'Futuros',
                active: ActiveTabService.activeTab() === 3,
                value: 3,
                content: MyPacksService.obtainPacks('futures'),
                url: 'my_subscriptions/tables_my_packs/futures_table.tpl.html'
            }
        ];

    })

;