
describe('The catalog table directive', function () {
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

        it('should have 1 item into table after apply name filter', inject(function () {
            var template = $compile("<div selected-pack-catalog></div>")($scope);
            $scope.$apply();
            var input = template.find('input');
            $scope.namePattern = "aba";
            $scope.$apply();
            var trs = template.find('tr');
            //two <tr> for header more one result
            expect(trs.length).toEqual(3);
        }));

        it('should have 1 item into table after apply volatility filter', inject(function () {
            var template = $compile("<div selected-pack-catalog></div>")($scope);
            $scope.$apply();
            //var input = template.find('input');
            $scope.volatilityPattern = "<25";
            $scope.$apply();
            var trs = template.find('tr');
            //two <tr> for header more one result
            expect(trs.length).toEqual(3);
        }));
    });
});

describe('The carousel directive', function () {
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

        it('should have 3 selectors', inject(function () {
            var template = $compile("<carousel interval='myInterval'>"+
            "<slide ng-repeat='slide in myslides' active='slide.active'>"+
                "<img ng-src='{{slide.image}}' style='margin:auto;'>"+
                "</slide>"+
                "<div class='carousel-caption-copyright'>"+
                "<p class='copyright_carousel'>Copyright &copy; 2014 Market Observatory</p>"+
                "</div>"+
            "</carousel>")($scope);
            $scope.$apply();
            $scope.myslides = [
                {
                    image: 'http://lorempixel.com/604/301/sports',
                    text: '¿Todavía se atreve a Invertir en Bolsa SIN VENTAJAS?'
                },
                {
                    image: 'http://lorempixel.com/604/301/city',
                    text: '¿Son POCO Rentables sus Fondos de Inversión?'
                },
                {
                    image: 'http://lorempixel.com/604/301/animals',
                    text: '¿No Sabe invertir en mercados BRICS y EMERGENTES?'
                }
            ];
            $scope.$apply();
            var lis = template.find('li');
            expect(lis.length).toEqual(3);
        }));

    });
});

describe('The homeText directive', function () {
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

        var searchClass = function(classname, classExpected) {
            classname=classname.split(" ");
            var found = false;
            angular.forEach(classname, function(item){
                if (item === classExpected ) {
                    found = true;
                }

            });
            return found;
        };

        it('should have 2 text container', inject(function () {
            var template = $compile("<div home-texts></div>")($scope);
            $scope.$apply();
            $scope.selectedTab = 0;
            $scope.$apply();
            var divs = template.find('div');
            var log = [];
            angular.forEach(divs, function (item) {
                   if (searchClass(item.className,"public-zone-text")) {
                            this.push(item);
                        }
                },
                log);
            expect(log.length).toEqual(2);
        }));

    });
});


