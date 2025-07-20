const multer = require('multer');
const path = require('path');
const fs = require('fs');


const ensureDir = (dir) => {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
};

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const dir = file.fieldname === 'image' ? 'uploads/images' : 'uploads/videos';
    ensureDir(dir);
    cb(null, dir);
  },
  filename: (req, file, cb) => {
    const uniqueName = Date.now() + '-' + file.originalname;
    cb(null, uniqueName);
  }
});

const upload = multer({
  storage: storage,
  fileFilter: (req, file, cb) => {  
    const ext = path.extname(file.originalname).toLowerCase();
    if (file.fieldname === 'image' && (ext === '.jpg' || ext === '.jpeg' || ext === '.png')) {
      cb(null, true);
    }
    else if (file.fieldname === 'video' && (ext === '.mp4' || ext === '.mkv')) {
      cb(null, true);
    }
    else {
      cb(new Error('Invalid file type'), false);
    }
  },
  limits: {
    fileSize: 10 * 1024 * 1024 // 10 MB
  }
});

module.exports = upload;
