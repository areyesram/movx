import { exec } from "child_process";
import { promisify } from "util";
import { Strategy } from "../strategy";

const execAsync = promisify(exec);

const duration: Strategy = {
    async getTargetDir(filePath: string): Promise<string | null> {
        try {
            const { stdout } = await execAsync(
                `ffprobe -v error -show_entries format=duration -of default=noprint_wrappers=1:nokey=1 "${filePath}"`,
            );
            const dur = stdout.trim();
            if (dur && !isNaN(Number(dur))) {
                return Math.round(Number(dur)).toString();
            }
            return null;
        } catch {
            return null;
        }
    },
};

export default duration;
