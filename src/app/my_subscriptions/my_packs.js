angular.module('ngMo.my_packs', [
    'ui.router'
])

    .config(function config($stateProvider) {
        $stateProvider.state('my-packs', {
            url: '/my-packs',
            views: {
                "main": {
                    controller: 'MyPacksController',
                    templateUrl: 'my_packs/my_packs.tpl.html'
                },
                "my-packs-view@my-packs": {
                    templateUrl: 'my_packs/my-packs-table.tpl.html'
                }
            }

        })
        ;
    })

    .run(function run() {
    })

    .controller('MyPacksCtrl', function ($scope) {
        $scope.$on('$stateChangeSuccess', function (event, toState, toParams, fromState, fromParams) {
            if (angular.isDefined(toState.data.pageTitle)) {
                $scope.pageTitle = toState.data.pageTitle + ' | Market Observatory';
            }
            $scope.myData = [{'pack': 'Australia + Nueva Zelanda Pack I'},
                {'pack':'Canada Pack I'},
                {'pack':'China Pack I'},
                {'pack':'Corea Pack I'},
                {'pack':'Estados Unidos Pack I'},
                {'pack':'Estados Unidos Pack II'},
                {'pack':'Estados Unidos Pack III'},
                {'pack':'Estados Unidos Pack IV'},
                {'pack':'Estados Unidos Pack V'},
                {'pack':'Estados Unidos Pack VI'},
                {'pack':'EURO Zona Pack I'},
                {'pack':'EURO Zona Pack II'},
                {'pack':'EURO Zona Pack III'},
                {'pack':'EURO Zona Pack IV'},
                {'pack':'Hong-Kong + Singapur Pack I'},
                {'pack':'India + Paquistán + Sri-Lanka Pack I'},
                {'pack':'India + Paquistán + Sri-Lanka Pack II'},
                {'pack':'India + Paquistán + Sri-Lanka Pack III'},
                {'pack':'Japón Pack I'},
                {'pack':'Japón Pack II'},
                {'pack':'Japón Pack III'},
                {'pack':'Japón Pack IV'},
                {'pack':'Japón Pack V'},
                {'pack':'Japón Pack VI'},
                {'pack':'Latino América Pack I'},
                {'pack':'Nórdicos Pack I'},
                {'pack':'Oriente Medio + Magreb Pack I'},
                {'pack':'Reino Unido Pack I'},
                {'pack':'Sudeste Asiático Pack I'},
                {'pack':'Sudeste Asiático Pack II'},
                {'pack':'Sudáfrica Pack I'},
                {'pack':'Suiza + Europa del Este + Rusia Pack I'},
                {'pack':'Taiwan Pack I'}
            ];
        });

    })

;