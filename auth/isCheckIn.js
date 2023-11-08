const apiResponse = require('../response/apiResponse');
const responseStatusCode = require('../response/responseStatusCode');
const responseMessage = require('../response/responseMessage');
const timeHelper = require('../utils/timeHelper');
const TimeSheet = require('../model/timeSheetModel');
const decodedData = require('../auth/verifyToken');

exports.isCheckIn = async (req, res, next) => {
  try {
    const date = timeHelper.currentTimeDate().currentDate;
    const customerId = decodedData.tokenData(req, res).result.id;
    const isAvailable = await TimeSheet.iSCheckInOnThisDate(date, customerId);
    if (isAvailable.length) {
      apiResponse.apiResponseWithoutData(
        req,
        res,
        responseStatusCode.failedStatusCode,
        responseMessage.isCheckIn
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
