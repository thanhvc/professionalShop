angular.module('ngMo.calendar', [
    'ui.router'
])

    .config(function config($stateProvider) {
        $stateProvider.state('calendar', {
            url: '/calendar',
            views: {
                "main": {
                    controller: 'CalendarCtrl',
                    templateUrl: 'calendar/calendar.tpl.html'
                }
            },
            data: {
                pageTitle: 'Calendar',
                selectMenu: 'calendar-nav',
                selectSubmenu: '',
                selectItemSubmenu: '',
                moMenuType: 'privateMenu'
            }
        });
    })

    .run(function run() {
    })

    .controller('CalendarCtrl', function ($scope) {
        $scope.$on('$stateChangeSuccess', function (event, toState, toParams, fromState, fromParams) {
            if (angular.isDefined(toState.data.pageTitle)) {
                $scope.pageTitle = toState.data.pageTitle + ' | Market Observatory';
            }
        });
    });