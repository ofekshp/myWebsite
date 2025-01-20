import express, { Express } from "express";
import cors from "cors";
import postCommentRoute from "./routes/post_comment_route";
import postRoute from "./routes/post_route";
import authRoute from "./routes/auth_route";
import fileRoute from "./routes/file_route";
import env from "dotenv";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import path from "path";

env.config();

const app = express();

// Middleware to set COOP and COEP headers
app.use((req, res, next) => {
  res.setHeader("Cross-Origin-Opener-Policy", "same-origin");
  res.setHeader("Cross-Origin-Embedder-Policy", "require-corp");
  next();
});

const init = () => {
  const promise = new Promise<Express>((resolve) => {
    const db = mongoose.connection;
    db.on("error", (error) => console.error(error));
    db.once("open", () => console.log("connected to database"));
    mongoose.connect(process.env.DATABASE_URL).then(() => {
      app.use(bodyParser.urlencoded({ extended: true }));
      app.use(bodyParser.json());
      app.use(cors({
        origin: ["https://ofekshpirer.info"],
        credentials: true,
      }));

      // Catch-all route for React Router (Handle all routes)
      app.get('*', (req, res) => {
        res.sendFile(path.join(__dirname, 'build', 'index.html'));
      });

      // API Routes
      app.use("/auth", authRoute);
      app.use("/post/comments", postCommentRoute);
      app.use("/post", postRoute);
      app.use("/file", fileRoute);
      app.use("/public", express.static("public"));

      // Serve static files from React build directory
      app.use(express.static(path.join(__dirname, 'build')));

      

      resolve(app);
    });
  });
  return promise;
};

export default init;
