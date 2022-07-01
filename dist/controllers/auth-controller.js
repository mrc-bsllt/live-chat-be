"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.signup = void 0;
const signup = (req, res, next) => {
    const { username, email, password } = req.body;
    res.status(201).json({ message: 'User Created', fields: { username, email, password } });
};
exports.signup = signup;
