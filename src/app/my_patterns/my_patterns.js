/**
 * Created by robgon on 28/05/14.
 */


angular.module('ngMo.my_patterns', [
    'ui.router',
    'ui.bootstrap'
])
    .config(function config($stateProvider) {
        $stateProvider.state('my_patterns', {
            url: '/patterns',
            views: {
                "main": {
                    controller: 'PatternsCtrl',
                    templateUrl: 'my_patterns/my_patterns.tpl.html'
                }
            },
            data: {
                pageTitle: 'My Patterns'
            }
        });
    })
    .service('TabsService', function () {


        var tabs = [
            {
                title: 'Acciones',
                active: activeTab === 0,
                value: 0
            },
            {
                title: 'Pares',
                active: activeTab === 1,
                value: 1
            },
            {
                title: 'Indices',
                active: activeTab === 2,
                value: 2
            },
            {
                title: 'Futuros',
                active: activeTab === 3,
                value: 3
            }
        ];

        var activeTab = 0;

        this.getTabs = function () {
            return tabs;
        };

        this.getActiveTab = function () {
            return activeTab;
        };

        this.changeActiveTab = function (active) {
            activeTab = active;
        };
    })
    .controller('PatternsCtrl', function PatternsCtrl($scope, $http, $templateCache, $rootScope, TabsService, ActualDateService) {
        //tabs and variables

        $scope.selectedTab = TabsService.getActiveTab();
        $scope.actualDate = ActualDateService.actualDate();
        $scope.onClickTab = function (idTab) {
            selectedTab = TabsService.changeActiveTab(idTab);
        };
        $scope.tabs = TabsService.getTabs();
        $scope.filterOptions = {
            filterText: "",
            useExternalFilter: true
        };
        $scope.totalServerItems = 0;
        $scope.pagingOptions = {
            /*pageSizes: [250, 500, 1000],*/
            pageSize: 10,
            currentPage: 1
        };


        $scope.filters = {
            indexType: 'index'
        };
        var templateTables = [
            {"table": 'my_patterns/tables/stocks_table.tpl.html',
                "filter": 'my_patterns/filters/stocks_filters.tpl.html'},

            {"table": 'my_patterns/tables/pairs_table.tpl.html',
                "filter": 'my_patterns/filters/pairs_filters.tpl.html'},

            {"index": {"table": 'my_patterns/tables/index_table.tpl.html',
                        "filter": 'my_patterns/filters/index_filters.tpl.html'},
            "pair_index": {"table": 'my_patterns/tables/pairs_index_table.tpl.html',
                            "filter": 'my_patterns/filters/index_filters.tpl.html'}
            },

            {"table": 'my_patterns/tables/futures_table.tpl.html',
                "filter": 'my_patterns/filters/futures_filters.tpl.html'}
        ];

        $scope.getTemplateTable = function () {
            switch (TabsService.getActiveTab()) {
                case 2:
                   return templateTables[TabsService.getActiveTab()][$scope.filters.indexType].table;
                default:
                    return templateTables[TabsService.getActiveTab()].table;
            }

        };

        $scope.getTemplateFilter = function () {
            switch (TabsService.getActiveTab()) {
                case 2:
                    return templateTables[TabsService.getActiveTab()][$scope.filters.indexType].filter;
                default:
                    return templateTables[TabsService.getActiveTab()].filter;
            }
        };

        $scope.changeTab = function (idTab) {
            //we change the page to 1, to load the new tab
            TabsService.changeActiveTab(idTab);
            $scope.pagingOptions.currentPage = 1;
            $scope.getPagedDataAsync($scope.pagingOptions.pageSize, $scope.pagingOptions.currentPage);
        };

        $scope.setPagingData = function (data) {
            $scope.myData = data;
            /*mocked*/
            $scope.results = 100;
            $scope.found = 100;
            if (!$scope.$$phase) {
                $scope.$apply();
            }
        };
        $scope.getPagedDataAsync = function (pageSize, page, searchText) {
            setTimeout(function () {
                var data;
                /**
                 *TODO: THIS IS A MOCKED HTTP REQUEST, THERE ARE A LOT OF JSON DEPENDING ON TYPE, IN THIS CASE WE CHANGE THE JSON TO LOAD
                 *       BUT THE TYPE IS PASSED AS A PARAM IN THE FINAL CODE, NOT WILL CALL DIFERENTS URL..
                 */
                var url_pattern;
                if (TabsService.getActiveTab() === 0) {
                    url_pattern = 'src/app/my_patterns/testdataStock.json.js?pageSize=' + pageSize + '&page=' + page + '&type=' + TabsService.getActiveTab();

                } else if (TabsService.getActiveTab() === 1) {
                    url_pattern = 'src/app/my_patterns/testdataPairs.json.js?pageSize=' + pageSize + '&page=' + page + '&type=' + TabsService.getActiveTab();
                } else if (TabsService.getActiveTab() === 2) {
                    url_pattern = 'src/app/my_patterns/testdataIndex.json.js?pageSize=' + pageSize + '&page=' + page + '&type=' + TabsService.getActiveTab();
                }

                //loads the url
                $http.get(url_pattern).success(function (largeLoad) {
                    $scope.setPagingData(largeLoad, page, pageSize);
                });

            }, 100);
        };
        $scope.getPagedDataAsync($scope.pagingOptions.pageSize, $scope.pagingOptions.currentPage);

        $scope.$watch('pagingOptions', function (newVal, oldVal) {
            if (newVal !== oldVal && newVal.currentPage !== oldVal.currentPage) {
                $scope.getPagedDataAsync($scope.pagingOptions.pageSize, $scope.pagingOptions.currentPage, $scope.filterOptions.filterText);
            }
        }, true);
        $scope.$watch('filterOptions', function (newVal, oldVal) {
            if (newVal !== oldVal) {
                $scope.getPagedDataAsync($scope.pagingOptions.pageSize, $scope.pagingOptions.currentPage, $scope.filterOptions.filterText);
            }
        }, true);
        /*function that is fired when the indexType filter is changed, it loads the table of index/pair index*/
        $scope.changeIndexType = function () {
            $scope.getPagedDataAsync($scope.pagingOptions.pageSize, $scope.pagingOptions.currentPage);
        };

    });