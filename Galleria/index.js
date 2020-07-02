const SERVERURL = 'http://localhost:3000/';
const USERSURL = 'users/';
const ALBUMSURL = 'albums/';
const PHOTOSSURL = 'photos/';


async function getAlbum() {
   
   let selectedUser = document.getElementById('users');
   let userID = selectedUser.value;
   let name = selectedUser.options[selectedUser.options.selectedIndex].innerText;
   document.getElementById('selectedUser').innerHTML = name;

   let albums$ = await fetch(`${SERVERURL}${USERSURL}${userID}/${ALBUMSURL}`).then((res) => res.json());
   let colTag = '';

   albums$.forEach(async (album) => {

      let imgs$ = await fetch(`${SERVERURL}${ALBUMSURL}${album.id}/${PHOTOSSURL}`).then((response) => response.json());
      totImg = imgs$.length;
     
     let albumThumbnailUrl = imgs$[0].thumbnailUrl;

      colTag += `
      <div class="col-3">
         <div class="albums" style="background-image: url('${albumThumbnailUrl}')" onclick="getPhotos(${album.id}, '${album.title}')" onmouseover="getDatas(${totImg}, ${album.id})" onmouseout="annullDatas(${album.id})">
         <span class="spanDecoration" id="imgTot${album.id}"></span>
         </div>
         <p>${album.title}</p>

      </div>
      `;
      document.getElementById('albumContent').innerHTML = colTag;

   });
}

async function getPhotos(albumID, albumTitle) {
    let photos$ = await fetch(`${SERVERURL}${ALBUMSURL}${albumID}/${PHOTOSSURL}`).then((res) => res.json()); 
    console.log(albumID);
   // console.log(albumTitle);
    colTag = ``;

    document.getElementById('albumTitle').innerHTML = albumTitle;
    
     photos$.forEach(photo => {
  
        colTag += `
        <div class="col-3">
           <img src="${photo.thumbnailUrl}" class="img-fluid">
  
        </div>
        `;
        document.getElementById('photoContent').innerHTML = colTag;
  
     }); 
}

function getDatas(all, indice) {
    document.getElementById("imgTot"+indice).innerHTML = all;
}

function annullDatas(indice) {
    document.getElementById("imgTot"+indice).innerHTML = '';
}

async function getUsers() {
   let users$ = await fetch(`${SERVERURL}${USERSURL}`).then(response => response.json());
   return users$;
}

function initialization() {

   let users = getUsers();
   let optionTag = '';
   users.then((usr) => {
      usr.forEach(user => {
         optionTag += `<option value="${user.id}">${user.name}</option>`;
      });
      document.getElementById('users').innerHTML = optionTag;
   });
}

window.onload = function () {
   initialization();
}