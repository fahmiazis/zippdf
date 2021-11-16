const response = require('../helpers/response')
const https = require('https')
const http = require('http')
const fs = require('fs')
const html_to_pdf = require('html-pdf-node')
// const vs = require('fs').promises
const { APP_URL } = process.env

module.exports = {
  createPdf: async (req, res) => {
    try {
      const { depo, promo, tgldari, reg } = req.query
      const name = new Date().getTime().toString().concat('.pdf')
      const Api2Pdf = require('api2pdf')
      const a2pClient = new Api2Pdf('9e9db4c1-997d-4a14-a3e1-d830034da05c')
      const options = { orientation: 'landscape', pageSize: 'A4' }
      const url = `http://trial.pinusmerahabadi.co.id/redpinereport/library/export/byDepo/export/export_promo_tpr_automaticaly_pdf.php?depo=${depo}&promo=${promo}&tgldari=${tgldari}&reg=${reg}`
      await a2pClient.wkUrlToPdf(url, { options: options }).then(function (result) {
        const request = https.get(result.FileUrl, function (response) {
          if (response.statusCode === 200) {
            const file = fs.createWriteStream(`asset/doc/${name}`)
            response.pipe(file)
            if (fs.lstatSync(`asset/doc/${name}`).isFile()) {
              setTimeout(() => {
                res.download(`asset/doc/${name}`)
                res.status(200)
              }, 500)
            }
          }
          request.setTimeout(60000, function () {
            request.abort()
          })
        })
        // return response(res, 'succes create pdf', { base: url, url: `${APP_URL}/download/${name}` })
      })
    } catch (error) {
      return response(res, error.message, {}, 500, false)
    }
  },
  newpdf: async (req, res) => {
    try {
      const { depo, promo, tgldari, reg } = req.query
      const name = new Date().getTime().toString().concat('.pdf')
      const options = { format: 'A4', landscape: true, printBackground: true }
      const url = `http://trial.pinusmerahabadi.co.id/redpinereport/library/export/byDepo/export/export_promo_tpr_automaticaly_pdf.php?depo=${depo}&promo=${promo}&tgldari=${tgldari}&reg=${reg}`
      const file = [{ url: url, name: name }]
      html_to_pdf.generatePdfs(file, options).then(output => {
        res.contentType('application/pdf')
        res.send(output[0].buffer)
      })
    } catch (error) {
      return response(res, error.message, {}, 500, false)
    }
  },
  savePdf: async (req, res) => {
    try {
      const { depo, promo, tgldari, reg } = req.query
      const name = new Date().getTime().toString().concat('.pdf')
      const url = `${APP_URL}/pdf/new?depo=${depo}&promo=${promo}&tgldari=${tgldari}&reg=${reg}`
      const request = http.get(url, function (response) {
        if (response.statusCode === 200) {
          const file = fs.createWriteStream(`asset/doc/${name}`)
          response.pipe(file)
          if (fs.lstatSync(`asset/doc/${name}`).isFile()) {
            setTimeout(() => {
              res.download(`asset/doc/${name}`)
              res.status(200)
            }, 200)
          }
        }
        request.setTimeout(60000, function () {
          request.abort()
        })
      })
    } catch (error) {
      return response(res, error.message, {}, 500, false)
    }
  }
}
