
export const baseurl = `${process.env.REACT_APP_API_URL}`;
export const speakAPI = `${process.env.REACT_APP_TTS_API_URL}`;

export const resetPasswordAPI = `/users/reset-password`;
export const resetCoinOfWeek = getLastFridayOf().toISOString();

function getLastFridayOf() {
    var days = new Date()
    days.setHours(0, 0, 0, 0)
    var day = days.getDay();
    var diff = ((7 - 5 + day) % 7);
    days.setDate(days.getDate() - diff);
    return days;
}
export const checkTimeDialogs = (currentDate: Date, minute: number) => {
    return new Date().getTime() >= new Date(currentDate.getTime() + minute * 60000).getTime();
}