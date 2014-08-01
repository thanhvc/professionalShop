angular.module('ngMo.portfolio', [
    'ui.router'
])

    .config(function config($stateProvider) {
        $stateProvider.state('portfolio', {
            url: '/portfolio',
            views: {
                "main": {
                    controller: 'PortfolioCtrl',
                    templateUrl: 'tools/portfolio/portfolio.tpl.html'
                }
            },
            data: {
                pageTitle: 'Portfolio',
                selectMenu: 'tools-nav',
                selectSubmenu: 'submenu1',
                selectItemSubmenu: 'portfolio-nav',
                moMenuType: 'privateMenu'
            }
        });
    })

    .run(function run() {
    })

    .controller('PortfolioCtrl', function ($scope) {
        $scope.$on('$stateChangeSuccess', function (event, toState, toParams, fromState, fromParams) {
            if (angular.isDefined(toState.data.pageTitle)) {
                $scope.pageTitle = toState.data.pageTitle + ' | Market Observatory';
            }
        });


    $scope.clearAllPortfolioLists = function () {
        $window.sessionStorage.removeItem("portfolioStocks");
        $window.sessionStorage.removeItem("portfolioStockPairs");
        $window.sessionStorage.removeItem("portfolioIndices");
        $window.sessionStorage.removeItem("portfolioIndicePairs");
        $window.sessionStorage.removeItem("portfolioFutures");
    };
});
