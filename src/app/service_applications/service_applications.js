/**
 * Created by laura on 29/04/14.
 */
angular.module('ngMo.service_applications', [
    'ui.router'
])

    .config(function config($stateProvider) {
        $stateProvider.state('stocks', {
            url: '/stocks',
            views: {
                "main": {
                    controller: 'Service_ApplicationsCtrl',
                    templateUrl: 'service_applications/stocks/stocks.tpl.html'
                }
            },
            data: {
                pageTitle: 'Acciones',
                selectMenu: 'service-applications-nav',
                selectSubmenu: 'submenu3',
                selectItemSubmenu: 'stocks-nav'
            }
        })
        .state('funds', {
            url: '/funds',
            views: {
                "main": {
                    controller: 'Service_ApplicationsCtrl',
                    templateUrl: 'service_applications/funds/funds.tpl.html'
                }
            },
            data: {
                pageTitle: 'Fondos',
                selectMenu: 'service-applications-nav',
                selectSubmenu: 'submenu3',
                selectItemSubmenu: 'funds-nav'
            }
        })
        .state('etf_cfd', {
            url: '/etf_cfd',
            views: {
                "main": {
                    controller: 'Service_ApplicationsCtrl',
                    templateUrl: 'service_applications/etf_cfd/etf_cfd.tpl.html'
                }
            },
            data: {
                pageTitle: 'ETF\'s, CFD\'s',
                selectMenu: 'service-applications-nav',
                selectSubmenu: 'submenu3',
                selectItemSubmenu: 'etf-cfd-nav'
            }
        })
        .state('futures', {
            url: '/futures',
            views: {
                "main": {
                    controller: 'Service_ApplicationsCtrl',
                    templateUrl: 'service_applications/futures/futures.tpl.html'
                }
            },
            data: {
                pageTitle: 'Futuros',
                selectMenu: 'service-applications-nav',
                selectSubmenu: 'submenu3',
                selectItemSubmenu: 'futures-nav'
            }
        })
        .state('pairs', {
            url: '/pairs',
            views: {
                "main": {
                    controller: 'Service_ApplicationsCtrl',
                    templateUrl: 'service_applications/pairs/pairs.tpl.html'
                }
            },
            data: {
                pageTitle: 'Pares',
                selectMenu: 'service-applications-nav',
                selectSubmenu: 'submenu3',
                selectItemSubmenu: 'pairs-nav'
            }
        })
        .state('advanced', {
            url: '/advanced',
            views: {
                "main": {
                    controller: 'Service_ApplicationsCtrl',
                    templateUrl: 'service_applications/advanced/advanced.tpl.html'
                }
            },
            data: {
                pageTitle: 'Avanzado',
                selectMenu: 'service-applications-nav',
                selectSubmenu: 'submenu3',
                selectItemSubmenu: 'advanced-nav'
            }
        })
        .state('diversification', {
            url: '/diversification',
            views: {
                "main": {
                    controller: 'Service_ApplicationsCtrl',
                    templateUrl: 'service_applications/diversification/diversification.tpl.html'
                }
            },
            data: {
                pageTitle: 'Diversificacion',
                selectMenu: 'service-applications-nav',
                selectSubmenu: 'submenu3',
                selectItemSubmenu: 'diversification-nav'
            }
        });

    })

    .run(function run() {
    })

    .controller('Service_ApplicationsCtrl', function Service_ApplicationsCtrl($scope) {
        $scope.$on('$stateChangeSuccess', function (event, toState, toParams, fromState, fromParams) {
            if (angular.isDefined(toState.data.pageTitle)) {$scope.pageTitle = toState.data.pageTitle + ' | Market Observatory';}
        });
    }) ;