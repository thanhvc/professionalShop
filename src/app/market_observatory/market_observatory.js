angular.module('ngMo.market_observatory', [
    'ui.router'
])

    .config(function config($stateProvider) {
        $stateProvider.state('organization', {
            url: '/organization',
            views: {
                "main": {
                    controller: 'Market_ObservatoryCtrl',
                    templateUrl: 'market_observatory/organization/organization.tpl.html'
                }
            },
            data: {
                pageTitle: 'Organizacion',
                selectMenu: 'market-observatory-nav',
                selectSubmenu: 'submenu1',
                selectItemSubmenu: 'organization-nav'

            }
        })
            .state('what_is_and_what_is_not', {
                url: '/what_is_and_what_is_not',
                views: {
                    "main": {
                        controller: 'Market_ObservatoryCtrl',
                        templateUrl: 'market_observatory/what_is_and_what_is_not/what_is_and_what_is_not.tpl.html'
                    }
                },
                data: {
                    pageTitle: 'Qué Es y Qué No Es',
                    selectMenu: 'market-observatory-nav',
                    selectSubmenu: 'submenu1',
                    selectItemSubmenu: 'what-is-and-what-is-not-nav'
                }
            })
            .state('service_conditions', {
                url: '/service_conditions',
                views: {
                    "main": {
                        controller: 'Market_ObservatoryCtrl',
                        templateUrl: 'market_observatory/service_conditions/service_conditions.tpl.html'
                    }
                },
                data: {
                    pageTitle: 'service_conditions',
                    selectMenu: 'market-observatory-nav',
                    selectSubmenu: 'submenu1',
                    selectItemSubmenu: 'service-conditions-nav'
                }
            })
            .state('data_protection', {
                url: '/data_protection',
                views: {
                    "main": {
                        controller: 'Market_ObservatoryCtrl',
                        templateUrl: 'market_observatory/data_protection/data_protection.tpl.html'
                    }
                },
                data: {
                    pageTitle: 'Protecció;n de Datos',
                    selectMenu: 'market-observatory-nav',
                    selectSubmenu: 'submenu1',
                    selectItemSubmenu: 'data-protection-nav'
                }
            });

    })

    .run(function run() {
    })

    .controller('Market_ObservatoryCtrl', function Market_ObservatoryCtrl($scope) {
        $scope.$on('$stateChangeSuccess', function (event, toState, toParams, fromState, fromParams) {
            if (angular.isDefined(toState.data.pageTitle)) {$scope.pageTitle = toState.data.pageTitle + ' | Market Observatory';}
        });
    }) ;
