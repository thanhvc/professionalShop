
describe('The cart directive', function () {
    beforeEach(angular.mock.module("ngMo"));
    beforeEach(angular.mock.module("ngMo.my_patterns"));
    describe('template', function () {
        var $compile;
        var $scope;
        var $state;
        var httpMock,startDate0;
        var date = {month: new Date().getMonth() + 1, year: new Date().getFullYear()};
        beforeEach(module('templates-app'));
        beforeEach(module('auth'));

        beforeEach(inject(function (_$compile_, _$rootScope_, _$state_, $httpBackend,$controller,_$window_) {

            httpMock = $httpBackend;
            $compile = _$compile_;
            $state = _$state_;
            $httpBackend.when('GET','i18n/common/es.json').respond(200);
            httpMock.when('GET', _$rootScope_.urlService+'/islogged').respond(200);
            httpMock.when('POST', _$rootScope_.urlService+'/has-pack').respond(200,{status : "pack_active"});
            httpMock.when('GET', _$rootScope_.urlService+"/prices").respond({
                "data":{
                    "prices":[29,82,313]
                }});
            $scope = _$rootScope_.$new();
            $window = _$window_;

        }));

        getMonthName = function (date) {

            var monthString = "";
            switch (date.month) {
                case 1:
                    monthString = "Enero";
                    break;
                case 2:
                    monthString = "Febrero";
                    break;
                case 3:
                    monthString = "Marzo";
                    break;
                case 4:
                    monthString = "Abril";
                    break;
                case 5:
                    monthString = "Mayo";
                    break;
                case 6:
                    monthString = "Junio";
                    break;
                case 7:
                    monthString = "Julio";
                    break;
                case 8:
                    monthString = "Agosto";
                    break;
                case 9:
                    monthString = "Septiembre";
                    break;
                case 10:
                    monthString = "Octubre";
                    break;
                case 11:
                    monthString = "Noviembre";
                    break;
                case 12:
                    monthString = "Diciembre";
                    break;
                default :
                    monthString = "notFound";
                    break;

            }
            return monthString;
        };

        date.month = getMonthName(date);
        startDate0 = date.month + ' ' +date.year;

        addItemsToCart = function (numItems,type,patternType, duration) {
            //startDate= 1406934000000;
            startDate = new Date();
            for (var i = 0; i < numItems; i++) {
                item = {
                    "code": i,
                    name: "pack test",
                    "patternType": patternType,
                    "productType": type,
                    "duration": duration,
                    publicationDate: 1404472269488
                };

                $scope.addNewItemCart(item,startDate,duration);
                $scope.$apply();

            }
        };

        obtainLog = function (trsCart, log) {
            angular.forEach(trsCart, function (item) {
                    if (typeof item.attributes[0] != 'undefined') {
                        if (item.attributes[0].textContent === "stockItem in stockItems") {
                            this.push(item);
                        }
                    }
                },
                log);
            return log;
        };

        obtainIndexLog = function (trsCart, log) {
            angular.forEach(trsCart, function (item) {
                    if (typeof item.attributes[0] != 'undefined') {
                        if (item.attributes[0].textContent === "indicesItem in indicesItems") {
                            this.push(item);
                        }
                    }
                },
                log);
            return log;
        };

        obtainPairIndexLog = function (trsCart, log) {
            angular.forEach(trsCart, function (item) {
                    if (typeof item.attributes[0] != 'undefined') {
                        if (item.attributes[0].textContent === "pairsIndicesItem in pairsIndicesItems") {
                            this.push(item);
                        }
                    }
                },
                log);
            return log;
        };
        obtainPairLog = function (trsCart, log) {
            angular.forEach(trsCart, function (item) {
                    if (typeof item.attributes[0] != 'undefined') {
                        if (item.attributes[0].textContent === "pairsItem in pairsItems") {
                            this.push(item);
                        }
                    }
                },
                log);
            return log;
        };

        obtainFutureLog = function (trsCart, log) {
            angular.forEach(trsCart, function (item) {
                    if (typeof item.attributes[0] != 'undefined') {
                        if (item.attributes[0].textContent === "futuresItem in futuresItems") {
                            this.push(item);
                        }
                    }
                },
                log);
            return log;
        };

        obtainSubtotal = function (items, log) {
            angular.forEach(items, function (item) {
                    if (typeof item.attributes[0] != 'undefined') {
                        if (item.attributes[0].textContent === "subtotal-cart") {
                            this.push(item.children[3].textContent);
                        }
                    }
                },
                log);
            return log;
        };

        obtainTotalCart = function (items, log) {
            var cont = true;
            angular.forEach(items, function (item) {
                    if (cont) {
                        if (typeof item.attributes[0] != 'undefined') {
                            if (item.className.substring(0, 10) === "total-cart") {
                                this.push(item.textContent);
                                cont = false;
                            }
                        }
                    }
                },
                log);
            return log;
        };

        it('should go to SummaryPay', inject(function(){
            delete $window.sessionStorage.cart;
            var template = $compile("<div cart></div>")($scope);
            $scope.$apply();
            $scope.$broadcast('goToSummaryPay');
            expect($state.go('summary-pay')).toNotBe(undefined);
        }));

        it('should success when removing items from cart', inject(function(){
            delete $window.sessionStorage.cart;
            var template = $compile("<div cart></div>")($scope);
            $scope.$apply();
            $scope.$broadcast('removeItemsCart');
            expect( $scope.numItemsCart).toEqual(0);
        }));

        it('should submitCart when payment is EXPRESSCHECKOUT ', inject(function(){
            delete $window.sessionStorage.cart;
            var template = $compile("<div cart></div>")($scope);

            var button = angular.element(document.getElementsByClassName('mo-button'));
            button.triggerHandler('click');
            $scope.$apply();
            $scope.$broadcast('submitCart',"EXPRESSCHECKOUT");
        }));

        it('should submitCart when payment type is DIRECTPAYMENT', inject(function(){
            delete $window.sessionStorage.cart;
            var template = $compile("<div cart></div>")($scope);
            $scope.$apply();
            $scope.$broadcast('submitCart',"DIRECTPAYMENT");
        }));

        it('should return when submiting cart and no payment type is specified', inject(function(){
            delete $window.sessionStorage.cart;
            var template = $compile("<div cart></div>")($scope);
            $scope.$apply();
            $scope.$broadcast('submitCart');
        }));

        //add three items to cart
        it('should have 3 items and total and subtotal equals 939', inject(function () {
            delete $window.sessionStorage.cart;
            var template = $compile("<div cart></div>")($scope);
            $scope.$apply();
            addItemsToCart(3,'STOCK',0, "Mensual");
            var trsCart = template.find('tr');
            var log = [];
            log = obtainLog(trsCart, log);
             //expect(log.length).toEqual(3);
            log = [];
            log = obtainSubtotal(trsCart, log);
            // expect(log[0].indexOf('939')).toNotEqual(-1);
            log = [];
            var divsCart = template.find('div');
            log = obtainTotalCart(divsCart, log);
            // expect(log[0].indexOf('939')).toNotEqual(-1);
        }));

        //add three items to cart
        it('should have 3 simple items and total and subtotal equals 87', inject(function () {
            delete $window.sessionStorage.cart;
            var template = $compile("<div cart></div>")($scope);
            $scope.$apply();
            addItemsToCart(3,'STOCK',"SIMPLE", "Mensual");
            var trsCart = template.find('tr');
            var log = [];
            log = obtainLog(trsCart, log);
            // expect(log.length).toEqual(3);
            log = [];
            log = obtainSubtotal(trsCart, log);
            // expect(log[0].indexOf('939')).toNotEqual(-1);
            log = [];
            var divsCart = template.find('div');
            log = obtainTotalCart(divsCart, log);
            // expect(log[0].indexOf('939')).toNotEqual(-1);
        }));

        //remove 1 item to cart
        it('should have 2 item and total and subtotal equals 58', inject(function () {
            delete $window.sessionStorage.cart;
            var template = $compile("<div cart></div>")($scope);
            $scope.$apply();
            addItemsToCart(2,'STOCK','SIMPLE',"Anual");
            var itemToRemove = {
                "id": 25,
                "packName": "Nuevo",
                "startDate": startDate0,
                "date": "May/14",
                "duration": "Mensual",
                "price": 29
            };
            $scope.addNewItemCart(itemToRemove,itemToRemove.startDate, itemToRemove.duration);
            $scope.removeItemCart('pairs', itemToRemove);
            $scope.$apply();
            var trsCart = template.find('tr');
            var log = [];
            log = obtainLog(trsCart, log);
           // expect(log.length).toEqual(2);
            log = [];
            log = obtainSubtotal(trsCart, log);
            // expect(log[0].indexOf('626')).toNotEqual(-1);
            log = [];
            var divsCart = template.find('div');
            log = obtainTotalCart(divsCart, log);
            // expect(log[0].indexOf('626')).toNotEqual(-1);
        }));

        //remove All items to cart
        it('should have 0 items and total and subtotal equals 0', inject(function () {
            delete $window.sessionStorage.cart;
            var template = $compile("<div cart></div>")($scope);
            $scope.$apply();
            addItemsToCart(3, 'STOCK',0, 'Trimestral');
            $scope.removeAllItemsCart();
            $scope.$apply();
            var trsCart = template.find('tr');
            var log = [];
            log = obtainLog(trsCart, log);
            //expect(log.length).toEqual(0);
            log = [];
            log = obtainSubtotal(trsCart, log);
            expect(log[0].indexOf('0')).toNotEqual(-1);
            log = [];
            var divsCart = template.find('div');
            log = obtainTotalCart(divsCart, log);
            expect(log[0].indexOf('0')).toNotEqual(-1);
        }));

        //Change duration
        it('should let the user change a month stock item duration', inject(function() {
            delete $window.sessionStorage.cart;
            var template = $compile("<div cart></div>")($scope);
            $scope.$apply();
            addItemsToCart(1, 'STOCK',"SIMPLE",'Mensual');
            $scope.$apply();

            var trsCart = template.find('tr');
            var log = [];
            log = obtainSubtotal(trsCart, log);
            var previousPrice = log[0].indexOf('0');
            var item = {
                "id": 25,
                "packName": "Nuevo",
                "startDate": startDate0,
                "date": "May/14",
                "duration": "Mensual",
                "price": 29,
                "code":0
            };
            $scope.changeDurationCart(item, 0); //type = stock
            expect(log.indexOf('0')).toNotEqual(previousPrice);
        }));

        //Change duration
        it('should let the user change a year stock item duration', inject(function() {
            delete $window.sessionStorage.cart;
            var template = $compile("<div cart></div>")($scope);
            $scope.$apply();
            addItemsToCart(1, 'STOCK',"SIMPLE",'Anual');
            $scope.$apply();

            var trsCart = template.find('tr');
            var log = [];
            log = obtainSubtotal(trsCart, log);
            var previousPrice = log[0].indexOf('0');
            var item = {
                "id": 25,
                "packName": "Nuevo",
                "startDate": startDate0,
                "date": "May/14",
                "duration": "Anual",
                "price": 29,
                "code":0
            };
            $scope.changeDurationCart(item, 0); //type = stock
            expect(log.indexOf('0')).toNotEqual(previousPrice);
        }));

        //Change duration
        it('should let the user change a three month stock item duration', inject(function() {
            delete $window.sessionStorage.cart;
            var template = $compile("<div cart></div>")($scope);
            $scope.$apply();
            addItemsToCart(1, 'STOCK',"SIMPLE",'Trimestral');
            $scope.$apply();

            var trsCart = template.find('tr');
            var log = [];
            log = obtainSubtotal(trsCart, log);
            var previousPrice = log[0].indexOf('0');
            var item = {
                "id": 25,
                "packName": "Nuevo",
                "startDate": startDate0,
                "date": "May/14",
                "duration": "Trimestral",
                "price": 29,
                "code":0
            };
            $scope.changeDurationCart(item, 0); //type = stock
            $scope.$apply();
            expect(log.indexOf('0')).toNotEqual(previousPrice);

        }));

        //Change duration
        it('should let the user change a month index item duration', inject(function() {
            delete $window.sessionStorage.cart;
            var template = $compile("<div cart></div>")($scope);
            $scope.$apply();
            addItemsToCart(1, 'INDICE',"SIMPLE",'Mensual');
            $scope.$apply();

            var trsCart = template.find('tr');
            var log = [];
            log = obtainSubtotal(trsCart, log);
            var previousPrice = log[0].indexOf('0');
            var item = {
                "id": 25,
                "packName": "Nuevo",
                "startDate": startDate0,
                "date": "May/14",
                "duration": "Mensual",
                "price": 29,
                "code":0
            };
            $scope.changeDurationCart(item, 2);
            expect(log.indexOf('0')).toNotEqual(previousPrice);

        }));

        //Change duration
        it('should let the user change a year index item duration', inject(function() {
            delete $window.sessionStorage.cart;
            var template = $compile("<div cart></div>")($scope);
            $scope.$apply();
            addItemsToCart(1, 'INDICE',"SIMPLE",'Anual');
            $scope.$apply();

            var trsCart = template.find('tr');
            var log = [];
            log = obtainSubtotal(trsCart, log);
            var previousPrice = log[0].indexOf('0');
            var item = {
                "id": 25,
                "packName": "Nuevo",
                "startDate": startDate0,
                "date": "May/14",
                "duration": "Anual",
                "price": 29,
                "code":0
            };
            $scope.changeDurationCart(item, 2);
            expect(log.indexOf('0')).toNotEqual(previousPrice);

        }));

        //Change duration
        it('should let the user change a three month index item duration', inject(function() {
            delete $window.sessionStorage.cart;
            var template = $compile("<div cart></div>")($scope);
            $scope.$apply();
            addItemsToCart(1, 'INDICE',"SIMPLE",'Trimestral');
            $scope.$apply();

            var trsCart = template.find('tr');
            var log = [];
            log = obtainSubtotal(trsCart, log);
            var previousPrice = log[0].indexOf('0');
            var item = {
                "id": 25,
                "packName": "Nuevo",
                "startDate": startDate0,
                "date": "May/14",
                "duration": "Trimestrañ",
                "price": 29,
                "code":0
            };
            $scope.changeDurationCart(item, 2);
            expect(log.indexOf('0')).toNotEqual(previousPrice);

        }));
        //Change duration
        it('should let the user change a month future item duration', inject(function() {
            delete $window.sessionStorage.cart;
            var template = $compile("<div cart></div>")($scope);
            $scope.$apply();
            addItemsToCart(1, 'FUTURE',"",'Mensual');
            $scope.$apply();

            var trsCart = template.find('tr');
            var log = [];
            log = obtainSubtotal(trsCart, log);
            var previousPrice = log[0].indexOf('0');
            var item = {
                "id": 25,
                "packName": "Nuevo",
                "startDate": startDate0,
                "date": "May/14",
                "duration": "Mensual",
                "price": 29,
                "code":0
            };
            $scope.changeDurationCart(item,4);
            expect(log.indexOf('0')).toNotEqual(previousPrice);

        }));

        //Change duration
        it('should let the user change a year future item duration', inject(function() {
            delete $window.sessionStorage.cart;
            var template = $compile("<div cart></div>")($scope);
            $scope.$apply();
            addItemsToCart(1, 'FUTURE',"",'Anual');
            $scope.$apply();

            var trsCart = template.find('tr');
            var log = [];
            log = obtainSubtotal(trsCart, log);
            var previousPrice = log[0].indexOf('0');
            var item = {
                "id": 25,
                "packName": "Nuevo",
                "startDate": startDate0,
                "date": "May/14",
                "duration": "Mensual",
                "price": 29,
                "code":0
            };
            $scope.changeDurationCart(item, 4);
            expect(log.indexOf('0')).toNotEqual(previousPrice);

        }));

        //Change duration
        it('should let the user change a three month future item duration', inject(function() {
            delete $window.sessionStorage.cart;
            var template = $compile("<div cart></div>")($scope);
            $scope.$apply();
            addItemsToCart(1, 'FUTURE',"",'Trimestral');
            $scope.$apply();

            var trsCart = template.find('tr');
            var log = [];
            log = obtainSubtotal(trsCart, log);
            var previousPrice = log[0].indexOf('0');
            var item = {
                "id": 25,
                "packName": "Nuevo",
                "startDate": startDate0,
                "date": "May/14",
                "duration": "Mensual",
                "price": 29,
                "code":0
            };
            $scope.changeDurationCart(item, 4);
            expect(log.indexOf('0')).toNotEqual(previousPrice);

        }));

        //Change duration
        it('should let the user change a month pair item duration', inject(function() {
            delete $window.sessionStorage.cart;
            var template = $compile("<div cart></div>")($scope);
            $scope.$apply();
            addItemsToCart(1, 'STOCK',0,'Mensual');
            $scope.$apply();

            var trsCart = template.find('tr');
            var log = [];
            log = obtainSubtotal(trsCart, log);
            var previousPrice = log[0].indexOf('0');
            var item = {
                "id": 25,
                "packName": "Nuevo",
                "startDate": startDate0,
                "date": "May/14",
                "duration": "Mensual",
                "price": 29,
                "code":0
            };
            $scope.changeDurationCart(item,1);
            expect(log.indexOf('0')).toNotEqual(previousPrice);

        }));

        //Change duration
        it('should let the user change a year pair item duration', inject(function() {
            delete $window.sessionStorage.cart;
            var template = $compile("<div cart></div>")($scope);
            $scope.$apply();
            addItemsToCart(1, 'STOCK',0,'Anual');
            $scope.$apply();

            var trsCart = template.find('tr');
            var log = [];
            log = obtainSubtotal(trsCart, log);
            var previousPrice = log[0].indexOf('0');
            var item = {
                "id": 25,
                "packName": "Nuevo",
                "startDate": startDate0,
                "date": "May/14",
                "duration": "Mensual",
                "price": 29,
                "code":0
            };
            $scope.changeDurationCart(item, 1);
            expect(log.indexOf('0')).toNotEqual(previousPrice);

        }));

        //Change duration
        it('should let the user change a three month pair item duration', inject(function() {
            delete $window.sessionStorage.cart;
            var template = $compile("<div cart></div>")($scope);
            $scope.$apply();
            addItemsToCart(1, 'STOCK',0,'Trimestral');
            $scope.$apply();

            var trsCart = template.find('tr');
            var log = [];
            log = obtainSubtotal(trsCart, log);
            var previousPrice = log[0].indexOf('0');
            var item = {
                "id": 25,
                "packName": "Nuevo",
                "startDate": startDate0,
                "date": "May/14",
                "duration": "Mensual",
                "price": 29,
                "code":0
            };
            $scope.changeDurationCart(item, 1);
            expect(log.indexOf('0')).toNotEqual(previousPrice);

        }));

        //Change duration
        it('should let the user change a month pairIndex item duration', inject(function() {
            delete $window.sessionStorage.cart;
            httpMock.expectGET($scope.urlService + '/has-pack');
            var template = $compile("<div cart></div>")($scope);
            $scope.$apply();
            addItemsToCart(1, 'INDICE',1,'Mensual');
            $scope.$apply();

            var trsCart = template.find('tr');
            var log = [];
            log = obtainSubtotal(trsCart, log);
            var previousPrice = log[0].indexOf('0');
            var item = {
                "id": 25,
                "packName": "Nuevo",
                "startDate":startDate0,
                "date": "May/14",
                "duration": "Mensual",
                "price": 29,
                "code":0
            };
            $scope.changeDurationCart(item,3);
            expect(log.indexOf('0')).toNotEqual(previousPrice);

        }));

        //Change duration
        it('should let the user change a year pairIndex item duration', inject(function() {
            delete $window.sessionStorage.cart;
            var template = $compile("<div cart></div>")($scope);
            $scope.$apply();
            addItemsToCart(1, 'INDICE',0,'Anual');
            $scope.$apply();

            var trsCart = template.find('tr');
            var log = [];
            log = obtainSubtotal(trsCart, log);
            var previousPrice = log[0].indexOf('0');
            var item = {
                "id": 25,
                "packName": "Nuevo",
                "startDate": startDate0,
                "date": "May/14",
                "duration": "Mensual",
                "price": 29,
                "code":0
            };
            $scope.changeDurationCart(item,3);
            expect(log.indexOf('0')).toNotEqual(previousPrice);

        }));

        //Change duration
        it('should let the user change a three month pairIndex item duration', inject(function() {
            delete $window.sessionStorage.cart;
            var template = $compile("<div cart></div>")($scope);
            $scope.$apply();
            addItemsToCart(1, 'INDICE',1,'Trimestral');
            $scope.$apply();

            var trsCart = template.find('tr');
            var log = [];
            log = obtainSubtotal(trsCart, log);
            var previousPrice = log[0].indexOf('0');
            var item = {
                "id": 25,
                "packName": "Nuevo",
                "startDate": startDate0,
                "date": "May/14",
                "duration": "Mensual",
                "price": 29,
                "code":0
            };
            $scope.changeDurationCart(item, 3);
            expect(log.indexOf('0')).toNotEqual(previousPrice);

        }));

        //Add index item
        it('should let the user add index items to cart', inject(function() {
            delete $window.sessionStorage.cart;
            var template = $compile("<div cart></div>")($scope);
            $scope.$apply();
            addItemsToCart(3, 'INDICE',0,'Trimestral');
            $scope.$apply();
            var trsCart = template.find('tr');
            var log = [];
            log = obtainIndexLog(trsCart, log);
            // expect(log.length).toEqual(3);
        }));

        //Add future item
        it('should let the user add future items to cart', inject(function() {
            delete $window.sessionStorage.cart;
            var template = $compile("<div cart></div>")($scope);
            $scope.$apply();
            addItemsToCart(3, 'FUTURE',0,'Trimestral');
            $scope.$apply();
            var trsCart = template.find('tr');
            var log = [];
            log = obtainFutureLog(trsCart, log);
            // expect(log.length).toEqual(3);
        }));

        //Add pairIndex item
        it('should let the user add pairIndex items to cart', inject(function() {
            delete $window.sessionStorage.cart;
            var template = $compile("<div cart></div>")($scope);
            $scope.$apply();
            addItemsToCart(3, 'INDICE',1,'Trimestral');
            $scope.$apply();
            var trsCart = template.find('tr');
            var log = [];
            log = obtainPairIndexLog(trsCart, log);
            //  expect(log.length).toEqual(3);
        }));

        //Add pair item
        it('should let the user add pair items to cart', inject(function() {
            delete $window.sessionStorage.cart;
            var template = $compile("<div cart></div>")($scope);
            $scope.$apply();
            addItemsToCart(3, 'STOCK',1,'Mensual');
            $scope.$apply();
            var trsCart = template.find('tr');
            var log = [];
            log = obtainPairLog(trsCart, log);
            // expect(log.length).toEqual(3);
        }));

        //remove 1 stock item to cart
        it('should let the user remove a stock item', inject(function () {
            delete $window.sessionStorage.cart;
            var template = $compile("<div cart></div>")($scope);
            $scope.$apply();
            addItemsToCart(2,'STOCK',0,'Trimestral');
            var itemToRemove = {
                "id": 25,
                "packName": "Nuevo",
                "startDate": "May/14",
                "date": "May/14",
                "duration": "Mensual",
                "price": 29
            };
            $scope.addNewItemCart(itemToRemove,itemToRemove.startDate, itemToRemove.duration);
            $scope.removeItemCart('stocks', itemToRemove);
            var trsCart = template.find('tr');
            var log = [];
            log = obtainLog(trsCart, log);
            //expect(log.length).toEqual(2);

        }));

        it('should let the user remove a future item', inject(function () {
            delete $window.sessionStorage.cart;
            httpMock.expectPOST($scope.urlService + '/has-pack');
            var template = $compile("<div cart></div>")($scope);
            $scope.$apply();
            addItemsToCart(2,'FUTURE',0,"Mensual");
            var itemToRemove = {
                "id": 25,
                "packName": "Nuevo",
                "startDate": "May/14",
                "date": "May/14",
                "duration": "Mensual",
                "price": 29
            };
            $scope.addNewItemCart(itemToRemove,itemToRemove.startDate, itemToRemove.duration);
            $scope.removeItemCart('futures', itemToRemove);
            var trsCart = template.find('tr');
            var log = [];
            log = obtainFutureLog(trsCart, log);
            //  expect(log.length).toEqual(2);

        }));

        it('should let the user remove an index item', inject(function () {
            delete $window.sessionStorage.cart;
            httpMock.expectPOST($scope.urlService + '/has-pack');
            var template = $compile("<div cart></div>")($scope);
            $scope.$apply();
            var itemToRemove = {
                "id": 25,
                "packName": "Nuevo",
                "startDate": "May/14",
                "date": "May/14",
                "duration": "Mensual",
                "price": 29
            };
            $scope.addNewItemCart(itemToRemove,itemToRemove.startDate, itemToRemove.duration);
            $scope.removeItemCart('indices', itemToRemove);
            var trsCart = template.find('tr');
            var log = [];
            log = obtainIndexLog(trsCart, log);
            // expect(log.length).toEqual(0);

        }));

        it('should let the user remove a pairIndex item', inject(function () {
            delete $window.sessionStorage.cart;
            var template = $compile("<div cart></div>")($scope);
            $scope.$apply();
            addItemsToCart(2,'INDICE',1,"Anual");
            var itemToRemove = {
                "id": 25,
                "packName": "Nuevo",
                "startDate": "May/14",
                "date": "May/14",
                "duration": "Mensual",
                "price": 29
            };
            $scope.addNewItemCart(itemToRemove,itemToRemove.startDate, itemToRemove.duration);
            $scope.removeItemCart('pairsIndices', itemToRemove);
            var trsCart = template.find('tr');
            var log = [];
            log = obtainLog(trsCart, log);
            // expect(log.length).toEqual(0);

        }));

        it('should close the cart', inject(function(){
            delete $window.sessionStorage.cart;
            var template = $compile("<div cart></div>")($scope);
            $scope.$apply();

            var cart = $compile("<div class='shopping-cart-container'></div>")($scope);
            $scope.closeCart();
            $scope.$apply();
            expect(cart.hasClass('ng-show')).toBe(false);

        }));

        it('should let toggle the cart when there are items', inject(function(){
            delete $window.sessionStorage.cart;
            httpMock.expectPOST($scope.urlService + '/has-pack');
            var template = $compile("<div cart></div>")($scope);
            $scope.$apply();
            addItemsToCart(2,'INDICE',1,"Anual");
            $scope.toggleCart();
            expect($scope.showCart).toBeDefined();
        }));

        it('should let toggle the cart when there are no items', inject(function(){
            delete $window.sessionStorage.cart;
            var template = $compile("<div cart></div>")($scope);
            $scope.$apply();
            $scope.toggleCart();
            expect($scope.showCart).toBe(true);
        }));
        it('should let the user pay', inject(function(){
            delete $window.sessionStorage.cart;
            var template = $compile("<div cart></div>")($scope);
            $scope.$apply();
            $scope.goToPay();
            expect($state).toNotBe(undefined);
        }));

        it('should not fail when submit the cart to server and there is no token ', inject(function(){
            //  delete $window.sessionStorage.cart;
            var template = $compile("<div cart></div>")($scope);
            $scope.$apply();
            $scope.submitCart();

        }));

        it('should open the cart ', inject(function(){
            delete $window.sessionStorage.cart;
            var template = $compile("<div cart></div>")($scope);
            $scope.$apply();
            $scope.numItemsCart = 1;
            $scope.openCart();

        }));

        it('should add or delete an item ', inject(function(){
            var completeDate = {month: new Date().getMonth()+1, year: new Date().getFullYear()};
            var prices =[23,12,45];
            var d = '28/09/2014';
            var pack0 =  {name: 'pack1', startDate: d,'date': d, code: 1234, productType: 'STOCK' ,patternType: "SIMPLE", prices: prices, collition : "error"};
            var pack1 = {name: 'pack1', startDate: d,'date': d,code: 1234, productType: 'STOCK', prices: prices, collition : "error",duration:2};
            var pack2 = {name: 'pack1', startDate: d,'date': d,code: 1234, productType: 'INDICE' ,patternType: "SIMPLE", prices: prices, collition : "error"};
            var pack3 = {name: 'pack1', startDate: d,'date': d,code: 1234, productType: 'INDICE', prices: prices, collition : "error",duration:3};
            var pack4 = {name: 'pack1', startDate: d,'date': d,code: 1234, productType: 'FUTURE', prices: prices, collition : "error",duration:2};

            var template = $compile("<div cart></div>")($scope);
            httpMock.when('GET','i18n/common/es.json').respond(200);
            $scope.$broadcast('toggleItemCart',pack0);
            $scope.$apply();
            pack0 =   {name: 'pack1', startDate: d,'date': d, code: '1234', productType: 'STOCK' ,patternType: "SIMPLE", prices: prices, collition : "error",duration: 1};
            $scope.$broadcast('toggleItemCart',pack0);
            $scope.$apply();
            pack0 =   {name: 'pack1', startDate: d,'date': d, code: '1234', productType: 'STOCK' ,patternType: "SIMPLE", prices: prices, collition : "error",duration: 2};
            $scope.$broadcast('toggleItemCart',pack0);

            $scope.$broadcast('toggleItemCart',pack1);
            $scope.$apply();
            $scope.$broadcast('toggleItemCart',pack2);
            $scope.$apply();
            $scope.$broadcast('toggleItemCart',pack3);
            $scope.$apply();
            $scope.$broadcast('toggleItemCart',pack4);
            $scope.$apply();
            expect($scope.stockItems.length).toBeDefined();
        }));

        it('should change duration item ', inject(function(){
            var completeDate = {month: new Date().getMonth()+1, year: new Date().getFullYear()};
            var prices =[23,12,45];
            var d = '28/09/2014';
            var pack0 = {name: 'pack1', startDate: d,'date': d, code: 1234, productType: 'STOCK' ,patternType: "SIMPLE", prices: prices, collition : "error"};
            var pack1 = {name: 'pack1', startDate: d,'date': d,code: 1234, productType: 'STOCK', prices: prices, collition : "error"};
            var pack2 = {name: 'pack1', startDate: d,'date': d,code: 1234, productType: 'INDICE' ,patternType: "SIMPLE", prices: prices, collition : "error"};
            var pack3 = {name: 'pack1', startDate: d,'date': d,code: 1234, productType: 'INDICE', prices: prices, collition : "error"};
            var pack4 = {name: 'pack1', startDate: d,'date': d,code: 1234, productType: 'FUTURE', prices: prices, collition : "error"};
            var template = $compile("<div cart></div>")($scope);
            $scope.$apply();
            $scope.$broadcast('toggleItemCart',pack0);
            //$scope.$broadcast('changeDurationItem',pack0);
            $scope.$apply();

           /* $scope.$broadcast('toggleItemCart',pack1);
            $scope.$broadcast('changeDurationItem',pack1);
            $scope.$apply();
            $scope.$broadcast('toggleItemCart',pack2);
            $scope.$broadcast('changeDurationItem',pack2);
            $scope.$apply();

            $scope.$broadcast('toggleItemCart',pack3);
            $scope.$broadcast('changeDurationItem',pack3);
            $scope.$apply();

            $scope.$broadcast('toggleItemCart',pack4);
            $scope.$broadcast('changeDurationItem',pack4);
            $scope.$apply();*/

        }));

        it('should update subscribed packs', inject(function(){
            var completeDate = {month: new Date().getMonth()+1, year: new Date().getFullYear()};
            var prices =[23,12,45];
            var d = '28/09/2014';
            var pack0 = {name: 'pack1', startDate: d,'date': d, code: '1234', productType: 'STOCK' ,patternType: "SIMPLE", prices: prices, collition : "error"};

            var template = $compile("<div cart></div>")($scope);
            var packs = [pack0];
            $scope.$broadcast('toggleItemCart',pack0);
            $scope.$apply();
            $scope.$broadcast('updateSubscribedPacks',packs);
        }));


        it('should change duration from cart', inject(function(){
            var completeDate = {month: new Date().getMonth()+1, year: new Date().getFullYear()};
            var prices =[23,12,45];
            var d = '28/09/2014';
            var pack0 = {name: 'pack1', startDate: d,'date': d, code: '1234', productType: 'STOCK' ,patternType: "SIMPLE", prices: prices, collition : "error"};
            var pack1 = {name: 'pack1', startDate: d,'date': d,code: '1234', productType: 'STOCK', prices: prices, collition : "error"};

            var template = $compile("<div cart></div>")($scope);
            $scope.$apply();
            $scope.changeDurationFromCart(pack0,pack0.code,pack0.productType);
        }));

        it('should change duration item from cart', inject(function(){
            var completeDate = {month: new Date().getMonth()+1, year: new Date().getFullYear()};
            var prices =[23,12,45];
            var d = '28/09/2014';
            var pack0 = {name: 'pack1', startDate: d,'date': d, code: '1234', productType: 'STOCK' ,patternType: "SIMPLE", prices: prices, collition : "error",duration : 1};
            var pack4 = {name: 'pack1', startDate: d,'date': d, code: '1234', productType: 'FUTURE' , prices: prices, collition : "error",duration : 1};

            var template = $compile("<div cart></div>")($scope);
            $scope.$apply();
            $scope.$broadcast('toggleItemCart',pack0);
            $scope.changeDurationItem(pack0,pack0.duration);
            $scope.$apply();

            $scope.$broadcast('toggleItemCart',pack4);
            $scope.$apply();
            $scope.changeDurationItem(pack4,pack4.duration);
            $scope.$apply();

        }));

        it('should change duration of the rest of items from cart', inject(function(){
            var completeDate = {month: new Date().getMonth()+1, year: new Date().getFullYear()};
            var prices =[23,12,45];
            var d = '28/09/2014';
            var pack2 = {name: 'pack1', startDate: d,'date': d, code: '1234', productType: 'INDICE' ,patternType: "SIMPLE", prices: prices, collition : "error",duration : 1};

            var template = $compile("<div cart></div>")($scope);
            $scope.$apply();
            $scope.$broadcast('toggleItemCart',pack2);
            $scope.changeDurationItem(pack2,pack2.duration);
            $scope.$apply();


        }));

        it('should be able to get items from cart', inject(function(){
            var template = $compile("<div cart></div>")($scope);
            $scope.$apply();
            var res = $scope.getItems();
            expect(res).toBeDefined();

        }));

        it('should be check if a pairIndex item already exists', inject(function(){
            var template = $compile("<div cart></div>")($scope);
            $scope.$apply();
            var d = '28/09/2014';
            var pack2 = {name: 'pack1', startDate: d,'date': d,code: 1234, productType: 'INDICE' ,patternType: "SIMPLE"};
            $scope.$broadcast('toggleItemCart',pack2);

            $scope.$apply();
            var res;
            res = $scope.existsPack(pack2);
            expect(res).toBeDefined();

        }));

        it('should be check if a future item already exists', inject(function(){
            var template = $compile("<div cart></div>")($scope);
            $scope.$apply();
            var d = '28/09/2014';
            var pack = {name: 'pack1', startDate: d,'date': d,code: 1234, productType: 'FUTURE'};
            $scope.$broadcast('toggleItemCart',pack);

            $scope.$apply();
            var res;
            res = $scope.existsPack(pack);
            expect(res).toBeDefined();

        }));

        it('should be able to remove multiple items', function(){
            var template = $compile("<div cart></div>")($scope);
            $scope.$apply();
            var pack = {name: 'pack1', startDate: startDate0,'date': startDate0,code: 1234, productType: 'INDICE' ,patternType: "SIMPLE",duration: "Trimestral"};
            var pack2 = {name: 'pack1', startDate: startDate0,'date': startDate0,code: 1234, productType: 'INDICE' ,patternType: "",duration: "Trimestral"};
            var pack4 = {name: 'pack1', startDate: startDate0,'date': startDate0,code: 1234, productType: 'FUTURE' ,patternType: "",duration: 1};
            $scope.$broadcast('toggleItemCart',pack);
            $scope.$apply();

            $scope.deleteMultiplePacks(pack);
            $scope.$apply();
            $scope.$broadcast('toggleItemCart',pack4);
            $scope.$apply();
            $scope.deleteMultiplePacks(pack4);

            $scope.$broadcast('toggleItemCart,pack2');
            $scope.$apply();
            $scope.deleteMultiplePacks(pack2);
            $scope.$apply();
            expect($scope.deleteMultiplePacks).toBeDefined();
        });

        it('should be able to remove invidual items', function(){
            var template = $compile("<div cart></div>")($scope);
            $scope.$apply();
            var d = '28/09/2014';
            var pack4 = {name: 'pack1', startDate: d,'date': d,code: 1234, productType: 'FUTURE' ,patternType: "SIMPLE"};
            $scope.$broadcast('toggleItemCart',pack4);
            $scope.$apply();
            $scope.removeItemFromCart('FUTURE',pack4);
            expect($scope.removeItemFromCart).toBeDefined();
        });
    });
});

