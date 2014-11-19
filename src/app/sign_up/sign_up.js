/**
 * Created by Aitor on 21/04/14.
 */

angular.module('singUp', [])

    .config(function config($stateProvider) {
        /*State for first signup step*/
        $stateProvider.state('signup', {
            url: '/sign-up',
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
                moMenuType: 'publicMenu',
                user: {
                    email: '',
                    email2: '',
                    password: '',
                    password2: '',
                    name: '',
                    surname: '',
                    address: '',
                    city: '',
                    postal: '',
                    country: '',
                    conditions: '',
                    captcha: ''
                }

            }})
            .state('signup2', {
                url: '/sign-up-step2',
                views: {
                    "main": {
                        templateUrl: 'sign_up/sign-up2.tpl.html'
                    }
                },
                data: {
                    /* empty the menu data*/
                    pageTitle: '',
                    selectMenu: '',
                    selectSubmenu: '',
                    selectItemSubmenu: '',
                    moMenuType: 'publicMenu',
                    user: {
                        email: '',
                        email2: '',
                        password: '',
                        password2: '',
                        name: '',
                        surname: '',
                        address: '',
                        city: '',
                        postal: '',
                        country: '',
                        conditions: '',
                        captcha: ''
                    }
                }
            })
            .state('signupSuccessful', {
                url: '/sign-up-successful',
                views: {
                    "main": {
                        templateUrl: 'sign_up/sign-up-successful.tpl.html'
                    }
                },
                data: {
                    /* empty the menu data*/
                    pageTitle: '',
                    selectMenu: '',
                    selectSubmenu: '',
                    selectItemSubmenu: '',
                    moMenuType: 'publicMenu',
                    user: {
                        email: '',
                        email2: '',
                        password: '',
                        password2: '',
                        name: '',
                        surname: '',
                        address: '',
                        city: '',
                        postal: '',
                        country: '',
                        conditions: '',
                        captcha: ''
                    }
                }
            })
            .state('new-subscription', {
                url: '/new-subscription',
                views: {
                    "main": {
                        templateUrl: 'sign_up/new-subscription.tpl.html'
                    }
                },
                data: {
                    /* empty the menu data*/
                    pageTitle: '',
                    selectMenu: '',
                    selectSubmenu: '',
                    selectItemSubmenu: '',
                    moMenuType: 'publicMenu',
                    user: {
                        email: '',
                        email2: '',
                        password: '',
                        password2: '',
                        name: '',
                        surname: '',
                        address: '',
                        city: '',
                        postal: '',
                        country: '',
                        conditions: '',
                        captcha: ''
                    }
                }
            });
    })
    .run(function run() {
    })

    .controller('SignupCtrl', function ($scope, $modal, $state, SignUpService, IsLogged, $rootScope, $window, authService,$http, $translatePartialLoader) {
        $scope.$on('$stateChangeStart', function (event, toState) {
           // IsLogged.isLogged();
        });
        $scope.$on('$stateChangeSuccess', function (event, toState, toParams, fromState, fromParams) {
            if (angular.isDefined(toState.data.pageTitle)) {
                $scope.pageTitle = toState.data.pageTitle + ' | Market Observatory';
            }
            $translatePartialLoader.addPart('sing_up');


            //captcha
            $scope.a = Math.ceil(Math.random() * 10);
            $scope.b = Math.ceil(Math.random() * 10);
            $scope.c = $scope.a + $scope.b;

            $scope.validBotBoot =function (){
                if (document.getElementById('captcha') == null) {
                    return false;
                }
                var d = document.getElementById('captcha').value;
                if (d == $scope.c)
                {
                    return true;
                } else {

                    return false;
                }

            };


            //form navigation

            $scope.nextInput = function(input) {
                document.getElementById(input).focus();
            };


            //newSubscription vars:
            $scope.login = {
                email :"",
                password:""
            };
            $scope.errorSignIn = false;

            $scope.newSubscriptionMode = "login";


            $scope.createNewSubs = function() {
                if ($scope.newSubscriptionMode == "login") {
                    $scope.submit();
                } else {
                    $scope.sendFirstStep();
                }
            };



            $scope.submit = function() {
                data = $scope.login;
                $http.post($rootScope.urlService+'/login', data)
                    .success(function (data, status, headers, config) {
                        $window.localStorage.token = data.authToken;
                        $window.localStorage.username = data.name;
                        authService.loginConfirmed();
                        $scope.errorSignIn = false;
                        // $state.go('my-patterns');
                        $scope.hideSignInForm();
                        $scope.currentUser = data.name;
                        $rootScope.$broadcast('goToSummaryPay'); //now goes to summary

                    })
                    .error(function (data, status, headers, config) {
                        $scope.errorSignIn = true;
                        if (data.reason == "not-activated") {
                            //the user is not activated, we send him to resend mail status
                            $state.go("reactivate");
                        }
                    });
            };

            //signup vars:
            //password Pattern, note that to not allow spaces must use ng-trim="false" in the input
            $scope.passwordPatten = /^[a-zA-Z0-9-_]+$/;
            //user model
            //$scope.user = toState.data.user;
            if ($state.user) {
                $scope.user = $state.user;

            } else {
                $scope.user = {
                    email: '',
                    email2: '',
                    password: '',
                    password2: '',
                    name: '',
                    surname: '',
                    address: '',
                    city: '',
                    postal: '',
                    country: '',
                    conditions: '',
                    captcha: ''
                };
            }
            $scope.errorForm = false;
            $scope.previousMail= "";
            //result of form submit -- just for test for now, the final results must be checked
            /*$scope.result = {
             result: "unknown",
             username: "unknown"
             };*/


            //function to send the first step form
            //Calls firstStep of the SignUpService and takes result=ok / error

            $scope.firstCallback = function (result) {
                $scope.errorForm = false;
                if (result.result == "ok") {
                    $state.user = $scope.user;
                    $scope.errorForm = false;
                    $state.go('signup2');
                } else if (result.username == "used") {
                    $scope.result = result;
                    $scope.previousMail = $scope.user.email;
                } else {
                    $scope.errorForm = true;
                }
            };
            $scope.sendFirstStep = function () {
                var result = SignUpService.firstStep($scope.user, $scope.firstCallback);
            };
            $scope.clearState = function(){
                $scope.result= "";
            };
            //Step 2

            //countries list of select (the value <option> could not be the same as the id in the html, but its works well)
            //angularjs sets internally the id in the object
            //the country selected is set in the user directly
            SignUpService.getCountries(function(data) {
                if (data.length>0) {
                    $scope.countries = data;
                }
            });//default option set in the view html

            //patterns for validation
            //letters and special characters (like dieresis) (with spaces) but not numbers or other special chars
            $scope.namePattern = /^([ \u00c0-\u01ffa-zA-Z'\-])+$/;
            //only numbers, letters and spaces
            $scope.zipPattern = /[a-z0-9\s]+/ig;
            //only numbers
            $scope.captchaPattern = /^\d+$/;
            $scope.formSubmited = false; //variable that is true when the form is submited to check the inputs
            $scope.validCaptcha = true; //set the captcha to true (correct by default, when the server responses with the valid/invalid captcha we change it)
            //send the second step submit


            $scope.secondCallback = function (result) {
                $scope.errorForm = false;
                if (result.status == "ok") {
                    $scope.validCaptcha = true;
                    //the user is deleted to clean the form, in the final case this must be sended to the user.
                    $scope.user = {
                        email: '',
                        email2: '',
                        password: '',
                        password2: '',
                        name: '',
                        surname: '',
                        address: '',
                        city: '',
                        postal: '',
                        country: '',
                        conditions: '',
                        captcha: ''
                    };
                    $scope.errorForm = false;
                    //-save user (deleted in this case)
                    $state.user = $scope.user;
                    $state.go('signupSuccessful');

                } else if (result.status == "incorrectCaptcha") {
                    $scope.validCaptcha = false;
                } else {
                    $scope.validCaptcha = true;
                    $scope.errorForm = true;
                }

            };
            $scope.sendSecondStep = function () {
                $scope.validCaptcha = true;

                //check captcha
                $scope.validCaptcha = $scope.validBotBoot();

                $scope.formSubmited = true; //set the second form as submited (to check the inputs)
                if ($scope.formReg.$valid && $scope.validCaptcha) {
                    //if the form is correct, we go to the service
                    var result = SignUpService.secondStep($scope.user, $scope.secondCallback);
                }
            };
            $scope.openModalInstanceTerms = function(url) {
                $modal.open({
                    templateUrl: 'home/modalPayment.tpl.html',
                    controller: ModalInstanceTermsCtrl,
                    resolve: {
                        infoSelected: function () {
                            return url+".tpl.html";
                        }
                    }
                });
            };
        });
    })
/**
 * Directive Match, used to check that two inputs matches (like repeat password or repeat email).
 * the directive must be used like: < input ng-model="user.repeatEmail" match="user.email"/>
 * and can be checked like <div ng-show="form.repeatMail.$error.mismatch">ERROR</div>
 */
    .directive('matchWith', function ($parse) {
        return {
            require: 'ngModel',
            link: function (scope, elem, attrs, ctrl) {
                scope.$watch(function () {
                    return $parse(attrs.matchWith)(scope) === ctrl.$modelValue;
                }, function (currentValue) {
                    ctrl.$setValidity('mismatch', currentValue);
                });
            }
        };
    })
    .factory('SignUpService', function ($http, $rootScope, $q) {
        var signUpService = {};
        signUpService.firstStep = function (user, callback) {
            data = user;
            return $http.post($rootScope.urlService+'/testemail', data)
                .success(function (data) {
                    callback(data);
                })
                .error(function (data) {
                    callback(data);
                });
        };
        signUpService.secondStep = function (user, callback) {
            data = user;
            return $http.post($rootScope.urlService+'/user', data)
                .success(function (data) {
                    callback(data);
                })
                .error(function (data) {
                    callback(data);
                });


        };

        //countries get by json (extract from server)
        signUpService.getCountries = function (callback) {

            var result = $http.get($rootScope.urlService+'/countries').success(callback).error(callback);

        };
        return signUpService;

    });

var ModalInstanceTermsCtrl = function ($scope, $modalInstance,$timeout, infoSelected) {
    $scope.infoSelected = infoSelected;
    $scope.opened = true;
    $scope.close = function () {
        if ($scope.opened) {
            $modalInstance.close();
            $scope.opened = false;
        }
    };
    $timeout(function() { //the body click event will be in a 1sec timeout, the modal will be shown minimun 1 second
        $scope.$on("body-click",function(){
            $scope.close();
        },1000);
    });

};