"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const child_process_1 = require("child_process");
const dimension_format_1 = require("../dimension-format");
const util_1 = require("util");
const execAsync = (0, util_1.promisify)(child_process_1.exec);
const fheight = {
    async getTargetDir(filePath, options) {
        try {
            const { stdout } = await execAsync(`ffprobe -v error -select_streams v:0 -show_entries stream=height -of csv=p=0 "${filePath}"`);
            const height = stdout.trim();
            if (height && !isNaN(Number(height))) {
                return (0, dimension_format_1.formatDimensionWithUnit)(Number(height), options?.dimensionUnit ?? "b");
            }
            return null;
        }
        catch {
            return null;
        }
    },
};
exports.default = fheight;
