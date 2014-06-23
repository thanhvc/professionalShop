angular.module('ngMo.my_packs', [
    'ui.router'
])

    .config(function config($stateProvider) {
        $stateProvider.state('my-packs', {
            url: '/my-packs',
            views: {
                "main": {
                    controller: 'MyPacksController',
                    templateUrl: 'my_packs/my_packs.tpl.html'
                },
                "my-packs-view@my-packs": {
                    templateUrl: 'my_packs/my-packs-table.tpl.html'
                }
            }

        })
        ;
    })

    .run(function run() {
    })

    .controller('MyPacksCtrl', function ($scope) {
        $scope.$on('$stateChangeSuccess', function (event, toState, toParams, fromState, fromParams) {
            if (angular.isDefined(toState.data.pageTitle)) {
                $scope.pageTitle = toState.data.pageTitle + ' | Market Observatory';
            }
        });

        loadMyPacksData();
    })

;