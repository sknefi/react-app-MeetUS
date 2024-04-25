const dateObject = new Date("2024-04-18T12:30:00Z");

const year = dateObject.getFullYear();
const month = dateObject.getMonth() + 1; // Adjusting to get 1-based month
const day = dateObject.getDate();

console.log(`Year: ${year}, Month: ${month}, Day: ${day}`);