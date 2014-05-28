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
                moMenuType: 'publicMenu',
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
                selectItemSubmenu: 'products-and-exchanges-nav',
                moMenuType: 'publicMenu'
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
                selectItemSubmenu: 'detailed-description-nav',
                moMenuType: 'publicMenu'
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
            .state('detailed_description.diary', {
                url: '/diary',
                views: {
                    "subPage": {
                        templateUrl: 'services/detailed_description/diary.tpl.html'
                    }
                }
            })
            .state('detailed_description.historic', {
                url: '/historic',
                views: {
                    "subPage": {
                        templateUrl: 'services/detailed_description/historic.tpl.html'
                    }
                }
            })
            .state('detailed_description.drawdown', {
                url: '/drawdown',
                views: {
                    "subPage": {
                        templateUrl: 'services/detailed_description/drawdown.tpl.html'
                    }
                }
            })
            .state('detailed_description.correlation', {
                url: '/correlation',
                views: {
                    "subPage": {
                        templateUrl: 'services/detailed_description/correlation.tpl.html'
                    }
                }
            })
            .state('detailed_description.volatility', {
                url: '/volatility',
                views: {
                    "subPage": {
                        templateUrl: 'services/detailed_description/volatility.tpl.html'
                    }
                }
            })
            .state('detailed_description.week', {
                url: '/week',
                views: {
                    "subPage": {
                        templateUrl: 'services/detailed_description/week.tpl.html'
                    }
                }
            })
            .state('detailed_description.calendar', {
                url: '/calendar',
                views: {
                    "subPage": {
                        templateUrl: 'services/detailed_description/calendar.tpl.html'
                    }
                }
            })
            .state('detailed_description.suscriptions', {
                url: '/suscriptions',
                views: {
                    "subPage": {
                        templateUrl: 'services/detailed_description/suscriptions.tpl.html'
                    }
                }
            })
            .state('detailed_description.account', {
                url: '/account',
                views: {
                    "subPage": {
                        templateUrl: 'services/detailed_description/account.tpl.html'
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
                selectItemSubmenu: 'fundamentals-nav',
                moMenuType: 'publicMenu'
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