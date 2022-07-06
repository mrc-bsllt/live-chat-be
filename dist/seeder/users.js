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
exports.seed_users = void 0;
const User_1 = __importDefault(require("../models/User"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const users = [
    {
        username: 'test-1',
        email: 'test-1@mail.com',
        password: 'Password_1'
    },
    {
        username: 'test-2',
        email: 'test-2@mail.com',
        password: 'Password_1'
    },
    {
        username: 'test-3',
        email: 'test-3@mail.com',
        password: 'Password_1'
    },
    {
        username: 'test-4',
        email: 'test-4@mail.com',
        password: 'Password_1'
    },
    {
        username: 'test-5',
        email: 'test-5@mail.com',
        password: 'Password_1'
    },
    {
        username: 'test-6',
        email: 'test-6@mail.com',
        password: 'Password_1'
    },
    {
        username: 'test-7',
        email: 'test-7@mail.com',
        password: 'Password_1'
    },
    {
        username: 'test-8',
        email: 'test-8@mail.com',
        password: 'Password_1'
    }
];
const seed_users = () => __awaiter(void 0, void 0, void 0, function* () {
    yield Promise.all(users.map((user) => __awaiter(void 0, void 0, void 0, function* () {
        const { username, email, password } = user;
        const hashed_password = yield bcrypt_1.default.hash(password, 12);
        const newUser = new User_1.default({ username, email, password: hashed_password });
        yield newUser.save();
    })));
    console.log('SEEDER DONE!');
});
exports.seed_users = seed_users;
