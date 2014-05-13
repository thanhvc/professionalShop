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
    .service('ShoppingCartService', function (){

        var stockItems =  [
            {
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
            }
        ];

        var pairsItems  =  [
            {
                "id": 13,
                "packName": "Estados Unidos Pack I",
                "startDate": "May 14",
                "duration": "Anual",
                "price": 313
            }
        ];

        var indicesItems = [
            {
                "id": 22,
                "packName": "Indices Pack I",
                "startDate": "May 14",
                "duration": "Anual",
                "price": 313
            }
        ];

        var pairsIndicesItems = [
            {
                "id": 23,
                "packName": "Pares Indices Pack I",
                "startDate": "May 14",
                "duration": "Anual",
                "price": 313
            }
        ] ;
        var futuresItems =  [
            {
                "id": 24,
                "packName": "Futures Pack I",
                "startDate": "May 14",
                "duration": "Mensual",
                "price": 29
            }
        ];

        var numItemsCart = 6;
        var totalCart = 1079;

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

        this.addItemCart = function () {
           var itemr =  {
                "id": 25,
                "packName": "Nuevo",
                "startDate": "May 14",
                "duration": "Mensual",
                "price": 29
            };
            stockItems.push(itemr);
            numItemsCart++;
            totalCart+=itemr.price;
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
                $scope.stockItems = ShoppingCartService.obtainCartItems('stocks');
                $scope.pairsItems = ShoppingCartService.obtainCartItems('pairs');
                $scope.indicesItems = ShoppingCartService.obtainCartItems('indices');
                $scope.pairsIndicesItems = ShoppingCartService.obtainCartItems('pairsIndices');
                $scope.futuresItems = ShoppingCartService.obtainCartItems('futures');
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

                angular.forEach($scope.stockItems, function(item){
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
                });
                /************/
                $scope.toggleCart = function () {
                    if ($scope.showCart === false) {
                        $scope.showCart = true;
                    }else{
                        $scope.showCart = false;
                    }
                };
                $scope.removeItemCart =  function (productType,item){
                    ShoppingCartService.removeItemCart(productType, item);
                    $scope.numItemsCart = ShoppingCartService.obtainNumItemsCart();
                    $scope.subtotalStock -= item.price;
                    $scope.totalCart -= item.price;
                };
                $scope.addItemCart = function (){
                    ShoppingCartService.addItemCart();
                    $scope.numItemsCart = ShoppingCartService.obtainNumItemsCart();
                    /*$scope.subtotalStock += item.price;
                    $scope.totalCart += item.price;*/
                };
            },
            link: function ($scope) {
                $scope.$watch('showCart', function(){});
                $scope.$watch('numItemsCart', function(){});
                $scope.$watch('totalCart', function(){});
                $scope.$watch('subtotalStock', function(){});
            },
            templateUrl: 'layout_templates/cart.tpl.html'
        };
    })
;
