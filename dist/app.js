"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const path_1 = __importDefault(require("path"));
const dotenv_1 = require("dotenv");
(0, dotenv_1.config)();
const mongoose_1 = __importDefault(require("mongoose"));
const multer_1 = __importDefault(require("multer"));
const fileStorage = multer_1.default.diskStorage({
    destination: (req, file, callback) => {
        callback(null, 'dist/storage/images');
    },
    filename: (req, file, callback) => {
        callback(null, new Date().toISOString() + '-' + file.originalname);
    }
});
const fileFilter = (req, file, callback) => {
    if (file.mimetype === 'image/png' || file.mimetype === 'image/jpg' || file.mimetype === 'image/jpeg' || file.mimetype === 'image/webp') {
        callback(null, true);
    }
    else {
        callback(null, false);
    }
};
const auth_1 = __importDefault(require("./api/auth"));
const user_1 = __importDefault(require("./api/user"));
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-type, Authorization');
    next();
});
app.use((0, multer_1.default)({ storage: fileStorage, fileFilter }).single('image_path'));
app.use('/dist/storage/images', express_1.default.static(path_1.default.join(__dirname, 'storage/images')));
app.use('/api', auth_1.default);
app.use('/api', user_1.default);
// SEEDER
// seed_users()
mongoose_1.default.connect(process.env.MONGODB_URI).then(() => {
    app.listen(8080);
});
