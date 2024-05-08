const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const multer = require('multer');
const dotenv = require('dotenv');
dotenv.config();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});


const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'sound',
    format: async (req, file) => ['mp4', 'mp3', 'jpg', 'png'].find(format => file.originalname.endsWith(format)), 
    public_id: (req, file) => {
      const name = file.originalname.split('.')[0];
      return `${name}`;
    }, 
    resource_type: 'auto', 
  },
});

const upload = multer({ storage: storage });

module.exports = upload;