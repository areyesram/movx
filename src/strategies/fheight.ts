import { exec } from "child_process";
import { formatDimensionWithUnit } from "../dimension-format";
import { promisify } from "util";
import { Strategy } from "../strategy";

const execAsync = promisify(exec);

const fheight: Strategy = {
    async getTargetDir(filePath: string, options): Promise<string | null> {
        try {
            const { stdout } = await execAsync(
                `ffprobe -v error -select_streams v:0 -show_entries stream=height -of csv=p=0 "${filePath}"`,
            );
            const height = stdout.trim();
            if (height && !isNaN(Number(height))) {
                return formatDimensionWithUnit(
                    Number(height),
                    options?.dimensionUnit ?? "b",
                );
            }
            return null;
        } catch {
            return null;
        }
    },
};

export default fheight;
