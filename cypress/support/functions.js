let tommorowDay = function () {
    let tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    const result = tomorrow.toISOString().split('T')[0];
    return `${result}`
}

let nextWeek = function () {
    let nextWeekDate = new Date();
    nextWeekDate.setDate(nextWeekDate.getDay() + 14);
    const result = nextWeekDate.toISOString().split('T')[0];
    return `${result}`
}
