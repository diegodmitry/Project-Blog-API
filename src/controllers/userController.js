const userServices = require('../services/userServices');

const userLogin = async (req, res) => {
  try {
    const { email, password } = req.body;
  
    const isLoginOk = await userServices.loginValidation(email, password);

    if (isLoginOk.token) return res.status(isLoginOk.status).json({ token: isLoginOk.token });

    return res.status(isLoginOk.status).json({ message: isLoginOk.message });
  } catch (error) {
    console.log(error.message);
  }
};

const createUser = async (req, res) => {
  try {
    const { displayName, email, password, image } = req.body;

    const data = await userServices
      .createUserValidation(displayName, email, password, image);

    if (data.token) return res.status(201).json({ token: data.token });

    return res.status(data.status).json({ message: data.message });
  } catch (error) {
    console.log(error.message);
  }
};

const getAllUsers = async (_req, res) => {
  const users = await userServices.getAllUsers();
  return res.status(users.status).json(users.users);
};

const userGetById = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = await userServices.userGetById(id);

    if (userId.status === 200) return res.status(userId.status).json(userId.user);

    return res.status(userId.status).json({ message: userId.message });
  } catch (error) {
    console.log(error);
  }
};
module.exports = { userLogin, createUser, getAllUsers, userGetById };