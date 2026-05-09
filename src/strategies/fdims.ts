import { exec } from "child_process";
import { formatDimensions } from "../dimension-format";
import { promisify } from "util";
import { Strategy } from "../strategy";

const execAsync = promisify(exec);

const fdims: Strategy = {
    async getTargetDir(filePath: string, options): Promise<string | null> {
        try {
            const { stdout } = await execAsync(
                `ffprobe -v error -select_streams v:0 -show_entries stream=width,height -of csv=p=0:s=x "${filePath}"`,
            );
            const dims = stdout.trim();
            if (/^\d+x\d+$/.test(dims)) {
                const [width, height] = dims.split("x").map(Number);
                return formatDimensions(width, height, options?.dimensionUnit ?? "b");
            }
            return null;
        } catch {
            return null;
        }
    },
};

export default fdims;
