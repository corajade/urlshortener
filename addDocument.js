module.exports= function addDoc(db, str, callback){
    var nextShort=require(process.cwd()+"/nextShort.js");
   
    var paths=db.collection("paths");
    var counter=db.collection("counter");
  

   var short=nextShort("userId", counter); 
    paths.insertOne({"URL": str, "shortURL":short}, callback);
    
};