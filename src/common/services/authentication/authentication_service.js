
angular.module('auth',['http-auth-interceptor'])

    .config(['$httpProvider', function ($httpProvider) {
        // ...is

        // delete header from client:
        // http://stackoverflow.com/questions/17289195/angularjs-post-data-to-external-rest-api
        $httpProvider.defaults.useXDomain = true;
        delete $httpProvider.defaults.headers.common['X-Requested-With'];
        //---
        //$httpProvider.defaults.headers.common['Access-Control-Allow-Headers'] = '*'; //'Content-Type, x-xsrf-token';//


    }])


    .service('SignInFormState', function () {
        var stateSignInBox = false;
        this.toggleSignInState = function(){
            if (stateSignInBox === true) {
                stateSignInBox = false;
            }else{
                stateSignInBox = true;
            }
            return stateSignInBox;
        };
        this.hideSignInState = function(){
          stateSignInBox = false;
          return stateSignInBox;
        };
    })

    .service('IsLogged', function ($http, $window, $rootScope, $location/*,$cookieStore*/) {
        //redirect param seys to the function if the service must redirect to home if the user is not logged
        this.isLogged = function(redirect){
            token = $window.localStorage.token;
            email = $window.localStorage.email;
            if (typeof token ==="undefined" ) {
                //doesnt exist a token, so the user is not loged
                $rootScope.isLog = false;
                if ($location.path() !== '/new-subscription' && ($location.path() !== '/sign-up' && $location.path() !== 'sign-up-step2')) {
                    $location.path('/home');
                }
                return;
            } else {
                if ($rootScope.isLog) {
                    if ($location.path() == '/sign-up' || $location.path() == 'sign-up-step2') {
                        $location.path('/home');
                    }
                    //if the isLog is true and token exists, the user is logged.
                    //the security (about if this token is really logged for this user or not)
                    //now depends on each request
                    return;
                }
            }
            config = {
                headers: {
                    'X-Session-Token': token,
                    'X-Username': email
                }
            };
            $rootScope.isLog=false;
            $http.get($rootScope.urlService+'/islogged', config)
                .success(function (params, status, headers, config) {
                    $rootScope.isLog = true;
                    if ($location.path() == '/sign-up' || $location.path() == 'sign-up-step2') {
                        $location.path('/home');
                    }

                })
                .error(function (params, status, headers, config) {
                    $rootScope.isLog = false;
                    if (redirect) {
                        if ($location.path() !== '/new-subscription') {
                            $location.path('/home');
                        }
                    }
                });
        };

        this.checkLogged = function(){
            token = $window.localStorage.token;
            email = $window.localStorage.email;
            if (typeof token ==="undefined" ) {
                $rootScope.isLog = false;
                return;
            } else {
                config = {
                    headers: {
                        'X-Session-Token': token,
                        'X-Username': email
                    }
                };
                $rootScope.isLog=false;
                $http.get($rootScope.urlService+'/islogged', config)
                    .success(function (params, status, headers, config) {
                        $rootScope.isLog = true;

                    })
                    .error(function (params, status, headers, config) {
                        $rootScope.isLog = false;
                    });
            }

        };

        /*unlog the user and redirect to home*/
        this.unLog = function () {
            $rootScope.isLog = false;
            $rootScope.$broadcast("removeItemsCart");
            $window.localStorage.removeItem('token');
            $window.localStorage.removeItem('username');
            $window.localStorage.removeItem('email');
            $window.sessionStorage.removeItem('cart');
            $window.sessionStorage.removeItem("correlationStocks");
            $window.sessionStorage.removeItem("correlationStockPairs");
            $window.sessionStorage.removeItem("correlationIndices");
            $window.sessionStorage.removeItem("correlationIndicePairs");
            $window.sessionStorage.removeItem("correlationFutures");
            $window.sessionStorage.removeItem("portfolioStocks");
            $window.sessionStorage.removeItem("portfolioStockPairs");
            $window.sessionStorage.removeItem("portfolioIndices");
            $window.sessionStorage.removeItem("portfolioIndicePairs");
            $window.sessionStorage.removeItem("portfolioIndicePairsResult");
            $window.sessionStorage.removeItem("portfolioStocksResult");
            $window.sessionStorage.removeItem("portfolioStockPairsResult");
            $window.sessionStorage.removeItem("portfolioIndicesResult");
            $window.sessionStorage.removeItem("portfolioIndicePairsResult");
            //$cookieStore.remove("name");
            //$cookieStore.remove("token");
            $location.path('/home');
        };
    })

    .controller('AuthCtrl', function AuthCtrl($scope, SignInFormState) {

    })


    .directive('signInForm', function (){
        return {
            restrict: "E",

            controller: function ($scope, $rootScope, SignInFormState, $http,$modal, $window, authService, $state, ShoppingCartService, $cookies,$cookieStore,PaymentService) {

                $scope.remember = false;




                if ($window.localStorage.username != null) {
                    $scope.currentUser = $window.localStorage.username;
                }
                $scope.$on('userLogged',function(data,params){
                    $scope.hideSignInForm();
                    $scope.currentUser = params.name;
                    $window.localStorage.username = params.name;
                    $window.localStorage.token = params.token;
                    $window.localStorage.email = params.email;
                });


                $scope.$on('changeName',function(data,params) {
                    $scope.currentUser = params.name;
                    $window.localStorage.username = params.name;
                });

                $scope.stateSignInForm = false;
                $scope.firstTime = false;

                $scope.toggleSignInForm = function () {
                    $scope.stateSignInForm = SignInFormState.toggleSignInState();
                    $scope.firstTime = true;
                };
                $scope.hideSignInForm = function () {
                    $scope.stateSignInForm = SignInFormState.hideSignInState();
                };

                $scope.submit = function() {
                    if ((typeof $scope.fields === "undefined") ||
                        ((typeof $scope.fields !== "undefined") && ((typeof $scope.fields.email ==="undefined" || typeof $scope.fields.password === "undefined")))) {
                        //if the fields are undefined, the user is probably trying to login with autocompleted inputs
                        $scope.fields = {
                            email : loginForm.username.value,
                            password: loginForm.password.value
                        };
                    }


                    data = $scope.fields;
                    $http.post($rootScope.urlService+'/login', data)
                        .success(function (data, status, headers, config) {


                            if ($scope.remember) {
                                //the user is seting remember the token in a cookie
                                $cookieStore.put("token",data.authToken);
                                $cookieStore.put("name",data.name);
                                $cookieStore.put("email",data.username);
                            }
                            $window.localStorage.token = data.authToken;
                            $window.localStorage.username = data.name;
                            $window.localStorage.expiredUser = false;
                            $window.localStorage.email= data.username;
                            if (typeof data.expiredUser !== "undefined") { //check if the user is expired (but can login)
                                if (data.expiredUser) {
                                    $window.localStorage.expiredUser = true;
                                }
                            }

                            $rootScope.$broadcast("userStatusChanged");
                            authService.loginConfirmed();
                            clearAllCorrelationLists();
                            clearAllPortfolioLists();
                            $scope.errorSignIn = false;
                            $state.go('my-patterns');
                            $scope.hideSignInForm();
                            $scope.currentUser = data.name;
                            //check if the user have packs subscribed in his cart, to pass the prices to 0
                            $rootScope.isLog = true;
                            PaymentService.checkCart();

                        })
                        .error(function (data, status, headers, config) {
                                $scope.errorSignIn = true;
                            if (data.reason == "not-activated") {
                                //the user is not activated, we send him to resend mail status
                                $state.go("reactivate");
                            } else {
                                if (data.reason == "expired") {
                                        $window.localStorage.expiredUser = true;
                                    $modal.open({
                                        templateUrl: 'layout_templates/expiredModal.tpl.html',
                                        controller: ExpiredModalCtrl,
                                        resolve: {
                                            mode: function () {
                                                return "error";
                                            },
                                            message: function() {
                                                return "";
                                            }
                                        }
                                    });
                                }
                            }
                        });
                };

                $scope.logout = function() {
                    token = $window.localStorage.token;
                    email = $window.localStorage.email;
                    config = {
                        headers: {
                            'X-Session-Token': token,
                            'X-Username': email
                        }
                    };
                    $http.get($rootScope.urlService+'/logout', config)
                        .success(function () {
                            $rootScope.isLog = false;
                            $scope.removeAllItemsCart();
                            $state.go('home');
                            $window.localStorage.removeItem('token');
                            $window.localStorage.removeItem('username');
                            $window.localStorage.removeItem('expiredUser');
                            $window.localStorage.removeItem('email');
                            $window.sessionStorage.removeItem('cart');
                            clearAllCorrelationLists();
                            clearAllPortfolioLists();
                            $cookieStore.remove("name");
                            $cookieStore.remove("token");
                            $cookieStore.remove("email");
                        });
                };

                clearAllCorrelationLists = function () {
                    $window.sessionStorage.removeItem("correlationStocks");
                    $window.sessionStorage.removeItem("correlationStockPairs");
                    $window.sessionStorage.removeItem("correlationIndices");
                    $window.sessionStorage.removeItem("correlationIndicePairs");
                    $window.sessionStorage.removeItem("correlationFutures");
                };


                clearAllPortfolioLists = function () {
                    $window.sessionStorage.removeItem("portfolioStocks");
                    $window.sessionStorage.removeItem("portfolioStockPairs");
                    $window.sessionStorage.removeItem("portfolioIndices");
                    $window.sessionStorage.removeItem("portfolioIndicePairs");
                    $window.sessionStorage.removeItem("portfolioIndicePairsResult");
                    $window.sessionStorage.removeItem("portfolioStocksResult");
                    $window.sessionStorage.removeItem("portfolioStockPairsResult");
                    $window.sessionStorage.removeItem("portfolioIndicesResult");
                    $window.sessionStorage.removeItem("portfolioIndicePairsResult");
                };



                /*
                 * When the directive is loaded, check if there is a cookie with the remember me activated, to log the user
                 *
                 * */

                if (typeof $cookieStore.get("token") !== "undefined") {
                    $window.localStorage.token = $cookieStore.get("token");
                    $window.localStorage.username =$cookieStore.get("name");
                    $window.localStorage.email =$cookieStore.get("email");
                    authService.loginConfirmed();
                    clearAllCorrelationLists();
                    clearAllPortfolioLists();
                    $scope.errorSignIn = false;
                    $scope.hideSignInForm();
                    $scope.currentUser = $cookieStore.get("name");

                }
            },
            link: function($scope) {
                $scope.$watch('stateSignInForm');
                $scope.$watch('firstTime');
                $scope.$watch('errorSignIn');
                $scope.$watch('loggedUser');
            },
            templateUrl:'layout_templates/sign-in-box.tpl.html'
        };
    });


