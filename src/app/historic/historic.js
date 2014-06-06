/**
 * Created by laura on 6/06/14.
 */
angular.module('ngMo.historic', [
    'ui.router'
])

    .config(function config($stateProvider) {
        $stateProvider.state('historic', {
            url: '/historic',
            views: {
                "main": {
                    controller: 'HistoricCtrl',
                    templateUrl: 'historic/historic.tpl.html'
                }
            },
            data: {
                pageTitle: 'Historic',
                selectMenu: 'historic-nav',
                selectSubmenu: '',
                selectItemSubmenu: '',
                moMenuType: 'privateMenu'
            }
        });
    })

    .run(function run() {
    })

    .controller('HistoricCtrl', function ($scope) {
        $scope.$on('$stateChangeSuccess', function (event, toState, toParams, fromState, fromParams) {
            if (angular.isDefined(toState.data.pageTitle)) {
                $scope.pageTitle = toState.data.pageTitle + ' | Market Observatory';
            }
        });
    })

;