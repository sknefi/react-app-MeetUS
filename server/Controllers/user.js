const express = require('express')
const router = express.Router()

const uGetAbl = require('../Abl/user/uGetAbl')
const uListAbl = require('../Abl/user/uListAbl')
const uIsUserInDatabase = require('../Abl/user/uIsUserInDatabase')
const uCreateAbl = require('../Abl/user/uCreateAbl')

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


module.exports = router
