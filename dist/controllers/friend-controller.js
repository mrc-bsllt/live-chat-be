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
exports.remove_friendship = exports.accept_friendship = exports.reject_request = exports.send_request = exports.search_friends_by_username = void 0;
const User_1 = __importDefault(require("../models/User"));
const socket_1 = require("../socket");
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
    var _a, _b, _c;
    const user_id = req.user_id;
    const friend_id = req.body.friend_id;
    try {
        const [user, friend] = yield Promise.all([
            User_1.default.findById(user_id),
            User_1.default.findById(friend_id)
        ]);
        (_a = user === null || user === void 0 ? void 0 : user.requests_sent) === null || _a === void 0 ? void 0 : _a.push(friend_id);
        const text_notification = 'Ti ha inviato una richiesta di amicizia.';
        const new_notification = { friend: user_id, text: text_notification };
        (_b = friend === null || friend === void 0 ? void 0 : friend.requests_received) === null || _b === void 0 ? void 0 : _b.push(user_id);
        (_c = friend === null || friend === void 0 ? void 0 : friend.notifications) === null || _c === void 0 ? void 0 : _c.push(new_notification);
        yield Promise.all([user === null || user === void 0 ? void 0 : user.save(), friend === null || friend === void 0 ? void 0 : friend.save()]);
        (0, socket_1.getIO)().emit('requests', { action: 'send-request', user, friend_id, text_notification });
        res.status(201).json({ message: 'request sent!' });
    }
    catch (error) {
        res.status(500).json({ param: 'server', msg: 'Server error!' });
    }
});
exports.send_request = send_request;
const reject_request = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _d, _e, _f;
    const user_id = req.user_id;
    const friend_id = req.body.friend_id;
    try {
        const [user, friend] = yield Promise.all([
            User_1.default.findById(user_id),
            User_1.default.findById(friend_id)
        ]);
        if (user && friend) {
            user.requests_received = (_d = user === null || user === void 0 ? void 0 : user.requests_received) === null || _d === void 0 ? void 0 : _d.filter(request => request._id.toString() !== friend_id);
            friend.requests_sent = (_e = friend === null || friend === void 0 ? void 0 : friend.requests_sent) === null || _e === void 0 ? void 0 : _e.filter(request => request._id.toString() !== user_id);
            const text_notification = 'Non ha accettato la tua richiesta di amicizia.';
            const new_notification = { friend: user_id, text: text_notification };
            (_f = friend === null || friend === void 0 ? void 0 : friend.notifications) === null || _f === void 0 ? void 0 : _f.push(new_notification);
            yield Promise.all([user.save(), friend.save()]);
            (0, socket_1.getIO)().emit('requests', { action: 'reject-request', user, friend_id, text_notification });
            return res.status(201).json({ message: 'Request rejected!' });
        }
        res.status(500).json({ param: 'server', msg: 'Server error!' });
    }
    catch (error) {
        res.status(500).json({ param: 'server', msg: 'Server error!' });
    }
});
exports.reject_request = reject_request;
const accept_friendship = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _g, _h, _j, _k, _l;
    const user_id = req.user_id;
    const friend_id = req.body.friend_id;
    try {
        const [user, friend] = yield Promise.all([
            User_1.default.findById(user_id),
            User_1.default.findById(friend_id)
        ]);
        if (user && friend) {
            (_g = user.friends) === null || _g === void 0 ? void 0 : _g.push(friend_id);
            user.requests_received = (_h = user === null || user === void 0 ? void 0 : user.requests_received) === null || _h === void 0 ? void 0 : _h.filter(request => request._id.toString() !== friend_id.toString());
            (_j = friend.friends) === null || _j === void 0 ? void 0 : _j.push(user_id);
            friend.requests_sent = (_k = friend === null || friend === void 0 ? void 0 : friend.requests_sent) === null || _k === void 0 ? void 0 : _k.filter(request => request._id.toString() !== user_id.toString());
            const text_notification = 'Ha accettato la tua richiesta di amicizia.';
            const new_notification = { friend: user_id, text: text_notification };
            (_l = friend === null || friend === void 0 ? void 0 : friend.notifications) === null || _l === void 0 ? void 0 : _l.push(new_notification);
            yield Promise.all([user.save(), friend.save()]);
            (0, socket_1.getIO)().emit('requests', { action: 'accept-request', user, friend_id, text_notification });
            return res.status(201).json({ message: 'Friendship accepted!' });
        }
        res.status(500).json({ param: 'server', msg: 'Server error!' });
    }
    catch (error) {
        res.status(500).json({ param: 'server', msg: 'Server error!' });
    }
});
exports.accept_friendship = accept_friendship;
const remove_friendship = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _m, _o, _p;
    const user_id = req.user_id;
    const friend_id = req.body.friend_id;
    try {
        const [user, friend] = yield Promise.all([
            User_1.default.findById(user_id),
            User_1.default.findById(friend_id)
        ]);
        if (user && friend) {
            user.friends = (_m = user === null || user === void 0 ? void 0 : user.friends) === null || _m === void 0 ? void 0 : _m.filter(friend => friend._id.toString() !== friend_id.toString());
            friend.friends = (_o = friend === null || friend === void 0 ? void 0 : friend.friends) === null || _o === void 0 ? void 0 : _o.filter(friend => friend._id.toString() !== user_id.toString());
            const text_notification = 'Ti ha eliminato dagli amici.';
            const new_notification = { friend: user_id, text: text_notification };
            (_p = friend === null || friend === void 0 ? void 0 : friend.notifications) === null || _p === void 0 ? void 0 : _p.push(new_notification);
            yield Promise.all([user.save(), friend.save()]);
            (0, socket_1.getIO)().emit('requests', { action: 'remove-request', user, friend_id, text_notification });
            return res.status(201).json({ message: 'Friendship removed!' });
        }
        res.status(500).json({ param: 'server', msg: 'Server error!' });
    }
    catch (error) {
        res.status(500).json({ param: 'server', msg: 'Server error!' });
    }
});
exports.remove_friendship = remove_friendship;
