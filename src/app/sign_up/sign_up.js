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
                selectItemSubmenu: ''

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
                    selectItemSubmenu: ''
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
                    selectItemSubmenu: ''
                }
            });
    })
    .run(function run() {
    })

    .controller('SignUpController', function ($scope) {
        $scope.$on('$stateChangeSuccess', function (event, toState, toParams, fromState, fromParams) {
            if (angular.isDefined(toState.data.pageTitle)) {$scope.pageTitle = toState.data.pageTitle + ' | Market Observatory';}

            $scope.user = {
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
    .factory('sign-up-step1Service',function(user){
        var respond = {
          result: "ok",
            username: "not-used"
        };
        if (user.email == "test@test") {
            respond.result= "error";
            respond.username="used";
        }
        return result;

    })


;





