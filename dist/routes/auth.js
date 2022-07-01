"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const router = (0, express_1.Router)();
const auth_controller_1 = require("../controllers/auth-controller");
router.post('/auth/signup', auth_controller_1.signup);
exports.default = router;
