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


//use static with production
if(process.env.DEPLOY == 1){
	app.use(express.static(path.join(__dirname, '../build')));
	app.set('port', 3000);
	app.get('/*', function (req, res) {
		res.sendFile(path.join(__dirname, '../build', 'index.html'));
	});
}else{
	app.set('port', 3001);
}

//setup mongodb mongoose connection
const uriString = `mongodb://webdb:${config.mPW}@website-shard-00-00-ybzlj.mongodb.net:27017,website-shard-00-01-ybzlj.mongodb.net:27017,website-shard-00-02-ybzlj.mongodb.net:27017/workouts?ssl=true&replicaSet=website-shard-0&authSource=admin`

mongoose.connect(uriString, (err, res) => {
	if(err){
		console.log(err);
	}else{
		console.log('Connected to database');
	}
});

//create schema for exercises
const exerciseSchema = new mongoose.Schema({
	user: { type: Number, min: 0 },
	index: { type: Number, min: 0 },
	name: String,
	max: { type: Number, min: 1 },
	weighted: Boolean
});

const Exercise = mongoose.model('Exercise', exerciseSchema);


//route for adding exercises to the database 
app.post('/add', (req, res) => {
	Exercise.create({ user: req.body.user, index: req.body.index, name: req.body.name, 
	max: req.body.max, weighted: req.body.weighted }, 
	(err, exercise) => {
		if(err){
			console.log(err);
		}else{
			res.send(exercise);
		}
	});
});


//route for deleting exercises from the database
app.post('/delete', (req, res) => {
	Exercise.remove({ user: req.body.user, index: req.body.index }, err => {
		if(err){
			console.log(err);
		}else{
			res.send('deleted');
		}
	});
});

//route for changing exercises in the database
app.post('/change', (req, res) => {
	Exercise.updateOne({ user: req.body.user, index: req.body.index }, 
	{ name: req.body.name, max: req.body.max, weighted: req.body.weighted }, err => {
		if(err){
			console.log(err);
		}else{
			res.send('changed');
		}
	});
});

//route for retreiving exercises from the database
app.post('/getExercises', (req, res) => {
	Exercise.find({ user: req.body.user }).exec((err, exercises) => {
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
	}, (err,response) => {
		if(err){
			console.log(err);
		}else{
			res.send('Message sent!');
		}
	});
});

//listen on specified port
app.listen(app.get('port'), () => {
  console.log(`Server started at http://localhost:${app.get('port')}/`);
});

