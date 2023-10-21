const dbConn = require('../database/db.config');
const merchantQuery = require('../sql/merchantQuery');
const Merchant = (merchant) => {
  this.name = merchant.name;
  this.contactNumber = merchant.contactNumber;
  this.email = merchant.email;
  this.profileImage = merchant.profileImage;
};
/*************************Add Merchant ************************************** */
Merchant.addMerchant = (merchant) => {
  console.log(merchant);
  return new Promise((resolve, reject) => {
    dbConn.query(merchantQuery.addMerchant, merchant, (err, res) => {
      if (err) {
        reject(err);
      } else {
        resolve(res);
      }
    });
  });
};

/************************** Login Merchant **************************************** */

Merchant.login = (merchant) => {
  return new Promise((resolve, reject) => {
    dbConn.query(merchantQuery.getMerchant, [merchant.email], (err, res) => {
      if (err) {
        reject(err);
      } else {
        resolve(res);
      }
    });
  });
};
module.exports = Merchant;
