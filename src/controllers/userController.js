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
module.exports = { userLogin };