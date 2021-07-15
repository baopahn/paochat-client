const months = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Otc",
  "Nov",
  "Dec",
];

const remains = [
  { time: 60 * 1000, label: "min" },
  { time: 60 * 60 * 1000, label: "hour" },
  { time: 24 * 60 * 60 * 1000, label: "day" },
  { time: 7 * 24 * 60 * 60 * 1000, label: "week" },
  { time: 4 * 7 * 24 * 60 * 60 * 1000, label: "month" },
];

export const displayHour = (t: string): string => {
  if (!t) return "";

  const time = new Date(t);
  const current = new Date();

  const remainTime = current.getTime() - time.getTime();
  const remainTimes = remains.map(({ time, label }) => {
    const r = Math.floor(remainTime / time);
    return [r, `${label}${r > 1 ? "s" : ""}`];
  });

  return remainTimes.reduce(
    (timeRemain, curr) => (curr[0] > 0 ? curr.join(" ") : timeRemain),
    "now"
  );
};

export const displayTime = (t: string): string => {
  if (!t) return "";
  const time = new Date(t);
  const date = time.getDate();
  const month = time.getMonth();
  const year = time.getFullYear();
  const fullDate = date > 9 ? date : `0${date}`;

  return `${months[month]} ${fullDate}, ${year}`;
};
