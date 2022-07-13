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
exports.login = exports.signup = void 0;
const express_validator_1 = require("express-validator");
const bcrypt_1 = __importDefault(require("bcrypt"));
const User_1 = __importDefault(require("../models/User"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const signup = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const errors = (0, express_validator_1.validationResult)(req);
    if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array() });
    }
    const { username, email, password } = req.body;
    const hashed_password = yield bcrypt_1.default.hash(password, 12);
    const user = new User_1.default({ username, email, password: hashed_password });
    yield user.save();
    res.status(201).json({ message: 'User Created' });
});
exports.signup = signup;
const login = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const errors = (0, express_validator_1.validationResult)(req);
    if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array() });
    }
    const { email } = req.body;
    try {
        const user = yield User_1.default.findOne({ email });
        const user_id = user === null || user === void 0 ? void 0 : user._id;
        const token = jsonwebtoken_1.default.sign({ user_id, email }, 'supersecretstring', { expiresIn: '8h' });
        req.user_id = user === null || user === void 0 ? void 0 : user._id;
        res.status(200).json({ token, user_id, message: 'Successfully Authenticated!' });
    }
    catch (error) {
        res.status(500).json({ message: 'Server error!' });
    }
});
exports.login = login;
