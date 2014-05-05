describe('The publicMenu directive', function () {
    beforeEach(angular.mock.module("ngMo"));
    describe('template', function () {
        var $compile;
        var $scope;

        beforeEach(module('templates-app'));

        beforeEach(inject(function (_$compile_, _$rootScope_) {
            $compile = _$compile_;
            $scope = _$rootScope_.$new();
        }));
        it('should produce 6 menu items', inject(function () {
            var template = $compile("<nav public-menu></nav>")($scope);
            $scope.$digest();
            expect(template.find('li').length).toEqual(6);
        }));

    });
});






