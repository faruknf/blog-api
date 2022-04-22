const express = require('express');
const config = require('./config');
const BaseError = require('./helpers/error-handler/base-error');
const { postRouter, userRouter } = require('./routes');

const app = express();
config();
app.use(express.json());
app.use('/api/post', postRouter);
app.use('/api/user', userRouter);

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
  console.log(`Server started on PORT ${PORT}`);
});

app.use(BaseError.handleOnMiddleware);
