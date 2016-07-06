var express=require("express");
var MongoClient= require("mongodb").MongoClient;
require("dotenv").load();
var addDoc=require(process.cwd()+ "/addDocument.js");
var url =  process.env.MONGOLAB_URI ||
    process.env.MONGOHQ_URL || 'mongodb://localhost:27017/shortUrl';
var checkPathStr=require(process.cwd()+ "/checkPathStr.js");
var app=express();
process.env.PWD=process.cwd();
app.use(express.static(process.env.PWD + "/public"));


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
              
         pathColl.find({"URL":re}).toArray(function(err, doc){
            if(err){throw err;}
            
             if(doc.length>0){
             var jsonRes={"URL":doc[0]["URL"], "shortURL":"https://powerful-chamber-28043.herokuapp.com/"
             +doc[0]["shortURL"]}
              res.json(jsonRes);
             }
             else{
              addDoc(db, re, function(err, results){
             
             if(err){throw err;}
           
            var shortened="https://powerful-chamber-28043.herokuapp.com/" + results.ops[0].shortURL;
            var jsonR={"URL":results.ops[0].URL, "shortURL":shortened}
             res.json(jsonR);
           });
             }
          });
         }
    });
    });
     
    app.get("/", function(req, res){
         res.sendFile(process.env.PWD+ "/public/index.html");
         res.end();
     
  });
   
   app.get(/\/.+/, function(req, res){
       var p=req.path;
       p=p.slice(1);
      
       pathColl.find({"shortURL": p}).toArray( 
          function(err, docs){
          if(err){
          throw err;}
          
          if(docs.length>0){
          var redir=docs[0]["URL"];
      
      
          res.redirect(redir);
           
          }
          else if(docs.length==0){
           res.send("Invalid short URL. Unable to redirect");
          }
      }); 
   });


app.listen(process.env.PORT||8080);
  

});
