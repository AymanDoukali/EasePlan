import { render } from "./planner.js";
const todoListDefault = [
  {
    task: "task on Monday",
    day: "monday",
    checked: false,
  },
  {
    task: "task on Tuesday",
    day: "tuesday",
    checked: false,
  },
  {
    task: "task on wednesday",
    day: "wednesday",
    checked: true,
  },
];

function loadTodoList() {
  const savedTodoList = localStorage.getItem("todoList");
  let todoList = [];
  savedTodoList
    ? (todoList = JSON.parse(savedTodoList))
    : (todoList = todoListDefault); /*change before final deployment*/
  return todoList;
}

export function editTodoList(newTodoList) {
  todoList = newTodoList;
}

export function editTask(id, newTaskName) {
  todoList[id].task = newTaskName;
}

export let todoList = loadTodoList();

export function saveTodoList() {
  localStorage.setItem("todoList", JSON.stringify(todoList));
}

export function resetTodoList() {
  localStorage.clear();
  render();
}

export function exportTodoList() {
  // File content
  let content = JSON.stringify(todoList);

  // Create a Blob object from the content
  let blob = new Blob([content], { type: "text/plain" });

  // Create a link element
  let link = document.createElement("a");
  link.href = URL.createObjectURL(blob);

  // Set the file name
  link.download = "EasePlan" + ".txt";

  // Append the link to the body
  document.body.appendChild(link);

  // Trigger the click event on the link
  link.click();

  // Remove the link from the body
  document.body.removeChild(link);
}

export function importTodoList(upload) {
  try {
    let fr = new FileReader();
    fr.readAsText(upload.files[0]);
    fr.onload = function () {
      todoList = JSON.parse(fr.result);
      saveTodoList();
      upload.value = "";
      render();
    };
  } catch (error) {
    alert(error);
  }
}
