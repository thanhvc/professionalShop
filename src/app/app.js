angular.module('ngMo', [
        'ngCookies',
        'pasvaz.bindonce',
        'templates-app',
        'templates-common',
        'ngMo.home',
        'ngMo.catalog',
        'ngMo.market_observatory',
        'ngMo.services',
        'ngMo.service_applications',
        'ngMo.subscriptions_and_prices',
        'ngMo.investor_tools',
        'ngMo.contact',
        'ngMo.my_patterns',
        'ngMo.lookup_diary',
        'ngMo.historic',
        'ngMo.portfolio',
        'ngMo.correlation',
        'ngMo.volatility',
        'ngMo.the_week',
        'ngMo.calendar',
        'ngMo.my_subscriptions',
        'ngMo.my_profile',
        'ui.router',
        'pascalprecht.translate',
        'singUp',
        'auth',
        'ngMo.Activate',
        'ngMo.detail',
        //'ngMo.payment',
        'ngMo.paymentClosed', //fake payment
        //'ngMo.cancel_pack',
        'ngMo.fakeCancel_pack',
        'ngMo.renew',
        'tmh.dynamicLocale',
        'ngMo.changePassword',
        'ngMo.faq'
])

 .config(function config($locationProvider, $stateProvider, $urlRouterProvider,$translateProvider,$translatePartialLoaderProvider,tmhDynamicLocaleProvider) {
        $locationProvider.html5Mode(true);
        $stateProvider.state('home', {
            url: '/home?activated',
            views: {
                "main": {
                    controller: 'HomeCtrl',
                    templateUrl: 'home/home.tpl.html'
                }
            },
            data: {
                pageTitle: 'HOME.page_title',
                selectMenu: '',
                selectSubmenu: '',
                selectItemSubmenu: '',
                moMenuType: 'publicMenu'
            }
        })
        .state('forgotten-password', {
            url: '/forgotten-password',
            views: {
                "main": {
                    controller: 'AppCtrl',
                    templateUrl: 'forgotten_password/forgotten-password.tpl.html'
                }
            },
            data: {
                pageTitle: 'forgotten-password',
                selectMenu: '',
                selectSubmenu: '',
                selectItemSubmenu: '',
                moMenuType: 'publicMenu'
             }
        })
        .state('privacy_policy', {
            url: '/privacy_policy',
            views: {
                "main": {
                    controller: 'HomeCtrl',
                    templateUrl: 'privacy_policy/privacy_policy.tpl.html'
                }
            },
            data: {
                pageTitle: 'Política de privacidad',
                selectMenu: '',
                selectSubmenu: '',
                selectItemSubmenu: '',
                moMenuType: 'publicMenu'
            }
        })
        ;

        $urlRouterProvider.otherwise('/home');
        $translatePartialLoaderProvider.addPart('common');
        $translateProvider.useLoader('$translatePartialLoader', {
            urlTemplate: 'i18n/{part}/{lang}.json'
        });
        $translateProvider.registerAvailableLanguageKeys(['en', 'de'], {
            'en_US': 'en',
            'en_GB': 'en',
            'es_ES': 'de'
        });
        $translateProvider.translationNotFoundIndicator("-missing-");
        $translateProvider.preferredLanguage('es');
        $translateProvider.useCookieStorage();
        $translateProvider.storageKey('lang');

        tmhDynamicLocaleProvider.localeLocationPattern('i18n/angular-locale_{{locale}}.js');
    })

    .run(function run($rootScope,$translate,$translateCookieStorage) {
        $rootScope.urlService = 'http://api.mo.devel.edosoftfactory.com';
       //$rootScope.urlService = 'http://localhost:9000';


        /**
         * FOREX MODE?
         *
         **/
        $rootScope.forexMode = false;

        $rootScope.$on('$translatePartialLoaderStructureChanged', function () {
            $translate.use($translateCookieStorage.get('lang'));
            $translate.refresh();

        });


    })

    .service('ActiveTabService', function (){
        var activeTab = 0;
        this.activeTab = function (){
          return  activeTab;
        };
        this.changeActiveTab = function (tab) {
          activeTab =   tab;
          return activeTab;
        };
    })

    .service('SecondActiveTabService', function (){
        var activeTab = 0;
        this.activeTab = function (){
            return  activeTab;
        };
        this.changeActiveTab = function (tab) {
            activeTab =   tab;
            return activeTab;
        };
    })
    .service('AnchorLinkService', function ($location, $anchorScroll,$window){
        this.scrollTo = function(id){
            $location.hash(id);
            $anchorScroll();
        };
        this.scrollTop = function(){
            $window.scrollTo(0,0);
        };
    })
    .service('ArrayContainItemService', function () {
        this.containItem = function (array, itemArray) {
            var contain = false;
            angular.forEach(array, function (item) {
                    if ((item.code === itemArray.code ) ) {
                       if ((item.startDate === itemArray.startDate)) { //comment for no select for distinct by startDate the packs in cart
                            contain = true;
                        }
                    }
                });
            if (contain){
                return true;
            }else {
                return false;
            }
        };
    })
    .service('MetaInformation', function() {
        var metaDescription = '';
        var metaKeywords = '';
        return {
            metaDescription: function() { return metaDescription; },
            metaKeywords: function() { return metaKeywords; },
            reset: function() {
                metaDescription = '';
                metaKeywords = '';
            },
            setMetaDescription: function(newMetaDescription) {
                metaDescription = newMetaDescription;
            },
            appendMetaKeywords: function(newKeywords) {
                for (var key in newKeywords) {
                    if (metaKeywords === '') {
                        metaKeywords += newKeywords[key].name;
                    } else {
                        metaKeywords += ', ' + newKeywords[key].name;
                    }
                }
            }
        };
    })
    .filter('twoDecimals', function(){ //TRANSFORM A DECIMAL NUMBER TO STRING WITH 2 DECIMALS
        return function(n){
            //return a string with 2 decimal if exists..
            //xx.xxxx -> xx.xx
            //xx.x -> xx.x
            //xx -> xx
            roundedValue = 0.0;
            if (n != null && !isNaN(n)) {
                roundedValue = Math.round(n * 100) / 100;
            }
            return roundedValue.toString();
        };
    })
    .filter('oneDecimal', function(){ //TRANSFORM A DECIMAL NUMBER TO STRING WITH 2 DECIMALS
        return function(n){
            //return a string with 2 decimal if exists..
            //xx.xxxx -> xx.xx
            //xx.x -> xx.x
            //xx -> xx
            roundedValue = 0.0;
            if (n != null && !isNaN(n)) {
                roundedValue = Math.round(n * 10) / 10;
            }
            return roundedValue.toString();
        };
    })
    .filter('sectorName', function(){ //TRANSFORM A SECTOR NAME WITHOUT THE SECTOR WORD
        return function(n){
            if (typeof n !== "undefined" && n != null) {
                x= n.replace(" Sector","");
                return x.replace(" SECTOR","");
            } else {
                return n;
            }

        };
    })
    .filter('sectorNameFromId', function($filter){ //TRANSFORM A SECTOR NAME WITHOUT THE SECTOR WORD
        return function(n){
            if (typeof n !== "undefined" && n != null) {
                if (n === "SIN CLASIFICAR") {
                    return n;// special case
                }
                x= n.replace(" Sector","");
                x = x.replace(" SECTOR","");
                //now capitalize all except country code (last word if have 2 letters)
                nameArray = x.split(" ");
                if (nameArray.length>1) {
                    finalName ="";
                    for (i=0;i<nameArray.length-1;i++) {
                        finalName += $filter("capitalize")(nameArray[i])+ " ";
                    }
                    //now check the last word, if is 2 digits (country code)
                    if (nameArray[nameArray.length-1].length === 2) {
                        //country code case
                        finalName +=  nameArray[nameArray.length-1];
                    } else {
                        finalName += $filter("capitalize")(nameArray[nameArray.length-1]);
                    }
                    return finalName;
                } else {
                    return $filter('capitalize')(x);
                }
            } else {
                return n;
            }

        };
    })
    .filter('industryNameFromId', function($filter){ //TRANSFORM A SECTOR NAME WITHOUT THE SECTOR WORD
        return function(n){
            if (typeof n !== "undefined" && n != null) {
                if (n === "SIN CLASIFICAR") {
                    return n;// special case
                }
                //now capitalize all except country code (last word if have 2 letters)
                nameArray = n.split(" ");
                if (nameArray.length>1) {
                    finalName ="";
                    for (i=0;i<nameArray.length-1;i++) {
                        finalName += $filter("capitalize")(nameArray[i])+ " ";
                    }
                    //now check the last word, if is 2 digits (country code)
                    if (nameArray[nameArray.length-1].length === 2) {
                        //country code case
                        finalName +=  nameArray[nameArray.length-1];
                    } else {
                        finalName += $filter("capitalize")(nameArray[nameArray.length-1]);
                    }
                    return finalName;
                } else {
                    return $filter('capitalize')(n);
                }
            } else {
                return n;
            }

        };
    })
    .filter('volatTruncate',function(){
        return function(input) {

            if (input > 5) {
                return parseInt(input, 10); // 20
            } else {
                roundedValue = 0.0;
                if (input != null && !isNaN(input)) {
                    roundedValue = Math.round(input * 100) / 100;
                }
                return roundedValue.toString();
            }

        };
    })
    .filter('capitalize',function(){
        return function(input) {
            return (!!input) ? input.replace(/([^\W_]+[^\s-]*) */g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();}) : '';
        };
    })
    .service('ShoppingCartService', function (ActiveTabService,$q,$http,$rootScope,$window){

        var stockItems =  [];

        var pairsItems  =  [];

        var indicesItems = [];

        var pairsIndicesItems = [] ;
        var futuresItems =  [];

        var numItemsCart = 0;
        var totalCart = 0;
        var stockSubtotal = 0;
        var pairsSubtotal = 0;
        var indicesSubtotal = 0;
        var pairsIndicesSubtotal = 0;
        var futuresSubtotal = 0;


        //ask to the server if the actual user has the actual pack already
        this.hasSubscribedToThisPack= function(item,callback){
            token = $window.localStorage.token;
            if (typeof token !== "undefined") {

                newItem = {
                    codePack: item.code,
                    month: parseInt(item.date.split("/")[1],10),
                    year: parseInt(item.date.split("/")[2],10)
                };
                config = {
                    data: newItem
                };
                $http.post($rootScope.urlService+"/has-pack", config).success(callback).error(callback);
            }
        };

        //says to the service  which packs are subscribed to set price 0, this method is launched when the user is logged, to update the cart with
        //possible collitions
        this.thisPacksAreSubscribed=function(packs) {
            itemsToDelete=[];
            for (j = 0;j< packs.length; j++) {
                startDate =packs[j].startDate;
                for (i = 0; i < stockItems.length; i++) {
                    if (stockItems[i].code === packs[j].code) {
                        itemDate = stockItems[i].date;
                        itemDate = itemDate.split("/");
                        month = parseInt(itemDate[1],10);
                        year = parseInt(itemDate[2],10);
                        if ((startDate.month  === month) && (startDate.year  === year)) {
                            //check the price in the option
                            prices = stockItems[i].prices.slice();
                            if (packs[j].collition === "error") {
                                stockItems[i].price = 0;
                                stockItems[i].prices = [0,0,0];
                                //delete item
                                itemsToDelete.push(stockItems[i]);
                            } else {
                                if (packs[j].monthError === "error") {
                                    prices[0] = 0;
                                }
                                if (packs[j].trimestralError === "error") {
                                    prices[1] = 0;
                                }
                                if (packs[j].yearError === "error") {
                                    prices[2] = 0;
                                }
                                stockItems[i].prices = prices.slice();
                                switch (stockItems[i].duration) {
                                    case "Mensual":
                                        if (packs[j].monthError == "error") {
                                            if (packs[j].trimestralError  == "ok") {
                                                stockItems[i].price = stockItems[i].prices[1];
                                                stockItems[i].duration = "Trimestral";
                                            } else {
                                                stockItems[i].price = stockItems[i].prices[2];
                                                stockItems[i].duration = "Anual";
                                            }
                                        }
                                        break;
                                    case "Trimestral":
                                        if (packs[j].trimestralError == "error") {
                                            if (packs[j].monthError == "ok") {
                                                stockItems[i].price = stockItems[i].prices[0];
                                                stockItems[i].duration = "Mensual";
                                            } else {
                                                stockItems[i].price = stockItems[i].prices[2];
                                                stockItems[i].duration = "Anual";
                                            }
                                        }
                                        break;
                                    case "Anual":
                                        if (packs[j].yearError == "error") {
                                            if (packs[j].monthError == "ok") {
                                                stockItems[i].price = stockItems[i].prices[0];
                                                stockItems[i].duration = "Mensual";
                                            } else {
                                                stockItems[i].price = stockItems[i].prices[1];
                                                stockItems[i].duration = "Trimestral";
                                            }
                                        }
                                        break;
                                }
                            }

                        }
                    }
                }

                if (itemsToDelete.length>0) {
                    for (i = 0; i< itemsToDelete.length; i++) {
                        this.removeItemCart("stocks",itemsToDelete[i]);
                    }
                }
                itemsToDelete=[];
                for (i = 0; i < pairsItems.length; i++) {
                    if (pairsItems[i].code === packs[j].code) {
                        itemDate = pairsItems[i].date;
                        itemDate = itemDate.split("/");
                        month = parseInt(itemDate[1],10);
                        year = parseInt(itemDate[2],10);
                        if ((startDate.month  === month) && (startDate.year  === year)) {
                            //check the price in the option
                            prices = pairsItems[i].prices.slice();
                            if (packs[j].collition === "error") {
                                pairsItems[i].price = 0;
                                pairsItems[i].prices = [0,0,0];
                                //delete item
                                itemsToDelete.push(pairsItems[i]);
                            } else {
                                if (packs[j].monthError === "error") {
                                    prices[0] = 0;
                                }
                                if (packs[j].trimestralError === "error") {
                                    prices[1] = 0;
                                }
                                if (packs[j].yearError === "error") {
                                    prices[2] = 0;
                                }
                                pairsItems[i].prices = prices.slice();
                                switch (pairsItems[i].duration) {
                                    case "Mensual":
                                        if (packs[j].monthError == "error") {
                                            if (packs[j].trimestralError == "ok") {
                                                pairsItems[i].price = pairsItems[i].prices[1];
                                                pairsItems[i].duration = "Trimestral";
                                            } else {
                                                pairsItems[i].price = pairsItems[i].prices[2];
                                                pairsItems[i].duration = "Anual";
                                            }
                                        }
                                        break;
                                    case "Trimestral":
                                        if (packs[j].trimestralError == "error") {
                                            if (packs[j].monthError == "ok") {
                                                pairsItems[i].price = pairsItems[i].prices[0];
                                                pairsItems[i].duration = "Mensual";
                                            } else {
                                                pairsItems[i].price = pairsItems[i].prices[2];
                                                pairsItems[i].duration = "Anual";
                                            }
                                        }
                                        break;
                                    case "Anual":
                                        if (packs[j].yearError == "error") {
                                            if (packs[j].monthError == "ok") {
                                                pairsItems[i].price = pairsItems[i].prices[0];
                                                pairsItems[i].duration = "Mensual";
                                            } else {
                                                pairsItems[i].price = pairsItems[i].prices[1];
                                                pairsItems[i].duration = "Trimestral";
                                            }
                                        }
                                        break;
                                }
                            }

                        }
                    }
                }

                if (itemsToDelete.length>0) {
                    for (i = 0; i< itemsToDelete.length; i++) {
                        this.removeItemCart("pairs",itemsToDelete[i]);
                    }
                }
                itemsToDelete=[];
                for (i = 0; i < indicesItems.length; i++) {
                    if (indicesItems[i].code === packs[j].code) {
                        itemDate = indicesItems[i].date;
                        itemDate = itemDate.split("/");
                        month = parseInt(itemDate[1],10);
                        year = parseInt(itemDate[2],10);
                        if ((startDate.month  === month) && (startDate.year  === year)) {
                            //check the price in the option
                            prices = indicesItems[i].prices.slice();
                            if (packs[j].collition === "error") {
                                indicesItems[i].price = 0;
                                indicesItems[i].prices = [0,0,0];
                                //delete item
                                itemsToDelete.push(indicesItems[i]);
                            } else {
                                if (packs[j].monthError === "error") {
                                    prices[0] = 0;
                                }
                                if (packs[j].trimestralError === "error") {
                                    prices[1] = 0;
                                }
                                if (packs[j].yearError === "error") {
                                    prices[2] = 0;
                                }
                                indicesItems[i].prices = prices.slice();
                                switch (indicesItems[i].duration) {
                                    case "Mensual":
                                        if (packs[j].monthError) {
                                            if (!packs[j].trimestralError) {
                                                indicesItems[i].price = indicesItems[i].prices[1];
                                                indicesItems[i].duration = "Trimestral";
                                            } else {
                                                indicesItems[i].price = indicesItems[i].prices[2];
                                                indicesItems[i].duration = "Anual";
                                            }
                                        }
                                        break;
                                    case "Trimestral":
                                        if (packs[j].trimestralError) {
                                            if (!packs[j].monthError) {
                                                indicesItems[i].price = indicesItems[i].prices[0];
                                                indicesItems[i].duration = "Mensual";
                                            } else {
                                                indicesItems[i].price = indicesItems[i].prices[2];
                                                indicesItems[i].duration = "Anual";
                                            }
                                        }
                                        break;
                                    case "Anual":
                                        if (packs[j].yearError) {
                                            if (!packs[j].monthError) {
                                                indicesItems[i].price = indicesItems[i].prices[0];
                                                indicesItems[i].duration = "Mensual";
                                            } else {
                                                indicesItems[i].price = indicesItems[i].prices[1];
                                                indicesItems[i].duration = "Trimestral";
                                            }
                                        }
                                        break;
                                }
                            }

                        }
                    }
                }
                if (itemsToDelete.length>0) {
                    for (i = 0; i< itemsToDelete.length; i++) {
                        this.removeItemCart("indices",itemsToDelete[i]);
                    }
                }
                itemsToDelete=[];
                for (i = 0; i < pairsIndicesItems.length; i++) {
                    if (pairsIndicesItems[i].code === packs[j].code) {
                        itemDate = pairsIndicesItems[i].date;
                        itemDate = itemDate.split("/");
                        month = parseInt(itemDate[1],10);
                        year = parseInt(itemDate[2],10);
                        if ((startDate.month  === month) && (startDate.year  === year)) {
                            //check the price in the option
                            prices = pairsIndicesItems[i].prices.slice();
                            if (packs[j].collition === "error") {
                                pairsIndicesItems[i].price = 0;
                                pairsIndicesItems[i].prices = [0,0,0];
                                //delete item
                                itemsToDelete.push(pairsIndicesItems[i]);
                            } else {
                                if (packs[j].monthError === "error") {
                                    prices[0] = 0;
                                }
                                if (packs[j].trimestralError === "error") {
                                    prices[1] = 0;
                                }
                                if (packs[j].yearError === "error") {
                                    prices[2] = 0;
                                }
                                pairsIndicesItems[i].prices = prices.slice();
                                switch (pairsIndicesItems[i].duration) {
                                    case "Mensual":
                                        if (packs[j].monthError) {
                                            if (!packs[j].trimestralError) {
                                                pairsIndicesItems[i].price = pairsIndicesItems[i].prices[1];
                                                pairsIndicesItems[i].duration = "Trimestral";
                                            } else {
                                                pairsIndicesItems[i].price = pairsIndicesItems[i].prices[2];
                                                pairsIndicesItems[i].duration = "Anual";
                                            }
                                        }
                                        break;
                                    case "Trimestral":
                                        if (packs[j].trimestralError) {
                                            if (!packs[j].monthError) {
                                                pairsIndicesItems[i].price = pairsIndicesItems[i].prices[0];
                                                pairsIndicesItems[i].duration = "Mensual";
                                            } else {
                                                pairsIndicesItems[i].price = pairsIndicesItems[i].prices[2];
                                                pairsIndicesItems[i].duration = "Anual";
                                            }
                                        }
                                        break;
                                    case "Anual":
                                        if (packs[j].yearError) {
                                            if (!packs[j].monthError) {
                                                pairsIndicesItems[i].price = pairsIndicesItems[i].prices[0];
                                                pairsIndicesItems[i].duration = "Mensual";
                                            } else {
                                                pairsIndicesItems[i].price = pairsIndicesItems[i].prices[1];
                                                pairsIndicesItems[i].duration = "Trimestral";
                                            }
                                        }
                                        break;
                                }
                            }

                        }
                    }
                }
                if (itemsToDelete.length>0) {
                    for (i = 0; i< itemsToDelete.length; i++) {
                        this.removeItemCart("pairsIndices",itemsToDelete[i]);
                    }
                }
                itemsToDelete=[];
                for (i = 0; i < futuresItems.length; i++) {
                    if (futuresItems[i].code === packs[j].code) {
                        itemDate = futuresItems[i].date;
                        itemDate = itemDate.split("/");
                        month = parseInt(itemDate[1],10);
                        year = parseInt(itemDate[2],10);
                        if ((startDate.month  === month) && (startDate.year  === year)) {
                            //check the price in the option
                            prices = futuresItems[i].prices.slice();
                            if (packs[j].collition === "error") {
                                futuresItems[i].price = 0;
                                futuresItems[i].prices = [0,0,0];
                                //delete item
                                itemsToDelete.push(futuresItems[i]);
                            } else {
                                if (packs[j].monthError === "error") {
                                    prices[0] = 0;
                                }
                                if (packs[j].trimestralError === "error") {
                                    prices[1] = 0;
                                }
                                if (packs[j].yearError === "error") {
                                    prices[2] = 0;
                                }
                                futuresItems[i].prices = prices.slice();
                                switch (futuresItems[i].duration) {
                                    case "Mensual":
                                        if (packs[j].monthError) {
                                            if (!packs[j].trimestralError) {
                                                futuresItems[i].price = futuresItems[i].prices[1];
                                                futuresItems[i].duration = "Trimestral";
                                            } else {
                                                futuresItems[i].price = futuresItems[i].prices[2];
                                                futuresItems[i].duration = "Anual";
                                            }
                                        }
                                        break;
                                    case "Trimestral":
                                        if (packs[j].trimestralError) {
                                            if (!packs[j].monthError) {
                                                futuresItems[i].price = futuresItems[i].prices[0];
                                                futuresItems[i].duration = "Mensual";
                                            } else {
                                                futuresItems[i].price = futuresItems[i].prices[2];
                                                futuresItems[i].duration = "Anual";
                                            }
                                        }
                                        break;
                                    case "Anual":
                                        if (packs[j].yearError) {
                                            if (!packs[j].monthError) {
                                                futuresItems[i].price = futuresItems[i].prices[0];
                                                futuresItems[i].duration = "Mensual";
                                            } else {
                                                futuresItems[i].price = futuresItems[i].prices[1];
                                                futuresItems[i].duration = "Trimestral";
                                            }
                                        }
                                        break;
                                }
                            }

                        }
                    }
                }
                if (itemsToDelete.length>0) {
                    for (i = 0; i< itemsToDelete.length; i++) {
                        this.removeItemCart("futures",itemsToDelete[i]);
                    }
                }
                itemsToDelete=[];
                totalCart = 0;
                stockSubtotal = 0;
                pairsSubtotal = 0;
                indicesSubtotal = 0;
                pairsIndicesSubtotal = 0;
                futuresSubtotal = 0;
                for (i=0;i<stockItems.length;i++) {
                    totalCart += stockItems[i].price;
                    stockSubtotal += stockItems[i].price;
                }
                for (i=0;i<pairsItems.length;i++) {
                    totalCart += pairsItems[i].price;
                    pairsSubtotal +=pairsItems[i].price;
                }
                for (i=0;i<indicesItems.length;i++) {
                    totalCart += indicesItems[i].price;
                    indicesSubtotal +=indicesItems[i].price;
                }
                for (i=0;i<pairsIndicesItems.length;i++) {
                    totalCart += pairsIndicesItems[i].price;
                    pairsIndicesSubtotal += pairsIndicesItems[i].price;
                }
                for (i=0;i<futuresItems.length;i++) {
                    totalCart += futuresItems[i].price;
                    futuresSubtotal+=futuresItems[i].price;
                }
            }
        };


        //save the currentCart in session storage
        this.saveSessionCart = function () {
            //restart the sessionCart and save all the info
            this.restartSessionCart();
            sessioncart = {};
            sessioncart.stockItems = stockItems;
            sessioncart.pairsItems = pairsItems;
            sessioncart.indicesItems = indicesItems;
            sessioncart.pairsIndicesItems = pairsIndicesItems;
            sessioncart.futuresItems = futuresItems;
            sessioncart.stockSubtotal = stockSubtotal;
            sessioncart.pairsSubtotal = pairsSubtotal;
            sessioncart.indicesSubtotal = indicesSubtotal;
            sessioncart.pairsIndicesSubtotal = pairsIndicesSubtotal;
            sessioncart.futuresSubtotal = futuresSubtotal;
            sessioncart.totalCart = totalCart;
            sessioncart.numItemsCart = numItemsCart;
            $window.sessionStorage.cart = JSON.stringify(sessioncart);
        };


        this.getPrices = function () {
            var deferred =$q.defer();
            var prices = $http.get($rootScope.urlService+"/prices").then(function(data) {
                deferred.resolve(data.data.prices);
                return data.data.prices;
            });


            return deferred.promise;
        };

        var showCart = false;
        this.openCart = function (){
            showCart = true;
            return showCart;
        };

        this.closeCart = function (){
            if (showCart === true) {
                showCart = false;
            }
            return showCart;
        };

        this.obtainCartItems = function (typePack) {
            switch (typePack){
                case 'stocks':
                    return stockItems;
                case 'pairs':
                    return pairsItems;
                case 'indices':
                    return indicesItems;
                case 'pairsIndices':
                    return pairsIndicesItems;
                case 'futures':
                    return futuresItems;
            }
        };

        this.addItemCart = function (item) {
            var activeTab = ActiveTabService.activeTab();
            switch (item.productType){
                case 'STOCK':
                    if (item.patternType === "SIMPLE"){
                        stockItems.push(item);
                        stockSubtotal += item.price;
                    }else{
                        pairsItems.push(item);
                        pairsSubtotal += item.price;
                    }
                    break;
                case 'INDICE':
                    if (item.patternType === "SIMPLE") {
                        indicesItems.push(item);
                        indicesSubtotal += item.price;
                    }else{
                        pairsIndicesItems.push(item);
                        pairsIndicesSubtotal += item.price;
                    }
                    break;
                case 'FUTURE':
                    futuresItems.push(item);
                    futuresSubtotal += item.price;
            }
            showCart = true;
            numItemsCart++;
            totalCart+=item.price;
            this.saveSessionCart();
        };

        this.obtainSubtotal = function(productType){
            switch (productType){
                case 'stocks':
                    return stockSubtotal;
                case 'pairs':
                    return pairsSubtotal;
                case 'indices':
                    return indicesSubtotal;
                case 'pairsIndices':
                    return pairsIndicesSubtotal;
                case 'futures':
                    return futuresSubtotal;
            }
        };

        this.removeItemCart = function (productType, item) {
            var index = -1;
            switch (productType){
                case 'stocks':
                    index = stockItems.indexOf(item);
                    stockItems.splice(index,1);
                    stockSubtotal -= item.price;
                    break;
                case 'pairs':
                    index = pairsItems.indexOf(item);
                    pairsItems.splice(index,1);
                    pairsSubtotal -= item.price;
                    break;
                case 'indices':
                    index = indicesItems.indexOf(item);
                    indicesItems.splice(index,1);
                    indicesSubtotal -= item.price;
                    break;
                case 'pairsIndices':
                    index = pairsIndicesItems.indexOf(item);
                    pairsIndicesItems.splice(index,1);
                    pairsIndicesSubtotal -= item.price;
                    break;
                case 'futures':
                    index = futuresItems.indexOf(item);
                    futuresItems.splice(index,1);
                    futuresSubtotal -= item.price;
                    break;
            }
            numItemsCart--;
            totalCart-=item.price;
            //save the cart in the sessionStorage, every add/remove of the cart, must be refreshed
            this.saveSessionCart();

        };


        /**
         * change the item with same code
         * @param item
         * @param type
         */
        this.changeDuration = function(item,type) {
            switch (type){
                case 0:
                    //the new price is set with duration, the total cart is updated
                    for (i=0;i<stockItems.length;i++) {
                        if (item.code === stockItems[i].code) {
                            if (item.startDate === stockItems[i].startDate) {
                                stockItems[i] = item;
                                break;
                            }
                        }
                    }
                    break;
                case 1:
                    for (i=0;i<pairsItems.length;i++) {
                        if (item.code === pairsItems[i].code) {
                            if (item.startDate === pairsItems[i].startDate) {
                                pairsItems[i] = item;
                                break;
                            }
                        }
                    }
                    break;
                case 2:
                    for (i=0;i<indicesItems.length;i++) {
                        if (item.code === indicesItems[i].code) {
                            if (item.startDate === indicesItems[i].startDate) {
                                indicesItems[i] = item;
                                break;
                            }
                        }
                    }
                    break;
                case 3:
                    for (i=0;i<pairsIndicesItems.length;i++) {
                        if (item.code === pairsIndicesItems[i].code) {
                            if (item.startDate === pairsIndicesItems[i].startDate) {
                                pairsIndicesItems[i] = item;
                                break;
                            }
                        }
                    }
                    break;
                case 4:
                    for (i=0;i<futuresItems.length;i++) {
                        if (item.code === futuresItems[i].code) {
                            if (item.startDate === futuresItems[i].startDate) {
                                futuresItems[i] = item;
                                break;
                            }
                        }
                    }
                    break;
            }
            //update prices
            totalCart = 0;
            stockSubtotal = 0;
            pairsSubtotal = 0;
            indicesSubtotal = 0;
            pairsIndicesSubtotal = 0;
            futuresSubtotal = 0;
            for (i=0;i<stockItems.length;i++) {
                totalCart += stockItems[i].price;
                stockSubtotal += stockItems[i].price;
            }
            for (i=0;i<pairsItems.length;i++) {
                totalCart += pairsItems[i].price;
                pairsSubtotal +=pairsItems[i].price;
            }
            for (i=0;i<indicesItems.length;i++) {
                totalCart += indicesItems[i].price;
                indicesSubtotal +=indicesItems[i].price;
            }
            for (i=0;i<pairsIndicesItems.length;i++) {
                totalCart += pairsIndicesItems[i].price;
                pairsIndicesSubtotal += pairsIndicesItems[i].price;
            }
            for (i=0;i<futuresItems.length;i++) {
                totalCart += futuresItems[i].price;
                futuresSubtotal+=futuresItems[i].price;
            }


            this.saveSessionCart();
        };

        this.removeAllItemsCart = function () {
            stockItems = [];//stockItems.splice(0, pairsItems.length);
            pairsItems = [];//pairsItems.splice(0, pairsItems.length);
            indicesItems = [];//indicesItems.splice(0, pairsItems.length);
            pairsIndicesItems = [];//pairsIndicesItems.splice(0, pairsItems.length);
            futuresItems = [];//futuresItems.splice(0, pairsItems.length);
            stockSubtotal = 0;
            pairsSubtotal = 0;
            indicesSubtotal = 0;
            pairsIndicesSubtotal = 0;
            futuresSubtotal = 0;
            totalCart = 0;
            numItemsCart = 0;
            $rootScope.$broadcast("removeAllItemsFromCart");
            this.restartSessionCart();
        };

        this.obtainNumItemsCart = function () {
            return numItemsCart;
        };

        this.obtainTotalCart = function () {
            return totalCart;
        };

        //synchronize the session storage with the service



        //load the sessionCart
        this.loadSessionCart = function() {
            if (typeof $window.sessionStorage.cart === 'undefined') {
                this.restartSessionCart();
            }
            cartSession =  angular.fromJson($window.sessionStorage.cart);
            stockItems = cartSession.stockItems;
            pairsItems=cartSession.pairsItems;
            indicesItems=cartSession.indicesItems;
            pairsIndicesItems = cartSession.pairsIndicesItems;
            futuresItems = cartSession.futuresItems;
            stockSubtotal = cartSession.stockSubtotal;
            pairsSubtotal = cartSession.pairsSubtotal;
            indicesSubtotal =cartSession.indicesSubtotal;
            pairsIndicesSubtotal = cartSession.pairsIndicesSubtotal;
            futuresSubtotal = cartSession.futuresSubtotal;
            totalCart = cartSession.totalCart;
            numItemsCart = cartSession.numItemsCart;
        };

        this.restartSessionCart = function () {
            sessionCart = {
                stockItems : [],
                pairsItems : [],
                indicesItems : [],
                pairsIndicesItems : [],
                futuresItems : [],
                stockSubtotal : 0,
                pairsSubtotal : 0,
                indicesSubtotal : 0,
                pairsIndicesSubtotal : 0,
                futuresSubtotal : 0,
                totalCart : 0,
                numItemsCart : 0
            };
            $window.sessionStorage.cart =  JSON.stringify(sessionCart);//;
        };



    })
    .controller('AppCtrl', function AppCtrl($scope, $rootScope, ActualDateService, $modal, IsLogged, AnchorLinkService,$http,$translate,$translatePartialLoader,tmhDynamicLocale,$location, $timeout) {
        //Set when is logged
        IsLogged.checkLogged();

        $scope.scrollToHomeTable = function() {
            AnchorLinkService.scrollTo("tabsHome");
        };

        $scope.emailRemember = "";
        $scope.mailSent = false;
        $scope.rememberPassword = function () {
            config = {
                email: $scope.emailRemember
            };
            return $http.post($rootScope.urlService+'/remember-password', config)
                .success(function (data, status) {
                    $scope.mailSent = true;
                })
                .error(function (data, status) {
                    $scope.mailSent = true;
                });
        };
        $scope.$on('$stateChangeStart', function (event, toState){
            $scope.inWeekView = false;
            if (toState.url === '/the-week') {
                $scope.inWeekView = true;
            }
            $scope.inVolatilityView = false;
            if (toState.url === '/volatility') {
                $scope.inVolatilityView = true;
            }

            if ($location.path() == "/home" && toState.name == "catalog"){
                $scope.scrollPos = window.scrollY;
            }
        });
        $scope.$on('$stateChangeSuccess', function (event, toState, toParams, fromState, fromParams) {
            if (angular.isDefined(toState.data.pageTitle)) {
                $translate(toState.data.pageTitle).then(function(title){
                $scope.pageTitle = 'Market Observatory | ' + title;
                });
            }
            if (angular.isDefined(toParams.packCode)){
                if (toParams.packCode.search(/.*FUTURE.*/) != -1){

                    $scope.description=toState.name + "_future_desc";

                }
                else if (toParams.packCode.search(/.*INDEX.:*/)!=-1){
                    $scope.description=toState.name + "_index_desc";
                }
                else if (toParams.packCode.search(/.*-P-.*/)!=-1){
                    $scope.description=toState.name + "_pair_desc";
                }
                else {
                    $scope.description=toState.name + "_stock_desc";
                }
            }else{
                $scope.description=toState.name + "_desc";
            }
            $scope.selectMenu = toState.data.selectMenu;
            $scope.selectSubmenu = toState.data.selectSubmenu;
            $scope.selectItemSubmenu = toState.data.selectItemSubmenu;
            $scope.actualMenu = '';
            $scope.actualSubmenu = '';
            $scope.moMenuType = toState.data.moMenuType;
            $scope.errorSignIn = false;
            $scope.$watch('actualSubmenu', function(){});
            $scope.$watch('selectSubmenu', function(){});
            //AnchorLinkService.scrollTo('top');
            AnchorLinkService.scrollTop();

            if (toState.name == ("home") && fromState.name == "catalog"){
                $timeout(function() { // wait for DOM, then restore scroll position
                    window.scroll(0,  $scope.scrollPos ? $scope.scrollPos : 0);
                }, 1000);
            }


        });
        var data = ActualDateService.actualDate(function (data) {
            $scope.actualDate = data.actualDate;
        });

        var dataNext = ActualDateService.nextDate(function (data) {
            $scope.nextDate = data.nextDate;
        });

        $scope.openModalInstance = function(url) {
            $modal.open({
                templateUrl: 'home/modal.tpl.html',
                controller: ModalInstanceCtrl,
                resolve: {
                    infoSelected: function () {
                        return url+".tpl.html";
                    }
                }
            });
        };



        $scope.openModalCartAdvice = function(isTotal) {
            $modal.open({
                templateUrl: 'home/modalCartAdvice.tpl.html',
                controller: ModalCartInstanceCtrl,
                resolve: {
                    totalCollide: function () {
                        return isTotal;
                    }
                }
            });
        };


        //function trigger other functions when click into body
        $scope.hideElements = function (obj) {
            $scope.hideSignInForm();
            $scope.closeCart();
            if (typeof $scope.hideSelectedGraphic !== 'undefined') {
                $scope.hideSelectedGraphic();
            }
            $rootScope.$broadcast("body-click",{element:obj.target});//added event of body click to trigger all
            //the lsiteners about body clicks.. like hide graphs in lookup_diary
        };

        $scope.changeLanguage = function(lang) {
           // $translate.refresh();
            $translate.use(lang);
            $translate.refresh();
            tmhDynamicLocale.set(lang);
        };

        //maps each page to a FAQ section. No mapping means going to the begining of the FAQ page
        $scope.faqMap = {
            "/home"                   : "contents",
            "/summary"                : "services",
            "/products_and_exchanges" : "services",
            "/detailed_description"   : "services",
            "/fundamentals"           : "services",
            "/professionals"          : "services",
            "/stocks"                 : "service_application",
            "/funds"                  : "service_application",
            "/etf_cfd"                : "service_application",
            "/futures"                : "service_application",
            "/pairs"                  : "service_application",
            "/advanced"               : "service_application",
            "/diversification"        : "service_application",
            "/products"               : "contents_and_prices",
            "/subscription_types"     : "contents_and_prices",
            "/prices"                 : "contents_and_prices",
            "/shopping_guide"         : "contents_and_prices",
            "/purchase"               : "contents_and_prices",
            "/free_subscription"      : "contents_and_prices",
            "/resources"              : "investor_tools",
            "/articles"               : "investor_tools",
            "/support"                : "contact",
            "/business"               : "contact",
            "/job"                    : "contact",
            "/localization"           : "contact"
        };

        $scope.goToFAQ = function() {
             var fromPath = $location.path().split("#")[0];
             var faqSection = $scope.faqMap[fromPath];
             $location.path("/faq");
             if (!(faqSection === null || faqSection === undefined)) {
                 $location.hash(faqSection);
             }
        };


        $scope.scrollPos = 0; // scroll position of each view
    })

    .directive("scroll", function ($window) {
        return function(scope, element, attrs) {
            angular.element($window).bind("scroll", function() {
                if (this.pageYOffset >= 150) {
                    scope.boolChangeClass = true;
                } else {
                    scope.boolChangeClass = false;
                }
                scope.$apply();
            });
        };
    })

    .directive('focusMe', function($timeout, $parse) {
      return {
        //scope: true,   // optionally create a child scope
        link: function(scope, element, attrs) {
          var model = $parse(attrs.focusMe);
          scope.$watch(model, function(value) {
            //console.log('value=',value);
            if(value === true) {
              $timeout(function() {
                element[0].focus();
              });
            }
          });
          // to address @blesh's comment, set attribute value to 'false'
          // on blur event:
          element.bind('blur', function() {
             //console.log('blur');
             scope.$apply(model.assign(scope, false));
          });
        }
      };
    })

    .directive('ngEnter', function() { //ng-enter='myFunction()' in a input for example will fire the myFunction when the user press enter..
        return function(scope, element, attrs) {
            element.bind("keydown keypress", function(event) {
                if(event.which === 13) {
                    scope.$apply(function(){
                        scope.$eval(attrs.ngEnter, {'event': event});
                    });

                    event.preventDefault();
                }
            });
        };
    })
