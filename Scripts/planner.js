const todoListDefault = [
  {
    task: "task1",
    day: "monday",
    checked: false,
  },
  {
    task: "task2",
    day: "tuesday",
    checked: false,
  },
  {
    task: "task3",
    day: "wednesday",
    checked: true,
  },
];
const daysDefault = [
  "monday",
  "tuesday",
  "wednesday",
  "thursday",
  "friday",
  "saturday",
  "sunday",
  "box",
];
const addTaskBox = [];
let days = [];
let todoList = [];

render();

function render() {
  /*Load days Array*/
  if (days.length === 0) loadDays();

  /*Getting data from localStorage*/
  const savedTodoList = localStorage.getItem("todoList");
  savedTodoList
    ? (todoList = JSON.parse(savedTodoList))
    : (todoList = todoListDefault);

  /*Render*/
  updateDaysNames();

  for (let j = 0; j < days.length; j++) {
    const sepTodo = `
      <div class="section-todo">
        To do :
        <hr class="sep" />
      </div>
    `;
    const sepDone = `
    <div class="section-done">
      Done :
      <hr class="sep" />
    </div>
    `;
    let todoTasksHTML = "";
    let doneTasksHTML = "";
    let todoListHTML = "";

    for (let i = 0; i < todoList.length; i++) {
      const todoObject = todoList[i];
      const { task, day, checked } = todoObject;
      if (day === days[j]) {
        /*const html = `
      <div class="task-div js-task-${i}-div">
        <input
          type="checkbox"
          class="checkbox"
        />
        <p>${task}</p>
        <button class="delete-button js-delete-${i}-button">&#10006;</button>
        <button class="migrate-button js-migrate-${i}-button">
          <img class="migrate-img-button" src="./icons/forward.png" />
        </button>
      </div>
    `;*/
        if (checked) {
          const html = `
            <div class="task-div js-task-${i}-div">
              <input
                type="checkbox" checked
                class="checkbox js-checkbox-${i}"
              />
              <p>${task}</p>
              <button class="delete-button js-delete-${i}-button">&#10006;</button>
            </div>
          `;
          doneTasksHTML += html;
        } else {
          const html = `
            <div class="task-div js-task-${i}-div">
              <input
                type="checkbox"
                class="checkbox js-checkbox-${i}"
              />
              <p>${task}</p>
              <button class="delete-button js-delete-${i}-button">&#10006;</button>
              <button class="migrate-button js-migrate-${i}-button">
                <img class="migrate-img-button" src="./icons/forward.png" />
              </button>
            </div>`;
          todoTasksHTML += html;
        }
        /*todoListHTML += html;*/
      }
    }
    const addButtonSectionHTML = addButtonHTML(todoListHTML, days[j]);

    todoListHTML =
      sepTodo + todoTasksHTML + addButtonSectionHTML + sepDone + doneTasksHTML;
    document.querySelector(`.tasks-${days[j]}-div`).innerHTML = todoListHTML;
  }

  /*Event Listeners to addTask*/

  /*Add Button Click events*/
  for (let i = 0; i < days.length; i++) {
    const day = days[i];
    const addButton = document.querySelector(`.add-${day}-button-js`);

    addButton.addEventListener("click", () => {
      const input = document.querySelector(`.task-${day}-input-js`);
      const task = input.value;
      input.value = "";

      task !== "" && addTask(task, day);
    });
  }
  /*Add Enter press events*/
  addEventListener("keydown", (e) => {
    e.stopImmediatePropagation();
    if (e.key === "Enter") {
      const activeElement = document.activeElement;
      const activeElementClassName = activeElement.classList[1];

      for (let i = 0; i < days.length; i++) {
        const day = days[i];
        if (activeElementClassName === `task-${day}-input-js`) {
          const input = document.querySelector(`.task-${day}-input-js`);
          const task = input.value;
          input.value = "";

          task !== "" && addTask(task, day);
        }
      }
    }
  });

  /**Delete Buttons events listeners*/
  for (let i = 0; i < todoList.length; i++) {
    const deleteButton = document.querySelector(`.js-delete-${i}-button`);
    deleteButton.addEventListener("click", () => deleteTask(i));
  }

  /***Migrate Buttons events listeners*/
  for (let i = 0; i < todoList.length; i++) {
    if (!todoList[i].checked) {
      const migrateButton = document.querySelector(`.js-migrate-${i}-button`);
      migrateButton.addEventListener("click", () => migrateTask(i));
    }
  }

  /****Check and uncheck events listeners*/
  for (let i = 0; i < todoList.length; i++) {
    const checkbox = document.querySelector(`.js-checkbox-${i}`);
    checkbox.addEventListener("change", function () {
      if (this.checked) {
        todoList[i].checked = true;
      } else {
        todoList[i].checked = false;
      }
      saveTodoList();
      render();
    });
  }
  console.log("rendering complete");
}
function addButtonHTML(oldHTML, day) {
  return (
    oldHTML +
    `
    <div class="task-add-div">
      <input
        class="task-input task-${day}-input-js"
        type="text"
        placeholder="Enter a new task"
      />
      <button class="add-button add-${day}-button-js">Add task</button>
    </div> 
  `
  );
}
function saveTodoList() {
  localStorage.setItem("todoList", JSON.stringify(todoList));
}
function resetData() {
  localStorage.clear();
  render();
}

function addTask(task, day) {
  todoList.push({
    task,
    day,
    checked: false,
  });
  saveTodoList();
  render();
}
function deleteTask(id) {
  todoList.splice(id, 1);
  saveTodoList();
  render();
}
function nextDay(day) {
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
function migrateTask(id) {
  const task = todoList[id].task;
  const oldDay = todoList[id].day;
  const newDay = nextDay(oldDay);
  addTask(task, newDay);
  deleteTask(id);
}

function loadDays() {
  const today = dayjs();
  for (let i = 0; i < 7; i++) {
    const day = today.add(i, "d");
    const dayName = day.format("dddd").toLowerCase();
    days.push(dayName);
  }
  days.push("box");
}

function updateDaysNames() {
  /*header*/
  const headerTodayElement = document.querySelector(".header-today");
  headerTodayElement.innerHTML = dayjs().format("dddd, DD-MM-YYYY");
  /*day divs */
  for (let i = 0; i < 7; i++) {
    const dayNameDiv = document.querySelector(`.js-day-${i}`);
    dayNameDiv.innerHTML = days[i];
  }
}
