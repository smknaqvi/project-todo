// substring "2020-11-03T01:02:02.795Z" => "2020-11-03"
export const dateToISO = (date) => date.toISOString().substring(0, 10);
