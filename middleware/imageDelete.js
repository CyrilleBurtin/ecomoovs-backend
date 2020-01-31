const cloudinary = require('cloudinary');

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

const imageDelete = publicId => {
  cloudinary.v2.uploader.destroy(publicId, function(error, result) {
    if (error) {
      console.log('err', error);
    } else {
      console.log('result', result);
    }
  });
};

module.exports = imageDelete;
