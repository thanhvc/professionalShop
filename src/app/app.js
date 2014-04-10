angular.module('ngMo', [
        'templates-app',
        'templates-common',
        'ngMo.home',
        'ngMo.about',
        'ui.state',
        'ui.route',
        'pascalprecht.translate'
    ])

    .config(function myAppConfig($stateProvider, $urlRouterProvider, $locationProvider) {
        $urlRouterProvider.otherwise('/home');
        //  $locationProvider.html5Mode(true);
    })

    .config(['$translateProvider', function ($translateProvider) {
        $translateProvider.useStaticFilesLoader({
            prefix: 'src/i18n/lang-',
            suffix: '.json'
        });
        $translateProvider.preferredLanguage('es');


    }])

    .run(function run() {
    })

    .controller('AppCtrl', function AppCtrl($scope, $location) {
        $scope.$on('$stateChangeSuccess', function (event, toState, toParams, fromState, fromParams) {
            if (angular.isDefined(toState.data.pageTitle)) {
                $scope.pageTitle = toState.data.pageTitle + ' | Market Observatory';
            }
        });
    })

;

