const express = require('express');

const userController = require('./controllers/userController');

const app = express();

app.use(express.json());

app.post('/login', userController.userLogin);

// É importante exportar a constante `app`,
// para que possa ser utilizada pelo arquivo `src/server.js`
module.exports = app;
