
describe( 'publicMenu directive', function() {
    var tpl, scope ;
    beforeEach(module('ngMo'));
    beforeEach(module('templates-app'));

    beforeEach(inject(function($rootScope) {
        scope = $rootScope;
        //compile = $compile;
    }));

    function compileDirective() {
        inject(function($compile) {
            tpl = $compile('<nav public-menu></nav>')(scope);
            scope.$digest();
        });

    }

    describe('inicialization', function() {
        beforeEach(function() {
            compileDirective();
        });

        it('should produce 6 items menu', function() {
            expect(tpl.find('li').length).toEqual(6);
        });
    });

});









