const express = require('express');
const router = express.Router();

const uGetAbl = require('../Abl/user/uGetAbl');
const uListAbl = require('../Abl/user/uListAbl');
const uIsUserInDatabase = require('../Abl/user/uIsUserInDatabase');
const uCreateAbl = require('../Abl/user/uCreateAbl');
const uInkrementUserStreak = require('../Abl/user/uInkrementUserStreak');

const multer  = require('multer');
const path = require('path');

const destinationDir = path.resolve(__dirname, '../Public/UserPhotos/');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, destinationDir);
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + path.extname(file.originalname) )
    }
});

const upload = multer({ storage: storage });


/* /user */


// DONE
router.post('/create', (req, res) => {
    uCreateAbl(req, res)
})

// DONE
router.get('/get', (req, res) => {
    uGetAbl(req, res)
})

// DONE
router.post('/exists', (req, res) => {
    uIsUserInDatabase(req, res)
})

// DONE
router.get('/list', (req, res) => {
    uListAbl(req, res)
})

// DONE
router.post('/inkrementUserStreak', (req, res) => {
    uInkrementUserStreak(req, res)
})

router.post('/uploadPhoto', upload.single('file'), (req, res) => {
    res.send(200);
});

module.exports = router
