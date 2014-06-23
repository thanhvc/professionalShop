/**
 * Created by laia on 23/06/14.
 */
function loadMyPacksData() {

    /*if(document.readyState === "complete"){*/
    window.onload = function(){
            data = [{'pack': 'Australia + Nueva Zelanda Pack I'},
            {'pack':'Canada Pack I'},
            {'pack':'China Pack I'},
            {'pack':'Corea Pack I'},
            {'pack':'Estados Unidos Pack I'},
            {'pack':'Estados Unidos Pack II'},
            {'pack':'Estados Unidos Pack III'},
            {'pack':'Estados Unidos Pack IV'},
            {'pack':'Estados Unidos Pack V'},
            {'pack':'Estados Unidos Pack VI'},
            {'pack':'EURO Zona Pack I'},
            {'pack':'EURO Zona Pack II'},
            {'pack':'EURO Zona Pack III'},
            {'pack':'EURO Zona Pack IV'},
            {'pack':'Hong-Kong + Singapur Pack I'},
            {'pack':'India + Paquistán + Sri-Lanka Pack I'},
            {'pack':'India + Paquistán + Sri-Lanka Pack II'},
            {'pack':'India + Paquistán + Sri-Lanka Pack III'},
            {'pack':'Japón Pack I'},
            {'pack':'Japón Pack II'},
            {'pack':'Japón Pack III'},
            {'pack':'Japón Pack IV'},
            {'pack':'Japón Pack V'},
            {'pack':'Japón Pack VI'},
            {'pack':'Latino América Pack I'},
            {'pack':'Nórdicos Pack I'},
            {'pack':'Oriente Medio + Magreb Pack I'},
            {'pack':'Reino Unido Pack I'},
            {'pack':'Sudeste Asiático Pack I'},
            {'pack':'Sudeste Asiático Pack II'},
            {'pack':'Sudáfrica Pack I'},
            {'pack':'Suiza + Europa del Este + Rusia Pack I'},
            {'pack':'Taiwan Pack I'}
        ];


        var i = 0;
        var n = data.length;
        for (i =0; i< n; i++){
            document.getElementsByClassName('packName')[i].innerHTML = data[i].pack;
            document.getElementsByClassName('start')[i].innerHTML = 'Ene 2014';
            document.getElementsByClassName('end')[i].innerHTML = 'Dic 2014';
        }

       };
}