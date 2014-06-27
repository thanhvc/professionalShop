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
        'auth'
    ])

 .config(function config( $stateProvider, $urlRouterProvider) {

        $stateProvider.state('home', {
            url: '/home',
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
        });
        $urlRouterProvider.otherwise('/home');
    })

    .run(function run() {
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
                    if (item.id === itemArray.id) {
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

    .service('ShoppingCartService', function (ActiveTabService){

        var stockItems =  [
            /*{
                "id": 1,
                "packName": "Canada",
                "startDate": "May 14",
                "duration": "Mensual",
                "price": 29
            },
            {
                "id": 2,
                "packName": "Estados Unidos Pack I",
                "startDate": "May 14",
                "duration": "Trimestral",
                "price": 82
            }*/
        ];

        var pairsItems  =  [
           /* {
                "id": 13,
                "packName": "Estados Unidos Pack I",
                "startDate": "May 14",
                "duration": "Anual",
                "price": 313
            }*/
        ];

        var indicesItems = [
            /*{
                "id": 22,
                "packName": "Indices Pack I",
                "startDate": "May 14",
                "duration": "Anual",
                "price": 313
            }*/
        ];

        var pairsIndicesItems = [
          /*  {
                "id": 23,
                "packName": "Pares Indices Pack I",
                "startDate": "May 14",
                "duration": "Anual",
                "price": 313
            }*/
        ] ;
        var futuresItems =  [
           /* {
                "id": 24,
                "packName": "Futures Pack I",
                "startDate": "May 14",
                "duration": "Mensual",
                "price": 29
            }*/
        ];

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
            switch (item.patternType){
                case "stock":
                    stockItems.push(item);
                    stockSubtotal += item.price;
                    break;
                case "pair":
                    pairsItems.push(item);
                    pairsSubtotal += item.price;
                    break;
                case "index":
                    indicesItems.push(item);
                    indicesSubtotal += item.price;
                    break;
                case "pairIndex":
                    pairsIndicesItems.push(item);
                    pairsIndicesSubtotal += item.price;
                    break;
                case "future":
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

        this.removeAllItemsCart = function () {
            stockItems = stockItems.splice(0, pairsItems.length);
            pairsItems = pairsItems.splice(0, pairsItems.length);
            indicesItems = indicesItems.splice(0, pairsItems.length);
            pairsIndicesItems = pairsIndicesItems.splice(0, pairsItems.length);
            futuresItems = futuresItems.splice(0, pairsItems.length);
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
        /*$rootScope.$on('$routeChangeStart', function (event){
           if  (!$rootScope.isLog){
               $rootScope.saveLocation = $location.url();
               $location.path('/')
           }
        });*/
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
            controller: function($scope,$window, $http, ShoppingCartService, ArrayContainItemService) {
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
                $scope.addNewItemCart = function(newItem){
                    $scope.stockItems = ShoppingCartService.obtainCartItems('stocks');
                    item = {
                        "id": newItem.id,
                        "packName": "Nuevo "+newItem.id,
                        "startDate": newItem.startDate,
                         "date": newItem.date, //is the startDate in mm/dd format, to send it to the server
                        "duration": "Mensual",
                        "price": 29,
                        "patternType": newItem.patternType
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
                                    id: $scope.stockItems[i].id,
                                    start: $scope.stockItems[i].date
                                };
                                dataCart.push(item);
                            }
                        }

                        if ($scope.pairsItems.length >0) {
                            for (i=0;i<$scope.pairsItems.length;i++) {
                                item = {
                                    duration: $scope.pairsItems[i].duration,
                                    id: $scope.pairsItems[i].id,
                                    start: $scope.pairsItems[i].date
                                };
                                dataCart.push(item);
                            }
                        }

                        if ($scope.indicesItems.length >0) {
                            for (i=0;i<$scope.indicesItems.length;i++) {
                                item = {
                                    duration: $scope.indicesItems[i].duration,
                                    id: $scope.indicesItems[i].id,
                                    start: $scope.indicesItems[i].date
                                };
                                dataCart.push(item);
                            }
                        }

                        if ($scope.pairsIndicesItems.length >0) {
                            for (i=0;i<$scope.pairsIndicesItems.length;i++) {
                                item = {
                                    duration: $scope.pairsIndicesItems[i].duration,
                                    id: $scope.pairsIndicesItems[i].id,
                                    start: $scope.pairsIndicesItems[i].date
                                };
                                dataCart.push(item);
                            }
                        }

                        if ($scope.futuresItems.length >0) {
                            for (i=0;i<$scope.futuresItems.length;i++) {
                                item = {
                                    duration: $scope.futuresItems[i].duration,
                                    id: $scope.futuresItems[i].id,
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
                        return $http.post('http://api.mo.devel.edosoftfactory.com/addpacks', config)
                            .success(function (data, status) {
                                $scope.callbackPurchase(data, status);
                            })
                            .error(function (data, status) {
                                $scope.callbackPurchase(data, status);
                            });
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