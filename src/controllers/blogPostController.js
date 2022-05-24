const blogPostServices = require('../services/blogPostServices');

const addBlogPost = async (req, res) => {
  try {
    const { id } = req.authUser;
    const data = await blogPostServices.addBlogPost(req.body, id);
    if (data.status === 201) return res.status(data.status).json(data.createdPost);
    return res.status(data.status).json({ message: data.message });
  } catch (error) {
    console.log(error.message);
    return res.status(400).json({ message: `\"categoryIds\" not found` });
  }
};

// Req 13
const getAllPosts = async (_req, res) => {
  const allPosts = await blogPostServices.getAllPosts();
  return res.status(200).json(allPosts);
};

// Req 14
const getById = async (req, res) => {
  const { id } = req.params;
  const post = await blogPostServices.getById(id);
  if (!post) return res.status(404).json({ message: 'Post does not exist' });
  res.status(200).json(post);
};

module.exports = { addBlogPost, getAllPosts, getById };