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
       $scope.pack= {
       };
        $scope.cancelOK = false;
        $scope.loading= false;
        $scope.errorLoad = false;
        $scope.errorMessage = function() {
            $modal.open({
                templateUrl: 'layout_templates/generic-modal.tpl.html',
                controller: GenericModalCtrl,
                resolve: {
                    mode: function () {
                        return "error";
                    },
                    message: function() {
                        return "Ha ocurrido un error o el pack no se ha podido procesar para cancelar";
                    }
                }
            });
        };

        $scope.successMessage = function() {
            $modal.open({
                templateUrl: 'layout_templates/generic-modal.tpl.html',
                controller: GenericModalCtrl,
                resolve: {
                    mode: function () {
                        return "success";
                    },
                    message: function() {
                        return "Se ha cancelado su pack con éxito";
                    }
                }
            });
        };
        $scope.loadPack = function(packCode,subCode) {
            config = {
                params: {
                    'packCode': packCode,
                    'subCode': subCode
                   // 'token': $window.localStorage.token
                }
            };
            $http.get($rootScope.urlService+'/cancel-pack', config).success(function (response) {
                $scope.pack = response;
                $scope.errorLoad = false;
            }).error(function(response){
                $scope.errorLoad = true;
                $scope.errorMessage();

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
                params: {
                    'packCode': $scope.pack.codePack,
                    'subCode': $scope.pack.codeSub
                    //'token': $window.localStorage.token
                }
            };
            $http.post($rootScope.urlService+'/cancel-pack', config).success(function (response) {
                //$scope.pack = response.data;
                $scope.loading= false;
                $scope.cancelOK= true;
                $scope.successMessage();
            }).error(function(response) {
                $scope.loading= false;
                $scope.cancelOK= false;
                $scope.errorLoad = true;
                $scope.errorMessage();
            });
        };

        $scope.loadPack($stateParams.packCode,$stateParams.subCode);
    });
