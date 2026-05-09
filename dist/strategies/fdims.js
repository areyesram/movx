"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const child_process_1 = require("child_process");
const dimension_format_1 = require("../dimension-format");
const util_1 = require("util");
const execAsync = (0, util_1.promisify)(child_process_1.exec);
const fdims = {
    async getTargetDir(filePath, options) {
        try {
            const { stdout } = await execAsync(`ffprobe -v error -select_streams v:0 -show_entries stream=width,height -of csv=p=0:s=x "${filePath}"`);
            const dims = stdout.trim();
            if (/^\d+x\d+$/.test(dims)) {
                const [width, height] = dims.split("x").map(Number);
                return (0, dimension_format_1.formatDimensions)(width, height, options?.dimensionUnit ?? "b");
            }
            return null;
        }
        catch {
            return null;
        }
    },
};
exports.default = fdims;
