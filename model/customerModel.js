const dbConn = require('../database/db.config');
const customerQuery = require('../sql/customerQuery');
const Customer = (customer) => {
  this.name = customer.name;
  this.email = customer.email;
  this.password = customer.password;
};

Customer.signUp = (customer) => {
  return new Promise((resolve, reject) => {
    dbConn.query(customerQuery.signUp, customer, (err, res) => {
      if (err) {
        reject(err);
      } else {
        resolve(res);
      }
    });
  });
};
Customer.login = (customerEmail) => {
  return new Promise((resolve, reject) => {
    dbConn.query(customerQuery.login, customerEmail, (err, res) => {
      if (err) {
        reject(err);
      } else {
        resolve(res);
      }
    });
  });
};
module.exports = Customer;
