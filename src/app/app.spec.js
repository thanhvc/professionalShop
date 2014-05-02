describe( 'ngMo', function() {

    beforeEach(module('ngMo'));
    it("Dummy Test", function(){

    });

});

/*describe( 'publicMenu directive', function() {
    var elm, scope ;
    beforeEach(module('ngMo'));
    beforeEach(module('layout_templates/publicSubMenuNotLogged.tpl.html'));

    beforeEach(inject(function($rootScope) {
        scope = $rootScope;
    }));

    function compileDirective() {
        inject(function($compile) {
            var tpl = angular.element('<nav public-menu></nav>');
            var menu = $compile(tpl)(scope);
            elm = menu.find('nav');
            scope.$digest();
        });

    }

    describe('inicialization', function() {
        beforeEach(function() {
            compileDirective();
        });

        it('should produce 6 items menu', function() {
            expect(elm.find('<li>').length).toEqual(6);
        });
    });

});*/