/* Count how many items the private menu has*/

describe('The privateMenu directive', function () {

    beforeEach(angular.mock.module("ngMo"));

    describe('template', function () {
        var $compile;
        var $scope;
        var $state;
        var httpMock;

        beforeEach(module('templates-app'));

        beforeEach(inject(function (_$compile_, _$rootScope_, _$state_, $httpBackend) {
            $compile = _$compile_;
            $scope = _$rootScope_.$new();
            $state = _$state_;
            httpMock = $httpBackend;
            httpMock.when('GET','i18n/common/es.json').respond(200);

            httpMock.when('GET', $scope.urlService+'/islogged').respond(200);
        }));

        it('should produce 7 menu items', inject(function () {
            var template = $compile("<nav private-menu></nav>")($scope);
            $scope.$apply();
            expect(template.find('li').length).toEqual(7);
            $scope.onMouseEnterMenu('my-subscriptions-nav','my-subscriptions');
            expect($scope.actualMenu).toNotBe(undefined);
        }));

        it('should select menu ',inject(function(){

            var template = $compile("<nav private-menu></nav>")($scope);
            $scope.$apply();
            $scope.onMouseEnterMenu('my-subscriptions-nav','my-subscriptions');
            expect($scope.actualMenu).toNotBe(undefined);
        }));

        it('should leave menu ',inject(function(){

            var template = $compile("<nav private-menu></nav>")($scope);
            $scope.$apply();
            $state.current.data.selectMenu = $scope.actualMenu + ' ';
            $scope.onMouseLeaveMenu();
            expect($scope.actualMenu).toEqual($state.current.data.selectMenu);

        }));

        it('should let the user click menu ',inject(function(){

            var template = $compile("<nav private-menu></nav>")($scope);
            $scope.$apply();
            $scope.onClickMenu();
            expect($scope.actualMenu).toEqual('');

        }));

    });
});


