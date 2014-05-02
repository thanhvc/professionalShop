/**
 * Created by laura on 29/04/14.
 */
angular.module('ngMo.contact', [
    'ui.router'
])

    .config(function config($stateProvider) {
        $stateProvider.state('support', {
            url: '/support',
            views: {
                "main": {
                    controller: 'ContactCtrl',
                    templateUrl: 'contact/support/support.tpl.html'
                }
            },
            data: { pageTitle: 'Soporte' }
        })
            .state('business', {
                url: '/business',
                views: {
                    "main": {
                        controller: 'ContactCtrl',
                        templateUrl: 'contact/business/business.tpl.html'
                    }
                },
                data: { pageTitle: 'Empresas' }
            })
            .state('job', {
                url: '/job',
                views: {
                    "main": {
                        controller: 'ContactCtrl',
                        templateUrl: 'contact/job/job.tpl.html'
                    }
                },
                data: { pageTitle: 'Empleo' }
            })
            .state('localization', {
                url: '/localization',
                views: {
                    "main": {
                        controller: 'ContactCtrl',
                        templateUrl: 'contact/localization/localization.tpl.html'
                    }
                },
                data: { pageTitle: 'Localizacion' }
            });

    })

    .run(function run() {
    })

    .controller('ContactCtrl', function ContactCtrl($scope) {
        $scope.$on('$stateChangeSuccess', function (event, toState, toParams, fromState, fromParams) {
            if (angular.isDefined(toState.data.pageTitle)) {$scope.pageTitle = toState.data.pageTitle + ' | Market Observatory';}
        });
    }) ;