module.exports=function dbSearch(coll, str, callback){
 
   
          coll.find({"shortURL":str}).limit(1).toArray(callback);
    
  
}