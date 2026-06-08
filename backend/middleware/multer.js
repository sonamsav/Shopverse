import multer from "multer";

const storage = multer.memoryStorage();

//singe upload this is t store images 
export const singleUpload = multer({ storage }).single("file");

//multiple
export const multipleUpload = multer({ storage }).array("file", 5);
