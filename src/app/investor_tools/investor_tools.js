/**
 * Created by laura on 29/04/14.
 */
angular.module('ngMo.investor_tools', [
    'ui.router'
])

    .config(function config($stateProvider) {
        $stateProvider.state('resources', {
            url: '/resources',
            views: {
                "main": {
                    controller: 'DetailedCtrl',
                    templateUrl: 'investor_tools/resources/resources.tpl.html'
                }
            },
            data: {
                pageTitle: 'Recursos',
                selectMenu: 'investor-tools-nav',
                selectSubmenu: 'submenu5',
                selectItemSubmenu: 'resources-nav',
                moMenuType: 'publicMenu'
            }
        })
            .state('articles', {
                url: '/articles',
                views: {
                    "main": {
                        controller: 'Investor_ToolsCtrl',
                        templateUrl: 'investor_tools/articles/articles.tpl.html'
                    }
                },
                data: {
                    pageTitle: 'Artículos',
                    selectMenu: 'investor-tools-nav',
                    selectSubmenu: 'submenu5',
                    selectItemSubmenu: 'articles-nav',
                    moMenuType: 'publicMenu'
                }
            })
            .state('symbols_and_exchanges', {
                url: '/symbols_and_exchanges',
                views: {
                    "main": {
                        controller: 'Investor_ToolsCtrl',
                        templateUrl: 'investor_tools/symbols_and_exchanges/symbols_and_exchanges.tpl.html'
                    }
                },
                data: {
                    pageTitle: 'Simbolos y Mercados',
                    selectMenu: 'investor-tools-nav',
                    selectSubmenu: 'submenu5',
                    selectItemSubmenu: 'symbols-and-exchanges-nav',
                    moMenuType: 'publicMenu'
                }
            });

    })

    .run(function run() {
    })

    .controller('Investor_ToolsCtrl', function Investor_ToolsCtrl($scope) {
        $scope.$on('$stateChangeSuccess', function (event, toState, toParams, fromState, fromParams) {
            if (angular.isDefined(toState.data.pageTitle)) {$scope.pageTitle = toState.data.pageTitle + ' | Market Observatory';}
        });
    }) ;