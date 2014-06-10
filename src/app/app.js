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
        this.changeShowCart = function (){
            if (showCart === false) {
                showCart = true;
            }else{
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
            switch (activeTab){
                case 0:
                    stockItems.push(item);
                    stockSubtotal += item.price;
                    break;
                case 1:
                    pairsItems.push(item);
                    pairsSubtotal += item.price;
                    break;
                case 2:
                    indicesItems.push(item);
                    indicesSubtotal += item.price;
                    break;
                case 3:
                    pairsIndicesItems.push(item);
                    pairsIndicesSubtotal += item.price;
                    break;
                case 4:
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

    .controller('AppCtrl', function AppCtrl($scope, ActualDateService, $modal) {
        $scope.$on('$stateChangeSuccess', function (event, toState, toParams, fromState, fromParams) {
            if (angular.isDefined(toState.data.pageTitle)) {$scope.pageTitle = toState.data.pageTitle + ' | Market Observatory';}

            $scope.selectMenu = toState.data.selectMenu;
            $scope.selectSubmenu = toState.data.selectSubmenu;
            $scope.selectItemSubmenu = toState.data.selectItemSubmenu;
            $scope.actualMenu = '';
            $scope.actualSubmenu = '';
            $scope.moMenuType = toState.data.moMenuType;

            $scope.$watch('actualSubmenu', function(){});
            $scope.$watch('selectSubmenu', function(){});
        });
        $scope.actualDate = ActualDateService.actualDate();

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
    })

/**
 * Directive for public nav
 */
    .directive('publicMenu',function ($compile){
        return {
            controller: function($scope, $state){
                /**
                 * TODO: Replace this variable for a service
                 * @type {boolean}
                 */
                $scope.isLogged = true;
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
                if ($scope.isLogged) {
                    var itemPublicMenu = angular.element("<ul class=\"public-menu-logged\"><li id=\"my-patterns-nav\" class=\"nav-li seventh-item-menu\"" +
                        "ng-mouseenter=\"onMouseEnterMenu('my-patterns-nav','')\"" +
                        "ng-mouseleave=\"onMouseLeaveMenu()\"" +
                        "ng-class=\"{'item-nav-hover':actualMenu == 'my-patterns-nav'}\">" +
                        "<a ui-sref=\"my-patterns\">" +
                        "Mis Patrones" +
                        "</a></ul>");
                    element.append(itemPublicMenu);
                    $compile(element.contents())($scope);
                }
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
            templateUrl: 'layout_templates/flags.tpl.html'
        };
    })

    .directive('cart', function( ) {
        return{
            controller: function($scope, ShoppingCartService, ArrayContainItemService) {
                $scope.numItemsCart = ShoppingCartService.obtainNumItemsCart();
                $scope.totalCart = ShoppingCartService.obtainTotalCart();
                $scope.showCart = false;
                $scope.subtotalStock = 0;
                $scope.subtotalPairs = 0;
                $scope.subtotalIndices = 0;
                $scope.subtotalPairsIndices = 0;
                $scope.subtotalFutures = 0;

                $scope.toggleCart = function () {
                   $scope.showCart = ShoppingCartService.changeShowCart();
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
                $scope.addNewItemCart = function(id){
                    $scope.stockItems = ShoppingCartService.obtainCartItems('stocks');
                    item = {
                        "id": id,
                        "packName": "Nuevo "+id,
                        "startDate": "May 14",
                        "duration": "Mensual",
                        "price": 29
                    };
                    if (!ArrayContainItemService.containItem($scope.stockItems, item)) {
                        ShoppingCartService.addItemCart(item);
                        $scope.stockItems = ShoppingCartService.obtainCartItems('stocks');
                        $scope.pairsItems = ShoppingCartService.obtainCartItems('pairs');
                        $scope.indicesItems = ShoppingCartService.obtainCartItems('indices');
                        $scope.pairsIndicesItems = ShoppingCartService.obtainCartItems('pairsIndices');
                        $scope.futuresItems = ShoppingCartService.obtainCartItems('futures');
                        $scope.showCart = true;
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