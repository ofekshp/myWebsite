"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const PostSchema = new mongoose_1.default.Schema({
    owner: {
        type: String,
        required: false,
    },
    type: {
        type: String,
        required: true,
    },
    gpu: {
        type: String,
        required: true,
    },
    cpu: {
        type: String,
        required: true,
    },
    motherboard: {
        type: String,
        required: true,
    },
    memory: {
        type: String,
        required: true,
    },
    ram: {
        type: String,
        required: true,
    },
    image: {
        type: String,
        required: true,
    },
    comments: {
        type: Number,
        required: true // Using the schema itself, not the model
    }
});
exports.default = mongoose_1.default.model("Post", PostSchema);
//# sourceMappingURL=post_model.js.map