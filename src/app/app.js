angular.module('ngMo', [
        'templates-app',
        'templates-common',
        'ngMo.home',
        'ngMo.market_observatory',
        'ngMo.services',
        'ngMo.service_applications',
        'ngMo.subscriptions_and_prices',
        'ngMo.investor_tools',
        'ngMo.contact',
        'ui.router',
        'gettext'
    ])

 .config(function config( $stateProvider, $urlRouterProvider) {
        $urlRouterProvider.otherwise('/home');
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
                selectItemSubmenu: ''
            }
        });
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
                    stockItems.splice(index);
                    break;
                case 'pairs':
                    index = pairsItems.indexOf(item);
                    pairsItems.splice(index);
                    break;
                case 'indices':
                    index = indicesItems.indexOf(item);
                    indicesItems.splice(index);
                    break;
                case 'pairsIndices':
                    index = pairsIndicesItems.indexOf(item);
                    pairsIndicesItems.splice(index);
                    break;
                case 'futures':
                    index = futuresItems.indexOf(item);
                    futuresItems.splice(index);
                    break;
            }
            numItemsCart--;
            totalCart-=item.price;
        };

        this.removeAllItemsCart = function () {
            stockItems = stockItems.slice(0, pairsItems.length);
            pairsItems = pairsItems.slice(0, pairsItems.length);
            indicesItems = indicesItems.slice(0, pairsItems.length);
            pairsIndicesItems = pairsIndicesItems.slice(0, pairsItems.length);
            futuresItems = futuresItems.slice(0, pairsItems.length);
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

    .controller('AppCtrl', function AppCtrl($scope) {
        $scope.$on('$stateChangeSuccess', function (event, toState, toParams, fromState, fromParams) {
            if (angular.isDefined(toState.data.pageTitle)) {$scope.pageTitle = toState.data.pageTitle + ' | Market Observatory';}

            $scope.selectMenu = toState.data.selectMenu;
            $scope.selectSubmenu = toState.data.selectSubmenu;
            $scope.selectItemSubmenu = toState.data.selectItemSubmenu;
            $scope.actualMenu = '';
            $scope.actualSubmenu = '';

            $scope.$watch('actualSubmenu', function(){});
            $scope.$watch('selectSubmenu', function(){});
        });
    })

/**
 * Directive for public nav
 */
    .directive('publicMenu',function (){
        return {
            controller: function($scope, $state){
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
            link: function($scope) {
               $scope.$watch('actualSubmenu', function(){});
               $scope.$watch('selectSubmenu', function(){});
            },
            templateUrl:'layout_templates/publicMenuNotLogged.tpl.html'
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
            },
            templateUrl:'layout_templates/publicSubMenuNotLogged.tpl.html'
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
            controller: function($scope, ShoppingCartService) {
                $scope.numItemsCart = ShoppingCartService.obtainNumItemsCart();
                $scope.totalCart = ShoppingCartService.obtainTotalCart();
                $scope.showCart = false;
                $scope.subtotalStock = 0;
                $scope.subtotalPairs = 0;
                $scope.subtotalIndices = 0;
                $scope.subtotalPairsIndices = 0;
                $scope.subtotalFutures = 0;

                /**************
                 * TODO: remove this code
                 ***************/

                /*angular.forEach($scope.stockItems, function(item){
                    $scope.subtotalStock+= item.price;
                }) ;
                angular.forEach( $scope.pairsItems, function(item){
                    $scope.subtotalPairs+= item.price;
                });
                angular.forEach($scope.indicesItems,  function(item){
                    $scope.subtotalIndices+= item.price;
                });
                angular.forEach($scope.pairsIndicesItems, function(item){
                    $scope.subtotalPairsIndices+= item.price;
                });
                angular.forEach($scope.futuresItems, function(item){
                    $scope.subtotalFutures+= item.price;
                });*/
                /************/
                $scope.toggleCart = function () {
                   $scope.showCart = ShoppingCartService.changeShowCart();
                };
                $scope.removeItemCart =  function (productType,item){
                    ShoppingCartService.removeItemCart(productType, item);
                    $scope.numItemsCart = ShoppingCartService.obtainNumItemsCart();
                    $scope.subtotalStock -= item.price;
                    $scope.totalCart -= item.price;
                };
                $scope.addNewItemCart = function(item){
                    item =  {
                        "id": 25,
                        "packName": "Nuevo",
                        "startDate": "May 14",
                        "duration": "Mensual",
                        "price": 29
                    };
                    ShoppingCartService.addItemCart(item);
                    $scope.stockItems = ShoppingCartService.obtainCartItems('stocks');
                    $scope.pairsItems = ShoppingCartService.obtainCartItems('pairs');
                    $scope.indicesItems = ShoppingCartService.obtainCartItems('indices');
                    $scope.pairsIndicesItems = ShoppingCartService.obtainCartItems('pairsIndices');
                    $scope.futuresItems = ShoppingCartService.obtainCartItems('futures');
                    $scope.showCart = true;
                    $scope.totalCart = ShoppingCartService.obtainTotalCart();
                    $scope.numItemsCart = ShoppingCartService.obtainNumItemsCart();
                    $scope.subtotalStock =  ShoppingCartService.obtainSubtotal('stocks');
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
