/**
 * Created by laura on 29/04/14.
 */
angular.module('ngMo.faq', [
    'ui.router'
])

    .config(function config($stateProvider) {
        $stateProvider.state('faq', {
                url: '/faq',
                views: {
                    "main": {
                        controller: 'FAQCtrl',
                        template: '<div class="public-zone-text container ng-scope"><p class="text-block-title">FAQ</p><div ui-view></div></div>'
                    },
                    "home":{}
                },
                data: {
                    pageTitle: 'FAQ',
                    selectMenu: '',
                    selectSubmenu: '',
                    selectItemSubmenu: '',
                    moMenuType: 'publicMenu'
                }
            })
            .state('faq.service-applications-nav', {templateUrl: "faq/service-applications.tpl.html"})
            .state('faq.catalog', { templateUrl: "faq/home.tpl.html" })
            .state('faq.home', { templateUrl: "faq/home.tpl.html" })
            .state('faq.nofaq', { templateUrl: "faq/faq.tpl.html" })
        ;

    })

    .run(function run() {
    })

    .controller('FAQCtrl', function ContactCtrl($scope, $state) {

        $scope.$on('$stateChangeSuccess', function (event, toState, toParams, fromState, fromParams) {

           try {
               if (fromState.name !== "faq") {
                   if ($state.get("faq." + fromState.name)) {
                       $state.transitionTo("faq." + fromState.name);
                   } else if (fromState.name !== "faq" && $state.get("faq." + fromState.data.selectMenu)) {
                       $state.transitionTo("faq." + fromState.data.selectMenu);
                   } else {
                       $state.transitionTo("faq.nofaq");
                   }
               }
           }catch(err){
               $state.transitionTo("faq.nofaq");
           }

            if (angular.isDefined(toState.data.pageTitle)) {$scope.pageTitle = toState.data.pageTitle + ' | Market Observatory';}
        });
}) ;