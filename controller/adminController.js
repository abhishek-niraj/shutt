const Admin = require('../model/adminModel');
const apiResponse = require('../response/apiResponse');
const responseStatusCode = require('../response/responseStatusCode');
const responseMessage = require('../response/responseMessage');
const { sign } = require('jsonwebtoken');
const { genSaltSync, hashSync, compareSync } = require('bcrypt');
exports.addAdmin = async (req, res) => {
  try {
    let newAdmin = req.body;
    const salt = genSaltSync(12);
    newAdmin.password = hashSync(newAdmin.password, salt);
    const admin = await Admin.addAdmin(newAdmin);
    if (admin.insertId) {
      apiResponse.apiResponseWithoutData(
        req,
        res,
        responseStatusCode.successStatusCode,
        responseMessage.userAdd
      );
    } else {
      apiResponse.apiResponseWithoutData(
        req,
        res,
        res,
        responseStatusCode.failedStatusCode,
        responseMessage.err
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
/************************* Login*******************************************/

exports.login = async (req, res) => {
  try {
    const admin = req.body;
    const getAdmin = await Admin.getAdmin(admin.email);
    if (getAdmin.length) {
      const isMatchPassword = compareSync(
        admin.password,
        getAdmin[0]['password']
      );
      if (isMatchPassword) {
        getAdmin.password = undefined;
        const result = {
          role: getAdmin[0]['role'],
          id: getAdmin[0]['id'],
        };
        const jsonWebToken = sign({ result }, process.env.SECRETKEY, {
          expiresIn: process.env.EXPIREIN,
        });
        res.json({
          statusCode: responseStatusCode.successStatusCode,
          message: responseMessage.loginSuccessfully,
          token: jsonWebToken,
          id: result.id,
          role: result.role,
        });
      } else {
        apiResponse.apiResponseWithoutData(
          req,
          res,
          responseStatusCode.failedStatusCode,
          responseMessage.invalidEmailAndPassword
        );
      }
    } else {
      apiResponse.apiResponseWithoutData(
        req,
        res,
        responseStatusCode.failedStatusCode,
        responseMessage.invalidEmailAndPassword
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
