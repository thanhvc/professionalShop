describe('My profile service', function() {
    var $scope, ctrl, $http, $state,service;
    beforeEach(angular.mock.module("ngMo"));
    beforeEach(angular.mock.module("ngMo.my_profile"));


    beforeEach(inject(function (ProfileService, $rootScope, _$http_, _$httpBackend_, _$state_) {

        service = ProfileService;
        $scope = $rootScope.$new();
        $http = _$httpBackend_;
        $state = _$state_;
        $state.$current = {
            data :{ subPage : 1}
        };

    }));

    it("should be able to load user", function () {
        service.loadUser();
        expect(service.loadUser).toNotBe(undefined);
    });

    it("should be able to edit user", function () {
        service.editUser();
        expect(service.editUser).toNotBe(undefined);
    });

    it("should be able to edit password", function () {
        service.editPassword('password','callback');
        expect(service.editPassword).toNotBe(undefined);
    });


});