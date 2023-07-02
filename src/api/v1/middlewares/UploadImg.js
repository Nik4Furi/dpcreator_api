
//-------------- Uploading only one image by the user ----------------X
const multer = require('multer');

// Define the storage bucket
const storage = multer.memoryStorage();

//Writing the filteration to filtering the uploaded images
const path = require("path");

const checkFileType = function (file, cb) {
  //Allowed file extensions
  const fileTypes = /jpeg|jpg|png|gif|svg/;

  //check extension names
  const extName = fileTypes.test(path.extname(file.originalname).toLowerCase());

  const mimeType = fileTypes.test(file.mimetype);

  if (mimeType && extName) {
    return cb(null, true);
  } else {
    cb("Error: You can Only Upload Images!!");
  }
};

// Define the function to user to uploading images
const SingleUpload = multer({
    storage,
    limits : {fileSize : 1000000},
    fileFilter : (req,file,cb)=>{
        checkFileType(file,cb);
    }
});

module.exports = SingleUpload

