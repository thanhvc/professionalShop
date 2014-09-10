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
                        month: MonthSelectorService.restartDate(),
                        index_type: TabsService.getActiveIndexType()
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

   .service('MySubscriptionPacksService', function ($q, $http, $window, $rootScope){

        this.obtainPacks = function (filtering) {
            var deferred = $q.defer();
            var indexType = null;

            if (typeof filtering.index_type !== "undefined") {
                indexType = parseInt(filtering.index_type, 10);
            } else {
                indexType = 0;
            }
            config = {
                params: {
                    'token': $window.sessionStorage.token
                }
            };

            var result = $http.get($rootScope.urlService+'/mysubscriptions', config).then(function (response) {
                // With the data succesfully returned, call our callback
                deferred.resolve();
                return response.data;
            });
            return result;
        };
    })

    .service('MyPacksService', function($q,$http,$rootScope,$window){
        this.getPagedDataAsync = function (page, filtering) {
            var deferred = $q.defer();
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

    .controller('MySubscriptionsCtrl', function ($scope, MonthSelectorService,TabsService,ActiveTabService, MySubscriptionPacksService, IsLogged, MyPacksService,$window,$q,$rootScope,$http) {

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
                    month: (restartMonth ? MonthSelectorService.restartDate() : $scope.filterOptions.filters.month)
                }

            };
            if (!$scope.filterOptions.months) {
                $scope.filterOptions.months = MonthSelectorService.getListMonths();
            }
            //the filter selectMonth keeps the selector right selected, we keep the month and the selector synchronized
            $scope.updateSelectorMonth();

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
            var data2 = MySubscriptionPacksService.obtainPacks($scope.filterOptions.filters).then(function (data) {
                $scope.myData = data.packs;

                $scope.mySubscriptionsTablePacks = [
                    {
                        title: 'Acciones',
                        active: ActiveTabService.activeTab() === 0,
                        value: 0,
                        americaContent: data.STOCK.NALA,
                        asiaContent: data.STOCK.APAC,
                        europeContent: data.STOCK.EMEA,
                        url: 'my_subscriptions/tables_packs/stock_table.tpl.html'
                    },
                    {
                        title: 'Pares',
                        active: ActiveTabService.activeTab() === 1,
                        value: 1,
                        americaPairContent: data.STOCKPAIR.NALA,
                        asiaPairContent: data.STOCKPAIR.APAC,
                        europePairContent: data.STOCKPAIR.EMEA,
                        url: 'my_subscriptions/tables_packs/pairs_table.tpl.html'
                    },
                    {
                        title: 'Indices',
                        active: ActiveTabService.activeTab() === 2,
                        value: 2,
                        indicesContent: data.INDICE.INDEX,
                        pairsIndicesContent: data.INDICEPAIR.INDEX,
                        url: 'my_subscriptions/tables_packs/indices_table.tpl.html'
                    },
                    {
                        title: 'Futuros',
                        active: ActiveTabService.activeTab() === 3,
                        value: 3,
                        futuresContent: data.FUTURE.FUTURE,
                        url: 'my_subscriptions/tables_packs/futures_table.tpl.html'
                    }
                ];

            });

        };
        $scope.restartFilter();
        $scope.loadPage();

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