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
    .controller('AppCtrl', function AppCtrl($scope, $rootScope) {
        $scope.$on('$stateChangeSuccess', function (event, toState, toParams, fromState, fromParams) {
            if (angular.isDefined(toState.data.pageTitle)) {$scope.pageTitle = toState.data.pageTitle + ' | Market Observatory';}
            $scope.initiation = function (idMenu, idSubmenu, idItemSubmenu){
                $rootScope.actualMenu = $rootScope.selectMenu = idMenu;
                $rootScope.actualSubmenu = $rootScope.selectSubmenu = idSubmenu;
                $rootScope.actualItemSubmenu = $rootScope.selectItemSubmenu = idItemSubmenu;
            };
        });
    })

/**
 * Directive for public nav
 */
    .directive('publicMenu',function (){
        return {
            controller: function($scope, $rootScope){
                $scope.onMouseEnterMenu = function(idMenu, idSubmenu) {
                    $rootScope.actualMenu = idMenu;
                    $rootScope.actualSubmenu = idSubmenu;
                };
                $scope.onMouseLeaveMenu = function() {
                    if ($rootScope.selectMenu !== '' && $rootScope.actualMenu !== $rootScope.selectMenu) {
                        $rootScope.actualMenu = $rootScope.selectMenu;
                        $rootScope.actualSubmenu = $rootScope.selectSubmenu;
                        $rootScope.actualItemSubmenu = $rootScope.selectItemSubmenu;
                    }
                };
            },
            link: function($rootScope) {
               $rootScope.$watch('actualSubmenu', function(){});

            },
            templateUrl:'layout_templates/publicMenuNotLogged.tpl.html'
        };
    })
    .directive('publicSubMenu',function (){
        return {
            controller: function($scope, $rootScope){
                $scope.onMouseEnterSubmenu = function(idMenu, idSubmenu, idItemSubmenu) {
                    $rootScope.actualMenu = idMenu;
                    $rootScope.actualSubmenu = idSubmenu;
                    $rootScope.actualItemSubmenu = idItemSubmenu;
                };
                $scope.onMouseLeaveSubmenu = function () {
                    $rootScope.actualItemSubmenu = '';
                    if ($rootScope.selectMenu !== '' && $rootScope.actualMenu !== $rootScope.selectMenu) {
                        $rootScope.actualMenu = $rootScope.selectMenu;
                        $rootScope.actualSubmenu = $rootScope.selectSubmenu;
                        $rootScope.actualItemSubmenu = $rootScope.selectItemSubmenu;
                    }
                };
                $scope.onClickSubmenu = function () {
                    $rootScope.selectMenu = $rootScope.actualMenu;
                    $rootScope.selectSubmenu = $rootScope.actualSubmenu;
                    $rootScope.selectItemSubmenu = $rootScope.actualItemSubmenu;
                };
            },
            link: function($scope, $rootScope) {
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
;
