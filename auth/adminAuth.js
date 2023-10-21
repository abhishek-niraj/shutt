const apiResponse = require('../response/apiResponse');
const responseStatusCode = require('../response/responseStatusCode');
const responseMessage = require('../response/responseMessage');
const Admin = require('../model/adminModel');
exports.isAvailable = async (req, res, next) => {
  try {
    const { email } = req.body;
    const isAvailable = await Admin.getAdmin(email);
    if (isAvailable.length) {
      apiResponse.apiResponseWithoutData(
        req,
        res,
        responseStatusCode.failedStatusCode,
        responseMessage.emailAvailable
      );
    } else {
      next();
    }
  } catch (err) {
    console.info(err);
    apiResponse.apiResponseWithoutData(
      req,
      res,
      responseStatusCode.failedStatusCode,
      responseMessage.somethingWentWrong
    );
  }
};
