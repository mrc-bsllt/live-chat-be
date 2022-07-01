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
const express_1 = require("express");
const express_validator_1 = require("express-validator");
const User_1 = __importDefault(require("../models/User"));
const router = (0, express_1.Router)();
const auth_controller_1 = require("../controllers/auth-controller");
router.post('/auth/signup', [
    (0, express_validator_1.check)('username', 'The username field must contain at least 5 characters!')
        .isLength({ min: 5 })
        .custom((username) => __awaiter(void 0, void 0, void 0, function* () {
        const user = yield User_1.default.findOne({ username });
        if (user) {
            return Promise.reject('username already exist!');
        }
    })),
    (0, express_validator_1.check)('email', 'Please enter a valid e-mail!')
        .isEmail()
        .custom((email) => __awaiter(void 0, void 0, void 0, function* () {
        const user = yield User_1.default.findOne({ email });
        if (user) {
            return Promise.reject('email already exist!');
        }
    })),
    (0, express_validator_1.check)('password', 'Invalid Password! Must contain at least 8 characters, 1 lowercase letter, 1 uppercase letter, 1 number, and 1 symbol')
        .isStrongPassword({ minLength: 8, minLowercase: 1, minUppercase: 1, minNumbers: 1, minSymbols: 1 }),
    (0, express_validator_1.check)('confirm_password')
        .custom((confirm_password, { req }) => {
        const { password } = req.body;
        if (password !== confirm_password) {
            return Promise.reject('Passwords must be match!');
        }
        else {
            return true;
        }
    })
], auth_controller_1.signup);
exports.default = router;
