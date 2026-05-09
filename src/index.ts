#!/usr/bin/env node

import fs from "fs";
import path from "path";
import { DimensionUnit, Strategy, StrategyOptions } from "./strategy";

const STRATEGIES: Record<string, string> = {
    ext: "./strategies/ext",
    width: "./strategies/width",
    height: "./strategies/height",
    dims: "./strategies/dims",
    size: "./strategies/size",
    fwidth: "./strategies/fwidth",
    fheight: "./strategies/fheight",
    fdims: "./strategies/fdims",
    duration: "./strategies/duration",
};

function printHelp(): void {
    console.log("movx - A CLI tool to organize files into directories.");
    console.log("");
    console.log("Usage: movx -t <strategy> [-ub|-uk|-um]");
    console.log("");
    console.log("Strategies:");
    console.log("  dims     Organize images by dimensions (e.g., 1920x1080, 2x1)");
    console.log("  ext      Organize by file extension (e.g., jpg, png)");
    console.log("  height   Organize images by height (e.g., 1080, 1)");
    console.log("  size     Organize by file size rounded to 100kb (e.g., 000kb, 100kb)");
    console.log("  width    Organize images by width (e.g., 1920, 2)");
    console.log("  fwidth   Organize videos by width (e.g., 1920, 2)");
    console.log("  fheight  Organize videos by height (e.g., 1080, 1)");
    console.log("  fdims    Organize videos by dimensions (e.g., 1920x1080, 2x1)");
    console.log("  duration Organize videos or audio by duration in seconds (e.g., 120, 3600)");
    console.log("");
    console.log("Options:");
    console.log("  -h, --help    Show this help message");
    console.log("  -t <strategy> Specify the organization strategy");
    console.log("  -ub          Use pixels for dimension strategies (default)");
    console.log("  -uk          Use kilopixels for dimension strategies");
    console.log("  -um          Use megapixels for dimension strategies");
    console.log("");
    console.log("Samples:");
    console.log("  movx -t ext");
    console.log("  movx -t dims");
    console.log("  movx -t fdims -uk");
    console.log("  movx -t size");
}

function getDimensionUnit(args: string[]): DimensionUnit {
    const selectedFlags = [
        { flag: "-ub", unit: "b" as const },
        { flag: "-uk", unit: "k" as const },
        { flag: "-um", unit: "m" as const },
    ].filter(({ flag }) => args.includes(flag));

    if (selectedFlags.length > 1) {
        console.error("Error: Only one of -ub, -uk, or -um may be used at a time.");
        process.exit(1);
    }

    return selectedFlags[0]?.unit ?? "b";
}

async function main(): Promise<void> {
    const args = process.argv.slice(2);

    if (args.includes("-h") || args.includes("--help")) {
        printHelp();
        return;
    }

    const tIndex = args.indexOf("-t");
    if (tIndex === -1 || !STRATEGIES[args[tIndex + 1]]) {
        console.error("Error: Missing or invalid required argument.");
        console.error(
            `Usage: movx -t <${Object.keys(STRATEGIES).sort().join("|")}>`,
        );
        console.error("Run with -h or --help for more information.");
        process.exit(1);
    }

    const mode = args[tIndex + 1];
    const strategyOptions: StrategyOptions = {
        dimensionUnit: getDimensionUnit(args),
    };

    let strategy: Strategy;
    try {
        strategy = (await import(STRATEGIES[mode])).default as Strategy;
    } catch (err: unknown) {
        const message = err instanceof Error ? err.message : String(err);
        console.error(`Error loading strategy for mode '${mode}':`, message);
        process.exit(1);
        return;
    }

    const currentDir = process.cwd();

    function getFiles(dir: string, filesList: string[] = []): string[] {
        let files: string[];
        try {
            files = fs.readdirSync(dir);
        } catch (err: unknown) {
            const message = err instanceof Error ? err.message : String(err);
            console.error(`Error reading directory ${dir}:`, message);
            return filesList;
        }

        for (const file of files) {
            const filePath = path.join(dir, file);
            let stat: fs.Stats;
            try {
                stat = fs.statSync(filePath);
            } catch (err: unknown) {
                const message =
                    err instanceof Error ? err.message : String(err);
                console.error(`Error reading file stat ${filePath}:`, message);
                continue;
            }

            if (stat.isDirectory()) {
                if (
                    file !== ".git" &&
                    file !== "node_modules" &&
                    file !== "dist" &&
                    file !== "src"
                ) {
                    getFiles(filePath, filesList);
                }
            } else {
                filesList.push(filePath);
            }
        }
        return filesList;
    }

    console.log(`Scanning directory: ${currentDir}`);
    const allFiles = getFiles(currentDir);

    let movedCount = 0;

    for (const filePath of allFiles) {
        const targetDirName = await strategy.getTargetDir(
            filePath,
            strategyOptions,
        );
        if (!targetDirName) continue;

        const fileName = path.basename(filePath);
        const targetDir = path.join(currentDir, targetDirName);

        if (!fs.existsSync(targetDir)) {
            fs.mkdirSync(targetDir, { recursive: true });
        }

        let targetPath = path.join(targetDir, fileName);
        if (targetPath === filePath) continue;

        let counter = 1;
        const ext = path.extname(filePath);
        const nameWithoutExt = path.basename(fileName, ext);

        while (fs.existsSync(targetPath)) {
            targetPath = path.join(
                targetDir,
                `${nameWithoutExt}_${counter}${ext}`,
            );
            counter++;
        }

        try {
            fs.renameSync(filePath, targetPath);
            console.log(
                `Moved: ${path.relative(currentDir, filePath)} -> ${path.relative(currentDir, targetPath)}`,
            );
            movedCount++;
        } catch (err: unknown) {
            const message = err instanceof Error ? err.message : String(err);
            console.error(`Failed to move ${filePath}:`, message);
        }
    }

    console.log(`\nReorganization complete! Moved ${movedCount} files.`);
}

main();
