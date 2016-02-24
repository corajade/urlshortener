


module.exports=function nextShort(str, collection){
  var base62=require("base62");
collection.findOneAndUpdate(
    {id:str}, {$inc: {seq:1}}, {returnOriginal:false}, function(err, r){
      if(err){throw err;}
      return base62.encode(r.value.seq);
    });

}

 