/**
 * Created by robgon on 04/08/14.
 */

angular.module('ngMo.payment', [  'ui.router'])

    .config(function config($stateProvider) {
        /*State for first signup step*/
        $stateProvider.state('confirm-pay', {
            url: '/confirm-pay?token&PayerID',
            views: {
                "main": {

                    controller: 'ConfirmPaymentCtrl',
                    templateUrl: 'payment/confirm-pay.tpl.html'
                }
            },
            data: {
                /* empty the menu data*/
                pageTitle: '',
                selectMenu: '',
                selectSubmenu: '',
                selectItemSubmenu: '',
                moMenuType: 'publicMenu'

            }})
            //State for previous step to pay
            .state('summary-pay', {
                url: '/summary-pay',
                views: {
                    "main": {

                        controller: 'SummaryPayCtrl',
                        templateUrl: 'payment/summary-pay.tpl.html'
                    }
                },
                data: {
                    /* empty the menu data*/
                    pageTitle: '',
                    selectMenu: '',
                    selectSubmenu: '',
                    selectItemSubmenu: '',
                    moMenuType: 'publicMenu'

                }});
    })
    .run(function run() {
    })

    .controller('ConfirmPaymentCtrl', function ($scope, $state, IsLogged, $rootScope, $window, $http,$stateParams) {
        $scope.$on('$stateChangeStart', function (event, toState) {
            IsLogged.isLogged();
        });
        $scope.$on('$stateChangeSuccess', function (event, toState, toParams, fromState, fromParams) {
            if (angular.isDefined(toState.data.pageTitle)) {
                $scope.pageTitle = toState.data.pageTitle + ' | Market Observatory';
            }
        });

        if ($stateParams.token != null && $stateParams.PayerID != null) {
            /*
            this State is loaded when paypal redirects the payment to our server, so
            paypal do the payment and redirecto to ourweb/confirm-pay?token=xxxx&PayerId=xxx
            and we load the params to send to the /confirmPay action.
            in last case, the paypal payment also loads the price from server and the user will
            see the prices of the packs when he is going to pay
            */
            token = $window.sessionStorage.token;
            config = {
                headers: {
                    'X-Session-Token': token
                },
                data: {token: $stateParams.token,
                        payerId: $stateParams.payerId
                }
            };
            //status of the payment returned by server
            $scope.status = "NONE";
            $http.post($rootScope.urlService+"/confirm-pay",config).then( function(data) {
                if (data.data.status === "OK") {
                    $scope.status = "OK";
                } else {
                    $scope.status = "ERROR";
                }
            });
        }

        $scope.goToPatterns = function() {
            $state.go('my-patterns');
        };
    })
