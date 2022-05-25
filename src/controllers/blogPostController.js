const blogPostServices = require('../services/blogPostServices');

const addBlogPost = async (req, res) => {
  try {
    const { id } = req.authUser;
    const data = await blogPostServices.addBlogPost(req.body, id);
    if (data.status === 201) return res.status(data.status).json(data.createdPost);
    return res.status(data.status).json({ message: data.message });
  } catch (error) {
    console.log(error.message);
    return res.status(400).json({ message: '"categoryIds" not found' });
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

// Req 15
const updateBlogPost = async (req, res) => {
  const { id } = req.params;
  const userId = req.authUser.id;

  const data = await blogPostServices.updateBlogPost(id, userId, req.body);

  if (data.status === 400) return res.status(data.status).json({ message: data.message });
  if (data.status === 401) return res.status(data.status).json({ message: data.message });
  return res.status(200).json(data);
};

// Req 16
const deleteBlogPost = async (req, res) => {
  const { id } = req.params;
  const userId = req.authUser.id;

  const data = await blogPostServices.deleteBlogPost(id, userId);

  if (data.status === 401) return res.status(data.status).json({ message: data.message });
  if (data.status === 404) return res.status(data.status).json({ message: data.message });

  return res.status(204).json(data);
};

// Req 18
const postSearch = async (req, res) => {
  const { q } = req.query;
  const data = await blogPostServices.postSearch(q);
  return res.status(200).json(data);
};

module.exports = { addBlogPost, getAllPosts, getById, updateBlogPost, deleteBlogPost, postSearch };