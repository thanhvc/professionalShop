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
    .controller('DetailCtrl', function DetailCtrl($scope, $http, $state, $stateParams, $location, TabsService, ActualDateService,IsLogged, DetailService, detailData, $timeout, $rootScope) {
        $scope.$on('$stateChangeStart', function () {
            IsLogged.isLogged();
        });

        $scope.$on('$stateChangeSuccess', function (event, toState, toParams, fromState, fromParams) {
            IsLogged.isLogged();
        });

        $scope.tabs = TabsService.getTabs();

        $scope.obtainActualTab = function () {

          switch (detailData.infoPattern.productType){
              case 'STOCK':
                  $scope.actualTab = "Acciones";
                  break;
              case 'INDICE':
                  $scope.actualTab = "Indices";
                  break;
              case 'FUTURE':
                  $scope.actualTab = "Futuros";
                  break;
          }
          if (detailData.infoPattern.indexType === 1){
            $scope.actualTab = "Par "+$scope.actualTab;
          }
        };


        $scope.closeGraph = function() {
            if (typeof $scope.graph !== "undefined" && $scope.graph != null) {
                setTimeout(function(){
                    //event.srcElement.parentElement.className ='graphic-div';
                    $scope.graph.className='div-graph-detail move-to-the-right';
                    $scope.graph.addEventListener('transitionend', function(event2) {
                        if ($scope.graph != null) {
                            $scope.graph.style.cssText = 'display:none';
                            $scope.graph.parentNode.removeChild($scope.graph);//remove the htmlDom object
                            $scope.graph = null;
                        }

                    });
                },0);
            }
        };

        $scope.generateGraphicsPdf = function (patternId, graphicName) {
            if (graphicName === 'PRICE') {
                data = DetailService.getFirstGraphicPdf(patternId).then(function (data) {
                    var filename = "detailGraphic1-"+patternId+".pdf";
                    var element = angular.element('<a/>');
                    element.attr({
                        href: 'data:attachment/pdf;base64,' + encodeURI(data),
                        target: '_blank',
                        download: filename
                    });
                    document.body.appendChild(element[0]);

                    $timeout(function() {
                        element[0].click();
                    });
                });
            }else if ("WEEKLY"){
                data = DetailService.getSecondGraphicPdf(patternId).then(function (data) {
                    var filename = "detailGraphic2-"+patternId+".pdf";
                    var element = angular.element('<a/>');
                    element.attr({
                        href: 'data:attachment/pdf;base64,' + encodeURI(data),
                        target: '_blank',
                        download: filename
                    });
                    document.body.appendChild(element[0]);

                    $timeout(function() {
                        element[0].click();
                    });
                });
            }
        };

        $scope.generateHistoricalDetailPdf = function (patternId) {
            var data = DetailService.getHistoricalDetailPdf(patternId).then(function (data) {
                var filename = "detail-"+patternId+".pdf";
                var element = angular.element('<a/>');
                element.attr({
                    href: 'data:application/pdf;base64,' + encodeURI(data),
                    target: '_blank',
                    download: filename
                });
                document.body.appendChild(element[0]);

                $timeout(function() {
                    element[0].click();
                });
            });
        };


        //open a graph and sve it to $scope.graph
        $scope.loadGraphic = function (inputEvent,url) {
            if (typeof $scope.graph !== "undefined" && $scope.graph != null) {
                $scope.graph.parentNode.removeChild($scope.graph);//remove the htmlDom object
                $scope.graph = null;
            }

            var elemDiv = document.createElement('div');

            var h = inputEvent.target.parentElement.parentElement.parentElement.offsetHeight-40;
            var w = inputEvent.target.parentElement.parentElement.parentElement.offsetWidth-74;
           // var elemTitle = document.createElement('span');
            //elemTitle.innerHTML = inputEvent.srcElement.parentElement.parentElement.children[0].children[0].innerHTML;
            //elemTitle.innerHTML = name;
            var img = document.createElement('img');

            img.src=url;

            img.className ="graphic-image-div-lookup-diary";
            elemDiv.className = 'div-graph-detail';
            elemDiv.style.cssText += 'height:' + h + 'px;';
            elemDiv.style.cssText += 'width:' + w + 'px;';


            var closeButton = document.createElement('div');
            //closeButton.src = "assets/img/close_modal.png";
            closeButton.className = 'close-graphic-button-diary-lookup';
            closeButton.onclick = function (event) {

                $scope.closeGraph();
            };
           // elemDiv.appendChild(elemTitle);
            elemDiv.appendChild(closeButton);
            elemDiv.appendChild(img);
            inputEvent.target.parentElement.parentElement.parentElement.parentElement.insertBefore(elemDiv,null);

            setTimeout(function(){
                elemDiv.className+=' move';

            },0);
            $scope.graph = elemDiv;
            return 0;

        };

        $scope.$on('body-click',function() {
            $scope.closeGraph();
        });
        $scope.obtainActualTab();

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
                    'token': $window.localStorage.token
                }
            };

            var result = $http.get($rootScope.urlService + '/detail/'+patternId, config).then(function (response) {
                // With the data succesfully returned, call our callback
                deferred.resolve();
                return response.data;
            });
            return result;
        };

        this.getFirstGraphicPdf = function (patternId) {
            var deferred = $q.defer();

            config = {
                headers: {
                    'patternId': patternId,
                    'token': $window.localStorage.token
                }
            };

            var result = $http.post($rootScope.urlService+'/firstgraphicpdf', config).then(function (response) {
                // With the data succesfully returned, call our callback
                deferred.resolve();
                return response.data;
            });
            return result;
        };


        this.getSecondGraphicPdf = function (patternId) {
            var deferred = $q.defer();

            config = {
                headers: {
                    'patternId': patternId,
                    'token': $window.localStorage.token
                }
            };

            var result = $http.post($rootScope.urlService+'/secondgraphicpdf', config).then(function (response) {
                // With the data succesfully returned, call our callback
                deferred.resolve();
                return response.data;
            });
            return result;
        };

        this.getHistoricalDetailPdf = function (patternId) {
            var deferred = $q.defer();

            config = {
                headers: {
                    'patternId': patternId,
                    'token': $window.localStorage.token
                }
            };

            var result = $http.post($rootScope.urlService+'/historicaldetailpdf', config).then(function (response) {
                // With the data succesfully returned, call our callback
                deferred.resolve();
                return response.data;
            });
            return result;
        };
    })

    ;