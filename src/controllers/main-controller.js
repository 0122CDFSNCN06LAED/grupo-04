const path = require("path");

module.exports = {
    home: (req, res) => {
        res.render("index.ejs");
    },
    register: (req, res) => {
        res.sendFile(path.join(__dirname, "../views/register.html"));
    },
};