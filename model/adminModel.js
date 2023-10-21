const dbConn = require('../database/db.config');
const adminQuery = require('../sql/adminQuery');
const Admin = (admin) => {
  this.name = admin.name;
  this.email = admin.email;
  this.password = admin.password;
};

Admin.addAdmin = (admin) => {
  return new Promise((resolve, reject) => {
    dbConn.query(adminQuery.addAdmin, admin, (err, res) => {
      if (err) {
        reject(err);
      } else {
        resolve(res);
      }
    });
  });
};

Admin.getAdmin = (email) => {
  return new Promise((resolve, reject) => {
    dbConn.query(adminQuery.getAdmin, email, (err, res) => {
      if (err) {
        reject(err);
      } else {
        resolve(res);
      }
    });
  });
};
module.exports = Admin;
