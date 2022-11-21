const express = require('express');
const blogController = require('../controller/blogController');
const authController = require('../controller/authController');
const router = express.Router();

router
    .route('/blogs')
    .post(authController.protectingMID, blogController.createBlog);

router
    .route('/blogs')
    .get(authController.protectingMID, blogController.getBlogs);

router
    .route('/blogs/:blogId')
    .put(authController.protectingMID, blogController.updateblogsId);

router
    .route('/blogs/:blogId')
    .delete(authController.protectingMID, blogController.deletedBlogs);

router
    .route('/blogs')
    .delete(authController.protectingMID, blogController.deletedBlogswithparams);

module.exports = router;