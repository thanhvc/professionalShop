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

    .controller('TheWeekCtrl', function ($scope,$http, ActualDateService, IsLogged) {
        $scope.$on('$stateChangeStart', function (event, toState){
            IsLogged.isLogged();
        });

        $scope.$on('$stateChangeSuccess', function (event, toState, toParams, fromState, fromParams) {
            if (angular.isDefined(toState.data.pageTitle)) {$scope.pageTitle = toState.data.pageTitle + ' | Market Observatory';}
        });

        $scope.obtainDateMondaythisWeek = function () {
            var firstDay = ActualDateService.actualDate(function (data) {
                var today = new Date(data.actualDate);
                var monday = new Date();
                var dayOfWeek = (today.getDay() === 0 ? 7 : today.getDay() - 1);
                monday.setDate(today.getDate()-dayOfWeek);
                $scope.mondayDay = monday.getDate();

                var monthsDays = [31,28,31,30,31,30,31,31,30,31,30,31];
                var m = monday.getMonth();
                var day = monday.getDay();
                var year = monday.getYear();

                if(year % 4 === 0 && year % 100 !== 0 || year% 400 === 0) {
                    monthsDays[1] = 29;
                }

                $scope.nextDay = (day % monthsDays[m]);

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

        $scope.showIndices = true;

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

        $scope.stockAreas = [
            {
                name: 'America',
                regions: [
                    {
                        name: 'Estados Unidos',
                        initial_show: true,
                        indices: [
                            {
                                name: 'DOW JONES INDUSTRIAL AVERAGE',
                                global_daily_return: 0.21,
                                global_bullish_years: 11,
                                global_bearish_years: 8,
                                daily_return_graphic: 'url',
                                returns: {
                                    L: 0.18,
                                    M: 0.28,
                                    X: -0.01,
                                    J: -0.09,
                                    V: 0.06
                                    },
                                bullish_years: {
                                    L: 7,
                                    M: 6,
                                    X: 4,
                                    J: 9,
                                    V: 6
                                },
                                bearish_years: {
                                    L: 4,
                                    M: 1,
                                    X: 3,
                                    J: 2,
                                    V: 6
                                }
                            },
                            {
                                name: 'NASDAQ 100',
                                global_daily_return: 0.97,
                                global_bullish_years: 12,
                                global_bearish_years: 7,
                                daily_return_graphic: 'url',
                                returns: {
                                    L: 0.18,
                                    M: 0.28,
                                    X: -0.01,
                                    J: -0.09,
                                    V: 0.06
                                },
                                bullish_years: {
                                    L: 7,
                                    M: 6,
                                    X: 4,
                                    J: 9,
                                    V: 6
                                },
                                bearish_years: {
                                    L: 4,
                                    M: 1,
                                    X: 3,
                                    J: 2,
                                    V: 6
                                }
                            },
                            {
                                name: 'RUSSELL 2000',
                                global_daily_return: 1.08,
                                global_bullish_years: 12,
                                global_bearish_years: 7,
                                daily_return_graphic: 'url',
                                returns: {
                                    L: 0.18,
                                    M: 0.28,
                                    X: -0.01,
                                    J: -0.09,
                                    V: 0.06
                                },
                                bullish_years: {
                                    L: 7,
                                    M: 6,
                                    X: 4,
                                    J: 9,
                                    V: 6
                                },
                                bearish_years: {
                                    L: 4,
                                    M: 1,
                                    X: 3,
                                    J: 2,
                                    V: 6
                                }
                            }
                        ]
                    },
                    {
                        name: 'Canada',
                        initial_show: false,
                        indices: [
                            {
                                name: 'S&P/TSX COMPOSITE',
                                global_daily_return: 0.24,
                                global_bullish_years: 10,
                                global_bearish_years: 9,
                                daily_return_graphic: 'url',
                                returns: {
                                    L: 0.18,
                                    M: 0.28,
                                    X: -0.01,
                                    J: -0.09,
                                    V: 0.06
                                },
                                bullish_years: {
                                    L: 7,
                                    M: 6,
                                    X: 4,
                                    J: 9,
                                    V: 6
                                },
                                bearish_years: {
                                    L: 4,
                                    M: 1,
                                    X: 3,
                                    J: 2,
                                    V: 6
                                }
                            }
                        ]
                    }
                ]
            },
            {
                name: 'Asia/Pacífico',
                regions: [
                    {
                        name: 'JAPÓN',
                        initial_show: true,
                        indices: [
                            {
                                name: 'JASDAQ',
                                global_daily_return: 0.21,
                                global_bullish_years: 11,
                                global_bearish_years: 8,
                                daily_return_graphic: 'url',
                                returns: {
                                    L: 0.18,
                                    M: 0.28,
                                    X: -0.01,
                                    J: -0.09,
                                    V: 0.06
                                },
                                bullish_years: {
                                    L: 7,
                                    M: 6,
                                    X: 4,
                                    J: 9,
                                    V: 6
                                },
                                bearish_years: {
                                    L: 4,
                                    M: 1,
                                    X: 3,
                                    J: 2,
                                    V: 6
                                }
                            },
                            {
                                name: 'NIKKEI 225',
                                global_daily_return: 0.97,
                                global_bullish_years: 12,
                                global_bearish_years: 7,
                                daily_return_graphic: 'url',
                                returns: {
                                    L: 0.18,
                                    M: 0.28,
                                    X: -0.01,
                                    J: -0.09,
                                    V: 0.06
                                },
                                bullish_years: {
                                    L: 7,
                                    M: 6,
                                    X: 4,
                                    J: 9,
                                    V: 6
                                },
                                bearish_years: {
                                    L: 4,
                                    M: 1,
                                    X: 3,
                                    J: 2,
                                    V: 6
                                }
                            },
                            {
                                name: 'TOPIX CORE 30',
                                global_daily_return: 1.08,
                                global_bullish_years: 12,
                                global_bearish_years: 7,
                                daily_return_graphic: 'url',
                                returns: {
                                    L: 0.18,
                                    M: 0.28,
                                    X: -0.01,
                                    J: -0.09,
                                    V: 0.06
                                },
                                bullish_years: {
                                    L: 7,
                                    M: 6,
                                    X: 4,
                                    J: 9,
                                    V: 6
                                },
                                bearish_years: {
                                    L: 4,
                                    M: 1,
                                    X: 3,
                                    J: 2,
                                    V: 6
                                }
                            }
                        ]
                    },
                    {
                        name: 'AUSTRALIA',
                        initial_show: false,
                        indices: [
                            {
                                name: 'AUSTRALIA ALL ORDINARIES',
                                global_daily_return: 0.68,
                                global_bullish_years: 11,
                                global_bearish_years: 8,
                                daily_return_graphic: 'url',
                                returns: {
                                    L: 0.18,
                                    M: 0.28,
                                    X: -0.01,
                                    J: -0.09,
                                    V: 0.06
                                },
                                bullish_years: {
                                    L: 7,
                                    M: 6,
                                    X: 4,
                                    J: 9,
                                    V: 6
                                },
                                bearish_years: {
                                    L: 4,
                                    M: 1,
                                    X: 3,
                                    J: 2,
                                    V: 6
                                }
                            }
                        ]
                    }

                ]
            }

        ];

        $scope.commoditiesAreas = [
            {
                name: 'Materias Primas',
                regions: [
                    {
                        name: 'COMPOSITE',
                        indices: [
                            {
                                name: 'DEUTSCHE BANK LIQUID COMMODITY',
                                global_daily_return: 0.05,
                                global_bullish_years: 8,
                                global_bearish_years: 10,
                                daily_return_graphic: 'url',
                                returns: {
                                    L: 0.28,
                                    M: -0.4,
                                    X: 0.12,
                                    J: -0.19,
                                    V: 0.28
                                },
                                bullish_years: {
                                    L: 7,
                                    M: 6,
                                    X: 4,
                                    J: 9,
                                    V: 6
                                },
                                bearish_years: {
                                    L: 4,
                                    M: 1,
                                    X: 3,
                                    J: 2,
                                    V: 6
                                }
                            },
                            {
                                name: 'DOW JONES-UBS COMMODITY',
                                global_daily_return: 0.97,
                                global_bullish_years: 12,
                                global_bearish_years: 7,
                                daily_return_graphic: 'url',
                                returns: {
                                    L: 0.18,
                                    M: 0.28,
                                    X: -0.01,
                                    J: -0.09,
                                    V: 0.06
                                },
                                bullish_years: {
                                    L: 7,
                                    M: 6,
                                    X: 4,
                                    J: 9,
                                    V: 6
                                },
                                bearish_years: {
                                    L: 4,
                                    M: 1,
                                    X: 3,
                                    J: 2,
                                    V: 6
                                }
                            },
                            {
                                name: 'S&P GSCI COMMODITY',
                                global_daily_return: 1.08,
                                global_bullish_years: 12,
                                global_bearish_years: 7,
                                daily_return_graphic: 'url',
                                returns: {
                                    L: 0.18,
                                    M: 0.28,
                                    X: -0.01,
                                    J: -0.09,
                                    V: 0.06
                                },
                                bullish_years: {
                                    L: 7,
                                    M: 6,
                                    X: 4,
                                    J: 9,
                                    V: 6
                                },
                                bearish_years: {
                                    L: 4,
                                    M: 1,
                                    X: 3,
                                    J: 2,
                                    V: 6
                                }
                            }
                        ]
                    },
                    {
                        name: 'SECTORS, COMPONENTS & THEMATIC',
                        indices: [
                            {
                                name: 'DEUSTCHE BANK LIQUID COMMODITY CRUDE OIL',
                                global_daily_return: 0.24,
                                global_bullish_years: 10,
                                global_bearish_years: 9,
                                daily_return_graphic: 'url',
                                returns: {
                                    L: 0.18,
                                    M: 0.28,
                                    X: -0.01,
                                    J: -0.09,
                                    V: 0.06
                                },
                                bullish_years: {
                                    L: 7,
                                    M: 6,
                                    X: 4,
                                    J: 9,
                                    V: 6
                                },
                                bearish_years: {
                                    L: 4,
                                    M: 1,
                                    X: 3,
                                    J: 2,
                                    V: 6
                                }
                            },
                            {
                                name: 'DEUSTCHE BANK LIQUID COMMODITY ENERGY',
                                global_daily_return: 0.24,
                                global_bullish_years: 10,
                                global_bearish_years: 9,
                                daily_return_graphic: 'url',
                                returns: {
                                    L: 0.18,
                                    M: 0.28,
                                    X: -0.01,
                                    J: -0.09,
                                    V: 0.06
                                },
                                bullish_years: {
                                    L: 7,
                                    M: 6,
                                    X: 4,
                                    J: 9,
                                    V: 6
                                },
                                bearish_years: {
                                    L: 4,
                                    M: 1,
                                    X: 3,
                                    J: 2,
                                    V: 6
                                }
                            }
                        ]
                    }
                ]
            }
        ];

        $scope.sypSectors = [
            {
                name: 'S&P 500 ENERGY',
                global_daily_return: 0.14,
                global_bullish_years: 7,
                global_bearish_years: 11,
                daily_return_graphic: 'url',
                returns: {
                    L: 0.32,
                    M: -0.39,
                    X: 0.25,
                    J: 0.14,
                    V: -0.08
                },
                bullish_years: {
                    L: 8,
                    M: 7,
                    X: 7,
                    J: 6,
                    V: 6
                },
                bearish_years: {
                    L: 4,
                    M: 6,
                    X: 7,
                    J: 7,
                    V: 7
                },
                indices: [
                    {
                        name: 'S&P 500 ENERGY EQUIPMENT & SERVICES',
                        global_daily_return: 0.05,
                        global_bullish_years: 8,
                        global_bearish_years: 10,
                        daily_return_graphic: 'url',
                        returns: {
                            L: 0.28,
                            M: -0.4,
                            X: 0.12,
                            J: -0.19,
                            V: 0.28
                        },
                        bullish_years: {
                            L: 7,
                            M: 6,
                            X: 4,
                            J: 9,
                            V: 6
                        },
                        bearish_years: {
                            L: 4,
                            M: 1,
                            X: 3,
                            J: 2,
                            V: 6
                        }
                    },
                    {
                        name: 'S&P 500 OIL, GAS & CONSUMABLE FUELS',
                        global_daily_return: 0.97,
                        global_bullish_years: 12,
                        global_bearish_years: 7,
                        daily_return_graphic: 'url',
                        returns: {
                            L: 0.18,
                            M: 0.28,
                            X: -0.01,
                            J: -0.09,
                            V: 0.06
                        },
                        bullish_years: {
                            L: 7,
                            M: 6,
                            X: 4,
                            J: 9,
                            V: 6
                        },
                        bearish_years: {
                            L: 4,
                            M: 1,
                            X: 3,
                            J: 2,
                            V: 6
                        }
                    }
                ]
            },
            {
                name: 'S&P MATERIALS',
                global_daily_return: 0.24,
                global_bullish_years: 10,
                global_bearish_years: 9,
                daily_return_graphic: 'url',
                returns: {
                    L: 0.18,
                    M: 0.28,
                    X: -0.01,
                    J: -0.09,
                    V: 0.06
                },
                bullish_years: {
                    L: 7,
                    M: 6,
                    X: 4,
                    J: 9,
                    V: 6
                },
                bearish_years: {
                    L: 4,
                    M: 1,
                    X: 3,
                    J: 2,
                    V: 6
                },
                indices: [
                    {
                        name: 'S&P CHEMICALS',
                        global_daily_return: 0.24,
                        global_bullish_years: 10,
                        global_bearish_years: 9,
                        daily_return_graphic: 'url',
                        returns: {
                            L: 0.18,
                            M: 0.28,
                            X: -0.01,
                            J: -0.09,
                            V: 0.06
                        },
                        bullish_years: {
                            L: 7,
                            M: 6,
                            X: 4,
                            J: 9,
                            V: 6
                        },
                        bearish_years: {
                            L: 4,
                            M: 1,
                            X: 3,
                            J: 2,
                            V: 6
                        }
                    },
                    {
                        name: 'S&P CONSTRUCTION MATERIALS',
                        global_daily_return: 0.24,
                        global_bullish_years: 10,
                        global_bearish_years: 9,
                        daily_return_graphic: 'url',
                        returns: {
                            L: 0.18,
                            M: 0.28,
                            X: -0.01,
                            J: -0.09,
                            V: 0.06
                        },
                        bullish_years: {
                            L: 7,
                            M: 6,
                            X: 4,
                            J: 9,
                            V: 6
                        },
                        bearish_years: {
                            L: 4,
                            M: 1,
                            X: 3,
                            J: 2,
                            V: 6
                        }
                    }
                ]
            }

        ];


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

                    if(e !== 'undefined') {
                        $scope.myTop = e.srcElement.y + e.srcElement.height + 'px';
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

            template: "<div id=\"graphicPanel\" class=\"graphic-panel\" ng-class=\"{'open-graphic-panel' : openGraph , 'close-graphic-panel' : !openGraph }\"  ng-style=\"{'top': myTop}\" ng-click=\"$event.stopPropagation();\">"+
                "<button class=\"btn-close graphic-image-close\" ng-click=\"hideSelectedGraphic();\"></button>"+
                "<br/>"+
                "<span>{{selectedGraphic.indiceName}}</span>"+
                "<br/>"+
                "<span>Rentabilidad Diaria Acumulada (%)</span>"+
                "<br/>"+
                "<!-- TODO: replace img line for commited line -->"+
                "<!--<img src=\"selectedGraphic.url\"/>-->"+
                "<img class=\"selected-graphic-image\" src=\"assets/img/graphic_example.png\"/>"+
                "</div>"
        };
    })
;





