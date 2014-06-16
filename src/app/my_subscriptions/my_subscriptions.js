/**
 * Created by laura on 6/06/14.
 */
angular.module('ngMo.my_subscriptions', [
    'ui.router'
])

    .config(function config($stateProvider) {
        $stateProvider.state('my-subscriptions', {
            url: '/my-subscriptions',
            views: {
                "main": {
                    controller: 'MySubscriptionsCtrl',
                    templateUrl: 'my_subscriptions/my_subscriptions.tpl.html'
                },
                "my-subscriptions-view@my-subscriptions": {
                    templateUrl: 'my_subscriptions/my-subscriptions-table.tpl.html'
                }
            },
            data: {
                pageTitle: 'My Subscriptions',
                selectMenu: 'my-subscriptions-nav',
                selectSubmenu: '',
                selectItemSubmenu: '',
                moMenuType: 'privateMenu',
                subPage: 'my-subscriptions'
            }
        })
            //substates of my-subscriptions
            .state('my-subscriptions.my-subscriptions', {
                url: '/my-subscriptions',
                views: {
                    "my-subscriptions-view": {
                        templateUrl: 'my_subscriptions/my-subscriptions-table.tpl.html'
                    }
                },
                data: {
                    subPage: 'my-subscriptions'
                }
            })
            .state('my-subscriptions.my-packs', {
                url: '/my-packs',
                views: {
                    "my-subscriptions-view": {
                        templateUrl: 'my_subscriptions/my-packs-table.tpl.html'
                    }
                },
                data: {
                    subPage: 'my-packs'
                }
            })



        ;
    })

    .run(function run() {
    })

    .service('MySubscriptionPacksService', function (){

        //Dummies Packs
        var americanPacks = [
            {
                id: 1,
                region: "Canada",
                market: "Toronto Stock",
                purchased: true,
                purchase: true,
                startDate: new Date(2014, 05, 01),
                duration: "Trimestral"
            },
            {
                id: 2,
                region: "Estados Unidos Pack I",
                market: "AMEX, NASDAQ",
                purchased: false,
                purchase: false,
                startDate: new Date(2014, 05, 01),
                duration: "Mensual"
            },
            {
                id: 3,
                region: "Estados Unidos Pack II",
                market: "AMEX, NASDAQ",
                purchased: false,
                purchase: false,
                startDate: new Date(2014, 05, 01),
                duration: "Anual"
            }
        ];

        var asiaPacks = [
            {
                id: 4,
                region: "Australia",
                market: "Australian SE, New Zealand SE",
                purchased: true,
                purchase: true,
                startDate: new Date(2014, 05, 01),
                duration: "Mensual"
            },
            {
                id: 5,
                region: "China",
                market: "Shanghai SE, Shenzhen SE",
                purchased: false,
                purchase: false,
                startDate: new Date(2014, 05, 01),
                duration: "Trimestral"
            },
            {
                id: 6,
                region: "Corea",
                market: "Korea SE, KOSDAQ",
                purchased: true,
                purchase: true,
                startDate: new Date(2014, 05, 01),
                duration: "Anual"
            },
            {
                id: 7,
                region: "Hong-Kong + Singapur",
                market: "Hong Kong SE, Singapore SE, Singapore Securities",
                purchased: false,
                purchase: false,
                startDate: new Date(2014, 05, 01),
                duration: "Mensual"
            }
        ];

        var europePacks = [
            {
                id: 8,
                region: "EURO Zona Pack I",
                market: "Alemania, Austria, Bélgica, España, Finlandia, Francia, Grecia, Irlanda, Italia, Luxemburgo, Países Bajos, Portugal",
                purchased: false,
                purchase: false,
                startDate: new Date(2014, 05, 01),
                duration: "Mensual"
            },
            {
                id: 9,
                region: "EURO Zona Pack II",
                market: "Alemania, Austria, Bélgica, España, Finlandia, Francia, Grecia, Irlanda, Italia, Luxemburgo, Países Bajos, Portugal",
                purchased: true,
                purchase: true,
                startDate: new Date(2014, 05, 01),
                duration: "Anual"
            },
            {
                id: 10,
                region: "EURO Zona Pack III",
                market: "Alemania, Austria, Bélgica, España, Finlandia, Francia, Grecia, Irlanda, Italia, Luxemburgo, Países Bajos, Portugal",
                purchased: false,
                purchase: false,
                startDate: new Date(2014, 05, 01),
                duration: "Anual"
            },
            {
                id: 11,
                region: "EURO Zona Pack IV",
                market: "Alemania, Austria, Bélgica, España, Finlandia, Francia, Grecia, Irlanda, Italia, Luxemburgo, Países Bajos, Portugal",
                purchased: false,
                purchase: false,
                startDate: new Date(2014, 05, 01),
                duration: "Trimestral"
            },
            {
                id: 12,
                region: "EURO Zona Pack V",
                market: "Alemania, Austria, Bélgica, España, Finlandia, Francia, Grecia, Irlanda, Italia, Luxemburgo, Países Bajos, Portugal",
                purchased: false,
                purchase: false,
                startDate: new Date(2014, 05, 01),
                duration: "Mensual"
            }
        ];

        var americanPairsPacks = [
            {
                id: 13,
                region: "Estados Unidos Pack I",
                market: "AMEX, NASDAQ, NYSE, Bulletin Board",
                purchased: false,
                purchase: false,
                startDate: new Date(2014, 05, 01),
                duration: "Mensual"
            },
            {
                id: 14,
                region: "Estados Unidos Pack II",
                market: "AMEX, NASDAQ, NYSE, Bulletin Board",
                purchased: true,
                purchase: true,
                startDate: new Date(2014, 05, 01),
                duration: "Mensual"
            },
            {
                id: 15,
                region: "Estados Unidos Pack III",
                market: "AMEX, NASDAQ, NYSE, Bulletin Board",
                purchased: true,
                purchase: true,
                startDate: new Date(2014, 05, 01),
                duration: "Mensual"
            }
        ];

        var asiaPairsPacks = [
            {
                id: 16,
                region: "Japón Pack I",
                market: "Fukuoka SE, Nagoya SE, Sapporo SE, Tokyo SE",
                purchased: false,
                purchase: false,
                startDate: new Date(2014, 05, 01),
                duration: "Anual"
            },
            {
                id: 17,
                region: "Japón Pack II",
                market: "Fukuoka SE, Nagoya SE, Sapporo SE, Tokyo SE",
                purchased: true,
                purchase: true,
                startDate: new Date(2014, 05, 01),
                duration: "Anual"
            },
            {
                id: 18,
                region: "Japón Pack III",
                market: "Fukuoka SE, Nagoya SE, Sapporo SE, Tokyo SE",
                purchased: false,
                purchase: false,
                startDate: new Date(2014, 05, 01),
                duration: "Trimestral"
            }
        ];

        var europePairsPacks = [
            {
                id: 19,
                region: "EURO Zona Pack I",
                market: "Alemania, Austria, Bélgica, España, Finlandia, Francia, Grecia, Irlanda, Italia, Luxemburgo, Países Bajos, Portugal",
                purchased: false,
                purchase: false,
                startDate: new Date(2014, 05, 01),
                duration: "Trimestral"
            },
            {
                id: 20,
                region: "EURO Zona Pack II",
                market: "Alemania, Austria, Bélgica, España, Finlandia, Francia, Grecia, Irlanda, Italia, Luxemburgo, Países Bajos, Portugal",
                purchased: false,
                purchase: false,
                startDate: new Date(2014, 05, 01),
                duration: "Mensual"
            },
            {
                id: 21,
                region: "EURO Zona Pack III",
                market: "Alemania, Austria, Bélgica, España, Finlandia, Francia, Grecia, Irlanda, Italia, Luxemburgo, Países Bajos, Portugal",
                purchased: false,
                purchase: false,
                startDate: new Date(2014, 05, 01),
                duration: "Anual"
            }
        ];

        var indicesPacks = [
            {
                id: 22,
                region: "Bolsa, Financieros, Materias Primas",
                market: "Global, Regional, Pais, Sectorial, Industrial. Tipos de Interés. Materias Primas",
                purchased: false,
                purchase: false,
                startDate: new Date(2014, 05, 01),
                duration: "Anual"
            }
        ];

        var pairs_indicesPacks = [
            {
                id: 23,
                region: "Bolsa",
                market: "Global, Regional, Pais, Sectorial, Industrial",
                purchased: true,
                purchase: true,
                startDate: new Date(2014, 05, 01),
                duration: "Trimestral"
            }
        ];

        var futuresPacks = [
            {
                id: 24,
                region: "Energía, Metales, Agrícolas, Carnes, Softs, Divisas, Tipos de Interés",
                market: "EUREX, Hong Kong Futures Exchanges, ICE Canada, ICE US, Korean Futures Exchange, Montreal Options Exchange, NYSE Euronext, Singapore Monetary Exchange, Sydney Futures Exchange, Chicago Board of Trade Futures, Chicago Board Options Exchange, Chicago Mercantile Exchange Futures, Kansas City Board of Trade Futures, Minneapolis Grain Exchange Futures, New York Mercantile Exchange Futures, ICE Europe",
                purchased: false,
                purchase: false,
                startDate: new Date(2014, 05, 01),
                duration: "Mensual"
            }
        ];
        //******

        this.obtainPacks = function (area) {
            switch (area){
                case 'america':
                    return americanPacks;
                case 'asia':
                    return asiaPacks;
                case 'europe':
                    return europePacks;
                case 'americaPairs':
                    return americanPairsPacks;
                case 'asiaPairs':
                    return asiaPairsPacks;
                case 'europePairs':
                    return europePairsPacks;
                case 'indices':
                    return indicesPacks;
                case 'pairs_indices':
                    return pairs_indicesPacks;
                case 'futures':
                    return futuresPacks;
            }
        };
    })

    .controller('MySubscriptionsCtrl', function ($scope, ActiveTabService, MySubscriptionPacksService, IsLogged) {
        $scope.$on('$stateChangeStart', function (event, toState){
            IsLogged.isLogged();
        });

        $scope.$on('$stateChangeSuccess', function (event, toState, toParams, fromState, fromParams) {
            if (angular.isDefined(toState.data.pageTitle)) {
                $scope.pageTitle = toState.data.pageTitle + ' | Market Observatory';
                $scope.subPage = toState.data.subPage;
            }
        });

        $scope.mySubscriptionsTablePacks = [
            {
                title: 'Acciones',
                active: ActiveTabService.activeTab() === 0,
                value: 0,
                americaContent: MySubscriptionPacksService.obtainPacks('america'),
                asiaContent: MySubscriptionPacksService.obtainPacks('asia'),
                europeContent: MySubscriptionPacksService.obtainPacks('europe'),
                url: 'my_subscriptions/tables_packs/stock_table.tpl.html'
            },
            {
                title: 'Pares',
                active: ActiveTabService.activeTab() === 1,
                value: 1,
                americaContent: MySubscriptionPacksService.obtainPacks('americaPairs'),
                asiaContent: MySubscriptionPacksService.obtainPacks('asiaPairs'),
                europeContent: MySubscriptionPacksService.obtainPacks('europePairs'),
                url: 'my_subscriptions/tables_packs/pairs_table.tpl.html'
            },
            {
                title: 'Indices',
                active: ActiveTabService.activeTab() === 2,
                value: 2,
                indicesContent: MySubscriptionPacksService.obtainPacks('indices'),
                pairsIndicesContent: MySubscriptionPacksService.obtainPacks('pairs_indices'),
                url: 'my_subscriptions/tables_packs/indices_table.tpl.html'
            },
            {
                title: 'Futuros',
                active: ActiveTabService.activeTab() === 3,
                value: 3,
                futuresContent: MySubscriptionPacksService.obtainPacks('futures'),
                url: 'my_subscriptions/tables_packs/futures_table.tpl.html'
            }
        ];

    })

;