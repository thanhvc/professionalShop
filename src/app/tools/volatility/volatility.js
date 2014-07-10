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
                $scope.myData = [
                    {'name': '4IMPRINT GROUP PLC', 'market': 'LSE', 'date': '23 may 2014', 'vol': '30'},
                    {'name': '600 GROUP PLC', 'market': 'LSE', 'date': '23 may 2014', 'vol': '51'},
                    {'name': 'A.SCHULMAN', 'market': 'NASDAQ', 'date': '27 may 2014', 'vol': '26'},
                    {'name': 'A2A SPA ORD', 'market': 'MI', 'date': '27 may 2014', 'vol': '35'},
                    {'name': 'AASTROM BIOSCIENCES', 'market': 'NASDAQ', 'date': '12 may 2014', 'vol': '127'},
                    {'name': 'ACERINOX ORD', 'market': 'MC', 'date': '27 may 2014', 'vol': '24'},
                    {'name': 'ACTIA GROUP ORD', 'market': 'PA', 'date': '27 may 2014', 'vol': '65'},
                    {'name': 'ACTIVISION BLIZZARD INC', 'market': 'NASDAQ', 'date': '12 may 2014', 'vol': '33'},
                    {'name': 'ACXIOM CORP.', 'market': 'NASDAQ', 'date': '27 may 2014', 'vol': '69'},
                    {'name': 'ADTEC CORP. : 6840', 'market': 'TSE', 'date': '12 may 2014', 'vol': '48'},
                    {'name': 'ADV MICRO DEV OR', 'market': 'BE', 'date': '26 may 2014', 'vol': '46'},
                    {'name': 'ADVA OPTICAL ORD', 'market': 'BE', 'date': '26 may 2014', 'vol': '37'},
                    {'name': 'ADVANCED MEDICAL SOLUTIONS GROUP PLC', 'market': 'LSE', 'date': '23 may 2014', 'vol': '35'},
                    {'name': 'ADVANCED MICRO DEVICES', 'market': 'NYSE', 'date': '9 may 2014', 'vol': '44'},
                    {'name': 'ADVTECH', 'market': 'J', 'date': '26 may 2014', 'vol': '37'},
                    {'name': 'AEDES ORD', 'market': 'MI', 'date': '27 may 2014', 'vol': '54'},
                    {'name': 'AEDES ORD', 'market': 'BE', 'date': '26 may 2014', 'vol': '26'},
                    {'name': 'AETERNA ZENTARIS', 'market': 'NASDAQ', 'date': '12 may 2014', 'vol': '56'},
                    {'name': 'AETNA INC.', 'market': 'NYSE', 'date': '9 may 2014', 'vol': '27'},
                    {'name': 'AGNICO-EAGLE MINES LIMITED', 'market': 'NYSE', 'date': '9 may 2014', 'vol': '43'}
                ];

                window.onload = function () {
                    document.getElementsByClassName('green')[2].style.color = '#54BA1E';
                    document.getElementsByClassName('green')[6].style.color = '#54BA1E ';
                    document.getElementsByClassName('green')[8].style.color = '#54BA1E ';
                    document.getElementsByClassName('green')[11].style.color = '#54BA1E ';
                    document.getElementsByClassName('green')[13].style.color = '#54BA1E ';
                    document.getElementsByClassName('green')[17].style.color = '#54BA1E ';
                    document.getElementsByClassName('green')[18].style.color = '#54BA1E ';

                    var n = document.getElementsByClassName('green').length;
                    var last = document.getElementsByClassName('green')[n-1];
                    var child = document.createElement('div');
                    var child1 = document.createElement('div');
                    var child2 = document.createElement('div');

                    document.getElementsByClassName('volatilityCell')[n-1].innerHTML = "";
                    document.getElementsByClassName('volatilityCell')[n-2].innerHTML = "";
                    document.getElementsByClassName('volatilityCell')[n-3].innerHTML = "";
                    child.style.textCss='rich-table-cell subscribeTableCols';
                    child.style.textCss+='volatilityCell';
                    child1.style.textCss='rich-table-cell subscribeTableCols';
                    child1.style.textCss+='volatilityCell';
                    child2.style.textCss='rich-table-cell subscribeTableCols';
                    child2.style.textCss+='volatilityCell';

                    var newlink = document.createElement('a');
                    var newlink1 = document.createElement('a');
                    var newlink2 = document.createElement('a');
                    child.className ='new-element';
                    child1.className ='new-element1';
                    child2.className ='new-element2';
                    newlink.innerHTML = 43;
                    newlink1.innerHTML = 27;
                    newlink2.innerHTML = 56;

                    newlink.addEventListener("click", function() {
                        $scope.loadGraphic();
                    });
                    newlink1.addEventListener("click", function() {
                                            $scope.loadGraphic();
                                        });
                    newlink2.addEventListener("click", function() {
                                            $scope.loadGraphic();
                                        });

                    child.appendChild(newlink);
                    child1.appendChild(newlink1);
                    child2.appendChild(newlink2);
                    document.body.appendChild(child);
                    document.body.appendChild(child1);
                    document.body.appendChild(child2);

                };


            }

            $scope.loadGraphic = function (name) {

                var elemDiv = document.createElement('div');
                //elemDiv.innerHTML = name.srcElement.parentElement.parentElement.children[0].children[0].innerHTML;
                var img = document.createElement('img');
                img.src = "assets/img/graphic.png";
                img.style.cssText = "display:block;padding-top:30px;height:100;width:750;style:margin-right:20px;class:historyImagePar";
                elemDiv.style.cssText = 'position:absolute;padding-top:30px; height:600px;text-align:center;color:#996600;position:absolute;width:68%;top:238px;left:45%;z-index:100;background:white;';
                var closeButton = document.createElement('img');
                closeButton.src = "assets/img/close_modal.png";
                closeButton.style.cssText = 'position:relative;top:0px;left:300px;height:15px;width:15px';
                closeButton.onclick = function (event) {

                    setTimeout(function(){
                        event.srcElement.parentElement.className ='move-to-the-right';
                        event.srcElement.parentElement.addEventListener('webkitTransitionEnd', function(event2) {
                            event.srcElement.parentElement.style.cssText = 'display:none';

                        });
                    },0);


                };
                elemDiv.appendChild(closeButton);
                elemDiv.appendChild(img);
                document.body.appendChild(elemDiv);

                setTimeout(function(){
                    elemDiv.className+=' move';

                },0);

                return 0;

            };

       });
    });





