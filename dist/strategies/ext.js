"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const path_1 = __importDefault(require("path"));
const ext = {
    getTargetDir(filePath) {
        const fileName = path_1.default.basename(filePath);
        if (fileName.startsWith(".") && !fileName.includes(".", 1)) {
            return "hidden";
        }
        const cleanFileName = fileName.split(/[?#]/)[0];
        const ext = path_1.default.extname(cleanFileName).toLowerCase();
        return ext ? ext.slice(1) : "no_extension";
    },
};
exports.default = ext;
