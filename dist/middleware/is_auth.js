"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.is_auth = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const is_auth = (req, res, next) => {
    var _a;
    const token = (_a = req.get('Authorization')) === null || _a === void 0 ? void 0 : _a.split(' ')[1];
    try {
        const decodedToken = jsonwebtoken_1.default.verify(token, 'supersecretstring');
        req.user_id = decodedToken.user_id;
        next();
    }
    catch (error) {
        res.status(401).json({ param: 'jwt', msg: 'Not Authorized!' });
    }
};
exports.is_auth = is_auth;
