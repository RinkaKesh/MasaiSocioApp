
require("dotenv").config()
const jwt = require('jsonwebtoken');
const { TokenModel } = require('../model/tokenModel.js');

const auth = async (req, res, next) => {
  
  try {
    const accessToken = req.cookies["access-Token"];
  const refreshToken = req.cookies["refresh-Token"];
   
     console.log(req.cookies);
    if (accessToken) {
      try {
        const blacklistedToken = await TokenModel.findOne({ token: accessToken });

        if (blacklistedToken) {
          res.status(400).send({ "message": "Token Expired,please Login again" });
          console.log("Token expired");
          return;
        }

        jwt.verify(accessToken,process.env.key1, async function (err, decoded) {
          if (err) {
            console.error("Error in accessToken verification:", err);

            if (err.name === "TokenExpiredError") {

              jwt.verify(refreshToken,process.env.key2, async function (err, decoded) {
                if (err) {
                  console.error("Error in verifying refreshToken:", err);
                  res.status(401).send({ "message": "Something went wrong ! Login again" });
                } else {
                  const newAccessToken = jwt.sign(
                    { userId: decoded.userId, user: decoded.user },
                    process.env.key1,
                    { expiresIn: 1800 }
                  );
                  res.cookie("access-Token", newAccessToken, {
                    maxAge: 4000,
                  });
                  console.log("Refresh token working ");
                  req.accessToken = newAccessToken;
                  req.body.userId=decoded.userId;
                  req.body.user=decoded.user
                   next();
                }
              });
            } else {
              res.status(400).send({ "message": "Something went wrong ! Login again" });
            }
          } else {
                 req.body.userId=decoded.userId;
                  req.body.user=decoded.user
             next();
          }
        });
      } catch (error) {
        console.error("Error occured during checking blacklisted or not:", error);
        res.status(500).send("Internal Server Error");
      }
    } else {
      res.status(403).send("Login first");

    }
  } catch (error) {
    console.error("Middleware error:", error);
    res.status(500).send("Internal Server Error");
  }
};

module.exports = { authentication };