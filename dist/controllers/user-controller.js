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
exports.update_user_image = exports.get_user = void 0;
const User_1 = __importDefault(require("../models/User"));
const delete_image_1 = __importDefault(require("../utils/delete-image"));
const get_user = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { user_id } = req.params;
    try {
        const user = yield User_1.default.findById(user_id).populate('friends requests_sent requests_received notifications.friend').lean();
        user === null || user === void 0 ? true : delete user.password;
        user === null || user === void 0 ? true : delete user.chats;
        res.status(200).json(user);
    }
    catch (error) {
        res.status(500).json({ param: 'user', msg: 'User not found!' });
    }
});
exports.get_user = get_user;
const update_user_image = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b;
    const user_id = req.user_id;
    const mimetype = (_a = req.file) === null || _a === void 0 ? void 0 : _a.mimetype;
    const accepted_mimetype = ['image/png', 'image/jpg', 'image/jpeg', 'image/webp'];
    if (!accepted_mimetype.includes(mimetype)) {
        return res.status(422).json({ param: 'image_patgh', msg: 'Invalid format!' });
    }
    const image_path = (_b = req.file) === null || _b === void 0 ? void 0 : _b.path;
    try {
        const user = yield User_1.default.findById(user_id);
        if (user) {
            if (user.image_path) {
                (0, delete_image_1.default)(user.image_path);
            }
            user.image_path = '/' + image_path;
            yield (user === null || user === void 0 ? void 0 : user.save());
            res.status(201).json('User updated!');
        }
    }
    catch (error) {
        res.status(500).json({ message: 'User doesn\'t found!' });
    }
});
exports.update_user_image = update_user_image;
