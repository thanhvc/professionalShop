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
                    controller: 'Investor_ToolsCtrl',
                    templateUrl: 'investor_tools/resources/resources.tpl.html'
                }
            },
            data: { pageTitle: 'Recursos' }
        })
            .state('articles', {
                url: '/articles',
                views: {
                    "main": {
                        controller: 'Investor_ToolsCtrl',
                        templateUrl: 'investor_tools/articles/articles.tpl.html'
                    }
                },
                data: { pageTitle: 'Articulos' }
            })
            .state('symbols_and_exchanges', {
                url: '/symbols_and_exchanges',
                views: {
                    "main": {
                        controller: 'Investor_ToolsCtrl',
                        templateUrl: 'investor_tools/symbols_and_exchanges/symbols_and_exchanges.tpl.html'
                    }
                },
                data: { pageTitle: 'Simbolos y Mercados' }
            })
            .state('mo_template_collections', {
                url: '/mo_template_collections',
                views: {
                    "main": {
                        controller: 'Investor_ToolsCtrl',
                        templateUrl: 'investor_tools/mo_template_collections/mo_template_collections.tpl.html'
                    }
                },
                data: { pageTitle: 'Coleccion Plantillas MO' }
            });

    })

    .run(function run() {
    })

    .controller('Investor_ToolsCtrl', function Investor_ToolsCtrl($scope) {
        $scope.$on('$stateChangeSuccess', function (event, toState, toParams, fromState, fromParams) {
            if (angular.isDefined(toState.data.pageTitle)) {$scope.pageTitle = toState.data.pageTitle + ' | Market Observatory';}
        });
    }) ;