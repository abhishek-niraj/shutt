const apiResponse = require('../response/apiResponse');
const responseStatusCode = require('../response/responseStatusCode');
const responseMessage = require('../response/responseMessage');
const QrCode = require('../model/qrModel');
const short = require('short-uuid');
const timeHelper = require('../utils/timeHelper');

/****************** Add QrCode ********************************** */
exports.addQrCode = async (req, res) => {
  try {
    const newQrCode = req.body;
    const isQrAvailable = await QrCode.isAvailable(newQrCode.qrNumber);
    console.log(short.generate());
    newQrCode.qrId = short.generate();
    newQrCode.created_at = timeHelper.currentTimeDate().currentLocalTimeAndDate;
    if (!isQrAvailable.length) {
      const qrCode = await QrCode.addQrCode(newQrCode);
      if (qrCode.insertId) {
        apiResponse.apiResponseWithoutData(
          req,
          res,
          responseStatusCode.successStatusCode,
          responseMessage.qrCodeAdded
        );
      } else {
        apiResponse.apiResponseWithoutData(
          req,
          res,
          responseStatusCode.failedStatusCode,
          responseMessage.somethingWentWrong
        );
      }
    } else {
      apiResponse.apiResponseWithoutData(
        req,
        res,
        responseStatusCode.failedStatusCode,
        responseMessage.qrCodeAlreadyAvailable
      );
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
/***************** Get QrCodes **************************************** */
exports.getQrCodes = async (req, res) => {
  try {
    const getQrCodes = await QrCode.getQrCodes();
    if (getQrCodes.length) {
      apiResponse.apiResponseWithData(
        req,
        res,
        responseStatusCode.successStatusCode,
        getQrCodes
      );
    } else {
      apiResponse.apiResponseWithoutData(
        req,
        res,
        responseStatusCode.failedStatusCode,
        responseMessage.noData
      );
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
/******************** Update QrCode  ********************************** */
exports.updateQrCode = async (req, res) => {
  try {
    const qrCode = req.body;
    qrCode.updated_at = timeHelper.currentTimeDate().currentLocalTimeAndDate;
    const isUpdate = await QrCode.updateQrCode(qrCode);
    if (isUpdate.affectedRows) {
      apiResponse.apiResponseWithoutData(
        req,
        res,
        responseStatusCode.successStatusCode,
        responseMessage.qrNumberUpdated
      );
    } else {
      apiResponse.apiResponseWithoutData(
        req,
        res,
        responseStatusCode.failedStatusCode,
        responseMessage.somethingWentWrong
      );
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
exports.deleteQrCode = async (req, res) => {
  try {
    const qrId = req.body.qrId;
    const isDelete = await QrCode.deleteQrCode(qrId);
    if (isDelete.affectedRows) {
      apiResponse.apiResponseWithoutData(
        req,
        res,
        responseStatusCode.successStatusCode,
        responseMessage.qrCodeDeleted
      );
    } else {
      apiResponse.apiResponseWithoutData(
        req,
        res,
        responseStatusCode.failedStatusCode,
        responseMessage.somethingWentWrong
      );
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