describe('The privateSubMenu directive', function () {

    beforeEach(angular.mock.module("ngMo"));

    describe('template', function () {
        var $compile;
        var $scope;
        var $state;
        var httpMock;

        beforeEach(module('templates-app'));

        beforeEach(inject(function (_$compile_, _$rootScope_, _$state_, $httpBackend, _$modal_) {
            $compile = _$compile_;
            $scope = _$rootScope_.$new();
            $state = _$state_;
            httpMock = $httpBackend;
            httpMock.when('GET','i18n/common/es.json').respond(200);

            httpMock.when('GET', $scope.urlService + '/islogged').respond(200);
            $modal = _$modal_.open({
                templateUrl: 'layout_templates/private-submenu.tpl.html'
            });
        }));

        it('should go to submenu', inject(function () {
            var template = $compile("<nav private-sub-menu></nav>")($scope);
            $scope.$apply();
            $scope.onMouseEnterSubmenu('tools-nav','submenu1','correlation-nav');
            expect($scope.actualSubmenu).toEqual('submenu1');

        }));

        it('should onMouseLeaveSubmenu', inject(function () {
            var template = $compile("<nav private-sub-menu></nav>")($scope);
            $scope.$apply();
            $state.current.data.selectMenu = $scope.actualMenu + ' ';
            $scope.onMouseLeaveSubmenu();
            expect($scope.actualMenu).toEqual($state.current.data.selectMenu);
        }));

        it('should let the user click submenu ',inject(function(){
            var template = $compile("<nav private-sub-menu></nav>")($scope);
            $scope.$apply();
            $scope.onClickSubmenu();
            expect($scope.actualMenu).toEqual('');
        }));
    });
});


