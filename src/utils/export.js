import fs from "fs";
import sharp from "sharp";
import ExifParser from "exif-parser";

// Provide the root path to the folder containing albums
const rootFolderPath = "public/photos";

// Provide the destination folder for the JSON file
const destinationFolder = "src/data";

// Function to get image size and GPS data
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

// Function to read files in a directory
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

// Function to process images and create JSON
async function processImages(rootFolderPath) {
  try {
    const albums = {};
    const rootDirectories = await readFilesInDirectory(rootFolderPath);

    for (const albumName of rootDirectories) {
      const albumPath = `${rootFolderPath}/${albumName}`;
      const isDirectory = fs.statSync(albumPath).isDirectory();

      if (!isDirectory) {
        continue; // Skip processing if it's not a directory
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
  } catch (error) {
    console.error("Error:", error.message);
  }
}

// Call the function to process images
processImages(rootFolderPath);
