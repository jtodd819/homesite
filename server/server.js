const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');
const nodemailer = require('nodemailer');
const config = JSON.parse(fs.readFileSync('server/config.json'));


//setup express and body parser
const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//set port to specified environment variable or 3001
app.set('port', process.env.PORT || 3001);

//use a static build on production server
if (process.env.NODE_ENV === 'production') {
  app.use(express.static('client'));
}

//setup nodemailer transport
let transporter = nodemailer.createTransport({
	host: 'smtp.gmail.com',	
	port: 465,
	secure: true,
	auth: {
		type: 'OAuth2',
		clientId: config.id,
		clientSecret: config.secret
	},
});


//send mail using node mailer
app.post('/sendmail', (req,res) => {
	transporter.sendMail({
		from: config.sender,
		to: config.receiver,
		subject: `<${req.body.address}> ${req.body.subject}`,
		text: req.body.message,
		auth: {
			user: config.sender,
			refreshToken: config.refresh,
			accessToken: config.access,
			expires: 3500
		}
	}, (err,res) => {
		if(err){
			console.log(err);
		}else{
			console.log('message sent');
		}
	});
});

//listen on specified port
app.listen(app.get('port'), () => {
  console.log(`Server started at http://localhost:${app.get('port')}/`);
});

