/**
 * Created by robgon on 18/11/14.
 */
angular.module('ngMo.changePassword', [  'ui.router',
    'ui.bootstrap', 'singUp' ])

    .config(function config($stateProvider) {
        /*State for first signup step*/
        $stateProvider.state('changePassword', {
            url: '/change-password/:token',
            views: {
                "main": {
                    controller: 'ChangePasswordCtrl',
                    templateUrl: 'changePassword/change-password.tpl.html'
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
    .controller('ChangePasswordCtrl', function ($scope, $state, $stateParams,$rootScope, $http,IsLogged,$window) {
        //callback function to redirect to home with user activated or not
        $scope.mismatch = false;
        $scope.passwordPatten = /^[a-zA-Z0-9-_]+$/;
        $scope.password = "";
        $scope.password2 = "";
        $scope.changed=false;
        $scope.error = false;
        $scope.callback = function(data) {
            if (data != null && data.status == "ok"){
               $scope.error = false;
            } else {
                $scope.error = true;
            }
        };

        $scope.callbackChangePassword = function(data) {
            if (data != null && data.status == "ok"){
                $window.localStorage.token = data.authToken;
                $window.localStorage.email = data.username;
                $rootScope.$broadcast('userLogged',{name:data.name,token:data.authToken,email:data.username});
                $scope.changed=true;
                IsLogged.isLogged(true);
                $scope.error = false;
            } else {
                $scope.error = true;
            }
        };


        if ($stateParams.token != null) {

            $scope.token = $stateParams.token;

            tokenData = {
                token : $scope.token
            };
            //take the token from params and sends to the server the token to activate the user
            $http.post($rootScope.urlService+'/load-user-password', tokenData)
                .success(function (data) {
                    $scope.callback(data);
                })
                .error(function (data) {
                    $scope.callback(data);
                });
        }




        $scope.changePassword = function() {
            $scope.mismatch = ($scope.password !== $scope.password2);
            if ($scope.mismatch) {
                return;
            } else {

                data = {
                    password: $scope.password,
                    token: $scope.token
                };
                $http.post($rootScope.urlService+ '/change-password',data)
                    .success(function (data) {
                        $scope.callbackChangePassword(data);
                    })
                    .error(function (data) {
                        $scope.callbackChangePassword(data);
                    });

            }
        };




    });