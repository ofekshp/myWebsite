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
exports.authMiddleware = exports.getUserName = void 0;
const auth_user_model_1 = __importDefault(require("../models/auth_user_model"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const google_auth_library_1 = require("google-auth-library");
const put = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const myObject = req.body;
    try {
        const updatedMyObject = yield auth_user_model_1.default.findByIdAndUpdate(myObject._id, myObject, { new: true });
        yield updatedMyObject.save();
        res.status(200).json(updatedMyObject);
    }
    catch (err) {
        res.status(500).send(err.message);
    }
});
const updateProfile = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield auth_user_model_1.default.findOne({ _id: req.user._id });
    const username = req.body.profile.username;
    const email = user.email;
    const image = req.body.profile.image;
    let password;
    if (req.body.password == "") {
        password = user.password;
    }
    else {
        password = req.body.password;
        const salt = yield bcrypt_1.default.genSalt(10);
        password = yield bcrypt_1.default.hash(password, salt);
    }
    try {
        const newProfile = yield auth_user_model_1.default.findByIdAndUpdate(user._id, { username: username, email: email, image: image, password: password }, { new: true });
        yield newProfile.save();
        res.status(200).json(newProfile);
    }
    catch (err) {
        return res.status(400).send(err.message);
    }
});
const register = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const email = req.body.email;
    const password = req.body.password;
    const username = req.body.username;
    const image = req.body.image;
    if (email === undefined || password === undefined) {
        return res.status(400).send("Email and password are required");
    }
    try {
        const user = yield auth_user_model_1.default.findOne({ email: email });
        if (user) {
            return res.status(400).send("User already exists");
        }
        const salt = yield bcrypt_1.default.genSalt(10);
        const hashedPassword = yield bcrypt_1.default.hash(password, salt);
        const newUser = yield auth_user_model_1.default.create({
            image: image,
            username: username,
            email: email,
            password: hashedPassword,
        });
        return res.send(newUser);
    }
    catch (err) {
        return res.status(400).send(err.message);
    }
});
const generateTokens = (user) => __awaiter(void 0, void 0, void 0, function* () {
    // generate token
    const accessToken = jsonwebtoken_1.default.sign({ _id: user._id }, process.env.TOKEN_SECRET, {
        expiresIn: process.env.ACCESS_TOKEN_EXPIRATION,
    });
    const random = Math.floor(Math.random() * 1000000).toString();
    const refreshToken = jsonwebtoken_1.default.sign({ _id: user._id, random: random }, process.env.TOKEN_SECRET, {});
    if (user.tokens == null) {
        user.tokens = [];
    }
    user.tokens = [];
    user.tokens.push(accessToken);
    user.tokens.push(refreshToken);
    try {
        yield user.save();
        return {
            accessToken: accessToken,
            refreshToken: refreshToken,
        };
    }
    catch (err) {
        return null;
    }
});
const getProfile = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userId = req.user._id;
    try {
        const user = yield auth_user_model_1.default.findOne({ _id: userId });
        if (user == null) {
            return res.status(400).send("User does not exists");
        }
        const profileUser = { username: user.username, email: user.email, image: user.image };
        return res.status(200).send(profileUser);
    }
    catch (err) {
        return res.status(400).send(err.message);
    }
});
const login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // get email & pwd
    const email = req.body.email;
    const password = req.body.password;
    if (email === undefined || password === undefined) {
        return res.status(400).send("Email and password are required");
    }
    // get user from DB
    try {
        const user = yield auth_user_model_1.default.findOne({ email: email });
        if (user == null) {
            return res.status(400).send("User does not exists");
        }
        // compare pwd
        const isMatch = yield bcrypt_1.default.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).send("Invalid credentials");
        }
        // generate token
        const tokens = yield generateTokens(user);
        if (tokens == null) {
            return res.status(400).send("Error generating tokens");
        }
        return res.status(200).send(tokens);
    }
    catch (err) {
        return res.status(400).send(err.message);
    }
});
const client = new google_auth_library_1.OAuth2Client();
const googleSignin = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const credential = req.body.credential;
    console.log(credential);
    try {
        const ticket = yield client.verifyIdToken({
            idToken: credential,
            audience: process.env.GOOGLE_CLIENT_ID + ".apps.googleusercontent.com",
        });
        const payload = ticket.getPayload();
        const email = payload === null || payload === void 0 ? void 0 : payload.email;
        let user = yield auth_user_model_1.default.findOne({ 'email': email });
        if (user == null) {
            user = yield auth_user_model_1.default.create({
                'email': email,
                'image': payload === null || payload === void 0 ? void 0 : payload.picture,
                'password': 'google-signin',
                'username': payload.name + " G"
            });
        }
        yield user.save;
        const tokens = yield generateTokens(user);
        return res.status(200).send(tokens);
    }
    catch (err) {
        return res.status(400).send("error missing email or password");
    }
});
const refresh = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const refreshToken = extractToken(req);
    if (refreshToken == null) {
        return res.sendStatus(401);
    }
    try {
        jsonwebtoken_1.default.verify(refreshToken, process.env.TOKEN_SECRET, (err, data) => __awaiter(void 0, void 0, void 0, function* () {
            if (err) {
                return res.sendStatus(403);
            }
            const user = yield auth_user_model_1.default.findOne({ _id: data._id });
            if (user == null) {
                return res.sendStatus(403);
            }
            if (!user.tokens.includes(refreshToken)) {
                //user hacked
                user.tokens = []; //invalidate all user tokens
                yield user.save();
                return res.sendStatus(403);
            }
            // user.tokens = user.tokens.filter((token) => token !== refreshToken);
            const tokens = yield generateTokens(user);
            if (tokens == null) {
                return res.status(400).send("Error generating tokens");
            }
            return res.status(200).send(tokens);
        }));
    }
    catch (err) {
        return res.status(400).send(err.message);
    }
});
const extractToken = (req) => {
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];
    return token;
};
const logout = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const refreshToken = extractToken(req);
    if (refreshToken == null) {
        return res.sendStatus(401);
    }
    try {
        const decoded = jsonwebtoken_1.default.verify(refreshToken, process.env.TOKEN_SECRET);
        const user = yield auth_user_model_1.default.findOne({ _id: decoded._id });
        if (!user || !user.tokens.includes(refreshToken)) {
            return res.sendStatus(403);
        }
        user.tokens = [];
        yield user.save();
        return res.status(200).send();
    }
    catch (err) {
        console.error("Error logging out:", err);
        return res.status(400).send(err.message);
    }
});
const getUserName = (req) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield auth_user_model_1.default.findOne({ _id: req.body.userId });
        return (user.username);
    }
    catch (err) {
        return (err.message);
    }
});
exports.getUserName = getUserName;
const authMiddleware = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const token = extractToken(req);
    if (token == null) {
        return res.sendStatus(401);
    }
    jsonwebtoken_1.default.verify(token, process.env.TOKEN_SECRET, (err, data) => {
        if (err) {
            return res.sendStatus(403);
        }
        const id = data._id;
        req.user = { _id: id };
        return next();
    }); // as { _id: string };
});
exports.authMiddleware = authMiddleware;
exports.default = { put, register, login, logout, authMiddleware: exports.authMiddleware, refresh, googleSignin, getProfile, getUserName: exports.getUserName, updateProfile };
//# sourceMappingURL=auth_controller.js.map