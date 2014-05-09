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

        /*it('should have \'item-nav-hover\' class', inject(function () {

            var stateProvider = ["organization", "what_is_and what_is_not", "service_conditions", "privacity"];
            angular.forEach(stateProvider,function(item) {
                $state.go(item);
                var templateSubmenu = $compile("<div ng-controller ='AppCtrl'><nav public-sub-menu></nav></div>")($scope);
                $scope.$apply();
                var suffix = "-nav";
                var vSubmenuList = templateSubmenu.find('li');
                var log = [];

                angular.forEach(vSubmenuList, function (item) {
                        if (item.id === $state.current.name.replace("_","-") + suffix) {
                            this.push(item.children[0].className);
                        }
                    },
                    log);
                expect(log[0].indexOf('item-nav-hover')).toNotEqual(-1);
            });
        }));*/

    });
});



