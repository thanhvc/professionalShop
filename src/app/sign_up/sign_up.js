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

            },
            resolve: {
                IsLogged: "IsLogged",
                logged: function (IsLogged) {
                    IsLogged.isLogged();
                }
            }


        })
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
                },
                resolve: {
                    IsLogged: "IsLogged",
                    logged: function (IsLogged) {
                        IsLogged.isLogged();
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
                },
                resolve: {
                    IsLogged: "IsLogged",
                    logged: function (IsLogged) {
                        IsLogged.isLogged();
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
                    },
                    resolve: {
                        IsLogged: "IsLogged",
                        logged: function (IsLogged) {
                            IsLogged.isLogged();
                        }
                    }
                }
            })
            .state('editemail', {
                url: '/editemail',
                views: {
                    "main": {
                        templateUrl: 'my_profile/newemail.tpl.html'
                    }
                },
                data: {
                    pageTitle: 'Cambio de email',
                    selectMenu: '',
                    selectSubmenu: '',
                    selectItemSubmenu: '',
                    moMenuType: 'publicMenu'
                }
            });
    })
    .run(function run() {
    })

    .controller('SignupCtrl', function ($scope, $modal, $state, SignUpService, IsLogged, $rootScope, $window, authService,$http, $translatePartialLoader) {
        $scope.$on('$stateChangeStart', function (event, toState) {

        });
        $scope.$on('$stateChangeSuccess', function (event, toState, toParams, fromState, fromParams) {
            if (angular.isDefined(toState.data.pageTitle)) {
                $scope.pageTitle = toState.data.pageTitle + ' | Market Observatory';
            }

            $translatePartialLoader.addPart('sing_up');


            $scope.passwordErrorMatch = false;

            //function to check password
            $scope.passwordCheck = function() {
                $scope.passwordErrorMatch = (form.password.value != form.password2.value);
            };

            $scope.dirtyForm = false;//true if the form is dirty <- by ng-dirty
            $scope.triedFirstStep = false;
            $scope.validForm = false;
            $scope.$watch('form.$valid',function(validity) {
                $scope.validForm = validity;
            });



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
                //special login from catalog page, set a special parameter
                data.buyLogin = true;
                $http.post($rootScope.urlService+'/login', data)
                    .success(function (data, status, headers, config) {
                        $window.localStorage.token = data.authToken;
                        $window.localStorage.username = data.name;
                        $window.localStorage.email = data.username;
                        $window.localStorage.expiredUser=false;
                        //is a expired user trying to buy??
                        if (typeof data.expiredUser !== "undefined") {
                            if (data.expiredUser) {
                                $window.localStorage.expiredUser = true;
                            }
                        }
                        $rootScope.$broadcast("userStatusChanged");

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
                $scope.triedFirstStep = true;
                if ($scope.validForm ) {
                    var result = SignUpService.firstStep($scope.user, $scope.firstCallback);
                } else {

                }

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
    .controller('NewMailCtrl', function($scope, $location, SignUpService, $timeout, $modal) {
        $scope.$on('$stateChangeSuccess', function (event, toState, toParams, fromState, fromParams) {
            if (angular.isDefined(toState.data.pageTitle)) {
                $scope.pageTitle = toState.data.pageTitle + ' | Market Observatory';
            }
        });

        $scope.emailAddress = $location.search().email;
        $scope.newEmailAddress = $location.search().newmail;
        $scope.security = $location.search().security;
        $scope.token = $location.search().token;
        $scope.actualPassword = "";
        $scope.passwordPatten = /^[a-zA-Z0-9-_]+$/;
        $scope.emailSubmited = false;
        $scope.emailError = false;
        $scope.internalError = false;
        $scope.emailSaved = false;

        $scope.saveEmail = function () {
            data = {
                password: $scope.actualPassword,
                email: $scope.emailAddress,
                newmail: $scope.newEmailAddress,
                security: $scope.security,
                token: $scope.token
            };

            SignUpService.editEmail(data, function (data, status) {
                $scope.emailSubmited = true;
                if (status == 200) {
                    if (data.result == "ok") {
                        $scope.internalError = false;
                        $scope.emailError = false;
                        $scope.emailSaved = true;
                        $timeout(function () {
                            $scope.emailSaved = false;
                        }, 1500);
                        $scope.modalMessage("Se ha modificado su email con éxito. A partir de ahora debe acceder a la aplicación con "+$scope.newEmailAddress,"success");
                    } else {
                        $scope.internalError = false;
                        $scope.emailError = true;
                        $scope.modalMessage("Ha ocurrido un error, verifique su password y vuelva a intentarlo ","error");
                    }

                } else {
                    $scope.internalError = true;
                    $scope.modalMessage("Ha ocurrido un error, verifique su password y vuelva a intentarlo ","error");
                }
            });


        };
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
        signUpService.editEmail = function (data, callback) {
            config = {
                data: data
            };
            return $http.put($rootScope.urlService+'/newemail', config)
                .success(function (data, status) {
                    callback(data, status);
                })
                .error(function (data, status) {
                    callback(data, status);
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