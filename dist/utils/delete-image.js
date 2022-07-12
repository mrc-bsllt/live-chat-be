"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
exports.default = (imagePath) => {
    const deletePath = path_1.default.join(__dirname, '../..', imagePath);
    fs_1.default.unlink(deletePath, (error) => {
        if (error) {
            throw (error);
        }
    });
};
