const addQr = `Insert Into qr_code Set ?`;
const getQrCodes = `Select id, qrId, qrNumber, created_at, updated_at, merchantId,
CASE 
  WHEN merchantId IS NOT NULL And merchantId != ''THEN 'Assigned'
  ELSE 'Not Assigned'
END AS isAssigned  
From qr_code`;
const isQrAvailable = `Select qrNumber From qr_code where qrNumber = ?`;
const updateQrNumber = `Update qr_code Set qrNumber = COALESCE(?,qrNumber), updated_at = COALESCE(?,updated_at),
merchantId = COALESCE(?,merchantId) 
Where qrId = ?`;
const deleteQrCode = `Delete From qr_code Where qrId = ?`;
const getQrCode = `Select qrNumber From qr_code Where qrId = ?`;
module.exports = {
  addQr,
  getQrCodes,
  isQrAvailable,
  updateQrNumber,
  deleteQrCode,
  getQrCode,
};
