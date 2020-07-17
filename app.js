
/*
  # express app where all routes are defined 
  #
  #
*/

const express = require("express"); // unopinionated server creator
const bodyParser = require("body-parser"); // acces values from the body sent from the frontend and mobile app
const mongoose = require("mongoose"); // mongodb schema provider
const cors = require("cors"); // allows cross origin access
const exphbs  = require('express-handlebars'); //view engine
const path = require('path');
const favicon = require('serve-favicon');
const request = require('request');
const nodemailer = require('nodemailer');




const app = express();

//setup the view engine
app.engine('handlebars', exphbs());
app.set('view engine', 'handlebars');

app.use(cors());
mongoose
  .connect(
    "mongodb+srv://agusto:agusto@valentine-bv3vp.mongodb.net/hymns?retryWrites=true&w=majority" // mongodb url
  )
  .then(() => {
    console.log("Connected to database!");
  })
  .catch(() => {
    console.log("Connection failed!");
  });

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(favicon(path.join(__dirname, 'public','..', 'favicon.ico')))
app.use(express.urlencoded({
  extended: true
}))

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PATCH,PUT, DELETE, OPTIONS"
  );
  next();
});


// set up the main route in the app
app.get('/', function (req, res) {
  res.render('home');
});

app.post('/emailSub', (req,res)=> {
  console.log("'duuuuuuuuuudeeeee'");

  const {email, js} = req.body;

  console.log(email);

  const mcData = {
    members: [
      {
      email_address: email,
      status: 'subscribed',


      }
    ]
  };

  const mcDataPost = JSON.stringify(mcData);
  const options = {
    url: "https://us10.api.mailchimp.com/3.0/lists/158fb82a00",
    method: "POST",
    headers : {
      Authorization: 'auth 29cd69b5b9beec81e5aa62c93a295386-us10'
    },
    body: mcDataPost   

  }
  if(email) {
    request(options, (err, response, body) => {
      if(err) {
        res.json({error: err }) 
        console.log('here, email is not sent 1');
      } else {
        console.log('here, email is sent');
        console.log(response);
        
        res.json({message: "good"})
      }
    })
  } else {
  	console.log('here, email is not sent 2');
    res.status(404).send({message:'failed'})
  }
});

app.post('/contactForm', (req, res) => {
  
 const {name, email, description, interest, inquiry} = req.body;

 console.log(description + name + inquiry + email+ interest);

  let transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
       user: 'wamwane@gmail.com',
       pass: 'koronakorona'
    }
  });
  
  let mailOptions = {
    from: 'Shasha Inquiry',
    to: 'education@shashanetwork.com',
    subject: `New User Inquiry`,
    text: `Name: ${name},
           email: ${email},
           Description: ${description},
           Interest: ${interest},
           Message: ${inquiry}
    `
  };
  
  transporter.sendMail(mailOptions, function(err,data){
    if(err) {
      console.log('mail send error occurs' );
      res.status(404).send({message:'failed'});
    } else {
      res.status(200).send({message:'ok'})
      console.log('email sent!');
    }
  });
  

})


//nodemailer stuff!






module.exports = app;
