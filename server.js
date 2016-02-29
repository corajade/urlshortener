var express=require("express");
var MongoClient= require("mongodb").MongoClient;
var addDoc=require(process.cwd()+ "/addDocument.js");
var url = 'mongodb://localhost:27017/shortUrl';
var checkPathStr=require(process.cwd()+ "/checkPathStr.js");
var dbSearch=require(process.cwd()+ "/dbSearch.js")
var app=express();

MongoClient.connect(url, function(err, db){
    if(err){throw err;}


    app.get(/\/.+/, function(req, res){
   var p= req.path;
   console.log(p);
   var b=checkPathStr(p);
   console.log(b + " function")
   if(b){
       var str=p.slice(5);
       addDoc(db, str, function(err, results){
        if(err){throw err;}
        console.log("inserted a document");
    res.json(results.ops);
         
    });
   }
   else if(b==p){
       p=p.slice(1);
      dbSearch(db.collection("paths"), p, function(err, docs){
          if(err){res.end();
          throw err;}
          var redir=docs[0].URL;
          res.redirect(redir);
      }); 
    
   }
     else{
          res.end("No such URL");
      }
 
  
});
app.listen(8080||process.env.PORT);
  

});
