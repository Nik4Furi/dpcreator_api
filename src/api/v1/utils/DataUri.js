const DataURIParser = require('datauri/parser.js');

const path = require('path');

//---------- Get the data uri from images
const GetDataUri = (file) => {
    try {

        const parser = new DataURIParser();

        const extName = path.extname(file.originalname).toString();
        console.log("check ext name ", extName);

        return parser.format(extName, file.buffer);
    } catch (error) {
        console.log('Error occured during file data uri ', error);
    }

}

module.exports = GetDataUri;


