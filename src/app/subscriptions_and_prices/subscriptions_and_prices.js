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
            data: { pageTitle: 'Precios' }
        })
        .state('products', {
            url: '/products',
            views: {
                "main": {
                    controller: 'Subscriptions_And_PricesCtrl',
                    templateUrl: 'subscriptions_and_prices/products/products.tpl.html'
                }
            },
            data: { pageTitle: 'Productos y Mercados' }
        })
        .state('subscriptions_types', {
            url: '/subscriptions_types',
            views: {
                "main": {
                    controller: 'Subscriptions_And_PricesCtrl',
                    templateUrl: 'subscriptions_and_prices/subscriptions_types/subscriptions_types.tpl.html'
                }
            },
            data: { pageTitle: 'Tipos Suscripcion' }
        })
        .state('buy', {
            url: '/buy',
            views: {
                "main": {
                    controller: 'Subscriptions_And_PricesCtrl',
                    templateUrl: 'subscriptions_and_prices/buy/buy.tpl.html'
                }
            },
            data: { pageTitle: 'Comprar' }
        })
        .state('free_subscription', {
            url: '/free_subscription',
            views: {
                "main": {
                    controller: 'Subscriptions_And_PricesCtrl',
                    templateUrl: 'subscriptions_and_prices/free_subscription/free_subscription.tpl.html'
                }
            },
            data: { pageTitle: 'Suscripcion Gratis 15 dias' }
        })
        .state('shopping_guide', {
            url: '/shopping_guide',
            views: {
                "main": {
                    controller: 'Subscriptions_And_PricesCtrl',
                    templateUrl: 'subscriptions_and_prices/shopping_guide/shopping_guide.tpl.html'
                }
            },
            data: { pageTitle: 'Guia Compras' }
        });

    })

    .run(function run() {
    })

    .controller('Subscriptions_And_PricesCtrl', function Subscriptions_And_PricesCtrl($scope) {
        $scope.$on('$stateChangeSuccess', function (event, toState, toParams, fromState, fromParams) {
            if (angular.isDefined(toState.data.pageTitle)) {$scope.pageTitle = toState.data.pageTitle + ' | Market Observatory';}
        });
    }) ;