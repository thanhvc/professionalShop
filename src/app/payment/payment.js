/**
 * Created by robgon on 04/08/14.
 */

angular.module('ngMo.payment', [  'ui.router'])

    .config(function config($stateProvider) {
        /*State for first signup step*/
        $stateProvider.state('confirm-pay', {
            url: '/confirm-pay?token&PayerID',
            views: {
                "main": {

                    controller: 'ConfirmPaymentCtrl',
                    templateUrl: 'payment/confirm-pay.tpl.html'
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

            }});
    })
    .run(function run() {
    })

    .controller('ConfirmPaymentCtrl', function ($scope, $state, IsLogged, $rootScope, $window, $http,$stateParams) {
        $scope.$on('$stateChangeStart', function (event, toState) {
            IsLogged.isLogged();
        });
        $scope.$on('$stateChangeSuccess', function (event, toState, toParams, fromState, fromParams) {
            if (angular.isDefined(toState.data.pageTitle)) {
                $scope.pageTitle = toState.data.pageTitle + ' | Market Observatory';
            }
        });

        if ($stateParams.token != null && $stateParams.PayerID != null) {

            token = $window.sessionStorage.token;
            config = {
                headers: {
                    'X-Session-Token': token
                },
                data: {token: $stateParams.token,
                        payerId: $stateParams.payerId
                }
            };
            $http.post($rootScope.urlService+"/confirmPay",config).then( function(data) {
                console.log("return");
            });
        }


    });





