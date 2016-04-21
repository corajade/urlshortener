


module.exports=function nextShort(str, collection, callback){
 
 var test=require("assert");
        collection.count( {}, function(err, c){
        if(err){callback(err);}

    if(c>0){
       collection.findOneAndUpdate({_id:str}, {$inc: {seq:1}}, 
       {returnOriginal:false}, function(err, r){
     
      callback(err, r);
    });
       }
     else{
    collection.insertOne({
        _id:"userId",
        seq:0
    }, function(err, r){
       test.equal(err, null);
       test.equal(r.insertedCount, 1);
             collection.findOneAndUpdate(
    {_id:str}, {$inc: {seq:1}}, {returnOriginal:false}, function(err, r){
      
      callback(err, r);
    });
    });
    }
    
  
 });

};