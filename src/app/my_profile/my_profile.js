/**
 * Created by robgon on 19/06/14.
 */


angular.module('ngMo.my_profile', [
    'ui.router',
    'ui.bootstrap',
    'singUp'
])
    .config(function config($stateProvider) {
        $stateProvider.state('profile', {
            url: '/profile',
            views: {
                "main": {
                    controller: 'ProfileCtrl',
                    templateUrl: 'my_profile/profile.tpl.html'
                },
                'sub-profile@profile': {
                    templateUrl: 'my_profile/edit.tpl.html'
                }

            },
            data: {
                pageTitle: 'Profile',
                selectMenu: 'my-patterns-nav',
                selectSubmenu: '',
                selectItemSubmenu: '',
                moMenuType: 'privateMenu'
            },
            reloadOnSearch: false
        })
            //substates of summary
            .state('profile.edit', {
                url: '/edit',
                views: {
                    "sub-profile": {
                        templateUrl: 'my_profile/edit.tpl.html'
                    }
                },
                data: {
                    subPage: 'edit',
                    pageTitle: 'Profile Edit'
                }
            })
            .state('profile.orders', {
                url: '/orders',
                views: {
                    "sub-profile": {
                        templateUrl: 'my_profile/orders.tpl.html'
                    }
                },
                data: {
                    subPage: 'orders',
                    pageTitle: 'My orders'
                }
            });
    })

    .run(function run() {
    })

    .controller('ProfileCtrl', function ServicesCtrl($scope, IsLogged, ProfileService, SignUpService) {
        $scope.$on('$stateChangeStart', function (event, toState) {
            IsLogged.isLogged();
        });
        $scope.$on('$stateChangeSuccess', function (event, toState, toParams, fromState, fromParams) {
            if (angular.isDefined(toState.data.pageTitle)) {
                $scope.pageTitle = toState.data.pageTitle + ' | Market Observatory';
            }
        });

        $scope.passwordPatten = /^[a-zA-Z0-9-_]+$/;
        //patterns for validation
        //letters and special characters (like dieresis) (with spaces) but not numbers or other special chars
        $scope.namePattern = /^([ \u00c0-\u01ffa-zA-Z'\-])+$/;
        //only numbers, letters and spaces
        $scope.zipPattern = /[a-z0-9\s]+/ig;
        //only numbers

        $scope.countries = SignUpService.getCountries();

        $scope.actualPassword = "";
        $scope.passwordUser = "";
        $scope.repeatPasswordUser = "";
        $scope.internalErrorPass= false;

        $scope.passwordSubmited= false;
        $scope.passwordError = false;


        $scope.restartUser = function () {
            $scope.user =
            {   name: "",
                surname: "",
                address: "",
                city: "",
                postalCode: "",
                country: ""
            };
        };

        //load the User info


        $scope.interalError = false;
        $scope.loadUser = function () {
            ProfileService.loadUser(function (data, status) {
                if (status === 200) {
                    $scope.user = data;
                    $scope.internalError = false;
                } else {
                    $scope.internalError = true;
                    $scope.restartUser();
                }

            });
        };

        $scope.saveUser = function () {

            ProfileService.editUser($scope.user, function (data, status) {
                if (status === 200) {
                    //$scope.user = data;
                    $scope.internalError = false;

                } else {
                    $scope.internalError = true;
                    // $scope.loadUser();
                }
            });
        };


        $scope.savePassword = function () {
            data = {
                pass: $scope.passwordUser,
                actPass: $scope.actualPassword
            };
            ProfileService.editPassword(data,function(data,status) {
                $scope.passwordSubmited = true;
                if (status == 200) {
                    if (data.result == "ok") {
                        $scope.internalErrorPass = false;
                        $scope.passwordError = false;
                    } else {
                        $scope.internalErrorPass = false;
                        $scope.passwordError = true;
                    }

                } else {
                    $scope.internalErrorPass = true;
                }
            });


        };


        $scope.loadUser();


    })
    .factory('ProfileService', function ($http, $window) {
        var profileService = {};
        profileService.loadUser = function (callback) {
            token = $window.sessionStorage.token;
            config = {
                headers: {
                    'X-Session-Token': token
                }
            };
            $http.get('http://api.mo-shopclient.development.com:9000/loaduser', config)
                .success(function (data, status) {
                    callback(data, status);
                })
                .error(function (data, status) {
                    callback(data, status);
                });
        };
        profileService.editUser = function (user, callback) {
            //data = user;
            token = $window.sessionStorage.token;
            config = {
                headers: {
                    'X-Session-Token': token
                },
                data: user
            };
            return $http.post('http://api.mo-shopclient.development.com:9000/edituser', config)
                .success(function (data, status) {
                    callback(data, status);
                })
                .error(function (data, status) {
                    callback(data, status);
                });

        };

        profileService.editPassword = function (passwords, callback) {
            //data = user;
            token = $window.sessionStorage.token;
            config = {
                headers: {
                    'X-Session-Token': token
                },
                data: passwords
            };
            return $http.post('http://api.mo-shopclient.development.com:9000/editpassword', config)
                .success(function (data, status) {
                    callback(data, status);
                })
                .error(function (data, status) {
                    callback(data, status);
                });
        };


        return profileService;

    });
