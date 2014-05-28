/**
 * Created by robgon on 28/05/14.
 */


angular.module('ngMo.my_patterns', [
    'ui.router',
    'ui.bootstrap'
])
    .config(function config($stateProvider) {
        $stateProvider.state('my_patterns', {
            url: '/patterns',
            views: {
                "main": {
                    controller: 'PatternsCtrl',
                    templateUrl: 'my_patterns/my_patterns.tpl.html'
                }
            },
            data: {
                pageTitle: 'My Patterns'
            }
        });
    })
    .controller('PatternsCtrl', function HomeController($scope, $templateCache, $rootScope, ActiveTabService, ActualDateService, PacksService) {
       //tabs
        $scope.tabs =  [
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
        selectedTab = ActiveTabService.activeTab();
        $scope.actualDate = ActualDateService.actualDate();
        $scope.onClickTab = function(idTab){
            selectedTab =ActiveTabService.changeActiveTab(idTab);
        };


    });