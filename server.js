var express=require("express");
var MongoClient= require("mongodb").MongoClient;
var addDoc=require(process.cwd()+ "/addDocument.js");
var url = 'mongodb://localhost:27017/shortUrl';
var checkPathStr=require(process.cwd()+ "/checkPathStr.js");
var dbSearch=require(process.cwd()+ "/dbSearch.js");
var app=express();


MongoClient.connect(url, function(err, db){
    if(err){throw err;}
 var pathColl=db.collection("paths");
    app.get(/new\/.*/, function(req, res, next){
        var p= req.path;
        
       checkPathStr(p, function(err, re){
            if(err){console.log(err);
             res.send("Invalid Url");
                  }
            
           if(!re){
               res.send("Invalid Url");
           }
           else{
              
          dbSearch(pathColl, "URL", re, function(err, doc){
           
          })
         addDoc(db, re, function(err, results){
             
             if(err){throw err;}
           
            var shortened="https://urlshortener-corajade.c9users.io/" + results.ops[0].shortURL;
            var jsonR={"URL":results.ops[0].URL, "shortURL":shortened}
             res.json(jsonR);
           });}
    });
    });
    app.get("/", function(req, res){
         res.sendFile(process.cwd()+ "/index.html");       
     
  });
   
   app.get(/\/.+/, function(req, res){
       var p=req.path;
       p=p.slice(1);
         dbSearch(db.collection("paths"), "shortURL", p, function(err, docs){
          if(err){
          throw err;}
          if(docs.length>0){
          var redir=docs;
          //res.redirect("http://google.com");
          console.log(redir);
          res.redirect(redir);
           
          }
          else{
           res.send("Invalid short URL. Unable to redirect");
          }
      }); 
   });


app.listen(8080||process.env.PORT);
  

});
