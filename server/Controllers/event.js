const express = require('express')
const router = express.Router()

const eGetAbl = require('../Abl/event/eGetAbl')
const eCreateAbl = require('../Abl/event/eCreateAbl')
const eListAbl = require('../Abl/event/eListAbl')
const eGetEventGroupsAbl = require('../Abl/event/eGetEventGroupsAbl')


/* /event */

// DONE
router.post('/create', (req, res) => {
    eCreateAbl(req, res)
})

// DONE
router.get('/get', (req, res) => {
    eGetAbl(req, res)
})

// DONE
router.get('/list', (req, res) => {
    eListAbl(req, res)
})

// DONE
router.get('/getEventGroups', (req, res) => {
    eGetEventGroupsAbl(req, res)
})

module.exports = router
