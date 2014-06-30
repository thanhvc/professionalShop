describe('The catalog table directive', function () {
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
            $state.params.packId = "P1";
            httpMock.when('GET', 'http://localhost:9000/islogged').respond(200);
            httpMock.when('GET', 'http://localhost:9000/homepacks').respond(200);
            httpMock.when('GET', 'http://api.mo.devel.edosoftfactory.com/homepacks').respond(200);
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

        it('should have 1 item into table after apply volatility filter (<25)', inject(function () {
            var template = $compile("<div selected-pack-catalog></div>")($scope);
            $scope.$apply();
            $scope.changeFilter("<25", 'VolatilityCatalogFilter');

            $scope.$apply();
            var trs = template.find('tr');
            //two <tr> for header more the results
            expect(trs.length).toEqual(3);
        }));

        it('should have 1 item into table after apply volatility filter (>25<50)', inject(function () {
            var template = $compile("<div selected-pack-catalog></div>")($scope);
            $scope.$apply();
            $scope.changeFilter(">25<50", 'VolatilityCatalogFilter');
            $scope.$apply();
            var trs = template.find('tr');
            //two <tr> for header more the results
            expect(trs.length).toEqual(3);
        }));

        it('should have 1 item into table after apply volatility filter (>50<75)', inject(function () {
            var template = $compile("<div selected-pack-catalog></div>")($scope);
            $scope.$apply();
            $scope.changeFilter(">50<75", 'VolatilityCatalogFilter');
            $scope.$apply();
            var trs = template.find('tr');
            //two <tr> for header more the results
            expect(trs.length).toEqual(3);
        }));


        it('should have 1 item into table after apply volatility filter (>75)', inject(function () {
            var template = $compile("<div selected-pack-catalog></div>")($scope);
            $scope.$apply();
            $scope.changeFilter(">75", 'VolatilityCatalogFilter');
            $scope.$apply();
            var trs = template.find('tr');
            //two <tr> for header more the results
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
        var httpMock;

        beforeEach(module('templates-app'));

        beforeEach(inject(function (_$compile_, _$rootScope_, _$state_, $httpBackend) {
            $compile = _$compile_;
            $scope = _$rootScope_.$new();
            $state = _$state_;
            httpMock = $httpBackend;
            httpMock.when('GET', 'http://localhost:9000/islogged').respond(200);
        }));

        it('should have 3 selectors', inject(function () {
            var template = $compile("<carousel interval='myInterval'>" +
                "<slide ng-repeat='slide in myslides' active='slide.active'>" +
                "<img ng-src='{{slide.image}}' style='margin:auto;'>" +
                "</slide>" +
                "<div class='carousel-caption-copyright'>" +
                "<p class='copyright_carousel'>Copyright &copy; 2014 Market Observatory</p>" +
                "</div>" +
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
        var httpMock;

        beforeEach(module('templates-app'));

        beforeEach(inject(function (_$compile_, _$rootScope_, _$state_, $httpBackend) {
            $compile = _$compile_;
            $scope = _$rootScope_.$new();
            $state = _$state_;
            httpMock = $httpBackend;
            httpMock.when('GET', 'http://localhost:9000/islogged').respond(200);
        }));

        var searchClass = function (classname, classExpected) {
            classname = classname.split(" ");
            var found = false;
            angular.forEach(classname, function (item) {
                if (item === classExpected) {
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
                    if (searchClass(item.className, "public-zone-text")) {
                        this.push(item);
                    }
                },
                log);
            expect(log.length).toEqual(2);
        }));

    });
});


describe('The homeTablePack', function () {
    beforeEach(angular.mock.module("ngMo"));
    describe('template', function () {
        var $compile;
        var $scope;
        var $state;
        var $sce;
        var ActiveTabService;
        var PacksService;
        var httpMock;

        beforeEach(module('templates-app'));

        beforeEach(inject(function (_$compile_, _$rootScope_, _$state_, _$sce_, _ActiveTabService_, _PacksService_, $httpBackend) {
            $compile = _$compile_;
            $scope = _$rootScope_.$new();
            $state = _$state_;
            $sce = _$sce_;
            ActiveTabService = _ActiveTabService_;
            PacksService = _PacksService_;
            httpMock = $httpBackend;
            httpMock.when('GET', 'http://localhost:9000/islogged').respond(200);
            httpMock.when('GET', 'http://localhost:9000/homepacks').respond(200);
            $scope.myData =  {"region0": [
                {"subscriptionList": [], "code": "P1", "region": {"code": "AMEC", "name": "America", "exchangeList": [
                    {"symbol": "EEUU", "name": "Estados Unidos", "currency": {"code": "EU", "symbol": "EU", "name": "EURO"}}
                ], "abbreviation": "AMEC"}, "name": "Pack I", "productType": "STOCK", "publicationDate": 1401577200000, "scopeText": null, "numPatterns": 5},
                {"subscriptionList": [
                    {"id": 1, "subscriptionDate": 1404131940171, "startDate": 1398898800000, "subscriptionDuration": "YEAR"}
                ], "code": "P2", "region": {"code": "AMEC", "name": "America", "exchangeList": [
                    {"symbol": "EEUU", "name": "Estados Unidos", "currency": {"code": "EU", "symbol": "EU", "name": "EURO"}}
                ], "abbreviation": "AMEC"}, "name": "Pack II", "productType": "STOCK", "publicationDate": 1401577200000, "scopeText": null, "numPatterns": 5},
                {"subscriptionList": [], "code": "P3", "region": {"code": "AMEC", "name": "America", "exchangeList": [
                    {"symbol": "EEUU", "name": "Estados Unidos", "currency": {"code": "EU", "symbol": "EU", "name": "EURO"}}
                ], "abbreviation": "AMEC"}, "name": "Pack III", "productType": "STOCK", "publicationDate": 1401577200000, "scopeText": null, "numPatterns": 3}
            ], "region1": [
                {"subscriptionList": [], "code": "P4", "region": {"code": "ASIA", "name": "Asia", "exchangeList": [], "abbreviation": "ASIA"}, "name": "Pack IV", "productType": "INDICE", "publicationDate": 1401577200000, "scopeText": null, "numPatterns": 6},
                {"subscriptionList": [], "code": "P5", "region": {"code": "ASIA", "name": "Asia", "exchangeList": [], "abbreviation": "ASIA"}, "name": "Pack V", "productType": "INDICE", "publicationDate": 1401577200000, "scopeText": null, "numPatterns": 1}
            ], "region2": [
                {"subscriptionList": [], "code": "P6", "region": {"code": "EU", "name": "Europa", "exchangeList": [], "abbreviation": "EU"}, "name": "Pack VI", "productType": "FUTURE", "publicationDate": 1401577200000, "scopeText": null, "numPatterns": 0},
                {"subscriptionList": [], "code": "P7", "region": {"code": "EU", "name": "Europa", "exchangeList": [], "abbreviation": "EU"}, "name": "Pack VII", "productType": "FUTURE", "publicationDate": 1401577200000, "scopeText": null, "numPatterns": 1},
                {"subscriptionList": [], "code": "P8", "region": {"code": "EU", "name": "Europa", "exchangeList": [], "abbreviation": "EU"}, "name": "Pack VIII", "productType": "FUTURE", "publicationDate": 1401577200000, "scopeText": null, "numPatterns": 1},
                {"subscriptionList": [], "code": "P9", "region": {"code": "EU", "name": "Europa", "exchangeList": [], "abbreviation": "EU"}, "name": "Pack IX", "productType": "STOCK", "publicationDate": 1401577200000, "scopeText": null, "numPatterns": 1}
            ]};
        }));

        it('should have 1 item per table', inject(function () {

            $scope.homeTablePacks = [
                {
                    title: 'Acciones',
                    active: ActiveTabService.activeTab() === 0,
                    value: 0,
                    americaContent: $scope.myData.region0,
                    asiaContent: $scope.myData.region1,
                    europeContent: $scope.myData.region2,
                    url: 'home/tables_packs/stock_table.tpl.html'
                },
                {
                    title: 'Pares',
                    active: ActiveTabService.activeTab() === 1,
                    value: 1,
                    americaContent: $scope.myData.region3,
                    asiaContent: $scope.myData.region4,
                    europeContent: $scope.myData.region5,
                    url: 'home/tables_packs/pairs_table.tpl.html'
                },
                {
                    title: 'Indices',
                    active: ActiveTabService.activeTab() === 2,
                    value: 2,
                    indicesContent: $scope.myData.region6,
                    pairsIndicesContent: $scope.myData.region7,
                    url: 'home/tables_packs/indices_table.tpl.html'
                },
                {
                    title: 'Futuros',
                    active: ActiveTabService.activeTab() === 3,
                    value: 3,
                    futuresContent: $scope.myData.region8,
                    url: 'home/tables_packs/futures_table.tpl.html'
                }
            ];


            var template = $compile("<tabset>" +
                "<tab ng-click='onClickTab(homeTablePack.value)' ng-repeat='homeTablePack in homeTablePacks' heading='{{homeTablePack.title}}' active='homeTablePack.active' disabled='tab.disabled'>" +
                "<div ng-include='homeTablePack.url'></div>" +
                "</tab>" +
                "</tabset>")($scope);
            $scope.$apply();
            $scope.selectedTab = 0;
            $scope.$apply();

            var trs = template.find('tr');
            var log = [];
            angular.forEach(trs, function (item) {
                    if (item.attributes.length > 0) {
                        var attributes = item.attributes;
                        angular.forEach(attributes, function (attr) {
                                if (attr.name === "ng-repeat") {
                                    this.push(item);
                                }
                            },
                            log);
                    }
                },
                log);
            expect(log.length).toEqual(9);





        }));

    });
});


/**
 * TODO: correct equals href and url
 */

describe('The search external catalog', function () {
    beforeEach(angular.mock.module("ngMo"));
    describe('template', function () {
        var $compile;
        var $scope;
        var $state;
        var $sce;
        var ActiveTabService;
        var PacksService;
        var httpMock;

        beforeEach(module('templates-app'));

        beforeEach(inject(function (_$compile_, _$rootScope_, _$state_, _$sce_, _ActiveTabService_, _PacksService_, $httpBackend) {
            $compile = _$compile_;
            $scope = _$rootScope_.$new();
            $state = _$state_;
            $sce = _$sce_;
            ActiveTabService = _ActiveTabService_;
            PacksService = _PacksService_;
            httpMock = $httpBackend;
            httpMock.when('GET', 'http://localhost:9000/islogged').respond(200);
        }));

        var obtainTemplate = function () {
            return $compile("<div class=\"browser-data-catalog\">" +
                "<p class=\"orange-title\" >&iquest;Desea informaci&oacute;n sobre los datos Fundamentales de una Compa&ntilde;&iacute;a?</p>" +
                "<p>Introducir Nombre de la Compa&ntilde;&iacute;a (para acciones de Asia tambi&eacute;n C&oacute;digo Num&eacute;rico)</p>" +
                "<input placeholder=\"Nombre\" ng-model=\"searchExternCatalog\">" +
                "<a ng-href=\"{{urlSearchCatalog}}\" ng-click=\"generateSearchUrl('Google', searchExternCatalog)\">Buscar en Google</a>" +
                "<a ng-href=\"{{urlSearchCatalog}}\" ng-click=\"generateSearchUrl('Yahoo', searchExternCatalog)\">Buscar en Yahoo</a>" +
                "<a ng-href=\"{{urlSearchCatalog}}\" ng-click=\"generateSearchUrl('Bloomberg', searchExternCatalog)\">Buscar en Bloomberg</a>" +
                "</div>")($scope);
        };

        it('should have the correct url of google', inject(function () {
            var template = obtainTemplate();
            $scope.$apply();
            $scope.urlSearchCatalog = "https://www.google.com/finance?q=prueba";
            $scope.$apply();
            var links = template.find('a');
            var href = links[0].attributes[0].firstChild;
            expect(href.data).toEqual("https://www.google.com/finance?q=prueba");
        }));

        it('should have the correct url of yahoo', inject(function () {
            var template = obtainTemplate();
            $scope.$apply();
            $scope.urlSearchCatalog = "http://finance.yahoo.com/?q=prueba";
            $scope.$apply();
            var links = template.find('a');
            var href = links[0].attributes[0].firstChild;
            expect(href.data).toEqual("http://finance.yahoo.com/?q=prueba");
        }));

        it('should have the correct url of bloomberg', inject(function () {
            var template = obtainTemplate();
            $scope.$apply();
            $scope.urlSearchCatalog = "http://www.bloomberg.com/markets/symbolsearch?query=prueba";
            $scope.$apply();
            var links = template.find('a');
            var href = links[0].attributes[0].firstChild;
            expect(href.data).toEqual("http://www.bloomberg.com/markets/symbolsearch?query=prueba");
        }));

    });
});

