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
module.exports = { userLogin, createUser };