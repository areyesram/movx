"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = __importDefault(require("fs"));
const size = {
    getTargetDir(filePath) {
        try {
            const stat = fs_1.default.statSync(filePath);
            const kb = Math.round(stat.size / 100000) * 100;
            return `${String(kb).padStart(3, "0")}kb`;
        }
        catch {
            return null;
        }
    },
};
exports.default = size;
