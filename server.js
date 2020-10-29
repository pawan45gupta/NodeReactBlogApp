var mysql = require('mysql');
var express = require("express");
var app = express();
var cors = require('cors');
const bodyParser = require('body-parser');

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.resolve(__dirname, './client/build')));

app.use('/', index);
app.use(bodyParser.json());

var con = mysql.createConnection({
  host: "localhost",
  port: "3306",
  user: "root",
  password: "test@demo",
  database: "sys"
});

app.use(cors());

con.connect(function(err) {
  if (err) throw err;
  console.log("Connected!");

  con.query("DROP DATABASE IF EXISTS mydb", function (err, result) {
    if (err) throw err;
    console.log("Database dropped");
  });

  con.query("CREATE DATABASE mydb", function (err, result) {
    if (err) throw err;
    console.log("Database created");
  });

  var sql = "CREATE TABLE mydb.Blogs (id int NOT NULL AUTO_INCREMENT, title VARCHAR(255) NOT NULL, description VARCHAR(255) NOT NULL, PRIMARY KEY (id))";
  con.query(sql, function (err, result) {
    if (err) throw err;
    console.log("Table created");
  });
  var sql = "INSERT INTO mydb.Blogs (title, description) VALUES ?";
  var values = [
    ['Shrimp and Chorizo Paella', 'This impressive paella is a perfect party dish and a fun meal to cook together with your guests. Add 1 cup of frozen peas along with the mussels, if you like.'],
    ['Reactivity At its Best', 'Just go with flow eventually its very hard for us to go for all of us to go with such flow'],
    ['Amber Steels the show', 'Amber was great thing to watch at Totono Festival. Toronto Festival is just awesome place to stuck through'],
    ['Hannah Montana Show', 'This show has grasped the limelight for a while now spreading its vibes across the nation']
    ];
    con.query(sql, [values], function (err, result) {
    if (err) throw err;
    console.log("Number of records inserted: " + result.affectedRows);
    });
});

app.get("/blogs",function(req,res){
  con.query('SELECT * from mydb.Blogs', function(err, rows, fields) {
    if (!err) {
      console.log('The rows are: ', rows); 
      res.send(rows);
    }
    else
      console.log('Error while performing Query.');
  });
});

app.post("/blogs",function(req,res){
    var sql = `DELETE FROM mydb.Blogs WHERE id = ${req.body.id}`;
    con.query(sql, function (err, result) {
        if (err) throw err;
        console.log("Number of records deleted: " + result.data);
    });
    con.query('SELECT * from mydb.Blogs', function(err, rows, fields) {
        if (!err) {
          console.log('The rows are: ', rows); 
          res.send(rows);
        }
        else
          console.log('Error while performing Query.');
      });
  });

app.listen(process.env.PORT || 5000, () => console.log('Listening at Port 5000'));