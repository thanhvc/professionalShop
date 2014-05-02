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
            data: { pageTitle: 'Home' }
        });


    })


    .run(function run() {
    })

    .controller('AppCtrl', function AppCtrl($scope) {
        $scope.$on('$stateChangeSuccess', function (event, toState, toParams, fromState, fromParams) {
            if (angular.isDefined(toState.data.pageTitle)) {$scope.pageTitle = toState.data.pageTitle + ' | Market Observatory';}
        });
    })

/**
 * Directive for public nav
 */
    .directive('publicMenu',function (){
        return {
            //transclude: false,
            controller: function($scope){
                $scope.onMouseEnterMenu = function(idMenu, idSubmenu) {
                    $scope.actualMenu = idMenu;
                    $scope.actualSubmenu = idSubmenu;
                };
                $scope.onMouseLeaveMenu = function() {
                    if ($scope.selectMenu !== '' && $scope.actualMenu !== $scope.selectMenu) {
                        $scope.actualMenu = $scope.selectMenu;
                        $scope.actualSubmenu = $scope.selectSubmenu;
                        $scope.actualItemSubmenu = $scope.selectItemSubmenu;
                    }
                };
            },
            link: function($scope) {
                $scope.$watch('actualSubmenu', function() {});
            },
            templateUrl:'layout_templates/publicMenuNotLogged.tpl.html'
        };
    })
    .directive('publicSubMenu',function (){
        return {
            controller: function($scope){
                $scope.onMouseEnterSubmenu = function(idMenu, idSubmenu, idItemSubmenu) {
                    $scope.actualMenu = idMenu;
                    $scope.actualSubmenu = idSubmenu;
                    $scope.actualItemSubmenu = idItemSubmenu;
                };
                $scope.onMouseLeaveSubmenu = function () {
                    $scope.actualItemSubmenu = '';
                    if ($scope.selectMenu !== '' && $scope.actualMenu !== $scope.selectMenu) {
                        $scope.actualMenu = $scope.selectMenu;
                        $scope.actualSubmenu = $scope.selectSubmenu;
                        $scope.actualItemSubmenu = $scope.selectItemSubmenu;
                    }
                };
                $scope.onClickSubmenu = function () {
                    $scope.selectMenu = $scope.actualMenu;
                    $scope.selectSubmenu = $scope.actualSubmenu;
                    $scope.selectItemSubmenu = $scope.actualItemSubmenu;
                };
            },
            link: function($scope) {
            },
            templateUrl:'layout_templates/publicSubMenuNotLogged.tpl.html'
        };
    })
;
