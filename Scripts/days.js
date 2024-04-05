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

export function sortTodoList(todoList) {
  /*const t1 = dayjs("2000-01-01T" + todoList[7].time);
  const t2 = dayjs("2000-01-01T" + todoList[11].time);
  const t = dayjs("2000-01-01T" + undefined);
  console.log(t);
  /*console.log(todoList[7].time);
  console.log(t1);
  console.log(todoList[11].time);
  console.log(t2);
  console.log(t1.isAfter(t2));

  /*const today = dayjs("12-25-1995", "MM-DD-YYYY");

  console.log(today);

  const now = dayjs("10:00:00", "HH:mm:ss");

  console.log(now);
  const now2 = dayjs("");

  console.log(now2.isAfter(t1));
*/
  todoList.sort((task1, task2) => {
    if (!task1.time && !task2.time) {
      return 0;
    } else if (task1.time && task2.time) {
      const task1Time = dayjs("2000-01-01T" + task1.time);
      const task2Time = dayjs("2000-01-01T" + task2.time);
      if (task1Time.isAfter(task2Time)) {
        return 1;
      } else if (task1Time.isSame(task2Time)) {
        return 0;
      } else {
        return -1;
      }
    } else if (!task1.time) return 1;
    else return -1;
  });
  // return todoList;
}
