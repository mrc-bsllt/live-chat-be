"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getIO = exports.init = void 0;
const socket_io_1 = require("socket.io");
let io;
const init = (server) => {
    io = new socket_io_1.Server(server, {
        cors: {
            origin: 'http://localhost:3000',
            methods: ['GET', 'POST']
        }
    });
    return io;
};
exports.init = init;
const getIO = () => {
    return io;
};
exports.getIO = getIO;
