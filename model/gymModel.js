const dbConn = require('../database/db.config');
const gymQuery = require('../sql/gymQuery');
const Gym = (gym) => {
  this.name = gym.name;
  this.gymId = gym.gymId;
  this.latitude = gym.latitude;
  this.longitude = gym.longitude;
  this.gymImage = gym.gymImage;
  this.streetAddressLineOne = gym.streetAddressLineOne;
  this.streetAddressLineTwo = gym.streetAddressLineTwo;
  this.city = gym.city;
  this.state = gym.city;
  this.zipCode = gym.zipCode;
  this.country = gym.country;
};
/************** Add Gym ************************* */
Gym.addGym = (gym) => {
  return new Promise((resolve, reject) => {
    dbConn.query(gymQuery.addGym, gym, (err, res) => {
      if (err) {
        reject(err);
      } else {
        resolve(res);
      }
    });
  });
};
/**************  Get All gym ************************ */
Gym.getGyms = () => {
  return new Promise((resolve, reject) => {
    dbConn.query(gymQuery.getGyms, (err, res) => {
      if (err) {
        reject(err);
      } else {
        resolve(res);
      }
    });
  });
};
/*************** Delete gym ****************************** */
Gym.deleteGym = (gymId) => {
  return new Promise((resolve, reject) => {
    dbConn.query(gymQuery.deleteGym, gymId, (err, res) => {
      if (err) {
        reject(err);
      } else {
        resolve(res);
      }
    });
  });
};
module.exports = Gym;
