const checkIn = `Insert Into timesheet  Set ?`;
const isCheckInDate = `Select id From timesheet Where date = ? And customerId = ?`;
const getCustomerTimeSheet = `SELECT t.id, customer.name, customer.customerId, customer.profileImage,
customer.subscriptionPlan,
CASE 
  WHEN t.date IS NOT NULL THEN 'Present' 
  ELSE 'Absent' 
END AS attendance,
d.date AS date,
t.checkIn,
t.checkOut
FROM customer 
LEFT JOIN (
SELECT ? + INTERVAL (a.a + (10 * b.a) + (100 * c.a)) DAY AS date
FROM (SELECT 0 AS a UNION ALL SELECT 1 UNION ALL SELECT 2 UNION ALL SELECT 3 UNION ALL SELECT 4 UNION ALL SELECT 5 UNION ALL SELECT 6 UNION ALL SELECT 7 UNION ALL SELECT 8 UNION ALL SELECT 9) AS a
CROSS JOIN (SELECT 0 AS a UNION ALL SELECT 1 UNION ALL SELECT 2 UNION ALL SELECT 3 UNION ALL SELECT 4 UNION ALL SELECT 5 UNION ALL SELECT 6 UNION ALL SELECT 7 UNION ALL SELECT 8 UNION ALL SELECT 9) AS b
CROSS JOIN (SELECT 0 AS a UNION ALL SELECT 1 UNION ALL SELECT 2 UNION ALL SELECT 3 UNION ALL SELECT 4 UNION ALL SELECT 5 UNION ALL SELECT 6 UNION ALL SELECT 7 UNION ALL SELECT 8 UNION ALL SELECT 9) AS c
WHERE ? + INTERVAL (a.a + (10 * b.a) + (100 * c.a)) DAY <= ?
) AS d ON 1=1
LEFT JOIN timesheet t ON customer.customerId = t.customerId AND t.date = d.date
WHERE (customer.customerId = IFNULL(?,customer.customerId) OR customer.customerId IS NULL)
ORDER BY d.date DESC`;
module.exports = {
  checkIn,
  isCheckInDate,
  getCustomerTimeSheet,
};
