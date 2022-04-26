const fs = require("fs");
const path = require("path");

const usersFilePath = path.join(__dirname, "../data/users.json");
const users = JSON.parse(fs.readFileSync(usersFilePath, "utf-8"));


const controllers = {
  vendorInformation: (req, res) => {
    res.render("vendorInformation.ejs", {
      products,
    });
  },
};

module.exports = controllers;