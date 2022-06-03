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

const search_assay_post = (req, res) => {
  const searchTerm = req.body.searchAssay
  Assay.find({$text: {$search: searchTerm}})
      .then((result) => {
          res.render('assaySearchResults', { result: result })
      })
      .catch((err) => {
          console.log(err)
      })
}

const create_assay_get = (req, res) => {
    res.render('createAssay')
}
const search_assay_get = (req, res) => {
    res.render('assaysearch')
}



const assay_details = (req, res) => {
    const id = req.params.id
    Assay.findById(id)
        .then((result) => {
            res.render('details', {assay: result})
        })
        .catch((err) => {
            console.log(err)
        })
}

const create_assay_post = (req, res) => {
    const assay = new Assay(req.body)

    assay
        .save()
        .then((result) => {
            res.redirect('/assays')
        })
        .catch((err) => {
            console.log(err)
        })
}

module.exports = {
    assay_index,
    assay_details,
    create_assay_get,
    create_assay_post,
    search_assay_get,
    search_assay_post,
}
