function currentTimeDate() {
  const now = new Date();
  const year = now.getFullYear();
  const month = ('0' + (now.getMonth() + 1)).slice(-2);
  const day = ('0' + now.getDate()).slice(-2);
  const firstDayOfYear = new Date(Date.UTC(year, 0, 1));
  const formattedDate = `${day}-${month}-${year}`;
  const comparingDateIs = firstDayOfYear.toISOString().slice(0, 10);
  const currentDate = `${year}-${month}-${day}`;
  const getDateMonth = `${day}-${month}`;
  const currentLocalTimeAndDate = now.toISOString('en-In', {
    timeZone: 'Asia / Kolkata',
    hour12: false,
  });
  return {
    getDateMonth: getDateMonth,
    currentDate: currentDate,
    comparingDateIs: comparingDateIs,
    formattedDate: formattedDate,
    currentLocalTimeAndDate: currentLocalTimeAndDate,
    year: year,
    month: month,
    day: day,
  };
}
function expireTimeDate(addDays = 0) {
  const now = new Date();
  const currentDate = new Date(now);
  currentDate.setDate(now.getDate() + addDays);
  const year = currentDate.getFullYear();
  const month = ('0' + (currentDate.getMonth() + 1)).slice(-2);
  const day = ('0' + currentDate.getDate()).slice(-2);
  const getDateMonth = `${day}-${month}`;
  const expiryDate = `${year}-${month}-${day}`;

  return {
    expiryDate: expiryDate,
  };
}
module.exports = {
  currentTimeDate,
  expireTimeDate,
};
