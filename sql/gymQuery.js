const addGym = `Insert Into gym Set ?`;
const getGyms = `SELECT g.gymId, g.name,g.latitude,
g.longitude,g.streetAddressLineOne,g.streetAddressLineTwo,
 m.name AS merchantName, m.merchantId
FROM gym AS g
LEFT JOIN merchant AS m ON m.gymId = g.gymId
`;
module.exports = {
  addGym,
  getGyms,
};
