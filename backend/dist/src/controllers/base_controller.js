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
Object.defineProperty(exports, "__esModule", { value: true });
class BaseController {
    constructor(model) {
        this.model = model;
    }
    get(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                if (req.params.id != null) {
                    const myObjects = yield this.model.findById(req.params.id);
                    return res.status(200).send(myObjects);
                }
                else {
                    if (req.query.userId != null) {
                        const myObjects = yield this.model.find({ owner: req.query.userId });
                        return res.status(200).send(myObjects);
                    }
                    else {
                        const myObjects = yield this.model.find();
                        return res.status(200).send(myObjects);
                    }
                }
            }
            catch (err) {
                res.status(500).send(err.message);
            }
        });
    }
    post(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const myObject = req.body;
            try {
                const newMyObject = yield this.model.create(myObject);
                yield newMyObject.save();
                res.status(201).json(newMyObject);
            }
            catch (err) {
                console.log(err);
                res.status(500).send(err.message);
            }
        });
    }
    put(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const myObject = req.body;
            try {
                const updatedMyObject = yield this.model.findByIdAndUpdate(myObject._id, myObject, { new: true });
                yield updatedMyObject.save();
                res.status(200).json(updatedMyObject);
            }
            catch (err) {
                res.status(500).send(err.message);
            }
        });
    }
    delete(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield this.model.findByIdAndDelete(req.body.id);
                res.status(200).send();
            }
            catch (err) {
                res.status(500).send(err.message);
            }
        });
    }
}
exports.default = BaseController;
//# sourceMappingURL=base_controller.js.map