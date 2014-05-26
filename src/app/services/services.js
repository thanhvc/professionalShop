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
                },
                'sum-view@summary': {
                    templateUrl: 'services/summary/sub-summary.tpl.html'
                }
            },
            data: {
                pageTitle: 'Resumen',
                selectMenu: 'services-nav',
                selectSubmenu: 'submenu2',
                selectItemSubmenu: 'summary-nav',
                subPage: 'none'
            }
        })
        //substates of summary
        .state('summary.basic', {
            url: '/basic',
            views: {
                "sum-view": {
                    templateUrl: 'services/summary/basic-info.tpl.html'
                }
            },
                data: {
                    subPage: 'basic'
                }
        })
        .state('summary.diary', {
            url: '/diary',
            views: {
                "sum-view": {
                    templateUrl: 'services/summary/diary.tpl.html'
                }
            },
                data: {
                    subPage: 'diary'
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
                },
                "subPage@detailed_description": {
                    templateUrl: 'services/detailed_description/description.tpl.html'
                }
            },
            data: {
                pageTitle: 'Descripcion Detallada',
                selectMenu: 'services-nav',
                selectSubmenu: 'submenu2',
                selectItemSubmenu: 'detailed-description-nav'
            }
        })
            //subpages of detailed_description
            .state('detailed_description.basic', {
                url: '/basic',
                views: {
                    "subPage": {
                        templateUrl: 'services/detailed_description/basic.tpl.html'
                    }
                }
            })
            .state('detailed_description.phases', {
                url: '/phases',
                views: {
                    "subPage": {
                        templateUrl: 'services/detailed_description/phases.tpl.html'
                    }
                }
            })
            .state('detailed_description.monthly', {
                url: '/monthly',
                views: {
                    "subPage": {
                        templateUrl: 'services/detailed_description/monthly.tpl.html'
                    }
                }
            })
            .state('detailed_description.buy', {
                url: '/buy',
                views: {
                    "subPage": {
                        templateUrl: 'services/detailed_description/buy.tpl.html'
                    }
                }
            })
            .state('detailed_description.patterns', {
                url: '/patterns',
                views: {
                    "subPage": {
                        templateUrl: 'services/detailed_description/patterns.tpl.html'
                    }
                }
            })
            //end of subpages
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
            if ( (typeof toState.data.subPage !== 'undefined')) {$scope.subPage = toState.data.subPage; }
        });
    }) ;