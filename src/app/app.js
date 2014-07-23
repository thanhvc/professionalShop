angular.module('ngMo', [
        'templates-app',
        'templates-common',
        'ngMo.home',
        'ngMo.catalog',
        'ngMo.market_observatory',
        'ngMo.services',
        'ngMo.service_applications',
        'ngMo.subscriptions_and_prices',
        'ngMo.investor_tools',
        'ngMo.contact',
        'ngMo.my_patterns',
        'ngMo.my_packs',
        'ngMo.lookup_diary',
        'ngMo.historic',
        'ngMo.portfolio',
        'ngMo.correlation',
        'ngMo.volatility',
        'ngMo.the_week',
        'ngMo.calendar',
        'ngMo.my_subscriptions',
        'ngMo.my_profile',
        'ui.router',
        'gettext' ,
        'singUp',
        'auth',
        'ngMo.Activate'
    ])

 .config(function config( $stateProvider, $urlRouterProvider) {

        $stateProvider.state('home', {
            url: '/home?activated',
            views: {
                "main": {
                    controller: 'HomeCtrl',
                    templateUrl: 'home/home.tpl.html'
                }
            },
            data: {
                pageTitle: 'Home',
                selectMenu: '',
                selectSubmenu: '',
                selectItemSubmenu: '',
                moMenuType: 'publicMenu'
            }
        })
        .state('forgotten-password', {
            url: '/forgotten-password',
            views: {
                "main": {
                    controller: 'AppCtrl',
                    templateUrl: 'forgotten_password/forgotten-password.tpl.html'
                }
            },
            data: {
                pageTitle: 'forgotten-password',
                selectMenu: '',
                selectSubmenu: '',
                selectItemSubmenu: '',
                moMenuType: 'publicMenu'
             }
        })
        .state('faq', {
            url: '/faq',
            views: {
                "main": {
                    controller: 'HomeCtrl',
                    templateUrl: 'faq/faq.tpl.html'
                }
            },
            data: {
                pageTitle: 'FAQ',
                selectMenu: '',
                selectSubmenu: '',
                selectItemSubmenu: '',
                moMenuType: 'publicMenu'
            }
        })
        ;
        $urlRouterProvider.otherwise('/home');
    })

    .run(function run($rootScope) {
      // $rootScope.urlService = 'http://api.mo.devel.edosoftfactory.com';
       $rootScope.urlService = 'http://localhost:9000';
    })

    .service('ActiveTabService', function (){
        var activeTab = 0;
        this.activeTab = function (){
          return  activeTab;
        };
        this.changeActiveTab = function (tab) {
          activeTab =   tab;
          return activeTab;
        };
    })

    .service('SecondActiveTabService', function (){
        var activeTab = 0;
        this.activeTab = function (){
            return  activeTab;
        };
        this.changeActiveTab = function (tab) {
            activeTab =   tab;
            return activeTab;
        };
    })
    .service('AnchorLinkService', function ($location, $anchorScroll){
        this.scrollTo = function(id){
            $location.hash(id);
            $anchorScroll();
        };
    })
    .service('ArrayContainItemService', function () {
        this.containItem = function (array, itemArray) {
            var contain = false;
            angular.forEach(array, function (item) {
                    if (item.code === itemArray.code ) {
                        contain = true;
                    }
                });
            if (contain){
                return true;
            }else {
                return false;
            }
        };
    })
    .filter('twoDecimals', function(){ //TRANSFORM A DECIMAL NUMBER TO STRING WITH 2 DECIMALS
        return function(n){
            //return a string with 2 decimal if exists..
            //xx.xxxx -> xx.xx
            //xx.x -> xx.x
            //xx -> xx
            str="";
            if (n != null && !isNaN(n)) {
                str = n.toString().substr(0,n.toString().indexOf(".")+3);
            }
            return str;
        };
    })
    .service('ShoppingCartService', function (ActiveTabService){

        var stockItems =  [];

        var pairsItems  =  [];

        var indicesItems = [];

        var pairsIndicesItems = [] ;
        var futuresItems =  [];

        var numItemsCart = 0;
        var totalCart = 0;
        var stockSubtotal = 0;
        var pairsSubtotal = 0;
        var indicesSubtotal = 0;
        var pairsIndicesSubtotal = 0;
        var futuresSubtotal = 0;

        var showCart = false;
        this.openCart = function (){
            showCart = true;
            return showCart;
        };

        this.closeCart = function (){
            if (showCart === true) {
                showCart = false;
            }
            return showCart;
        };

        this.obtainCartItems = function (typePack) {
            switch (typePack){
                case 'stocks':
                    return stockItems;
                case 'pairs':
                    return pairsItems;
                case 'indices':
                    return indicesItems;
                case 'pairsIndices':
                    return pairsIndicesItems;
                case 'futures':
                    return futuresItems;
            }
        };

        this.addItemCart = function (item) {
            var activeTab = ActiveTabService.activeTab();
            switch (item.productType){
                case 'STOCK':
                    if (item.patternType === 0){
                        stockItems.push(item);
                        stockSubtotal += item.price;
                    }else{
                        pairsItems.push(item);
                        pairsSubtotal += item.price;
                    }
                    break;
                case 'INDICE':
                    if (item.patternType === 0) {
                        indicesItems.push(item);
                        indicesSubtotal += item.price;
                    }else{
                        pairsIndicesItems.push(item);
                        pairsIndicesSubtotal += item.price;
                    }
                    break;
                case 'FUTURE':
                    futuresItems.push(item);
                    futuresSubtotal += item.price;
            }
            showCart = true;
            numItemsCart++;
            totalCart+=item.price;
        };

        this.obtainSubtotal = function(productType){
            switch (productType){
                case 'stocks':
                    return stockSubtotal;
                case 'pairs':
                    return pairsSubtotal;
                case 'indices':
                    return indicesSubtotal;
                case 'pairsIndices':
                    return pairsIndicesSubtotal;
                case 'futures':
                    return futuresSubtotal;
            }
        };

        this.removeItemCart = function (productType, item) {
            var index = -1;
            switch (productType){
                case 'stocks':
                    index = stockItems.indexOf(item);
                    stockItems.splice(index,1);
                    stockSubtotal -= item.price;
                    break;
                case 'pairs':
                    index = pairsItems.indexOf(item);
                    pairsItems.splice(index,1);
                    pairsSubtotal -= item.price;
                    break;
                case 'indices':
                    index = indicesItems.indexOf(item);
                    indicesItems.splice(index,1);
                    indicesSubtotal -= item.price;
                    break;
                case 'pairsIndices':
                    index = pairsIndicesItems.indexOf(item);
                    pairsIndicesItems.splice(index,1);
                    pairsIndicesSubtotal -= item.price;
                    break;
                case 'futures':
                    index = futuresItems.indexOf(item);
                    futuresItems.splice(index,1);
                    futuresSubtotal -= item.price;
                    break;
            }
            numItemsCart--;
            totalCart-=item.price;
        };


        /**
         * change the item with same code
         * @param item
         * @param type
         */
        this.changeDuration = function(item,type) {
            switch (type){
                case 0:
                    //the new price is set with duration, the total cart is updated
                    for (i=0;i<stockItems.length;i++) {
                        if (item.code === stockItems[i].code) {
                            stockItems[i] = item;
                            break;
                        }
                    }
                    break;
                case 1:
                    for (i=0;i<pairsItems.length;i++) {
                        if (item.code === pairsItems[i].code) {
                            pairsItems[i] = item;
                            break;
                        }
                    }
                    break;
                case 2:
                    for (i=0;i<indicesItems.length;i++) {
                        if (item.code === indicesItems[i].code) {
                            indicesItems[i] = item;
                            break;
                        }
                    }
                    break;
                case 3:
                    for (i=0;i<pairsIndicesItems.length;i++) {
                        if (item.code === pairsIndicesItems[i].code) {
                            pairsIndicesItems[i] = item;
                            break;
                        }
                    }
                    break;
                case 4:
                    for (i=0;i<futuresItems.length;i++) {
                        if (item.code === futuresItems[i].code) {
                            futuresItems[i] = item;
                            break;
                        }
                    }
                    break;
            }
            //update prices
            totalCart = 0;
            stockSubtotal = 0;
            pairsSubtotal = 0;
            indicesSubtotal = 0;
            pairsIndicesSubtotal = 0;
            futuresSubtotal = 0;
            for (i=0;i<stockItems.length;i++) {
                totalCart += stockItems[i].price;
                stockSubtotal += stockItems[i].price;
            }
            for (i=0;i<pairsItems.length;i++) {
                totalCart += pairsItems[i].price;
                pairsSubtotal +=pairsItems[i].price;
            }
            for (i=0;i<indicesItems.length;i++) {
                totalCart += indicesItems[i].price;
                indicesSubtotal +=indicesItems[i].price;
            }
            for (i=0;i<pairsIndicesItems.length;i++) {
                totalCart += pairsIndicesItems[i].price;
                pairsIndicesSubtotal += pairsIndicesItems[i].price;
            }
            for (i=0;i<futuresItems.length;i++) {
                totalCart += futuresItems[i].price;
                futuresSubtotal+=futuresItems[i].price;
            }



        };

        this.removeAllItemsCart = function () {
            stockItems = [];//stockItems.splice(0, pairsItems.length);
            pairsItems = [];//pairsItems.splice(0, pairsItems.length);
            indicesItems = [];//indicesItems.splice(0, pairsItems.length);
            pairsIndicesItems = [];//pairsIndicesItems.splice(0, pairsItems.length);
            futuresItems = [];//futuresItems.splice(0, pairsItems.length);
            stockSubtotal = 0;
            pairsSubtotal = 0;
            indicesSubtotal = 0;
            pairsIndicesSubtotal = 0;
            futuresSubtotal = 0;
            totalCart = 0;
            numItemsCart = 0;
        };

        this.obtainNumItemsCart = function () {
            return numItemsCart;
        };

        this.obtainTotalCart = function () {
            return totalCart;
        };



    })

    .controller('AppCtrl', function AppCtrl($scope, $rootScope, ActualDateService, $modal, IsLogged) {

        $scope.$on('$stateChangeStart', function (event, toState){
            IsLogged.isLogged();
            $scope.inWeekView = false;
            if (toState.url === '/the-week') {
                $scope.inWeekView = true;
            }
        });
        $scope.$on('$stateChangeSuccess', function (event, toState, toParams, fromState, fromParams) {
            if (angular.isDefined(toState.data.pageTitle)) {$scope.pageTitle = toState.data.pageTitle + ' | Market Observatory';}
            $scope.selectMenu = toState.data.selectMenu;
            $scope.selectSubmenu = toState.data.selectSubmenu;
            $scope.selectItemSubmenu = toState.data.selectItemSubmenu;
            $scope.actualMenu = '';
            $scope.actualSubmenu = '';
            $scope.moMenuType = toState.data.moMenuType;
            $scope.errorSignIn = false;
            $scope.$watch('actualSubmenu', function(){});
            $scope.$watch('selectSubmenu', function(){});
        });
        var data = ActualDateService.actualDate(function (data) {
            $scope.actualDate = data.actualDate;
        });

        var dataNext = ActualDateService.nextDate(function (data) {
            $scope.nextDate = data.nextDate;
        });

        $scope.openModalInstance = function(url) {
            $modal.open({
                templateUrl: 'home/modal.tpl.html',
                controller: ModalInstanceCtrl,
                resolve: {
                    advertisingSelected: function () {
                        return url+".tpl.html";
                    }
                }
            });
        };
        //function trigger other functions when click into body
        $scope.hideElements = function () {
            $scope.hideSignInForm();
            $scope.closeCart();
            $scope.hideSelectedGraphic();
        };

    })

    .directive("scroll", function ($window) {
        return function(scope, element, attrs) {
            angular.element($window).bind("scroll", function() {
                if (this.pageYOffset >= 150) {
                    scope.boolChangeClass = true;
                } else {
                    scope.boolChangeClass = false;
                }
                scope.$apply();
            });
        };
    })

    .directive('ngEnter', function() { //ng-enter='myFunction()' in a input for example will fire the myFunction when the user press enter..
        return function(scope, element, attrs) {
            element.bind("keydown keypress", function(event) {
                if(event.which === 13) {
                    scope.$apply(function(){
                        scope.$eval(attrs.ngEnter, {'event': event});
                    });

                    event.preventDefault();
                }
            });
        };
    })

