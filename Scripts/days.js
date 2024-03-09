function loadDays() {
  /* returns the days array and updates dates on the page*/
  let days = [];
  const today = dayjs();

  for (let i = 0; i < 7; i++) {
    const day = today.add(i, "d");
    const dayName = day.format("dddd").toLowerCase();
    days.push(dayName);
  }
  days.push("box");
  return days;
}

export function updateDatesOnPage() {
  const today = dayjs();

  const headerTodayElement = document.querySelector(".header-today");
  headerTodayElement.innerHTML = today.format("dddd, DD-MM-YYYY");

  for (let i = 0; i < 7; i++) {
    const day = today.add(i, "d");
    const dayNameDiv = document.querySelector(`.js-day-${i}`);
    dayNameDiv.innerHTML = day.format(`DD/MM • dddd `);
  }
}

export const days = loadDays();

export function nextDay(day) {
  for (let i = 0; i < days.length; i++) {
    if (days[i] === day) {
      if (i < days.length - 1) {
        return days[i + 1];
      } else {
        return days[0];
      }
    }
  }
}
