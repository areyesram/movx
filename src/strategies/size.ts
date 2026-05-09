import fs from "fs";
import { Strategy } from "../strategy";

const size: Strategy = {
    getTargetDir(filePath: string): string | null {
        try {
            const stat = fs.statSync(filePath);
            const kb = Math.round(stat.size / 100000) * 100;
            return `${String(kb).padStart(3, "0")}kb`;
        } catch {
            return null;
        }
    },
};

export default size;
