/**
 * Created by robgon on 26/06/14.
 */

angular.module('ngMo.Unsubscribe', [  'ui.router',
    'ui.bootstrap', 'singUp' ])

    .config(function config($stateProvider) {
        /*State for first signup step*/
        $stateProvider.state('unsubscribe', {
            url: '/unsubscribe/:token',
            views: {
                "main": {
                    controller: 'UnsubscribeCtrl',
                    templateUrl: 'unsubscribe/unsubscribe.tpl.html'
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
    //activation of user Controller
    .controller('UnsubscribeCtrl', function ($scope, $state, $stateParams, $http,$rootScope,authService,$window,IsLogged) {
        //callback function to redirect to home with user activated or not
        $scope.checking = true;
        $scope.success = false;
        $scope.callback = function(data) {
            $scope.checking = false;
            if (data != null && data.status == "ok"){
                $window.localStorage.token = data.authToken;
                // $scope.currentUser = data.name;
                IsLogged.isLogged(true);
                $rootScope.$broadcast('userLogged',{name:data.name,token:data.authToken,email:data.username});
                $scope.success=true;

            } else {
                $scope.success=false;
            }
        };


        if ($stateParams.token != null) {

            $scope.token = $stateParams.token;

            tokenData = {
                token : $scope.token
            };
            //take the token from params and sends to the server the token to activate the user
            $http.post($rootScope.urlService+'/unsubscribe', tokenData)
                .success(function (data) {
                    $scope.callback(data);
                })
                .error(function (data) {
                    $scope.callback(data);
                });
        }


    });