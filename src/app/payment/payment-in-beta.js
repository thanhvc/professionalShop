/**
 * Created by robgon on 04/08/14.
 */

angular.module('ngMo.paymentClosed', [  'ui.router'])

    .config(function config($stateProvider) {
        /*State for first signup step*/
        $stateProvider.state('summary-pay', {
            url: '/summary-pay',
            views: {
                "main": {

                    controller: 'PaymentBetaCtrl',
                    templateUrl: 'payment/payment-in-beta.tpl.html'
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
    .controller('PaymentBetaCtrl', function ($scope, $state,IsLogged, $rootScope,$timeout) {

    }).factory('PaymentService', function ($http,$rootScope,$window,ShoppingCartService ) {
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



                token = $window.localStorage.token;
                config = {
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
                durations = ["Mensual","Trimestral","Anual"];
                return durations[id];
            },


            /**
             * Ask to the server for the items from cart and update the items by a event sent to the cart in the broadcast
             * */
            checkCart : function() {
                this.getPayments(true,function (data) {

                    //this detect if some pack is with price=0, -> already subscribed pack
                    var subscribedPacks = [];
                    allBought = true;
                    amountOfPacks = 0;
                    stocks = data.stocks;
                    if (typeof stocks !== 'undefined') {
                        for (i = 0; i < stocks.length; i++) {
                            amountOfPacks++;
                            if (stocks[i].price === 0) {
                                someBought = true;

                            } else {
                                allBought = false;
                            }
                            if (stocks[i].collition === "error" || stocks[i].monthError === "error" || stocks[i].trimestralError === "error" || stocks[i].yearError === "error") {
                                subscribedPacks.push(stocks[i]);
                            }
                        }
                    }
                    totalStocks = data.total_stocks;
                    pairs = data.pairs;
                    if (typeof pairs !== 'undefined') {
                        for (i = 0; i < pairs.length; i++) {
                            amountOfPacks++;
                            if (pairs[i].price === 0) {
                                someBought = true;
                            } else {
                                allBought = false;
                            }
                            if (pairs[i].collition === "error" || pairs[i].monthError === "error" || pairs[i].trimestralError === "error" || pairs[i].yearError === "error") {
                                subscribedPacks.push(pairs[i]);
                            }
                        }
                    }
                    totalPairs = data.total_pairs;
                    index = data.index;
                    if (typeof index !== 'undefined') {
                        for (i = 0; i < index.length; i++) {
                            amountOfPacks++;
                            if (index[i].price === 0) {
                                someBought = true;
                            } else {
                                allBought = false;
                            }
                            if (index[i].collition === "error" || index[i].monthError === "error" || index[i].trimestralError === "error" || index[i].yearError === "error") {
                                subscribedPacks.push(index[i]);
                            }
                        }
                    }
                    totalIndex = data.total_index;
                    pairIndex = data.pairIndex;
                    if (typeof pairIndex !== 'undefined') {
                        for (i = 0; i < pairIndex.length; i++) {
                            amountOfPacks++;
                            if (pairIndex[i].price === 0) {
                                someBought = true;
                            } else {
                                allBought = false;
                            }
                            if (pairIndex[i].collition === "error" || pairIndex[i].monthError === "error" || pairIndex[i].trimestralError === "error" || pairIndex[i].yearError === "error") {
                                subscribedPacks.push(pairIndex[i]);
                            }
                        }
                    }
                    totalpairIndex = data.total_pairIndex;
                    futures = data.futures;
                    if (typeof futures !== 'undefined') {
                        for (i = 0; i < futures.length; i++) {
                            amountOfPacks++;
                            if (futures[i].price === 0) {
                                someBought = true;
                            } else {
                                allBought = false;
                            }
                            if (futures[i].collition === "error" || futures[i].monthError === "error" || futures[i].trimestralError === "error" || futures[i].yearError === "error") {
                                subscribedPacks.push(futures[i]);
                            }
                        }
                    }
                    totalFutures = data.total_futures;
                    total = data.total;
                    if (subscribedPacks.length > 0) {
                        //there are packs that have price 0, so we need check it in the cart. Launch an event to ask to the cart
                        $rootScope.$broadcast('updateSubscribedPacks', subscribedPacks);
                    }
                });
            }
        };
    });
var ModalInstanceTermsCtrl = function ($scope, $modalInstance,$timeout, infoSelected) {
    $scope.infoSelected = infoSelected;
    $scope.opened = true;
    $scope.close = function () {
        if ($scope.opened) {
            $modalInstance.close();
            $scope.opened = false;
        }
    };
    $timeout(function() { //the body click event will be in a 1sec timeout, the modal will be shown minimun 1 second
        $scope.$on("body-click",function(){
            $scope.close();
        },1000);
    });

};