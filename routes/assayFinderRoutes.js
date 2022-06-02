const express = require('express')
const assayController = require('../controllers/assayController')

const router = express.Router()

router.get('/assays', assayController.assay_index)
router.get('/assays/:id', assayController.assay_details)
router.get('/assays/create/assay', assayController.create_assay_get)
router.post('/assays/create/assay', assayController.create_assay_post)
router.get('/search', assayController.search_assay_get)
router.post('/search', assayController.search_assay_post)

// // Blog routes
// router.get('/', blogController.blog_index)
// router.post('/', blogController.blog_create_post)
// router.get('/create', blogController.blog_create_get)
// router.get('/:id', blogController.blog_details)
// router.delete('/:id', blogController.blog_delete)

module.exports = router
