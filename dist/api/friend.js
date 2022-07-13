"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const is_auth_1 = require("../middleware/is_auth");
const friend_controller_1 = require("../controllers/friend-controller");
const router = (0, express_1.Router)();
router.get('/search-friends/:user_value', is_auth_1.is_auth, friend_controller_1.search_friends_by_username);
exports.default = router;