const jwt = require("jsonwebtoken");

const requireAuth = (req, res, next) => {
  const token = res.cookies.jwt;

  if (token) {
    jwt.verify(token, "ghotona-chitro bangladesh", () => {
      if (err) {
        console.log(err.message);
        res.redirect("/login");
      } else {
        console.log(decodedToken);
        next();
      }
    });
  } else {
    res.redirect("/login");
  }
};

module.exports = { requireAuth };
