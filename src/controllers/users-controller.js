const fs = require("fs");
const path = require("path");

const usersFilePath = path.join(__dirname, "../data/users.json");

const controllers = {
  vendorInformation: (req, res) => {
    res.render("vendorInformation.ejs");
  },
};

module.exports = controllers;
