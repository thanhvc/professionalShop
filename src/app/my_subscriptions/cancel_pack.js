angular.module('ngMo.cancel_pack', [
    'ui.router'
])

    .config(function config($stateProvider) {
        $stateProvider.state('cancel-pack', {
            url: '/cancel-pack/:packCode/:subCode',
            views: {
                "main": {
                    controller: 'CancelPackCtrl',
                    templateUrl: 'my_subscriptions/cancel_pack.tpl.html'
                }
            },
            data: {
                pageTitle: 'Cancelar pack',
                selectMenu: 'my-subscriptions-nav',
                selectSubmenu: '',
                selectItemSubmenu: '',
                moMenuType: 'privateMenu',
                subPage: 'cancel-pack'
            }
        });
    })

    .run(function run() {
    })
    .controller('CancelPackCtrl', function ($scope,$window, $state, $stateParams,$http,$rootScope) {
       $scope.pack= {
       };
        $scope.cancelOK = false;
        $scope.loading= false;
        $scope.errorLoad = false;

        $scope.loadPack = function(packCode,subCode) {
            config = {
                params: {
                    'packCode': packCode,
                    'subCode': subCode,
                    'token': $window.sessionStorage.token
                }
            };
            $http.get($rootScope.urlService+'/cancel-pack', config).success(function (response) {
                $scope.pack = response;
                $scope.errorLoad = false;
            }).error(function(response){
                $scope.errorLoad = true;
            });

        };


        $scope.cancel = function() {
            $state.go('my-subscriptions.my-packs');
        };

        $scope.confirmCancelation = function() {
            $scope.loading= true;
            $scope.errorLoad = false;
            $scope.cancelOK= false;
            config = {
                    'packCode':  $scope.pack.codePack,
                    'subCode': $scope.pack.codeSub,
                    'token': $window.sessionStorage.token
            };
            $http.post($rootScope.urlService+'/cancel-pack', config).success(function (response) {
                //$scope.pack = response.data;
                $scope.loading= false;
                $scope.cancelOK= true;
            }).error(function(response) {
                $scope.loading= false;
                $scope.cancelOK= false;
                $scope.errorLoad = true;
            });
        };

        $scope.loadPack($stateParams.packCode,$stateParams.subCode);
    });
