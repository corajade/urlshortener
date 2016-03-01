


module.exports=function nextShort(str, collection){
  var base62=require("base62");
  var assert=require("assert");
    collection.count( function(err, c){
        if(err){throw err;}
       else if(c===0){
        collection.insert({
        _id:"userId",
        seq:0
    }, function(err, results) {
        assert.equal(null, err);
        assert.equal(1, results.insertedCount);
        collection.findOneAndUpdate(
    {id:str}, {$inc: {seq:1}}, {returnOriginal:false}, function(err, r){
      if(err){throw err;}
      return base62.encode(r.value.seq);
    });
    });
        }
    });


};

 