const JWT = require('jsonwebtoken');

async function loginTestUserController(req, res, next) {
  try {
    const token = await JWT.sign(
      { id: '97b515ba-9433-4b5f-ba35-3945e9623a06' },
      process.env.JWT_KEY
    );
    res.status(200).json({ payload: { data: { access_token: token } } });
  } catch (error) {
    next(error);
  }
}

module.exports = loginTestUserController;
