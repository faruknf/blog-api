const BaseError = require('../../helpers/error-handler/base-error');
const pgPool = require('../../models/db/postgresql');

async function updatePostByIdController(req, res, next) {
  try {
    const { id } = req.params;
    const { title, text } = req.body;
    const owner = req.user.id;
    const results = await pgPool.query(
      'UPDATE posts SET title = $1,text=$2 WHERE id=$3 AND owner=$4 RETURNING *',
      [title, text, id, owner]
    );

    if (results.rowCount > 0) {
      return res.status(200).json({ payload: { data: results.rows[0] } });
    }
    throw new BaseError('No update', 400);
  } catch (error) {
    next(error);
  }
}

module.exports = updatePostByIdController;
