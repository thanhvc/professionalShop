
angular.module('auth',[])

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
    })

    .controller('AuthCtrl', function AuthCtrl($scope, SignInFormState) {

    })

    .directive('signInForm', function (){
        return {
            restrict: "E",
            controller: function($scope, SignInFormState){
                $scope.stateSignInForm = false;
                $scope.firstTime = false;

                $scope.toggleSignInForm = function () {
                    $scope.stateSignInForm = SignInFormState.toggleSignInState();
                    $scope.firstTime = true;
                };
            },
            link: function($scope) {
                $scope.$watch('stateSignInForm');
                $scope.$watch('firstTime');
            },
            templateUrl:'layout_templates/sign-in-box.tpl.html'
        };
    });


