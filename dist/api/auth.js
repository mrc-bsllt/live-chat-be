"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const express_validator_1 = require("express-validator");
const router = (0, express_1.Router)();
const auth_controller_1 = require("../controllers/auth-controller");
router.post('/auth/signup', [
    (0, express_validator_1.check)('username', 'The username field must contain at least 5 characters!')
        .isLength({ min: 5 }),
    (0, express_validator_1.check)('email', 'Please enter a valid e-mail!')
        .isEmail(),
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
