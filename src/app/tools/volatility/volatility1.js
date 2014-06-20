/**
 * Created by laia on 19/06/14.
 */
function loadData() {

    /*if(document.readyState === "complete"){*/
    window.onload = function(){
        data = [{'name': '4IMPRINT GROUP PLC', 'market': 'LSE', 'date':'23 may 2014', 'vol':'30'},
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

        var i = 0;
        var n = data.length;
        for (i =0; i< n; i++){
            document.getElementsByClassName('tableDiaryLinks')[i].innerHTML = data[i].name;
            document.getElementsByClassName('blackFontMarket')[i].innerHTML = data[i].market;
            document.getElementsByClassName('blackFont')[i].innerHTML = data[i].date;
            document.getElementsByClassName('volatilityCell')[i].innerHTML = data[i].vol;
        }
    };
}