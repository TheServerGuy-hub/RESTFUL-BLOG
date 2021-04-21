const express = require("express");
const router = express.Router();
const blogController = require("../controllers/blogController");
const verify = require("../auth");

router.get("/", blogController.blogRedirect);
router.get("/blogs", blogController.getBlogs);
router.get("/blogs/new", verify.auth, blogController.newBlog);
router.get("/blogs/:id", blogController.showBlog);
router.get("/blogs/:id/edit", verify.auth, blogController.editBlog);

router.post("/blogs/new", verify.auth, blogController.createBlog);
router.put("/blogs/:id", verify.auth, blogController.updateBlog);
router.delete("/blogs/:id", verify.auth, blogController.deleteBlog);

module.exports = {
  router,
};
