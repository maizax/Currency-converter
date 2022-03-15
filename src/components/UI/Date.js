export default function formatDate() {
  var today = new Date();
  var month = "" + (today.getMonth() + 1),
    day = "" + today.getDate(),
    year = today.getFullYear(),
    hours = "" + today.getHours(),
    minutes = "" + today.getMinutes(),
    seconds = "" + today.getSeconds();

  if (month.length < 2) month = "0" + month;
  if (day.length < 2) day = "0" + day;
  if (hours.length < 2) hours = "0" + hours;
  if (minutes.length < 2) minutes = "0" + minutes;
  if (seconds.length < 2) seconds = "0" + seconds;

  return (
    [year, month, day].join("-") + " " + [hours, minutes, seconds].join(":")
  );
}
formatDate(new Date());
