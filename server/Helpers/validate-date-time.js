function validateDateTime(datetTime) {
    const date = new Date(dateTime);
    return date instanceof Date && !isNaN(date);
  }
  
  module.exports = validateDateTime
  