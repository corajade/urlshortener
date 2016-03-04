var express=require("express");
var MongoClient= require("mongodb").MongoClient;
var addDoc=require(process.cwd()+ "/addDocument.js");
var url = 'mongodb://localhost:27017/shortUrl';
var checkPathStr=require(process.cwd()+ "/checkPathStr.js");
var dbSearch=require(process.cwd()+ "/dbSearch.js");
var app=express();

MongoClient.connect(url, function(err, db){
    if(err){throw err;}
 
    app.get(/new\/.*/, function(req, res, next){
        var p= req.path;
        console.log("path=" + p);
       checkPathStr(p, function(err, re){
            if(err){console.log(err);
             res.send("Invalid Url");
                  }
            console.log("re="+re);
           if(!re){
               res.send("Invalid Url");
           }
           else{
               console.log("Check1");
           
         addDoc(db, re, function(err, results){
             
             if(err){throw err;}
            console.log(results.ops);
            var jsonR={"URL":results.ops[0].URL, "shortURL":results.ops[0].shortURL}
             res.json(jsonR);
           });}
    });
    });
    app.get("/", function(req, res){
        
   var p= req.path;
   console.log(p);
       p=p.slice(1);
      dbSearch(db.collection("paths"), p, function(err, docs){
          if(err){res.end();
          throw err;}
         // var redir=docs[0].URL;
          res.end("Goodbye");
          //res.redirect(redir);
      }); 
   
     
  });



app.listen(8080||process.env.PORT);
  

});
