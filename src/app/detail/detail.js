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
                IsLogged: "IsLogged",
                detailData: function(DetailService, $stateParams,IsLogged) {
                    IsLogged.isLogged(true);
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
                IsLogged: "IsLogged",
                detailData: function(DetailService, $stateParams,IsLogged) {
                    IsLogged.isLogged(true);
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
    .controller('DetailCtrl', function DetailCtrl($scope, $filter, $http, $state, $stateParams, $location, TabsService, ActualDateService,IsLogged, DetailService, detailData, $timeout, $rootScope, $translatePartialLoader,$translate) {
        $scope.$on('$stateChangeStart', function () {
            IsLogged.isLogged(true);
        });

        $scope.$on('$stateChangeSuccess', function (event, toState, toParams, fromState, fromParams) {
            IsLogged.isLogged(true);
        });

        $translatePartialLoader.addPart("detail");

        $scope.tabs = TabsService.getTabs();
        $scope.isDisabled = false;
        $scope.productType= null;
        $scope.patternYear = new Date(detailData.infoPattern.entryDate).getFullYear();
        $scope.obtainActualTab = function () {

          switch (detailData.infoPattern.productType){
              case 'STOCK':
                  if (detailData.infoPattern.indexType === 1){
                      $scope.productType = "STOCKS_PAIRS";
                  } else {
                      $scope.productType = "STOCKS";
                  }
                  break;
              case 'INDICE':
                  if (detailData.infoPattern.indexType === 1){
                      $scope.productType = "INDEX_PAIRS";
                  } else {
                      $scope.productType = "INDICES";
                  }
                  break;
              case 'FUTURE':
                  $scope.productType = "FUTURE";
                  break;
          }
        };


        $scope.closeGraph = function() {
            if (typeof $scope.graph !== "undefined" && $scope.graph != null) {
                /*$timeout(function(){
                    //event.srcElement.parentElement.className ='graphic-div';
                    $scope.graph.className='div-graph-detail move-to-the-right';
                    $scope.graph.addEventListener('transitionend', function(event2) {
                        if ($scope.graph != null) {
                            $scope.graph.style.cssText = 'display:none';
                            $scope.graph.parentNode.removeChild($scope.graph);//remove the htmlDom object
                            $scope.graph = null;
                        }

                    });
                },0);*/
                $scope.graph.className ="div-graph-detail move-right-detail";
                $timeout(function(){
                    if ($scope.graph != null) {
                        $scope.graph.style.cssText = 'display:none';
                        $scope.graph.parentNode.removeChild($scope.graph);//remove the htmlDom object
                        $scope.graph = null;
                    }
                },1000);
            }
        };

        $scope.generateGraphicsPdf = function (patternId, graphicName) {
            $scope.isDisabled = true;
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
                        $scope.isDisabled = false;
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
                        $scope.isDisabled = false;
                    });

                });
            }
        };

        $scope.generateHistoricalDetailPdf = function (patternId) {
            $scope.isDisabled = true;
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
                    $scope.isDisabled = false;
                });
            });
        };


        //open a graph and sve it to $scope.graph
        $scope.loadGraphic = function (inputEvent,url) {
            var previousGraph = false;
            if (typeof $scope.graph !== "undefined" && $scope.graph != null) {
                $scope.graph.parentNode.removeChild($scope.graph);//remove the htmlDom object
                $scope.graph = null;
                previousGraph = true;
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
            closeButton.className = 'close-graphic-button-detail';
            closeButton.onclick = function (event) {

                $scope.closeGraph();
            };
           // elemDiv.appendChild(elemTitle);
            elemDiv.appendChild(closeButton);
            elemDiv.appendChild(img);
            inputEvent.target.parentElement.parentElement.parentElement.parentElement.insertBefore(elemDiv,null);
            elemDiv.style.left = "75px";
            if (!previousGraph) {
                $timeout(function () {
                    elemDiv.className += ' move-detail';

                }, 0);
            }
            $scope.graph = elemDiv;
            return 0;

        };

        $scope.$on('body-click',function() {
            $scope.closeGraph();
        });
        $scope.obtainActualTab();

        $scope.myData = detailData.myData;
        $scope.infoPattern = detailData.infoPattern;
        //translate tooltip
        if ($scope.infoPattern.currencyName == "INDEX" || $scope.infoPattern.currencyName == "FUTURE") {
            $scope.infoPattern.currencyName = $filter('translate')("DETAIL." + $scope.infoPattern.currencyName);
        }
        $scope.graphYear = $scope.patternYear;
        //graphYear will be the range of years of the graph, loaded from myData
        if ($scope.myData.length>0) {
           $scope.graphYear = $scope.myData[0].year;
        }

    })

    .service("DetailService", function ($http, $window, $rootScope, $q) {

        /*Function to load info from server, receives the pageSize, number of page, and the filter object (that have all the filters inside)*/
        this.getPagedDataAsync = function (patternId) {
            var deferred = $q.defer();
            var data;

            config = {
                /*params: {
                    'token': $window.localStorage.token
                }*/
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