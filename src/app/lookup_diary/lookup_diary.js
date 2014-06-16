/**
 * Created by laura on 6/06/14.
 */
angular.module('ngMo.lookup_diary', [
    'ui.router'
])

    .config(function config($stateProvider) {
        $stateProvider.state('lookup-diary', {
            url: '/lookup-diary',
            views: {
                "main": {
                    controller: 'LookupDiaryCtrl',
                    templateUrl: 'lookup_diary/lookup_diary.tpl.html'
                }
            },
            data: {
                pageTitle: 'Lookup Diary',
                selectMenu: 'lookup-diary-nav',
                selectSubmenu: '',
                selectItemSubmenu: '',
                moMenuType: 'privateMenu'
            }
        });
    })

    .run(function run() {
    })

    .controller('LookupDiaryCtrl', function ($scope, IsLogged) {
        $scope.$on('$stateChangeStart', function (event, toState){
            IsLogged.isLogged();
        });
        $scope.$on('$stateChangeSuccess', function (event, toState, toParams, fromState, fromParams) {
            if (angular.isDefined(toState.data.pageTitle)) {
                $scope.pageTitle = toState.data.pageTitle + ' | Market Observatory';
            }
        });
    })

;