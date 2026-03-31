const jwt = require("jsonwebtoken");
const http = require('http');
const e = require("cors");
const config = process.env;


const verifyToken = (req, res, next) => {
  // var request = http.request();
  // var token = req.header('Set-Token');
  // console.log(req.headers.Set-Token);
  // console.log('this',token);
  console.log(token);
  if (token) {
    const decoded = jwt.verify(token, config.TOKEN_KEY,(err,verified)=>
    {
    if(err)
    { return res.status(404).send("Invalid Token");
    }
    else{
      req.user=verified;
      return next();
    }
    });
    //req.user = decoded;
    
  }
  else 
  {
    return res.status(403).send("A token is required for authentication");
  }
  // try {
  //   const decoded = jwt.verify(token, config.TOKEN_KEY);
  //   req.user = decoded;
  // } catch (err) {
  //   return res.status(401).send("Invalid Token");
  // }
  // return next();
};
module.exports = verifyToken;
