/**
 * Created by laura on 29/04/14.
 */
angular.module('ngMo.subscriptions_and_prices', [
    'ui.router'
])

    .config(function config($stateProvider) {
        $stateProvider.state('prices', {
            url: '/prices',
            views: {
                "main": {
                    controller: 'Subscriptions_And_PricesCtrl',
                    templateUrl: 'subscriptions_and_prices/prices/prices.tpl.html'
                }
            },
            data: {
                pageTitle: 'Precios',
                selectMenu: 'subscriptions-and-prices-nav',
                selectSubmenu: 'submenu4',
                selectItemSubmenu: 'prices-nav',
                moMenuType: 'publicMenu'
            }
        })
        .state('products', {
            url: '/products',
            views: {
                "main": {
                    controller: 'Subscriptions_And_PricesCtrl',
                    templateUrl: 'subscriptions_and_prices/products/products.tpl.html'
                }
            },
            data: {
                pageTitle: 'Productos y Mercados',
                selectMenu: 'subscriptions-and-prices-nav',
                selectSubmenu: 'submenu4',
                selectItemSubmenu: 'products-nav',
                moMenuType: 'publicMenu'
            }
        })
        .state('subscription_types', {
            url: '/subscription_types',
            views: {
                "main": {
                    controller: 'Subscriptions_And_PricesCtrl',
                    templateUrl: 'subscriptions_and_prices/subscription_types/subscription_types.tpl.html'
                }
            },
            data: {
                pageTitle: 'Tipos Suscripcion',
                selectMenu: 'subscriptions-and-prices-nav',
                selectSubmenu: 'submenu4',
                selectItemSubmenu: 'subscription-types-nav',
                moMenuType: 'publicMenu'
            }
        })
        .state('purchase', {
            url: '/purchase',
            views: {
                "main": {
                    controller: 'Subscriptions_And_PricesCtrl',
                    templateUrl: 'subscriptions_and_prices/purchase/purchase.tpl.html'
                }
            },
            data: {
                pageTitle: 'Comprar',
                selectMenu: 'subscriptions-and-prices-nav',
                selectSubmenu: 'submenu4',
                selectItemSubmenu: 'purchase-nav',
                moMenuType: 'publicMenu'
            }
        })
        .state('free_subscription', {
            url: '/free_subscription',
            views: {
                "main": {
                    controller: 'Subscriptions_And_PricesCtrl',
                    templateUrl: 'subscriptions_and_prices/free_subscription/free_subscription.tpl.html'
                }
            },
            data: {
                pageTitle: 'Suscripcion Gratis 15 dias',
                selectMenu: 'subscriptions-and-prices-nav',
                selectSubmenu: 'submenu4',
                selectItemSubmenu: 'free-subscription-nav',
                moMenuType: 'publicMenu'
            }
        })
        .state('shopping_guide', {
            url: '/shopping_guide',
            views: {
                "main": {
                    controller: 'Subscriptions_And_PricesCtrl',
                    templateUrl: 'subscriptions_and_prices/shopping_guide/shopping_guide.tpl.html'
                }
            },
            data: {
                pageTitle: 'Guia Compras',
                selectMenu: 'subscriptions-and-prices-nav',
                selectSubmenu: 'submenu4',
                selectItemSubmenu: 'shopping-guide-nav',
                moMenuType: 'publicMenu'
            }
        });

    })

    .run(function run() {
    })

    .controller('Subscriptions_And_PricesCtrl', function Subscriptions_And_PricesCtrl($scope, IsLogged) {
        $scope.$on('$stateChangeSuccess', function (event, toState, toParams, fromState, fromParams) {
            if (angular.isDefined(toState.data.pageTitle)) {$scope.pageTitle = toState.data.pageTitle + ' | Market Observatory';}
        });
    }) ;