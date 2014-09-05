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
            .state('confirm-pay-card', {
                url: '/confirm-pay-card',
                views: {
                    "main": {

                        controller: 'ConfirmPaymentCardCtrl',
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

                }})
            .state('pay-card', {
                url: '/pay-card',
                views: {
                    "main": {

                        controller: 'CreditPayCtrl',
                        templateUrl: 'payment/summary-card.tpl.html'
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

    //confirm Card this status only is when the cpayment is OK, so always shows OK
    .controller('ConfirmPaymentCardCtrl', function ($scope, $state) {
        $scope.status = "OK";
        $scope.$on('$stateChangeStart', function (event, toState) {
            IsLogged.isLogged();
        });
        $scope.$on('$stateChangeSuccess', function (event, toState, toParams, fromState, fromParams) {
            if (angular.isDefined(toState.data.pageTitle)) {
                $scope.pageTitle = toState.data.pageTitle + ' | Market Observatory';
            }
        });
    })
    //confirm with expressCheckout
    .controller('ConfirmPaymentCtrl', function ($scope, $state, IsLogged, $rootScope, $window, $http,$stateParams) {
        $scope.status = "NONE";
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
                        payerId: $stateParams.PayerID
                }
            };
            //status of the payment returned by server
            $scope.status = "NONE";
            $http.post($rootScope.urlService+"/confirm-pay",config).success( function(data) {
                if (data.status === "OK") {
                    $scope.status = "OK";
                    $rootScope.$broadcast('removeItemsCart');
                } else {
                    $scope.status = "ERROR";
                }
            }).error(function(data) {
                        $scope.status = "ERROR";
            });
        } else {
            $scope.status = "ERROR";
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
        $scope.doingPayment = false; // to lock the payment button
        $scope.errorPaypal = false;
        $scope.$on('errorPaypal', function() {
           $scope.errorPaypal = true;
            $scope.doingPayment = false;
        });
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
        $scope.totalpairIndex=0;
        $scope.taxpairIndex=0;
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
            PaymentService.getPayments(true,function (data) {

                $scope.stocks = data.stocks;
                $scope.totalStocks = data.total_stocks;
                $scope.pairs = data.pairs;
                $scope.totalPairs = data.total_pairs;
                $scope.index= data.index;
                $scope.totalIndex= data.total_index;
                $scope.pairIndex= data.pairIndex;
                $scope.totalpairIndex= data.total_pairIndex;
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


        //cancel the pay and cart
        $scope.cancelPay = function()  {
            $rootScope.$broadcast('removeItemsCart');
            $state.go('home');
        };
        //start the payment
        $scope.doPayment = function() {
            //the terms and conditions must be accepted by user
            if ($scope.conditions) {
                $scope.errorConditions= false;
                $scope.errorPaypal = false;
                $scope.doingPayment = true;
                 $rootScope.$broadcast('submitCart', $scope.paymentType);

            } else{
                $scope.errorConditions= true;
            }

        };

        //first load of the summary
        $scope.loadPayment();


    })
    .controller('CreditPayCtrl',function($scope, $state, IsLogged, $rootScope, $window, $http, PaymentService,MonthSelectorService, ProfileService,SignUpService){
        $scope.formSubmited = false;
        $scope.$on('$stateChangeStart', function (event, toState) {
            IsLogged.isLogged();
        });
        $scope.$on('$stateChangeSuccess', function (event, toState, toParams, fromState, fromParams) {
            if (angular.isDefined(toState.data.pageTitle)) {
                $scope.pageTitle = toState.data.pageTitle + ' | Market Observatory';
            }
        });

        $scope.status="NONE";

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
        $scope.totalpairIndex=0;
        $scope.taxpairIndex=0;
        $scope.totalFutures=0;
        $scope.taxFutures=0;
        //total
        $scope.total=0;
        $scope.totalTaxes=0;
        $scope.items = [];

        //user data
        $scope.user =  {
            name: "",
            surname: "",
            address: "",
            city: "",
            postalCode: "",
            country: "",
            state: ""
        };
        $scope.countries= [];


        $scope.creditCards = [
            {
                code: "VISA",
                name: "Visa"
            },
            {
                code: "MASTERCARD",
                name: "MasterCard"
            },
            {
                code: "DISCOVER",
                name: "Discover"
            },
            {
                code: "AMERICANEXPRESS",
                name: "Amex"
            },
            {
                code: "MAESTRO",
                name: "Maestro"
            }
        ];
        $scope.selectedCard= $scope.creditCards[0];
        $scope.months = [{
            id:1,
            description:"01"
        },
            {
                id:2,
                description:"02"
            },
            {
                id:3,
                description:"03"
            },{
                id:4,
                description:"04"
            },{
                id:5,
                description:"05"
            },{
                id:6,
                description:"06"
            },{
                id:7,
                description:"07"
            },{
                id:8,
                description:"08"
            },{
                id:9,
                description:"09"
            },{
                id:10,
                description:"10"
            },{
                id:11,
                description:"11"
            },
            {
                id:12,
                description:"12"
            }];
        $scope.nextYears = [];
        $scope.previousYears = [];//for maestro card
            //fill 20 years in the selector
        var date = new Date();
        var nextYear = date.getFullYear();
        var previousYear = date.getFullYear();
        for (var i = 0; i<20; i++) {
            $scope.nextYears.push(nextYear);
            $scope.previousYears.push(previousYear);
            nextYear++;
            previousYear--;
        }
        $scope.expirationMonth = $scope.months[0];
        $scope.startMonth = $scope.months[0];
        $scope.expirationYear= $scope.nextYears[0];
        $scope.startYear = $scope.previousYears[0];
        $scope.number= "";
        $scope.cvv="";
        $scope.issue="";//only for maestro
        $scope.editData= false;//if change userdata..
        //lload user data for the bill
        $scope.loadUser = function () {
            ProfileService.loadUser(function (data, status) {
                if (status === 200) {
                    $scope.user = data;
                    $scope.user.state = "";//the state is not in the DB
                    $scope.internalError = false;
                } else {
                    $scope.internalError = true;
                    $scope.restartUser();
                }

            });
        };

        $scope.maestro= function(){
            console.log("a");
        };

        SignUpService.getCountries(function(data) {
            if (data.length>0) {
                $scope.countries = data;
            }
        });


        //load the summary of payment, is the same call to SUMMARY
        $scope.loadSummary = function(){
            PaymentService.getPayments(false,function (data) {

                $scope.stocks = data.stocks;
                $scope.totalStocks = data.total_stocks;
                $scope.pairs = data.pairs;
                $scope.totalPairs = data.total_pairs;
                $scope.index= data.index;
                $scope.totalIndex= data.total_index;
                $scope.pairIndex= data.pairIndex;
                $scope.totalpairIndex= data.total_pairIndex;
                $scope.futures=data.futures;
                $scope.totalFutures=data.total_futures;
                $scope.total=data.total;

                //we put them all in one array
                $scope.items =[];
                var i=0;
                for (i=0;i<$scope.stocks.length;i++) {
                    $scope.stocks[i].type= "Acción";//for the row type
                    $scope.items.push($scope.stocks[i]);
                }
                for (i=0;i<$scope.pairs.length;i++) {
                    $scope.pairs[i].type= "Par";//for the row type
                    $scope.items.push($scope.pairs[i]);
                }
                for (i=0;i<$scope.index.length;i++) {
                    $scope.index[i].type= "Acción";//for the row type
                    $scope.items.push($scope.index[i]);
                }
                for (i=0;i<$scope.pairIndex.length;i++) {
                    $scope.pairIndex[i].type= "Par";//for the row type
                    $scope.items.push($scope.pairIndex[i]);
                }
                for (i=0;i<$scope.futures.length;i++) {
                    $scope.futures[i].type= "Acción";//for the row type
                    $scope.items.push($scope.stocks[i]);
                }
            });
        };
        $scope.loadSummary();
        $scope.loadUser();


        //do the payment with the card, recopile the info and send to server
        $scope.payWithCard = function () {
            $scope.status="NONE";
            $scope.formSubmited = true;
            $scope.doingPayment = true;
            if (!$scope.payForm.$valid) {
                return;
            }
            dataCart= [];
            token = $window.sessionStorage.token;
            config = {
                headers: {
                    'X-Session-Token': token
                },
                data: {
                    packs: [],//list of packs
                    info: {
                        cardType: $scope.selectedCard.code,
                        number:$scope.number,
                        cvv: $scope.cvv,
                        issue: $scope.issue,
                        startYear: $scope.startYear,
                        startMonth: $scope.startMonth.id,
                        expirationYear: $scope.expirationYear,
                        expirationMonth: $scope.expirationMonth.id,
                        name: $scope.user.name,
                        surname: $scope.user.surname
                    },//info of credit card
                    bill:{}//info of bill (if modified)
                }
            };

            //this code is like the card, just take the items from the service
            if ($scope.stockItems.length >0) {
                for (i=0;i<$scope.stockItems.length;i++) {
                    item = {
                        duration: $scope.stockItems[i].duration,
                        code: $scope.stockItems[i].code,
                        start: $scope.stockItems[i].date
                    };
                    dataCart.push(item);
                }
            }

            if ($scope.pairsItems.length >0) {
                for (i=0;i<$scope.pairsItems.length;i++) {
                    item = {
                        duration: $scope.pairsItems[i].duration,
                        code: $scope.pairsItems[i].code,
                        start: $scope.pairsItems[i].date
                    };
                    dataCart.push(item);
                }
            }

            if ($scope.indicesItems.length >0) {
                for (i=0;i<$scope.indicesItems.length;i++) {
                    item = {
                        duration: $scope.indicesItems[i].duration,
                        code: $scope.indicesItems[i].code,
                        start: $scope.indicesItems[i].date
                    };
                    dataCart.push(item);
                }
            }

            if ($scope.pairsIndicesItems.length >0) {
                for (i=0;i<$scope.pairsIndicesItems.length;i++) {
                    item = {
                        duration: $scope.pairsIndicesItems[i].duration,
                        code: $scope.pairsIndicesItems[i].code,
                        start: $scope.pairsIndicesItems[i].date
                    };
                    dataCart.push(item);
                }
            }

            if ($scope.futuresItems.length >0) {
                for (i=0;i<$scope.futuresItems.length;i++) {
                    item = {
                        duration: $scope.futuresItems[i].duration,
                        code: $scope.futuresItems[i].code,
                        start: $scope.futuresItems[i].date
                    };
                    dataCart.push(item);
                }
            }
            config.data.packs= dataCart;
            $http.post($rootScope.urlService+"/pay-card",config).success( function(data) {
                if (data.status === "OK") {
                    $scope.status = "OK";
                    $rootScope.$broadcast('removeItemsCart');
                    $state.go('confirm-pay-card');
                } else {
                    $scope.status = "ERROR";
                }
                $scope.doingPayment = false;
            }).error(function(data) {
                $scope.status = "ERROR";
                $scope.doingPayment = false;
            });


        };

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
             *      pairIndex:[Pack],
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
             *      pairIndex:[Pack],
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
             *      total_pairIndex: X
             *      total_futures: X
             *      total: Z
             *      X is a double with the subtotals
             *      Z is the total. the taxes needs to be implemented
             */
            getPayments: function (withActive, callback) {

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
                    data: packs,
                    active_packs: withActive
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





