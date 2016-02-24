var express=require("express");
var MongoClient= require("mongodb").MongoClient;
var addDoc=require(process.cwd()+ "/addDocument.js");
var url = 'mongodb://localhost:27017/test';
var checkPath=require(process.cwd()+ "/checkPathStr.js")
var app=express();

MongoClient.connect(url, function(err, db){
    if(err){throw err;}
    var exp=db.collection("exp");
    exp.insertOne({"num":5, "likes":"dogs"}, function(err, r){
        if(err){return err;}
        console.log(r.ops[0].likes);
    })

    app.get(/./, function(req, res){
   var p= req.path;
   var b=checkPath(p);
  res.end("Hello");
  
});
app.listen(8080);
  

});
