// configs/imagekit.ts
import ImageKit from "imagekit";

// Only initialize if required environment variables exist
let imagekitInstance = null;

if (
  process.env.IMAGEKIT_PRIVATE_KEY &&
  process.env.IMAGEKIT_PUBLIC_KEY &&
  process.env.IMAGEKIT_URL_ENDPOINT
) {
  imagekitInstance = new ImageKit({
    privateKey: process.env.IMAGEKIT_PRIVATE_KEY,
    publicKey: process.env.IMAGEKIT_PUBLIC_KEY,
    urlEndpoint: process.env.IMAGEKIT_URL_ENDPOINT,
  });
} else {
  imagekitInstance = {
    files: {
      upload: async () => {
        throw new Error("ImageKit not configured");
      },
    },
  };
}

export { imagekitInstance as imagekit };
