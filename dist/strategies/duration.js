"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const child_process_1 = require("child_process");
const util_1 = require("util");
const execAsync = (0, util_1.promisify)(child_process_1.exec);
const duration = {
    async getTargetDir(filePath) {
        try {
            const { stdout } = await execAsync(`ffprobe -v error -show_entries format=duration -of default=noprint_wrappers=1:nokey=1 "${filePath}"`);
            const dur = stdout.trim();
            if (dur && !isNaN(Number(dur))) {
                return Math.round(Number(dur)).toString();
            }
            return null;
        }
        catch {
            return null;
        }
    },
};
exports.default = duration;