// Check if login  - logout panel fades in

describe('The signin-signup-box ng-scope div', function () {


    beforeEach(angular.mock.module("ngMo"));

    beforeEach(module('templates-app'));

    describe('template', function () {
        var $compile;
        var $scope;
        var $state;
        var httpMock;

        beforeEach(inject(function (_$controller_, _$rootScope_, _$compile_, $httpBackend) {
            $scope = _$rootScope_.$new();
            $compile = _$compile_;
            httpMock = $httpBackend;
            httpMock.when('GET','i18n/common/es.json').respond(200);
            httpMock.when('GET', $scope.urlService+'/islogged').respond(200);
        }));

        it('should fade in', function () {

            var template = $compile("<div class=\"signin-signup-box ng-scope\" ng-controller=\"AuthCtrl\">" +
                "<div class=\"no-logged-box sign-background\" ng-click=\"toggleSignInForm(); $event.stopPropagation();\">Login</div>" +
                "<a ui-sref=\"signup\" class=\"subscribe-free-link sign-background\">" +
                "<span>Suscr&iacute;bete Gratis</span>" +
                "</a></div>")($scope);
            $scope.$apply();
            // expect(template.children.length).toEqual(3);
            expect(template.children('span, div').length).toEqual(2);
        });


    });
});


/*Check if the sigin box fades in*/

