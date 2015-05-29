angular.module('ngPF.patternSearch', [
])

/**
 * Each section or module of the site can also have its own routes. AngularJS
 * will handle ensuring they are all available at run-time, but splitting it
 * this way makes each module more "self-contained".
 */
    .config(function config($stateProvider) {
        $stateProvider.state('pattern-search', {
            url: '/pattern-search',
            views: {
                "main": {
                    controller: 'PatternSearchCtrl',
                    templateUrl: 'pattern-search/pattern-search.tpl.html'
                }
            },
            data: {
                pageTitle: 'Patrones',
                selectMenu: 'prof-nav',
                selectSubmenu: 'submenuProf',
                selectItemSubmenu: 'pattern-search-nav',
                moMenuType: 'privateMenu'
            },
            resolve: {
                IsLogged: "IsLogged",
                logged: function(IsLogged) {
                    IsLogged.isLogged();
                },
                now:function ($http, $rootScope) {
                    return $http({method: 'GET', url: $rootScope.urlService + '/actualdate'}).then(function(result) {
                        return new Date(result.data.actualDate);
                    });
                }
            }
        });
    })

/**changeTab
 * And of course we define a controller for our route.
 */
    .controller('PatternSearchCtrl', function SearchController($scope, TabsService, $location, DateService, SelectedMonthService, $translatePartialLoader) {
        $translatePartialLoader.addPart("pattern_search");
        $translatePartialLoader.addPart("my_patterns");

        $scope.filters = {
            //each filter 'xxxx' that has a selector 'greater_than', 'less_than' has the option in the 'xxxx_op' filter
            selected_month: '',
            name: '',
            market: '',
            entry_date_op:'',
            entry_date: '',
            exit_date_op:'',
            exit_date: '',
            accumulated_op:'',
            accumulated: '',
            daily: '',
            daily_op:'',
            loss: '',
            loss_op:'',
            fail: '',
            fail_op:'',
            duration: '',
            duration_op:'',
            operation: "",
            drawdown:'',
            drawdown_op:'',
            pattern_type:0,///to select simple(0) or pair(1) in
            selected_tab: 0
        };

        $scope.selectors = {
            markets: [
            ],
            operations: [
                {"id": 0, "description": "buy"},
                {"id": 1, "description": "sell"}
            ],
            operationsIndex: [
                {"id": 0, "description": "bullish"},
                {"id": 1, "description": "bearish"}
            ],
            comparators: [
                {"id": 1, "description": "greater_than"},
                {"id": 0, "description": "less_than"}

            ],

            comparatorsConversor: [1, 0]//the comparatos in pos[0] means 1 and viceversa (posterior changes..) so use this conversor for pos/value
        };

        $scope.restartFilter = function() {
            $scope.filters.name = '';
            $scope.filters.market = '';
            $scope.filters.entry_date_op = '';
            $scope.filters.entry_date = '';
            $scope.filters.exit_date_op = '';
            $scope.filters.exit_date = '';
            $scope.filters.accumulated_op = '';
            $scope.filters.accumulated = '';
            $scope.filters.daily = '';
            $scope.filters.daily_op = '';
            $scope.filters.loss = '';
            $scope.filters.loss_op = '';
            $scope.filters.fail = '';
            $scope.filters.fail_op = '';
            $scope.filters.duration = '';
            $scope.filters.duration_op = '';
            $scope.filters.operation = '';
            $scope.filters.drawdown = '';
            $scope.filters.drawdown_op = '';
        };


        $scope.patterns = []; //actualPage
        $scope.pagingOptions = {
            currentPage: 1,
            pageSize: 25
        };
        $scope.rentPattern = /^[-+]?\d+(\.\d{0,2})?$/;
        $scope.daysPattern = /^\d+$/;
        /**
         * Generate the actual Date to restart the selected_date to actual month
         */

        $scope.selectType= function(){
            //$scope.filters.pattern_type = parseInt($scope.filters.pattern_type,10);//parse to int
            $scope.applyFilters();
        };

            //Tabs for Pattern Search
        $scope.tabs = TabsService.getPatternSearchTabs();

        $scope.templates = [
            {"table": 'pattern-search/tables/stock_table.tpl.html',
                "filter": 'pattern-search/filters/stock_filter.tpl.html'},
            {"table": 'pattern-search/tables/pair_table.tpl.html',
                "filter": 'pattern-search/filters/pair_filter.tpl.html' },
            //index
            {
                "simple": {"table": 'pattern-search/tables/stock_table.tpl.html',
                    "filter": 'pattern-search/filters/generic_filter.tpl.html'},
                "pair": {"table": 'pattern-search/tables/pair_table.tpl.html',
                    "filter": 'pattern-search/filters/generic_filter.tpl.html'}
            },
            //future
            {
                "simple": {"table": 'pattern-search/tables/stock_table.tpl.html',
                    "filter": 'pattern-search/filters/generic_filter.tpl.html'},
                "pair": {"table": 'pattern-search/tables/pair_table.tpl.html',
                    "filter": 'pattern-search/filters/generic_filter.tpl.html'}
            },
            //forex
            {
                "simple": {"table": 'pattern-search/tables/stock_table.tpl.html',
                    "filter": 'pattern-search/filters/generic_filter.tpl.html'},
                "pair": {"table": 'pattern-search/tables/pair_table.tpl.html',
                    "filter": 'pattern-search/filters/generic_filter.tpl.html'}
            }
        ];


        $scope.startLoading = function () {

            $scope.loading = true;
            $scope.patterns = [];
        };

        /**
         * month controls
         * */


        $scope.nextMonth = function () {
            $scope.changingMonth = true;
            $scope.startLoading();
            var newSelectedDate = $scope.filters.selected_month = DateService.addMonths(1, $scope.filters.selected_month);
            for (var i = 0; i < $scope.months.length; i++) {
                if (newSelectedDate.value === $scope.months[i].value) {
                    $scope.filters.selected_month = $scope.months[i];
                }
            }
            SelectedMonthService.changeSelectedMonth($scope.filters.selected_month);
            $scope.restartFilter();
            $scope.saveUrlParams();

        };
        $scope.previousMonth = function () {
            $scope.changingMonth = true;
            $scope.startLoading();
            //$scope.filters.selected_month = DateService.addMonths(-1, $scope.filters.selected_month);
            var newSelectedDate = $scope.filters.selected_month = DateService.addMonths(-1, $scope.filters.selected_month);
            for (var i = 0; i < $scope.months.length; i++) {
                if (newSelectedDate.value === $scope.months[i].value) {
                    $scope.filters.selected_month = $scope.months[i];
                }
            }
            SelectedMonthService.changeSelectedMonth($scope.filters.selected_month);
            $scope.restartFilter();
            $scope.saveUrlParams();
        };
        //this function update the Month object in the filter from the value, used in the selector
        $scope.goToMonth = function () {
            $scope.changingMonth = true;
            $scope.loading = true;
            //var date = $scope.filters.selected_month.value.split("_");
            //var d = new Date(date[1], date[0] - 1, 1);
            //$scope.filters.selected_month = DateService.setDate(d);
            SelectedMonthService.changeSelectedMonth($scope.filters.selected_month);
            $scope.restartFilter();
            $scope.saveUrlParams();
        };
        //synchronize the selector with the month of the filter
        $scope.updateSelectorMonth = function () {

            for (i = 0; i < $scope.months.length; i++) {
                if ($scope.months[i].value === $scope.filters.selected_month.value) {
                    $scope.filters.selected_month = $scope.months[i];
                }
            }
        };



        $scope.restoreData = function() {
            $scope.restartFilter();
            $scope.saveUrlParams();
        };

        /***
         * INITIATE SELECTORS MONTHS
         */

        $scope.filters.selected_month = DateService.restartDate(new Date());
        $scope.months = DateService.getListMonths();
        $scope.updateSelectorMonth();
        /**
         * Can the seelctor of months move? +1 or -1 to right or left
         * @param idTab
         */
        $scope.canMove = function (direction) {
            if (direction > 0) {
                return (($scope.months[$scope.months.length - 1].value !== $scope.filters.selected_month.value));
            }
            else {
                return (($scope.months[0].value !== $scope.filters.selected_month.value));
            }
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
            $scope.filters.selected_tab = idTab;
            TabsService.changeActiveSearchTab(idTab);
            $scope.restartFilter();
            $scope.applyFilters();
        };

        $scope.getTemplateFilter = function () {
            if ($scope.filters.selected_tab !== 0 && $scope.filters.selected_tab !== 1) {
                //get the subtable (simple/pair) if is not STOCK or PAIR_STOCK
                if ($scope.filters.pattern_type === 0) {
                    return $scope.templates[$scope.filters.selected_tab].simple.filter;
                } else {
                    return $scope.templates[$scope.filters.selected_tab].pair.filter;
                }

            } else {
                return $scope.templates[$scope.filters.selected_tab].filter;
            }
        };

        $scope.getTemplateTable = function () {
            if ($scope.filters.selected_tab !== 0 && $scope.filters.selected_tab !== 1) {
                //get the subtable (simple/pair) if is not STOCK or PAIR_STOCK
                if ($scope.filters.pattern_type === 0) {
                    return $scope.templates[$scope.filters.selected_tab].simple.table;
                } else {
                    return $scope.templates[$scope.filters.selected_tab].pair.table;
                }

            } else {
                return $scope.templates[$scope.filters.selected_tab].table;
            }
        };

        /**
         * URL PARAMS MANAGMENT SAVE AND LOAD
         */
        $scope.saveUrlParams = function () {

            var urlParams = $scope.filters;
            urlParams.page = $scope.pagingOptions.currentPage;
            //we ask each param to include in the url or not
            var urlParamsSend = {};
            //Special case for pagination, we need save the total items

            urlParamsSend.found = $scope.found;
            if ($scope.filters.name.length>0){
                urlParamsSend.name = $scope.filters.name;
            }
            urlParamsSend.qacttab = $scope.filters.selected_tab;
            urlParamsSend.pag = $scope.pagingOptions.currentPage;
            /* if ($scope.filters.found.length>0){
                urlParamsSend.found = $scope.found;
            }*/
            if ($scope.filters.market !== ""){
                urlParamsSend.market = $scope.filters.market;
            }
            if ($scope.filters.operation !== ""){
                urlParamsSend.operation = $scope.filters.operation;
            }
            // specific params
            if ($scope.filters.accumulated!=="" && $scope.filters.accumulated_op!==""){
                urlParamsSend.accumulated = $scope.filters.accumulated;
                urlParamsSend.accumulated_op= $scope.filters.accumulated_op.id;
            }
            if ($scope.filters.entry_date!=="" && $scope.filters.entry_date_op!==""){
                urlParamsSend.entry_date = $scope.filters.entry_date;
                urlParamsSend.entry_date_op = $scope.filters.entry_date_op.id;
            }
            if ($scope.filters.exit_date!=="" && $scope.filters.exit_date_op!==""){
                urlParamsSend.exit_date = $scope.filters.exit_date;
                urlParamsSend.exit_date_op = $scope.filters.exit_date_op.id;
            }
            if ($scope.filters.loss!=="" && $scope.filters.loss_op!==""){
                urlParamsSend.loss = $scope.filters.loss;
                urlParamsSend.loss_op = $scope.filters.loss_op.id;
            }
            if ($scope.filters.daily!=="" && $scope.filters.daily_op!==""){
                urlParamsSend.daily = $scope.filters.daily;
                urlParamsSend.daily_op = $scope.filters.daily_op.id;
            }
            if ($scope.filters.fail!=="" && $scope.filters.fail_op!==""){
                urlParamsSend.fail = $scope.filters.fail;
                urlParamsSend.fail_op = $scope.filters.fail_op.id;
            }
            if ($scope.filters.duration!=="" && $scope.filters.duration_op!==""){
                urlParamsSend.duration = $scope.filters.duration;
                urlParamsSend.duration_op = $scope.filters.duration_op.id;
            }
            if ($scope.filters.drawdown!=="" && $scope.filters.drawdown_op!==""){
                urlParamsSend.drawdown = $scope.filters.drawdown;
                urlParamsSend.drawdown_op = $scope.filters.drawdown_op.id;
            }

            //SEND PATTERN_TYPE ONLY IN INDEX,FUTURE OR FOREX
            switch ($scope.filters.selected_tab) {
                case 0:
                case 1:
                    break;
                case 2:
                case 3:
                case 4:
                    urlParamsSend.pattern_type = $scope.filters.pattern_type;
                    break;
            }
            urlParamsSend.month=$scope.filters.selected_month.value;
            url = $location.search();
            if (JSON.stringify(url) === JSON.stringify(urlParamsSend)) {
                if (!$scope.waitForFilters) {
                    $scope.loadPage();
                }
            } else {
                $location.path('/pattern-search').search(urlParamsSend);
            }
        };

        //little func to convert params to selectors
        $scope.parseSelector = function(id) {
            for (var k =0;k<$scope.selectors.comparators.length;k++) {
                if ($scope.selectors.comparators[k].id === parseInt(id,10)) {
                    return $scope.selectors.comparators[k];
                }
            }
            return "";
        };
        /**Load url params to load page**/
        $scope.loadUrlParams = function () {
            var params = $location.search();

            var filters = {
                name: (typeof params.name !== "undefined" ? params.name : "" ),
                selected_tab: (typeof params.qacttab !== "undefined" ? parseInt(params.qacttab, 10) : 0),
                market: (typeof params.qacttab !== "undefined" ? params.market : ""),
                operation: (typeof params.operation !== "undefined" ? params.operation : ""),
                // specific params
                accumulated: (typeof params.accumulated !== "undefined" ? params.accumulated : ""),
                accumulated_op: (typeof params.accumulated_op !== "undefined" ? $scope.parseSelector(params.accumulated_op) : ""),
                entry_date: (typeof params.entry_date !== "undefined" ? params.entry_date : ""),
                entry_date_op: (typeof params.entry_date_op !== "undefined" ? $scope.parseSelector(params.entry_date_op) : ""),
                exit_date: (typeof params.exit_date !== "undefined" ? params.exit_date : ""),
                exit_date_op: (typeof params.exit_date_op !== "undefined" ? $scope.parseSelector(params.exit_date_op) : ""),
                daily: (typeof params.daily !== "undefined" ? params.daily : ""),
                daily_op: (typeof params.daily_op !== "undefined" ? $scope.parseSelector(params.daily_op) : ""),
                loss: (typeof params.loss !== "undefined" ? params.loss : ""),
                loss_op: (typeof params.loss_op !== "undefined" ? $scope.parseSelector(params.loss_op) : ""),
                fail: (typeof params.fail !== "undefined" ? params.fail : ""),
                fail_op: (typeof params.fail_op !== "undefined" ? $scope.parseSelector(params.fail_op) : ""),
                duration: (typeof params.duration !== "undefined" ? params.duration : ""),
                duration_op: (typeof params.duration_op !== "undefined" ? $scope.parseSelector(params.duration_op) : ""),
                drawdown: (typeof params.drawdown !== "undefined" ? params.drawdown : ""),
                drawdown_op: (typeof params.drawdown_op !== "undefined" ? $scope.parseSelector(params.drawdown_op) : ""),
                pattern_type: (typeof params.pattern_type !== "undefined" ? parseInt(params.pattern_type,10): 0)

            };
            //special case for selected_month
            if (typeof params.month === "undefined") {
                $scope.filters.selected_month = DateService.restartDate(new Date());
            } else {
                $scope.filters.selected_month = {value: params.month};
                //if the month is selected, create empty object simulating the selected month, to update the model with
                //updateMOnth
            }
            $scope.updateSelectorMonth();
            //to add later all items
            filters.selected_month = $scope.filters.selected_month;


            var tabChanged = false;
            if ($scope.filters.selected_tab !== filters.selected_tab) {
                //if the tab in the params is distinct that the actual tab, is necessary select in the code the tab
                TabsService.changeActiveSearchTab(filters.selected_tab);
                for (var j = 0; j < $scope.tabs.length; j++) {
                    if ($scope.tabs[j].value === TabsService.getActiveSearchTab()) {
                        $scope.tabs[j].active = true;
                        tabChanged = true;
                    } else {
                        $scope.tabs[j].active = false;
                    }
                }
            }
            $scope.filters = filters;
            $scope.found = (params.found ? params.found : 0 );
            $scope.pagingOptions.currentPage = (params.pag ? params.pag : 1);
        };

        /**
         *
         */


        /*apply filters to search, restarting the page*/
        $scope.applyFilters = function () {
            $scope.startLoading();

            //$scope.checkFilters();//check if selectors and inputs are right
            $scope.saveUrlParams();
            //$scope.loadPage();
        };
        /*search fires the apply filter and restart the page to 1*/
        $scope.search = function () {
            $scope.pagingOptions.currentPage = 1; //restart the page
            //clear the sub-filter
            $scope.applyFilters();
        };
        /***
         *
         */



        $scope.loadPage = function () {

            $scope.dataLoaded = true;
            $scope.loadFakeData();
            /**
             // $scope.loading = true;
             var data = PatternsService.getPagedDataAsync($scope.pagingOptions.currentPage, $scope.filterOptions.filters).then(function (data) {
                if (data.productType === parseInt($scope.filterOptions.filters.selected_tab, 10)) {
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
        /***
         * Fake Data
         */

        $scope.loadFakeData = function () {
            $scope.dataLoaded = true;
            $scope.loading = false;
            $scope.found= 2;
            $scope.results = 2;
            $scope.patterns = [
                {
                    operation:'sell',
                    icon: '',
                    name: 'BIOTEST PRF',
                    name2: 'TEST 2',
                    exchange: 'STU',
                    exchange2: 'STU2',
                    entry: '20150501',
                    exit: '20150506',
                    acum: '27.6',
                    daily: '0.37',
                    loss: '-10.06',
                    fails: 1,
                    dw: -10.06,
                    duration: 5
                },
                {
                    operation: 'buy',
                    icon: '',
                    name: 'BIOGEN IDEC ORD',
                    name2: 'TEST2 NAME',
                    exchange: 'MUN',
                    exchange2: 'STU2',
                    entry: '20150501',
                    exit: '20160219',
                    acum: '459.5',
                    daily: '0.1',
                    loss: '-52.94',
                    fails: 1,
                    dw: -53.78,
                    duration: 294
                }
            ];
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

        $scope.loadFakeData();

    })
;