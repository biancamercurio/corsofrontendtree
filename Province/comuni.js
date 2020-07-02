const province = {
    ct : [
        "Aci Castello", "Catania", "Agi Catena",
    ],
    en : [
        "Centurime", "aa", "bb", 
    ]
}

function getComuni(key) {
    return province[key];
}

// funzione collegava all'onchange <= si attiva quando cambiamo selezione sulle option
function selezionato() {
    let key = document.getElementById('province').value;
    

    if (document.getElementById('comuni')) {
        document.getElementById('comuni').remove();
    }

    //sto creando una select statica
    let selectComuni = document.createElement('select'); 
    selectComuni.id = "comuni";
    selectComuni.classList.add('form-control', 'mt-4');

    getComuni(key).map((comune) => { 
        let option = document.createElement('option');
        option.text = comune;
        option.value = comune;
        selectComuni.add(option);

    }); 


  /*  for (let i in getComuni(key)) {
        i = indice
        per èremdere il valute
        getComuni(key)[i]
        getComuni(ct)[0] => aci castello
        getComuni(ct)[1] => catania
        
        eccecc
    }

    for (let i of getComuni[key]) {
        i = elemento
    }
*/

   /* let option1 = document.createElement('option');
    let option2 = document.createElement('option');
    option1.text = "aci castello";
    option2.text = "aci reale";
    selectComuni.add(option1);
    selectComuni.add(option2);*/

    let div = document.getElementById('contentSelectComuni')
    div.appendChild(selectComuni);
}

