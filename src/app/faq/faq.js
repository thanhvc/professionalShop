/**
 * Created by laura on 29/04/14.
 * Updated by davver on 26/02/15.
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
                        templateUrl: 'faq/faq.tpl.html'
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
            .state('no_faq', {
                url: '/no_faq',
                views: {
                    "main": {
                        controller: 'NoFAQCtrl',
                        templateUrl: 'faq/nofaq.tpl.html'
                    }
                },
                data: {
                    pageTitle: 'FAQ',
                    selectMenu: '',
                    selectSubmenu: '',
                    selectItemSubmenu: '',
                    moMenuType: 'publicMenu'
                }
            })
        ;

    })

    .run(function run() {
    })

    .controller('NoFAQCtrl', function($scope, $state) {

    }) 

    .controller("FAQCtrl", function($scope,$state,$window,$location, PositionAnchorsFAQ,AnchorLinkService,$timeout){

        $scope.scrollTo = function(id) {
            AnchorLinkService.scrollTo(id);
        };

        $scope.$on('$locationChangeSuccess', function (event, $stateParams) {
            var url = $stateParams;
            url = url.split("#");
            var link = url[url.length-1]+"Link";
            $timeout(function(){
                var element = document.getElementById(link);
                if (element != null) {
                    element.click();
                } else {
                    AnchorLinkService.scrollTop();
                }

            },100);
            //$scope.$apply();
        });

        $scope.anchors = null;
        $scope.location = $location;
        angular.element($window).bind("scroll", function(scope, element, attrs) {

            if (location.pathname.indexOf("/faq") == -1) {
                return; //only in faq url
            }
            //menu position
            var footerPosition = document.getElementsByClassName("footer")[0].offsetTop;
            var footerHeight = document.getElementsByClassName("footer")[0].offsetHeight;
            if (window.pageYOffset >= 150) {
                $scope.positionFix = true;

                /*if (footerPosition > (window.pageYOffset+(window.screen.availHeight - footerHeight))){*/
                    $scope.boolChangeClassDetailed = true;
                /*}else{
                    $scope.boolChangeClassDetailed = false;
                }*/

                //horizontal scroll control when the menu is fixed
                if(window.pageXOffset > 0){
                    menuOffset = document.getElementsByClassName("lat-menu-detailed-nav")[0].offsetLeft;
                    $scope.menuLeft = (menuOffset-window.pageXOffset)+'px';
                }else{
                    $scope.menuLeft = '';
                }

            } else {
                $scope.boolChangeClassDetailed = false;
                $scope.positionFix = false;
                $scope.menuLeft = '';
            }
            $scope.$apply();

            $scope.anchors = PositionAnchorsFAQ.getPositionAnchors();


            if (window.pageYOffset < $scope.anchors[0].position){
                $scope.selectedOption = $scope.anchors[0].id;
            }else if(window.pageYOffset > $scope.anchors[$scope.anchors.length-1].position) {
                $scope.selectedOption = $scope.anchors[$scope.anchors.length-1].id;
            }else {
                for (var j = 1; j < $scope.anchors.length-1; j++) {
                    if (window.pageYOffset >= $scope.anchors[j].position && window.pageYOffset < $scope.anchors[j + 1].position) {
                        $scope.selectedOption = $scope.anchors[j].id;
                    }
                }
            }
            
        });

        angular.element(document).ready(function () {
            var section = location.hash.replace("#","");
            if (section === null || section === undefined || section === "") {
                return;
            }
            if ((typeof $scope.anchors === 'undefined') || ($scope.anchors == null) ) {
                $scope.anchors = PositionAnchorsFAQ.getPositionAnchors();
            }
            for (var j=0; j < $scope.anchors.length; j++) {
                if ($scope.anchors[j].id === section) {
                     $scope.selectedOption = $scope.anchors[j].id;
                     window.scrollTo(0,$scope.anchors[j].position);
                }
            }
        });

    })

    .service("PositionAnchorsFAQ", function() {
        this.getPositionAnchors = function() {
            var anchors = document.getElementsByClassName("anchor-detailed");
            var positions = [];
            for (var i = 0; i<anchors.length;i++){
                positions.push(
                    {
                        "position": (anchors[i]).offsetTop,
                        "id": (anchors[i]).getAttribute('id')
                    });
            }
            return positions;

        };
    })
;
