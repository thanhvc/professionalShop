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
            data: {
                pageTitle: 'Soporte',
                selectMenu: 'contact-nav',
                selectSubmenu: 'submenu6',
                selectItemSubmenu: 'support-nav',
                moMenuType: 'publicMenu'
            }
        })
            .state('business', {
                url: '/business',
                views: {
                    "main": {
                        controller: 'ContactCtrl',
                        templateUrl: 'contact/business/business.tpl.html'
                    }
                },
                data: {
                    pageTitle: 'Empresas',
                    selectMenu: 'contact-nav',
                    selectSubmenu: 'submenu6',
                    selectItemSubmenu: 'business-nav',
                    moMenuType: 'publicMenu'
                }
            })
            .state('job', {
                url: '/job',
                views: {
                    "main": {
                        controller: 'ContactCtrl',
                        templateUrl: 'contact/job/job.tpl.html'
                    }
                },
                data: {
                    pageTitle: 'Empleo',
                    selectMenu: 'contact-nav',
                    selectSubmenu: 'submenu6',
                    selectItemSubmenu: 'job-nav',
                    moMenuType: 'publicMenu'
                }
            })
            .state('localization', {
                url: '/localization',
                views: {
                    "main": {
                        controller: 'ContactCtrl',
                        templateUrl: 'contact/localization/localization.tpl.html'
                    }
                },
                data: {
                    pageTitle: 'Localizacion',
                    selectMenu: 'contact-nav',
                    selectSubmenu: 'submenu6',
                    selectItemSubmenu: 'localization-nav',
                    moMenuType: 'publicMenu'
                }
            });

    })

    .run(function run() {
    })

    .controller('ContactCtrl', function ContactCtrl($scope, IsLogged) {
        $scope.$on('$stateChangeStart', function (event, toState){
            IsLogged.isLogged();
        });

        $scope.$on('$stateChangeSuccess', function (event, toState, toParams, fromState, fromParams) {
            if (angular.isDefined(toState.data.pageTitle)) {$scope.pageTitle = toState.data.pageTitle + ' | Market Observatory';}
        });
    }) ;