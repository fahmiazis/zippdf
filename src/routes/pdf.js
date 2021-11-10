const route = require('express').Router()
const pdf = require('../controllers/createpdf')

route.get('/get', pdf.createPdf)

module.exports = route
