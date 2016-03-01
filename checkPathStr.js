module.exports=
function checkPathStr(x, callback){
    var dns=require("dns");
    var url=require("url");
    var validator=require("validator");
     var b=x;
    x=x.toLowerCase();
  var test=x.startsWith("/new/");
 
  if(test){
      var newX=x.slice(5);
      //check that the address is correct
      var check=validator.isURL(newX);
      var check2=validator.isURL(newX, {require_protocol:true});
      if(check){
          if(!check2){
                 newX="https://" + newX;
          }
          var host=url.parse(newX).hostname;
          console.log(host);
        dns.lookup(host, function(err, addr, f){
            if(err){
                console.log(err);
               callback(err, null);
            }
            b=true;
            console.log(addr);
          
        });
      }
    else {
        b=false;
     
    }
  }
   callback(null, b);
};


