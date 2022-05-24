
const { BlogPost, Category, User } = require('../database/models');

const fieldPostValidation = async (title, content, categoryIds, id) => {
// console.log("🚀 ~ file: blogPostServices.js ~ line 9 ~ fieldPostValidation ~ categoryIds", categoryIds)
  if (!title || !content || !categoryIds) return { status: 400, message: 'Some required fields are missing' };
  if (categoryIds.length < 1) return { status: 400, message: '"categoryIds" not found' };
  


};

const addBlogPost = async (title, content, categoryIds, id) => {
  const data = await fieldPostValidation(title, content, categoryIds, id);
  // console.log("🚀 ~ file: blogPostServices.js ~ line 33 ~ addBlogPost ~ data", data)
  return data;
};


module.exports = { addBlogPost };