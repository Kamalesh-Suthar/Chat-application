var admin = require("firebase-admin");

var serviceAccount = require("");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

module.exports = (req, res, next) => {
  const { provider } = req.cookies;

  if (provider === "google") {
    const idToken = req.headers.authorization.split("Bearer ")[1];
    admin
      .auth()
      .verifyIdToken(idToken)
      .then((decodedToken) => {
        req.user = decodedToken;
        next();
      })
      .catch((err) => {
        res.status(401).json({
          status: "error",
          message: "Unauthorized",
        });
      });
  } else if (provider === "jwt") {
    const idToken = req.headers.authorization.split("Bearer ")[1];
    admin
      .auth()
      .verifyIdToken(idToken)
      .then((decodedToken) => {
        req.user = decodedToken;
        next();
      })
      .catch((err) => {
        res.status(401).json({
          status: "error",
          message: "Unauthorized",
        });
      });
  } else {
    res.status(401).json({
      status: "error",
      message: "Unauthorized",
    });
  }
};
