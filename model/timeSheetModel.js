const dbConn = require('../database/db.config');
const timeSheetQuery = require('../sql/timeSheetQuery');
const TimeSheet = (timeSheet) => {
  this.checkIn = timeSheet.checkIn;
  this.checkOut = timeSheet.checkOut;
  this.customerId = timeSheet.customerId;
  this.merchantId = timeSheet.merchantId;
};

TimeSheet.checkIn = (data) => {
  return new Promise((resolve, reject) => {
    dbConn.query(timeSheetQuery.checkIn, data, (err, res) => {
      if (err) {
        reject(err);
      } else {
        resolve(res);
      }
    });
  });
};
TimeSheet.iSCheckInOnThisDate = (date, customerId) => {
  return new Promise((resolve, reject) => {
    dbConn.query(
      timeSheetQuery.isCheckInDate,
      [date, customerId],
      (err, res) => {
        if (err) {
          reject(err);
        } else {
          resolve(res);
        }
      }
    );
  });
};
TimeSheet.getCustomerTimeSheet = (startDate, endDate, customerId) => {
  return new Promise((resolve, reject) => {
    dbConn.query(
      timeSheetQuery.getCustomerTimeSheet,
      [startDate, startDate, endDate, customerId, customerId],
      (err, res) => {
        if (err) {
          reject(err);
        } else {
          resolve(res);
        }
      }
    );
  });
};
module.exports = TimeSheet;
