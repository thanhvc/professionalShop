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
                    templateUrl: 'activate/activate.tpl.html'
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

    .controller('ActivateCtrl', function ($scope, $state, $stateParams, $http) {
        $scope.$on('$stateChangeStart', function (event, toState) {
            IsLogged.isLogged();
        });
        $scope.$on('$stateChangeSuccess', function (event, toState, toParams, fromState, fromParams) {
            if (angular.isDefined(toState.data.pageTitle)) {
                $scope.pageTitle = toState.data.pageTitle + ' | Market Observatory';
            }
        });

        $scope.callback = function(data) {
            if (data != null && data.status == "ok"){
                $state.go('home',{activated: true});
            } else {
                $state.go('home');
            }
        };


        if ($stateParams.token != null) {

            $scope.token = $stateParams.token;

            tokenData = {
                token : $scope.token
            };

            $http.post('http://api.mo.devel.edosoftfactory.com/activate', tokenData)
                .success(function (data) {
                    $scope.callback(data);
                })
                .error(function (data) {
                    $scope.callback(data);
                });
        }


    });