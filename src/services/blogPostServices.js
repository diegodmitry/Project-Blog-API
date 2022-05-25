const { Op } = require('sequelize');
const { BlogPost, Category, User } = require('../database/models');

// Req 12
const hasCategoryOnDb = async (categoryIds) => {
  // Get all categories from DB
  const allCategories = await Category.findAll();
  const idListFromDB = allCategories.map((cat) => cat.dataValues.id);
  categoryIds.forEach((id) => {
    // comparison returns true or false
    const hasInclude = idListFromDB.includes(id);
    if (!hasInclude) throw new Error('Category is not found');
  });
};

// Req 12
const fieldPostValidation = async (body, id) => {
  if (!body.title || !body.content) {
    return { status: 400, message: 'Some required fields are missing' };
  }
  if (!body.categoryIds || body.categoryIds.length < 1) {
    return { status: 400, message: '"categoryIds" not found' };
  }
  // check if there is category
  await hasCategoryOnDb(body.categoryIds);

  const createdPost = await BlogPost.create({
    title: body.title,
    content: body.content,
    userId: id,
    updated: Date.now(),
    published: Date.now(),
  });

  // create row into PostCategories
  // Source: https://sequelize.org/docs/v6/core-concepts/assocs/#foobelongstomanybar--through-baz-
  await createdPost.addCategories(body.categoryIds);

  return { status: 201, createdPost };
};

// Req 12
const addBlogPost = async (body, id) => {
  const data = await fieldPostValidation(body, id);
  return data;
};

// Req 13
const getAllPosts = async () => {
  const allPosts = await BlogPost.findAll({
    include: [{
      model: User,
      as: 'user',
      attributes: { exclude: ['password'] },
    },
    {
      model: Category,
      as: 'categories',
      through: { attributes: [] },
    }],
  });
  return allPosts;
};

// Req 14
const getById = async (id) => {
  const post = await BlogPost.findByPk(id, {
    include: [
    {
      model: User, as: 'user', attributes: { exclude: 'password' },
    },
    {
      model: Category, as: 'categories', through: { attributes: [] },
    }],
  });
  return post;
};

// Req 15
const updateBlogPost = async (id, userId, body) => {
  const { title, content } = body;

  if (!title || !content) {
    return { status: 400, message: 'Some required fields are missing' };
  }

  const post = await BlogPost.findOne({ where: { id, userId } });
  if (!post) return { status: 401, message: 'Unauthorized user' };

  await BlogPost.update({ title, content }, { where: { id } });

  const postUpdated = await BlogPost.findByPk(id, { include: [
    { model: User, as: 'user', attributes: { exclude: 'password' } },
    { model: Category, as: 'categories', through: { attributes: [] } }] });
  return postUpdated;
};

// Req 16
const deleteBlogPost = async (id, userId) => {
  const blogPost = await BlogPost.findByPk(id, {
    include: [
      { model: User, as: 'user', attributes: { exclude: ['password'] } },
      { model: Category, as: 'categories', through: { attributes: [] } },
    ],
  });

  if (!blogPost) return { status: 404, message: 'Post does not exist' };
  if (userId !== blogPost.user.id) return { status: 401, message: 'Unauthorized user' };

  await BlogPost.destroy({
    where: { id },
  });
  return {};
};

// Req 18
// Source: https://sequelize.org/docs/v6/core-concepts/model-querying-basics/
const postSearch = async (q) => {
  const searchedPosts = await BlogPost.findAll({
    where: {
      [Op.or]: [
        { title: { [Op.like]: `%${q}%` } },
        { content: { [Op.like]: `%${q}%` } },
      ],
    },
    include: [
      { model: User, as: 'user', attributes: { exclude: ['password'] } },
      { model: Category, as: 'categories', through: { attributes: [] } },
    ],
  });
  return searchedPosts;
};

module.exports = { addBlogPost, getAllPosts, getById, updateBlogPost, deleteBlogPost, postSearch };