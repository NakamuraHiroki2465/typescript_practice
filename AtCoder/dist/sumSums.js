"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const reader_1 = __importDefault(require("reader"));
const linessum = [];
const readersum = require('readline').createInterface({
    input: process.stdin,
    output: process.stdout
});
reader_1.default.on('line', function (line) {
    linessum.push(line);
});
reader_1.default.on('close', function () {
    const { N, A, B } = linessum[0].split(' ');
    console.log(N, A, B);
});
