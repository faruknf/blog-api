const pgPool = require('../../models/db/postgresql');

async function getPostByIdController(req, res, next) {
  try {
    const { id } = req.params;
    const postResult = await pgPool.query(
      'SELECT posts.id as postId,users.email,users.username,posts.title,posts.text,posts.created_at,posts.updated_at FROM users INNER JOIN posts ON users.id = posts.owner WHERE posts.id = $1',
      [id]
    );
    const tags = await pgPool.query(
      'SELECT tags.name FROM tags INNER JOIN post_tags ON post_tags.tag_id = tags.id WHERE post_tags.post_id = $1',
      [id]
    );
    if (postResult.rows.length > 0) {
      const data = { ...postResult.rows[0], tags: tags.rows };
      return res.status(200).json({ payload: { data } });
    }
    res.status(200).json({ payload: { data: [] } });
  } catch (error) {
    next(error);
  }
}

module.exports = getPostByIdController;
