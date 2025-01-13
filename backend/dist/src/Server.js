"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const App_1 = __importDefault(require("./App"));
const swagger_ui_express_1 = __importDefault(require("swagger-ui-express"));
const swagger_jsdoc_1 = __importDefault(require("swagger-jsdoc"));
const http_1 = __importDefault(require("http"));
const https_1 = __importDefault(require("https"));
const fs_1 = __importDefault(require("fs"));
(0, App_1.default)().then((app) => {
    const options = {
        definition: {
            openapi: "3.0.0",
            info: {
                title: "Web Dev 2022 REST API",
                version: "1.0.0",
                description: "REST server including authentication using JWT",
            },
            servers: [{ url: "http://localhost:" + process.env.PORT }],
        },
        apis: ["./src/routes/*.ts"],
    };
    const specs = (0, swagger_jsdoc_1.default)(options);
    app.use("/api-docs", swagger_ui_express_1.default.serve, swagger_ui_express_1.default.setup(specs));
    if (process.env.NODE_ENV !== "production") {
        console.log("DEVELOPMENT" + process.env.PORT);
        http_1.default.createServer(app).listen(process.env.PORT);
    }
    else {
        console.log("PRODUCTION");
        const options2 = {
            key: fs_1.default.readFileSync("../../backend-client-key.pem"),
            cert: fs_1.default.readFileSync("../../backend-client-cert.pem"),
        };
        https_1.default.createServer(options2, app).listen(process.env.HTTPS_PORT);
    }
});
//# sourceMappingURL=Server.js.map