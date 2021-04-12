const route = require('express').Router();
const mysql = require('mysql');
const db = require('../configDB');


route.post('/',(req,res) => {
    const title = req.body.title;
    const description = req.body.description;
    const image = req.body.image;
    const author = req.body.username;
  
    db.query(
      "INSERT INTO Uploads (title, description, image, username) VALUES (?, ?, ?, ?);",
      [title, description, image, author],
      (err, results) => {
        if(err==null){
            res.send("Success");
        }
        else{
            res.send(err);
        }
      }
    );
});

route.get('/peruser/:username',(req,res) => {
  const username = req.params.username;
  db.query(
    `SELECT * FROM Uploads where username='${username}' ;`,(err,response) => {
    if(err==null){
      res.send(response);
    }
    else{
      res.send(err);
    }
  })
});

route.get("/", (req, res) => {
  db.query("SELECT * FROM Uploads", (err, results) => {
    if (err) {
      console.log(err);
    }
    res.send(results);
  });
});



exports = module.exports = route;