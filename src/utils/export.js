import fs from "fs";
import sharp from "sharp";
import ExifParser from "exif-parser";
import path from "path";

const rootFolderPath = "public/photos";
const destinationFolder = "src/data";

async function getImageInfo(filePath) {
  if (filePath.endsWith(".DS_Store")) {
    return null; // Ignore .DS_Store files
  }

  const { width, height } = await sharp(filePath).metadata();

  const exifData = fs.readFileSync(filePath);
  const parser = ExifParser.create(exifData);
  const result = parser.parse();
  const gps =
    result.tags.GPSLatitude && result.tags.GPSLongitude
      ? {
          lat: result.tags.GPSLatitude,
          lng: result.tags.GPSLongitude,
        }
      : null;

  const src = filePath.replace(/^public\//, "/");
  return {
    src: src,
    size: { width, height },
    GPS: gps,
  };
}

function readFilesInDirectory(directoryPath) {
  return new Promise((resolve, reject) => {
    fs.readdir(directoryPath, (err, files) => {
      if (err) {
        reject(err);
      } else {
        resolve(files);
      }
    });
  });
}

// Split photos data into individual album files
function splitPhotosData(photosData) {
  const photosDir = path.join(destinationFolder, "photos");
  if (!fs.existsSync(photosDir)) {
    fs.mkdirSync(photosDir, { recursive: true });
  }

  // Split each album into its own file for optimization purpose
  Object.keys(photosData).forEach((albumName) => {
    const albumData = photosData[albumName];
    const fileName = `${albumName}.js`;
    const filePath = path.join(photosDir, fileName);

    const moduleContent = `export default ${JSON.stringify(
      albumData,
      null,
      2
    )};`;

    fs.writeFileSync(filePath, moduleContent);
    console.log(`Created ${fileName}`);
  });

  const photosIndexContent = `
export const availableAlbums = ${JSON.stringify(Object.keys(photosData))};
`;

  fs.writeFileSync(path.join(photosDir, "index.js"), photosIndexContent);
  console.log("Created photos/index.js");

  const indexContent = `// Dynamic photo album loader
import { availableAlbums } from './photos/index.js';

export async function getAlbumPhotos(albumName) {
  try {
    const module = await import(\`./photos/\${albumName}.js\`);
    return module.default;
  } catch (error) {
    console.error(\`Failed to load photos for album: \${albumName}\`, error);
    return [];
  }
}

// Export available albums dynamically
export { availableAlbums };

// Convenience function to get available albums
export async function getAvailableAlbums() {
  return availableAlbums;
}
`;

  fs.writeFileSync(path.join(destinationFolder, "photos.js"), indexContent);
  console.log("Created photos.js index file");
}

async function processImages(rootFolderPath) {
  try {
    const albums = {};
    const rootDirectories = await readFilesInDirectory(rootFolderPath);

    for (const albumName of rootDirectories) {
      const albumPath = `${rootFolderPath}/${albumName}`;
      const isDirectory = fs.statSync(albumPath).isDirectory();

      if (!isDirectory) {
        continue;
      }

      const files = await readFilesInDirectory(albumPath);

      const imageInfoList = [];

      for (const file of files) {
        const filePath = `${albumPath}/${file}`;
        const imageInfo = await getImageInfo(filePath);

        if (imageInfo) {
          imageInfoList.push(imageInfo);
        }
      }

      albums[albumName] = imageInfoList;
    }

    const jsonOutput = JSON.stringify(albums, null, 2);
    const destinationPath = `${destinationFolder}/photos.json`;
    fs.writeFileSync(destinationPath, jsonOutput);

    console.log(`JSON file created: ${destinationPath}`);

    console.log("Splitting photos into individual album files...");
    splitPhotosData(albums);
    console.log("Photo splitting completed!");
  } catch (error) {
    console.error("Error:", error.message);
  }
}

processImages(rootFolderPath);
