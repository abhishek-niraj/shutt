const TimeSheet = require('../model/timeSheetModel');
const apiResponse = require('../response/apiResponse');
const responseStatusCode = require('../response/responseStatusCode');
const responseMessage = require('../response/responseMessage');
const Merchant = require('../model/merchantModel');
const timeHelper = require('../utils/timeHelper');
const decodedData = require('../auth/verifyToken');
exports.checkIn = async (req, res) => {
  try {
    const qrId = req.body.qrId;
    const customerId = decodedData.tokenData(req, res).result.id;
    const qrData = await Merchant.getMerchantByQrId(qrId);
    const newTimeSheet = {
      gymId: qrData[0]['gymId'],
      customerId: customerId,
      date: timeHelper.currentTimeDate().currentDate,
      checkIn: timeHelper.currentTimeDate().currentLocalTimeAndDate,
    };
    const isCheckIn = await TimeSheet.checkIn(newTimeSheet);
    if (isCheckIn.insertId) {
      apiResponse.apiResponseWithoutData(
        req,
        res,
        responseStatusCode.successStatusCode,
        responseMessage.checkIn
      );
    } else {
    }
  } catch (err) {
    console.log(err);
    apiResponse.apiResponseWithoutData(
      req,
      res,
      responseStatusCode.failedStatusCode,
      responseMessage.somethingWentWrong
    );
  }
};
exports.getCustomerTimeSheet = async (req, res) => {
  try {
    let { startDate, endDate, customerId } = req.body;
    if (!customerId) {
      customerId = null;
    }
    const result = await TimeSheet.getCustomerTimeSheet(
      startDate,
      endDate,
      customerId
    );
    apiResponse.apiResponseWithData(
      req,
      res,
      responseStatusCode.successStatusCode,
      result
    );
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
