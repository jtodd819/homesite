const express = require('express');
const bodyParser = require('body-parser');

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

//send mail using node mailer
app.post('/sendmail', (req,res) => {
	console.log(req.body);
});

//listen on specified port
app.listen(app.get('port'), () => {
  console.log(`Server started at http://localhost:${app.get('port')}/`);
});

