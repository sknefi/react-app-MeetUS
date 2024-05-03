const express = require('express')
const router = express.Router()

const gGetAbl = require('../Abl/group/gGetAbl')
const gListAbl = require('../Abl/group/gListAbl')
const gGetUserGroupsAbl = require('../Abl/group/gGetUserGroupsAbl')
const gAddUserToGroupAbl = require('../Abl/group/gAdduserToGroupAbl')
const gGetGroupUsersAbl = require('../Abl/group/gGetGroupUsersAbl')
const gCreateAbl = require('../Abl/group/gCreateAbl')

/* /group */


// DONE
router.post('/create', (req, res) => {
    gCreateAbl(req, res)
})


// DONE
router.post('/get', (req, res) => {
    gGetAbl(req, res)
})


// DONE
router.get('/list', (req, res) => {
    gListAbl(req, res)
})

// DONE
router.post('/getUserGroups', (req, res) => {
    gGetUserGroupsAbl(req, res)
})


// DONE
router.post('/addUserToGroup', (req, res) => {
    gAddUserToGroupAbl(req, res)
})


// DONE
router.post('/getGroupUsers', (req, res) => {
    gGetGroupUsersAbl(req, res)
})







module.exports = router
