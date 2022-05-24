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

module.exports = { addBlogPost, getAllPosts, getById };