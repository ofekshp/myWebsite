"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const post_comment_route_1 = __importDefault(require("./routes/post_comment_route"));
const post_route_1 = __importDefault(require("./routes/post_route"));
const auth_route_1 = __importDefault(require("./routes/auth_route"));
const file_route_1 = __importDefault(require("./routes/file_route"));
const dotenv_1 = __importDefault(require("dotenv"));
const mongoose_1 = __importDefault(require("mongoose"));
const body_parser_1 = __importDefault(require("body-parser"));
const path_1 = __importDefault(require("path"));
dotenv_1.default.config();
const app = (0, express_1.default)();
// Middleware to set COOP and COEP headers
app.use((req, res, next) => {
    res.setHeader("Cross-Origin-Opener-Policy", "same-origin");
    res.setHeader("Cross-Origin-Embedder-Policy", "require-corp");
    next();
});
const init = () => {
    const promise = new Promise((resolve) => {
        const db = mongoose_1.default.connection;
        db.on("error", (error) => console.error(error));
        db.once("open", () => console.log("connected to database"));
        mongoose_1.default.connect(process.env.DATABASE_URL).then(() => {
            app.use(body_parser_1.default.urlencoded({ extended: true }));
            app.use(body_parser_1.default.json());
            app.use((0, cors_1.default)({
                origin: ["https://ofekshpirer.info"],
                credentials: true,
            }));
            // API Routes
            app.use("/auth", auth_route_1.default);
            app.use("/post/comments", post_comment_route_1.default);
            app.use("/post", post_route_1.default);
            app.use("/file", file_route_1.default);
            app.use("/public", express_1.default.static("public"));
            // Serve static files from React build directory
            app.use(express_1.default.static(path_1.default.join(__dirname, 'build')));
            // Catch-all route for React Router (Handle all routes)
            app.get('*', (req, res) => {
                res.sendFile(path_1.default.join(__dirname, 'build', 'index.html'));
            });
            resolve(app);
        });
    });
    return promise;
};
exports.default = init;
//# sourceMappingURL=App.js.map