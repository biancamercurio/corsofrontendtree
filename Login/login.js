
function scriviCookie(nomeCookie,valoreCookie,durataCookie)
{
  var scadenza = new Date();
  var adesso = new Date();
  scadenza.setTime(adesso.getTime() + (parseInt(durataCookie) * 60000));
  document.cookie = nomeCookie + '=' + escape(valoreCookie) + '; expires=' + scadenza.toGMTString() + '; path=/';
}

function leggiCookie(nomeCookie)
{
  if (document.cookie.length > 0)
  {
    var inizio = document.cookie.indexOf(nomeCookie + "=");
    if (inizio != -1)
    {
      inizio = inizio + nomeCookie.length + 1;
      var fine = document.cookie.indexOf(";",inizio);
      if (fine == -1) fine = document.cookie.length;
      return unescape(document.cookie.substring(inizio,fine));
    }else{
       return "";
    }
  }
  return "";
}
 
function accedi() {
    let email = document.getElementById("email").value;
    let password = document.getElementById("password").value;
   
    if (email == "" || password == "") {
        alert("Campi vuoti");
    } else {

    let hashPsw = CryptoJS.SHA1(password).toString(CryptoJS.enc.Base64);
    //console.log(hashPsw);
    let utenti = JSON.parse(window.localStorage.getItem(email));
    scriviCookie('psw',hashPsw,60);
    var pswCookie = leggiCookie('psw');
    if (utenti==null) {
        alert("Utente non esistente. Registrati!")
    } else {
        if (utenti==hashPsw) {
           window.location.href = 'welcome.html';

        } else {
            alert("errore");
        }
    }
}
}





/* controllo se email c'è nello storage
- se c'è => alert ("Utente già esistente)
- se non c'è 
cifra la password e quindi inserisci tutto nello storage  */

function registrati() {
    let email = document.getElementById("email").value;
    let psw = document.getElementById("password").value;

    if (email == "" || password == "") {
        alert("Campi vuoti");
    } else {

    let utenti = JSON.parse(window.localStorage.getItem(email));
    if (utenti==null) {
        let hashPsw = CryptoJS.SHA1(psw).toString(CryptoJS.enc.Base64)
        window.localStorage.setItem(email, JSON.stringify(hashPsw));
        alert("Registrazione effettuata con successo");
    } else {
        alert("utente già esistente");
    }

}
}

