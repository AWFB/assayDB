const express = require('express')
const assayController = require('../controllers/assayController')

const router = express.Router()

router.get('/assays', assayController.assay_index)
router.get('/assays/:id', assayController.assay_details)
router.get('/assays/create/assay', assayController.create_assay_get)
router.post('/assays/create/assay', assayController.create_assay_post)
router.get('/search', assayController.search_assay_get)
router.post('/search', assayController.search_assay_post)

module.exports = router
