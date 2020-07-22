
          
          
            // var mymap = L.map('mapid').setView([31.052934, 1.649050], 1);

            // // L.CRS.Simple.addTo(mymap);
            // L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
            //         attribution: '&copy; ShashaNetwork ', //<a href="http://osm.org/copyright">OpenStreetMap</a> contributors
            //         minZoom:2,
            //         maxZoom:2,
            //         id: 'mapbox/streets-v11',
            //         // tileSize: 511,
            //         // zoomOffset: -1,
            //     }).addTo(mymap);

            //     mymap.zoomControl.remove();
            //     mymap.dragging.disable();
            //     mymap.attributionControl.setPrefix('');
                

            //     var orangeIcon = L.icon({
            //         iconUrl: 'usricon.png',
            //         iconSize:     [26, 38], // size of the icon
            //         iconAnchor:   [13, 38], // point of the icon which will correspond to marker's location
            //         popupAnchor:  [-3, -76] // point from which the popup should open relative to the iconAnchor
            //     });


            //     function addPopUp() {
            //         for (let index = 0; index < locations.length; index++) {
            //             locations[index].bindPopup("<b></b>" + locationName[index], {maxWidth: 300});
            //         }
            //     }

            //     addPopUp();


            // contact form script
            console.log("script is running");
            function validateEmail(email) {
                const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
                return re.test(String(email).toLowerCase());
            };
            
            let contactBtn = document.getElementById("cBtn");
            contactBtn.addEventListener('click', (event)=> {
                event.preventDefault();
                 let name;
                let cEmail; 
                let description; 
                let inquiry;
                let interest;
                name = document.getElementById('cname').value;
                cEmail = document.getElementById('cemail').value;
                interest = document.getElementById('cinterest');
                description = document.getElementById('cdescription');
                inquiry = document.getElementById('cinquiry').value;
                let descriptionValue = description.options[description.selectedIndex].value;
                let interestValue = interest.options[interest.selectedIndex].value

                let contactForm = document.getElementById('contactForm');

                let emailValidity = validateEmail(cEmail);

                if (emailValidity != true) {

                    console.log('email is not valid')
                    contactBtn.innerHTML = " invalid email!";
                    return;
                }

                console.log(inquiry.length);
                if (inquiry.length > 1500) {
                    console.log('Inquiry too long')
                    contactBtn.innerHTML = " Inquiry too long!";
                return;
                }

                  let xubData = {
                         method: "POST",
                         body: JSON.stringify({email:cEmail, name:name, description:descriptionValue, interest:interestValue, inquiry:inquiry}),
                         headers: {'Content-Type':'application/json'}
                     }

                fetch('/contactForm', xubData)
                        .then(res => {
                            contactBtn.innerHTML = "SENT!"
                            contactForm.classList.add('hideForm');
                            if(res.okay) {
                                console.log('yaaaayyy');
                                contactForm.classList.add('hideForm');
                            } else
                             {
                                contactForm.classList.add('hideForm');
                                console.log(" we are here!");
                                subAlert.classList.add('errortAnim');
                        }
                });
           
            });