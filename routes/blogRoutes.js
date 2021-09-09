const express = require("express");
const router = express.Router();
const blogController = require("../controllers/blogController");
//const verify = require("../auth");

router.get("/", blogController.blogRedirect);
router.get("/blogs", blogController.getBlogs);
router.get("/blogs/new", blogController.newBlog);
router.get("/blogs/:id", blogController.showBlog);
router.get("/blogs/:id/edit",  blogController.editBlog);

router.post("/blogs/new", blogController.createBlog);
router.put("/blogs/:id", blogController.updateBlog);
router.delete("/blogs/:id", blogController.deleteBlog);

module.exports = {
  router,
};
