import path from "path";
import { Strategy } from "../strategy";

const ARTICLES = ["the", "el", "la", "los", "las"];

const ini: Strategy = {
    getTargetDir(filePath: string): string | null {
        const fileName = path.basename(filePath);
        const nameWithoutExt = path.basename(fileName, path.extname(fileName));

        // Split by spaces and remove articles from the beginning
        const words = nameWithoutExt.toLowerCase().split(/\s+/);
        let startIndex = 0;

        // Skip articles at the beginning
        while (startIndex < words.length && ARTICLES.includes(words[startIndex])) {
            startIndex++;
        }

        // If we skipped all words, fall back to first letter of original name
        if (startIndex >= words.length) {
            return nameWithoutExt.charAt(0).toLowerCase();
        }

        // Get the first letter of the first non-article word
        const firstLetter = words[startIndex].charAt(0);

        // Ensure it's a letter, otherwise use '0'
        if (/[a-z]/.test(firstLetter)) {
            return firstLetter;
        } else {
            return "0";
        }
    },
};

export default ini;