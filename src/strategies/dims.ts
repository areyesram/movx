import fs from "fs";
import { formatDimensions } from "../dimension-format";
import sizeOf from "image-size";
import { Strategy } from "../strategy";

const dims: Strategy = {
    getTargetDir(filePath: string, options): string | null {
        try {
            const buffer = fs.readFileSync(filePath);
            const { width, height } = sizeOf(buffer);
            if (width != null && height != null) {
                return formatDimensions(width, height, options?.dimensionUnit ?? "b");
            }
            return null;
        } catch {
            return null;
        }
    }
};

export default dims;
