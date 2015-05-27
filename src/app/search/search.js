/**
 * Each section of the site has its own module. It probably also has
 * submodules, though this boilerplate is too simple to demonstrate it. Within
 * `src/app/home`, however, could exist several additional folders representing
 * additional modules that would then be listed as dependencies of this one.
 * For example, a `note` section could have the submodules `note.create`,
 * `note.delete`, `note.edit`, etc.
 *
 * Regardless, so long as dependencies are managed correctly, the build process
 * will automatically take take of the rest.
 *
 * The dependencies block here is also where component dependencies should be
 * specified, as shown below.
 */
angular.module('ngPF.search', [
])

/**
 * Each section or module of the site can also have its own routes. AngularJS
 * will handle ensuring they are all available at run-time, but splitting it
 * this way makes each module more "self-contained".
 */
    .config(function config($stateProvider) {
        $stateProvider.state('search', {
            url: '/search',
            views: {
                "main": {
                    controller: 'SearchCtrl',
                    templateUrl: 'search/search.tpl.html'
                }
            },
            data: { pageTitle: 'Search' }
        });
    })

/**changeTab
 * And of course we define a controller for our route.
 */
    .controller('SearchCtrl', function SearchController($scope, TabsService, $location,$translatePartialLoader) {
        $translatePartialLoader.addPart("search");

        /*
         * fakeData
         * */

        $scope.loadFakeData = function () {
            console.log("load fake data with: " + JSON.stringify($scope.filters) + " with page:" + $scope.pagingOptions.currentPage);
            $scope.dataLoaded = true;
            $scope.loading = false;

            $scope.myData = [];
            for (i = 0; i < 10; i++) {
                $scope.myData.push({
                    symbol: 'Symbol' + i,
                    name: 'name_' + $scope.filters.name+"_"+$scope.filters.subname + i,
                    exchange: 'exch' + i
                });
            }
            $scope.found = 40;
            $scope.results = 40;
            $scope.counts =  {
                stocks:10,
                index:20,
                futures:8,
                forex:40
            };
        };

        //the counterTab get the count depending on the tab value
        $scope.getCounterTab = function(tab) {
            if ($scope.dataLoaded) {
                value = "";
                switch (tab) {
                    case 0:
                        value = $scope.counts.stocks;
                        break;
                    case 1:
                        value = $scope.counts.index;
                        break;
                    case 2:
                        value = $scope.counts.futures;
                        break;
                    case 3:
                        value = $scope.counts.forex;
                        break;
                }
                return "("+value+")";
            } else {
                //is no data loaded? then no request has been made, dont show nothing
                return "";
            }
        };


        /*******/
        $scope.searchInput = ""; //search input value
        $scope.filters = {
            name: '', //name to filter all the items in all tabs
            subname: '', //name to filter inside a tab
            active_tab: TabsService.getActiveSearchTab()
        };

        //get Tabs
        $scope.tabs = TabsService.getSearchTabs();
        $scope.dataLoaded = false;//loaded Data
        $scope.loading = false;//loading animation
        $scope.myData = [];
        $scope.appliedFilters = false;//to show distinct message when have filters or is just empty data
        $scope.found = 0;//num of items for pagination, fount with actual filters
        $scope.results = 0;// total of items in DB
        $scope.pagingOptions = {
            pageSize: 10,
            currentPage: 1
        };

        //template of tables. NOTE: all the filters are pointing to the same page (ready to create spcific filters)
        var templateTables = [
            {"table": 'search/tables/stock_table.tpl.html',
                "filter": 'search/filters/stock_filter.tpl.html'},
            {"table": 'search/tables/index_table.tpl.html',
                "filter": 'search/filters/stock_filter.tpl.html' },
            {"table": 'search/tables/future_table.tpl.html',
                "filter": 'search/filters/stock_filter.tpl.html' } ,
            {"table": 'search/tables/forex_table.tpl.html',
                "filter": 'search/filters/stock_filter.tpl.html'}
        ];

        //the value shown in the tabs,
        $scope.counts = {
            stocks:0,
            index:0,
            futures:0,
            forex:0
        };//counts of values in the tabs , here is where we show the found items count in each tab


        /**restart data restart the counters of tabs and total/found counters**/
        $scope.restartData = function(){
            $scope.dataLoaded=false;
            $scope.counts = {
                stocks:0,
                index:0,
                futures:0,
                forex:0
            };
            $scope.found= 0;
            $scope.results = 0;
        };


        /**
         * save the url params to send to the server and save in url (history)
         */
        $scope.saveUrlParams = function () {
            if ( $scope.filters.name.length ===0) {
                $scope.loading = false;
                $scope.restartData();
                return;
            }
            var urlParams = $scope.filters;
            urlParams.page = $scope.pagingOptions.currentPage;
            //we ask each param to include in the url or not
            var urlParamsSend = {};
            //Special case for pagination, we need save the total items

            urlParamsSend.found = $scope.found;
            if ($scope.filters.name.length >0) {
                urlParamsSend.name = $scope.filters.name;
            }
            if ($scope.filters.subname.length >0) {
                urlParamsSend.subname = $scope.filters.subname;
            }
            if ($scope.filters.active_tab.length > 0) {
                urlParamsSend.qacttab = $scope.filters.active_tab;
            }
            //if ($scope.filters.currentPage.length >0) {
                urlParamsSend.pag = $scope.pagingOptions.currentPage;
            //}
            //if ($scope.filters.found.length >0) {
                urlParamsSend.found = $scope.found;
            //}
            url = $location.search();
            if (JSON.stringify(url) === JSON.stringify(urlParamsSend) ) {
                if (!$scope.waitForFilters) {
                    $scope.loadPage();
                }
            } else {
                $location.path('/search').search(urlParamsSend);
            }
        };

        /**Load url params to load page**/
        $scope.loadUrlParams = function () {
            var params = $location.search();

            var filters = {
                name: (typeof params.name !== "undefined" ? params.name : "" ),
                subname:  (typeof params.subname !== "undefined" ? params.subname : "" ),
                active_tab: (typeof params.qacttab !== "undefined" ? parseInt(params.qacttab,10) : 0)
            };
            //NAME IS OBLIGATORY:
            if (filters.name.length ===0) {
                $scope.restartData();
                $scope.loading = false;
                return;
            }
            var tabChanged = false;
            if ($scope.filters.active_tab !== filters.active_tab) {
                //if the tab in the params is distinct that the actual tab, is necessary select in the code the tab
                TabsService.changeActiveSearchTab(filters.active_tab);
                for (i = 0; i < $scope.tabs.length; i++) {
                    if ($scope.tabs[i].value === TabsService.getActiveSearchTab()) {
                        $scope.tabs[i].active = true;
                        tabChanged = true;
                    } else {
                        $scope.tabs[i].active = false;
                    }
                }
            }
            $scope.filters = filters;
            $scope.found = (params.found ? params.found : 0 );
            $scope.pagingOptions.currentPage = (params.pag ? params.pag : 1);
        };

        //loadPage
        $scope.loadPage = function () {
            if ($scope.filters.name.length ===0) {
                $scope.restartData();
                return; //name is obligatory to load
            }
            $scope.dataLoaded = true;
            $scope.loadFakeData();
            /**
            // $scope.loading = true;
            var data = PatternsService.getPagedDataAsync($scope.pagingOptions.currentPage, $scope.filterOptions.filters).then(function (data) {
                if (data.productType === parseInt($scope.filterOptions.filters.active_tab, 10)) {
                    $scope.myData = data.patterns;//data.page;
                    $scope.results = data.results;//data.results;
                    $scope.found = data.found;//data.found;
                    $scope.dataLoaded = true;
                    $scope.loading = false;
                    if ($scope.myData.length <= 0) {
                        $scope.appliedFilters = UserApplyFilters.userAppliedFilters($scope.filterOptions.filters);
                    } else {
                        $scope.appliedFilters = false;
                    }
                }
            });
**/

        };


        //for filter, but not used yet
        $scope.getTemplateFilter = function () {
            return templateTables[TabsService.getActiveSearchTab()].filter;
        };

        $scope.getTemplateTable = function () {
            return templateTables[TabsService.getActiveSearchTab()].table;
        };
        $scope.setPage = function (page) {
            //petition to change page
            $scope.pagingOptions.currentPage = page;
            $scope.applyFilters();
        };

        //seach by main filter
        $scope.search = function () {
            $scope.pagingOptions.currentPage = 1; //restart the page
            //clear the sub-filter
            $scope.filters.subname="";
            $scope.applyFilters();
        };
        //search by subfilter (specifing the tab)
        $scope.subSearch = function() {
            $scope.pagingOptions.currentPage = 1; //restart the page
            $scope.applyFilters();
        };

        //start loading set loading = true to show loading message and empty the table
        $scope.startLoading = function() {
            $scope.loading = true;
            $scope.myData =[];
        };
        //restore the filters (sub filters)
        $scope.restartFilter = function (callServer,restartRegion) {
            $scope.pagingOptions.currentPage = 1;
            $scope.filters.subname= "";
        };

        /*apply filters to search, restarting the page*/
        $scope.applyFilters = function () {
            $scope.startLoading();

            //$scope.checkFilters();//check if selectors and inputs are right
            $scope.saveUrlParams();
            //$scope.loadPage();
        };

        //changeTab
        $scope.changeTab = function (idTab) {
            if (idTab === TabsService.getActiveSearchTab()) {
                return;
            }
            $scope.myData = [];
            $scope.loading = true;
            $scope.dataLoaded = false; //Not showming data until they have been loaded
            //we change the page to 1, to load the new tab
            $scope.filters.active_tab = idTab;
            TabsService.changeActiveSearchTab(idTab);
            $scope.restartFilter();
            $scope.applyFilters();
        };


        ///Change url (params) managments
        $scope.$on('$locationChangeSuccess', function (event, $stateParams) {
            $scope.loadUrlParams();
            if (!$scope.waitForFilters) {
                $scope.loadPage();
            }
        });
        /*First load on page ready*/
        //$scope.restartFilter(false,false);
        //in case of refresh..
        if ($location.search()) {
            //SEARCH IS NOT A EMPTY OBJECT??
            if ((Object.getOwnPropertyNames($location.search()).length !== 0)) {
                //if the paramsUrl are  passed, we load the page with the filters
                $scope.loadUrlParams();
                if (!$scope.waitForFilters) {
                    $scope.loadPage();
                }
            }
        }





        //$scope.loadFakeData();
    })

;

