const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');
const nodemailer = require('nodemailer');
const mongoose = require('mongoose');
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

//setup mongodb mongoose connection
const uriString = `mongodb://webdb:${config.mPW}@website-shard-00-00-ybzlj.mongodb.net:27017,website-shard-00-01-ybzlj.mongodb.net:27017,website-shard-00-02-ybzlj.mongodb.net:27017/workouts?ssl=true&replicaSet=website-shard-0&authSource=admin`

mongoose.connect(uriString, (err, res) => {
	if(err){
		console.log(err);
	}else{
		console.log("Connected to DB");
	}
});

//create schema for exercises
const exerciseSchema = new mongoose.Schema({
	index: { type: Number, min: 0 },
	name: String,
	max: { type: Number, min: 1 },
	weighted: Boolean
});

const Exercise = mongoose.model('Exercise', exerciseSchema);

//route for adding exercises to the database 
app.post('/add', (req, res) => {
	Exercise.create({ index: req.body.index, name: req.body.name, max: req.body.max, weighted: req.body.weighted }, (err, res) => {
		if(err){
			console.log(err);
		}else{
			console.log(`${res} exercise added.`);
		}
	});
});

//route for changing exercise in the database

//route for deleting exercises from the database
app.post('/delete', (req, res) => {
	Exercise.remove({ index: req.body.index }, err => {
		if(err){
			console.log(err);
		}
	});
});

//route for changing exercises in the database
app.post('/change', (req, res) => {
	Exercise.updateOne({ index: req.body.index }, { name: req.body.name, max: req.body.max, weighted: req.body.weighted }, err => {
		if(err){
			console.log(err);
		}
	});
});

//route for retreiving exercises from the database
app.get('/getExercises', (req, res) => {
	Exercise.find({}).exec((err, exercises) => {
		if(err){
			console.log(err);
		}else{
			res.send(exercises);
		}
	});
});

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

