/**
 * Created by laura on 29/04/14.
 */
angular.module('ngMo.services', [
    'ui.router'
])

    .config(function config($stateProvider) {
        $stateProvider.state('summary', {
            url: '/summary',
            views: {
                "main": {
                    controller: 'ServicesCtrl',
                    templateUrl: 'services/summary/summary.tpl.html'
                }
            },
            data: {
                pageTitle: 'Resumen',
                selectMenu: 'services-nav',
                selectSubmenu: 'submenu2',
                selectItemSubmenu: 'summary-nav'
            }
        })
        .state('products_and_exchanges', {
            url: '/products_and_exchanges',
            views: {
                "main": {
                    controller: 'ServicesCtrl',
                    templateUrl: 'services/products_and_exchanges/products_and_exchanges.tpl.html'
                }
            },
            data: {
                pageTitle: 'Productos y Mercados',
                selectMenu: 'services-nav',
                selectSubmenu: 'submenu2',
                selectItemSubmenu: 'products-and-exchanges-nav'
            }
        })
        .state('detailed_description', {
            url: '/detailed_description',
            views: {
                "main": {
                    controller: 'ServicesCtrl',
                    templateUrl: 'services/detailed_description/detailed_description.tpl.html'
                }
            },
            data: {
                pageTitle: 'Descripcion Detallada',
                selectMenu: 'services-nav',
                selectSubmenu: 'submenu2',
                selectItemSubmenu: 'detailed-description-nav'
            }
        })
        .state('fundamentals', {
            url: '/fundamentals',
            views: {
                "main": {
                    controller: 'ServicesCtrl',
                    templateUrl: 'services/fundamentals/fundamentals.tpl.html'
                }
            },
            data: {
                pageTitle: 'Fundamentos',
                selectMenu: 'services-nav',
                selectSubmenu: 'submenu2',
                selectItemSubmenu: 'fundamentals-nav'
            }
        });

    })

    .run(function run() {
    })

    .controller('ServicesCtrl', function ServicesCtrl($scope) {
        $scope.$on('$stateChangeSuccess', function (event, toState, toParams, fromState, fromParams) {
            if (angular.isDefined(toState.data.pageTitle)) {$scope.pageTitle = toState.data.pageTitle + ' | Market Observatory';}
        });
    }) ;