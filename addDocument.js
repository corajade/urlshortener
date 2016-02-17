module.exports= function addDoc(db, url, callback){
    var nextShort=require(process.cwd()+"/nextShort.js");
    var assert=require("assert");
    var paths=db.collection("paths");
    var counter=db.collection("counter");
    counter.insert({
        _id:"userId",
        seq:0
    }, function(err, results) {
        assert.equal(null, err);
        assert.equal(1, results.insertedCount);
    });
    
    paths.insert({"URL": url}, function(err, results){
        if(err){throw err;}
        console.log("inserted a document");
        console.log(results);
        callback(results);
    });
    
}