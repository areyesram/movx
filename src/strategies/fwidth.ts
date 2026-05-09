import { exec } from "child_process";
import { formatDimensionWithUnit } from "../dimension-format";
import { promisify } from "util";
import { Strategy } from "../strategy";

const execAsync = promisify(exec);

const fwidth: Strategy = {
    async getTargetDir(filePath: string, options): Promise<string | null> {
        try {
            const { stdout } = await execAsync(
                `ffprobe -v error -select_streams v:0 -show_entries stream=width -of csv=p=0 "${filePath}"`,
            );
            const width = stdout.trim();
            if (width && !isNaN(Number(width))) {
                return formatDimensionWithUnit(
                    Number(width),
                    options?.dimensionUnit ?? "b",
                );
            }
            return null;
        } catch {
            return null;
        }
    },
};

export default fwidth;
