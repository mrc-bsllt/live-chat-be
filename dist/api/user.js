"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const is_auth_1 = require("../middleware/is_auth");
const user_controller_1 = require("../controllers/user-controller");
const router = (0, express_1.Router)();
router.get('/user', is_auth_1.is_auth, user_controller_1.get_user);
exports.default = router;
