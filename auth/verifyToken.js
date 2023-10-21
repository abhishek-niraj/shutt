const jwt = require('jsonwebtoken');
const apiResponse = require('../response/apiResponse');
const responseStatusCode = require('../response/responseStatusCode');
const responseMessage = require('../response/responseMessage');
const UserRole = require('../enum/userRoleEnum');
const dotenv = require('dotenv');
dotenv.config({ path: './config.env' });

exports.tokenData = (req, res) => {
  let token = req.get('authorization');
  let decodedData = '';
  if (token) {
    token = token.slice(7);
    jwt.verify(token, process.env.SECRETKEY, (err, decode) => {
      if (err) {
        apiResponse.apiResponseWithoutData(
          req,
          res,
          responseStatusCode.failedStatusCode,
          responseMessage.invalidToken
        );
      } else {
        decodedData = decode;
      }
    });
  } else {
    apiResponse.apiResponseWithoutData(
      req,
      res,
      responseStatusCode.unauthorizedStatusCode,
      responseMessage.accessDenied
    );
  }
  return decodedData;
};

exports.checkAdmin = (req, res, next) => {
  const decode = this.tokenData(req, res);
  const role = decode.result.role;
  if (role !== UserRole.admin) {
    apiResponse.apiResponseWithoutData(
      req,
      res,
      responseStatusCode.unauthorizedStatusCode,
      responseMessage.accessDenied
    );
  } else {
    req.decode = decode;
    next();
  }
};
exports.checkUser = (req, res, next) => {
  const decode = this.tokenData(req, res);

  if (!decode) {
    apiResponse.apiResponseWithoutData(
      req,
      res,
      responseStatusCode.unauthorizedStatusCode,
      responseMessage.accessDenied
    );
  } else {
    req.decode = decode;
    next();
  }
};
