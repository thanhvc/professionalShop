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
            },
            resolve:{
                ActualDateService: "ActualDateService",

                date: function(ActualDateService){
                    return ActualDateService.actualDateForWeek();

                },

                

            
                IsLogged: "IsLogged",
                logged: function(IsLogged) {
                    IsLogged.isLogged();
                }
            }
            
        });
    })

    .run(function run() {
    })

    .controller('TheWeekCtrl', function ($scope,$http, ActualDateService, IsLogged, $window,$rootScope, $state, $translatePartialLoader) {
        $scope.$on('$stateChangeStart', function (event, toState){
            IsLogged.isLogged(true);
        });

        $scope.$on('$stateChangeSuccess', function (event, toState, toParams, fromState, fromParams) {
            if (angular.isDefined(toState.data.pageTitle)) {$scope.pageTitle = toState.data.pageTitle + ' | Market Observatory';}
            IsLogged.isLogged(true);
        });
        $scope.loading= true;
        $scope.empty = false;
        $scope.days= [];
        $scope.obtainDateMondaythisWeek = function () {
            var firstDay = ActualDateService.actualDateForWeek(function (data) {
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

           soemnh =months[new Date(dta.actualDate).getMonth() ];

         $scope.year = new Date(date.actualDate).getFullYear();
         $scope.month = months[new Date(date.actualDate).getMonth() ];

        var data2 = ActualDateService.actualWeek(function (data) {
            $scope.weekOfYear = data.numWeek;
        });

        $scope.obtainDateMondaythisWeek();


        $scope.loadData = function() {
            config = {
                params: {
                    'authToken': $window.localStorage.token
                }
            };

            //Get current year to set the res service
            var currentYear = new Date().getFullYear();
            $scope.loading= true;
            $http.get($rootScope.urlService+"/weekData/"+currentYear, config).success(function(data){
                $scope.loading= false;

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
                if (typeof $scope.stockAreas === "undefined") {
                    $scope.stockAreas = [];
                    $scope.commoditiesAreas = [];
                    $scope.sypSectors = [];
                    $scope.empty = true;
                    return;
                } else {
                    $scope.empty = false;
                }
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

                $scope.getOffset = function(el){
                    var _x = 0;
                    var _y = 0;
                    while( el && !isNaN( el.offsetLeft ) && !isNaN( el.offsetTop ) ) {
                        _x += el.offsetLeft - el.scrollLeft;
                        _y += el.offsetTop - el.scrollTop;
                        el = el.offsetParent;
                    }
                    return { top: _y, left: _x };
                };

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
                        url:  (typeof url !== "undefined" ? url : "")
                    };

                    if(typeof e !== 'undefined') {
                        if (typeof InstallTrigger !== 'undefined') {
                            //firefox special case
                            $scope.myTop = $scope.getOffset(e.target).top + e.target.height  + 'px';
                            $scope.myLeft = $scope.getOffset(e.target).left + (e.target.width + 7) + 'px';
                        } else {
                            $scope.myTop = e.target.y + e.target.height + 'px';
                            $scope.myLeft = e.target.x + (e.target.width + 7) + 'px';

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
                "<img class=\"selected-graphic-image\" src=\"{{selectedGraphic.url}}\"/>"+
                "</div>"
        };
    })
;





