import multer from "multer";

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      let path = '';
      if (file.filedname === 'productImg') {
        path = 'img/products'
      }
      if (file.filedname === 'profileImg') {
        path = 'img/profiles'
      }
      if (file.filedname === 'documentImg') {
        path = 'img/documents'
      }
      cb(null, path);
    },
    filename: function (req, file, cb) {
      cb(null, file.originalname);
    }
  });

export const upload = multer({ storage: storage });
