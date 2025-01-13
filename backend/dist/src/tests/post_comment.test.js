"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const supertest_1 = __importDefault(require("supertest"));
const App_1 = __importDefault(require("../App"));
const mongoose_1 = __importDefault(require("mongoose"));
const post_comment_model_1 = __importDefault(require("../models/post_comment_model"));
const post_model_1 = __importDefault(require("../models/post_model"));
const auth_user_model_1 = __importDefault(require("../models/auth_user_model"));
jest.setTimeout(20000);
const user = {
    email: "testComment@test.com",
    image: "image",
    username: "CommentUser",
    password: "1234",
};
const testPost = {
    owner: "someOwnerId",
    type: "gaming",
    gpu: "ryzen5000",
    cpu: "i7",
    motherboard: "asus",
    memory: "hdd1024gb",
    ram: "16gb",
    image: "image",
    comments: 0,
};
const testComment = {
    postId: "",
    userId: "",
    userName: user.username,
    content: "This is a comment",
};
let app;
beforeAll(() => __awaiter(void 0, void 0, void 0, function* () {
    app = yield (0, App_1.default)();
    console.log("Before all");
    yield post_model_1.default.deleteMany();
    yield post_comment_model_1.default.deleteMany();
    yield auth_user_model_1.default.deleteMany({ email: user.email });
    // Register and login the user
    const res1 = yield (0, supertest_1.default)(app).post("/auth/register").send(user);
    user._id = res1.body._id;
    testComment.userId = user._id;
    const res2 = yield (0, supertest_1.default)(app).post("/auth/login").send(user);
    user.accessToken = res2.body.accessToken;
    // Create a post to comment on
    const postResponse = yield (0, supertest_1.default)(app)
        .post("/post")
        .set("Authorization", "Bearer " + user.accessToken)
        .send(testPost);
    testComment.postId = postResponse.body._id;
}));
afterAll(() => __awaiter(void 0, void 0, void 0, function* () {
    yield mongoose_1.default.connection.close();
}));
describe("Post Comments Tests", () => {
    test("Test post comment", () => __awaiter(void 0, void 0, void 0, function* () {
        const res = yield (0, supertest_1.default)(app)
            .post("/post/comments")
            .set("Authorization", "Bearer " + user.accessToken)
            .send(testComment);
        expect(res.statusCode).toEqual(201);
        expect(res.body).toHaveProperty("_id");
        expect(res.body.postId).toEqual(testComment.postId);
        expect(res.body.userId).toEqual(testComment.userId);
        expect(res.body.userName).toEqual(testComment.userName);
        expect(res.body.content).toEqual(testComment.content);
    }));
    test("Test get all comments", () => __awaiter(void 0, void 0, void 0, function* () {
        const res = yield (0, supertest_1.default)(app)
            .get(`/post/comments/${testComment.postId}`)
            .set("Authorization", "Bearer " + user.accessToken);
        expect(res.statusCode).toEqual(200);
        expect(Array.isArray(res.body)).toBe(true);
    }));
});
//# sourceMappingURL=post_comment.test.js.map