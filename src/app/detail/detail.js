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
                    $scope.graph.addEventListener('webkitTransitionEnd', function(event2) {
                        if ($scope.graph != null) {
                            $scope.graph.style.cssText = 'display:none';
                            $scope.graph.parentNode.removeChild($scope.graph);//remove the htmlDom object
                            $scope.graph = null;
                        }

                    });
                },0);
            }
        };


        //open a graph and sve it to $scope.graph
        $scope.loadGraphic = function (inputEvent,url) {
            if (typeof $scope.graph !== "undefined" && $scope.graph != null) {
                $scope.graph.parentNode.removeChild($scope.graph);//remove the htmlDom object
                $scope.graph = null;
            }

            var elemDiv = document.createElement('div');

            var h = inputEvent.srcElement.parentElement.parentElement.parentElement.offsetHeight-40;
            var w = inputEvent.srcElement.parentElement.parentElement.parentElement.offsetWidth-60;
           // var elemTitle = document.createElement('span');
            //elemTitle.innerHTML = inputEvent.srcElement.parentElement.parentElement.children[0].children[0].innerHTML;
            //elemTitle.innerHTML = name;
            var img = document.createElement('img');
            if (url == null){
                //mocked graph
                img.src = "assets/img/graphic.png";
            } else {
                //real graph
                img.src=url;
            }
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
            inputEvent.srcElement.parentElement.parentElement.parentElement.parentElement.insertBefore(elemDiv,null);

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