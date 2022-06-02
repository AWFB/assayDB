const Assay = require('../models/Assays')

const assay_index = (req, res) => {
    Assay.find({})
        .then((result) => {
            res.render('assays', {assays: result})
        })
        .catch((err) => {
            console.log(err)
        })
}

const assay_details = (req, res) => {
  const id = req.params.id
  Assay.findById(id)
  .then ((result) => {
    res.render('details', {assay: result})
  })
  .catch((err) => {
    console.log(err)
  }) 
}

const create_assay_get = (req, res) => {
  res.render('createAssay')
}

module.exports = {
  assay_index,
  assay_details,
  create_assay_get,
}
