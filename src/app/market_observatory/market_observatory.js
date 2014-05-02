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
            data: { pageTitle: 'Organizacion' }
        })
            .state('what_is_and_what_is_not', {
                url: '/what_is_and_what_is_not',
                views: {
                    "main": {
                        controller: 'Market_ObservatoryCtrl',
                        templateUrl: 'market_observatory/what_is_and_what_is_not/what_is_and_what_is_not.tpl.html'
                    }
                },
                data: { pageTitle: 'Qué Es y Qué No Es' }
            })
            .state('service_conditions', {
                url: '/service_conditions',
                views: {
                    "main": {
                        controller: 'Market_ObservatoryCtrl',
                        templateUrl: 'market_observatory/service_conditions/service_conditions.tpl.html'
                    }
                },
                data: { pageTitle: 'service_conditions' }
            })
            .state('data_protection', {
                url: '/data_protection',
                views: {
                    "main": {
                        controller: 'Market_ObservatoryCtrl',
                        templateUrl: 'market_observatory/data_protection/data_protection.tpl.html'
                    }
                },
                data: { pageTitle: 'Protecció;n de Datos' }
            });

    })

    .run(function run() {
    })

    .controller('Market_ObservatoryCtrl', function Market_ObservatoryCtrl($scope) {
        $scope.$on('$stateChangeSuccess', function (event, toState, toParams, fromState, fromParams) {
            if (angular.isDefined(toState.data.pageTitle)) {$scope.pageTitle = toState.data.pageTitle + ' | Market Observatory';}
        });
    }) ;