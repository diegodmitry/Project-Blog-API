const express = require('express');

const userController = require('./controllers/userController');
const categoriesController = require('./controllers/categoriesController');
const blogPostController = require('./controllers/blogPostController');
const { auth } = require('./middlewares/auth');

const app = express();

app.use(express.json());

app.post('/login', userController.userLogin);

app.post('/user', userController.createUser);

app.get('/user', auth, userController.getAllUsers);

app.get('/user/:id', auth, userController.userGetById);

app.post('/categories', auth, categoriesController.createCategory);

app.get('/categories', auth, categoriesController.getAllCategories);

app.post('/post', auth, blogPostController.addBlogPost);

// É importante exportar a constante `app`,
// para que possa ser utilizada pelo arquivo `src/server.js`
module.exports = app;
