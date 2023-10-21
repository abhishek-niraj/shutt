const apiResponse = require('../response/apiResponse');
const responseStatusCode = require('../response/responseStatusCode');
const responseMessage = require('../response/responseMessage');
exports.addQrCode = (req, res, next) => {
  try {
    const { qrNumber } = req.body;
    if (!qrNumber) {
      apiResponse.apiResponseWithoutData(
        req,
        res,
        responseStatusCode.failedStatusCode,
        responseMessage.fillMandatoryField
      );
    } else {
      next();
    }
  } catch (err) {
    console.info(err);
  }
};

exports.updateQrCode = (req, res, next) => {
  try {
    const { qrId, qrNumber } = req.body;
    if (!qrId || !qrNumber) {
      apiResponse.apiResponseWithoutData(
        req,
        res,
        responseStatusCode.failedStatusCode,
        responseMessage.fillMandatoryField
      );
    } else {
      next();
    }
  } catch (err) {
    console.info(err);
  }
};
exports.deleteQrCode = (req, res, next) => {
  try {
    const { qrId } = req.body;
    if (!qrId) {
      apiResponse.apiResponseWithoutData(
        req,
        res,
        responseStatusCode.failedStatusCode,
        responseMessage.fillMandatoryField
      );
    } else {
      next();
    }
  } catch (err) {
    console.info(err);
  }
};
