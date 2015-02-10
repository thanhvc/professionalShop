angular.module('ngMo.fakeCancel_pack', [
    'ui.router'
])

    .config(function config($stateProvider) {
        $stateProvider.state('cancel-pack', {
            url: '/cancel-pack/:packCode/:subCode',
            views: {
                "main": {
                    controller: 'CancelPackCtrl',
                    templateUrl: 'payment/payment-in-beta.tpl.html'
                }
            },
            data: {
                pageTitle: 'Cancelar pack',
                selectMenu: 'my-subscriptions-nav',
                selectSubmenu: '',
                selectItemSubmenu: '',
                moMenuType: 'privateMenu',
                subPage: 'cancel-pack'
            },
            resolve: {
                IsLogged: "IsLogged",
                logged: function(IsLogged) {
                    IsLogged.isLogged();
                }
            }

        });
    })

    .run(function run() {
    })
    .controller('CancelPackCtrl', function ($scope,$window,$modal, $state, $stateParams,$http,$rootScope) {

    });
