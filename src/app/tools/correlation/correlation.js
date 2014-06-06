angular.module('ngMo.correlation', [
    'ui.router'
])

    .config(function config($stateProvider) {
        $stateProvider.state('correlation', {
            url: '/correlation',
            views: {
                "main": {
                    controller: 'CorrelationCtrl',
                    templateUrl: 'tools/correlation/correlation.tpl.html'
                }
            },
            data: {
                pageTitle: 'Correlation',
                selectMenu: 'tools-nav',
                selectSubmenu: 'submenu1',
                selectItemSubmenu: 'correlation-nav',
                moMenuType: 'privateMenu'
            }
        });
    })

    .run(function run() {
    })

    .controller('CorrelationCtrl', function ($scope) {
        $scope.$on('$stateChangeSuccess', function (event, toState, toParams, fromState, fromParams) {
            if (angular.isDefined(toState.data.pageTitle)) {
                $scope.pageTitle = toState.data.pageTitle + ' | Market Observatory';
            }
        });
    })

    ;