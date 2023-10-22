const addQr = `Insert Into qr_code Set ?`;
const getQrCodes = 'Select * from qr_code';
const isQrAvailable = `Select qrNumber From qr_code where qrNumber = ?`;
const updateQrNumber = `Update qr_code Set qrNumber = COALESCE(?,qrNumber), updated_at = COALESCE(?,updated_at)  Where qrId = ?`;
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
