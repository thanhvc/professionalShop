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
        //tabs

        $scope.selectedTab = TabsService.getActiveTab();
        $scope.actualDate = ActualDateService.actualDate();
        $scope.onClickTab = function (idTab) {
            selectedTab = TabsService.changeActiveTab(idTab);
        };
        $scope.tabs = TabsService.getTabs();
        //Grid Controller

        /* */
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
        $scope.setPagingData = function (data, page, pageSize) {
            var pagedData = data.slice((page - 1) * pageSize, page * pageSize);
            $scope.myData = pagedData;
            $scope.totalServerItems = data.length;
            if (!$scope.$$phase) {
                $scope.$apply();
            }
        };
        $scope.getPagedDataAsync = function (pageSize, page, searchText) {
            setTimeout(function () {
                var data;
                if (searchText) {
                    var ft = searchText.toLowerCase();
                    $http.get('src/app/my_patterns/testdataStock.json.js').success(function (largeLoad) {
                        data = largeLoad.filter(function (item) {
                            return JSON.stringify(item).toLowerCase().indexOf(ft) != -1;
                        });
                        $scope.setPagingData(data, page, pageSize);
                    });
                } else {
                    $http.get('src/app/my_patterns/testdataStock.json.js').success(function (largeLoad) {
                        $scope.setPagingData(largeLoad, page, pageSize);
                    });
                }
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


        //template de header

        var templateId= "<div> <div class='orange-cell'>{{row.getProperty(col.field)}}</div></div>";
        var templateName = "<div style='width:230px;' class='div-name-table'>{{row.getProperty('type')}}<br/><div ng-class='{\"buy-color\": row.getProperty(\"type\") == \"buy\"}'>{{row.getProperty('name')}}</div></div>";
        var templateCell = '<div class="ngCellText" style="border-right: none;" ng-class="col.colIndex()">' +
            '<div class="cell-table-private">{{row.getProperty(col.field)}}</div> </div>';

        $scope.gridOptions = {
            data: 'myData',
            enablePaging: true,
            headerRowHeight:0,
            rowHeight: 25,
            showFooter: false,
            totalServerItems: 'totalServerItems',
            pagingOptions: $scope.pagingOptions,
            filterOptions: $scope.filterOptions,
            columnDefs: [
                { field: 'Id', cellTemplate: templateId, width: 40/*, cellClass: "orange-cell"*/},
                { field: 'name', cellTemplate: templateName, minWidth: 230, cellClass: 'cell-table-private border-right-table'  },
                { field: 'Sector_Ind', cellTemplate: templateCell, width: 180, cellClass: 'cell-table-private border-right-table'},
                { field: 'Merc', cellTemplate: templateCell,width: 50, cellClass: 'cell-table-private border-right-table text-align-center'},
                { field: 'Year', cellTemplate: templateCell, width:35, cellClass: 'cell-table-private sub-border-right-table text-align-center font-verdana-bold'},
                { field: 'Year-Perd',cellTemplate: templateCell, width:35, cellClass: 'cell-table-private border-right-table text-align-center font-verdana-bold'},
                { field: 'Enter', cellTemplate: templateCell, width:65, cellClass: 'cell-table-private sub-border-right-table text-align-center'},
                { field: 'Exit', cellTemplate: templateCell, width:65, cellClass: 'cell-table-private border-right-table text-align-center'},
                { field: 'Rent_acum', cellTemplate: templateCell,width:40, cellClass: 'cell-table-private sub-border-right-table text-align-center font-verdana-bold'},
                { field: 'Rent_average', cellTemplate: templateCell, width:40, cellClass: 'cell-table-private sub-border-right-table text-align-center font-verdana-bold'},
                { field: 'Rent_Diary', cellTemplate: templateCell, width:40, cellClass: 'cell-table-private border-right-table text-align-center font-verdana-bold'},
                { field: 'Days', cellTemplate: templateCell, width:35, cellClass: 'cell-table-private border-right-table text-align-center font-verdana-bold'},
                { field: 'Vol', cellTemplate: templateCell, width:30, cellClass: 'cell-table-private border-right-table text-align-center font-verdana-bold'},
                { field: 'Fav', cellTemplate: templateCell, width:35, cellClass: 'cell-table-private border-right-table text-align-center'},
                { field: 'Est', cellTemplate: templateCell, width:30, cellClass: 'cell-table-private sub-border-right-table text-align-center'}

            ]
        };


    });