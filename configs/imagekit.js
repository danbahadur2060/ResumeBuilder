// import Imagekit from "@imagekit/next"

// // Only initialize if we have the required environment variables
// let imagekit = null;

// if (process.env.IMAGEKIT_PRIVATE_KEY && process.env.IMAGEKIT_PUBLIC_KEY && process.env.IMAGEKIT_URL_ENDPOINT) {
//   imagekit = new Imagekit({
//     privateKey: process.env.IMAGEKIT_PRIVATE_KEY,
//     publicKey: process.env.IMAGEKIT_PUBLIC_KEY,
//     urlEndpoint: process.env.IMAGEKIT_URL_ENDPOINT
//   });
// } else {
//   // Create a mock imagekit for build time
//   imagekit = {
//     files: {
//       upload: async () => {
//         throw new Error("ImageKit not configured");
//       }
//     }
//   };
// }

// export default imagekit