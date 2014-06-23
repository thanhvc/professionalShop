/**
 * Created by robgon on 10/06/14.

describe('The Patterns view ', function () {
    beforeEach(angular.mock.module("ngMo"));
    beforeEach(module('ui.router'));
    beforeEach(module('ui.bootstrap'));

    beforeEach(inject(function ($templateCache, $compile, $rootScope, $controller, $state, $httpBackend) {
        //create an empty scope
        scope = $rootScope.$new();
        //declare the controller and inject our empty scope
        $controller('PatternsCtrl', {$scope: scope});
        state = $state;
        compile = $compile;
        template = $templateCache;
        httpMock = $httpBackend;
        httpMock.when('GET', 'http://api.mo-shopclient.development.com:9000/loaduser').respond(200);
        httpMock.when('GET', 'src/app/my_patterns/data/testdataStock.json.js?pageSize=10&page=1').respond([
            {*/