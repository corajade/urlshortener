module.exports= function addDoc(db, str, callback){
    var nextShort=require(process.cwd()+"/nextShort.js");
    var base62=require("base62");
    var paths=db.collection("paths");
    var counter=db.collection("counter");
  

   nextShort("userId", counter, function(err, r){
       if(err){
           throw err;
       }
       var short=base62.encode(r.value.seq);
 
        paths.insertOne({"URL": str, "shortURL":base62.encode(r.value.seq)}, callback);
           
   }); 
   
    
};