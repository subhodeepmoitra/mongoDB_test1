var mysql = require('mysql');
var con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "eServices"
});

console.log("Attempting connection... ");
con.connect(function(err){
    if(err) throw err;
    console.log("DB Connected Successful...");
});