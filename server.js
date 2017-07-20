const express = require('express');
const app=express();
const sql = require('./sql.js');
const bodyParser=require('body-parser');
const port=5000||process.env.port;
app.use('/',bodyParser.json());
app.use('/',bodyParser.urlencoded({extended:true}));

app.use('/',express.static('public_static'));
// app.get('/',function(req,res){
//     res.redirect(x.html);
// });
app.post('/songs/library',function(req,res){
    var query='SELECT * FROM songs';
    sql.sqlQuery(query,function (data){
        res.send(data);
    })
})

app.post('/songs/data',function(req,res){
    var query="SELECT * FROM songs WHERE song_id="+req.body.song_id;
    sql.sqlQuery(query,function (data) {
        res.send(data[0]);
    })
})
app.listen(port,function(){
    console.log("listening on"+port);
});