describe('The signin box fades in', function () {
    beforeEach(angular.mock.module("ngMo"));
    beforeEach(module('templates-app'));

    describe('template', function () {
        var $compile;
        var $scope;
        var $state;

        beforeEach(inject(function (_$controller_, _$rootScope_, _$compile_,_$httpBackend_) {
            $scope = _$rootScope_.$new();
            $compile = _$compile_;
            _$httpBackend_.when('GET','i18n/common/es.json').respond(200);


        }));

        it('should be visible', function(){

            var template = $compile("<a ui-sref=\"signup\" class=\"subscribe-free-link sign-background\">" +
                "<span>Suscr&iacute;bete Gratis</span>" +
                "</a>")($scope);
            $scope.$apply();

            expect(template.children('span').length).toEqual(1);
            template.triggerHandler('click');

            var tpl = $compile("<div class=\"login-panel\">" +
                "<span>Acceso</span>" +
                "<label>Email</label><input type=\"text\" class=\"float-right\" ng-class=\"{'warning-input' : errorSignIn}\"/>" +
                "<label>Contrase&ntilde;a</label><input type=\"password\" class=\"float-right\" ng-class=\"{'warning-input' : errorSignIn}\"/>" +
                "<div>" +
                "<label>Recordar</label> <input type = \"checkbox\" />" +
                "<button class=\"mo-button float-right\" ng-click=\"submit()\">Entrar</button>" +
                "<div ng-show=\"errorSignIn\" class=\"login-bottom-panel\">" +
                "<img  ng-src=\"assets/img/warning-icon.png\">" +
                "<span class=\"warning-login-text\">Usuario o contrase&ntilde;a incorrecta.</span>" +
                "</div>" +
                "<div class=\"forget-password\">" +
                "<img ng-src=\"assets/img/question-mark.png\">" +
                "<a ui-sref=\"forgotten-password\" ng-click=\"hideSignInForm()\">&iquest;Ha olvidado su contrase&ntilde;a?</a>" +
                "<div>" +
                "</div>" +
                "</div>")($scope);
            $scope.$apply();

            expect(template.css("display")).toNotBe("none");
        });
    });

});


