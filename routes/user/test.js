const router = require('express').Router();
const loginTestUserController = require('../../controllers/users/login-test-user-controller');

router.post('/login', loginTestUserController);

module.exports = router;
