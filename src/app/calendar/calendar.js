angular.module('ngMo.calendar', [
    'ui.router'
])

    .config(function config($stateProvider) {
        $stateProvider.state('calendar', {
            url: '/calendar',
            views: {
                "main": {
                    controller: 'CalendarCtrl',
                    templateUrl: 'calendar/calendar.tpl.html'
                }
            },
            data: {
                pageTitle: 'Calendar',
                selectMenu: 'calendar-nav',
                selectSubmenu: '',
                selectItemSubmenu: '',
                moMenuType: 'privateMenu'
            }
        });
    })

    .run(function run() {
    })

    .controller('CalendarCtrl', function ($scope, TabsService) {
        $scope.$on('$stateChangeSuccess', function (event, toState, toParams, fromState, fromParams) {
            if (angular.isDefined(toState.data.pageTitle)) {
                $scope.pageTitle = toState.data.pageTitle + ' | Market Observatory';
            }
        });

        $scope.selectedTab = TabsService.getActiveTab();
        $scope.tabs = TabsService.getTabs();

        var templateTables = [
            'calendar/calendar_tables/calendar-stock-table.tpl.html',
            'calendar/calendar_tables/calendar-pairs-table.tpl.html',
            'calendar/calendar_tables/calendar-indices-table.tpl.html',
            'calendar/calendar_tables/calendar-futures-table.tpl.html',
            'calendar/calendar_tables/calendar-pairs-indices-table.tpl.html'
        ];

        $scope.pagingOptions = {
            pageSize: 10,
            currentPage: 1
        };

        $scope.changeTab = function (idTab) {
            $scope.obtainDays(idTab);
            $scope.selectedMonth = ($scope.calendarMonths[0]).value;
            $scope.selectedOrder = 0;
            $scope.selectedTypeIndice = 0;
            $scope.urlSelected = templateTables[idTab];

            TabsService.changeActiveTab(idTab);
            $scope.pagingOptions.currentPage = 1;
        };

        $scope.stocks_calendar = {
            lastDateMonth: new Date(2014, 6, 30),
            numberPatterns: 100,
            patterns: [
                {
                    product_name: "CHINA NATURAL RESOURCES",
                    market: "NASDAQ",
                    code: 49318,
                    bullish_pattern: true,
                    start_day: 4,
                    finish_day: 15
                },
                {
                    product_name: "GANNETT ORD",
                    market: "BE",
                    code: 50925,
                    bullish_pattern: false,
                    start_day: 6,
                    finish_day: 20
                },
                {
                    product_name: "SHIBUYA KOGYO CO.: 6340",
                    market: "TSE",
                    code: 50508,
                    bullish_pattern: true,
                    start_day: 7,
                    finish_day: 23
                },
                {
                    product_name: "MATSUYA CO.",
                    market: "TSE",
                    code: 50154,
                    bullish_pattern: false,
                    start_day: 9,
                    finish_day: 12
                }

            ]
        };

        $scope.pairs_calendar = {
            lastDateMonth: new Date(2014, 7, 31),
            numberPatterns: 100,
            patterns: [
                {
                    product1_name: "DYCOM INDUSTRIES",
                    product1_market: "NYSE",
                    product2_name: "ZIGO CORPORATION",
                    product2_market: "NASDAQ",
                    code: "42060",
                    start_day: 17,
                    finish_day: 20
                },
                {
                    product1_name: "NUTRACEUTICAL INTERNATIONAL",
                    product1_market: "NASDAQ",
                    product2_name: "GENCORP INC.",
                    product2_market: "NYSE",
                    code: "48354",
                    start_day: 1,
                    finish_day: 28
                },
                {
                    product1_name: "INTERNATIONAL GAME TECHN",
                    product1_market: "NYSE",
                    product2_name: "SUPERIOR INDUSTRIES INTERNATIONAL",
                    product2_market: "NYSE",
                    code: "45552",
                    start_day: 9,
                    finish_day: 19
                }
            ]
        };

        $scope.indices_calendar = {
            lastDateMonth: new Date(2014, 6, 30),
            numberPatterns: 100,
            patterns: [
                {
                    product_name: "S&P 500 BIOTECHNOLOGY",
                    market: "SPC",
                    code: 51079,
                    bullish_pattern: false,
                    start_day: 9,
                    finish_day: 18
                },
                {
                    product_name: "BURCAP BUENOS AIRES",
                    market: "BUEI",
                    code: 54154,
                    bullish_pattern: true,
                    start_day: 2,
                    finish_day: 10
                },
                {
                    product_name: "NASDAQ TRASPORTATION",
                    market: "NQI",
                    code: 57154,
                    bullish_pattern: true,
                    start_day: 3,
                    finish_day: 11
                },
                {
                    product_name: "S&P 500 PERSONAL PRODUCTS",
                    market: "SCP",
                    code: 50854,
                    bullish_pattern: false,
                    start_day: 1,
                    finish_day: 10
                }

            ]
        };

        $scope.pairs_indices_calendar = {
            lastDateMonth: new Date(2014, 7, 31),
            numberPatterns: 100,
            patterns: [
                {
                    product1_name: "DEUSTCHE BANK LIQUID COMMODITY ENERGY",
                    product1_market: "NYSE",
                    product2_name: "ZIGO CORPORATION",
                    product2_market: "NASDAQ",
                    code: "42060",
                    start_day: 1,
                    finish_day: 12
                },
                {
                    product1_name: "NUTRACEUTICAL INTERNATIONAL",
                    product1_market: "NASDAQ",
                    product2_name: "GENCORP INC.",
                    product2_market: "NYSE",
                    code: "48354",
                    start_day: 14,
                    finish_day: 17
                },
                {
                    product1_name: "INTERNATIONAL GAME TECHN",
                    product1_market: "NYSE",
                    product2_name: "SUPERIOR INDUSTRIES INTERNATIONAL",
                    product2_market: "NYSE",
                    code: "45552",
                    start_day: 19,
                    finish_day: 29
                }
            ]
        };

        $scope.futures_calendar = {
            lastDateMonth: new Date(2014, 6, 30),
            numberPatterns: 100,
            patterns: [
                {
                    product_name: "SILVER MAR",
                    market: "TSE",
                    code: 50154,
                    bullish_pattern: false,
                    start_day: 5,
                    finish_day: 15
                },
                {
                    product_name: "SOYBEAN OIL DEC",
                    market: "TSE",
                    code: 50154,
                    bullish_pattern: true,
                    start_day: 2,
                    finish_day: 10
                },
                {
                    product_name: "SILVER JUL",
                    market: "TSE",
                    code: 50154,
                    bullish_pattern: true,
                    start_day: 9,
                    finish_day: 18
                },
                {
                    product_name: "SILVER MINI JUL",
                    market: "TSE",
                    code: 50154,
                    bullish_pattern: true,
                    start_day: 6,
                    finish_day: 24
                }

            ]
        };

        $scope.calendarMonths = [
            {
                value: 0,
                description: "Junio 2014"
            },
            {
                value: 1,
                description: "Julio 2014"
            }
        ];

        $scope.calendarRegions = [
            {
                id: 1,
                description: "Estados Unidos"
            },
            {
                id: 2,
                description: "EURO Zona"
            }
        ];

        $scope.calendarMarkets = [
            {
                id: 1,
                description: "American Stock Exchange"
            },
            {
                id: 2,
                description: "NASDAQ Stock Exchange"
            }
        ];

        $scope.selectedMonth = ($scope.calendarMonths[0]).value;
        $scope.selectedOrder = 0;
        $scope.selectedTypeIndice = 0;


        $scope.getDayOfWeek = function (dayOfMonth, lastDateMonth) {
            var daysOfWeek = ['Do', 'Lu', 'Ma', 'Mi', 'Ju', 'Vi', 'Sa'];
            var dayOfWeek = new Date(lastDateMonth.getFullYear(), lastDateMonth.getMonth()-1, dayOfMonth);
            return daysOfWeek[dayOfWeek.getDay()];
        };

        $scope.obtainDays = function (tab) {
            var lastDateMonth;
            switch(tab){
                case 0:
                    lastDateMonth = $scope.stocks_calendar.lastDateMonth;
                    break;
                case 1:
                    lastDateMonth = $scope.pairs_calendar.lastDateMonth;
                    break;
                case 2:
                    lastDateMonth = $scope.indices_calendar.lastDateMonth;
                    break;
                case 3:
                    lastDateMonth = $scope.futures_calendar.lastDateMonth;
                    break;
            }
            $scope.daysOfMonth = [];
            for (var i = 1;i <= lastDateMonth.getDate(); i++){
                $scope.daysOfMonth.push({
                    dayOfWeek: $scope.getDayOfWeek(i, lastDateMonth),
                    dayOfMonth: i
                });
            }
        };

        $scope.urlSelected = templateTables[$scope.selectedTab];
        $scope.obtainDays($scope.selectedTab);

        $scope.changeIndiceFilter = function (selectedTypeIndice) {
            if (selectedTypeIndice === 0){
                $scope.urlSelected = templateTables[2];
            }else{
                $scope.urlSelected = templateTables[4];
            }
        };

    });