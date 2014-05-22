
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

                $scope.toggleSignInForm = function () {
                    $scope.stateSignInForm = SignInFormState.toggleSignInState();
                    console.log('pasa por aquí');
                };
            },
            link: function($scope) {
                $scope.$watch('stateSignInForm');
            },
            templateUrl:'layout_templates/sign-in-box.tpl.html'
        };
    });