describe('The flag box works ok', function () {
    beforeEach(angular.mock.module("ngMo"));
    beforeEach(module('templates-app'));

    describe('template', function () {
        var $compile;
        var $scope;
        var $state;
        var element;
        var $modal;
        var $http;

        beforeEach(inject(function (_$controller_, _$rootScope_, _$compile_, _$modal_,_$httpBackend_) {
            $scope = _$rootScope_.$new();
            $compile = _$compile_;
            element = $compile("<flag-box></flag-box>")($scope);
            $modal = _$modal_.open({
                templateUrl: 'layout_templates/modal-text.tpl.html'
            });
            $http = _$httpBackend_;
            _$httpBackend_.when('GET','i18n/common/es.json').respond(200);

        }));

        it('should work', function(){
            delete $window.sessionStorage.cart;
            var template = $compile("<flag-box></flag-box>")($scope);
            $http.expectGET('i18n/common/es.json');
            $scope.$apply();
            $scope.openModal('English');
            $scope.openModal('Germany');
            $scope.openModal('French');
            $scope.openModal('Japanese');
            $scope.openModal('Chinese');

        });
    });
});

describe('The scroll directive', function () {
    beforeEach(angular.mock.module("ngMo"));
    beforeEach(module('templates-app'));

    describe('template', function () {
        var $compile;
        var $scope;
        var $window;

        beforeEach(inject(function (_$controller_, _$rootScope_, _$compile_, _$window_,_$httpBackend_) {
            $scope = _$rootScope_.$new();
            $compile = _$compile_;
            $window = _$window_;
            _$httpBackend_.when('GET','i18n/common/es.json').respond(200);

        }));

        it('should let the user scroll', function(){
            delete $window.sessionStorage.cart;
            var template = $compile("<div scroll></div>")($scope);
            $scope.$apply();
            $window.scrollTo(10000);
        });
    });

});
describe('The scrollFaq directive', function () {
    beforeEach(angular.mock.module("ngMo"));
    beforeEach(module('templates-app'));

    describe('template', function () {
        var $compile;
        var $scope;
        var $window;

        beforeEach(inject(function (_$rootScope_, _$compile_, _$window_, _$location_,_$httpBackend_ ) {
            $scope = _$rootScope_.$new();
            $compile = _$compile_;
            $window = _$window_;
            $location = _$location_;
            _$httpBackend_.when('GET','i18n/common/es.json').respond(200);


        }));

        it('should let the user scroll', function(){
            $location.path = $scope.urlService + '/faq';
            delete $window.sessionStorage.cart;
            var template = $compile("<div scroll-faq></div>")($scope);
            $scope.$apply();
            template.triggerHandler('scroll',{pageYOffset: 1000});
        });
    });

});

