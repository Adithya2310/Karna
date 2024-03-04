// If you give march5th it will end on march 5th 0:00:00 soo on march 4th 23:59:59
function secondsLeft(date:Date) {
    let currentDate = new Date();
    let endDate = new Date(date);
    endDate.setHours(23, 59, 59, 999);
    let difference = endDate.getTime() - currentDate.getTime();
    return Math.ceil(difference / 1000);
}