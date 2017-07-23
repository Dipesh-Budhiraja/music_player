const express = require('express');
const app=express();
const sql = require('./sql.js');
const fileUpload=require('express-fileupload');
const bodyParser=require('body-parser');
const port=5000||process.env.port;
app.use('/',bodyParser.json());
app.use('/',bodyParser.urlencoded({extended:true}));

app.use('/',express.static('public_static'));
app.use(fileUpload());
// app.get('/',function(req,res){
//     res.redirect(x.html);
// });
app.post('/songs/library',function(req,res){
    var query='SELECT * FROM songs';
    sql.sqlQuery(query,function (data){
        res.send(data);
    })
})
app.post('/songs/update/toggleFav',function(req,res){
    var query2="SELECT fav FROM songs WHERE song_id="+req.body.song_id;
    // console.log(query);
    sql.sqlQuery(query2,function (data){
        var fav=data[0].fav;
        var query1="UPDATE songs SET FAV="+(parseInt(fav)>0?0:1)+" WHERE song_id="+req.body.song_id;
        // console.log(query1);
        sql.sqlQuery(query1,function(data){});
        res.send(JSON.stringify(fav>0?0:1));
    })
})
app.post('/songs/data',function(req,res){
    var query="SELECT * FROM songs WHERE song_id="+req.body.song_id;
    sql.sqlQuery(query,function (data) {
        res.send(data[0]);
    })
})

app.post('/upload', function(req, res) {
    // console.log("blhblaqkdksxz");
    if (!req.files)
        return res.status(400).send('No files were uploaded.');

    let textfile = req.files.file;
    //  console.log(textfile);
    // the uploaded file object
    if(textfile.name.split('.')[1]=='mp3'){
        textfile.mv('./public_static/music/'+textfile.name);
        res.send("File Uploaded");
    }
    else{
        res.status(400).send('please upload mp3 file');
    }
});
app.listen(port,function(){
    console.log("listening on"+port);
});
