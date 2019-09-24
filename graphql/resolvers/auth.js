const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const expressJWT = require("express-jwt");

const User = require("../../models/user");

module.exports = {
  createUser: async args => {
    try {
      const existingUser = await User.findOne({ email: args.userInput.email });
      if (existingUser) {
        throw new Error("User already exists.");
      }
      const hashedPassword = await bcrypt.hash(args.userInput.password, 12);

      const user = new User({
        firstName: args.userInput.firstName,
        lastName: args.userInput.lastName,
        email: args.userInput.email,
        password: hashedPassword
      });

      const result = await user.save();

      return { ...result._doc, password: null, _id: result.id };
    } catch (err) {
      throw err;
    }
  },

  login: async ({ email, password }, { req, res }) => {
    try {
      const user = await User.findOne({ email });
      if (!user) {
        return { error: "User doesn't exist" };
      }

      const isEqual = await bcrypt.compare(password, user.password);
      if (!isEqual) {
        return { error: "Password is Incorrect." };
      }

      const token = jwt.sign(
        { userID: user.id, email: user.email },
        "secretKeyForValidatingToken",
        {
          expiresIn: "7d"
        }
      );

      res.cookie("jwtCookie", token, {
        domain: ".app.localhost",
        maxAge: 60 * 60 * 1000 * 24 * 7
      });

      return {
        userID: user.id,
        token,
        tokenExpiration: 1
      };
    } catch (err) {
      throw err;
    }
  },

  loggedIn: async (obj, context) => {
    return "Executed";
  }
};
