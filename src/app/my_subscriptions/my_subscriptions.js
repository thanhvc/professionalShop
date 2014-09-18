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
                        templateUrl: 'my_subscriptions/my-subscriptions-table.tpl.html',
                        controller: "MySubsCtrl"
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
                        templateUrl: 'my_subscriptions/my-packs-table.tpl.html',
                        controller: "MyPacksCtrl"
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
        this.obtainPacks = function () {
            var deferred = $q.defer();
            var indexType = null;

            /*if (typeof filtering.index_type !== "undefined") {
                indexType = parseInt(filtering.index_type, 10);
            } else {
                indexType = 0;
            }*/
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
    .controller('MySubscriptionsCtrl',function ($scope,$rootScope, MonthSelectorService,TabsService,ActiveTabService, MySubscriptionPacksService, IsLogged, MyPacksService,$modal,ShoppingCartService,$filter) {
        $scope.$on('$stateChangeSuccess', function (event, toState, toParams, fromState, fromParams) {
            if (angular.isDefined(toState.data.pageTitle)) {
                $scope.pageTitle = toState.data.pageTitle + ' | Market Observatory';
                $scope.subPage = toState.data.subPage;
            }
        });
    })
    .controller('MyPacksCtrl', function ($scope,$rootScope, MonthSelectorService,TabsService,ActiveTabService, MySubscriptionPacksService, IsLogged, MyPacksService,$modal,ShoppingCartService,$filter) {
        $scope.$on('$stateChangeSuccess', function (event, toState, toParams, fromState, fromParams) {
            if (angular.isDefined(toState.data.pageTitle)) {
                $scope.pageTitle = toState.data.pageTitle + ' | Market Observatory';
                $scope.subPage = toState.data.subPage;
            }
        });

        $scope.loadPage = function() {
            $scope.loading = true;
            var data = MyPacksService.obtainPacks().then(function (data) {

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


                $scope.loading = false;

            });

        };

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
        $scope.loadPage();
    })

    .controller('MySubsCtrl', function ($scope,$rootScope, MonthSelectorService,TabsService,ActiveTabService, MySubscriptionPacksService, IsLogged, MyPacksService,$modal,ShoppingCartService,$filter) {


        $scope.mySubscriptionsTablePacks = [
            {
                title: 'Acciones',
                active: ActiveTabService.activeTab() === 0,
                value: 0,
                americaContent: [],
                asiaContent: [],
                europeContent: [],
                url: 'my_subscriptions/tables_packs/stock_table.tpl.html'
            },
            {
                title: 'Pares',
                active: ActiveTabService.activeTab() === 1,
                value: 1,
                americaPairContent: [],
                asiaPairContent: [],
                europePairContent: [],
                url: 'my_subscriptions/tables_packs/pairs_table.tpl.html'
            },
            {
                title: 'Indices',
                active: ActiveTabService.activeTab() === 2,
                value: 2,
                indicesContent: [],
                pairsIndicesContent: [],
                url: 'my_subscriptions/tables_packs/indices_table.tpl.html'
            },
            {
                title: 'Futuros',
                active: ActiveTabService.activeTab() === 3,
                value: 3,
                futuresContent: [],
                url: 'my_subscriptions/tables_packs/futures_table.tpl.html'
            }
        ];
        $scope.filterOptions = "";
        $scope.loading=true;
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

//unciment lines for distinct between same packs for distincts dates
            var data2 = MySubscriptionPacksService.obtainPacks($scope.filterOptions.filters).then(function (data) {
                $scope.loading = false;
                $scope.mySubscriptionsTablePacks[0].americaContent= data.STOCK.NALA;
                $scope.mySubscriptionsTablePacks[0].asiaContent= data.STOCK.APAC;
                $scope.mySubscriptionsTablePacks[0].europeContent= data.STOCK.EMEA;
                $scope.mySubscriptionsTablePacks[1].americaPairContent= data.STOCKPAIR.NALA;
                $scope.mySubscriptionsTablePacks[1].asiaPairContent= data.STOCKPAIR.APAC;
                $scope.mySubscriptionsTablePacks[1].europePairContent= data.STOCKPAIR.EMEA;
                $scope.mySubscriptionsTablePacks[2].indicesContent= data.INDICE.INDEX;
                $scope.mySubscriptionsTablePacks[2].pairsIndicesContent= data.INDICEPAIR.INDEX;
                $scope.mySubscriptionsTablePacks[3].futuresContent= data.FUTURE.FUTURE;

                //load the cart items to set the selected option
                stockItems = ShoppingCartService.obtainCartItems('stocks');
                pairsItems = ShoppingCartService.obtainCartItems('pairs');
                indicesItems = ShoppingCartService.obtainCartItems('indices');
                pairsIndicesItems = ShoppingCartService.obtainCartItems('pairsIndices');
                futuresItems = ShoppingCartService.obtainCartItems('futures');
                for (i=0; i< stockItems.length;i++) {
                    for (j=0;j<$scope.mySubscriptionsTablePacks[0].americaContent.length;j++) {
                        if (stockItems[i].code == $scope.mySubscriptionsTablePacks[0].americaContent[j].code) {
                            startDateItem = $filter('date')($scope.mySubscriptionsTablePacks[0].americaContent[j].startDate, 'MMMM yyyy');
                             if (stockItems[i].startDate  === startDateItem) {
                                //the item exists in the cart
                                $scope.mySubscriptionsTablePacks[0].americaContent[j].toBuy = true;
                                $scope.mySubscriptionsTablePacks[0].americaContent[j].duration = $scope.convertDuration(stockItems[i].duration);
                            }

                        }
                    }
                }
                for (i=0; i< stockItems.length;i++) {
                    for (j=0;j<$scope.mySubscriptionsTablePacks[0].asiaContent.length;j++) {
                        if (stockItems[i].code == $scope.mySubscriptionsTablePacks[0].asiaContent[j].code) {
                            //the item exists in the cart
                            startDateItem = $filter('date')($scope.mySubscriptionsTablePacks[0].asiaContent[j].startDate, 'MMMM yyyy');
                           if (stockItems[i].startDate=== startDateItem) {
                                $scope.mySubscriptionsTablePacks[0].asiaContent[j].toBuy = true;
                                $scope.mySubscriptionsTablePacks[0].asiaContent[j].duration = $scope.convertDuration(stockItems[i].duration);
                            }
                        }
                    }
                }
                for (i=0; i< stockItems.length;i++) {
                    for (j=0;j<$scope.mySubscriptionsTablePacks[0].europeContent.length;j++) {
                        if (stockItems[i].code == $scope.mySubscriptionsTablePacks[0].europeContent[j].code) {
                            //the item exists in the cart
                            startDateItem =  $filter('date')($scope.mySubscriptionsTablePacks[0].europeContent[j].startDate, 'MMMM yyyy');
                            if (stockItems[i].startDate ===startDateItem) {
                                $scope.mySubscriptionsTablePacks[0].europeContent[j].toBuy = true;
                                $scope.mySubscriptionsTablePacks[0].europeContent[j].duration = $scope.convertDuration(stockItems[i].duration);
                            }
                        }
                    }
                }
                //pairs
                for (i=0; i< pairsItems.length;i++) {
                    for (j=0;j<$scope.mySubscriptionsTablePacks[1].americaPairContent.length;j++) {
                        if (pairsItems[i].code == $scope.mySubscriptionsTablePacks[1].americaPairContent[j].code) {
                            //the item exists in the cart
                            startDateItem = $filter('date')($scope.mySubscriptionsTablePacks[1].americaPairContent[j].startDate, 'MMMM yyyy');
                            if (pairsItems[i].startDate === startDateItem) {
                                $scope.mySubscriptionsTablePacks[1].americaPairContent[j].toBuy = true;
                                $scope.mySubscriptionsTablePacks[1].americaPairContent[j].duration = $scope.convertDuration(pairsItems[i].duration);
                            }
                        }
                    }
                }
                for (i=0; i< pairsItems.length;i++) {
                    for (j=0;j<$scope.mySubscriptionsTablePacks[1].asiaPairContent.length;j++) {
                        if (pairsItems[i].code == $scope.mySubscriptionsTablePacks[1].asiaPairContent[j].code) {
                            //the item exists in the cart
                            startDateItem = $filter('date')($scope.mySubscriptionsTablePacks[1].asiaPairContent[j].startDate, 'MMMM yyyy');
                            if (pairsItems[i].startDate === startDateItem) {
                                $scope.mySubscriptionsTablePacks[1].asiaPairContent[j].toBuy = true;
                                $scope.mySubscriptionsTablePacks[1].asiaPairContent[j].duration = $scope.convertDuration(pairsItems[i].duration);
                            }
                        }
                    }
                }
                for (i=0; i< pairsItems.length;i++) {
                    for (j=0;j<$scope.mySubscriptionsTablePacks[1].europePairContent.length;j++) {
                        if (pairsItems[i].code == $scope.mySubscriptionsTablePacks[1].europePairContent[j].code) {
                            //the item exists in the cart
                            startDateItem = $filter('date')($scope.mySubscriptionsTablePacks[1].europePairContent[j].startDate, 'MMMM yyyy');
                            if (pairsItems[i].startDate === startDateItem) {
                                $scope.mySubscriptionsTablePacks[1].europePairContent[j].toBuy = true;
                                $scope.mySubscriptionsTablePacks[1].europePairContent[j].duration = $scope.convertDuration(pairsItems[i].duration);
                             }
                        }
                    }
                }
                //index
                for (i=0; i< indicesItems.length;i++) {
                    for (j=0;j<$scope.mySubscriptionsTablePacks[2].indicesContent.length;j++) {
                        if (indicesItems[i].code == $scope.mySubscriptionsTablePacks[2].indicesContent[j].code) {
                            //the item exists in the cart
                            startDateItem= $filter('date')($scope.mySubscriptionsTablePacks[2].indicesContent[j].startDate, 'MMMM yyyy');
                            if (indicesItems[i].startDate === startDateItem) {
                                $scope.mySubscriptionsTablePacks[2].indicesContent[j].toBuy = true;
                                $scope.mySubscriptionsTablePacks[2].indicesContent[j].duration = $scope.convertDuration(indicesItems[i].duration);
                            }
                        }
                    }
                }
                for (i=0; i< pairsIndicesItems.length;i++) {
                    for (j=0;j<$scope.mySubscriptionsTablePacks[2].pairsIndicesContent.length;j++) {
                        if (pairsIndicesItems[i].code == $scope.mySubscriptionsTablePacks[2].pairsIndicesContent[j].code) {
                            //the item exists in the cart
                            startDateItem = $filter('date')($scope.mySubscriptionsTablePacks[2].pairsIndicesContent[j].startDate, 'MMMM yyyy');
                            if (pairsIndicesItems[i].startDate === startDateItem) {
                                $scope.mySubscriptionsTablePacks[2].pairsIndicesContent[j].toBuy = true;
                                $scope.mySubscriptionsTablePacks[2].pairsIndicesContent[j].duration = $scope.convertDuration(pairsIndicesItems[i].duration);
                            }
                        }
                    }
                }
                for (i=0; i< futuresItems.length;i++) {
                    for (j=0;j<$scope.mySubscriptionsTablePacks[3].futuresContent.length;j++) {
                        if (futuresItems[i].code == $scope.mySubscriptionsTablePacks[3].futuresContent[j].code) {
                            //the item exists in the cart
                            startDateItem = $filter('date')($scope.mySubscriptionsTablePacks[3].futuresContent[j].startDate, 'MMMM yyyy');
                            if (futuresItems[i].startDate === startDateItem) {
                                $scope.mySubscriptionsTablePacks[3].futuresContent[j].toBuy = true;
                                $scope.mySubscriptionsTablePacks[3].futuresContent[j].duration = $scope.convertDuration(futuresItems[i].duration);
                            }
                        }
                    }
                }

            });

        };

        //helper
        $scope.convertDuration = function(duration) {
          if (duration ==="Mensual") {
              return 0;
          }  else if (duration ==="Trimestral") {
              return 1;
          }else {
              return 2;
          }
        };

        $scope.restartFilter();
        $scope.loadPage();


        ///----buy actions

        //toggle the pack to add/delete in the cart (if already exists in the cart or not)
        $scope.togglePack = function(pack) {
            $rootScope.$broadcast('toggleItemCart',pack);
        };

        //change the duration in my subscriptions
        $scope.changeDuration = function(pack) {
            //changeDuration also check if the packs is not selected, then select it if not

            if (!pack.toBuy) {
                //is not check to buy, add the item with the specific duration
                pack.toBuy = true;
                $rootScope.$broadcast('toggleItemCart',pack);
            } else {
                //else change the duration of the item in the cart
                $rootScope.$broadcast('changeDurationItem', pack);
            }
        };
        //when the user changes the duration of a item in the cart --NOTE: uncoment the dates comparations for make a distinct by startDate of same pack
        $scope.$on('changeDurationFromCart',function(event,item){

                for (j=0;j<$scope.mySubscriptionsTablePacks[0].americaContent.length;j++) {
                    if (item.code == $scope.mySubscriptionsTablePacks[0].americaContent[j].code) {
                        //the item exists in the cart
                        if (item.startDate === $filter('date')($scope.mySubscriptionsTablePacks[0].americaContent[j].startDate, 'MMMM yyyy')) {
                            $scope.mySubscriptionsTablePacks[0].americaContent[j].duration = $scope.convertDuration(item.duration);
                        }

                    }
                }
                for (j=0;j<$scope.mySubscriptionsTablePacks[0].asiaContent.length;j++) {
                    if (item.code == $scope.mySubscriptionsTablePacks[0].asiaContent[j].code) {
                        //the item exists in the cart
                        if (item.startDate === $filter('date')($scope.mySubscriptionsTablePacks[0].asiaContent[j].startDate, 'MMMM yyyy')) {
                            $scope.mySubscriptionsTablePacks[0].asiaContent[j].duration = $scope.convertDuration(item.duration);
                        }
                    }
                }
                for (j=0;j<$scope.mySubscriptionsTablePacks[0].europeContent.length;j++) {
                    if (item.code == $scope.mySubscriptionsTablePacks[0].europeContent[j].code) {
                        //the item exists in the cart
                        if (item.startDate === $filter('date')($scope.mySubscriptionsTablePacks[0].europeContent[j].startDate, 'MMMM yyyy')) {
                            $scope.mySubscriptionsTablePacks[0].europeContent[j].duration = $scope.convertDuration(item.duration);
                        }
                    }
                }
            //pairs
                for (j=0;j<$scope.mySubscriptionsTablePacks[1].americaPairContent.length;j++) {
                    if (item.code == $scope.mySubscriptionsTablePacks[1].americaPairContent[j].code) {
                        //the item exists in the cart
                        if (item.startDate === $filter('date')($scope.mySubscriptionsTablePacks[1].americaPairContent[j].startDate, 'MMMM yyyy')) {
                            $scope.mySubscriptionsTablePacks[1].americaPairContent[j].duration = $scope.convertDuration(item.duration);
                        }
                    }
                }
                for (j=0;j<$scope.mySubscriptionsTablePacks[1].asiaPairContent.length;j++) {
                    if (item.code == $scope.mySubscriptionsTablePacks[1].asiaPairContent[j].code) {
                        //the item exists in the cart
                        if (item.startDate === $filter('date')($scope.mySubscriptionsTablePacks[1].asiaPairContent[j].startDate, 'MMMM yyyy')) {
                            $scope.mySubscriptionsTablePacks[1].asiaPairContent[j].duration = $scope.convertDuration(item.duration);

                        }
                    }
                }
                for (j=0;j<$scope.mySubscriptionsTablePacks[1].europePairContent.length;j++) {
                    if (item.code == $scope.mySubscriptionsTablePacks[1].europePairContent[j].code) {
                        //the item exists in the cart
                        if (item.startDate === $filter('date')($scope.mySubscriptionsTablePacks[1].europePairContent[j].startDate, 'MMMM yyyy')) {
                            $scope.mySubscriptionsTablePacks[1].europePairContent[j].duration = $scope.convertDuration(item.duration);
                        }
                    }
                }
            //index
                for (j=0;j<$scope.mySubscriptionsTablePacks[2].indicesContent.length;j++) {
                    if (item.code == $scope.mySubscriptionsTablePacks[2].indicesContent[j].code) {
                        //the item exists in the cart
                        if (item.startDate === $filter('date')($scope.mySubscriptionsTablePacks[2].indicesContent[j].startDate, 'MMMM yyyy')) {
                            $scope.mySubscriptionsTablePacks[2].indicesContent[j].duration = $scope.convertDuration(item.duration);
                        }
                    }
                }
                for (j=0;j<$scope.mySubscriptionsTablePacks[2].pairsIndicesContent.length;j++) {
                    if (item.code == $scope.mySubscriptionsTablePacks[2].pairsIndicesContent[j].code) {
                        if (item.startDate === $filter('date')($scope.mySubscriptionsTablePacks[2].pairsIndicesContent[j].startDate, 'MMMM yyyy')) {
                           //the item exists in the cart
                           $scope.mySubscriptionsTablePacks[2].pairsIndicesContent[j].duration = $scope.convertDuration(item.duration);
                        }
                    }
                }
                for (j=0;j<$scope.mySubscriptionsTablePacks[3].futuresContent.length;j++) {
                    if (item.code == $scope.mySubscriptionsTablePacks[3].futuresContent[j].code) {
                        if (item.startDate === $filter('date')($scope.mySubscriptionsTablePacks[3].futuresContent[j].startDate, 'MMMM yyyy')) {
                            //the item exists in the cart
                            $scope.mySubscriptionsTablePacks[3].futuresContent[j].duration = $scope.convertDuration(item.duration);
                        }
                    }
                }
        });


        //when the user removes a item from the cart

        $scope.$on("removeItemFromCart",function(event,item) {
            for (j=0;j<$scope.mySubscriptionsTablePacks[0].americaContent.length;j++) {
                if ((item.code == $scope.mySubscriptionsTablePacks[0].americaContent[j].code) && ($scope.mySubscriptionsTablePacks[0].americaContent[j].toBuy)) {
                    //the item exists in the cart
                    if (item.startDate === $filter('date')($scope.mySubscriptionsTablePacks[0].americaContent[j].startDate, 'MMMM yyyy')) {
                        $scope.mySubscriptionsTablePacks[0].americaContent[j].toBuy = false;
                    }

                }
            }
            for (j=0;j<$scope.mySubscriptionsTablePacks[0].asiaContent.length;j++) {
                if ((item.code == $scope.mySubscriptionsTablePacks[0].asiaContent[j].code) && ($scope.mySubscriptionsTablePacks[0].asiaContent[j].toBuy)) {
                    //the item exists in the cart
                    if (item.startDate === $filter('date')($scope.mySubscriptionsTablePacks[0].asiaContent[j].startDate, 'MMMM yyyy')) {
                        $scope.mySubscriptionsTablePacks[0].asiaContent[j].toBuy = false;
                    }
                }
            }
            for (j=0;j<$scope.mySubscriptionsTablePacks[0].europeContent.length;j++) {
                if ((item.code == $scope.mySubscriptionsTablePacks[0].europeContent[j].code) && ($scope.mySubscriptionsTablePacks[0].europeContent[j].toBuy)) {
                    //the item exists in the cart
                    if (item.startDate === $filter('date')($scope.mySubscriptionsTablePacks[0].europeContent[j].startDate, 'MMMM yyyy')) {
                        $scope.mySubscriptionsTablePacks[0].europeContent[j].toBuy = false;
                    }
                }
            }
            //pairs
            for (j=0;j<$scope.mySubscriptionsTablePacks[1].americaPairContent.length;j++) {
                if ((item.code == $scope.mySubscriptionsTablePacks[1].americaPairContent[j].code) && ($scope.mySubscriptionsTablePacks[1].americaPairContent[j].toBuy)) {
                    //the item exists in the cart
                    if (item.startDate === $filter('date')($scope.mySubscriptionsTablePacks[1].americaPairContent[j].startDate, 'MMMM yyyy')) {
                        $scope.mySubscriptionsTablePacks[1].americaPairContent[j].toBuy = false;
                    }
                }
            }
            for (j=0;j<$scope.mySubscriptionsTablePacks[1].asiaPairContent.length;j++) {
                if ((item.code == $scope.mySubscriptionsTablePacks[1].asiaPairContent[j].code) && ($scope.mySubscriptionsTablePacks[1].asiaPairContent[j].toBuy)) {
                    //the item exists in the cart
                    if (item.startDate === $filter('date')($scope.mySubscriptionsTablePacks[1].asiaPairContent[j].startDate, 'MMMM yyyy')) {
                        $scope.mySubscriptionsTablePacks[1].asiaPairContent[j].toBuy = false;
                    }
                }
            }
            for (j=0;j<$scope.mySubscriptionsTablePacks[1].europePairContent.length;j++) {
                if ((item.code == $scope.mySubscriptionsTablePacks[1].europePairContent[j].code) && ($scope.mySubscriptionsTablePacks[1].europePairContent[j].toBuy)) {
                    //the item exists in the cart
                    if (item.startDate === $filter('date')($scope.mySubscriptionsTablePacks[1].europePairContent[j].startDate, 'MMMM yyyy')) {
                        $scope.mySubscriptionsTablePacks[1].europePairContent[j].toBuy = false;
                    }
                }
            }
            //index
            for (j=0;j<$scope.mySubscriptionsTablePacks[2].indicesContent.length;j++) {
                if ((item.code == $scope.mySubscriptionsTablePacks[2].indicesContent[j].code) && ($scope.mySubscriptionsTablePacks[2].indicesContent[j].toBuy)) {
                    //the item exists in the cart
                    if (item.startDate === $filter('date')($scope.mySubscriptionsTablePacks[3].indicesContent[j].startDate, 'MMMM yyyy')) {
                        $scope.mySubscriptionsTablePacks[2].indicesContent[j].toBuy = false;
                    }
                }
            }
            for (j=0;j<$scope.mySubscriptionsTablePacks[2].pairsIndicesContent.length;j++) {
                if ((item.code == $scope.mySubscriptionsTablePacks[2].pairsIndicesContent[j].code) && ($scope.mySubscriptionsTablePacks[2].pairsIndicesContent[j].toBuy)) {
                    //the item exists in the cart
                    if (item.startDate === $filter('date')($scope.mySubscriptionsTablePacks[3].pairsIndicesContent[j].startDate, 'MMMM yyyy')) {
                        $scope.mySubscriptionsTablePacks[2].pairsIndicesContent[j].toBuy = false;
                    }
                }
            }
            for (j=0;j<$scope.mySubscriptionsTablePacks[3].futuresContent.length;j++) {
                if ((item.code == $scope.mySubscriptionsTablePacks[3].futuresContent[j].code) && ($scope.mySubscriptionsTablePacks[3].futuresContent[j].toBuy)) {
                    //the item exists in the cart
                    if (item.startDate === $filter('date')($scope.mySubscriptionsTablePacks[3].futuresContent[j].startDate, 'MMMM yyyy')) {
                        $scope.mySubscriptionsTablePacks[3].futuresContent[j].toBuy = false;
                    }
                }
            }
        });

        //remove all items from cart, all items with toBuy to false;

        $scope.$on("removeAllItemsFromCart",function(){
            for (j=0;j<$scope.mySubscriptionsTablePacks[0].americaContent.length;j++) {
               $scope.mySubscriptionsTablePacks[0].americaContent[j].toBuy = false;
            }
            for (j=0;j<$scope.mySubscriptionsTablePacks[0].asiaContent.length;j++) {
              $scope.mySubscriptionsTablePacks[0].asiaContent[j].toBuy = false;

            }
            for (j=0;j<$scope.mySubscriptionsTablePacks[0].europeContent.length;j++) {
               $scope.mySubscriptionsTablePacks[0].europeContent[j].toBuy = false;

            }
            //pairs
            for (j=0;j<$scope.mySubscriptionsTablePacks[1].americaPairContent.length;j++) {
                $scope.mySubscriptionsTablePacks[1].americaPairContent[j].toBuy = false;

            }
            for (j=0;j<$scope.mySubscriptionsTablePacks[1].asiaPairContent.length;j++) {
                $scope.mySubscriptionsTablePacks[1].asiaPairContent[j].toBuy = false;

            }
            for (j=0;j<$scope.mySubscriptionsTablePacks[1].europePairContent.length;j++) {
               $scope.mySubscriptionsTablePacks[1].europePairContent[j].toBuy = false;

            }
            //index
            for (j=0;j<$scope.mySubscriptionsTablePacks[2].indicesContent.length;j++) {
                $scope.mySubscriptionsTablePacks[2].indicesContent[j].toBuy = false;

            }
            for (j=0;j<$scope.mySubscriptionsTablePacks[2].pairsIndicesContent.length;j++) {
                $scope.mySubscriptionsTablePacks[2].pairsIndicesContent[j].toBuy = false;

            }
            for (j=0;j<$scope.mySubscriptionsTablePacks[3].futuresContent.length;j++) {
                $scope.mySubscriptionsTablePacks[3].futuresContent[j].toBuy = false;

            }
        });
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