const jwt = require("jsonwebtoken");
const Cookies = require("cookies");

module.exports = checkAuth = req => {
  const cookies = new Cookies(req);
  const token = cookies.get("jwtCookie");
  console.log("Token: " + token);

  if (!token) {
    //No cookie
    // req.isAuth = false;
    console.log("error 1");
    return { isAuth: false };
  }

  // //Auth header exists, but token might not exist.
  // const token = authHeader.split(" ")[1];
  // //Token doesn't exist
  // if (!token || token === "") {
  //   req.isAuth = false;
  //   return next();
  // }

  let decodedToken;
  try {
    decodedToken = jwt.verify(token, "secretKeyForValidatingToken");
  } catch (err) {
    console.log("error 2");
    return { isAuth: false };
  }
  if (!decodedToken) {
    console.log("error 3");
    return { isAuth: false };
  }

  console.log(decodedToken);

  return {
    isAuth: true,
    userID: decodedToken.userID
  };
};
