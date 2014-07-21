/**
 * Created by laura on 6/06/14.
 */
angular.module('ngMo.my_packs', [
    'ui.router'
])

    .config(function config($stateProvider) {
        $stateProvider.state('my-packs', {
            url: '/my-packs',
            views: {
                "main": {
                    controller: 'MyPacksCtrl',
                    templateUrl: 'my_packs/my_packs.tpl.html'
                },
                "my-packs-view@my-packs": {
                    templateUrl: 'my_packs/my-packs-table.tpl.html'
                }
            },
            data: {
                pageTitle: 'Mis packs',
                selectMenu: 'my-packs-nav',
                selectSubmenu: '',
                selectItemSubmenu: '',
                moMenuType: 'privateMenu',
                subPage: 'my-packs'
            },
            resolve: {
                MonthSelectorService: "MonthSelectorService",
                VolatilityService: "VolatilityService",
                TabsService: "TabsService",
                filtering : function(TabsService,MonthSelectorService){
                    return {
                        active_tab: TabsService.getActiveTab(),
                        month: MonthSelectorService.restartDate()
                    };
                },
                myPacksData: function(MyPacksService, filtering) {
                    return MyPacksService.getPagedDataAsync().then(function (data){
                        return {
                            patterns: data.patterns,
                            results: data.results,
                            found: data.found
                        };

                    });
                }
            }
        })



        ;
    })

    .run(function run() {

    })

    .service('MyPacksService', function (){

        //Dummies Packs
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

        //******

        this.obtainPacks = function (area) {
            switch (area){
                case 'stocks':
                    return stocksPacks;
                case 'pairs':
                    return pairsPacks;
                case 'indices':
                    return indicesPacks;
                case 'pairs_indices':
                    return pairsIndicesPacks;
                case 'futures':
                    return futuresPacks;
            }
        };


    })



    .controller('MyPacksCtrl', function ($scope, ActiveTabService, MyPacksService, IsLogged,$http,$window,$rootScope ) {
        $scope.$on('$stateChangeStart', function (event, toState){
            IsLogged.isLogged();
            alert('my packs controller');
        });

        $scope.$on('$stateChangeSuccess', function (event, toState, toParams, fromState, fromParams) {
            if (angular.isDefined(toState.data.pageTitle)) {
                $scope.pageTitle = toState.data.pageTitle + ' | Market Observatory';
                $scope.subPage = toState.data.subPage;
               // $location.path('/packs');
            }
        });

        window.onload = $scope.loadPage = function () {
            var data = $scope.getPagedDataAsync().then(function (data) {
                $scope.myData = data.patterns;//data.page;
                $scope.results = data.results;//data.results;
                $scope.found = data.found;//data.found;
            });


        };
        $scope.myPacksTablePacks = [
        {
            title: 'Acciones',
            active: ActiveTabService.activeTab() === 0,
            value: 0,
            content: MyPacksService.obtainPacks('stocks'),
            url: 'my_subscriptions/tables_my_packs/stock_table.tpl.html'

        },
        {
            title: 'Pares Acciones',
            active: ActiveTabService.activeTab() === 1,
            value: 1,
            content: MyPacksService.obtainPacks('pairs'),
            url: 'my_subscriptions/tables_my_packs/pairs_table.tpl.html'
        },
        {
            title: 'Indices',
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


        $scope.getPagedDataAsync = function () {

            var data;
            var indexType = null;

            config = {
                params: {
                    'page': 0,
                    'token': $window.sessionStorage.token

                }
            };

            var result = $http.get($rootScope.urlService+'/patterns', config).then(function (response) {
                // With the data succesfully returned, call our callback
                deferred.resolve();
                return response.data;
            });
            return result;
        };

    })


;