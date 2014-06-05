/**
 * Created by Aitor on 21/04/14.
 */

angular.module('singUp', [])

    .config(function config($stateProvider) {
        /*State for first signup step*/
        $stateProvider.state('signup', {
            url: '/sign-up',
            views: {
                "main": {
                    templateUrl: 'sign_up/sign-up.tpl.html'
                }
            },
            data: {
                /* empty the menu data*/
                pageTitle: '',
                selectMenu: '',
                selectSubmenu: '',
                selectItemSubmenu: '',
                moMenuType: 'publicMenu',
                user: {
                    email: '',
                    email2: '',
                    password: '',
                    password2: '',
                    name: '',
                    surname: '',
                    address: '',
                    city: '',
                    postal: '',
                    country: '',
                    conditions: '',
                    captcha: ''
                }

            }})
            .state('signup2', {
                url: '/sign-up-step2',
                views: {
                    "main": {
                        templateUrl: 'sign_up/sign-up2.tpl.html'
                    }
                },
                data: {
                    /* empty the menu data*/
                    pageTitle: '',
                    selectMenu: '',
                    selectSubmenu: '',
                    selectItemSubmenu: '',
                    moMenuType: 'publicMenu',
                    user: {
                        email: '',
                        email2: '',
                        password: '',
                        password2: '',
                        name: '',
                        surname: '',
                        address: '',
                        city: '',
                        postal: '',
                        country: '',
                        conditions: '',
                        captcha: ''
                    }
                }
            })
            .state('signupSuccessful', {
                url: '/sign-up-successful',
                views: {
                    "main": {
                        templateUrl: 'sign_up/sign-up-successful.tpl.html'
                    }
                },
                data: {
                    /* empty the menu data*/
                    pageTitle: '',
                    selectMenu: '',
                    selectSubmenu: '',
                    selectItemSubmenu: '',
                    moMenuType: 'publicMenu',
                    user: {
                        email: '',
                        email2: '',
                        password: '',
                        password2: '',
                        name: '',
                        surname: '',
                        address: '',
                        city: '',
                        postal: '',
                        country: '',
                        conditions: '',
                        captcha: ''
                    }
                }
            });
    })
    .run(function run() {
    })

    .controller('SignupCtrl', function ($scope, $state, SignUpService) {
        $scope.$on('$stateChangeSuccess', function (event, toState, toParams, fromState, fromParams) {
            if (angular.isDefined(toState.data.pageTitle)) {
                $scope.pageTitle = toState.data.pageTitle + ' | Market Observatory';
            }

            //password Pattern, note that to not allow spaces must use ng-trim="false" in the input
            $scope.passwordPatten = /^[a-zA-Z0-9-_]+$/;
            //user model
            $scope.user = toState.data.user;

            //result of form submit -- just for test for now, the final results must be checked
            $scope.result = {
                result: "unknown",
                username: "unknown"
            };


            //function to send the first step form
            //Calls firstStep of the SignUpService and takes result=ok / error
            $scope.sendFirstStep = function () {
                var result = SignUpService.firstStep($scope.user);
                $scope.result = result;
                if ($scope.result.result == "ok") {
                    //if the results are OK, we save the model in the state (in case of press back button)
                    //and go to step2
                    $state.user = $scope.user;
                    $state.go('signup2');
                }

            };

            //Step 2

            //countries list of select (the value <option> could not be the same as the id in the html, but its works well)
            //angularjs sets internally the id in the object
            //the country selected is set in the user directly
            $scope.countries = SignUpService.getCountries();//default option set in the view html

            //patterns for validation
            //letters and special characters (like dieresis) (with spaces) but not numbers or other special chars
            $scope.namePattern = /^([ \u00c0-\u01ffa-zA-Z'\-])+$/;
            //only numbers, letters and spaces
            $scope.zipPattern = /[a-z0-9\s]+/ig;
            //only numbers
            $scope.captchaPattern = /^\d+$/;
            $scope.formSubmited = false; //variable that is true when the form is submited to check the inputs
            $scope.validCaptcha = true; //set the captcha to true (correct by default, when the server responses with the valid/invalid captcha we change it)
            //send the second step submit
            $scope.sendSecondStep = function () {
                $scope.validCaptcha= true;
                $scope.formSubmited = true; //set the second form as submited (to check the inputs)
                if ($scope.formReg.$valid) {
                    //if the form is correct, we go to the service
                    var result = SignUpService.secondStep($scope.user);
                    if (result == "ok") {
                        $scope.validCaptcha = true;
                        $state.user = $scope.user;
                        $state.go('signupSuccessful');

                    } else if (result == "incorrectCaptcha") {
                        $scope.validCaptcha=false;
                    } else  {
                        $scope.validCaptcha= true;
                    }
                }
            };
        });
    })
/**
 * Directive Match, used to check that two inputs matches (like repeat password or repeat email).
 * the directive must be used like: < input ng-model="user.repeatEmail" match="user.email"/>
 * and can be checked like <div ng-show="form.repeatMail.$error.mismatch">ERROR</div>
 */
    .directive('match', function ($parse) {
        return {
            require: 'ngModel',
            link: function (scope, elem, attrs, ctrl) {
                scope.$watch(function () {
                    return $parse(attrs.match)(scope) === ctrl.$modelValue;
                }, function (currentValue) {
                    ctrl.$setValidity('mismatch', currentValue);
                });
            }
        };
    })
    .factory('SignUpService', function () {
        var signUpService = {};
        signUpService.firstStep = function (user) {
            var response = {
                result: "ok",
                username: "not-used"
            };
            //testing used mail
            if (user.email == "test@test") {
                response.result = "error";
                response.username = "used";
            }
            return response;
        };
        signUpService.secondStep = function (user) {
            if (user.captcha =="4") {
                return "ok";
            } else {
                return "incorrectCaptcha";
            }
        };

        //countries get by json (extract from server)
        signUpService.getCountries = function () {
            return [
                {value: "1", name: "Afganistán"},
                {value: "2", name: "Albania"},
                {value: "81", name: "Alemania"},
                {value: "5", name: "Andorra"},
                {value: "6", name: "Angola"},
                {value: "7", name: "Anguilla"},
                {value: "74", name: "Antillas Francesas"},
                {value: "155", name: "Antillas Holandesas"},
                {value: "248", name: "Antártida"},
                {value: "189", name: "Arabia Saudita"},
                {value: "3", name: "Argelia"},
                {value: "9", name: "Argentina"},
                {value: "10", name: "Armenia"},
                {value: "11", name: "Aruba"},
                {value: "12", name: "Australia"},
                {value: "13", name: "Austria"},
                {value: "14", name: "Azerbaiyán"},
                {value: "15", name: "Bahamas"},
                {value: "16", name: "Bahrein"},
                {value: "17", name: "Bangladesh"},
                {value: "18", name: "Barbados"},
                {value: "19", name: "Barbuda"},
                {value: "20", name: "Belarús"},
                {value: "22", name: "Belice"},
                {value: "23", name: "Benin"},
                {value: "24", name: "Bermuda"},
                {value: "26", name: "Bolivia"},
                {value: "27", name: "Bosnia"},
                {value: "28", name: "Botswana"},
                {value: "30", name: "Brasil"},
                {value: "31", name: "British Indian Ocean Territory"},
                {value: "32", name: "Brunei Darussalam"},
                {value: "33", name: "Bulgaria"},
                {value: "34", name: "Burkinia Faso"},
                {value: "35", name: "Burundi"},
                {value: "25", name: "Bután"},
                {value: "21", name: "Bélgica"},
                {value: "39", name: "Cabo Verde"},
                {value: "36", name: "Camboya"},
                {value: "37", name: "Camerún"},
                {value: "38", name: "Canadá"},
                {value: "43", name: "Chile"},
                {value: "44", name: "China"},
                {value: "55", name: "Chipre"},
                {value: "46", name: "Cocos Keeling Islas"},
                {value: "47", name: "Colombia"},
                {value: "48", name: "Comores"},
                {value: "49", name: "Congo"},
                {value: "164", name: "Corea del Norte"},
                {value: "200", name: "Corea del Sur"},
                {value: "51", name: "Costa Rica"},
                {value: "110", name: "Costa de Marfil"},
                {value: "52", name: "Cote Divoire"},
                {value: "53", name: "Croacia"},
                {value: "54", name: "Cuba"},
                {value: "57", name: "Dinamarca"},
                {value: "59", name: "Dominica"},
                {value: "62", name: "Ecuador"},
                {value: "63", name: "Egipto"},
                {value: "64", name: "El Salvador"},
                {value: "230", name: "Emiratos Árabes Unidos"},
                {value: "66", name: "Eritrea"},
                {value: "195", name: "Eslovaquia"},
                {value: "196", name: "Eslovenia"},
                {value: "201", name: "España"},
                {value: "232", name: "Estados Unidos"},
                {value: "67", name: "Estonia"},
                {value: "68", name: "Etiop&iacute;a"},
                {value: "174", name: "Filipinas"},
                {value: "72", name: "Finlandia"},
                {value: "71", name: "Fiyi"},
                {value: "73", name: "Francia"},
                {value: "78", name: "Gab&oacute;n"},
                {value: "79", name: "Gambia"},
                {value: "80", name: "Georgia"},
                {value: "82", name: "Ghana"},
                {value: "83", name: "Gibraltar"},
                {value: "255", name: "Global"},
                {value: "86", name: "Granada"},
                {value: "87", name: "Granadinas"},
                {value: "84", name: "Grecia"},
                {value: "85", name: "Groenlandia"},
                {value: "88", name: "Guadalupe"},
                {value: "89", name: "Guam"},
                {value: "90", name: "Guatemala"},
                {value: "75", name: "Guayana Francesa"},
                {value: "91", name: "Guernsey"},
                {value: "92", name: "Guinea"},
                {value: "65", name: "Guinea Ecuatorial"},
                {value: "249", name: "Guinea Ecuatorial"},
                {value: "93", name: "Guinea-Bissau"},
                {value: "94", name: "Guyana"},
                {value: "95", name: "Hait&iacute;"},
                {value: "97", name: "Herzegovina"},
                {value: "98", name: "Honduras"},
                {value: "99", name: "Hong Kong"},
                {value: "100", name: "Hungr&iacute;a"},
                {value: "102", name: "India"},
                {value: "103", name: "Indonesia"},
                {value: "105", name: "Iraq"},
                {value: "106", name: "Irlanda"},
                {value: "104", name: "Irán"},
                {value: "29", name: "Isla Bouvet"},
                {value: "163", name: "Isla Norfolk"},
                {value: "107", name: "Isla de Man"},
                {value: "45", name: "Isla de Navidad"},
                {value: "101", name: "Islandia"},
                {value: "50", name: "Islas Cook"},
                {value: "70", name: "Islas Feroe"},
                {value: "96", name: "Islas Heard y McDonald"},
                {value: "69", name: "Islas Malvinas"},
                {value: "165", name: "Islas Marianas del Norte"},
                {value: "250", name: "Islas Marshall"},
                {value: "225", name: "Islas Turcas y Caicos"},
                {value: "239", name: "Islas V&iacute;rgenes"},
                {value: "254", name: "Islas V&iacute;rgenes Estadounidenses"},
                {value: "240", name: "Islas Wallis y Futuna"},
                {value: "108", name: "Israel"},
                {value: "109", name: "Italia"},
                {value: "111", name: "Jamaica"},
                {value: "112", name: "Jan Mayen"},
                {value: "113", name: "Jap&oacute;n"},
                {value: "114", name: "Jersey"},
                {value: "115", name: "Jordania"},
                {value: "116", name: "Kazajstán"},
                {value: "117", name: "Kenia"},
                {value: "120", name: "Kirguizistán"},
                {value: "118", name: "Kiribati"},
                {value: "119", name: "Kuwait"},
                {value: "76", name: "La Polinesia Francesa"},
                {value: "121", name: "Laos"},
                {value: "124", name: "Lesotho"},
                {value: "122", name: "Letonia"},
                {value: "125", name: "Liberia"},
                {value: "126", name: "Libia"},
                {value: "127", name: "Liechtenstein"},
                {value: "128", name: "Lituania"},
                {value: "129", name: "Luxemburgo"},
                {value: "130", name: "Macau"},
                {value: "131", name: "Macedonia"},
                {value: "132", name: "Madagascar"},
                {value: "134", name: "Malasia"},
                {value: "133", name: "Malawi"},
                {value: "135", name: "Maldivas"},
                {value: "137", name: "Malta"},
                {value: "136", name: "Mal&iacute;"},
                {value: "148", name: "Marruecos"},
                {value: "138", name: "Martinica"},
                {value: "140", name: "Mauricio"},
                {value: "139", name: "Mauritania"},
                {value: "251", name: "Mayotte"},
                {value: "142", name: "Micronesia"},
                {value: "143", name: "Moldavia"},
                {value: "146", name: "Mongolia"},
                {value: "252", name: "Montenegro"},
                {value: "147", name: "Montserrat"},
                {value: "149", name: "Mozambique"},
                {value: "150", name: "Myanmar"},
                {value: "141", name: "México"},
                {value: "145", name: "M&oacute;naco"},
                {value: "151", name: "Namibia"},
                {value: "152", name: "Nauru"},
                {value: "153", name: "Nepal"},
                {value: "159", name: "Nicaragua"},
                {value: "156", name: "Nieves"},
                {value: "161", name: "Nigeria"},
                {value: "162", name: "Niue"},
                {value: "166", name: "Noruega"},
                {value: "157", name: "Nueva Caledonia"},
                {value: "158", name: "Nueva Zelanda"},
                {value: "160", name: "N&iacute;ger"},
                {value: "167", name: "Omán"},
                {value: "168", name: "Pakistán"},
                {value: "169", name: "Palau"},
                {value: "170", name: "Panamá"},
                {value: "171", name: "Papua Nueva Guinea"},
                {value: "172", name: "Paraguay"},
                {value: "154", name: "Pa&iacute;ses Bajos"},
                {value: "173", name: "Perú"},
                {value: "176", name: "Polonia"},
                {value: "177", name: "Portugal"},
                {value: "178", name: "Pr&iacute;ncipe"},
                {value: "179", name: "Puerto Rico"},
                {value: "180", name: "Qatar"},
                {value: "231", name: "Reino Unido"},
                {value: "41", name: "República Centroafricana"},
                {value: "56", name: "República Checa"},
                {value: "60", name: "República Dominicana"},
                {value: "181", name: "Reunion"},
                {value: "184", name: "Ruanda"},
                {value: "182", name: "Ruman&iacute;a"},
                {value: "183", name: "Rusia"},
                {value: "186", name: "Samoa"},
                {value: "4", name: "Samoa Americana"},
                {value: "204", name: "San Crist&oacute;bal"},
                {value: "187", name: "San Marino"},
                {value: "206", name: "San Vicente"},
                {value: "203", name: "Santa Elena"},
                {value: "185", name: "Santa Luc&iacute;a"},
                {value: "188", name: "Santo Tomé"},
                {value: "190", name: "Senegal"},
                {value: "191", name: "Serbia y Montenegro"},
                {value: "192", name: "Seychelles"},
                {value: "193", name: "Sierra Leona"},
                {value: "194", name: "Singapur"},
                {value: "213", name: "Siria"},
                {value: "198", name: "Somalia"},
                {value: "202", name: "Sri Lanka"},
                {value: "205", name: "St Pierre"},
                {value: "210", name: "Suazilandia"},
                {value: "199", name: "Sudáfrica"},
                {value: "207", name: "Sudán"},
                {value: "211", name: "Suecia"},
                {value: "212", name: "Suiza"},
                {value: "208", name: "Surinaam"},
                {value: "209", name: "Svalbard"},
                {value: "214", name: "Tadzhikstan"},
                {value: "217", name: "Tailandia"},
                {value: "215", name: "Taiwan"},
                {value: "216", name: "Tanzan&iacute;a"},
                {value: "77", name: "Territorios Australes Franceses"},
                {value: "61", name: "Timor Oriental"},
                {value: "253", name: "Timor Oriental"},
                {value: "218", name: "Togo"},
                {value: "219", name: "Tokelau"},
                {value: "220", name: "Tonga"},
                {value: "221", name: "Trinidad y Tobago"},
                {value: "224", name: "Turkmenistn"},
                {value: "223", name: "Turqu&iacute;a"},
                {value: "226", name: "Tuvalu"},
                {value: "222", name: "Túnez"},
                {value: "228", name: "Ucrania"},
                {value: "227", name: "Uganda"},
                {value: "229", name: "Unidades de Fomento"},
                {value: "233", name: "Uruguay"},
                {value: "234", name: "Uzbekistán"},
                {value: "235", name: "Vanuatu"},
                {value: "237", name: "Venezuela"},
                {value: "238", name: "Vietnam"},
                {value: "242", name: "Yemen"},
                {value: "58", name: "Yibuti"},
                {value: "243", name: "Yugoslavia"},
                {value: "244", name: "Zambia"},
                {value: "245", name: "Zimbabwe"},
                {value: "40", name: "de las Islas Caimán"},
                {value: "42", name: "el Chad"},
                {value: "123", name: "el L&iacute;bano"},
                {value: "241", name: "el Sáhara Occidental"},
                {value: "175", name: "isla de Pitcairn"},
                {value: "236", name: "la Ciudad del Vaticano"},
                {value: "197", name: "las Islas Salom&oacute;n"},
                {value: "247", name: "Åland"}
            ];
        };
        return signUpService;

    });






