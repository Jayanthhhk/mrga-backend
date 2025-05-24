const express = require('express');
const firmController = require('../controllers/firmController');
const verifyToken = require('../middlewares/verifyToken');

const multer = require('multer');
const path = require('path');

// Set up storage configuration
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/'); // Ensure this folder exists
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, uniqueSuffix + path.extname(file.originalname));
  }
});

const upload = multer({ storage: storage });


const router = express.Router()

router.post('/add-firm', verifyToken, upload.single('image'), firmController.addFirm);


router.get('/uploads/:imageName', (req, res) => {
    const imageName = req.params.imageName;
    res.header('Content-Type', 'image/jpeg');
    res.sendFile(path.join(__dirname, '..', 'uploads', imageName));
});

router.delete('/:firmId', firmController.deleteFirmById);


module.exports = router;