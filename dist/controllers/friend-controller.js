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
exports.reject_request = exports.send_request = exports.search_friends_by_username = void 0;
const User_1 = __importDefault(require("../models/User"));
const search_friends_by_username = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { user_value } = req.params;
    const regex = new RegExp("^" + user_value);
    const [users, count] = yield Promise.all([
        User_1.default.find({ username: regex }).where('_id').ne(req.user_id).limit(5),
        User_1.default.find({ username: regex }).where('_id').ne(req.user_id).count()
    ]);
    res.status(200).json({ users, count });
});
exports.search_friends_by_username = search_friends_by_username;
const send_request = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b;
    const user_id = req.user_id;
    const friend_id = req.body.friend_id;
    try {
        const [user, friend] = yield Promise.all([
            User_1.default.findById(user_id),
            User_1.default.findById(friend_id)
        ]);
        (_a = user === null || user === void 0 ? void 0 : user.requests_sent) === null || _a === void 0 ? void 0 : _a.push(friend_id);
        (_b = friend === null || friend === void 0 ? void 0 : friend.requests_received) === null || _b === void 0 ? void 0 : _b.push(user_id);
        yield Promise.all([user === null || user === void 0 ? void 0 : user.save(), friend === null || friend === void 0 ? void 0 : friend.save()]);
        res.status(201).json({ message: 'request sent!' });
    }
    catch (error) {
        res.status(500).json({ param: 'server', msg: 'Server error!' });
    }
});
exports.send_request = send_request;
const reject_request = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _c, _d;
    const user_id = req.user_id;
    const friend_id = req.body.friend_id;
    try {
        const [user, friend] = yield Promise.all([
            User_1.default.findById(user_id),
            User_1.default.findById(friend_id)
        ]);
        if (user && friend) {
            user.requests_received = (_c = user === null || user === void 0 ? void 0 : user.requests_received) === null || _c === void 0 ? void 0 : _c.filter(request => request._id.toString() !== friend_id);
            friend.requests_sent = (_d = friend === null || friend === void 0 ? void 0 : friend.requests_sent) === null || _d === void 0 ? void 0 : _d.filter(request => request._id.toString() !== user_id);
            yield Promise.all([user.save(), friend.save()]);
            return res.status(201).json({ message: 'Request rejected!' });
        }
        res.status(500).json({ param: 'server', msg: 'Server error!' });
    }
    catch (error) {
        res.status(500).json({ param: 'server', msg: 'Server error!' });
    }
});
exports.reject_request = reject_request;
