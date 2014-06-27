/**
 * Created by robgon on 26/06/14.
 */

angular.module('ngMo.Activate', [  'ui.router',
    'ui.bootstrap' ])

    .config(function config($stateProvider) {
        /*State for first signup step*/
        $stateProvider.state('activate', {
            url: '/activate/:token',
            views: {
                "main": {
                    templateUrl: 'sign_up/sign-up.tpl.html'
                }
            },
            data: {
                /* empty the menu data*/
                pageTitle: '',
                selectMenu: '',
                selectSubmenu: '',
                selectItemSubmenu: '',
                moMenuType: 'publicMenu'

            }});
    })
    .run(function run() {
    })

    .controller('ActivateCtrl', function ($scope, $state, $stateParams) {
        $scope.$on('$stateChangeStart', function (event, toState) {
            IsLogged.isLogged();
        });
        $scope.$on('$stateChangeSuccess', function (event, toState, toParams, fromState, fromParams) {
            if (angular.isDefined(toState.data.pageTitle)) {
                $scope.pageTitle = toState.data.pageTitle + ' | Market Observatory';
            }
        });

        $scope.token = $stateParams.token;

    });