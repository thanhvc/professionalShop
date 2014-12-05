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
                    templateUrl: 'my_profile/identification.tpl.html'
                }

            },
            data: {
                pageTitle: 'Profile',
                selectMenu: 'my-patterns-nav',
                selectSubmenu: '',
                selectItemSubmenu: '',
                moMenuType: 'privateMenu'
            },
            reloadOnSearch: false,
            resolve: {
                IsLogged: "IsLogged",
                logged: function(IsLogged) {
                    IsLogged.isLogged();
                }
            }
        })
            //substates of summary
            .state('profile.identification', {
                url: '/identification',
                views: {
                    "sub-profile": {
                        templateUrl: 'my_profile/identification.tpl.html'
                    }
                },
                data: {
                    subPage: 'identification',
                    pageTitle: 'Identification personal'
                }
            })
            .state('profile.edit', {
                url: '/edit',
                views: {
                    "sub-profile": {
                        templateUrl: 'my_profile/edit.tpl.html'
                    }
                },
                data: {
                    subPage: 'edit',
                    pageTitle: 'Editar perfil'
                }
            })
            .state('profile.orders', {
                url: '/orders',
                views: {
                    "sub-profile": {
                        templateUrl: 'my_profile/orders.tpl.html',
                        controller: 'OrdersCtrl'
                    }
                },
                data: {
                    subPage: 'orders',
                    pageTitle: 'Mis órdenes'
                }
            })
            ;
    })
    .run(function run() {
    })
    .controller('ProfileCtrl', function ServicesCtrl($scope, IsLogged,$modal, ProfileService, SignUpService, $state,$http,$rootScope, $timeout) {

        $scope.modalMessage = function(message,type) {
            $modal.open({
                templateUrl: 'layout_templates/generic-modal.tpl.html',
                controller: GenericModalCtrl,
                resolve: {
                    mode: function () {
                        return type;
                    },
                    message: function() {
                        return message;
                    }
                }
            });
        };
        $scope.subPage = $state.$current.data.subPage;
        $scope.$on('$stateChangeStart', function (event, toState) {
            IsLogged.isLogged(true);
        });
        $scope.$on('$stateChangeSuccess', function (event, toState, toParams, fromState, fromParams) {
            if (angular.isDefined(toState.data.pageTitle)) {
                $scope.pageTitle = toState.data.pageTitle + ' | Market Observatory';
            }
            IsLogged.isLogged(true);
        });

        if ($state.current.name === "profile.orders") {
            ////-- orders
            $scope.notFound = false;
            $scope.orders = {
                STOCKS: [],
                PAIRS: [],
                INDEX:[],
                PAIRS_INDEX: [],
                FUTURES: []
            };


        }
        else {

            ////-----------Profile controller

            $scope.tog = 0;
            $scope.passwordPatten = /^[a-zA-Z0-9-_]+$/;
            //patterns for validation
            //letters and special characters (like dieresis) (with spaces) but not numbers or other special chars
            $scope.namePattern = /^([ \u00c0-\u01ffa-zA-Z'\-])+$/;
            //only numbers, letters and spaces
            $scope.zipPattern = /[a-z0-9\s]+/ig;
            //only numbers
            $scope.emailPattern = /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i;

            $scope.countries = [];
            SignUpService.getCountries(function(data) {
                if (data.length>0) {
                    $scope.countries = data;
                }
            });

            $scope.actualPassword = "";
            $scope.passwordUser = "";
            $scope.repeatPasswordUser = "";
            $scope.internalErrorPass = false;
            $scope.userSaved = false;
            $scope.emailUser = "";
            $scope.repeatEmailUser = "";

            $scope.passwordSubmited = false;
            $scope.passwordError = false;

            $scope.emailSubmited = false;
            $scope.emailError = false;
            $scope.internalErrorEmail = false;

            $scope.restartUser = function () {
                $scope.user =
                {   name: "",
                    surname: "",
                    emailAddress: "",
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
                        $scope.modalMessage("Se ha modificado su perfil con éxito","success");
                        $scope.userSaved = true;
                        $rootScope.$broadcast("changeName",$scope.user);
                        $timeout(function () {
                            $scope.userSaved = false;
                        }, 800);

                    } else {
                        $scope.internalError = true;
                        $scope.userSaved = false;

                        $scope.modalMessage("Ha ocurrido un error, por favor verifique sus datos y vuelva a intentarlo","error");
                        // $scope.loadUser();
                    }
                });
            };


            $scope.savePassword = function () {
                data = {
                    pass: $scope.passwordUser,
                    actPass: $scope.actualPassword
                };
                ProfileService.editPassword(data, function (data, status) {
                    $scope.passwordSubmited = true;
                    if (status == 200) {
                        if (data.result == "ok") {
                            $scope.internalErrorPass = false;
                            $scope.passwordError = false;
                            $scope.userSaved = true;
                            $timeout(function () {
                                $scope.userSaved = false;
                            }, 800);
                            $scope.modalMessage("Se ha modificado su password con éxito","success");
                        } else {
                            $scope.internalErrorPass = false;
                            $scope.passwordError = true;
                            $scope.modalMessage("Ha ocurrido un error, verifique su password y vuelva a intentarlo ","error");
                        }

                    } else {
                        $scope.internalErrorPass = true;
                        $scope.modalMessage("Ha ocurrido un error, verifique su password y vuelva a intentarlo ","error");
                    }
                });


            };

            $scope.saveEmail = function () {
                data = {
                    email: $scope.emailUser
                };
                ProfileService.editEmail(data, function (data, status) {
                    $scope.emailSubmited = true;
                    if (status == 200) {
                        if (data.result == "ok") {
                            $scope.internalErrorEmail = false;
                            $scope.emailError = false;
                            $scope.userSaved = true;
                            $timeout(function () {
                                $scope.userSaved = false;
                            }, 1500);
                            $scope.emailUser = "";
                            $scope.repeatEmailUser = "";
                            $scope.modalMessage("Se ha modificado su email con éxito. Compruebe su bandeja de entrada para completar el proceso.","success");
                        }else if(data.result="invalidMail"){
                            $scope.internalErrorEmail = false;
                            $scope.emailError = true;
                            $scope.modalMessage("El mail ya se encuentra registrado en Market Observatory","error");
                        }else {
                            $scope.internalErrorEmail = false;
                            $scope.emailError = true;
                            $scope.modalMessage("Ha ocurrido un error, verifique su email y vuelva a intentarlo ","error");
                        }

                    } else {
                        $scope.internalErrorEmail = true;
                        $scope.modalMessage("Ha ocurrido un error, verifique su email y vuelva a intentarlo ","error");
                    }
                });


            };


            $scope.loadUser();
        }
    })
    .controller('OrdersCtrl', function ServicesCtrl($scope, IsLogged,$window, ProfileService, SignUpService, $state,$http,$rootScope) {
        $scope.subPage = $state.$current.data.subPage;
        $scope.tog = 2;
        $scope.$on('$stateChangeStart', function (event, toState) {
            IsLogged.isLogged(true);
        });
        $scope.notFound= true;
        $scope.$on('$stateChangeSuccess', function (event, toState, toParams, fromState, fromParams) {
            if (angular.isDefined(toState.data.pageTitle)) {
                $scope.pageTitle = toState.data.pageTitle + ' | Market Observatory';
            }
            IsLogged.isLogged(true);
        });

        if ($state.current.name === "profile.orders") {
            ////-- orders
            $scope.orders = {
                STOCKS: [],
                PAIRS: [],
                INDEX: [],
                PAIRS_INDEX: [],
                FUTURES: []
            };
            /*token = $window.localStorage.token;
            config = {
                headers: {
                    'X-Session-Token': token
                }
            };*/
            $http.get($rootScope.urlService + '/orders'/*, config*/)
                .success(function (data, status) {
                    $scope.data = [
                        {name: "ACCIÓN",
                        packs: data.STOCKS},
                        {name: "PAR ACCIONES",
                            packs: data.PAIRS},
                        {name: "INDICE",
                            packs: data.INDEX},
                        {name: "PAR INDICE",
                            packs: data.PAIRS_INDEX},
                        {name: "FUTURO",
                            packs: data.FUTURES}
                    ];
                    if (data.STOCKS.length === 0 && data.PAIRS.length === 0 && data.INDEX.length === 0 && data.PAIRS_INDEX.length ===0 && data.FUTURES.length === 0) {
                        $scope.notFound = true;
                    } else {
                        $scope.notFound = false;
                    }
                })
                .error(function (data, status) {
                        $scope.notFound = true;
                    $scope.data = [
                        {name: "ACCIÓN",
                            packs: []},
                        {name: "PAR ACCIONES",
                            packs: []},
                        {name: "INDICE",
                            packs: []},
                        {name: "PAR INDICE",
                            packs: []},
                        {name: "FUTURO",
                            packs: []}
                    ];
                });

        }
    })
    .factory('ProfileService', function ($http, $window,$rootScope) {
        var profileService = {};
        profileService.loadUser = function (callback) {
           /* token = $window.localStorage.token;
            config = {
                headers: {
                    'X-Session-Token': token
                }
            };*/
            $http.get($rootScope.urlService+'/user'/*, config*/)
                .success(function (data, status) {
                    callback(data, status);
                })
                .error(function (data, status) {
                    callback(data, status);
                });
        };
        profileService.editUser = function (user, callback) {
            //data = user;
            token = $window.localStorage.token;
            config = {
                data: user
            };
            return $http.put($rootScope.urlService+'/user', config)
                .success(function (data, status) {
                    callback(data, status);
                })
                .error(function (data, status) {
                    callback(data, status);
                });

        };

        profileService.editPassword = function (passwords, callback) {
            //data = user;
            token = $window.localStorage.token;
            config = {
                data: passwords
            };
            return $http.put($rootScope.urlService+'/user', config)
                .success(function (data, status) {
                    callback(data, status);
                })
                .error(function (data, status) {
                    callback(data, status);
                });
        };
        profileService.editEmail = function (email, callback) {
            //data = user;
            token = $window.localStorage.token;
            config = {
                data: email
            };
            return $http.put($rootScope.urlService+'/user', config)
                .success(function (data, status) {
                    callback(data, status);
                })
                .error(function (data, status) {
                    callback(data, status);
                });
        };

        return profileService;

    });
