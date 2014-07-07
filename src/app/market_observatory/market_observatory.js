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
                pageTitle: 'Organización',
                selectMenu: 'market-observatory-nav',
                selectSubmenu: 'submenu1',
                selectItemSubmenu: 'organization-nav',
                moMenuType: 'publicMenu'

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
                    selectItemSubmenu: 'what-is-and-what-is-not-nav',
                    moMenuType: 'publicMenu'
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
                    pageTitle: 'Condiciones del Servicio',
                    selectMenu: 'market-observatory-nav',
                    selectSubmenu: 'submenu1',
                    selectItemSubmenu: 'service-conditions-nav',
                    moMenuType: 'publicMenu'
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
                    pageTitle: 'Protección de Datos',
                    selectMenu: 'market-observatory-nav',
                    selectSubmenu: 'submenu1',
                    selectItemSubmenu: 'data-protection-nav',
                    moMenuType: 'publicMenu'
                }
            });

    })

    .run(function run() {
    })

    .controller('Market_ObservatoryCtrl', function Market_ObservatoryCtrl($scope, IsLogged) {
        $scope.$on('$stateChangeStart', function (event, toState){
            IsLogged.isLogged();
        });
        $scope.$on('$stateChangeSuccess', function (event, toState, toParams, fromState, fromParams) {
            if (angular.isDefined(toState.data.pageTitle)) {$scope.pageTitle = toState.data.pageTitle + ' | Market Observatory';}
        });
    }) ;
