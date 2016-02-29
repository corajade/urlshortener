module.exports=
function checkPathStr(x){
    var dns=require("dns");
    var url=require("url");
    var validator=require("validator");
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
        dns.resolve(host, function(err, addr){
            if(err){
                console.log(err);
                return false;
            }
           return true;
        });
      }
    else {
        return false;
    }
  }
  else{return x;}
};


