export default function time() {
  const date = new Date();
  let hours = date.getHours();
  let minutes = date.getMinutes();

  // Check whether AM or PM
  const newformat = hours >= 12 ? "PM" : "AM";

  // Find current hour in AM-PM Format
  hours = hours % 12;

  // To display "0" as "12"
  hours = hours ? hours : 12;
  minutes = minutes < 10 ? "0" + minutes : minutes;

  return hours + ":" + minutes + " " + newformat;
}
