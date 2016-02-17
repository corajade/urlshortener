var express=require("express");
var MongoClient= require("mongodb").MongoClient;
var addDoc=require(process.cwd()+ "/addDocument.js");
var url = 'mongodb://localhost:27017/test';
var app=express();

MongoClient.connect(url, function(err, db){
    if(err){throw err;}
   

    app.get(/./, function(req, res){
   var p= req.path;
  db.collection("paths").insertOne({"path":p}, function(err, result){
      if(err){throw err;}
      console.log("successful insertion 3");
        var cursor= db.collection("paths").findOne();
         console.log(cursor);
  }); 


  res.end("Hello");
  
});
app.listen(8080);
  

});
