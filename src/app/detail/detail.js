angular.module('ngMo.detail', [
    'ui.router',
    'ui.bootstrap'
])
    .config(function config($stateProvider) {
        $stateProvider.state('detail', {
            url: '/detail/:patternId',
            views: {
                "main": {
                    controller: 'DetailCtrl',
                    templateUrl: 'detail/detail.tpl.html'
                }
            },
            data: {
                pageTitle: 'Detalle',
                moMenuType: 'privateMenu'
            },
            resolve: {
                DetailService: "DetailService",
                detailData: function(DetailService, $stateParams) {
                    return DetailService.getPagedDataAsync($stateParams.patternId).then(function (data){
                        return {
                            myData: data.historical,
                            infoPattern: data.infoPattern
                        };

                    });
                }
            }
        })
        .state('pairDetail', {
            url: '/detailP/:patternId',
            views: {
                "main": {
                    controller: 'DetailCtrl',
                    templateUrl: 'detail/pair-detail.tpl.html'
                }
            },
            data: {
                pageTitle: 'Detalle',
                moMenuType: 'privateMenu'
            },
            resolve: {
                DetailService: "DetailService",
                detailData: function(DetailService, $stateParams) {
                    return DetailService.getPagedDataAsync($stateParams.patternId).then(function (data){
                        return {
                            myData: data.historical,
                            infoPattern: data.infoPattern
                        };

                    });
                }
            }
        });
    })
    .controller('DetailCtrl', function DetailCtrl($scope, $http, $state, $stateParams, $location, TabsService, ActualDateService,IsLogged, DetailService, detailData) {
        $scope.$on('$stateChangeStart', function () {
            IsLogged.isLogged();
        });

        $scope.tabs = TabsService.getTabs();
        $scope.actualTab = $scope.tabs[TabsService.getActiveTab()].title;

        $scope.myData = detailData.myData;
        $scope.infoPattern = detailData.infoPattern;
    })

    .service("DetailService", function ($http, $window, $rootScope, $q) {

        /*Function to load info from server, receives the pageSize, number of page, and the filter object (that have all the filters inside)*/
        this.getPagedDataAsync = function (patternId) {
            var deferred = $q.defer();
            var data;

            config = {
                params: {
                    'token': $window.sessionStorage.token
                }
            };

            var result = $http.get($rootScope.urlService + '/detail/'+patternId, config).then(function (response) {
                // With the data succesfully returned, call our callback
                deferred.resolve();
                return response.data;
            });
            return result;
        };
    })

    ;