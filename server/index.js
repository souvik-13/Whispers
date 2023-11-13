import express from "express";
import session from "express-session";
import passport from "passport";
import mongoose from "mongoose";
import passportLocalMongoose from "passport-local-mongoose";
import dotenv from "dotenv";
import bcrypt from "bcrypt";
import cors from "cors";

// import models
import User from "./models/User.js";
import Secrets from "./models/Secrets.js";

const app = express();
dotenv.config();

// cors middleware
app.use(cors());

// middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(
  session({
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: false,
  }),
);

// start server
const port = process.env.PORT || 3001;
app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});

// initialize passport
app.use(passport.initialize());
app.use(passport.session());

// connect to database
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    console.log(err);
  });

// mongoose.set("useCreateIndex", true);

// passport
passport.use(User.createStrategy());
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

// routes
app.get("/api", (req, res) => {
  res.send("Hello World!");
});

// New routes
app.post("/register", (req, res) => {
  User.findOne({ username: req.body.username }).then((user) => {
    if (user) {
      res.status(409).send("User already exists.");
    } else {
      User.register(
        { username: req.body.username, email: req.body.email },
        req.body.password,
        (err, user) => {
          if (err) {
            console.log(err);
            res.status(500).send("Error from database.");
          } else {
            passport.authenticate("local")(req, res, () => {
              res.status(201).send("User saved");
            });
          }
        },
      );
    }
  });
});

app.post("/login", (req, res) => {
  const user = new User({
    username: req.body.username,
    password: req.body.password,
    email: req.body.email,
  });
  User.findOne({ username: req.body.username })
    .then(()=>{
      req.login(user, (err) => {
        if (err) {
          console.log(err);
          res.status(500).send("Error logging in");
        } else {
          passport.authenticate("local")(req, res, () => {
            res.status(200).send("Logged in");
          });
        }
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(401).send("User not found.");
    });
});

app.post("/submit", (req, res) => {
  const secret = req.body.secret;
  if (req.isAuthenticated()) {
    Secrets.findOne({ secret: secret })
    .then((secret) => {
      if (secret) {
        console.log("Secret already exists.")
        res.status(409).send("Secret already exists.");
      } else {
        const newSecret = new Secrets({
          secret: req.body.secret,
        });
        newSecret
          .save()
          .then((secret) => {
            console.log("Secret saved")
            res.status(201).send("Secret saved");
          })
          .catch((err) => {
            console.log(err);
            console.log("Error saving secret 1")
            res.status(500).send("Error saving secret 1");
          });
      }
    })
    .catch((err) => {
      console.log(err);
      console.log("Error saving secret 2")
      res.status(401).send("Error saving secret 2");
    });
  }
  // User is not authenticated
  else {
    res.status(401).send("Not authenticated");
  }
});

app.get("/secrets", (req, res) => {
  if(req.isAuthenticated()) {
    Secrets.find()
    .then((secrets) => {
      res.status(200).send(secrets);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).send("Error getting secrets");
    });
  }
  else {
    res.status(401).send("Not authenticated");
  }
});

app.post("/logout", (req, res) => {
  req.logout((err) => {
    if (err) {
      console.log(err);
      res.status(500).send("Error logging out");
    } else {
      res.status(200).send("Logged out");
    }
  });
});