//controller of summary-pay

    .controller('SummaryPayCtrl', function ($scope, $state, IsLogged, $rootScope, $window, $http, PaymentService,MonthSelectorService) {
        $scope.$on('$stateChangeStart', function (event, toState) {
            IsLogged.isLogged();
        });
        $scope.$on('$stateChangeSuccess', function (event, toState, toParams, fromState, fromParams) {
            if (angular.isDefined(toState.data.pageTitle)) {
                $scope.pageTitle = toState.data.pageTitle + ' | Market Observatory';
            }
        });
        $scope.taxPercent=0;
        //packs
        //a pack must have:
        /*
         Region
         StartDate
         EndDate
         Duration
         Price
         */
        $scope.stocks = [];
        $scope.pairs=[];
        $scope.index=[];
        $scope.pairIndex=[];
        $scope.futures=[];
        //totals and taxes
        $scope.totalStocks=0;
        $scope.taxStock=0;
        $scope.totalPairs=0;
        $scope.taxPairs=0;
        $scope.totalIndex=0;
        $scope.taxIndex=0;
        $scope.totalPairsIndex=0;
        $scope.taxPairsIndex=0;
        $scope.totalFutures=0;
        $scope.taxFutures=0;
        //total
        $scope.total=0;
        $scope.totalTaxes=0;


        //payment Selector
        $scope.paymentType = "EXPRESSCHECKOUT";
        $scope.conditions= false;
        $scope.errorConditions= false;


        //load the info from server with all the fields of the summary
        $scope.loadPayment = function () {
            PaymentService.getPayments(function (data) {

                $scope.stocks = data.stocks;
                $scope.totalStocks = data.total_stocks;
                $scope.pairs = data.pairs;
                $scope.totalPairs = data.total_pairs;
                $scope.index= data.index;
                $scope.totalIndex= data.total_index;
                $scope.pairsIndex= data.indexPairs;
                $scope.totalPairsIndex= data.total_indexPairs;
                $scope.futures=data.futures;
                $scope.totalFutures=data.total_futures;
                $scope.total=data.total;
            });
        };

        //date must be a object with fields: month: M and year: YYYY, return the string with monthName YYYY
        $scope.getMonthShortName = function(date) {
            month = MonthSelectorService.getMonthName(date);
            month = month.substring(0,3); //format MMM YYYY
            return month+" "+date.year;
        };

        //transform 0,1,2 to legible names of durations
        $scope.translateDuration = function(id) {
            return PaymentService.getDurationFromId(id);
        };

        //start the payment
        $scope.doPayment = function() {
            //the terms and conditions must be accepted by user
            if ($scope.conditions) {
                $scope.errorConditions= false;
                $rootScope.$broadcast('submitCart', $scope.paymentType);
            } else{
                $scope.errorConditions= true;
            }

        };

        //first load of the summary
        $scope.loadPayment();


    })
    .factory('PaymentService', function ($http,$rootScope,$window,ShoppingCartService ) {
        var actualDate = {};
        var typesShopService= ["stocks","pairs","indices","pairIndices","futures"];//types in shoppingCartService
        var typesPayService = ["stocks","pairs","index","pairIndex","futures"];
        return {
            /**
             * getPayments get the summary of the pay with the data sent to the server
             * is just for check the summary
             * @param packs, sends the pack objects to the server, the packs object must be like:
             * {
             *      stocks: [Pack],
             *      pairs: [Pack],
             *      index:[Pack],
             *      indexPairs:[Pack],
             *      futures:[Pack]
             *
             *      where Pack is: {
             *          code: code of the pack
             *          startDate: date of the start
             *          duration: the duration of the subscription to this pack
             *      }
             *

             *
             * }
             * @param callback the callback function
             *
             * the data returned by getPayment is a Json Object like:
             *   stocks: [Pack],
             *      pairs: [Pack],
             *      index:[Pack],
             *      indexPairs:[Pack],
             *      futures:[Pack]
             *      where Pack contains:
             *      name: pack
             *      code: codePack
             *      startDate: {month:M, year: YYYY}
             *      endDate: {month:M, year: YYYY}
             *      duration: 0,1,2...(month,3months or year)
             *      price: the price
             *      total_stocks: X
             *      total_pairs: X
             *      total_index: X
             *      total_pairs: X
             *      total_pairsIndex: X
             *      total_futures: X
             *      total: Z
             *      X is a double with the subtotals
             *      Z is the total. the taxes needs to be implemented
             */
            getPayments: function ( callback) {

                packs = {
                    stocks: [],
                    pairs:[],
                    index:[],
                    pairIndex:[],
                    futures:[]
                };
                 //get Payments load from service of cart the items to send them to the server
                //server calculates the price and load the packs (is a check..) and return the correct data for the summary
                packsCart= [
                    ShoppingCartService.obtainCartItems('stocks'),
                    ShoppingCartService.obtainCartItems('pairs'),
                    ShoppingCartService.obtainCartItems('indices'),
                    ShoppingCartService.obtainCartItems('pairsIndices'),
                    ShoppingCartService.obtainCartItems('futures')
                ];
                listToSend=[];//the list to send to server
                //create the specific json item for each list
                for (j=0; j<packsCart.length;j++) {
                    sublist = packsCart[j];
                    newList = [];
                    for (i = 0; i < sublist.length; i++) {
                        actualItem = sublist[i];
                            startDate = actualItem.date.split("/");
                        startDate = startDate[1] + "_" + startDate[2];
                        //the startDate is sent in format M_YYYY
                        //the duration is 0,1,2 (month,3months or year)
                        duration = 0;
                        switch (actualItem.duration) {
                            case "Mensual":
                                duration = 0;
                                break;
                            case "Trimestral":
                                duration = 1;
                                break;
                            case "Anual":
                                duration = 2;
                                break;
                        }

                        item = {
                                startDate: startDate,
                                code: actualItem.code,
                                duration: duration
                            };
                        newList.push(item);

                        }
                    listToSend.push(newList); //the final structure is [[it1,it2,it3],[it1,it2,it3]]... the order is
                                            //stocks,pairs,index,pairIndex,futures
                    }
                    //concatenate all the lists to send

                    packs.stocks= listToSend[0];
                    packs.pairs= listToSend[1];
                    packs.index= listToSend[2];
                    packs.pairIndex= listToSend[3];
                    packs.futures= listToSend[4];



                token = $window.sessionStorage.token;
                config = {
                    headers: {
                        'X-Session-Token': token
                    },
                    data: packs
                };
                $http.post($rootScope.urlService+"/summary-pay",config)
                    .success(callback)
                    .error(callback);
            },
            /*
            translate 0,1,2 positions in the enum of the server to String with the text of the duration...
             */
            getDurationFromId: function(id) {
                durations = ["Mensual","trimestral","Anual"];
                return durations[id];
            }
        };
    });





