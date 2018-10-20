const jwt = require('jsonwebtoken');

 module.exports = {

     tokenControl : (req,res,next) => {
        if(req != null && req.path != "/login"){

        const token = req.body.token || req.query.token || req.headers['x-access-token'];
    
        // decode token
        if (token) {
      
          // verifies secret and checks exp
          jwt.verify(token, app.get('superSecret'), (err, decoded) => {      
    
            if (err) {
              return res.status(401).json({ code: 'Failed to authenticate token.' });
            } else {
              // if everything is good, save to request for use in other routes
              req.decoded = decoded;    
              next();
            }
          });
      
        } else {
      
          // if there is no token
          // return an error
          return res.status(401).json({ code: 'No token provided.' });
    
        }
       }
       else
        next();
    }

} 