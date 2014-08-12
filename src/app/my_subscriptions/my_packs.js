/**
 * Created by laia on 23/07/14.
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
                    templateUrl: 'my_subscriptions/my_packs.tpl.html'
                },
                "my-packs-view@my-packs": {
                    templateUrl: 'my_subscriptions/my-packs-table.tpl.html'
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

    .controller('MyPacksCtrl', function ($scope, ActiveTabService, MySubscriptionPacksService, IsLogged) {
        $scope.$on('$stateChangeStart', function (event, toState) {
            IsLogged.isLogged();

        });


    });