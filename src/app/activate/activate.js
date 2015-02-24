/**
 * Created by robgon on 26/06/14.
 */

angular.module('ngMo.Activate', [  'ui.router',
    'ui.bootstrap', 'singUp' ])

    .config(function config($stateProvider) {
        /*State for first signup step*/
        $stateProvider.state('activate', {
            url: '/activate/:token',
            views: {
                "main": {
                    controller: 'ActivateCtrl',
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

            }}).state('reactivate', {
            url: '/reactivate',
            views: {
                "main": {
                    controller: 'ReactivateCtrl',
                    templateUrl: 'activate/reactivate.tpl.html'
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
    .controller('ActivateCtrl', function ($scope, $state, $stateParams, $http,$rootScope,authService,$window,IsLogged) {
        //callback function to redirect to home with user activated or not
        $scope.callback = function(data) {
            if (data != null && data.status == "ok"){
                $window.localStorage.token = data.authToken;
                //authService.loginConfirmed();
                $scope.errorSignIn = false;
               // $scope.currentUser = data.name;
                IsLogged.isLogged(true);
                $rootScope.$broadcast('userLogged',{name:data.name,token:data.authToken,email:data.username});

                $state.go('my-patterns',{activated: true});
            } else {
                $state.go('home');
            }
        };


        if ($stateParams.token != null) {

            $scope.token = $stateParams.token;

            tokenData = {
                token : $scope.token
            };
            //take the token from params and sends to the server the token to activate the user
            $http.post($rootScope.urlService+'/activate', tokenData)
                .success(function (data) {
                    $scope.callback(data);
                })
                .error(function (data) {
                    $scope.callback(data);
                });
        }


    })
    //Reactivation of user, a page to resend a token
    .controller('ReactivateCtrl', function ($scope, $state, $stateParams, $http,$rootScope) {

        $scope.user = {email : "",
                        email2:""};
        $scope.mismatch = false;

        $scope.sent = false;
        $scope.status= "ok";
        $scope.callback = function(data) {
            $scope.sent = true;
        };


        $scope.reactivate = function() {
            $scope.mismatch = ($scope.user.email2 !== $scope.user.email);
            if ($scope.mismatch) {
                return;
            } else {

                email = {
                    email: $scope.user.email
                };
                $http.post($rootScope.urlService+ '/resendmail',email)
                    .success(function (data) {
                        $scope.callback(data);
                    })
                    .error(function (data) {
                        $scope.callback(data);
                    });

            }
        };




    });