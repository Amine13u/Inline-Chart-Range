const db = require("../services/db");

function getMultiple(startDate = "2022-11-30", endDate = "2022-12-30") {
  const data = db.query(
    `SELECT scroll.date as date, ROUND(CAST(scrollSum AS float)/CAST(visitCount AS float), 1) AS average  from 
  (Select date(createdAt) AS date, SUM(EventValue) AS scrollSum
  FROM Events
  WHERE EventType=1
  GROUP BY date) scroll
  INNER JOIN 
  (SELECT date(createdAt) AS date , COUNT('date') AS visitCount FROM Records 
  Group BY date
  ) visit ON scroll.date = visit.date
  WHERE scroll.date between ? And ?`,
    [startDate, endDate]
  );
  const meta = { startDate, endDate };

  return {
    data,
    meta,
  };
}

module.exports = {
  getMultiple,
};
