import fs from "fs";
import { formatDimensionWithUnit } from "../dimension-format";
import sizeOf from "image-size";
import { Strategy } from "../strategy";

const height: Strategy = {
    getTargetDir(filePath: string, options): string | null {
        try {
            const buffer = fs.readFileSync(filePath);
            const dimensions = sizeOf(buffer);
            if (dimensions.height != null) {
                return formatDimensionWithUnit(
                    dimensions.height,
                    options?.dimensionUnit ?? "b",
                );
            }
            return null;
        } catch {
            return null;
        }
    },
};

export default height;
