// it will end when the date starts
export function secondsLeft(date:Date|undefined) {
    // Get current date and time
    let currentDate = new Date();
    // Clone the input date to prevent modifying the original
    let endDate = new Date(date);
    // Set the time to the end of the day (23:59:59:999)
    endDate.setHours(23, 59, 59, 999);
    console.log("the end date is",endDate);
    console.log("the current date is",currentDate);
    
    // Calculate the difference in milliseconds between now and the end of the input date's day
    let difference = endDate.getTime() - currentDate.getTime();
    
    // Convert milliseconds to seconds and return
    return Math.ceil(difference / 1000); // Round up to the nearest second
}
