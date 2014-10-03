/**
 * Created by robgon on 02/10/14.
 */

angular.module('ngMo.renew', [  'ui.router'])

    .config(function config($stateProvider) {
        /*State for first signup step*/
        $stateProvider.state('renew-pack', {
            url: '/renew-pack/:packCode',
            views: {
                "main": {

                    controller: 'RenewPackCtrl',
                    templateUrl: 'renew_pack/renew_pack.tpl.html'
                }
            },
            data: {
                /* empty the menu data*/
                pageTitle: '',
                selectMenu: '',
                selectSubmenu: '',
                selectItemSubmenu: '',
                moMenuType: 'publicMenu'

            }});
    })
    .run(function run() {
    })

    //confirm Card this status only is when the cpayment is OK, so always shows OK
    .controller('RenewPackCtrl', function ($scope, $state,IsLogged, $rootScope,$http,$stateParams,PaymentService,$window,authService) {
        //$scope.status = "OK";
        $scope.loading = false;
        $scope.error = false;
        $scope.errorPack= false;
        $scope.$on('$stateChangeStart', function (event, toState) {
            IsLogged.isLogged(false);
        });
        $scope.pack = null;
        $scope.passwordPatten = /^[a-zA-Z0-9-_]+$/;
        $scope.login  = {
            password: "",
            email: ""
        };

        $scope.loadPack = function () {

            $scope.errorPack= false;
            config = {
                params: {
                    packCode: $stateParams.packCode
                }
            };
            $http.get($rootScope.urlService + "/pack",config).then (function(data) {
                if (typeof data.data.name != "undefined") {

                    $scope.pack = {
                        name : data.data.name,
                        code: data.data.packCode,
                        startDate: data.data.startDate,
                        endDate: data.data.endDate,
                        duration: data.data.duration,
                        patternType: data.data.patternType,
                        productType: data.data.productType
                    };
                    $scope.errorPack= false;
                } else {
                    $scope.errorPack= true;
                }
            });
        };

        $scope.submit = function() {
            $scope.loading = true;
            $scope.fields = {
                email : $scope.login.email,
                password: $scope.login.password
            };

            data = $scope.fields;
            $http.post($rootScope.urlService+'/login', data) .success(function (data, status, headers, config) {
                    $scope.loading= false;
                    $window.localStorage.token = data.authToken;
                    $window.localStorage.username = data.name;
                    authService.loginConfirmed();
                    $scope.errorSignIn = false;
                    $scope.error = false;
                    //check if the user have packs subscribed in his cart, to pass the prices to 0
                    IsLogged.isLogged();
                    PaymentService.checkCart();
                    $rootScope.$broadcast('toggleItemCart',$scope.pack);
                    $scope.$on("itemAddedToCart",function(){
                        $state.go('summary-pay');
                    });


                    //if the user is logged


                }
                ).error(function () {
                    $scope.loading= false;
                    $scope.error = true;
                });
        };




        $scope.loadPack();

    });