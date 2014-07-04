/*describe('The publicMenu directive', function () {
 beforeEach(angular.mock.module("ngMo"));
 describe('template', function () {
        var $compile;
        var $scope;
        var $state;
        var $httpBackend;

        beforeEach(module('templates-app'));

        beforeEach(inject(function (_$compile_, $rootScope, _$state_, _$httpBackend_) {
            $compile = _$compile_;
            $httpBackend = _$httpBackend_;
            $httpBackend.when('GET', $rootScope.urlService+'/actualdate').respond(200);
            $httpBackend.when('GET', $rootScope.urlService+'/islogged').respond(200);
            $httpBackend.when('GET',$rootScope.urlService+'/nextdate').respond(200);
            $scope = $rootScope.$new();
            $state = _$state_;
        }));


        it('should produce 6 menu items', inject(function () {
            var template = $compile("<nav public-menu></nav>")($scope);
            $scope.$apply();
            expect(template.find('li').length).toEqual(6);
        }));


        it('should have \'item-nav-hover\' class', inject(function ($rootScope) {
            $httpBackend.when('GET', $rootScope.urlService+'/actualdate').respond(200);
            $state.go('organization');
            var template = $compile("<div ng-controller = 'AppCtrl'><nav public-menu></nav></div>")($scope);
            $scope.$apply();
            var suffix = "-nav";
            var vMenuList = template.find('li');
            var log = [];

            console.log(suffix);

            angular.forEach(vMenuList, function (item) {
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

        beforeEach(inject(function (_$compile_, $rootScope, _$state_, _$httpBackend_) {
            $compile = _$compile_;
            $scope = $rootScope.$new();
            $state = _$state_;
            $httpBackend = _$httpBackend_;
            $httpBackend.when('GET',$rootScope.urlService+'/islogged').respond(200);
            $httpBackend.when('GET',$rootScope.urlService+'/actualdate').respond(200);
            $httpBackend.when('GET',$rootScope.urlService+'/nextdate').respond(200);

        }));

        function replaceAll(text, find, replace) {
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
            angular.forEach(stateProvider, function (itemProvider) {
                $state.go(itemProvider);
                var templateSubmenu = $compile("<div ng-controller ='AppCtrl'><nav public-sub-menu></nav></div>")($scope);
                $scope.$apply();
                var suffix = "-nav";
                var selectedItem = replaceAll($state.current.name, "_", "-") + suffix;
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
*/
/**
 * TODO: add items of differents types for a greater coverage test
 */

describe('The cart directive', function () {
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

        addItemsToCart = function (numItems) {
            for (var i = 0; i < numItems; i++) {
                item = {
                    "code": i,
                    "patternType": 0,
                    "productType": "STOCK"
                };
                $scope.addNewItemCart(item);
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

            $scope.removeItemCart('stocks', itemToRemove);
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

/* Count how many items the private menu has*/
/*
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
        }));

    });
});

*/
/* Check if login  - logout panel fades in*/
/*
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
*/

/*Check if the sigin box fades in*/
/*
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

        beforeEach(function () {
            var template = $compile("<a ui-sref=\"signup\" class=\"subscribe-free-link sign-background\">" +
                "<span>Suscr&iacute;bete Gratis</span>" +
                "</a>")($scope);
            $scope.$apply();


            expect(template.children('span').length).toEqual(1);

            template.click();
            expect(element("<div class=\"login-panel\">" +
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
                "</div>").is(':visible')).toBe(true);
        });


    });
});
*/
/* Check if login - logout panel fades out*/