
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
                    'X-Session-Token': token
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
            if (typeof token ==="undefined" ) {
                $rootScope.isLog = false;
                return;
            } else {
                config = {
                    headers: {
                        'X-Session-Token': token
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

            controller: function ($scope, $rootScope, SignInFormState, $http, $window, authService, $state, ShoppingCartService, $cookies,$cookieStore,PaymentService) {

                $scope.remember = false;




                if ($window.localStorage.username != null) {
                    $scope.currentUser = $window.localStorage.username;
                }
                $scope.$on('userLogged',function(data,params){
                    $scope.hideSignInForm();
                    $scope.currentUser = params.name;
                    $window.localStorage.username = params.name;
                    $window.localStorage.token = params.token;
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
                            }
                            $window.localStorage.token = data.authToken;
                            $window.localStorage.username = data.name;
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
                            /*PaymentService.getPayments(true,function (data) {

                                //this detect if some pack is with price=0, -> already subscribed pack
                                var subscribedPacks = [];
                                $scope.allBought = true;
                                $scope.amountOfPacks = 0;
                                $scope.stocks = data.stocks;
                                if (typeof $scope.stocks !== 'undefined') {
                                    for (i = 0; i < $scope.stocks.length; i++) {
                                        $scope.amountOfPacks++;
                                        if ($scope.stocks[i].price === 0) {
                                            $scope.someBought = true;

                                        } else {
                                            $scope.allBought = false;
                                        }
                                        if ($scope.stocks[i].collition === "error" || $scope.stocks[i].monthError ==="error" || $scope.stocks[i].trimestralError ==="error" ||$scope.stocks[i].yearError ==="error") {
                                            subscribedPacks.push($scope.stocks[i]);
                                        }
                                    }
                                }
                                $scope.totalStocks = data.total_stocks;
                                $scope.pairs = data.pairs;
                                if (typeof $scope.pairs !== 'undefined') {
                                    for (i = 0; i < $scope.pairs.length; i++) {
                                        $scope.amountOfPacks++;
                                        if ($scope.pairs[i].price === 0) {
                                            $scope.someBought = true;
                                        } else {
                                            $scope.allBought = false;
                                        }
                                        if ($scope.pairs[i].collition === "error" || $scope.pairs[i].monthError ==="error" || $scope.pairs[i].trimestralError ==="error" ||$scope.pairs[i].yearError ==="error") {
                                            subscribedPacks.push($scope.pairs[i]);
                                        }
                                    }
                                }
                                $scope.totalPairs = data.total_pairs;
                                $scope.index= data.index;
                                if (typeof $scope.index !== 'undefined') {
                                    for (i = 0; i < $scope.index.length; i++) {
                                        $scope.amountOfPacks++;
                                        if ($scope.index[i].price === 0) {
                                            $scope.someBought = true;
                                        } else {
                                            $scope.allBought = false;
                                        }
                                        if ($scope.index[i].collition === "error" || $scope.index[i].monthError ==="error" || $scope.index[i].trimestralError ==="error" ||$scope.index[i].yearError ==="error") {
                                            subscribedPacks.push($scope.index[i]);
                                        }
                                    }
                                }
                                $scope.totalIndex= data.total_index;
                                $scope.pairIndex= data.pairIndex;
                                if (typeof $scope.pairIndex !== 'undefined') {
                                    for (i = 0; i < $scope.pairIndex.length; i++) {
                                        $scope.amountOfPacks++;
                                        if ($scope.pairIndex[i].price === 0) {
                                            $scope.someBought = true;
                                        } else {
                                            $scope.allBought = false;
                                        }
                                        if ($scope.pairIndex[i].collition === "error" || $scope.pairIndex[i].monthError ==="error" || $scope.pairIndex[i].trimestralError ==="error" ||$scope.pairIndex[i].yearError ==="error") {
                                            subscribedPacks.push($scope.pairIndex[i]);
                                        }
                                    }
                                }
                                $scope.totalpairIndex= data.total_pairIndex;
                                $scope.futures=data.futures;
                                if (typeof $scope.futures !== 'undefined') {
                                    for (i = 0; i < $scope.futures.length; i++) {
                                        $scope.amountOfPacks++;
                                        if ($scope.futures[i].price === 0) {
                                            $scope.someBought = true;
                                        } else {
                                            $scope.allBought = false;
                                        }
                                        if ($scope.futures[i].collition === "error" || $scope.futures[i].monthError ==="error" || $scope.futures[i].trimestralError ==="error" ||$scope.futures[i].yearError ==="error") {
                                            subscribedPacks.push($scope.futures[i]);
                                        }
                                    }
                                }
                                $scope.totalFutures=data.total_futures;
                                $scope.total=data.total;
                                if (subscribedPacks.length > 0) {
                                    //there are packs that have price 0, so we need check it in the cart. Launch an event to ask to the cart
                                    $rootScope.$broadcast('updateSubscribedPacks',subscribedPacks);
                                }

                            });*/
                        })
                        .error(function (data, status, headers, config) {
                                $scope.errorSignIn = true;
                            if (data.reason == "not-activated") {
                                //the user is not activated, we send him to resend mail status
                                $state.go("reactivate");
                            }
                        });
                };

                $scope.logout = function() {
                    token = $window.localStorage.token;
                    config = {
                        headers: {
                            'X-Session-Token': token
                        }
                    };
                    $http.get($rootScope.urlService+'/logout', config)
                        .success(function () {
                            $rootScope.isLog = false;
                            $scope.removeAllItemsCart();
                            $state.go('home');
                            $window.localStorage.removeItem('token');
                            $window.localStorage.removeItem('username');
                            $window.sessionStorage.removeItem('cart');
                            clearAllCorrelationLists();
                            clearAllPortfolioLists();
                            $cookieStore.remove("name");
                            $cookieStore.remove("token");
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


