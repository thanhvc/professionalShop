angular.module('ngMo.detail', [
    'ui.router',
    'ui.bootstrap'
])
    .config(function config($stateProvider) {
        $stateProvider.state('detail', {
            url: '/detail/:id',
            views: {
                "main": {
                    controller: 'DetailCtrl',
                    templateUrl: 'detail/detail.tpl.html',
                    reloadOnSearch: false//with this option, the controller will not reload the page when it change
                    //the params on url
                }
            },
            data: {
                pageTitle: 'Detalle',
                moMenuType: 'privateMenu'
            },
            resolve: {
                DetailService: "DetailService",
                TabsService: "TabsService",
                detailData: function(DetailService) {
                    return DetailService.getPagedDataAsync().then(function (data){
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
        $scope.$on('$stateChangeStart', function (event, toState) {
            IsLogged.isLogged();
        });

        $scope.tabs = TabsService.getTabs();
        $scope.actualTab = $scope.tabs[TabsService.getActiveTab()].title;

        $scope.myData = detailData.myData;
        $scope.infoPattern = detailData.infoPattern;

        $scope.loadPage = function () {
            var data = DetailService.getPagedDataAsync().then(function (data) {
                $scope.myData = data.historical;
                $scope.infoPattern = data.infoPattern;
            });
        };
    })

    .service("DetailService", function ($http, $window, $rootScope, $q, toState) {

        /*Function to load info from server, receives the pageSize, number of page, and the filter object (that have all the filters inside)*/
        this.getPagedDataAsync = function () {
            var deferred = $q.defer();
            var data;

            config = {
                params: {
                    'token': $window.sessionStorage.token
                }
            };

            var result = $http.get($rootScope.urlService + '/detail/:id', config).then(function (response) {
                // With the data succesfully returned, call our callback
                deferred.resolve();
                return response.data;
            });
            return result;
        };
    })

    ;