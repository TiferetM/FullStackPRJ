import express from 'express';
import cors from 'cors';
export const server = express();

server.use(express.json()); // Middleware to parse JSON bodies
//make requests from localhost everywhere
server.use(cors({
    origin: '*'
  }));

server.use("/users", usersRouter);
server.use("/posts", postsRouter);
server.use("/todos", todosRouter);
server.use("/comments", commentsRouter);

const PORT = 3305;
server.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
});