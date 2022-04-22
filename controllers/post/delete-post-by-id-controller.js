const BaseError = require('../../helpers/error-handler/base-error');
const pgPool = require('../../models/db/postgresql');

async function deletePostByIdController(req, res, next) {
  try {
    const { id } = req.params;
    const owner = req.user.id;

    const results = await pgPool.query('DELETE FROM posts WHERE id=$1 AND owner = $2', [id, owner]);
    if (results.rowCount > 0) {
      return res.status(200).json({ payload: { message: 'Post was deleted successfully' } });
    }
    throw new BaseError('No delete', 400);
  } catch (error) {
    next(error);
  }
}

module.exports = deletePostByIdController;
