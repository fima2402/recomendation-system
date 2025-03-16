// loadJSON.js

import { readFile } from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

/**
 * Loads and parses a JSON file.
 * @param {string} filePath - The path to the JSON file.
 * @returns {Promise<Object|null>} - The parsed JSON data or null if an error occurs.
 */
export async function loadJson(dir) {
    try {
        const __filename = fileURLToPath(import.meta.url);
        const __dirname = path.dirname(__filename);

        const filePath = path.resolve(__dirname, dir);

        const data = await readFile(filePath, 'utf-8');
        console.log("✅ File loaded successfully:", filePath);
        const parsedData = JSON.parse(data);

        if (!parsedData || typeof parsedData !== 'object') {
            throw new Error('Data JSON tidak valid.');
        }
        return parsedData;
    } catch (error) {
        console.error(`❌ Error loading JSON file: ${filePath}`, error.message);
        return null;
    }
}