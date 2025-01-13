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
const post_model_1 = __importDefault(require("../models/post_model"));
const base_controller_1 = __importDefault(require("./base_controller"));
const post_comment_controller_1 = __importDefault(require("./post_comment_controller"));
class PostController extends base_controller_1.default {
    constructor() {
        super(post_model_1.default);
    }
    post(req, res) {
        const _super = Object.create(null, {
            post: { get: () => super.post }
        });
        return __awaiter(this, void 0, void 0, function* () {
            const _id = req.user._id;
            req.body.owner = _id;
            _super.post.call(this, req, res);
        });
    }
    addComment(postId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield post_model_1.default.updateOne({ _id: postId }, { $inc: { comments: 1 } });
            }
            catch (error) {
                console.error('Failed to update comments count:', error);
                throw new Error('Failed to update comments count');
            }
        });
    }
    delete(req, res) {
        const _super = Object.create(null, {
            delete: { get: () => super.delete }
        });
        return __awaiter(this, void 0, void 0, function* () {
            post_comment_controller_1.default.deleteMany(req, res);
            _super.delete.call(this, req, res);
        });
    }
    getMyPosts(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const owner = req.user._id;
            const posts = yield post_model_1.default.find({ owner: owner });
            res.status(200).send(posts);
        });
    }
}
exports.default = new PostController();
//# sourceMappingURL=post_controller.js.map