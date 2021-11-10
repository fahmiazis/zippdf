const response = require('../helpers/response')

module.exports = {
  createPdf: async (req, res) => {
    const { depo, promo, tgldari, reg, timeStart } = req.query
    const Api2Pdf = require('api2pdf')
    const a2pClient = new Api2Pdf('9e9db4c1-997d-4a14-a3e1-d830034da05c')

    const options = { orientation: 'landscape', pageSize: 'A4', title: '0034/SLS-FHO/I/21A.pdf' }
    a2pClient.wkUrlToPdf('http://trial.pinusmerahabadi.co.id/redpinereport/library/export/byDepo/export/export_promo_tpr_automaticaly_pdf.php?depo=SIBOLGA&promo=0034/SLS-FHO/I/21A&tgldari=2021-09&timeStart=&reg=3', { options: options }).then(function (result) {
      return response(res, 'succes create pdf', { result })
    })
  }
}
