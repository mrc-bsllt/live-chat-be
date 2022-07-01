"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.signup = void 0;
const express_validator_1 = require("express-validator");
const signup = (req, res, next) => {
    const errors = (0, express_validator_1.validationResult)(req);
    if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array() });
    }
    const { username, email, password } = req.body;
    res.status(201).json({ message: 'User Created', fields: { username, email, password } });
};
exports.signup = signup;
