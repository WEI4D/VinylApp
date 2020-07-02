function timestampToDate(timestamp) {
    const currTime = new Date().getFullYear();
    const targetTime = new Date(timestamp);
    console.log(currTime,targetTime.getDate())
}
timestampToDate(1585140118000)
