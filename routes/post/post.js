const router = require('express').Router();

const createPostController = require('../../controllers/post/create-post-controller');
const deletePostByIdController = require('../../controllers/post/delete-post-by-id-controller');
const getPostByIdController = require('../../controllers/post/get-post-by-id-controller');
const updatePostByIdController = require('../../controllers/post/update-post-by-id-controller');
const checkAuth = require('../../middlewares/check-auth');

router.post('/create', checkAuth, createPostController);
router.get('/:id', getPostByIdController);
router.delete('/:id', checkAuth, deletePostByIdController);
router.patch('/:id', checkAuth, updatePostByIdController);

module.exports = router;
