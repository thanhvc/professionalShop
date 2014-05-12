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
                            console.log(item.id);
                            this.push(item.children[0].className);
                        }
                    },
                    log);
                console.log("tiene: "+log[0]);
                expect(log[0].indexOf('item-nav-hover')).toNotEqual(-1);
            });
        }));

    });
});



