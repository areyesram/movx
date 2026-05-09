import fs from "fs";
import { formatDimensionWithUnit } from "../dimension-format";
import sizeOf from "image-size";
import { Strategy } from "../strategy";

const width: Strategy = {
    getTargetDir(filePath: string, options): string | null {
        try {
            const buffer = fs.readFileSync(filePath);
            const dimensions = sizeOf(buffer);
            if (dimensions.width != null) {
                return formatDimensionWithUnit(
                    dimensions.width,
                    options?.dimensionUnit ?? "b",
                );
            }
            return null;
        } catch {
            return null;
        }
    },
};

export default width;
