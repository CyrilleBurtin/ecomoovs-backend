const cloudinary = require("cloudinary");

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

const imageUpload = (req, setMoov, width, height, folder) => {
  cloudinary.v2.uploader.upload(
    req.files.image.tempFilePath,
    {
      folder: folder,
      resource_type: "image",
      format: "jpg",
      eager: [{ width: width, height: height, crop: "pad" }]
    },
    (err, result) => {
      if (err) {
        console.log("err", err);
      } else {
        console.log("result", result);
        setMoov(result);
      }
    }
  );
};
module.exports = imageUpload