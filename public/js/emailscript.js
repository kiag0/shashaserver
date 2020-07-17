
// subscribe script
function good() {
    console.log("1 aM happi");
}           
good();

let subEmail = document.getElementById('subEmail'); 
let subBtn = document.getElementById('subBtn');
let subError = document.getElementById("subError");
let subAlert = document.getElementById('subAlert');

function removeError() {
   subError.classList.remove('errorAnim');
}

   subBtn.addEventListener('click', (event)=> {
       event.preventDefault();

       if(this.subEmail.value == null || this.subEmail.value == "") {
           subError.classList.add('hideForm');
           setTimeout( removeError , 2000);
       } else {
           
           let subData = {
               method: "POST",
               body: JSON.stringify({email: this.subEmail.value, js: true }),
               headers: {'Content-Type':'application/json'}
           }

           fetch('/emailSub', subData)
               .then(res => {
                   alert('subscribed');
                   subAlert.classList.add("hideForm");
                   if(res.ok) {
                       console.log('yaaaayyy');
                   } else {
                       alert('no response!');
                       console.log(" we are here!");
                       subAlert.classList.add('errortAnim');
                   }
               });
       }
   });