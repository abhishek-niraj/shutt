const dbConn = require('../database/db.config');
const qrCodeQuery = require('../sql/qrQuery');
const QrCode = (qrCode) => {
  this.qrId = qrCode.qrId;
  this.qrNumber = qrCode.qrNumber;
  this.created_at = qrCode.created_at;
  this.updated_at = qrCode.updated_at;
};
/*************** Add Qr Code *************************** */
QrCode.addQrCode = (qr) => {
  return new Promise((resolve, reject) => {
    dbConn.query(qrCodeQuery.addQr, qr, (err, res) => {
      if (err) {
        reject(err);
      } else {
        resolve(res);
      }
    });
  });
};
/******************* Get QrCode *********************************** */
QrCode.getQrCodes = () => {
  return new Promise((resolve, reject) => {
    dbConn.query(qrCodeQuery.getQrCodes, (err, res) => {
      if (err) {
        reject(err);
      } else {
        resolve(res);
      }
    });
  });
};
/******************** Check isQrCode available ************************ */
QrCode.isAvailable = (qrNumber) => {
  return new Promise((resolve, reject) => {
    dbConn.query(qrCodeQuery.isQrAvailable, qrNumber, (err, res) => {
      if (err) {
        reject(err);
      } else {
        resolve(res);
      }
    });
  });
};
QrCode.updateQrCode = (qrCode) => {
  return new Promise((resolve, reject) => {
    dbConn.query(
      qrCodeQuery.updateQrNumber,
      [qrCode.qrNumber, qrCode.updated_at, qrCode.qrId],
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

QrCode.deleteQrCode = (qrCodeId) => {
  return new Promise((resolve, reject) => {
    dbConn.query(qrCodeQuery.deleteQrCode, qrCodeId, (err, res) => {
      if (err) {
        reject(err);
      } else {
        resolve(res);
      }
    });
  });
};
module.exports = QrCode;
