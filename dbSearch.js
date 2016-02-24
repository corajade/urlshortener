module.exports=function dbSearch(coll, str){
    coll.find({"URL":str}).limit(1).toArray(function(err, doc){
        if(err){
            throw err;
        }
        if(doc.length<1){
            return null;
        }
        return doc;
    })
}