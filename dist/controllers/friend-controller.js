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
exports.search_friends_by_username = void 0;
const User_1 = __importDefault(require("../models/User"));
const search_friends_by_username = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { user_value } = req.params;
    const regex = new RegExp("^" + user_value);
    const users = yield User_1.default.find({ username: regex }).where('_id').ne(req.user_id).limit(5);
    res.status(200).json(users);
});
exports.search_friends_by_username = search_friends_by_username;
