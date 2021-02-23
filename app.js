const bodyParser = require("body-parser");
const express = require("express");
const app = express();
const PORT = 4000;
const mongoose = require("mongoose");
const URL = "mongodb://localhost/tester_blog_app";

app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));

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

// const connectWithRetry = () => {
//     console.log('MongoDB connection with retry')
//     mongoose.connect('mongodb://localhost/users_test').then(()=>{
//       console.log('MongoDB is connected')
//     }).catch(err=>{
//       console.log('MongoDB connection unsuccessful, retry after 5 seconds.')
//       setTimeout(connectWithRetry, 5000)
//     })
//   }

//   connectWithRetry()

// MOGOOSE/MODEL CONFIG
const blogSchema = new mongoose.Schema({
  title: String,
  body: String,
  image: String,
  created: { type: Date, default: Date.now },
});

const Blog = mongoose.model("Blog", blogSchema);

// RESTFUL ROUTES*************

app.get("/", (req, res) => {
  res.redirect("/blogs");
});

// INDEX ROUTE
app.get("/blogs", (req, res) => {
  Blog.find({}, (error, blogs) => {
    if (error) {
      console.log("error!!", error);
    } else {
      res.render("index", { blogs: blogs });
    }
  });
});

// NEW ROUTE
app.get("/blogs/new", (req, res) => {
  res.render("new");
});

// CREATE ROUTE
app.post("/blogs", (req, res) => {
  Blog.create(req.body.blog, (err, newBlog) => {
    if (err) {
      console.log("error", err);
    } else {
      res.redirect("/blogs"); 
    }
  });
});

// AHOW ROUTE
app.get("/blogs/:id", (req,res)=>{

  Blog.findById(req.params.id, (err, foundBlog)=>{
    if(err){
      console.log("error", err);
      res.redirect("/blogs");
    }else {
      res.render("show", {blog: foundBlog});
    }

  })
  //res.send("SHOW PAGE")
});

app.listen(PORT, () => {
  console.log(`Your blog is running on localhost:${PORT}`);
});
