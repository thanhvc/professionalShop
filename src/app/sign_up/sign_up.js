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
                user : {
                    email: 'test@test.com',
                    email2: 'test2@test.com',
                    password: '11111111111',
                    password2: '222222222',
                    name: '',
                    surname: '',
                    address: '',
                    city: '',
                    postal: '',
                    country: '',
                    conditions: ''
                 }

            }})
            .state('signup2', {
                url: '/sign-up-step2',
                views: {
                    "main": {
                        /*controller: 'SignUpController',*/
                        templateUrl: 'sign_up/sign-up2.tpl.html'
                    }
                },
                data: {
                    /* empty the menu data*/
                    pageTitle: '',
                    selectMenu: '',
                    selectSubmenu: '',
                    selectItemSubmenu: '',
                    user : {
                        email: 'test@test.com',
                        email2: 'test2@test.com',
                        password: '11111111111',
                        password2: '222222222',
                        name: '',
                        surname: '',
                        address: '',
                        city: '',
                        postal: '',
                        country: '',
                        conditions: ''
                    }
                }
            })
            .state('signupSuccessful', {
                url: '/sign-up-successful',
                views: {
                    "main": {
                        /*controller: 'SignUpController',*/
                        templateUrl: 'sign_up/sign-up-successful.tpl.html'
                    }
                },
                data: {
                    /* empty the menu data*/
                    pageTitle: '',
                    selectMenu: '',
                    selectSubmenu: '',
                    selectItemSubmenu: '',
                    user : {
                        email: 'test@test.com',
                        email2: 'test2@test.com',
                        password: '11111111111',
                        password2: '222222222',
                        name: '',
                        surname: '',
                        address: '',
                        city: '',
                        postal: '',
                        country: '',
                        conditions: ''
                    }
                }
            });
    })
    .run(function run() {
    })

    .controller('SignUpController', function ($scope, $state,SignUpService) {
        $scope.$on('$stateChangeSuccess', function (event, toState, toParams, fromState, fromParams) {
            if (angular.isDefined(toState.data.pageTitle)) {
                $scope.pageTitle = toState.data.pageTitle + ' | Market Observatory';
            }

            //password Pattern, note that to not allow spaces must use ng-trim="false" in the input
            $scope.passwordPatten = /^[a-zA-Z0-9-_]+$/;
            //user model
            $scope.user = toState.data.user;
           /* {
                email: 'test@test.com',
                email2: 'test2@test.com',
                password: '11111111111',
                password2: '222222222',
                name: '',
                surname: '',
                address: '',
                city: '',
                postal: '',
                country: '',
                conditions: ''
            };*/
            //result of form submit -- just for test for now, the final results must be checked
            $scope.result = {
                result: "unknown",
                username: "unknown"
            };


            //function to send the first step form
            //Calls firstStep of the SignUpService and takes result=ok / error
            $scope.sendFirstStep = function () {
                var result = SignUpService.firstStep($scope.user);
                $scope.result = result;
                if ($scope.result.result == "ok"){
                    //if the results are OK, we save the model in the state (in case of press back button)
                    //and go to step2
                    $state.user= $scope.user;
                    $state.go('signup2');
                }

            };

        });
    })
/**
 * Directive Match, used to check that two inputs matches (like repeat password or repeat email).
 * the directive must be used like: < input ng-model="user.repeatEmail" match="user.email"/>
 * and can be checked like <div ng-show="form.repeatMail.$error.mismatch">ERROR</div>
 */
    .directive('match', function($parse) {
        return {
            require: 'ngModel',
            link: function(scope, elem, attrs, ctrl) {
                scope.$watch(function() {
                    return $parse(attrs.match)(scope) === ctrl.$modelValue;
                }, function(currentValue) {
                    ctrl.$setValidity('mismatch', currentValue);
                });
            }
        };
    })
    .factory('SignUpService',function(){
        var signUpService = {};
        signUpService.firstStep = function(user) {
            var response = {
                result: "ok",
                username: "not-used"
            };
            if (user.email == "test@test") {
                response.result = "error";
                response.username = "used";
            }
            return response;
        };
        signUpService.secondStep = function(user){
            return "ok";
        };
        return signUpService;

    })


;





