const mongoose = require("../models/db");
const Blockmolder= require("../models/model");
const path = require("path");
const bcrypt = require("bcrypt");
const saltRounds = 10;

const express = require("express");
const bodyParser = require("body-parser");
const app = express();

app.use(bodyParser.urlencoded({ extended: true }));



exports.logout = (req, res) => {
  req.logout();
  res.redirect("/");
};

exports.dashboard = (req, res) => {
  res.render("dashboard");
};

exports.home = (req, res) => {
  res.render("index");
};

exports.login = (req, res) => {
  res.render("login");
};
exports.logging = async (req, res) => {
  let { email, password } = req.body;
  if (!email || email === 0) {
    res.status(400).json("Pls, input email!");
  } else {
    await Blockmolder.findOne({ email })
      .then((result) => {
        if (result) {
          const storedHashedPassword = result.password; // Replace with the actual hash from your database

          const loginPassword = password; // Replace with the password entered by the user
          // Compare the entered password with the stored hash
          bcrypt.compare(loginPassword, storedHashedPassword, (err, resu) => {
            if (err) {
              console.error("Error comparing passwords:", err);
              return;
            }
            if (resu) {
              res.status(200).json(`Welcome ${result.fullName} to Dashboard`);
              // console.log(result);
            } else {
              res.status(200).json("Password is incorrect. Access denied.");
              console.log("Password is incorrect. Access denied.");
            }
          });
          //  res.status(200).json(result);
        } else {
          res.status(400).json("No Such Email Exists...");
        }
      })
      .catch((err) => {
        res.status(400).json(err);
      });
  }
};

exports.register = (req, res) => {
  res.render("register");
};
exports.registering = async (req, res) => {
  req.body.email ===
    (await Blockmolder.findOne({ email: req.body.email })
      .then(async (r) => {
        if (r) {
          res.status(400).json("User with this email already exists...");
        } else {
          const plainPassword = req.body.password; // Replace with the password you want to hash

          // Generate a salt and hash the password
          await bcrypt.genSalt(saltRounds, async (err, salt) => {
            if (err) {
              console.error("Error generating salt:", err);
              return;
            }

            await bcrypt.hash(plainPassword, salt, async (err, hash) => {
              if (err) {
                console.error("Error hashing password:", err);
                return;
              }
              let { fullName, phone, country, email, password, terms } =
                req.body;
              const newBlockmolder = new Blockmolder({
                fullName,
                phone,
                country,
                email,
                password: hash,
                terms,
              });
              await newBlockmolder
                .save()
                .then((e) => {
                  res.status(200).send(e);
                })
                .catch((err) => {
                  res.status(500).send(err);
                });
            });
          });
        }
      })
      .catch((err) => {
        console.log(err);
      }));
};

exports.about = (req, res) => {
  res.render("about");
};

exports.faq = (req, res) => {
  res.render("faq");
};
