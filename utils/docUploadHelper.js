const multer = require('multer');
const todayDate = new Date();

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
    cb(null, todayDate.getTime() + '-' + file.originalname);
  },
});

exports.upload = multer({ storage: storage }).fields([
  { name: 'merchant_profile', maxCount: 1 },
  { name: 'gymImage', maxCount: 1 },
  { name: 'profileImage', maxCount: 1 },
]);
