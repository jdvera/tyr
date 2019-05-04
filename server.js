const express = require("exress");

const PORT = process.env.PORT || 3000;
const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));
require("./routes")(app);



app.listen(PORT, function () {
    console.log("App running on port " + PORT + "!");
});