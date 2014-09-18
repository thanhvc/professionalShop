
angular.module('auth',['http-auth-interceptor'])

    .config(['$httpProvider', function ($httpProvider) {
        // ...

        // delete header from client:
        // http://stackoverflow.com/questions/17289195/angularjs-post-data-to-external-rest-api
        $httpProvider.defaults.useXDomain = true;
        delete $httpProvider.defaults.headers.common['X-Requested-With'];
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

    .service('IsLogged', function ($http, $window, $rootScope) {
        this.isLogged = function(){
            token = $window.sessionStorage.token;
            if (typeof token ==="undefined" ) {
                //doesnt exist a token, so the user is not loged
                $rootScope.isLog = false;
                return;
            } else {
                if ($rootScope.isLog) {
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

                })
                .error(function (params, status, headers, config) {
                    $rootScope.isLog = false;
                    $state.go('home');
                });
        };
    })

    .controller('AuthCtrl', function AuthCtrl($scope, SignInFormState) {

    })


    .directive('signInForm', function (){
        return {
            restrict: "E",

            controller: function ($scope, $rootScope, SignInFormState, $http, $window, authService, $state, ShoppingCartService, $cookies,$cookieStore,PaymentService) {

                $scope.remember = false;




                if ($window.sessionStorage.username != null) {
                    $scope.currentUser = $window.sessionStorage.username;
                }
                $scope.$on('userLogged',function(data,params){
                    $scope.hideSignInForm();
                    $scope.currentUser = params.name;
                    $window.sessionStorage.username = params.name;
                    $window.sessionStorage.token = params.token;
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
                            $window.sessionStorage.token = data.authToken;
                            $window.sessionStorage.username = data.name;
                            authService.loginConfirmed();
                            clearAllCorrelationLists();
                            clearAllPortfolioLists();
                            $scope.errorSignIn = false;
                            $state.go('my-patterns');
                            $scope.hideSignInForm();
                            $scope.currentUser = data.name;
                            //check if the user have packs subscribed in his cart, to pass the prices to 0

                            PaymentService.getPayments(true,function (data) {

                                //this detect if some pack is with price=0, -> already subscribed pack
                                var subscribedPacks = [];
                                $scope.allBought = true;
                                $scope.amountOfPacks = 0;
                                $scope.stocks = data.stocks;
                                for (i=0;i<$scope.stocks.length;i++) {
                                    $scope.amountOfPacks++;
                                    if ($scope.stocks[i].price ===0) {
                                        $scope.someBought = true;
                                        subscribedPacks.push($scope.stocks[i]);
                                    } else {
                                        $scope.allBought = false;
                                    }
                                }
                                $scope.totalStocks = data.total_stocks;
                                $scope.pairs = data.pairs;
                                for (i=0;i<$scope.pairs.length;i++) {
                                    $scope.amountOfPacks++;
                                    if ($scope.pairs[i].price ===0) {
                                        $scope.someBought = true;
                                        subscribedPacks.push($scope.pairs[i]);
                                    } else {
                                        $scope.allBought = false;
                                    }
                                }
                                $scope.totalPairs = data.total_pairs;
                                $scope.index= data.index;
                                for (i=0;i<$scope.index.length;i++) {
                                    $scope.amountOfPacks++;
                                    if ($scope.index[i].price ===0) {
                                        $scope.someBought = true;
                                        subscribedPacks.push($scope.index[i]);
                                    } else {
                                        $scope.allBought = false;
                                    }
                                }
                                $scope.totalIndex= data.total_index;
                                $scope.pairIndex= data.pairIndex;
                                for (i=0;i<$scope.pairIndex.length;i++) {
                                    $scope.amountOfPacks++;
                                    if ($scope.pairIndex[i].price ===0) {
                                        $scope.someBought = true;
                                        subscribedPacks.push($scope.pairIndex[i]);
                                    } else {
                                        $scope.allBought = false;
                                    }
                                }
                                $scope.totalpairIndex= data.total_pairIndex;
                                $scope.futures=data.futures;
                                for (i=0;i<$scope.futures.length;i++) {
                                    $scope.amountOfPacks++;
                                    if ($scope.futures[i].price ===0) {
                                        $scope.someBought = true;
                                        subscribedPacks.push($scope.futures[i]);
                                    } else {
                                        $scope.allBought = false;
                                    }
                                }
                                $scope.totalFutures=data.total_futures;
                                $scope.total=data.total;
                                if (subscribedPacks.length > 0) {
                                    //there are packs that have price 0, so we need check it in the cart. Launch an event to ask to the cart
                                    $rootScope.$broadcast('updateSubscribedPacks',subscribedPacks);
                                }

                            });
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
                    token = $window.sessionStorage.token;
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
                            $window.sessionStorage.removeItem('token');
                            $window.sessionStorage.removeItem('username');
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
                };



                /*
                 * When the directive is loaded, check if there is a cookie with the remember me activated, to log the user
                 *
                 * */

                if (typeof $cookieStore.get("token") !== "undefined") {
                    $window.sessionStorage.token = $cookieStore.get("token");
                    $window.sessionStorage.username =$cookieStore.get("name");
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


