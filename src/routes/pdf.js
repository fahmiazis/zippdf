const route = require('express').Router()
const pdf = require('../controllers/createpdf')

route.get('/get', pdf.createPdf)
route.get('/new', pdf.newpdf)
route.get('/save', pdf.savePdf)

module.exports = route
