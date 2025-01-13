"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const PostCommentSchema = new mongoose_1.default.Schema({
    postId: {
        type: String,
        required: true,
    },
    userId: {
        type: String,
        required: true,
    },
    userName: {
        type: String,
        required: true,
    },
    content: {
        type: String,
        required: true,
    }
});
exports.default = mongoose_1.default.model("PostComment", PostCommentSchema);
//# sourceMappingURL=post_comment_model.js.map