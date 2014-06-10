
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

    .service('IsLogged', function ($http) {
        this.isLogged = function(token){
            data = token;
            $http.post('http://localhost:9000/isLogged', data)
                .success(function (data, status, headers, config) {
                    console.log('user logged');
                    return true;
                })
                .error(function (data, status, headers, config) {
                    console.log('user not logged');
                    return false;
                });
        };
    })

    .controller('AuthCtrl', function AuthCtrl($scope, SignInFormState) {

    })


    .directive('signInForm', function (){
        return {
            restrict: "E",

            controller: function ($scope, SignInFormState, $http, $window, authService, $state) {

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
                    data = $scope.fields;
                    $http.post('http://localhost:9000/login', data)
                        .success(function (data, status, headers, config) {
                            //  console.log("success");
                            //  console.log(data);
                            $window.sessionStorage.token = data.authToken;
                            authService.loginConfirmed();
                            $scope.errorSignIn = true;
                            $state.go('my-patterns');
                            $scope.hideSignInForm();
                            $scope.currentUser = data.name;

                        })
                        .error(function (data, status, headers, config) {
                                console.log("error");
                                $scope.errorSignIn = true;
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
                $scope.$watch('errorSignIn');
                $scope.$watch('loggedUser');
            },
            templateUrl:'layout_templates/sign-in-box.tpl.html'
        };
    });


