const express = require('express');

const userController = require('./controllers/userController');
const categoriesController = require('./controllers/categoriesController');
const { auth } = require('./middlewares/auth');

const app = express();

app.use(express.json());

app.post('/login', userController.userLogin);

app.post('/user', userController.createUser);

app.get('/user', auth, userController.getAllUsers);

app.get('/user/:id', auth, userController.userGetById);

app.post('/categories', auth, categoriesController.createCategory);

// É importante exportar a constante `app`,
// para que possa ser utilizada pelo arquivo `src/server.js`
module.exports = app;
