import {
  saveTodoList,
  todoList,
  exportTodoList,
  importTodoList,
  editTask,
} from "./data.js";
import { days, updateDatesOnPage } from "./days.js";
import { addTask, deleteTask, migrateTask } from "./tasks.js";

render();

export function render() {
  updateDatesOnPage();

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
              <p id="js-${i}-p" class="task-p">${task}</p>
              <input class="edit-input js-edit-${i}-input" value="${task}"/>
              <button class="delete-button js-delete-${i}-button">&#10006;</button>
              <button class="migrate-button js-migrate-${i}-button">
                <img class="migrate-img-button" src="./icons/forward.png" />
              </button>
            </div>`;
          todoTasksHTML += html;
        }
      }
    }
    const addButtonSectionHTML = addButtonHTML(todoListHTML, days[j]);

    todoListHTML =
      sepTodo + todoTasksHTML + addButtonSectionHTML + sepDone + doneTasksHTML;
    document.querySelector(`.tasks-${j}-div`).innerHTML = todoListHTML;
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
      if (task !== "") {
        addTask(task, day);
        render();
      }
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

          if (task !== "") {
            addTask(task, day);
            render();
          }
        }
      }
    }
  });

  /**Delete Buttons events listeners*/
  for (let i = 0; i < todoList.length; i++) {
    const deleteButton = document.querySelector(`.js-delete-${i}-button`);
    deleteButton.addEventListener("click", () => {
      deleteTask(i);
      render();
    });
  }

  /***Migrate Buttons events listeners*/
  for (let i = 0; i < todoList.length; i++) {
    if (!todoList[i].checked) {
      const migrateButton = document.querySelector(`.js-migrate-${i}-button`);
      migrateButton.addEventListener("click", () => {
        migrateTask(i);
        render();
      });
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

  /****Under testing */
  /* Edit task Names*/
  for (let i = 0; i < todoList.length; i++) {
    const taskP = document.querySelector(`#js-${i}-p`);
    const taskInput = document.getElementsByClassName(`js-edit-${i}-input`)[0];

    taskP.addEventListener("click", () => {
      taskInput.style.display = "inline";
      taskP.style.display = "none";
    });

    taskInput.addEventListener("keydown", (e) => {
      if (e.key === "Enter") {
        taskP.innerHTML = taskInput.value;
        taskP.style.display = "inline";
        taskInput.style.display = "none";
        editTask(i, taskInput.value);
        saveTodoList();
      }
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

const exportButton = document.querySelector(".export-button");
exportButton.addEventListener("click", () => exportTodoList());

let upload = document.getElementById("import-input");
upload.addEventListener("change", () => {
  importTodoList(upload);
});
