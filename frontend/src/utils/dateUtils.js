// substring "2020-11-03T01:02:02.795Z" => "2020-11-03"
export const dateToISO = (date) => date.toISOString().substring(0, 10);

/**
 * Compares 2 dates.
 *
 * @param {number} date1
 * @param {number} date2
 * @return {bool}
 *
 */
export const compareDates = (date1, date2) => {
  const selectedDate = new Date(date1);
  const responseDate = new Date(date2);
  return (
    selectedDate.getDate() === responseDate.getDate() &&
    selectedDate.getMonth() === responseDate.getMonth() &&
    selectedDate.getFullYear() === responseDate.getFullYear()
  );
};
/**
 * Converts string date from date picker into a Date Object
 *
 * @param {String} date
 * @return {Date}
 *
 */
export const convertDateFromPicker = (date) => {
  date.replaceAll("-", "/");
  const newDate = new Date(date);
  newDate.setDate(newDate.getDate() + 1);
  return newDate;
};
