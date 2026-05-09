"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = __importDefault(require("fs"));
const dimension_format_1 = require("../dimension-format");
const image_size_1 = __importDefault(require("image-size"));
const dims = {
    getTargetDir(filePath, options) {
        try {
            const buffer = fs_1.default.readFileSync(filePath);
            const { width, height } = (0, image_size_1.default)(buffer);
            if (width != null && height != null) {
                return (0, dimension_format_1.formatDimensions)(width, height, options?.dimensionUnit ?? "b");
            }
            return null;
        }
        catch {
            return null;
        }
    }
};
exports.default = dims;
