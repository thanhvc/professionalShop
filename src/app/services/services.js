/**
 * Created by laura on 29/04/14.
 */
angular.module('ngMo.services', [
    'ui.router'
])

    .config(function config($stateProvider) {
        $stateProvider.state('summary', {
            url: '/summary',
            views: {
                "main": {
                    controller: 'DetailedCtrl',
                    templateUrl: 'services/summary/summary.tpl.html'
                }
            },
            data: {
                pageTitle: 'Resumen',
                selectMenu: 'services-nav',
                selectSubmenu: 'submenu2',
                selectItemSubmenu: 'summary-nav',
                moMenuType: 'publicMenu',
                subPage: 'none'
            }
        })
            .state('products_and_exchanges', {
                url: '/products_and_exchanges',
                views: {
                    "main": {
                        controller: 'ServicesCtrl',
                        templateUrl: 'services/products_and_exchanges/products_and_exchanges.tpl.html'
                    }
                },
                data: {
                    pageTitle: 'Productos y Mercados',
                    selectMenu: 'services-nav',
                    selectSubmenu: 'submenu2',
                    selectItemSubmenu: 'products-and-exchanges-nav',
                    moMenuType: 'publicMenu'
                }
            })
            .state('detailed_description', {
                url: '/detailed_description',
                views: {
                    "main": {
                        controller: 'DetailedCtrl',
                        templateUrl: 'services/detailed_description/detailed_description.tpl.html'
                    }/*,
                     "subPage@detailed_description": {
                     templateUrl: 'services/detailed_description/description.tpl.html'
                     }*/
                },
                data: {
                    pageTitle: 'Descripcion Detallada',
                    selectMenu: 'services-nav',
                    selectSubmenu: 'submenu2',
                    selectItemSubmenu: 'detailed-description-nav',
                    moMenuType: 'publicMenu'
                }
            })
            .state('fundamentals', {
                url: '/fundamentals',
                views: {
                    "main": {
                        controller: 'ServicesCtrl',
                        templateUrl: 'services/fundamentals/fundamentals.tpl.html'
                    }
                },
                data: {
                    pageTitle: 'Fundamentos',
                    selectMenu: 'services-nav',
                    selectSubmenu: 'submenu2',
                    selectItemSubmenu: 'fundamentals-nav',
                    moMenuType: 'publicMenu'
                }
            })
            .state('professionals', {
                url: '/professionals',
                views: {
                    "main": {
                        controller: 'ServicesCtrl',
                        templateUrl: 'services/professionals/professionals.tpl.html'
                    }
                },
                data: {
                    pageTitle: 'Profesionales',
                    selectMenu: 'services-nav',
                    selectSubmenu: 'submenu2',
                    selectItemSubmenu: 'professionals-nav',
                    moMenuType: 'publicMenu'
                }
            });

    })

    .run(function run() {
    })

    .controller('ServicesCtrl', function ServicesCtrl($scope,PricesService, $templateCache) {
        $scope.tooltipOpinions = $templateCache.get("tooltips/opinion.tpl.html");
        $scope.tooltipReliability = $templateCache.get("tooltips/reliatibility.tpl.html");
        $scope.tooltipPeriods = $templateCache.get("tooltips/period.tpl.html");
        $scope.tooltipFact = $templateCache.get("tooltips/fact.tpl.html");


        $scope.$on('$stateChangeSuccess', function (event, toState, toParams, fromState, fromParams) {
            if (angular.isDefined(toState.data.pageTitle)) {$scope.pageTitle = toState.data.pageTitle + ' | Market Observatory';}
        });
        var prices = PricesService.getPrices();
        $scope.month_price = prices.one_month;
        $scope.three_months_price=prices.three_months;
        $scope.one_year_price = prices.one_year;
        $scope.pack_month = prices.pack_month;
        $scope.pack_trimestral = prices.pack_trimestral;
        $scope.pack_year = prices.pack_year;
    })

    /*.directive("scrollDetailed", function ($window, PositionAnchorsDetailed) {
     return function(scope, element, attrs) {*/
    .controller("DetailedCtrl", function($scope,$window,$location, PositionAnchorsDetailed,AnchorLinkService){
        $scope.scrollTo = AnchorLinkService.scrollTo;
        $scope.anchors = null;
        $scope.location = $location;
        angular.element($window).bind("scroll", function(scope, element, attrs) {

            if ((location.hash.indexOf("#/detailed_description") == -1)  && ((location.hash.indexOf("#/summary") == -1) && (location.hash.indexOf("#/resources") == -1))) {
                return; //only in detailed description url
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

            //scrollSpy
            //Obtain anchors -- is better get always the positions because wheb the page is refreshing
            /*if ((typeof $scope.anchors === 'undefined') ||  ($scope.anchors  == null) ) {*/
                $scope.anchors = PositionAnchorsDetailed.getPositionAnchors();
           /* }*/



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


        //try when 1 page
        angular.element(document).ready(function () {
            subRoute =location.hash.split("#/detailed_description#");
            if (subRoute.length == 1) {
                //if detailed_description is not the actual page, the length is 1... so we must check if is summary page or resources page
                subRoute =location.hash.split("#/summary#");
                if (subRoute.length == 1) {
                    //if detailed_description is not the actual page, the length is 1... so we must check if is summary page
                    subRoute = location.hash.split("#/resources#");
                }
            }
            if (subRoute.length == 2) {
                subRoute = subRoute[1];
                if (subRoute === ""){
                    return;
                } else {
                    if ((typeof $scope.anchors === 'undefined') || ($scope.anchors == null) ) {
                        $scope.anchors = PositionAnchorsDetailed.getPositionAnchors();
                    }
                    for (var j = 1; j < $scope.anchors.length-1; j++) {
                        if ($scope.anchors[j].id === subRoute) {
                            $scope.selectedOption = $scope.anchors[j].id;
                            window.scrollTo(0,$scope.anchors[j].position);
                        }
                    }
                }
            }
        });
        /* };*/
    })
    .service("PositionAnchorsDetailed", function() {
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
    .service("PricesService", function() {
        this.getPrices = function(){
            /*mocked*/
            return  {
                one_month: "29",
                three_months: "27.55",
                one_year: "26.10",
                pack_month:"29",
                pack_trimestral:"82",
                pack_year:"313"
            };
        };
    });