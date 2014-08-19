angular.module('ngMo.the_week', [
    'ui.router'
])

    .config(function config($stateProvider) {
        $stateProvider.state('the-week', {
            url: '/the-week',
            views: {
                "main": {
                    controller: 'TheWeekCtrl',
                    templateUrl: 'the_week/the-week.tpl.html'
                }
            },
            data: {
                pageTitle: 'La Semana',
                selectMenu: 'the-week-nav',
                selectSubmenu: '',
                selectItemSubmenu: '',
                moMenuType: 'privateMenu'
            }
        });
    })

    .run(function run() {
    })

    .controller('TheWeekCtrl', function ($scope,$http, ActualDateService, IsLogged, $window,$rootScope) {
        $scope.$on('$stateChangeStart', function (event, toState){
            IsLogged.isLogged();
        });

        $scope.$on('$stateChangeSuccess', function (event, toState, toParams, fromState, fromParams) {
            if (angular.isDefined(toState.data.pageTitle)) {$scope.pageTitle = toState.data.pageTitle + ' | Market Observatory';}
        });
        $scope.days= [];
        $scope.obtainDateMondaythisWeek = function () {
            var firstDay = ActualDateService.actualDate(function (data) {
                var DAY = 86400000;//day in millisecs
                var today = new Date(data.actualDate);
                var monday = new Date();
                var dayOfWeek = (today.getDay() === 0 ? 7 : today.getDay() - 1);
                monday.setDate(today.getDate()-dayOfWeek);
                $scope.mondayDay = monday.getDate();
                /*
                var monthsDays = [31,28,31,30,31,30,31,31,30,31,30,31];
                var m = monday.getMonth();
                var day = monday.getDate();
                var year = monday.getYear();

                if(year % 4 === 0 && year % 100 !== 0 || year% 400 === 0) {
                    monthsDays[1] = 29;
                }

                $scope.nextDay = (day % monthsDays[m]) + 7;*/
                $scope.days[0]= $scope.mondayDay;
                //calculate all the week
                for (var i = 1; i < 7; i++) {
                    var next = new Date();
                    next.setDate(monday.getDate() + i);
                    $scope.days[i]=next.getDate();
                }



            });
        };


        /**
         * TODO: replace number for service
         * @type {number}
         */


        var months = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"];

        var data = ActualDateService.actualDate(function (data) {
            $scope.year = new Date(data.actualDate).getFullYear();
            $scope.month = months[new Date(data.actualDate).getMonth() ];

        });

        var data2 = ActualDateService.actualWeek(function (data) {
            $scope.weekOfYear = data.numWeek;
        });

        $scope.obtainDateMondaythisWeek();


        $scope.loadData = function() {
            config = {
                params: {
                    'authToken': $window.sessionStorage.token
                }
            };

            $http.get($rootScope.urlService+"/weekData/2014", config).success(function(data){
                console.log("ok");
                stockAreas = data[0];
                $scope.stockAreas = data.STOCKS;
                $scope.commoditiesAreas = data.COMMODITIES;
                $scope.sypSectors = data.SP500;

                //note: the logic to see which stocks are displayed and which are hidden is now here,
                //in stocks only are going to be displayed:
                /* - EEUU, CANADA,BRAZIL,MEXICO
                   - JAPAN, AUSTRALIA, HONG KONG, CHINA, INDIA, SOUTH KOREA
                   - GERMANY, UNITED KINGDOM, FRANCE, ITALY, SPAIN, SWITZERLAND,SWEDEN, RUSSIA
                   - GLOBAL

                   the stocks are given ordered, so this means that the display field must be true in the
                   4 first sections of the first area, the 6 sections of the second area and 8 sections of the third area.
                   The last area only has a section (with display true)
                 */
                var sectionsToDisplay= [4,6,8,1];

                //we are going to loop all the sections to set which is displayed and which no,
                //in the same loop we are going to set which asset is grey and which is white (in the TR)
                //that's because cant be set by CSS,
                var isGrey=false;
                for (i= 0; i<$scope.stockAreas.length; i++) {
                    //areas loop
                    isGrey=false;
                    for (j=0; j<$scope.stockAreas[i].regions.length;j++) {
                        if (j<sectionsToDisplay[i]) {
                            $scope.stockAreas[i].regions[j].initial_show= true;
                        }
                        for (k=0; k<$scope.stockAreas[i].regions[j].assets.length;k++) {
                            //loop setting each css
                            $scope.stockAreas[i].regions[j].assets[k].isGrey= isGrey;
                            isGrey = !isGrey;
                        }
                    }
                }

                //for others tabs just is even/odd in each sect

                for (i= 0; i<$scope.commoditiesAreas.length; i++) {
                    //areas loop

                    for (j=0; j<$scope.commoditiesAreas[i].regions.length;j++) {
                        isGrey=false;
                        for (k=0; k<$scope.commoditiesAreas[i].regions[j].assets.length;k++) {
                            //loop setting each css
                            $scope.commoditiesAreas[i].regions[j].assets[k].isGrey= isGrey;
                            isGrey = !isGrey;
                        }
                    }
                }
                for (i= 0; i<$scope.sypSectors.length; i++) {
                    //areas loop

                    for (j=0; j<$scope.sypSectors[i].regions.length;j++) {
                        isGrey=false;
                        for (k=0; k<$scope.sypSectors[i].regions[j].assets.length;k++) {
                            //loop setting each css
                            $scope.sypSectors[i].regions[j].assets[k].isGrey= isGrey;
                            isGrey = !isGrey;
                        }
                    }
                }


            })
            .error(function(data){
                    console.log("error");
                });
        };

        $scope.showIndices = true;
        $scope.loadData();

        //Tabs the-week tables
        $scope.the_week_tables =
             [
                {
                    title: 'Bolsa',
                    value: 0,
                    url: 'the_week/tables_the_week/stock-exchange.tpl.html'
                },
                {
                    title: 'Commodities',
                    value: 1,
                    url: 'the_week/tables_the_week/commodities.tpl.html'
                },
                {
                    title: 'S&P',
                    value: 2,
                    url: 'the_week/tables_the_week/s&p.tpl.html'
                }
            ];

        $scope.stockAreas = [];

        $scope.commoditiesAreas = [];

        $scope.sypSectors = [];


    })

    .directive('selectedGraphicPanel', function () {
        return {
            controller: function ($scope, $timeout, $state){
                $scope.openGraph = false;

                $scope.showSelectedGraphic = function (e, name, url) {

                    if ($scope.openGraph === true){
                        //$scope.hideSelectedGraphic();
                        $timeout( function(){
                            $scope.openGraph = true;
                        },800);
                    }else{
                        $scope.openGraph = true;
                    }

                    $scope.selectedGraphic = {
                        indiceName:  name,
                        url: url
                    };

                    if(typeof e !== 'undefined') {
                        //this depends on if the webbrowser is firefox or chrome
                        if (typeof e.srcElement !== 'undefined') {
                            //chrome
                            $scope.myTop = e.srcElement.y + e.srcElement.height + 'px';
                            $scope.myLeft = e.srcElement.x + (e.srcElement.width+7) + 'px';
                        } else {
                            if (typeof e.clientX !=='undefined') {
                                //firefox

                                $scope.myTop = e.clientY + e.currentTarget.clientHeight + 'px';
                                $scope.myLeft = e.clientX + (e.currentTarget.clientWidth+7) + 'px';
                            }
                        }
                    }
                };

                $scope.hideSelectedGraphic = function () {
                    $scope.selectedGraphic = {
                        indiceName:  '',
                        url: ''
                    };
                    if ($scope.openGraph === true) {
                        $scope.openGraph = false;
                    }
                };
            },
            link: function($scope) {
                $scope.$watch('openGraph', function(){});
            },

            template: "<div id=\"graphicPanel\" class=\"graphic-panel\" ng-class=\"{'open-graphic-panel' : openGraph , 'close-graphic-panel' : !openGraph }\"  ng-style=\"{'top': myTop, 'left': myLeft}\" ng-click=\"$event.stopPropagation();\">"+
                "<button class=\"btn-close graphic-image-close\" ng-click=\"hideSelectedGraphic();\"></button>"+
                "<br/>"+
                "<span>{{selectedGraphic.indiceName}}</span>"+
                "<br/>"+
                "<span>Rentabilidad Diaria Acumulada (%)</span>"+
                "<br/>"+
                "<!-- TODO: replace img line for commited line -->"+
                "<img class=\"selected-graphic-image\" src=\"{{selectedGraphic.url}}\"/>"+
                "<!--<img class=\"selected-graphic-image\" src=\"assets/img/graphic_example.png\"/>-->"+
                "</div>"
        };
    })
;





