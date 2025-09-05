const cloudinary = require('cloudinary').v2;
const multer = require('multer');

cloudinary.config({
    cloud_name: 'dldq3jwj9',
    api_key: '769312739765147',
    api_secret: 'cvZ8YkSeWPL8_OeMET5Iaxw-UgY'
})

const storage = multer.memoryStorage();

async function imageUploadUtil(file) {
  const result = await cloudinary.uploader.upload(file, {
    resource_type: "auto",
  });

  return result;
}

const upload = multer({ storage });

module.exports = { upload, imageUploadUtil };