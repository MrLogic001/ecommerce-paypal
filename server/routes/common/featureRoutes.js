const { addFeatureImages, getFeatureImages } = require('../../controllers/common/featureController')

const express = require('express')


const router = express.Router()

router.get('/get', getFeatureImages)
router.post('/add', addFeatureImages)

module.exports = router