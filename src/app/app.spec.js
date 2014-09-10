describe('The cart directive', function () {
    beforeEach(angular.mock.module("ngMo"));
    describe('template', function () {
        var $compile;
        var $scope;
        var $state;
        var httpMock;

        beforeEach(module('templates-app'));


        beforeEach(inject(function (_$compile_, _$rootScope_, _$state_, $httpBackend,$controller, _$window_) {

            httpMock = $httpBackend;
            $compile = _$compile_;
            $state = _$state_;
            httpMock.when('GET', _$rootScope_.urlService+'/islogged').respond(200);
            httpMock.when('GET', _$rootScope_.urlService+"/prices").respond({
                "data":{
                    "prices":[29,82,313]
                }});
            $scope = _$rootScope_.$new();
            $window = _$window_;

        }));


        addItemsToCart = function (numItems,type,patternType, duration) {
            startDate= 1406934000000;
            for (var i = 0; i < numItems; i++) {
                item = {
                    "code": i,
                    name: "pack test",
                    "patternType": patternType,
                    "productType": type,
                    "duration": duration,
                    publicationDate: 1404472269488
                };


                $scope.addNewItemCart(item,startDate);
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
            $scope.$apply();
            $scope.$broadcast('submitCart',{event:null, paymentType: 'EXPRESSCHECKOUT'});
        }));

        it('should submitCart when payment type is DIRECTPAYMENT', inject(function(){
            delete $window.sessionStorage.cart;
            var template = $compile("<div cart></div>")($scope);
            $scope.$apply();
            $scope.$broadcast('submitCart',{event:null, paymentType: 'DIRECTPAYMENT'});
        }));


        //add three items to cart
        it('should have 3 items and total and subtotal equals 87', inject(function () {
            delete $window.sessionStorage.cart;
            var template = $compile("<div cart></div>")($scope);
            $scope.$apply();
            addItemsToCart(3,'STOCK',0, "Mensual");
            var trsCart = template.find('tr');
            var log = [];
            log = obtainLog(trsCart, log);
            expect(log.length).toEqual(3);
            log = [];
            log = obtainSubtotal(trsCart, log);
            expect(log[0].indexOf('939')).toNotEqual(-1);
            log = [];
            var divsCart = template.find('div');
            log = obtainTotalCart(divsCart, log);
            expect(log[0].indexOf('939')).toNotEqual(-1);
        }));

        //remove 1 item to cart
        it('should have 2 item and total and subtotal equals 58', inject(function () {
            delete $window.sessionStorage.cart;
            var template = $compile("<div cart></div>")($scope);
            $scope.$apply();
            addItemsToCart(2,'STOCK',0,"Anual");
            var itemToRemove = {
                "id": 25,
                "packName": "Nuevo",
                "startDate": "May 14",
                "duration": "Mensual",
                "price": 29
            };
            $scope.addNewItemCart(itemToRemove);
            $scope.removeItemCart('pairs', itemToRemove);
            var trsCart = template.find('tr');
            var log = [];
            log = obtainLog(trsCart, log);
            expect(log.length).toEqual(2);
            log = [];
            log = obtainSubtotal(trsCart, log);
            expect(log[0].indexOf('626')).toNotEqual(-1);
            log = [];
            var divsCart = template.find('div');
            log = obtainTotalCart(divsCart, log);
            expect(log[0].indexOf('626')).toNotEqual(-1);
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
            expect(log.length).toEqual(0);
            log = [];
            log = obtainSubtotal(trsCart, log);
            expect(log[0].indexOf('0')).toNotEqual(-1);
            log = [];
            var divsCart = template.find('div');
            log = obtainTotalCart(divsCart, log);
            expect(log[0].indexOf('0')).toNotEqual(-1);
        }));

        //Change duration
        it('should let the user change a mensual stock item duration', inject(function() {
            delete $window.sessionStorage.cart;
            var template = $compile("<div cart></div>")($scope);
            $scope.$apply();
            addItemsToCart(1, 'STOCK',0,'Mensual');
            $scope.$apply();

            var trsCart = template.find('tr');
            var log = [];
            log = obtainSubtotal(trsCart, log);
            var previousPrice = log[0].indexOf('0');
            $scope.changeDurationCart(0, 0); //type = stock
            expect(log.indexOf('0')).toNotEqual(previousPrice);

        }));

        //Change duration
        it('should let the user change a year stock item duration', inject(function() {
            delete $window.sessionStorage.cart;
            var template = $compile("<div cart></div>")($scope);
            $scope.$apply();
            addItemsToCart(1, 'STOCK',0,'Anual');
            $scope.$apply();

            var trsCart = template.find('tr');
            var log = [];
            log = obtainSubtotal(trsCart, log);
            var previousPrice = log[0].indexOf('0');
            $scope.changeDurationCart(0, 0); //type = stock
            expect(log.indexOf('0')).toNotEqual(previousPrice);

        }));

        //Change duration
        it('should let the user change a three-month stock item duration', inject(function() {
            delete $window.sessionStorage.cart;
            var template = $compile("<div cart></div>")($scope);
            $scope.$apply();
            addItemsToCart(1, 'STOCK',0,'Trimestral');
            $scope.$apply();

            var trsCart = template.find('tr');
            var log = [];
            log = obtainSubtotal(trsCart, log);
            var previousPrice = log[0].indexOf('0');
            $scope.changeDurationCart(0, 0); //type = stock
            expect(log.indexOf('0')).toNotEqual(previousPrice);

        }));

        it('should let the user change a future item duration', inject(function(){

            delete $window.sessionStorage.cart;
            var template = $compile("<div cart></div>")($scope);
            $scope.$apply();
            var trsCart = template.find('tr');
            var log = [];
            log = obtainSubtotal(trsCart, log);
            var previousPrice = log[0].indexOf('0');
            //future
            addItemsToCart(1, 'FUTURE',0,'Mensual');
            $scope.$apply();
            previousPrice = log[0].indexOf('0');
            $scope.changeDurationCart(0,4); //type = future
            $scope.$apply();
            log = [];
            log = obtainSubtotal(trsCart, log);
            expect(log.indexOf('0')).toNotEqual(previousPrice);

        }));

        it('should let the user change a year future item duration', inject(function(){

            delete $window.sessionStorage.cart;
            var template = $compile("<div cart></div>")($scope);
            $scope.$apply();
            var trsCart = template.find('tr');
            var log = [];
            log = obtainSubtotal(trsCart, log);
            var previousPrice = log[0].indexOf('0');
            //future
            addItemsToCart(1, 'FUTURE',0,'Anual');
            $scope.$apply();
            previousPrice = log[0].indexOf('0');
            $scope.changeDurationCart(0,4); //type = future
            $scope.$apply();
            log = [];
            log = obtainSubtotal(trsCart, log);
            expect(log.indexOf('0')).toNotEqual(previousPrice);

        }));
        it('should let the user change a three-month future item duration', inject(function(){

            delete $window.sessionStorage.cart;
            var template = $compile("<div cart></div>")($scope);
            $scope.$apply();
            var trsCart = template.find('tr');
            var log = [];
            log = obtainSubtotal(trsCart, log);
            var previousPrice = log[0].indexOf('0');
            //future
            addItemsToCart(1, 'FUTURE',0,'Trimestral');
            $scope.$apply();
            previousPrice = log[0].indexOf('0');
            $scope.changeDurationCart(0,4); //type = future
            $scope.$apply();
            log = [];
            log = obtainSubtotal(trsCart, log);
            expect(log.indexOf('0')).toNotEqual(previousPrice);

        }));

        it('should let the user change an index item duration', inject(function(){

            delete $window.sessionStorage.cart;
            var template = $compile("<div cart></div>")($scope);
            $scope.$apply();
            var trsCart = template.find('tr');
            var log = [];
            log = obtainSubtotal(trsCart, log);
            var previousPrice = log[0].indexOf('0');

            addItemsToCart(1, 'INDICE',0,'Trimestral');
            $scope.$apply();
            previousPrice = log[0].indexOf('0');
            $scope.changeDurationCart(0,2); //type = index
            $scope.$apply();
            log = [];
            log = obtainSubtotal(trsCart, log);
            expect(log.indexOf('0')).toNotEqual(previousPrice);

        }));
        it('should let the user change a year index item duration', inject(function(){

            delete $window.sessionStorage.cart;
            var template = $compile("<div cart></div>")($scope);
            $scope.$apply();
            var trsCart = template.find('tr');
            var log = [];
            log = obtainSubtotal(trsCart, log);
            var previousPrice = log[0].indexOf('0');

            addItemsToCart(1, 'INDICE',0,'Anual');
            $scope.$apply();
            previousPrice = log[0].indexOf('0');
            $scope.changeDurationCart(0,2); //type = index
            $scope.$apply();
            log = [];
            log = obtainSubtotal(trsCart, log);
            expect(log.indexOf('0')).toNotEqual(previousPrice);

        }));
        it('should let the user change a month index item duration', inject(function(){

            delete $window.sessionStorage.cart;
            var template = $compile("<div cart></div>")($scope);
            $scope.$apply();
            var trsCart = template.find('tr');
            var log = [];
            log = obtainSubtotal(trsCart, log);
            var previousPrice = log[0].indexOf('0');

            addItemsToCart(1, 'INDICE',0,'Mensual');
            $scope.$apply();
            previousPrice = log[0].indexOf('0');
            $scope.changeDurationCart(0,2); //type = index
            $scope.$apply();
            log = [];
            log = obtainSubtotal(trsCart, log);
            expect(log.indexOf('0')).toNotEqual(previousPrice);

        }));

        it('should let the user change a pairindex item duration', inject(function(){

            delete $window.sessionStorage.cart;
            var template = $compile("<div cart></div>")($scope);
            $scope.$apply();
            var trsCart = template.find('tr');
            var log = [];
            log = obtainSubtotal(trsCart, log);
            var previousPrice = log[0].indexOf('0');

            addItemsToCart(1, 'INDICE',1,'Mensual');
            $scope.$apply();
            previousPrice = log[0].indexOf('0');
            $scope.changeDurationCart(0,3); //type = index
            $scope.$apply();
            log = [];
            log = obtainSubtotal(trsCart, log);
            expect(log.indexOf('0')).toNotEqual(previousPrice);

        }));

        it('should let the user change a year pairindex item duration', inject(function(){

            delete $window.sessionStorage.cart;
            var template = $compile("<div cart></div>")($scope);
            $scope.$apply();
            var trsCart = template.find('tr');
            var log = [];
            log = obtainSubtotal(trsCart, log);
            var previousPrice = log[0].indexOf('0');

            addItemsToCart(1, 'INDICE',1,'Anual');
            $scope.$apply();
            previousPrice = log[0].indexOf('0');
            $scope.changeDurationCart(0,3); //type = index
            $scope.$apply();
            log = [];
            log = obtainSubtotal(trsCart, log);
            expect(log.indexOf('0')).toNotEqual(previousPrice);

        }));

        it('should let the user change a three-month pairindex item duration', inject(function(){

            delete $window.sessionStorage.cart;
            var template = $compile("<div cart></div>")($scope);
            $scope.$apply();
            var trsCart = template.find('tr');
            var log = [];
            log = obtainSubtotal(trsCart, log);
            var previousPrice = log[0].indexOf('0');

            addItemsToCart(1, 'INDICE',1,'Trimestral');
            $scope.$apply();
            previousPrice = log[0].indexOf('0');
            $scope.changeDurationCart(0,3); //type = index
            $scope.$apply();
            log = [];
            log = obtainSubtotal(trsCart, log);
            expect(log.indexOf('0')).toNotEqual(previousPrice);

        }));

        it('should let the user change a pair item duration', inject(function(){

            delete $window.sessionStorage.cart;
            var template = $compile("<div cart></div>")($scope);
            $scope.$apply();
            var trsCart = template.find('tr');
            var log = [];
            log = obtainSubtotal(trsCart, log);
            var previousPrice = log[0].indexOf('0');

            addItemsToCart(1, 'STOCK',1,'Anual');
            $scope.$apply();
            previousPrice = log[0].indexOf('0');
            $scope.changeDurationCart(0,1); //type = index
            $scope.$apply();
            log = [];
            log = obtainSubtotal(trsCart, log);
            expect(log.indexOf('0')).toNotEqual(previousPrice);

        }));

        it('should let the user change a month pair item duration', inject(function(){

            delete $window.sessionStorage.cart;
            var template = $compile("<div cart></div>")($scope);
            $scope.$apply();
            var trsCart = template.find('tr');
            var log = [];
            log = obtainSubtotal(trsCart, log);
            var previousPrice = log[0].indexOf('0');

            addItemsToCart(1, 'STOCK',1,'Mensual');
            $scope.$apply();
            previousPrice = log[0].indexOf('0');
            $scope.changeDurationCart(0,1); //type = index
            $scope.$apply();
            log = [];
            log = obtainSubtotal(trsCart, log);
            expect(log.indexOf('0')).toNotEqual(previousPrice);

        }));

        it('should let the user change a three-month pair item duration', inject(function(){

            delete $window.sessionStorage.cart;
            var template = $compile("<div cart></div>")($scope);
            $scope.$apply();
            var trsCart = template.find('tr');
            var log = [];
            log = obtainSubtotal(trsCart, log);
            var previousPrice = log[0].indexOf('0');

            addItemsToCart(1, 'STOCK',1,'Trimestral');
            $scope.$apply();
            previousPrice = log[0].indexOf('0');
            $scope.changeDurationCart(0,1); //type = index
            $scope.$apply();
            log = [];
            log = obtainSubtotal(trsCart, log);
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
            //expect(log.length).toEqual(3);
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
            expect(log.length).toEqual(3);
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
            expect(log.length).toEqual(3);
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
            expect(log.length).toEqual(3);
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
                "startDate": "May 14",
                "duration": "Mensual",
                "price": 29
            };
            $scope.addNewItemCart(itemToRemove);
            $scope.removeItemCart('stocks', itemToRemove);
            var trsCart = template.find('tr');
            var log = [];
            log = obtainLog(trsCart, log);
            //expect(log.length).toEqual(2);

        }));

        it('should let the user remove a future item', inject(function () {
            delete $window.sessionStorage.cart;
            var template = $compile("<div cart></div>")($scope);
            $scope.$apply();
            addItemsToCart(2,'FUTURE',0,'Anual');
            var itemToRemove = {
                "id": 25,
                "packName": "Nuevo",
                "startDate": "May 14",
                "duration": "Mensual",
                "price": 29
            };
            $scope.addNewItemCart(itemToRemove);
            $scope.removeItemCart('futures', itemToRemove);
            var trsCart = template.find('tr');
            var log = [];
            log = obtainFutureLog(trsCart, log);
            //expect(log.length).toEqual(2);

        }));

        it('should let the user remove an index item', inject(function () {
            delete $window.sessionStorage.cart;
            var template = $compile("<div cart></div>")($scope);
            $scope.$apply();
            var itemToRemove = {
                "id": 25,
                "packName": "Nuevo",
                "startDate": "May 14",
                "duration": "Mensual",
                "price": 29
            };
            $scope.addNewItemCart(itemToRemove);
            $scope.removeItemCart('indices', itemToRemove);
            var trsCart = template.find('tr');
            var log = [];
            log = obtainIndexLog(trsCart, log);
            expect(log.length).toEqual(0);

        }));

        it('should let the user remove a pairIndex item', inject(function () {
            delete $window.sessionStorage.cart;
            var template = $compile("<div cart></div>")($scope);
            $scope.$apply();
            addItemsToCart(2,'INDICE',1);
            var itemToRemove = {
                "id": 25,
                "packName": "Nuevo",
                "startDate": "May 14",
                "duration": "Mensual",
                "price": 29
            };
            $scope.addNewItemCart(itemToRemove);
            $scope.removeItemCart('pairsIndices', itemToRemove);
            var trsCart = template.find('tr');
            var log = [];
            log = obtainLog(trsCart, log);
            expect(log.length).toEqual(0);

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
            var template = $compile("<div cart></div>")($scope);
            $scope.$apply();
            addItemsToCart(2,'INDICE',1);
            $scope.toggleCart();
            expect($scope.showCart).toBe(false);
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


/* Check if login  - logout panel fades in*/

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

        beforeEach(inject(function (_$controller_, _$rootScope_, _$compile_) {
            $scope = _$rootScope_.$new();
            $compile = _$compile_;
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

        beforeEach(inject(function (_$controller_, _$rootScope_, _$compile_, _$modal_) {
            $scope = _$rootScope_.$new();
            $compile = _$compile_;
            element = $compile("<flag-box></flag-box>")($scope);
            $modal = _$modal_.open({
                templateUrl: 'layout_templates/modal-text.tpl.html'
            });

        }));

        it('should work', function(){
            delete $window.sessionStorage.cart;
            var template = $compile("<flag-box></flag-box>")($scope);
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
        var $state;

        beforeEach(inject(function (_$controller_, _$rootScope_, _$compile_) {
            $scope = _$rootScope_.$new();
            $compile = _$compile_;
        }));

        it('should let the user scroll', function(){
            delete $window.sessionStorage.cart;
            var template = $compile("<div scroll></div>")($scope);
            // template.triggerHandler('scroll');
        });
    });

});
describe('The scrollFaq directive', function () {
    beforeEach(angular.mock.module("ngMo"));
    beforeEach(module('templates-app'));

    describe('template', function () {
        var $compile;
        var $scope;

        beforeEach(inject(function (_$rootScope_, _$compile_) {
            $scope = _$rootScope_.$new();
            $compile = _$compile_;


        }));

        it('should let the user scroll', function(){
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
            template.triggerHandler('keypress',13);

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

        beforeEach(inject(function (_$controller_, _$rootScope_, _$compile_, _$modal_, _$state_) {
            $scope = _$rootScope_.$new();
            $compile = _$compile_;
            element = $compile("<div public-menu></div>")($scope);
            $modal = _$modal_.open({
                templateUrl: 'layout_templates/public-menu.tpl.html'
            });
            $state = _$state_;

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

        beforeEach(inject(function (_$controller_, _$rootScope_, _$compile_, _$modal_, _$state_) {
            $scope = _$rootScope_.$new();
            $compile = _$compile_;
            element = $compile("<div public-sub-menu></div>")($scope);
            $modal = _$modal_.open({
                templateUrl: 'layout_templates/public-submenu.tpl.html'
            });
            $state = _$state_;

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

describe('The scroll faq Service', function () {
    beforeEach(angular.mock.module("ngMo.my_patterns"));

    describe('template', function () {
        var $compile;
        var $scope;
        var $state;
        var element;
        var $modal;

        beforeEach(inject(function (_$controller_, _$rootScope_, _$compile_) {
            $scope = _$rootScope_.$new();
            $compile = _$compile_;
            element = $compile("<scroll-faq></scroll-faq>")($scope);
        }));

        it('should work', function(){
            delete $window.sessionStorage.cart;
            var template = $compile("<scroll-faq></scroll-faq>")($scope);
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

        beforeEach(angular.mock.module("ngMo"));
        beforeEach(module('templates-app'));
        beforeEach(inject(function (ShoppingCartService, _$rootScope_, _$compile_, _$httpBackend_) {
            service = ShoppingCartService;
            $scope = _$rootScope_;
            $compile = _$compile_;
            $http = _$httpBackend_;
        }));

        it('should check if user has subscribed to pack', inject(function(){
            delete $window.sessionStorage.cart;
            $scope.$apply();
            service.hasSubscribedToThisPack();
        }));

        it('should hide elements', inject(function(){
            delete $window.sessionStorage.cart;
            $scope.$apply();
            service.getPrices();

        }));
    });
});

describe('The position anchors faq service', function(){

    var service;
    var $scope;
    var $compile;

    beforeEach(angular.mock.module("ngMo"));
    beforeEach(module('templates-app'));
    beforeEach(inject(function (PositionAnchorsFaq, _$rootScope_, _$compile_) {
        service = PositionAnchorsFaq;
        $scope = _$rootScope_;
        $compile = _$compile_;
    }));

    it('should work', function(){
        delete $window.sessionStorage.cart;

        $scope.$apply();
        service.getPositionAnchors();

    });

});

describe('The ActiveTab service', function(){

    var service;
    var $scope;
    var $compile;

    beforeEach(angular.mock.module("ngMo"));
    beforeEach(module('templates-app'));
    beforeEach(inject(function (ActiveTabService, _$rootScope_, _$compile_) {
        service = ActiveTabService;
        $scope = _$rootScope_;
        $compile = _$compile_;
    }));

    it('should work', function(){
        delete $window.sessionStorage.cart;
        $scope.$apply();
        service.changeActiveTab();

    });

});
describe('The SecondActiveTab service', function(){

    var service;
    var $scope;
    var $compile;

    beforeEach(angular.mock.module("ngMo"));
    beforeEach(module('templates-app'));
    beforeEach(inject(function (SecondActiveTabService, _$rootScope_, _$compile_) {
        service = SecondActiveTabService;
        $scope = _$rootScope_;
        $compile = _$compile_;
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
    beforeEach(inject(function (AnchorLinkService, _$rootScope_, _$compile_) {
        service = AnchorLinkService;
        $scope = _$rootScope_;
        $compile = _$compile_;
    }));

    it('should work', function(){
        delete $window.sessionStorage.cart;
        $scope.$apply();
        service.scrollTo();
    });

});
describe('The ArrayContainItem service', function(){

    var service;
    var $scope;
    var $compile;

    beforeEach(angular.mock.module("ngMo"));
    beforeEach(module('templates-app'));
    beforeEach(inject(function (ArrayContainItemService, _$rootScope_, _$compile_) {
        service = ArrayContainItemService;
        $scope = _$rootScope_;
        $compile = _$compile_;
    }));

    it('should work', function(){
        delete $window.sessionStorage.cart;
        $scope.$apply();
        service.containItem();
    });
});

//Testing app controller
describe('The app controller', function(){
    var $scope, ctrl,actualService,location,$state,$routeParams,http;
    beforeEach(angular.mock.module("ngMo"));

    beforeEach(inject(function ($injector) {
        $state = $injector.get('$state');
    }));

    beforeEach(inject(function($controller,$rootScope,ActualDateService,$location,_$httpBackend_) {
        ctrl = $controller;
        $scope = $rootScope.$new();
        actualService = ActualDateService;
        location = $location;
        http = _$httpBackend_;
        $controller('AppCtrl', {'$rootScope' : $rootScope, '$scope': $scope, 'ActualDateService': actualService, '$state': $state});
    }));

    it('should success when changing state at the beginning', function(){

        //$scope.$broadcast('$stateChangeStart',[{},$state]);
        //expect($scope.inWeekView).toNotBe(undefined);

    });
    it('should success when changing state', function(){

        //$scope.$broadcast('$stateChangeSuccess',[{},$state,{},{},{}]);
        //expect($scope.actualMenu).toNotBe(undefined);
    });

    it('should hide elements', function() {
       // $scope.hideElements();
        expect($scope.hideElements).toNotBe(undefined);
    });

    it('should open modal instance', function() {
        $scope.openModalInstance();
    });

    it('should load internal variables', function(){
        location.path('/islogged');

    });
});



describe('The delay directive', function () {

    beforeEach(angular.mock.module("ngMo"));

    describe('template', function () {
        var $compile;
        var $scope;
        var $state;
        var timeout;
        var httpMock;

        beforeEach(module('templates-app'));

        beforeEach(inject(function (_$compile_, _$rootScope_, _$state_, $httpBackend, $timeout) {
            $compile = _$compile_;
            $scope = _$rootScope_.$new();
            $state = _$state_;
            httpMock = $httpBackend;
            timeout = $timeout;
        }));

        it('should success to post requests', inject(function () {
            var template = $compile("<div ng-delay></div>")($scope);
            $scope.$apply();

            template.triggerHandler('compile');
            // timeout.flush();
        }));
    });
});