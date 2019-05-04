const express = require("express");

const PORT = process.env.PORT || 3000;
const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));

const getSpellInfo = require("./util/getSpellInfo.js");

// --- ROUTES
app.get("/user/:userName", (req, res) => {
    getSpellInfo(0, req.params.userName, spellData => {
        res.json(spellData);
    });
});

app.get('/', function (req, res) {
    res.sendfile('./public/index.html');
});

app.listen(PORT, function () {
    console.log("App running on port " + PORT + "!");
});