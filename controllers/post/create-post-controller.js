const Joi = require('joi');
const pgPool = require('../../models/db/postgresql');
const postSchema = require('../../validations/post/post');

async function createPostController(req, res, next) {
  try {
    const { title, text, tags } = req.body;
    const owner = req.user.id;
    await postSchema.validateAsync({ title, text });

    const postResult = await pgPool.query(
      'INSERT INTO posts(title,text,owner) VALUES($1,$2,$3) RETURNING *',
      [title, text, owner]
    );
    // CHECK IF THE TAG EXIST IN DB
    // INSERT POST_ID AND TAG_ID TO POST_TAGS
    const tagArr = [];
    for (let i = 0; i < tags.length; i += 1) {
      /* eslint-disable no-await-in-loop */
      const tagResult = await pgPool.query(
        'INSERT INTO post_tags(post_id,tag_id) SELECT $1,id from tags WHERE name = $2 RETURNING *',
        [postResult.rows[0].id, tags[i]]
      );
      if (tagResult.rows.length > 0) {
        tagArr.push({ name: tags[i] });
      }
    }
    const data = { ...postResult.rows[0], tags: tagArr };
    res.status(201).json({ payload: { data } });
  } catch (error) {
    if (Joi.isError(error)) {
      return res.status(400).json({ payload: { error: 'Invalid post inputs' } });
    }
    next(error);
  }
}

module.exports = createPostController;
