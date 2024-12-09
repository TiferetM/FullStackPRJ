import express from 'express';
import cors from 'cors';
import userRouter from './api/router/users.js';
import designRouter from './api/router/designs.js';
import commentRouter from './api/router/comments.js';
import articleRouter from './api/router/articles.js';
import productRouter from './api/router/products.js';
import authenticate from './api/middleware/authentication.js';
import authorize from './api/middleware/authorization.js';
import errorHandler from './api/middleware/errorHandling.js';

export const server = express();

//use mongo database D-HOME for the project
mongoose.connect('mongodb://localhost:27017/D-HOME', { useNewUrlParser: true, useUnifiedTopology: true });

server.use(express.json()); // Middleware to parse JSON bodies
//make requests from localhost everywhere
server.use(cors({
  origin: '*',
  exposedHeaders: ['Authorization', 'Role']
}));
//middleware
server.use((req, res, next) => {
  if(req.path === '/login' || req.path === '/signup') {
    return next();
  }
  else {
    return authenticate(req, res, next);
  }
});
server.use((req, res, next) => {
  if(req.path === '/login' || req.path === '/signup') {
    return next();
  }
  else {
    return authorize(req, res, next);
  }
});

//routes
server.use("/", designRouter);
server.use("/", commentRouter);
server.use("/", articleRouter);
server.use("/", productRouter);
server.use("/", userRouter);

server.use(errorHandler);

const PORT = 3305;
server.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});