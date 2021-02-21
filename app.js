const bodyParser = require('body-parser');
const express = require('express');
const app = express();
const PORT = 4000;
const mongoose = require('mongoose');
const URL = "mongodb://localhost/tester_blog_app";


app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));


// (async function() {
//     try {
//         await mongoose.connect(URL, { useNewUrlParser: true });
//         return console.log(`Successfully connected your DB`);
//     } catch (error) {
//         console.log(error);
//        return process.exit(1);
//     }
  
// })();

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
    created: { type: Date, default: Date.now}
});

const Blog =  mongoose.model("Blog", blogSchema);



// RESTFUL ROUTES*************
app.get("/blog", (req,res)=> {

res.send("hello man");
res.render("index");
console.log("sent a request");

});

app.listen(PORT, ()=>{
    console.log(`Your blog is running on localhost:${PORT}`);
});