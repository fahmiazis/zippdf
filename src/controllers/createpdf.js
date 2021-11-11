const response = require('../helpers/response')

module.exports = {
  createPdf: async (req, res) => {
    try {
      const { depo, promo, tgldari, timeStart } = req.query
      const Api2Pdf = require('api2pdf')
      const a2pClient = new Api2Pdf('9e9db4c1-997d-4a14-a3e1-d830034da05c')

      const options = { orientation: 'landscape', pageSize: 'A4', title: '0034/SLS-FHO/I/21A.pdf' }
      const url = `http://trial.pinusmerahabadi.co.id/redpinereport/library/export/byDepo/export/export_promo_tpr_automaticaly_pdf.php?depo=${depo}&promo=${promo}&tgldari=${tgldari}&timeStart=${timeStart}`
      await a2pClient.wkUrlToPdf(url, { options: options }).then(function (result) {
        return response(res, 'succes create pdf', { result, url })
      })
    } catch (error) {
      return response(res, error.message, {}, 500, false)
    }
  }
}
