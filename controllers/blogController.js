const blog = require("../models/blogModel");
const methodOverride = require("method-override");

module.exports = {
  // RESTFUL ROUTES*************

  blogRedirect: async (req, res) => {
    res.redirect("/blogs");
  },

  // INDEX ROUTE
  getBlogs: async (req, res) => {
    blog.find({}, (error, blogs) => {
      if (error) {
        console.log("error!!", error);
      } else {
        res.render("index", { blogs: blogs });
      }
    });
  },

  // NEW ROUTE
  newBlog: async (req, res) => {
    res.render("new");
  },

  // CREATE ROUTE
  createBlog: async (req, res) => {
    blog.create(req.body.blog, (err, newBlog) => {
      if (err) {
        console.log("error", err);
      } else {
        res.redirect("/blogs");
      }
    });
  },

  // SHOW ROUTE
  showBlog: async (req, res) => {
    blog.findById(req.params.id, (err, foundBlog) => {
      if (err) {
        console.log("error", err);
        res.redirect("/blogs");
      } else {
        res.render("show", { blog: foundBlog });
      }
    });
  },

  // EDIT ROUTES
  editBlog: async (req, res) => {
    blog.findById(req.params.id, (err, foundBlog) => {
      if (err) {
        res.redirect("/blogs");
        console.log("error", err);
      } else {
        res.render("edit", { blog: foundBlog });
      }
    });
  },

  // UPDATE ROUTE
  updateBlog: async (req, res) => {
    blog.findByIdAndUpdate(req.params.id, req.body.blog, (err, updatedBlog) => {
      if (err) {
        console.log("error".err);
        res.redirect("/blogs");
      } else {
        res.redirect("/blogs/" + req.params.id);
      }
    });
  },

  deleteBlog: async (req, res) => {
    blog.findByIdAndRemove(req.params.id, (err) => {
      if (err) {
        res.redirect("blogs");
      } else {
        res.redirect("blogs");
      }
    });
  },
};