/**
 * this directive triggers a function when the user do clicks in any element but not in this
 */
    .directive('clickAnywhereButHere', function($document){
        return {
            restrict: 'A',
            link: function(scope, elem, attr, ctrl) {
                elem.bind('click', function(e) {
                    e.stopPropagation();
                });
                $document.bind('click', function() {
                    scope.$apply(attr.clickAnywhereButHere);
                });
            }
        };
    })

/**
 * Directive for public nav
 */
    .directive('publicMenu',function ($compile, $rootScope,$window){
        return {
            controller: function($scope, $state){
                /**
                 * TODO: Replace this variable for a service
                 * @type {boolean}
                 */
                $scope.onMouseEnterMenu = function(idMenu, idSubmenu) {
                    $scope.actualMenu = idMenu;
                    $scope.actualSubmenu = idSubmenu;
                    $scope.selectSubmenu = '';
                };
                $scope.onMouseLeaveMenu = function() {
                    if ($state.current.data.selectMenu !== '' && $scope.actualMenu !== $state.current.data.selectMenu) {
                        $scope.actualMenu = $state.current.data.selectMenu;
                        $scope.actualSubmenu = $state.current.data.selectSubmenu;
                        $scope.actualItemSubmenu = $state.current.data.selectItemSubmenu;
                    }
                };
            },
            link: function($scope, element) {
               $scope.$watch('actualSubmenu', function(){});
               $scope.$watch('selectSubmenu', function(){});
               var isPresent = false;
                $scope.checkPublicStatus = function() {
                    if ($rootScope.isLog && !isPresent) {

                        if ($window.localStorage.expiredUser !== "true") {
                            //if not is a expiredUser, allow enter to my patterns (because is a normal user)
                            var itemPublicMenu = angular.element("<ul id=\"new-item-menu\" class=\"public-menu-logged\"><li id=\"my-patterns-nav\" class=\"nav-li seventh-item-menu\"" +
                                "ng-mouseenter=\"onMouseEnterMenu('my-patterns-nav','')\"" +
                                "ng-mouseleave=\"onMouseLeaveMenu()\"" +
                                "ng-class=\"{'item-nav-hover':actualMenu == 'my-patterns-nav'}\">" +
                                "<a ui-sref=\"my-patterns\">" +
                                "Mis Patrones" +
                                "</a></ul>");
                            element.append(itemPublicMenu);
                            isPresent = true;
                        }
                        $compile(element.contents())($scope);
                    }else if(!$rootScope.isLog && isPresent){
                        isPresent = false;
                        var itemmenu = angular.element(document.querySelector("#new-item-menu"));
                        itemmenu.remove();
                        //element.remove(itemmenu);
                        $compile(element.contents())($scope);
                    }
                };

               $scope.$watch('isLog', function(){
                   $scope.checkPublicStatus();
               });
                $scope.$on('userStatusChanged',function(){
                    $scope.checkPublicStatus();
                });
            },
            templateUrl:'layout_templates/public-menu.tpl.html'
        };
    })
    .directive('publicSubMenu',function (){
        return {
            controller: function($scope, $state){
                $scope.onMouseEnterSubmenu = function(idMenu, idSubmenu, idItemSubmenu) {
                    $scope.actualMenu = idMenu;
                    $scope.actualSubmenu = idSubmenu;
                    $scope.actualItemSubmenu = idItemSubmenu;
                };
                $scope.onMouseLeaveSubmenu = function () {
                    $scope.actualItemSubmenu = '';
                    if ($state.current.data.selectMenu !== '' && $scope.actualMenu !== $state.current.data.selectMenu) {
                        $scope.actualMenu = $state.current.data.selectMenu;
                        $scope.actualSubmenu = $state.current.data.selectSubmenu;
                        $scope.actualItemSubmenu = $state.current.data.selectItemSubmenu;
                    }
                };
                $scope.onClickSubmenu = function () {
                    $scope.actualMenu = '';
                    $scope.actualSubmenu = '';
                    $scope.actualItemSubmenu = '';
                };
                $scope.$on('$stateChangeSuccess', function (event, toState, toParams, fromState, fromParams) {
                    $scope.actualItemSubmenu = '';
                });
            },
            link: function($scope) {
                $scope.$watch('actualSubmenu', function(){});
                $scope.$watch('selectSubmenu', function(){});
            },
            templateUrl:'layout_templates/public-submenu.tpl.html'
        };
    })

    .directive('privateMenu',function (){
        return {
            controller: function($scope, $state,$window){
                $scope.onMouseEnterMenu = function(idMenu, idSubmenu) {
                    $scope.actualMenu = idMenu;
                    $scope.actualSubmenu = idSubmenu;
                };
                $scope.onMouseLeaveMenu = function() {
                    if ($state.current.data.selectMenu !== '' && $scope.actualMenu !== $state.current.data.selectMenu) {
                        $scope.actualMenu = $state.current.data.selectMenu;
                    }
                };
                $scope.onClickMenu = function () {
                    $scope.actualMenu = '';
                    $scope.actualSubmenu = '';
                    $scope.actualItemSubmenu = '';
                };


                $scope.checkPrivateStatus = function() {
                    $scope.expiredUser  =false;
                    if (typeof $window.localStorage.expiredUser !== "undefined") {
                        if ($window.localStorage.expiredUser === "true") {
                            $scope.expiredUser = true;
                        }
                    }
                };
                $scope.checkPrivateStatus();
                $scope.$on('userStatusChanged',function(event){
                    $scope.checkPrivateStatus();
                });

            },
            link: function($scope) {
            },
            templateUrl:'layout_templates/private-menu.tpl.html'
        };
    })

    .directive('privateSubMenu',function (){
        return {
            controller: function($scope, $state){
                $scope.onMouseEnterSubmenu = function(idMenu, idSubmenu, idItemSubmenu) {
                    $scope.actualMenu = idMenu;
                    $scope.actualSubmenu = idSubmenu;
                    $scope.actualItemSubmenu = idItemSubmenu;
                };
                $scope.onMouseLeaveSubmenu = function () {
                    $scope.actualItemSubmenu = '';
                    if ($state.current.data.selectMenu !== '' && $scope.actualMenu !== $state.current.data.selectMenu) {
                        $scope.actualMenu = $state.current.data.selectMenu;
                        $scope.actualSubmenu = $state.current.data.selectSubmenu;
                        $scope.actualItemSubmenu = $state.current.data.selectItemSubmenu;
                    }
                };
                $scope.onClickSubmenu = function () {
                    $scope.actualMenu = '';
                    $scope.actualSubmenu = '';
                    $scope.actualItemSubmenu = '';
                };
            },
            link: function($scope) {
                $scope.$watch('actualSubmenu', function(){});
                $scope.$watch('selectSubmenu', function(){});
            },
            templateUrl:'layout_templates/private-submenu.tpl.html'
        };
    })

