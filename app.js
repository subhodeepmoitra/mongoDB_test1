var db = require('./dbconnect.js');
const express = require('express');
const session = require('express-session');
var mysql = require('mysql');
const app = express();
const path = require('path');
const PORT = 3000;

var con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "eServices"
});

app.set('view engine', 'ejs');
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));
app.get('/', function (req, res) {
	res.sendFile(__dirname + "index.html");
  });

app.use(session({
    secret: 'secret',
    resave: true,
    saveUninitialized: true
  }));

// http://localhost:3000/auth
app.post('/auth', function(request, response) {
	// Capture the input fields
	let username = request.body.username;
	let password = request.body.password;
	if (username && password) {
		con.query('SELECT * FROM users WHERE username = ? AND password = ?', [username, password], function(error, results, fields) {
			if (error) throw error;
			if (results.length > 0) {
				request.session.loggedin = true;
				request.session.username = username;
				response.redirect('/home');
			} else {
				response.send('Incorrect Username and/or Password!');
			}			
			response.end();
		});
	} else {
		response.send('Please enter Username and Password!');
		response.end();
	}
});

// http://localhost:3000/home
app.get('/home', function(request, response) {
	// If the user is loggedin
	if (request.session.loggedin) {
		// Output username
		response.send('Welcome back, ' + request.session.username + '!');
		//response.sendFile(path.join(__dirname + "user.html"));
	} else {
		// Not logged in
		response.send('Please login to view this page!');
	}
	response.end();
});

  app.get('/register', (req, res) => {
    res.sendFile(path.join(__dirname + "/public/register.html"));
  })

app.listen(PORT, () => console.log(`Server listening on port: ${PORT}`));