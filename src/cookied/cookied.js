const {v4: uuidv4} = require('uuid');

const sessionStore = {}; //session ids will be keys, and values will be an object of name / value pairs associated with that session

/*parseCookies
checks the incoming request for a Cookie header
and parses name value pairs from the value into a property on the 'req' object called hwCookies
*/
function parseCookies(req, res, next){
    const cookieHeader = req.get("cookie");
    req.hwCookies = {};
    
    if (cookieHeader !== undefined){
        cookieHeader.split("&").forEach(function(cookie){
            const name_val = cookie.split("=");
            req.hwCookies[name_val[0]] = name_val[1];
        });
    }


    next();
}



/* manageSession 
this middleware…
-checks cookies from the request for a session id
-tries to retrieve data for that session id from an in-memory (read: global variable)
-if it's not an existing session id (or if no session id came through)
, generate a new session id and send it back to the browser


-sessionId that stores the current session id (just for debugging purposes)
*/

function manageSession(req, res, next){
    req.hwSession = {};
    let sessionId = req.hwCookies.sessionId;
    
    
    if (sessionStore.hasOwnProperty(sessionId) && sessionId !== undefined){ 
      req.hwSession = sessionStore[sessionId];
      req.hwSession['sessionId'] = sessionId;
      console.log("session already exists: " + sessionId,"]");
    } else {
      sessionId = uuidv4();
      sessionStore[sessionId] ={};
      res.append("Set-Cookie", "sessionId="+sessionId+"; HttpOnly");
      console.log("session generated: [" + sessionId,"]");
    }
    req.hwSession['sessionId'] = sessionId;


    next();
  }

module.exports={
    parseCookies:parseCookies,
    manageSession:manageSession
};