angular.module('ngMo.volatility', [
    'ui.router'
])

    .config(function config($stateProvider) {
        $stateProvider.state('volatility', {
            url: '/volatility',
            views: {
                "main": {
                    controller: 'VolatilityCtrl',
                    templateUrl: 'tools/volatility/volatility.tpl.html'
                }
            },
            data: {
                pageTitle: 'Volatility',
                selectMenu: 'tools-nav',
                selectSubmenu: 'submenu1',
                selectItemSubmenu: 'volatility-nav',
                moMenuType: 'privateMenu'
            }
        });
    })

    .run(function run() {
    })

    .controller('VolatilityCtrl', function ($scope) {
        $scope.$on('$stateChangeSuccess', function (event, toState, toParams, fromState, fromParams) {
            if (angular.isDefined(toState.data.pageTitle)) {
                $scope.pageTitle = toState.data.pageTitle + ' | Market Observatory';
                $scope.myData = [{'name': '4IMPRINT GROUP PLC', 'market': 'LSE', 'date':'23 may 2014', 'vol':'30'},
                    {'name':'600 GROUP PLC', 'market': 'LSE','date':'23 may 2014', 'vol':'51'},
                    {'name':'A.SCHULMAN', 'market': 'NASDAQ','date':'27 may 2014', 'vol':'26'},
                    {'name':'A2A SPA ORD', 'market' :'MI','date':'27 may 2014', 'vol':'35'},
                    {'name':'AASTROM BIOSCIENCES', 'market':'NASDAQ','date':'12 may 2014', 'vol':'127'},
                    {'name':'ACERINOX ORD','market': 'MC','date':'27 may 2014', 'vol':'24'},
                    {'name':'ACTIA GROUP ORD', 'market': 'PA','date':'27 may 2014', 'vol':'65'},
                    {'name':'ACTIVISION BLIZZARD INC', 'market': 'NASDAQ','date':'12 may 2014', 'vol':'33'},
                    {'name':'ACXIOM CORP.', 'market':'NASDAQ','date':'27 may 2014', 'vol':'69'},
                    {'name':'ADTEC CORP. : 6840','market': 'TSE','date':'12 may 2014', 'vol':'48'},
                    {'name':'ADV MICRO DEV OR','market':'BE','date':'26 may 2014', 'vol':'46'},
                    {'name':'ADVA OPTICAL ORD', 'market':'BE','date':'26 may 2014', 'vol':'37'},
                    {'name':'ADVANCED MEDICAL SOLUTIONS GROUP PLC', 'market': 'LSE','date':'23 may 2014', 'vol':'35'},
                    {'name':'ADVANCED MICRO DEVICES', 'market': 'NYSE','date':'9 may 2014', 'vol':'44'},
                    {'name':'ADVTECH', 'market': 'J','date':'26 may 2014', 'vol':'37'},
                    {'name':'AEDES ORD','market': 'MI','date':'27 may 2014', 'vol':'54'},
                    {'name':'AEDES ORD', 'market': 'BE','date':'26 may 2014', 'vol':'26'},
                    {'name':'AETERNA ZENTARIS', 'market': 'NASDAQ','date':'12 may 2014', 'vol':'56'},
                    {'name':'AETNA INC.', 'market': 'NYSE','date':'9 may 2014', 'vol':'27'},
                    {'name':'AGNICO-EAGLE MINES LIMITED', 'market': 'NYSE','date':'9 may 2014', 'vol':'43'}
                ];


                window.onload = function(){
                    document.getElementsByClassName('green')[2].style.color ='#54BA1E';
                    document.getElementsByClassName('green')[6].style.color ='#54BA1E ';
                    document.getElementsByClassName('green')[8].style.color ='#54BA1E ';
                    document.getElementsByClassName('green')[11].style.color ='#54BA1E ';
                    document.getElementsByClassName('green')[13].style.color ='#54BA1E ';
                    document.getElementsByClassName('green')[17].style.color ='#54BA1E ';
                    document.getElementsByClassName('green')[18].style.color ='#54BA1E ';
                };
            }

            $scope.loadGraphic = function() {

                var elemDiv = document.createElement('div');
                elemDiv.innerHTML='hello';
                elemDiv.style.cssText = 'position:absolute;width:100%;height:100%;opacity:0.3;z-index:100;background:red;';
                document.body.appendChild(elemDiv);
            };

            $scope.loadIndex = function(){
                var elemDiv = document.createElement('div');
                var img = document.createElement('img');
                //<img id="j_id5006" src="/seam/resource/graphicImage/org.jboss.seam.ui.GraphicImageStore.-52d5a106-145f05411af--72fa.png" height="270" width="750" style="margin-right:20px;" class="historyImagePar">
                elemDiv.innerHTML='hello';
                elemDiv.style.cssText = 'position:absolute;width:68%;height:113%;top:46%;left:15%;z-index:100;background:white;';
                document.body.appendChild(elemDiv);

            };

            $scope.loadPairs = function(){
                alert('pairs');
            };
            $scope.loadFutures = function(){
                alert('futures');
            };
        });


    });



