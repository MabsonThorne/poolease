function calculateBilling(startTime, endTime) {
    const startHour = new Date(startTime).getHours();
    const endHour = new Date(endTime).getHours();
    let totalCost = 0;
  
    for (let hour = startHour; hour <= endHour; hour++) {
      if (hour >= 8 && hour < 24) {
        totalCost += 18;
      } else {
        totalCost += 20;
      }
    }
  
    return totalCost;
  }
  
  module.exports = calculateBilling;
  