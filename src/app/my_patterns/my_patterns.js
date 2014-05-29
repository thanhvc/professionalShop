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
        var templateHeader1 = "<div>Años</div><div>Gan.</div>";
        var templateHeader2 = "<div>Años</div><div>Per.</div>";

        $scope.gridOptions = {
            data: 'myData',
            enablePaging: true,
            showFooter: true,
            totalServerItems: 'totalServerItems',
            pagingOptions: $scope.pagingOptions,
            filterOptions: $scope.filterOptions,
            columnDefs: [
                { field: 'Id',  displayName: 'Id', width: 30, cellClass: "orange-cell"  },
                { field: 'name', displayName: 'Nombre', width: 230, cellClass: 'cell-table-private' },
                { field: 'Sector_Industria', displayName: " ", width: 150, cellClass: 'cell-table-private' },
                { field: 'merc', displayName: "merc", width: 45, cellClass: 'cell-table-private'},
                { field: 'Year', displayName: "Gan.",  width:30, cellClass: 'cell-table-private'},
                { field: 'Year-Perd', displayName: "Pér.", width:25, cellClass: 'cell-table-private'},
                { field: 'Entrada', displayName: "Entrada", width:65, cellClass: 'cell-table-private'},
                { field: 'Salida', displayName: "Salida", width:60, cellClass: 'cell-table-private'},
                { field: 'Rent_acum', displayName: "Acum.", width:35, cellClass: 'cell-table-private'},
                { field: 'Rent_media', displayName: "Media", width:35, cellClass: 'cell-table-private'},
                { field: 'Rent_Diaria', displayName: "Diaria", width:30, cellClass: 'cell-table-private'},
                { field: 'Dias', displayName: "Días", width:30, cellClass: 'cell-table-private'},
                { field: 'Vol', displayName: "(%)", width:25, cellClass: 'cell-table-private'},
                { field: 'Fav', displayName: " ", width:30, cellClass: 'cell-table-private'},
                { field: 'Est', displayName: " ", width:25, cellClass: 'cell-table-private'}

            ]
        };


        /* $scope.myData = [{name: "Moroni", age: 50},
         {name: "Tiancum", age: 43},
         {name: "Jacob", age: 27},
         {name: "Nephi", age: 29},
         {name: "Enos", age: 34}];

         $scope.gridOptions = { data: 'myData' };*/
    });