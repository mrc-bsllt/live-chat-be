"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const dotenv_1 = require("dotenv");
(0, dotenv_1.config)();
const mongoose_1 = __importDefault(require("mongoose"));
const auth_1 = __importDefault(require("./api/auth"));
const app = (0, express_1.default)();
app.use(body_parser_1.default.json());
app.use('/api', auth_1.default);
mongoose_1.default.connect(process.env.MONGODB_URI).then(() => {
    app.listen(8080);
});
