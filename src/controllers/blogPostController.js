const blogPostServices = require('../services/blogPostServices');

const addBlogPost = async (req, res) => {
  const { title, content, categoryIds } = req.body;
  const { id } = req.authUser;
  // console.log("🚀 ~ file: blogPostController.js ~ line 6 ~ addBlogPost ~ id", id)
  // console.log("🚀 ~ file: blogPostController.js ~ line 5 ~ addBlogPost ~ req.body", req.authUser)
  const data = await blogPostServices.addBlogPost(title, content, categoryIds, id);
  // console.log("🚀 ~ file: blogPostController.js ~ line 6 ~ addBlogPost ~ data", data)

  return res.status(data.status).json({ message: data.message });
};

module.exports = { addBlogPost };