describe('The publicMenu directive', function () {
    beforeEach(angular.mock.module("ngMo"));
    describe('template', function () {
        var $compile;
        var $scope;
        var $state;

        beforeEach(module('templates-app'));

        beforeEach(inject(function (_$compile_, _$rootScope_, _$state_) {
            $compile = _$compile_;
            $scope = _$rootScope_.$new();
            $state =  _$state_;
        }));
        it('should produce 6 menu items', inject(function () {
            var template = $compile("<nav public-menu></nav>")($scope);
            $scope.$apply();
            expect(template.find('li').length).toEqual(6);
        }));
        it('should have \'item-nav-hover\' class', inject(function () {
            $state.go('organization');
            var template = $compile("<div ng-controller = 'AppCtrl'><nav public-menu></nav></div>")($scope);
            $scope.$apply();
            var suffix = "-nav";
            var vMenuList =  template.find('li');
            var log = [];

            angular.forEach(vMenuList,function(item) {
                if (item.id === 'market-observatory' + suffix) {
                    this.push(item.className);
                }
            },
            log);
           expect(log[0].indexOf('item-nav-hover')).toNotEqual(-1);
        }));

    });
});

describe('The publicSubmenu directive', function () {
    beforeEach(angular.mock.module("ngMo"));
    describe('template', function () {
        var $compile;
        var $scope;
        var $state;

        beforeEach(module('templates-app'));

        beforeEach(inject(function (_$compile_, _$rootScope_, _$state_) {
            $compile = _$compile_;
            $scope = _$rootScope_.$new();
            $state =  _$state_;
        }));

        function replaceAll( text, find, replace){
            while (text.toString().indexOf(find) != -1) {
                text = text.toString().replace(find, replace);
            }
            return text;
        }

       it('should have \'item-nav-hover\' class', inject(function () {

            var stateProvider = ["organization", "what_is_and_what_is_not", "service_conditions", "data_protection" ,
                                             "summary", "products_and_exchanges", "detailed_description", "fundamentals",
                                             "stocks", "funds", "etf_cfd", "futures", "pairs", "advanced", "diversification",
                                             "prices", "products", "subscription_types", "purchase", "free_subscription", "shopping_guide" ,
                                             "resources", "articles", "symbols_and_exchanges", "mo_template_collections",
                                            "support", "business", "job", "localization"

           ];
            angular.forEach(stateProvider,function(itemProvider) {
                $state.go(itemProvider);
                var templateSubmenu = $compile("<div ng-controller ='AppCtrl'><nav public-sub-menu></nav></div>")($scope);
                $scope.$apply();
                var suffix = "-nav";
                var selectedItem = replaceAll($state.current.name, "_","-") + suffix;
                var vSubmenuList = templateSubmenu.find('li');
                var log = [];
                angular.forEach(vSubmenuList, function (item) {
                        if (item.id === selectedItem) {
                            this.push(item.children[0].className);
                        }
                    },
                    log);
                expect(log[0].indexOf('item-nav-hover')).toNotEqual(-1);
            });
        }));

    });
});

/**
 * TODO: add items of differents types for a greater coverage test
 */
describe('The cart directive', function () {
    beforeEach(angular.mock.module("ngMo"));
    describe('template', function () {
        var $compile;
        var $scope;
        var $state;

        beforeEach(module('templates-app'));

        beforeEach(inject(function (_$compile_, _$rootScope_, _$state_) {
            $compile = _$compile_;
            $scope = _$rootScope_.$new();
            $state =  _$state_;
        }));

        addItemsToCart = function (numItems) {
            for (var i=0;i<numItems;i++){
                $scope.addNewItemCart(1);
                $scope.$apply();
            }
        };

        obtainLog = function (trsCart, log) {
            angular.forEach(trsCart, function (item) {
                    if (typeof item.attributes[0] != 'undefined'){
                        if (item.attributes[0].textContent === "stockItem in stockItems") {
                            this.push(item);
                        }
                    }
                },
                log);
            return log;
        };

        obtainSubtotal = function (items, log){
            angular.forEach(items,function(item) {
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
            angular.forEach(items,function(item) {
                    if (cont) {
                        if (typeof item.attributes[0] != 'undefined') {
                            if (item.className.substring(0,10) === "total-cart") {
                                this.push(item.textContent);
                                cont = false;
                            }
                        }
                    }
                },
                log);
            return log;
        };

        //add three items to cart
        it('should have 3 items and total and subtotal equals 87', inject(function () {
            var template = $compile("<div cart></div>")($scope);
            $scope.$apply();
            addItemsToCart(3);
            var trsCart = template.find('tr');
            var log = [];
            log = obtainLog(trsCart, log);
            expect(log.length).toEqual(3);
            log = [];
            log = obtainSubtotal(trsCart, log);
            expect(log[0].indexOf('87')).toNotEqual(-1);
            log = [];
            var divsCart = template.find('div');
            log = obtainTotalCart(divsCart, log);
            expect(log[0].indexOf('87')).toNotEqual(-1);
        }));

        //remove 1 item to cart
        it('should have 2 item and total and subtotal equals 58', inject(function () {
            var template = $compile("<div cart></div>")($scope);
            $scope.$apply();
            addItemsToCart(2);
            var itemToRemove = {
                "id": 25,
                "packName": "Nuevo",
                "startDate": "May 14",
                "duration": "Mensual",
                "price": 29
            };
            $scope.addNewItemCart(itemToRemove);

            $scope.removeItemCart('stocks',itemToRemove);
            var trsCart = template.find('tr');
            var log = [];
            log = obtainLog(trsCart, log);
            expect(log.length).toEqual(2);
            log = [];
            log = obtainSubtotal(trsCart, log);
            expect(log[0].indexOf('58')).toNotEqual(-1);
            log = [];
            var divsCart = template.find('div');
            log = obtainTotalCart(divsCart, log);
            expect(log[0].indexOf('58')).toNotEqual(-1);
        }));

        //remove All items to cart
        it('should have 0 items and total and subtotal equals 0', inject(function () {
            var template = $compile("<div cart></div>")($scope);
            $scope.$apply();
            addItemsToCart(3);
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

    });
});