/**
 * Directive for public nav
 */
    .directive('publicMenu',function ($compile, $rootScope){
        return {
            controller: function($scope, $state){
                /**
                 * TODO: Replace this variable for a service
                 * @type {boolean}
                 */
                $scope.onMouseEnterMenu = function(idMenu, idSubmenu) {
                    $scope.actualMenu = idMenu;
                    $scope.actualSubmenu = idSubmenu;
                    $scope.selectSubmenu = '';
                };
                $scope.onMouseLeaveMenu = function() {
                    if ($state.current.data.selectMenu !== '' && $scope.actualMenu !== $state.current.data.selectMenu) {
                        $scope.actualMenu = $state.current.data.selectMenu;
                        $scope.actualSubmenu = $state.current.data.selectSubmenu;
                        $scope.actualItemSubmenu = $state.current.data.selectItemSubmenu;
                    }
                };
            },
            link: function($scope, element) {
               $scope.$watch('actualSubmenu', function(){});
               $scope.$watch('selectSubmenu', function(){});
               var isPresent = false;
               $scope.$watch('isLog', function(){
                   if ($rootScope.isLog && !isPresent) {
                       isPresent = true;
                       var itemPublicMenu = angular.element("<ul id=\"new-item-menu\" class=\"public-menu-logged\"><li id=\"my-patterns-nav\" class=\"nav-li seventh-item-menu\"" +
                           "ng-mouseenter=\"onMouseEnterMenu('my-patterns-nav','')\"" +
                           "ng-mouseleave=\"onMouseLeaveMenu()\"" +
                           "ng-class=\"{'item-nav-hover':actualMenu == 'my-patterns-nav'}\">" +
                           "<a ui-sref=\"my-patterns\">" +
                           "Mis Patrones" +
                           "</a></ul>");
                       element.append(itemPublicMenu);
                       $compile(element.contents())($scope);
                   }else if(!$rootScope.isLog && isPresent){
                       isPresent = false;
                       var itemmenu = angular.element(document.querySelector("#new-item-menu"));
                       itemmenu.remove();
                       //element.remove(itemmenu);
                       $compile(element.contents())($scope);
                   }
               });
            },
            templateUrl:'layout_templates/public-menu.tpl.html'
        };
    })
    .directive('publicSubMenu',function (){
        return {
            controller: function($scope, $state){
                $scope.onMouseEnterSubmenu = function(idMenu, idSubmenu, idItemSubmenu) {
                    $scope.actualMenu = idMenu;
                    $scope.actualSubmenu = idSubmenu;
                    $scope.actualItemSubmenu = idItemSubmenu;
                };
                $scope.onMouseLeaveSubmenu = function () {
                    $scope.actualItemSubmenu = '';
                    if ($state.current.data.selectMenu !== '' && $scope.actualMenu !== $state.current.data.selectMenu) {
                        $scope.actualMenu = $state.current.data.selectMenu;
                        $scope.actualSubmenu = $state.current.data.selectSubmenu;
                        $scope.actualItemSubmenu = $state.current.data.selectItemSubmenu;
                    }
                };
                $scope.onClickSubmenu = function () {
                    $scope.actualMenu = '';
                    $scope.actualSubmenu = '';
                    $scope.actualItemSubmenu = '';
                };
            },
            link: function($scope) {
                $scope.$watch('actualSubmenu', function(){});
                $scope.$watch('selectSubmenu', function(){});
            },
            templateUrl:'layout_templates/public-submenu.tpl.html'
        };
    })

    .directive('privateMenu',function (){
        return {
            controller: function($scope, $state){
                $scope.onMouseEnterMenu = function(idMenu, idSubmenu) {
                    $scope.actualMenu = idMenu;
                    $scope.actualSubmenu = idSubmenu;
                };
                $scope.onMouseLeaveMenu = function() {
                    if ($state.current.data.selectMenu !== '' && $scope.actualMenu !== $state.current.data.selectMenu) {
                        $scope.actualMenu = $state.current.data.selectMenu;
                    }
                };
                $scope.onClickMenu = function () {
                    $scope.actualMenu = '';
                    $scope.actualSubmenu = '';
                    $scope.actualItemSubmenu = '';
                };
            },
            link: function($scope) {
            },
            templateUrl:'layout_templates/private-menu.tpl.html'
        };
    })

    .directive('privateSubMenu',function (){
        return {
            controller: function($scope, $state){
                $scope.onMouseEnterSubmenu = function(idMenu, idSubmenu, idItemSubmenu) {
                    $scope.actualMenu = idMenu;
                    $scope.actualSubmenu = idSubmenu;
                    $scope.actualItemSubmenu = idItemSubmenu;
                };
                $scope.onMouseLeaveSubmenu = function () {
                    $scope.actualItemSubmenu = '';
                    if ($state.current.data.selectMenu !== '' && $scope.actualMenu !== $state.current.data.selectMenu) {
                        $scope.actualMenu = $state.current.data.selectMenu;
                        $scope.actualSubmenu = $state.current.data.selectSubmenu;
                        $scope.actualItemSubmenu = $state.current.data.selectItemSubmenu;
                    }
                };
                $scope.onClickSubmenu = function () {
                    $scope.actualMenu = '';
                    $scope.actualSubmenu = '';
                    $scope.actualItemSubmenu = '';
                };
            },
            link: function($scope) {
                $scope.$watch('actualSubmenu', function(){});
                $scope.$watch('selectSubmenu', function(){});
            },
            templateUrl:'layout_templates/private-submenu.tpl.html'
        };
    })

