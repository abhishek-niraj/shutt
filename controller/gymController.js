const Gym = require('../model/gymModel');
const apiResponse = require('../response/apiResponse');
const responseStatusCode = require('../response/responseStatusCode');
const responseMessage = require('../response/responseMessage');
const docUploadHelper = require('../utils/docUploadHelper');
const short = require('short-uuid');

/**************** Add GYm ********************************** */

exports.addGym = async (req, res) => {
  try {
    docUploadHelper.upload(req, res, async function (err) {
      if (err) {
        console.info(err);
        apiResponse.apiResponseWithoutData(
          req,
          res,
          responseStatusCode.failedStatusCode,
          responseMessage.somethingWentWrong
        );
      } else {
        const newGym = req.body;
        newGym.gymId = short.generate();
        const isGymAdd = await Gym.addGym(newGym);
        console.log(isGymAdd);
        if (isGymAdd.insertId) {
          apiResponse.apiResponseWithoutData(
            req,
            res,
            responseStatusCode.successStatusCode,
            responseMessage.gymAdd
          );
        } else {
          apiResponse.apiResponseWithoutData(
            req,
            res,
            responseStatusCode.failedStatusCode,
            responseMessage.somethingWentWrong
          );
        }
      }
    });
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

exports.getGyms = async (req, res) => {
  try {
    const gyms = await Gym.getGyms();
    apiResponse.apiResponseWithData(
      req,
      res,
      responseStatusCode.successStatusCode,
      gyms
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
