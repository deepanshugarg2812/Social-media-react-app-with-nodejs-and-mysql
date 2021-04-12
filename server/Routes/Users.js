const route = require('express').Router();
const mysql = require('mysql');
const db = require('../configDB');

route.post('/register',async (req,res) => {
    if(req.body.username==undefined || req.body.password==undefined){
        res.send("Error while validating");
    }
    else{
        await db.query(`INSERT INTO Users (Username,Password) values ('${req.body.username}','${req.body.username}');`,(error,result) => {
            if(error) {
                res.send("Username already exists");
            }
            else{
                res.send("Successfully registered");
            }
        });
    }
})

route.post('/login',async (req,res) => {
    if(req.body.username==undefined || req.body.password==undefined){
        res.send("Error while validating");
    }
    else{
        await db.query(`SELECT username,password from Users where username='${req.body.username}' and password='${req.body.username}';`,(error,result) => {
            if(error) {
                res.send("Username already exists");
            }
            if(result.length>0){
                if(result[0].username==req.body.username && result[0].password==req.body.password){
                    res.json({loggedIn : true,username : req.body.username});
                }
                else{
                    res.json({loggedIn : false,message : "Wrong username or password"});
                }
            }
            else{
                res.json({loggedIn : false,message : "Wrong username or password"});
            }
        });
    }
})

exports = module.exports = route;