/**
 * The flagbox directive is included in the header in order to change the language of the page.
 * TODO: Match functionality with selected i18n lib
 * */
    .directive('flagBox', function () {
        return {
            restrict: 'E',
            templateUrl: 'layout_templates/flags.tpl.html',
            controller: function($scope, $modal){
                $scope.openModal = function(idioma) {
                    $modal.open({
                        templateUrl: 'layout_templates/modal-flag.tpl.html',
                        controller: ModalFlagInstanceCtrl,
                        resolve: {
                            infoSelected: function () {
                                switch (idioma) {
                                    case 'English':
                                        return "Work in progress. Sorry for the inconvenience. Available in Spanish.";
                                    case 'Germany':
                                        return "Arbeiten im Gange. Sorry für die Unannehmlichkeiten. In Spanisch verfügbar.";
                                    case 'French':
                                        return "Travaux en cours. Excuser pour le désagrément. Actuellement disponible en espagnol.";
                                    case 'Japanese':
                                        return "進行中で働いています。ご迷惑をおかけして申し訳ありません。英語とスペイン語で、現在利用可能";
                                    case 'Chinese':
                                        return "工作进行中。很抱歉给您带来不便。目前在英语和西班牙语。";
                                }
                            }
                        }
                    });
                };
            }
        };
    })

    .directive('cart', function() {
        return{
            controller: function($scope,$rootScope,$window, $http, ShoppingCartService, ArrayContainItemService, $filter,$state,$q) {

                //catch the event submitcart to send the packs to buy, this event is launched by login form when the user logins to pay
                $scope.$on('goToSummaryPay', function() {
                    //$scope.submitCart();
                    $state.go('summary-pay');
                });
                //clear all cart items
                $scope.$on('removeItemsCart', function() {
                    //$scope.submitCart();
                    $scope.removeAllItemsCart();
                });
                //go to payment page
                $scope.$on('submitCart', function(event,paymentType){
                    if (paymentType === "EXPRESSCHECKOUT") {
                        //the expresscheckout submit the Cart with return to url payment
                        $scope.submitCart();
                    } else if (paymentType === "DIRECTPAYMENT") {
                        //payment with card
                        $state.go('pay-card');
                        return;
                    } else {
                        return;
                    }

                });
                //event from my subscription to add or delete from the cart a pack
                $scope.$on('toggleItemCart',function(event,pack) {
                    if (pack == null) {
                        return;
                    }
                    item= {code: pack.code ,
                            name: pack.name,
                            patternType: pack.patternType,
                            productType: pack.productType};
                    itemCart = $scope.existsPack(pack);
                    //set types
                    typeItem = "stocks";
                    typeItemNum = 0;
                    //need transform type product
                    switch (pack.productType){
                        case 'STOCK':
                            if (pack.patternType === "SIMPLE"){
                                typeItem = "stocks";
                                typeItemNum = 0;
                            }else{
                                typeItem = "pairs";
                                typeItemNum = 1;
                            }
                            break;
                        case 'INDICE':
                            if (pack.patternType === "SIMPLE") {
                                typeItem = "indices";
                                typeItemNum = 2;
                            }else{
                                typeItem = "pairsIndices";
                                typeItemNum = 3;
                            }
                            break;
                        case 'FUTURE':
                            typeItem="futures";
                            typeItemNum = 4;
                    }


                    if (itemCart != null) {

                        //remove the item from cart
                        $scope.removeItemCart(typeItem,itemCart);
                    } else {
                        //add it to the cart
                        duration = "Mensual";
                        if (pack.duration ===1 ) {
                            duration = "Trimestral";
                        } else if (pack.duration ===2) {
                            duration = "Anual";
                        }
                        $scope.addNewItemCart(item,pack.startDate,duration);
                    }

                });

                //change the durationItem from my subscriptions
                $scope.$on('changeDurationItem',function(event,pack) {
                    if (pack == null) {
                        return;
                    }
                    duration = "Mensual";
                    if (pack.duration ===1 ) {
                        duration = "Trimestral";
                    } else if (pack.duration ===2) {
                        duration = "Anual";
                    }
                    switch (pack.productType){
                        case 'STOCK':
                            if (pack.patternType === "SIMPLE"){
                                typeItem = "stocks";
                                typeItemNum = 0;
                            }else{
                                typeItem = "pairs";
                                typeItemNum = 1;
                            }
                            break;
                        case 'INDICE':
                            if (pack.patternType === "SIMPLE") {
                                typeItem = "indices";
                                typeItemNum = 2;
                            }else{
                                typeItem = "pairsIndices";
                                typeItemNum = 3;
                            }
                            break;
                        case 'FUTURE':
                            typeItem="futures";
                            typeItemNum = 4;
                    }
                    item =$scope.changeDurationItem(pack,duration);
                    $scope.changeDurationCart(item,typeItemNum);
                });

                //event that says to the cart what packs are subscribed, to check and put price 0
                //this is used when the user is not loged, add items to the cart and then log in.
                $scope.$on('updateSubscribedPacks',function(event,packs){
                    //first synchronize the service, then reload the cart
                    $scope.updateSubscribedCart(packs);
                });

                //funciton to update the cart (called by event)
                $scope.updateSubscribedCart = function(packs) {
                    ShoppingCartService.thisPacksAreSubscribed(packs);
                    $scope.stockItems = ShoppingCartService.obtainCartItems('stocks');
                    $scope.pairsItems = ShoppingCartService.obtainCartItems('pairs');
                    $scope.indicesItems = ShoppingCartService.obtainCartItems('indices');
                    $scope.pairsIndicesItems = ShoppingCartService.obtainCartItems('pairsIndices');
                    $scope.futuresItems = ShoppingCartService.obtainCartItems('futures');
                    $scope.totalCart = ShoppingCartService.obtainTotalCart();
                    $scope.numItemsCart = ShoppingCartService.obtainNumItemsCart();
                    $scope.subtotalStock = ShoppingCartService.obtainSubtotal('stocks');
                    $scope.subtotalPairs = ShoppingCartService.obtainSubtotal('pairs');
                    $scope.subtotalIndices = ShoppingCartService.obtainSubtotal('indices');
                    $scope.subtotalPairsIndices = ShoppingCartService.obtainSubtotal('pairsIndices');
                    $scope.subtotalFutures = ShoppingCartService.obtainSubtotal('futures');
                };



                //change the duration in the cart, and propagate to my subscriptions
                $scope.changeDurationFromCart = function(item,code,type) {
                    $rootScope.$broadcast('changeDurationFromCart',item);
                    //change all the prices and reload
                    $scope.changeDurationCart(item,type);
                };

                //the cart must dessapears in some views, so when the state is one of the list, the cart will be invisible to the user
                $scope.showCartinState=true;//show the cart by default
                $scope.$on('$stateChangeSuccess', function (event, toState, toParams, fromState, fromParams) {
                  //list of states where the cart is invisible
                    var states = ["summary-pay","pay-card","confirm-pay","confirm-pay-card"];
                    if (states.indexOf(toState.name) > -1) {
                        //the new state will not show the cart
                        $scope.showCartinState= false;
                    } else {
                        $scope.showCartinState = true;
                    }
                });

                //load the prices from server (monthly, trhee months and anual)
                $scope.prices = [29,82,313];//default price, dont worry if the server changes the price and doesnt work
                /*
                in that case the price will load the default prices in this JS, but in the previous step to pay, the right prices will load and showed to the user.
                the default prices is needed for the tests
                 */
                ShoppingCartService.getPrices().then(function(data) {
                    $scope.prices =   data;
                });

                $scope.numItemsCart = ShoppingCartService.obtainNumItemsCart();
                $scope.totalCart = ShoppingCartService.obtainTotalCart();
                $scope.showCart = false;
                $scope.subtotalStock = 0;
                $scope.subtotalPairs = 0;
                $scope.subtotalIndices = 0;
                $scope.subtotalPairsIndices = 0;
                $scope.subtotalFutures = 0;


                //By default we are going to load the cart from sessionStorage
                ShoppingCartService.loadSessionCart();
                $scope.stockItems = ShoppingCartService.obtainCartItems('stocks');
                $scope.pairsItems = ShoppingCartService.obtainCartItems('pairs');
                $scope.indicesItems = ShoppingCartService.obtainCartItems('indices');
                $scope.pairsIndicesItems = ShoppingCartService.obtainCartItems('pairsIndices');
                $scope.futuresItems = ShoppingCartService.obtainCartItems('futures');

                $scope.totalCart = ShoppingCartService.obtainTotalCart();
                $scope.numItemsCart = ShoppingCartService.obtainNumItemsCart();
                $scope.subtotalStock = ShoppingCartService.obtainSubtotal('stocks');
                $scope.subtotalPairs = ShoppingCartService.obtainSubtotal('pairs');
                $scope.subtotalIndices = ShoppingCartService.obtainSubtotal('indices');
                $scope.subtotalPairsIndices = ShoppingCartService.obtainSubtotal('pairsIndices');
                $scope.subtotalFutures = ShoppingCartService.obtainSubtotal('futures');

                //services from cart to my subscriptions

                $scope.getItems = function() {
                    return {
                        stocks: $scope.stockItems,
                        pairs: $scope.pairsItems,
                        index: $scope.indicesItems,
                        pairs_index: $scope.pairsIndicesItems,
                        futures: $scope.futuresItems
                    };
                };
                //the param pack is already in the cart? then return it
                $scope.existsPack = function(pack) {
                    startDate = $filter('date')(pack.startDate, 'MMMM yyyy');
                    if ((typeof $scope.stockItems != "undefined")) {
                        for (i=0;i<$scope.stockItems.length;i++) {
                            if (pack.code === $scope.stockItems[i].code) {
                               if (startDate === $scope.stockItems[i].startDate) {
                                    return $scope.stockItems[i];
                               }
                            }
                        }
                    }
                    if ((typeof $scope.pairsItems != "undefined")) {
                        for (i=0;i<$scope.pairsItems.length;i++) {
                            if (pack.code === $scope.pairsItems[i].code) {
                              if (startDate === $scope.pairsItems[i].startDate) {
                                    return $scope.pairsItems[i];
                               }
                            }
                        }
                    }
                    if ((typeof $scope.indicesItems != "undefined")) {
                        for (i=0;i<$scope.indicesItems.length;i++) {
                            if (pack.code === $scope.indicesItems[i].code) {
                                if (startDate === $scope.indicesItems[i].startDate) {
                                    return $scope.indicesItems[i];
                                }
                            }
                        }
                    }
                    if ((typeof $scope.pairsIndicesItems != "undefined")) {
                        for (i=0;i<$scope.pairsIndicesItems.length;i++) {
                            if (pack.code === $scope.pairsIndicesItems[i].code) {
                                if (startDate === $scope.pairsIndicesItems[i].startDate) {
                                    return $scope.pairsIndicesItems[i];
                                }
                            }
                        }
                    }
                    if ((typeof $scope.futuresItems != "undefined")) {
                        for (i=0;i<$scope.futuresItems.length;i++) {
                            if (pack.code === $scope.futuresItems[i].code) {
                                if (startDate === $scope.futuresItems[i].startDate) {
                                    return $scope.futuresItems[i];
                                }
                            }
                        }
                    }
                    return null;
                };

                //change a specific duration --NOTE: uncoment the dates comparations for make a distinct by startDate of same pack
                $scope.changeDurationItem = function(pack,duration) {
                    item = null;
                    startDate = $filter('date')(pack.startDate, 'MMMM yyyy');
                    if ((typeof $scope.stockItems != "undefined")) {
                        for (i=0;i<$scope.stockItems.length;i++) {
                            if (pack.code === $scope.stockItems[i].code) {
                               if (startDate === $scope.stockItems[i].startDate) {
                                    $scope.stockItems[i].duration = duration;
                                   item = $scope.stockItems[i];
                                }
                            }
                        }
                    }
                    if ((typeof $scope.pairsItems != "undefined")) {
                        for (i=0;i<$scope.pairsItems.length;i++) {
                            if (pack.code === $scope.pairsItems[i].code) {
                                if (startDate === $scope.pairsItems[i].startDate) {
                                    $scope.pairsItems[i].duration = duration;
                                    item = $scope.pairsItems[i];
                                 }
                            }
                        }
                    }
                    if ((typeof $scope.indicesItems != "undefined")) {
                        for (i=0;i<$scope.indicesItems.length;i++) {
                            if (pack.code === $scope.indicesItems[i].code) {
                                if (startDate === $scope.indicesItems[i].startDate) {
                                    $scope.indicesItems[i].duration = duration;
                                    item = $scope.indicesItems[i];
                                }
                            }
                        }
                    }
                    if ((typeof $scope.pairsIndicesItems != "undefined")) {
                        for (i=0;i<$scope.pairsIndicesItems.length;i++) {
                            if (pack.code === $scope.pairsIndicesItems[i].code) {
                                if (startDate === $scope.pairsIndicesItems[i].startDate) {
                                    $scope.pairsIndicesItems[i].duration = duration;
                                    item = $scope.pairsIndicesItems[i];
                                }
                            }
                        }
                    }
                    if ((typeof $scope.futuresItems != "undefined")) {
                        for (i=0;i<$scope.futuresItems.length;i++) {
                            if (pack.code === $scope.futuresItems[i].code) {
                                if (startDate === $scope.futuresItems[i].startDate) {
                                    $scope.futuresItems[i].duration = duration;
                                    item = $scope.futuresItems[i];
                                }
                            }
                        }
                    }
                    return item;
                };



                $scope.openCart = function () {
                   $scope.showCart = ShoppingCartService.openCart();
                };

                $scope.closeCart = function () {
                    $scope.showCart = ShoppingCartService.closeCart();
                };


                //addMore goes to home or my subscriptions and close the cart if is open
                $scope.addMore = function() {
                    $scope.toggleCart();
                    if ($state.current.name !== "my-subscriptions.my-subscriptions") {
                        $state.go("home");
                    }
                };



                //open/close cart
                $scope.toggleCart = function () {
                    if ($scope.showCart === true){
                        $scope.showCart = false;
                    }else{
                        $scope.showCart = true;
                    }
                };


                //if the cart was loaded from session and has items, it mus be opened
                if ($scope.numItemsCart > 0 ) {
                    $scope.openCart();
                }


                //remove the item from cart
                $scope.removeItemCart =  function (productType,item){
                    ShoppingCartService.removeItemCart(productType, item);
                    $scope.numItemsCart = ShoppingCartService.obtainNumItemsCart();
                    //test

                    $scope.subtotalStock = ShoppingCartService.obtainSubtotal('stocks');
                    $scope.subtotalPairs = ShoppingCartService.obtainSubtotal('pairs');
                    $scope.subtotalIndices = ShoppingCartService.obtainSubtotal('indices');
                    $scope.subtotalPairsIndices = ShoppingCartService.obtainSubtotal('pairsIndices');
                    $scope.subtotalFutures = ShoppingCartService.obtainSubtotal('futures');
                    $scope.stockItems = ShoppingCartService.obtainCartItems('stocks');
                    $scope.pairsItems = ShoppingCartService.obtainCartItems('pairs');
                    $scope.indicesItems = ShoppingCartService.obtainCartItems('indices');
                    $scope.pairsIndicesItems = ShoppingCartService.obtainCartItems('pairsIndices');
                    $scope.futuresItems = ShoppingCartService.obtainCartItems('futures');
                    $scope.totalCart = ShoppingCartService.obtainTotalCart();
                    /*test
                    $scope.subtotalStock -= item.price;
                    $scope.totalCart -= item.price;*/
                };


                //when the user makes a change of duration or adds a item to the cart, must check if exists other subs with the same pack
                //but different startDate to delete it if the 2 packs are not monthly
                $scope.deleteMultiplePacks = function (item) {
                    //the item is the changed item, so this is going to be saved, if exists other pack with same code, just delete it
                    code = item.code;
                    startDate = item.startDate;
                    for (i=0;i<$scope.stockItems.length;i++) {
                        if (($scope.stockItems[i].code == code) && (startDate != $scope.stockItems[i].startDate)) {
                            //the item found is the same code, but not same startDate, check if the two packs are monthly
                            if (!(item.duration === "Mensual" && ($scope.stockItems[i].duration === "Mensual"))){

                                $scope.removeItemFromCart('stocks',$scope.stockItems[i]);
                            }
                        }
                    }
                    //pairs
                    for (i=0;i<$scope.pairsItems.length;i++) {
                        if (($scope.pairsItems[i].code == code)&& (startDate != $scope.pairsItems[i].startDate)) {
                            //the item found is the same code, but not same startDate, check if the two packs are monthly
                            if (!(item.duration === "Mensual" && ($scope.pairsItems[i].duration === "Mensual"))) {
                                $scope.removeItemFromCart('pairs', $scope.pairsItems[i]);
                            }
                        }
                    }
                    //index
                    for (i=0;i<$scope.indicesItems.length;i++) {
                        if (($scope.indicesItems[i].code == code) && (startDate != $scope.indicesItems[i].startDate)) {
                            //the item found is the same code, but not same startDate, check if the two packs are monthly
                            if (!(item.duration === "Mensual" && ($scope.indicesItems[i].duration === "Mensual"))) {
                                $scope.removeItemFromCart('indices', $scope.indicesItems[i]);
                            }
                        }
                    }
                    //pairindex
                    for (i=0;i<$scope.pairsIndicesItems.length;i++) {
                        if (($scope.pairsIndicesItems[i].code == code) && (startDate != $scope.pairsIndicesItems[i].startDate)) {
                            //the item found is the same code, but not same startDate, check if the two packs are monthly
                            if (!(item.duration === "Mensual" && ($scope.pairsIndicesItems[i].duration === "Mensual"))) {
                                $scope.removeItemFromCart('pairsIndices', $scope.pairsIndicesItems[i]);
                            }
                        }
                    }
                    //futures
                    for (i=0;i<$scope.futuresItems.length;i++) {
                        if (($scope.futuresItems[i].code == code) && (startDate != $scope.futuresItems[i].startDate)) {
                            //the item found is the same code, but not same startDate, check if the two packs are monthly
                            if (!(item.duration === "Mensual" && ($scope.futuresItems[i].duration === "Mensual"))) {
                                $scope.removeItemFromCart('futures', $scope.futuresItems[i]);
                            }
                        }
                    }

                };


                //broadcast for my subscriptions
                $scope.removeItemFromCart =  function (productType,item){
                    $rootScope.$broadcast("removeItemFromCart",item);
                    $scope.removeItemCart(productType,item);
                };

                //change the duration of a element
                $scope.changeDurationCart = function(item,type){
                     code = item.code;
                    startDate = item.startDate;
                    switch (type) {
                        case 0: //stock
                            for (i=0;i<$scope.stockItems.length;i++) {
                                if (($scope.stockItems[i].code == code) && ($scope.stockItems[i].startDate == startDate)) {
                                    item = $scope.stockItems[i];
                                    switch ($scope.stockItems[i].duration) {
                                        case "Mensual":
                                            $scope.stockItems[i].price = $scope.stockItems[i].prices[0];
                                            break;
                                        case "Trimestral":
                                            $scope.stockItems[i].price = $scope.stockItems[i].prices[1];
                                            break;
                                        case "Anual":
                                            $scope.stockItems[i].price = $scope.stockItems[i].prices[2];
                                            break;
                                    }
                                    ShoppingCartService.changeDuration($scope.stockItems[i],type);
                                    break;
                                }
                            }
                            break;
                        case 1://pairs
                            for (i=0;i<$scope.pairsItems.length;i++) {
                                if (($scope.pairsItems[i].code == code) && ($scope.pairsItems[i].startDate == startDate)) {
                                    item = $scope.pairsItems[i];
                                    switch ($scope.pairsItems[i].duration) {
                                        case "Mensual":
                                            $scope.pairsItems[i].price = $scope.pairsItems[i].prices[0];
                                            break;
                                        case "Trimestral":
                                            $scope.pairsItems[i].price = $scope.pairsItems[i].prices[1];
                                            break;
                                        case "Anual":
                                            $scope.pairsItems[i].price = $scope.pairsItems[i].prices[2];
                                            break;
                                    }
                                    ShoppingCartService.changeDuration($scope.pairsItems[i],type);
                                    break;
                                }
                            }
                            break;
                        case 2://index
                            for (i=0;i<$scope.indicesItems.length;i++) {
                                if (($scope.indicesItems[i].code == code)&& ($scope.indicesItems[i].startDate == startDate)) {
                                    item = $scope.indicesItems[i];
                                    switch ($scope.indicesItems[i].duration) {
                                        case "Mensual":
                                            $scope.indicesItems[i].price = $scope.indicesItems[i].prices[0];
                                            break;
                                        case "Trimestral":
                                            $scope.indicesItems[i].price = $scope.indicesItems[i].prices[1];
                                            break;
                                        case "Anual":
                                            $scope.indicesItems[i].price = $scope.indicesItems[i].prices[2];
                                            break;
                                    }
                                    ShoppingCartService.changeDuration($scope.indicesItems[i],type);
                                    break;
                                }
                            }
                            break;
                        case 3://pairs index
                            for (i=0;i<$scope.pairsIndicesItems.length;i++) {
                                if (($scope.pairsIndicesItems[i].code == code)&& ($scope.pairsIndicesItems[i].startDate == startDate)) {
                                    item = $scope.pairsIndicesItems[i];
                                    switch ($scope.pairsIndicesItems[i].duration) {
                                        case "Mensual":
                                            $scope.pairsIndicesItems[i].price = $scope.pairsIndicesItems[i].prices[0];
                                            break;
                                        case "Trimestral":
                                            $scope.pairsIndicesItems[i].price = $scope.pairsIndicesItems[i].prices[1];
                                            break;
                                        case "Anual":
                                            $scope.pairsIndicesItems[i].price = $scope.pairsIndicesItems[i].prices[2];
                                            break;
                                    }
                                    ShoppingCartService.changeDuration($scope.pairsIndicesItems[i],type);
                                    break;
                                }
                            }
                            break;
                        case 4://futures
                            for (i=0;i<$scope.futuresItems.length;i++) {
                                if (($scope.futuresItems[i].code == code) && ($scope.futuresItems[i].startDate == startDate)) {
                                    item = $scope.futuresItems[i];
                                    switch ($scope.futuresItems[i].duration) {
                                        case "Mensual":
                                            $scope.futuresItems[i].price = $scope.futuresItems[i].prices[0];
                                            break;
                                        case "Trimestral":
                                            $scope.futuresItems[i].price = $scope.futuresItems[i].prices[1];
                                            break;
                                        case "Anual":
                                            $scope.futuresItems[i].price = $scope.futuresItems[i].prices[2];
                                            break;
                                    }
                                    ShoppingCartService.changeDuration($scope.futuresItems[i],type);
                                    break;
                                }
                            }
                            break;
                        default :
                            break;
                    }
                    $scope.totalCart = ShoppingCartService.obtainTotalCart();
                    $scope.subtotalStock = ShoppingCartService.obtainSubtotal('stocks');
                    $scope.subtotalPairs = ShoppingCartService.obtainSubtotal('pairs');
                    $scope.subtotalIndices = ShoppingCartService.obtainSubtotal('indices');
                    $scope.subtotalPairsIndices = ShoppingCartService.obtainSubtotal('pairsIndices');
                    $scope.subtotalFutures = ShoppingCartService.obtainSubtotal('futures');
                    $scope.deleteMultiplePacks(item);

                };


                /**
                 * get the prices of the server
                 */
                $scope.getPrices = function() {
                    ShoppingCartService.getPrices().then(function(data) {
                        $scope.prices =   data;
                    } );
                };

                /**
                 * TODO: replace enter parameter 'id' for 'item'
                 * @param id
                 */
                $scope.addNewItemCart = function(newItem, startDate,duration){
                    //$scope.stockItems = ShoppingCartService.obtainCartItems('stocks');
                    price = $scope.prices[2];
                       if (duration === "Mensual") {
                           price = $scope.prices[0];
                       } else if (duration ==="Trimestral") {

                           price = $scope.prices[1];
                       } else if (duration === "Anual") {
                           price = $scope.prices[2];
                       }
                    item = {
                        "code": newItem.code,
                        "packName": newItem.name,
                        "startDate": $filter('date')(startDate, 'MMMM yyyy'),
                        "duration": duration,
                        "price": price,
                        "date": $filter('date')(startDate, 'dd/MM/yyyy'),
                        "patternType": newItem.patternType,
                        "productType": newItem.productType,
                        prices: $scope.prices/*[29,82,313]*/
                    };

                    var totalList = [];
                    if ((typeof $scope.stockItems != "undefined")) {
                        totalList = totalList.concat($scope.stockItems);
                    }
                    if ((typeof $scope.pairsItems != "undefined")) {
                        totalList = totalList.concat($scope.pairsItems);
                    }
                    if ((typeof $scope.indicesItems != "undefined")) {
                        totalList = totalList.concat($scope.indicesItems);
                    }
                    if ((typeof $scope.pairsIndicesItems != "undefined")) {
                        totalList = totalList.concat($scope.pairsIndicesItems);
                    }
                    if ((typeof $scope.futuresItems != "undefined")) {
                        totalList = totalList.concat($scope.futuresItems);
                    }

                    //if the item isnt in the cart add
                    if (!ArrayContainItemService.containItem(totalList , item)) {
                        //if the status is that the user hast the pack, just add it
                            //we need to check if the user is subscribed to the actual item
                        if (typeof $window.localStorage.token !== "undefined"){
                            ShoppingCartService.hasSubscribedToThisPack(item,function(result){
                                var toAdd = true;
                                 if (result !== "") {
                                    if (result.status === "pack_active") {
                                        item.prices = [0,0,0];
                                        item.price = 0;
                                        item.active = true;
                                        $scope.openModalCartAdvice(true);
                                        toAdd=false;
                                    } else {
                                        prices = [$scope.prices[0], $scope.prices[1], $scope.prices[2]];
                                        month1Error = false;
                                        month3Error = false;
                                        month12Error = false;
                                        if (result.month !== "ok") {
                                            prices[0] = 0;
                                            month1Error = true;
                                        }
                                        if (result.trimestral !== "ok") {
                                            prices[1] = 0;
                                            month3Error = true;
                                        }
                                        if (result.year !== "ok") {
                                            prices[2] = 0;
                                            month12Error = true;
                                        }
                                        /*
                                         * We need check each duration, for auto-select a valid option in case of collition in the
                                         * subscriptions
                                         * */
                                        if (month1Error || month3Error || month12Error) {
                                            $scope.openModalCartAdvice(false);
                                            item.prices = prices;
                                            switch (item.duration) {
                                                case "Mensual":
                                                    //if the mensual duration of the item, check if is possible that duration,
                                                    //if not, check the next shorter duration, else the last option..
                                                    if (month1Error) {
                                                        if (!month3Error) {
                                                            item.duration = "Trimestral";
                                                            item.price = item.prices[1];
                                                        } else {
                                                            item.duration = "Anual";
                                                            item.price = item.prices[2];
                                                        }
                                                    }
                                                    item.price = item.prices[0];
                                                    break;
                                                case "Trimestral":
                                                    if (month3Error) {
                                                        if (!month1Error) {
                                                            item.duration = "Mensual";
                                                            item.price = item.prices[0];

                                                        } else {
                                                            item.duration = "Anual";
                                                            item.price = item.prices[2];

                                                        }

                                                    }
                                                    break;
                                                case "Anual":
                                                    if (month12Error) {
                                                        if (!month1Error) {
                                                            item.duration = "Mensual";
                                                            item.price = item.prices[0];

                                                        } else {
                                                            item.duration = "Trimestral";
                                                            item.price = item.prices[1];

                                                        }
                                                    }
                                                    break;
                                            }
                                        }
                                    }
                                 }
                                if (toAdd) {
                                    $rootScope.$broadcast("itemAddedToCart");

                                    //if not active pack with that user, add
                                    ShoppingCartService.addItemCart(item);
                                    $scope.stockItems = ShoppingCartService.obtainCartItems('stocks');
                                    $scope.pairsItems = ShoppingCartService.obtainCartItems('pairs');
                                    $scope.indicesItems = ShoppingCartService.obtainCartItems('indices');
                                    $scope.pairsIndicesItems = ShoppingCartService.obtainCartItems('pairsIndices');
                                    $scope.futuresItems = ShoppingCartService.obtainCartItems('futures');
                                    $scope.openCart();
                                    $scope.totalCart = ShoppingCartService.obtainTotalCart();
                                    $scope.numItemsCart = ShoppingCartService.obtainNumItemsCart();
                                    $scope.subtotalStock = ShoppingCartService.obtainSubtotal('stocks');
                                    $scope.subtotalPairs = ShoppingCartService.obtainSubtotal('pairs');
                                    $scope.subtotalIndices = ShoppingCartService.obtainSubtotal('indices');
                                    $scope.subtotalPairsIndices = ShoppingCartService.obtainSubtotal('pairsIndices');
                                    $scope.subtotalFutures = ShoppingCartService.obtainSubtotal('futures');
                                    $scope.deleteMultiplePacks(item);//check that other pack is not here

                                    //save the cart into session
                                    ShoppingCartService.saveSessionCart();
                                }


                            });

                        } else {
                            //is not logged, we add the item
                            ShoppingCartService.addItemCart(item);
                            $scope.stockItems = ShoppingCartService.obtainCartItems('stocks');
                            $scope.pairsItems = ShoppingCartService.obtainCartItems('pairs');
                            $scope.indicesItems = ShoppingCartService.obtainCartItems('indices');
                            $scope.pairsIndicesItems = ShoppingCartService.obtainCartItems('pairsIndices');
                            $scope.futuresItems = ShoppingCartService.obtainCartItems('futures');
                            $scope.openCart();
                            $scope.totalCart = ShoppingCartService.obtainTotalCart();
                            $scope.numItemsCart = ShoppingCartService.obtainNumItemsCart();
                            $scope.subtotalStock = ShoppingCartService.obtainSubtotal('stocks');
                            $scope.subtotalPairs = ShoppingCartService.obtainSubtotal('pairs');
                            $scope.subtotalIndices = ShoppingCartService.obtainSubtotal('indices');
                            $scope.subtotalPairsIndices = ShoppingCartService.obtainSubtotal('pairsIndices');
                            $scope.subtotalFutures = ShoppingCartService.obtainSubtotal('futures');
                            $scope.deleteMultiplePacks(item);//check that other pack is not here

                            //save the cart into session
                            ShoppingCartService.saveSessionCart();

                        }


                    }
                };
                $scope.removeAllItemsCart = function () {
                    ShoppingCartService.removeAllItemsCart();
                    $scope.stockItems = ShoppingCartService.obtainCartItems('stocks');
                    $scope.pairsItems = ShoppingCartService.obtainCartItems('pairs');
                    $scope.indicesItems = ShoppingCartService.obtainCartItems('indices');
                    $scope.pairsIndicesItems = ShoppingCartService.obtainCartItems('pairsIndices');
                    $scope.futuresItems = ShoppingCartService.obtainCartItems('futures');
                    $scope.totalCart = 0;
                    $scope.numItemsCart = 0;
                    $scope.subtotalStock = 0;
                };
                //go to payment page
                $scope.goToPay= function() {
                    token = $window.localStorage.token;
                    if ((token != null) && ($rootScope.isLog)) {
                        $state.go('summary-pay');
                    } else {
                        $state.go('new-subscription');
                    }
                };
                //makes the petition to Pay with Paypal
                $scope.submitCart = function () {
                    token = $window.localStorage.token;
                    if (token != null) {
                        //user logged, then can add packs


                        //the cart data to send, is not necessary keep the packs divided by type, with the Id we can recognize the type pattern in the server
                        dataCart = [];

                        //create the data to send
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

                        config = {
                            data: dataCart
                        };
                        return $http.post($rootScope.urlService+'/addpacks', config)
                            .success(function (data, status) {
                                //$scope.removeAllItemsCart();
                                $scope.callbackPurchase(data, status);
                            })
                            .error(function (data, status) {
                                $scope.callbackPurchase(data, status);
                            });
                    } else {
                        $state.go('new-subscription');
                    }
                };
                $scope.callbackPurchase = function (data){
                    /**TEST FOR REDIRECT TO PAYPAL*/
                    if (typeof data.urlRedirect !== "undefined") {
                        $window.location.href = data.urlRedirect;
                    } else {
                        $rootScope.$broadcast('errorPaypal');
                    }

                };
            },
            link: function ($scope) {
                $scope.$watch('stockItems', function(){});
                $scope.$watch('pairsItems', function(){});
                $scope.$watch('indicesItems', function(){});
                $scope.$watch('pairsIndicesItems', function(){});
                $scope.$watch('futuresItems', function(){});
                $scope.$watch('showCart', function(){});
                $scope.$watch('numItemsCart', function(){});
                $scope.$watch('totalCart', function(){});
                $scope.$watch('subtotalStock', function(){});
            },
            templateUrl: 'layout_templates/cart.tpl.html'
        };
    })
        //directive to add a delay to an action
    .directive('ngDelay', ['$timeout', function ($timeout) {
        return {
            restrict: 'A',
            scope: true,
            compile: function (element, attributes) {
                var expression = attributes['ngChange'];
                if (!expression) {
                    return;
                }

                var ngModel = attributes['ngModel'];
                if (ngModel) {
                    attributes['ngModel'] = '$parent.' + ngModel;
                }
                attributes['ngChange'] = '$$delay.execute()';

                return {
                    post: function (scope, element, attributes) {
                        scope.$$delay = {
                            expression: expression,
                            delay: scope.$eval(attributes['ngDelay']),
                            execute: function () {
                                var state = scope.$$delay;
                                state.then = Date.now();
                                $timeout(function () {
                                    if (Date.now() - state.then >= state.delay) {
                                        scope.$parent.$eval(expression);
                                    }
                                }, state.delay);
                            }
                        };
                    }
                };
            }
        };
    }])

    .service("ExpirationYearFromPatternName", function() {
        this.getExpirationYearFromPatternName = function(patternSymbol, entryDate) {
            var symbolYearMap = {};
            symbolYearMap['F'] = 0;
            symbolYearMap['G'] = 1;
            symbolYearMap['H'] = 2;
            symbolYearMap['J'] = 3;
            symbolYearMap['K'] = 4;
            symbolYearMap['M'] = 5;
            symbolYearMap['N'] = 6;
            symbolYearMap['Q'] = 7;
            symbolYearMap['U'] = 8;
            symbolYearMap['V'] = 9;
            symbolYearMap['X'] = 10;
            symbolYearMap['Z'] = 11;

            var expirationMonth = new Date(entryDate).getMonth();
            //The month is always the last char of the pattern's symbol
            var symbol = patternSymbol.slice(-1);

            if (symbol in symbolYearMap) {
                if (expirationMonth < symbolYearMap[symbol]) {
                    return "2015";
                }
                return "2014";
            }
            return "";
        };
    })

