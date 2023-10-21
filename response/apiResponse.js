const apiResponseWithoutData = (req, res, statusCode, message) => {
  res.json({
    statusCode: statusCode,
    message: message,
  });
};
const apiResponseWithData = (req, res, statusCode, data, pageLength) => {
  res.json({
    statusCode: statusCode,
    pageLength,
    data,
  });
};
module.exports = {
  apiResponseWithData,
  apiResponseWithoutData,
};
