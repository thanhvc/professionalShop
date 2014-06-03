
angular.module('auth',['http-auth-interceptor'])

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

    .controller('AuthCtrl', function AuthCtrl($scope, SignInFormState) {

    })

    .directive('signInForm', function (){
        return {
            restrict: "E",
            controller: function($scope, SignInFormState, $http, authService){
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
                    $http.post('auth/login').success(function() {
                        authService.loginConfirmed();
                    });
                };

                /*$scope.logout = function() {
                    $http.post('auth/logout').success(function () {
                        $scope.restrictedContent = [];
                    });
                };*/
            },
            link: function($scope) {
                $scope.$watch('stateSignInForm');
                $scope.$watch('firstTime');
            },
            templateUrl:'layout_templates/sign-in-box.tpl.html'
        };
    });