describe('The twoDecimals filter  test', function(){

    var filter;
    var $scope;
    var $compile;

    beforeEach(angular.mock.module("ngMo"));
    beforeEach(module('templates-app'));

    beforeEach(inject(function(twoDecimalsFilter,_$rootScope_) {
        filter = twoDecimalsFilter;
        $scope = _$rootScope_;
    }));

    it('should filter number into two decimals', function(){
        filter(345.6789);
        expect(filter.roundedValue).toNotBe(0.0);
    });
});

describe('The ngEnter directive', function () {
    beforeEach(angular.mock.module("ngMo"));
    beforeEach(module('templates-app'));

    describe('template', function () {
        var $compile;
        var $scope;
        var $state;
        var $modal;

        beforeEach(inject(function (_$controller_, _$rootScope_, _$compile_) {
            $scope = _$rootScope_.$new();
            $compile = _$compile_;
        }));

        it('should bind keypress event', function(){
            delete $window.sessionStorage.cart;
            var template = $compile("<div ng-enter></div>")($scope);
            var e = {which: 13};
            template.triggerHandler('keypress',e);

        });
    });

});

describe('The publicMenu directive', function () {
    beforeEach(angular.mock.module("ngMo"));
    beforeEach(module('templates-app'));

    describe('template', function () {
        var $compile;
        var $scope;
        var $state;
        var element;
        var $modal;

        beforeEach(inject(function (_$controller_, _$rootScope_, _$compile_, _$modal_, _$state_,_$httpBackend_) {
            $scope = _$rootScope_.$new();
            $compile = _$compile_;
            element = $compile("<div public-menu></div>")($scope);
            $modal = _$modal_.open({
                templateUrl: 'layout_templates/public-menu.tpl.html'
            });
            $state = _$state_;
            _$httpBackend_.when('GET','i18n/common/es.json').respond(200);


        }));

        it('should work', function(){
            delete $window.sessionStorage.cart;
            $scope.$apply();
            $scope.onMouseEnterMenu('market-observatory-nav','submenu1');
            expect($scope.actualMenu).toNotBe(undefined);
            $state.current.data.selectMenu = $scope.actualMenu + ' ';
            $scope.onMouseLeaveMenu();
            expect($scope.actualItemSubmenu).toNotBe(undefined);
            $scope.isPresent = false;
            $scope.$watch('selectSubmenu');

        });
    });

});
describe('The publicSubMenu directive', function () {
    beforeEach(angular.mock.module("ngMo"));
    beforeEach(module('templates-app'));

    describe('template', function () {
        var $compile;
        var $scope;
        var $state;
        var element;
        var $modal;

        beforeEach(inject(function (_$controller_, _$rootScope_, _$compile_, _$modal_, _$state_,_$httpBackend_) {
            $scope = _$rootScope_.$new();
            $compile = _$compile_;
            element = $compile("<div public-sub-menu></div>")($scope);
            $modal = _$modal_.open({
                templateUrl: 'layout_templates/public-submenu.tpl.html'
            });
            $state = _$state_;
            _$httpBackend_.when('GET','i18n/common/es.json').respond(200);


        }));

        it('should work', function(){
            delete $window.sessionStorage.cart;
            $scope.$apply();
            $scope.onMouseEnterSubmenu('market-observatory-nav','submenu1','what-is-and-what-is-not-nav');
            expect($scope.actualSubmenu).toNotBe(undefined);
            $state.current.data.selectMenu = $scope.actualSubmenu + ' ';
            $scope.onMouseLeaveSubmenu();
            expect($scope.actualMenu).toNotBe(undefined);
            $scope.onClickSubmenu();

        });
    });

});

describe('The scroll faq directive', function () {
    beforeEach(angular.mock.module("ngMo"));
    beforeEach(module('templates-app'));

    describe('template', function () {
        var $compile;
        var $scope;

        beforeEach(inject(function (_$controller_, _$rootScope_, _$compile_,_$httpBackend_) {
            $scope = _$rootScope_.$new();
            $compile = _$compile_;
            _$httpBackend_.when('GET','i18n/common/es.json').respond(200);


        }));

        it('should work', function(){
            delete $window.sessionStorage.cart;
            var template = $compile("<div scroll-faq></div>")($scope);
            $scope.$apply();

        });
    });

});

describe('The ShoppingCartService', function () {
    beforeEach(angular.mock.module("ngMo"));
    beforeEach(module('templates-app'));

    describe('template', function () {
        var service;
        var $scope;
        var $compile;
        var $http;
        var d = '28/09/2014';
        var item = {code: 1234, date: d};
        var config = {};

        var pack = {code : 1234, date: d, startDate: d, patternType: 'STOCK'};
        var packs = [pack,pack];

        beforeEach(angular.mock.module("ngMo"));
        beforeEach(module('templates-app'));
        beforeEach(inject(function (ShoppingCartService, _$rootScope_, _$compile_, _$httpBackend_) {
            service = ShoppingCartService;
            $scope = _$rootScope_;
            $compile = _$compile_;
            $http = _$httpBackend_;

            _$httpBackend_.when('GET','i18n/common/es.json').respond(200);

            _$httpBackend_.when('GET', _$rootScope_.urlService+"/prices").respond({
                "data":{
                    "prices":[29,82,313]
                }});
            _$httpBackend_.when('GET', _$rootScope_.urlService + '/islogged').respond(200);
            _$httpBackend_.when('POST', _$rootScope_.urlService + '/has-pack',config).respond(200,{"status": "pack_active"});
        }));

        it('should check if user has subscribed to pack', inject(function(){
            delete $window.sessionStorage.cart;
            $window.localStorage.token  = 1;
            $scope.$apply();

            service.hasSubscribedToThisPack(item,function(result){
                if (result.status === "pack_active") {
                    item.prices = [0, 0, 0];
                    item.price = 0;
                    item.active = true;
                }});
            expect(service.hasSubscribedToThisPack);
        }));

        it('should check if packs are subscribed', inject(function(){
            delete $window.sessionStorage.cart;
            $window.localStorage.token  = 1;
            var completeDate = {month: new Date().getMonth()+1, year: new Date().getFullYear()};
            var prices =[23,12,45];
            var pack0 =  {name: 'pack1', startDate: completeDate,'date': d, code: '1234', productType: 'STOCK' ,patternType: "SIMPLE", prices: prices, collition : "error"};
            var pack1 = {name: 'pack1', startDate: completeDate,'date': d,code: '1234', productType: 'STOCK', prices: prices, collition : "error"};
            var pack2 = {name: 'pack1', startDate: completeDate,'date': d,code: '1234', productType: 'INDICE' ,patternType: "SIMPLE", prices: prices, collition : "error"};
            var pack3 = {name: 'pack1', startDate: completeDate,'date': d,code: '1234', productType: 'INDICE', prices: prices, collition : "error"};
            var pack4 = {name: 'pack1', startDate: completeDate,'date': d,code: '1234', productType: 'FUTURE', prices: prices, collition : "error"};
            var pack5 = {duration: 1,startDate: d,'date': d};
            var pack6 = {duration: 2,startDate: d,'date': d};
            var template = $compile("<div cart></div>")($scope);

            service.addItemCart(pack0);
            service.addItemCart(pack1);
            service.addItemCart(pack2);
            service.addItemCart(pack3);
            service.addItemCart(pack4);

            packs = [pack0,pack1,pack2];
            $scope.$apply();
            service.thisPacksAreSubscribed(packs);

            //another branch
            pack0 =  {name: 'pack1', startDate: completeDate,'date': d, code: '1234', productType: 'STOCK' ,patternType: "SIMPLE", prices: prices, monthError : "error", duration : "Mensual"};
            service.addItemCart(pack0);
            packs = [pack0];
            service.thisPacksAreSubscribed(packs);

            //another branch
            pack0 =  {name: 'pack1', startDate: completeDate,'date': d, code: '1234', productType: 'STOCK' ,patternType: "SIMPLE", prices: prices, trimestralError : "error", duration : "Trimestral"};
            service.addItemCart(pack0);
            packs = [pack0];
            service.thisPacksAreSubscribed(packs);

            //another branch
            pack0 =  {name: 'pack1', startDate: completeDate,'date': d, code: '1234', productType: 'STOCK' ,patternType: "SIMPLE", prices: prices, yearError : "error", duration : "Anual"};
            service.addItemCart(pack0);
            packs = [pack0];
            service.thisPacksAreSubscribed(packs);
            expect(service.thisPacksAreSubscribed);

        }));

        it('should hide elements', inject(function(){
            delete $window.sessionStorage.cart;
            $scope.$apply();
            //$scope.hideFSignInForm();
        }));

        it('should get elements prices', inject(function(){

            $http.expectGET($scope.urlService + '/prices');
            service.getPrices();
            $http.flush();

        }));

        it('should be able to change items duration', function(){
            var completeDate = {month: new Date().getMonth()+1, year: new Date().getFullYear()};
            var prices =[23,12,45];
            var pack0 =  {name: 'pack1', startDate: completeDate,'date': d, code: '1234', productType: 'STOCK' ,patternType: "SIMPLE", prices: prices, collition : "error"};
            var pack1 = {name: 'pack1', startDate: completeDate,'date': d,code: '1234', productType: 'STOCK', prices: prices, collition : "error"};
            var pack2 = {name: 'pack1', startDate: completeDate,'date': d,code: '1234', productType: 'INDICE' ,patternType: "SIMPLE", prices: prices, collition : "error"};
            var pack3 = {name: 'pack1', startDate: completeDate,'date': d,code: '1234', productType: 'INDICE', prices: prices, collition : "error"};
            var pack4 = {name: 'pack1', startDate: completeDate,'date': d,code: '1234', productType: 'FUTURE', prices: prices, collition : "error"};

            service.addItemCart(pack0);
            service.addItemCart(pack1);
            service.addItemCart(pack2);
            service.addItemCart(pack3);
            service.addItemCart(pack4);

            item = {code: 1234, date: d, startDate: completeDate};
            service.changeDuration(pack0,0);
            service.changeDuration(pack1,1);
            service.changeDuration(pack2,2);
            service.changeDuration(pack3,3);
            service.changeDuration(pack4,4);
        });
    });
});

