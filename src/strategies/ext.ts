import path from "path";
import { Strategy } from "../strategy";

const ext: Strategy = {
    getTargetDir(filePath: string): string | null {
        const fileName = path.basename(filePath);
        if (fileName.startsWith(".") && !fileName.includes(".", 1)) {
            return "hidden";
        }
        const cleanFileName = fileName.split(/[?#]/)[0];
        const ext = path.extname(cleanFileName).toLowerCase();
        return ext ? ext.slice(1) : "no_extension";
    },
};

export default ext;
