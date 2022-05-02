const fs = require("fs");
const path = require("path");


const usersFilePath = path.join(__dirname, "../data/users.json");
const users = JSON.parse(fs.readFileSync(usersFilePath, "utf-8"));



const controllers = {
  vendorInformation: (req, res) => {
    const idBuscado = req.params.id;
    const vendorInfo = users.find((user) => user.id == idBuscado);
    console.log(vendorInfo);
    res.render("vendorInformation.ejs", { vendorInfo });
  },
};

module.exports = controllers;
