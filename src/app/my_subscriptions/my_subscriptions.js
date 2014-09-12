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
                    'token': $window.sessionStorage.token,
                    'month': filtering.month.month
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

            var result = $http.get($rootScope.urlService+'/pack',config).then(function (response) {
                // With the data succesfully returned, call our callback
                deferred.resolve();

                return response.data;
            });
            return result;
        };
    })

    .controller('MySubscriptionsCtrl', function ($scope, MonthSelectorService,TabsService,ActiveTabService, MySubscriptionPacksService, IsLogged, MyPacksService,$modal) {

        $scope.filterOptions = "";
        $scope.loading=false;
        $scope.$on('$stateChangeStart', function (event, toState){
            IsLogged.isLogged();
        });

        $scope.$on('$stateChangeSuccess', function (event, toState, toParams, fromState, fromParams) {
            if (angular.isDefined(toState.data.pageTitle)) {
                $scope.pageTitle = toState.data.pageTitle + ' | Market Observatory';
                $scope.subPage = toState.data.subPage;
            }
        });

        /*select option of re-buy or cancel pack*/
        $scope.selectOption = function(pack) {
            if (pack.orden === "1") {

                $scope.operationPack = pack;
                pack.orden = "";
                var modalInstanceLimit = $modal.open({
                    template: "<div class=\"modal-confirm-packs\"><div class=\"header-alert-portfolio\">Aviso <img class=\"close-alert-portfolio\" " +
                        " src=\"assets/img/close_modal.png\" ng-click=\"close()\"></div><div class=\"modal-confirm-packs-body\">" +
                        "Está seguro que desea realizar la devolución de la suscripción {{operationPack.name}} que finaliza en {{operationPack.endDate | date: 'MMMM yyyy'}}" +
                        "</div> <div style='padding-top: 20px; width: 200px; margin: 0 auto;'> <button class='mo-button' style='margin-right: 5px; ' ng-click='confirm();'>Confirmar</button> <button ng-click='close();' class='mo-button'>cancelar</button></button></div></div>",
                    controller: ModalMyPackstCtrl,
                    resolve: {
                        operationPack: function () {
                            return $scope.operationPack;
                        }
                    }
                });
            }

        };

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
                $scope.filterOptions.months = MonthSelectorService.getMySubscriptionsListMonth();
            }
            //the filter selectMonth keeps the selector right selected, we keep the month and the selector synchronized
            $scope.updateSelectorMonth();

        };

        $scope.durations = [
            {
                value: 0,
                text: 'Mensual'
            },
            {
                value: 1,
                text: 'Trimestral'
            },
            {
                value: 2,
                text: 'Anual'
            }
        ];

        //this function update the Month object in the filter from the value
        $scope.goToMonth = function () {
            var date = $scope.filterOptions.filters.selectMonth.value.split("_");
            var d = new Date(date[1], date[0] - 1, 1);
            $scope.filterOptions.filters.month = MonthSelectorService.setDate(d);
            $scope.loadPage();
        };
        //synchronize the selector with the month of the filter
        $scope.updateSelectorMonth = function () {
            for (i = 0; i < $scope.filterOptions.months.length; i++) {
                if ($scope.filterOptions.months[i].value === $scope.filterOptions.filters.month.value) {
                    $scope.filterOptions.filters.selectMonth = $scope.filterOptions.months[i];
                }
            }
        };

        $scope.loadPage = function () {
            $scope.loading = true;
            var data = MyPacksService.obtainPacks($scope.filterOptions.filters).then(function (data) {

                $scope.myPacksTablePacks = [
                    {
                        title: 'Acciones',
                        active: ActiveTabService.activeTab() === 0,
                        value: 0,
                        content: data.STOCK,
                        url: 'my_subscriptions/tables_my_packs/stock_table.tpl.html'
                    },
                    {
                        title: 'Pares',
                        active: ActiveTabService.activeTab() === 1,
                        value: 1,
                        content: data.STOCKPAIR,
                        url: 'my_subscriptions/tables_my_packs/pairs_table.tpl.html'
                    },
                    {
                        title: 'Índices',
                        active: ActiveTabService.activeTab() === 2,
                        value: 2,
                        content: data.INDICE,
                        pairContent: data.INDICEPAIR,
                        url: 'my_subscriptions/tables_my_packs/indices_table.tpl.html'
                    },
                    {
                        title: 'Futuros',
                        active: ActiveTabService.activeTab() === 3,
                        value: 3,
                        content: data.FUTURE,
                        url: 'my_subscriptions/tables_my_packs/futures_table.tpl.html'
                    }
                ];
            });

            var data2 = MySubscriptionPacksService.obtainPacks($scope.filterOptions.filters).then(function (data) {
                $scope.loading = false;
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

    })

;


var ModalMyPackstCtrl = function ($scope, $modalInstance,$state,$stateParams, operationPack) {

    $scope.operationPack = operationPack;
    $scope.close = function () {
        $modalInstance.close();
    };

    $scope.confirm = function() {
        $modalInstance.close();
        $state.go('cancel-pack',{packCode: $scope.operationPack.code, subCode: $scope.operationPack.sub});
    };

};