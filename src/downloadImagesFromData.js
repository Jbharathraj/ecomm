// src/downloadImagesFromData.js
const fs = require("fs");
const https = require("https");
const path = require("path");

// Import your product data
const { data } = require("./Data/data.js"); 

// Folder to save images
const assetsDir = path.join(__dirname, "Components/Assets");
if (!fs.existsSync(assetsDir)) {
  fs.mkdirSync(assetsDir, { recursive: true });
}

// Function to download an image
const downloadImage = (url, filepath) => {
  return new Promise((resolve, reject) => {
    const file = fs.createWriteStream(filepath);
    https.get(url, (res) => {
      if (res.statusCode === 200) {
        res.pipe(file);
        file.on("finish", () => {
          file.close();
          console.log(`Downloaded: ${path.basename(filepath)}`);
          resolve();
        });
      } else {
        file.close();
        fs.unlinkSync(filepath);
        console.log(`Image not found: ${path.basename(filepath)}`);
        resolve(); // resolve even if 404
      }
    }).on("error", (err) => {
      console.log(`Error downloading ${path.basename(filepath)}: ${err.message}`);
      reject(err);
    });
  });
};

// Async function to loop through all products
const downloadAllImages = async () => {
  for (const product of data) {
    for (const color of product.color) {
      const extensions = ["png", "jpg"];
      let downloaded = false;

      for (const ext of extensions) {
        const imageName = `${product.id}-${color}.${ext}`;
        const filePath = path.join(assetsDir, imageName);
        
        // Skip if already exists
        if (fs.existsSync(filePath)) {
          console.log(`Already exists: ${imageName}`);
          downloaded = true;
          break;
        }

        // Replace with your real image base URL
        const imageUrl = `https://example.com/images/${imageName}`;

        try {
          await downloadImage(imageUrl, filePath);
          downloaded = true;
          break; // stop after first successful download
        } catch (err) {
          console.log(`Failed: ${imageName}`);
        }
      }

      if (!downloaded) {
        console.log(`Could not download: ${product.id}-${color}`);
      }
    }
  }
};

// Start downloading
downloadAllImages()
  .then(() => console.log("All images processed"))
  .catch((err) => console.log("Error:", err));
