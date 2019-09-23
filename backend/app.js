const express = require("express");
const bodyParser = require("body-parser");
const graphQLHttp = require("express-graphql");
const mongoose = require("mongoose");
const graphQLSchema = require("./graphql/schema/index");
const cors = require("cors");
const graphQLResolvers = require("./graphql/resolvers/index");
const cookieParser = require("cookie-parser");
const isAuth = require("./middleware/is-auth");

const app = express();

// app.use((req, res, next) => {
//   res.setHeader("Access-Control-Allow-Origin", "http://api.app.localhost:3000");
//   res.setHeader("Access-Control-Allow-Methods", "POST,GET,OPTIONS,DELETE,PUT");
//   res.setHeader(
//     "Access-Control-Allow-Headers",
//     "X-Requested-With, Content-Type, Origin, Authorization, Accept, Cookie"
//   );
//   res.setHeader("Content-Type", "application/json;charset=UTF-8");
//   res.setHeader("Access-Control-Allow-Credentials", true);
//   if (req.method === "OPTIONS") {
//     return res.sendStatus(200);
//   }
//   next();
// });

//isAuth field is added on every request.
// app.use(isAuth);

app.use(
  cors({
    origin: "http://localhost:3000",
    allowedHeaders: ["Cookie", "Content-Type"],
    exposedHeaders: ["Cookie"],
    credentials: true
  })
);

//graphQLHttp is a middleware that has schema and rootValue as properties.
//schema takes buildSchema imported from GraphQL and has a string literal as an arg.
//The string literal has all the queries (get requests) and mutations (CRUD operations).
//rootValue defines what every query and mutation should do and must have the same naming.
//Setting graphiql to true gives us access to a UI to interact with the api.

app.use("/graphql", bodyParser.json(), cookieParser(), (req, res) => {
  return graphQLHttp({
    schema: graphQLSchema,
    rootValue: graphQLResolvers,
    graphiql: true,
    context: { req, res }
  })(req, res);
});


// Only run when in production
if(process.env.NODE_ENV === "production"){
  app.use(express.static('../frontend/build'));

  app.get('*', (req,res) => {
    res.sendFile(path.resolve(__dirname, "../frontend", "build", "index.html"))
  })
}

const PORT = process.env.PORT || 5000;

mongoose.set("useNewUrlParser", true);

mongoose
  .connect(
    `mongodb+srv://${process.env.MONGO_USER}:${
      process.env.MONGO_PASSWORD
    }@cluster0-izeqa.mongodb.net/${
      process.env.MONGO_DB
    }?retryWrites=true&w=majority`
  )
  .then(() => {
    app.listen(PORT);
  })
  .catch(err => {
    console.log(err);
  });