;
//modalPanel
 var ModalInstanceCtrl = function ($scope, $modalInstance, infoSelected) {
     $scope.infoSelected = infoSelected;
     $scope.close = function () {
        $modalInstance.close();
    };
 };

//modalPanel
var ModalCartInstanceCtrl = function ($scope, $modalInstance, $timeout,totalCollide) {
    $scope.totalCollide = totalCollide;
    $scope.opened = true;
    $scope.close = function () {
        if ($scope.opened) {
            $modalInstance.close();
            $scope.opened= false;
        }
    };
    $scope.$on("body-click",function(){$scope.close();});
   /* $timeout(function () {
        $scope.close();
    }, 3000);*/
};

//for flags
//modalPanel
var ModalFlagInstanceCtrl = function ($scope, $modalInstance, $timeout,infoSelected) {
    $scope.infoSelected = infoSelected;
    $scope.opened = true;
    $scope.close = function () {
        if ($scope.opened) {
            $modalInstance.close();
            $scope.opened= false;
        }
    };
    $timeout(function() {
        $scope.$on("body-click", function () {
            $scope.close();
        });
    },1000);
   // $scope.$on("body-click",function(){$scope.close();});
    /*$timeout(function () {
        $scope.close();
    }, 3000);*/
};


//generic panel for modals mode=success -> green mode=alert -> yellow mode=error -> red
//message -> internal message of the modal
//modalPanel
var GenericModalCtrl = function ($scope, $modalInstance, $timeout,$sce,mode,message) {
    $scope.message = $sce.trustAsHtml(message);//service to encode to HTml if necessary
    $scope.mode = mode;
    $scope.opened = true;
    $scope.close = function () {
        if ($scope.opened) {
            $modalInstance.close();
            $scope.opened= false;
        }
    };
    $timeout(function() { //the body click event will be in a 1sec timeout, the modal will be shown minimun 1 second
        $scope.$on("body-click",function(){
            $scope.close();
        },1000);
    });
    /*$timeout(function () {
        $scope.close();
    }, 3000);*/
};

var ExpiredModalCtrl = function ($scope, $modalInstance, $timeout,$sce,mode,message,AnchorLinkService) {
    $scope.message = $sce.trustAsHtml(message);//service to encode to HTml if necessary
    $scope.mode = mode;
    $scope.opened = true;
    $scope.scrollToTabs = function(){
        AnchorLinkService.scrollTo("tabsHome");
    };

    $scope.close = function () {
        if ($scope.opened) {
            $modalInstance.close();
            $scope.opened= false;
        }
    };
    $timeout(function() { //the body click event will be in a 1sec timeout, the modal will be shown minimun 1 second
        $scope.$on("body-click",function(){
            $scope.close();
        },1000);
    });
    /* $timeout(function () {
        $scope.close();
    }, 5000);*/
};
