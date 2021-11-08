var jwt = require("jsonwebtoken");
const JWT_SECRET = "siyaisagood$girl";

// middleware --> called everytime when user logs in

const fetchuser = (req, res, next) => {
  // get the user from the hwt token and append and add id to req object
  const token = req.header("auth-token"); //done while post request
  if (!token) {
    res.status(401).send({ error: "please authenticate using a valid token" });
  }

  try {
    const data = jwt.verify(token, JWT_SECRET); //verifying token --> this data will be user and inside it user.id
    req.user = data.user;
    next(); //next funtion here is the getuser function in auth.js
  } catch (error) {
    res.status(401).send({ error: "please authenticate using a valid token" });
  }
};

module.exports = fetchuser;
