module.exports= function addDoc(db, str, callback){
    var nextShort=require(process.cwd()+"/nextShort.js");
    var assert=require("assert");
    var paths=db.collection("paths");
    var counter=db.collection("counter");
    counter.count( function(err, c){
        if(err){throw err;}
       else if(c===0){
        counter.insert({
        _id:"userId",
        seq:0
    }, function(err, results) {
        assert.equal(null, err);
        assert.equal(1, results.insertedCount);
    });
        }
    })

   var short=nextShort("userId", counter); 
    paths.insertOne({"URL": str, "shortURL":short}, callback);
    
}