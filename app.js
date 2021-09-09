require("dotenv").config();
const bodyParser = require("body-parser");
const express = require("express");
const app = express();
const PORT = process.env.PORT || 4000;
const blogRoutes = require("./routes/blogRoutes");
const userRoutes = require("./routes/userRoutes");
const mongoose = require("mongoose");
const methodOverride = require("method-override");
const URL = "mongodb://localhost/tester_blog_app";

//  APP CONFIG
app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(methodOverride("_method"));
app.use(bodyParser.urlencoded({ extended: true }));
mongoose.set("useFindAndModify", false);
mongoose.set("useCreateIndex", true);

//CONNECT TO DATABASE
(async function () {
  try {
    await mongoose.connect(URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    return console.log(`Successfully connected your DB ${URL}`);
  } catch (error) {
    console.log(error);
    return process.exit(1);
  }
})();

// RESTFUL ROUTES*************

app.use("/", blogRoutes.router);
app.use("/", userRoutes.router);

app.listen(PORT, () => {
  console.log(`Your blog is running on localhost:${PORT}`);
});
