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
const post_model_1 = __importDefault(require("../models/post_model"));
const auth_user_model_1 = __importDefault(require("../models/auth_user_model"));
jest.setTimeout(20000);
const user = {
    email: "testPost@test.com",
    image: "image",
    username: "XXXXXXXXXXX",
    password: "1234",
};
const testPost1 = {
    owner: user.username,
    type: "gaming",
    gpu: "ryzen5000",
    cpu: "i7",
    motherboard: "asus",
    memory: "hdd1024gb",
    ram: "16gb",
    image: "image",
    comments: 0
};
let initialPost;
let app;
beforeAll(() => __awaiter(void 0, void 0, void 0, function* () {
    app = yield (0, App_1.default)();
    console.log("Before all");
    yield post_model_1.default.deleteMany();
    yield auth_user_model_1.default.deleteMany({ email: user.email });
    const res1 = yield (0, supertest_1.default)(app).post("/auth/register").send(user);
    user._id = res1.body._id;
    testPost1.owner = user._id;
    const res2 = yield (0, supertest_1.default)(app).post("/auth/login").send(user);
    user.accessToken = res2.body.accessToken;
    initialPost = yield (0, supertest_1.default)(app).post("/post").set("Authorization", "Bearer " + user.accessToken).send(testPost1);
}));
afterAll(() => __awaiter(void 0, void 0, void 0, function* () {
    yield mongoose_1.default.connection.close();
}));
describe("Posts Tests", () => {
    //test post post api
    test("Post", () => __awaiter(void 0, void 0, void 0, function* () {
        const res1 = yield (0, supertest_1.default)(app)
            .post("/post")
            .set("Authorization", "Bearer " + user.accessToken)
            .send(testPost1);
        expect(res1.statusCode).toEqual(201);
        expect(res1.body).toHaveProperty("_id");
        expect(res1.body.type).toEqual(initialPost.body.type);
        expect(res1.body.gpu).toEqual(initialPost.body.gpu);
        expect(res1.body.cpu).toEqual(initialPost.body.cpu);
        expect(res1.body.motherboard).toEqual(initialPost.body.motherboard);
        expect(res1.body.memory).toEqual(initialPost.body.memory);
        expect(res1.body.ram).toEqual(initialPost.body.ram);
        expect(res1.body.image).toEqual(initialPost.body.image);
        expect(res1.body.comments).toEqual(0);
    }));
    test("Get", () => __awaiter(void 0, void 0, void 0, function* () {
        const res2 = yield (0, supertest_1.default)(app)
            .get("/post/" + initialPost.body._id)
            .set("Authorization", "Bearer " + user.accessToken)
            .send();
        expect(res2.statusCode).toEqual(200);
        expect(res2.body).toHaveProperty("_id");
        expect(res2.body.type).toEqual(initialPost.body.type);
        expect(res2.body.gpu).toEqual(initialPost.body.gpu);
        expect(res2.body.cpu).toEqual(initialPost.body.cpu);
        expect(res2.body.motherboard).toEqual(initialPost.body.motherboard);
        expect(res2.body.memory).toEqual(initialPost.body.memory);
        expect(res2.body.ram).toEqual(initialPost.body.ram);
        expect(res2.body.image).toEqual(initialPost.body.image);
        expect(res2.body.comments).toEqual(0);
    }));
    test("Get My Posts", () => __awaiter(void 0, void 0, void 0, function* () {
        const res3 = yield (0, supertest_1.default)(app)
            .get("/post/getMyPosts")
            .set("Authorization", "Bearer " + user.accessToken)
            .send();
        expect(res3.statusCode).toEqual(200);
        expect(res3.body[0].type).toEqual(initialPost.body.type);
        expect(res3.body[0].gpu).toEqual(initialPost.body.gpu);
        expect(res3.body[0].cpu).toEqual(initialPost.body.cpu);
        expect(res3.body[0].motherboard).toEqual(initialPost.body.motherboard);
        expect(res3.body[0].memory).toEqual(initialPost.body.memory);
        expect(res3.body[0].ram).toEqual(initialPost.body.ram);
        expect(res3.body[0].image).toEqual(initialPost.body.image);
        expect(res3.body[0].comments).toEqual(0);
    }));
    test("Update Post", () => __awaiter(void 0, void 0, void 0, function* () {
        initialPost.body.type = "office";
        const res4 = yield (0, supertest_1.default)(app)
            .put("/post")
            .set("Authorization", "Bearer " + user.accessToken)
            .send(initialPost.body);
        expect(res4.statusCode).toEqual(200);
        expect(res4.body.type).toEqual("office");
        expect(res4.body.gpu).toEqual(initialPost.body.gpu);
        expect(res4.body.cpu).toEqual(initialPost.body.cpu);
        expect(res4.body.motherboard).toEqual(initialPost.body.motherboard);
        expect(res4.body.memory).toEqual(initialPost.body.memory);
        expect(res4.body.ram).toEqual(initialPost.body.ram);
        expect(res4.body.image).toEqual(initialPost.body.image);
        expect(res4.body.comments).toEqual(0);
    }));
    test("Delete Post", () => __awaiter(void 0, void 0, void 0, function* () {
        const res5 = yield (0, supertest_1.default)(app)
            .delete("/post")
            .set("Authorization", "Bearer " + user.accessToken)
            .send({ id: initialPost.body._id });
        expect(res5.statusCode).toEqual(200);
        yield res5;
        const res6 = yield (0, supertest_1.default)(app)
            .get("/post/" + initialPost.body._id)
            .set("Authorization", "Bearer " + user.accessToken)
            .send();
        expect(res6.statusCode).toEqual(200);
        expect(res6.body).toEqual({});
    }));
});
//# sourceMappingURL=post.test.js.map