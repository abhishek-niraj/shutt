const addGym = `Insert Into gym Set ?`;
const getGyms = `SELECT g.gymId, g.name,g.latitude,
g.longitude,g.gymImage,g.streetAddressLineOne,g.streetAddressLineTwo,
g.city, g.state, g.zipCode, 
 m.name AS merchantName, m.merchantId
FROM gym AS g
LEFT JOIN merchant AS m ON m.gymId = g.gymId
`;
const deleteGym = `Delete From gym Where gymId = ?`;
module.exports = {
  addGym,
  getGyms,
  deleteGym,
};