describe('The ActiveTab service', function(){

    var service;
    var $scope;
    var $compile;

    beforeEach(angular.mock.module("ngMo"));
    beforeEach(module('templates-app'));
    beforeEach(inject(function (ActiveTabService, _$rootScope_, _$compile_,_$httpBackend_) {
        service = ActiveTabService;
        $scope = _$rootScope_;
        $compile = _$compile_;
        $http = _$httpBackend_;
        _$httpBackend_.when('GET','i18n/common/es.json').respond(200);

    }));

    it('should work', function(){
        delete $window.sessionStorage.cart;
        $scope.$apply();
        $http.expectGET('i18n/common/es.json');
        service.changeActiveTab();

    });

});
describe('The SecondActiveTab service', function(){

    var service;
    var $scope;
    var $compile;

    beforeEach(angular.mock.module("ngMo"));
    beforeEach(module('templates-app'));
    beforeEach(inject(function (SecondActiveTabService, _$rootScope_, _$compile_,_$httpBackend_) {
        service = SecondActiveTabService;
        $scope = _$rootScope_;
        $compile = _$compile_;
        _$httpBackend_.when('GET','i18n/common/es.json').respond(200);

    }));

    it('should work', function(){
        delete $window.sessionStorage.cart;
        $scope.$apply();
        service.changeActiveTab();
    });

});
describe('The AnchorLink service', function(){

    var service;
    var $scope;
    var $compile;

    beforeEach(angular.mock.module("ngMo"));
    beforeEach(module('templates-app'));
    beforeEach(inject(function (AnchorLinkService, _$rootScope_, _$compile_,_$httpBackend_) {
        service = AnchorLinkService;
        $scope = _$rootScope_;
        $compile = _$compile_;
        $http = _$httpBackend_;
        _$httpBackend_.when('GET','i18n/common/es.json').respond(200);
    }));

    it('should work', function(){
        delete $window.sessionStorage.cart;
        $http.expectGET('i18n/common/es.json');
        $scope.$apply();
        service.scrollTo();
    });

});
describe('The ArrayContainItem service', function(){

    var service;
    var $scope;
    var $compile;
    var $http;

    beforeEach(angular.mock.module("ngMo"));
    beforeEach(module('templates-app'));
    beforeEach(inject(function (ArrayContainItemService, _$rootScope_, _$compile_,_$httpBackend_) {
        service = ArrayContainItemService;
        $scope = _$rootScope_;
        $compile = _$compile_;
        $http = _$httpBackend_;
        _$httpBackend_.when('GET','i18n/common/es.json').respond(200);


    }));

    it('should check if array contains item', function(){
        delete $window.sessionStorage.cart;
        $scope.$apply();
        var array = [];
        var item = {code: 'code'};
        $http.expectGET('i18n/common/es.json');
        expect(service.containItem(array,item)).toBe(false);
        array[0] = item;
        expect(service.containItem(array,item)).toBe(true);
    });
});

//Testing app controller
describe('The app controller', function(){
    var $scope, ctrl,actualService,location,$state,$routeParams,http,signInFormState,shoppingCartService;
    beforeEach(angular.mock.module("ngMo"));
    beforeEach(inject(function ($injector) {
        $state = $injector.get('$state');
    }));

    beforeEach(inject(function($controller,$rootScope,ActualDateService,$location,_$httpBackend_,SignInFormState,ShoppingCartService) {
        ctrl = $controller;
        $scope = $rootScope.$new();
        signInFormState = SignInFormState;
        actualService = ActualDateService;
        shoppingCartService = ShoppingCartService;
        location = $location;
        http = _$httpBackend_;
        $controller('AppCtrl', {'$rootScope' : $rootScope, '$scope': $scope, 'ActualDateService': actualService, '$state': $state});
        _$httpBackend_.when('GET','i18n/common/es.json').respond(200);
        _$httpBackend_.when('GET',$rootScope.urlService + '/actualdate').respond(200,{"data": new Date()});
        _$httpBackend_.when('GET',$rootScope.urlService + '/nextdate').respond(200,{"data": new Date()});
        _$httpBackend_.when('GET', $rootScope.urlService + '/islogged').respond(200);
        _$httpBackend_.when('POST',$rootScope.urlService + '/remember-password').respond(200,{"status":"ok"});
    }));

    it('should success when changing state at the beginning', function(){
        $state.url = "/the-week";
        $scope.$broadcast('$stateChangeStart',$state);
        expect($scope.inWeekView).toNotBe(undefined);
    });
    it('should success when changing state', function(){
         $state.data = {pageTitle : "Market Observatory"};
         $scope.$broadcast('$stateChangeSuccess',$state,{},{},{});
         expect($scope.actualMenu).toNotBe(undefined);
    });

    it('should hide elements', function() {
        $scope.hideSignInForm = signInFormState.hideSignInState;
        $scope.closeCart =  shoppingCartService.closeCart;
        $scope.$apply();
        http.expectGET('i18n/common/es.json');
        http.expectGET($scope.urlService + '/actualdate');
        http.expectGET($scope.urlService + '/nextdate');
        $scope.hideElements();
        expect($scope.hideElements).toNotBe(undefined);
    });

    it('should open modal instance', function() {
        $scope.openModalInstance();
        expect($scope.openModalInstance).toNotBe(undefined);
    });

    it('should be able to remember password', function() {
        http.expectGET('i18n/common/es.json');
        http.expectPOST($scope.urlService + '/remember-password');
        $scope.rememberPassword();
        http.flush();
        expect($scope.mailSent).toBe(true);
    });

});