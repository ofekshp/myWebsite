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
const post_controller_1 = __importDefault(require("./post_controller"));
const auth_controller_1 = require("../controllers/auth_controller");
const base_controller_1 = __importDefault(require("./base_controller"));
const post_comment_model_1 = __importDefault(require("../models/post_comment_model"));
class PostCommentController extends base_controller_1.default {
    constructor() {
        super(post_comment_model_1.default);
    }
    get(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                if (req.params.id != null) {
                    const myObjects = yield this.model.find({ postId: req.params.id });
                    return res.status(200).send(myObjects);
                }
                else {
                    res.status(400).send("missing id");
                }
            }
            catch (error) {
                res.status(500).send(error);
            }
        });
    }
    post(req, res) {
        const _super = Object.create(null, {
            post: { get: () => super.post }
        });
        return __awaiter(this, void 0, void 0, function* () {
            const _id = req.user._id;
            req.body.userId = _id;
            const username = yield (0, auth_controller_1.getUserName)(req);
            req.body.userName = username;
            post_controller_1.default.addComment(req.body.postId);
            _super.post.call(this, req, res);
        });
    }
    deleteMany(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const postId = req.body.id;
            try {
                yield this.model.deleteMany({ postId: postId });
                res.status(200).send();
            }
            catch (error) {
                res.status(500).send(error);
            }
        });
    }
}
exports.default = new PostCommentController();
//# sourceMappingURL=post_comment_controller.js.map