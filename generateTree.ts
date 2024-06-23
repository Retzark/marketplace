import * as fs from "fs";
import * as path from "path";
import { fileURLToPath } from "url";

// List of directories to exclude
const excludedDirs = [".git", "node_modules", ".idea", "dist"];

// Function to generate folder tree
function generateTree(dir: string, prefix: string = ""): string {
  const files = fs.readdirSync(dir);
  let tree = "";

  files.forEach((file, index) => {
    const filePath = path.join(dir, file);
    const isLast = index === files.length - 1;
    const newPrefix = prefix + (isLast ? "└── " : "├── ");

    // Skip excluded directories
    if (excludedDirs.includes(file)) {
      return;
    }

    tree += newPrefix + file + "\n";

    if (fs.statSync(filePath).isDirectory()) {
      const childPrefix = prefix + (isLast ? "    " : "│   ");
      tree += generateTree(filePath, childPrefix);
    }
  });

  return tree;
}

// Function to create folder_structure.txt
function createFolderStructureFile(startPath: string): void {
  const treeStructure = generateTree(startPath);
  const outputPath = path.join(startPath, "folder_structure.txt");

  fs.writeFileSync(outputPath, treeStructure, "utf-8");
  console.log("Folder structure has been saved to folder_structure.txt");
}

/**
 * @ts-expect-error
 */
const __filename = fileURLToPath(import.meta.url); // get the resolved path to the file
const __dirname = path.dirname(__filename); // get the name of the directory
// Replace __dirname with the path to the directory you want to scan
createFolderStructureFile(__dirname);
