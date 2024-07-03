import multer from 'multer';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const type = req.headers.type;
    const validTypes = ['designs', 'products', 'users', 'articles'];
    if (!validTypes.includes(type)) {
      return cb(new Error('Invalid upload type'));
    }
    const __filename = fileURLToPath(import.meta.url);
    const __dirname = path.dirname(__filename);
    const uploadDir = path.join(__dirname, '../../repositories/avatars', type);
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }
    cb(null, uploadDir);
  },
  filename: function (req, file, cb) {
    cb(null, 'users/' + Date.now() + '-' + file.originalname);
  }
});

const uploadPhoto = multer({ storage: storage });

export default uploadPhoto;