/**
 * The flagbox directive is included in the header in order to change the language of the page.
 * TODO: Match functionality with selected i18n lib
 * */
    .directive('flagBox', function () {
        return {
            restrict: 'E',
            templateUrl: 'layout_templates/flags.tpl.html',
            controller: function($scope, $modal){
                $scope.openModal = function(idioma) {
                    $modal.open({
                        templateUrl: 'layout_templates/modal-text.tpl.html',
                        controller: ModalInstanceCtrl,
                        resolve: {
                            advertisingSelected: function () {
                                switch (idioma) {
                                    case 'English':
                                        return "Work in progress. Sorry for the inconvenience. Available in Spanish.";
                                    case 'Germany':
                                        return "Arbeiten im Gange. Sorry für die Unannehmlichkeiten. In Spanisch verfügbar.";
                                    case 'French':
                                        return "Travaux en cours. Excuser pour le désagrément. Actuellement disponible en espagnol.";
                                    case 'Japanese':
                                        return "進行中で働いています。ご迷惑をおかけして申し訳ありません。英語とスペイン語で、現在利用可能";
                                    case 'Chinese':
                                        return "工作进行中。很抱歉给您带来不便。目前在英语和西班牙语。";
                                }
                            }
                        }
                    });
                };
            }
        };
    })

    .directive('cart', function() {
        return{
            controller: function($scope,$window, $http, ShoppingCartService, ArrayContainItemService, $filter, $rootScope,$state) {

                //catch the event submitcart to send the packs to buy
                $scope.$on('submitCart', function() {
                    $scope.submitCart();
                    $state.go('my-patterns');
                });



                $scope.numItemsCart = ShoppingCartService.obtainNumItemsCart();
                $scope.totalCart = ShoppingCartService.obtainTotalCart();
                $scope.showCart = false;
                $scope.subtotalStock = 0;
                $scope.subtotalPairs = 0;
                $scope.subtotalIndices = 0;
                $scope.subtotalPairsIndices = 0;
                $scope.subtotalFutures = 0;

                $scope.openCart = function () {
                   $scope.showCart = ShoppingCartService.openCart();
                };

                $scope.closeCart = function () {
                    $scope.showCart = ShoppingCartService.closeCart();
                };

                $scope.toggleCart = function () {
                    if ($scope.showCart === true){
                        $scope.showCart = false;
                    }else{
                        $scope.showCart = true;
                    }
                };

                $scope.removeItemCart =  function (productType,item){
                    ShoppingCartService.removeItemCart(productType, item);
                    $scope.numItemsCart = ShoppingCartService.obtainNumItemsCart();
                    $scope.subtotalStock -= item.price;
                    $scope.totalCart -= item.price;
                };
                /**
                 * TODO: replace enter parameter 'id' for 'item'
                 * @param id
                 */

                $scope.changeDurationCart = function(code,type){
                    switch (type) {
                        case 0: //stock
                            for (i=0;i<$scope.stockItems.length;i++) {
                                if ($scope.stockItems[i].code == code) {
                                    switch ($scope.stockItems[i].duration) {
                                        case "Mensual":
                                            $scope.stockItems[i].price = $scope.stockItems[i].prices[0];
                                            break;
                                        case "Trimestral":
                                            $scope.stockItems[i].price = $scope.stockItems[i].prices[1];
                                            break;
                                        case "Anual":
                                            $scope.stockItems[i].price = $scope.stockItems[i].prices[2];
                                            break;
                                    }
                                    ShoppingCartService.changeDuration($scope.stockItems[i],type);
                                    break;
                                }
                            }
                            break;
                        case 1://pairs
                            for (i=0;i<$scope.pairsItems.length;i++) {
                                if ($scope.pairsItems[i].code == code) {
                                    switch ($scope.pairsItems[i].duration) {
                                        case "Mensual":
                                            $scope.pairsItems[i].price = $scope.pairsItems[i].prices[0];
                                            break;
                                        case "Trimestral":
                                            $scope.pairsItems[i].price = $scope.pairsItems[i].prices[1];
                                            break;
                                        case "Anual":
                                            $scope.pairsItems[i].price = $scope.pairsItems[i].prices[2];
                                            break;
                                    }
                                    ShoppingCartService.changeDuration($scope.pairsItems[i],type);
                                    break;
                                }
                            }
                            break;
                        case 2://index
                            for (i=0;i<$scope.indicesItems.length;i++) {
                                if ($scope.indicesItems[i].code == code) {
                                    switch ($scope.indicesItems[i].duration) {
                                        case "Mensual":
                                            $scope.indicesItems[i].price = $scope.indicesItems[i].prices[0];
                                            break;
                                        case "Trimestral":
                                            $scope.indicesItems[i].price = $scope.indicesItems[i].prices[1];
                                            break;
                                        case "Anual":
                                            $scope.indicesItems[i].price = $scope.indicesItems[i].prices[2];
                                            break;
                                    }
                                    ShoppingCartService.changeDuration($scope.indicesItems[i],type);
                                    break;
                                }
                            }
                            break;
                        case 3://pairs index
                            for (i=0;i<$scope.pairsIndicesItems.length;i++) {
                                if ($scope.pairsIndicesItems[i].code == code) {
                                    switch ($scope.pairsIndicesItems[i].duration) {
                                        case "Mensual":
                                            $scope.pairsIndicesItems[i].price = $scope.pairsIndicesItems[i].prices[0];
                                            break;
                                        case "Trimestral":
                                            $scope.pairsIndicesItems[i].price = $scope.pairsIndicesItems[i].prices[1];
                                            break;
                                        case "Anual":
                                            $scope.pairsIndicesItems[i].price = $scope.pairsIndicesItems[i].prices[2];
                                            break;
                                    }
                                    ShoppingCartService.changeDuration($scope.pairsIndicesItems[i],type);
                                    break;
                                }
                            }
                            break;
                        case 4://futures
                            for (i=0;i<$scope.futuresItems.length;i++) {
                                if ($scope.futuresItems[i].code == code) {
                                    switch ($scope.futuresItems[i].duration) {
                                        case "Mensual":
                                            $scope.futuresItems[i].price = $scope.futuresItems[i].prices[0];
                                            break;
                                        case "Trimestral":
                                            $scope.futuresItems[i].price = $scope.futuresItems[i].prices[1];
                                            break;
                                        case "Anual":
                                            $scope.futuresItems[i].price = $scope.futuresItems[i].prices[2];
                                            break;
                                    }
                                    ShoppingCartService.changeDuration($scope.futuresItems[i],type);
                                    break;
                                }
                            }
                            break;
                        default :
                            break;
                    }
                    $scope.totalCart = ShoppingCartService.obtainTotalCart();
                    $scope.subtotalStock = ShoppingCartService.obtainSubtotal('stocks');
                    $scope.subtotalPairs = ShoppingCartService.obtainSubtotal('pairs');
                    $scope.subtotalIndices = ShoppingCartService.obtainSubtotal('indices');
                    $scope.subtotalPairsIndices = ShoppingCartService.obtainSubtotal('pairsIndices');
                    $scope.subtotalFutures = ShoppingCartService.obtainSubtotal('futures');

                };
                /**
                 * TODO: replace enter parameter 'id' for 'item'
                 * @param id
                 */
                $scope.addNewItemCart = function(newItem, startDate){
                    $scope.stockItems = ShoppingCartService.obtainCartItems('stocks');
                    item = {
                        "code": newItem.code,
                        "packName": newItem.name,
                        "startDate": $filter('date')(startDate, 'MMMM yyyy'),
                        "duration": "Mensual",
                        "price": 29,
                        "date": $filter('date')(startDate, 'dd/MM/yyyy'),
                        "patternType": newItem.patternType,
                        "productType": newItem.productType,
                        prices: [29,82,313]
                    };
                    var totalList = [];
                    if ((typeof $scope.stockItems != "undefined")) {
                        totalList = totalList.concat($scope.stockItems);
                    }
                    if ((typeof $scope.pairsItems != "undefined")) {
                        totalList = totalList.concat($scope.pairsItems);
                    }
                    if ((typeof $scope.indicesItems != "undefined")) {
                        totalList = totalList.concat($scope.indicesItems);
                    }
                    if ((typeof $scope.pairsIndicesItems != "undefined")) {
                        totalList = totalList.concat($scope.pairsIndicesItems);
                    }
                    if ((typeof $scope.futuresItems != "undefined")) {
                        totalList = totalList.concat($scope.futuresItems);
                    }

                    if (!ArrayContainItemService.containItem(totalList , item)) {
                        ShoppingCartService.addItemCart(item);
                        $scope.stockItems = ShoppingCartService.obtainCartItems('stocks');
                        $scope.pairsItems = ShoppingCartService.obtainCartItems('pairs');
                        $scope.indicesItems = ShoppingCartService.obtainCartItems('indices');
                        $scope.pairsIndicesItems = ShoppingCartService.obtainCartItems('pairsIndices');
                        $scope.futuresItems = ShoppingCartService.obtainCartItems('futures');
                        $scope.openCart();
                        $scope.totalCart = ShoppingCartService.obtainTotalCart();
                        $scope.numItemsCart = ShoppingCartService.obtainNumItemsCart();
                        $scope.subtotalStock = ShoppingCartService.obtainSubtotal('stocks');
                        $scope.subtotalPairs = ShoppingCartService.obtainSubtotal('pairs');
                        $scope.subtotalIndices = ShoppingCartService.obtainSubtotal('indices');
                        $scope.subtotalPairsIndices = ShoppingCartService.obtainSubtotal('pairsIndices');
                        $scope.subtotalFutures = ShoppingCartService.obtainSubtotal('futures');
                    }
                };
                $scope.removeAllItemsCart = function () {
                    ShoppingCartService.removeAllItemsCart();
                    $scope.stockItems = ShoppingCartService.obtainCartItems('stocks');
                    $scope.pairsItems = ShoppingCartService.obtainCartItems('pairs');
                    $scope.indicesItems = ShoppingCartService.obtainCartItems('indices');
                    $scope.pairsIndicesItems = ShoppingCartService.obtainCartItems('pairsIndices');
                    $scope.futuresItems = ShoppingCartService.obtainCartItems('futures');
                    $scope.totalCart = 0;
                    $scope.numItemsCart = 0;
                    $scope.subtotalStock = 0;
                };

                $scope.submitCart = function () {
                    token = $window.sessionStorage.token;
                    if (token != null) {
                        //user logged, then can add packs


                        //the cart data to send, is not necessary keep the packs divided by type, with the Id we can recognize the type pattern in the server
                        dataCart = [];

                        //create the data to send
                        if ($scope.stockItems.length >0) {
                            for (i=0;i<$scope.stockItems.length;i++) {
                                item = {
                                    duration: $scope.stockItems[i].duration,
                                    code: $scope.stockItems[i].code,
                                    start: $scope.stockItems[i].date
                                };
                                dataCart.push(item);
                            }
                        }

                        if ($scope.pairsItems.length >0) {
                            for (i=0;i<$scope.pairsItems.length;i++) {
                                item = {
                                    duration: $scope.pairsItems[i].duration,
                                    code: $scope.pairsItems[i].code,
                                    start: $scope.pairsItems[i].date
                                };
                                dataCart.push(item);
                            }
                        }

                        if ($scope.indicesItems.length >0) {
                            for (i=0;i<$scope.indicesItems.length;i++) {
                                item = {
                                    duration: $scope.indicesItems[i].duration,
                                    code: $scope.indicesItems[i].code,
                                    start: $scope.indicesItems[i].date
                                };
                                dataCart.push(item);
                            }
                        }

                        if ($scope.pairsIndicesItems.length >0) {
                            for (i=0;i<$scope.pairsIndicesItems.length;i++) {
                                item = {
                                    duration: $scope.pairsIndicesItems[i].duration,
                                    code: $scope.pairsIndicesItems[i].code,
                                    start: $scope.pairsIndicesItems[i].date
                                };
                                dataCart.push(item);
                            }
                        }

                        if ($scope.futuresItems.length >0) {
                            for (i=0;i<$scope.futuresItems.length;i++) {
                                item = {
                                    duration: $scope.futuresItems[i].duration,
                                    code: $scope.futuresItems[i].code,
                                    start: $scope.futuresItems[i].date
                                };
                                dataCart.push(item);
                            }
                        }

                        config = {
                            headers: {
                                'X-Session-Token': token
                            },
                            data: dataCart
                        };
                        return $http.post($rootScope.urlService+'/addpacks', config)
                            .success(function (data, status) {
                                $scope.removeAllItemsCart();
                                $scope.callbackPurchase(data, status);
                            })
                            .error(function (data, status) {
                                $scope.callbackPurchase(data, status);
                            });
                    } else {
                        $state.go('new-subscription');
                    }
                };
                $scope.callbackPurchase = function (){

                };
            },
            link: function ($scope) {
                $scope.$watch('stockItems', function(){});
                $scope.$watch('pairsItems', function(){});
                $scope.$watch('indicesItems', function(){});
                $scope.$watch('pairsIndicesItems', function(){});
                $scope.$watch('futuresItems', function(){});
                $scope.$watch('showCart', function(){});
                $scope.$watch('numItemsCart', function(){});
                $scope.$watch('totalCart', function(){});
                $scope.$watch('subtotalStock', function(){});
            },
            templateUrl: 'layout_templates/cart.tpl.html'
        };
    })

;
//modalPanel
 var ModalInstanceCtrl = function ($scope, $modalInstance, advertisingSelected) {
     $scope.advertisingSelected = advertisingSelected;
     $scope.close = function () {
        $modalInstance.close();
    };
 };