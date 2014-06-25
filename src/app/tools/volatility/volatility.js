angular.module('ngMo.volatility', [
    'ui.router'
])

    .config(function config($stateProvider) {
        $stateProvider.state('volatility', {
            url: '/volatility',
            views: {
                "main": {
                    controller: 'VolatilityCtrl',
                    templateUrl: 'tools/volatility/volatility.tpl.html'
                }
            },
            data: {
                pageTitle: 'Volatility',
                selectMenu: 'tools-nav',
                selectSubmenu: 'submenu1',
                selectItemSubmenu: 'volatility-nav',
                moMenuType: 'privateMenu'
            }
        });
    })

    .run(function run() {
    })

    .controller('VolatilityCtrl', function ($scope) {
       /* $scope.$on('$stateChangeSuccess', function (event, toState, toParams, fromState, fromParams) {
            if (angular.isDefined(toState.data.pageTitle)) {
                $scope.pageTitle = toState.data.pageTitle + ' | Market Observatory';
            }
        });
*/
        loadData();
    })

    ;