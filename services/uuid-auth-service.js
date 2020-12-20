const uuidAPIKey = require('uuid-apikey');
const uuidKey = process.env.UUIDKEY;

function verifyAccess(req, res, next) {

  const userAPIKey = req.headers['x-api-key'];
  if (!userAPIKey) 
    return res.status(403).send({ auth: false, message: 'No API key provided.' });
  
  else if (!uuidAPIKey.isAPIKey(userAPIKey))
    return res.status(403).send({ auth: false, message: 'API key is not valid.' });    
  
  else if (!uuidAPIKey.check(userAPIKey, uuidKey))
    return res.status(500).send({ auth: false, message: 'API key does not match.' }); 
  
  next();

}

module.exports = verifyAccess;