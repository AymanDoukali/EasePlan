import { todoList, saveTodoList } from "./data.js";
import { nextDay } from "./days.js";

export function addTask(task, day) {
  todoList.push({
    task,
    day,
    checked: false,
  });
  saveTodoList();
}

export function deleteTask(id) {
  todoList.splice(id, 1);
  saveTodoList();
}

export function migrateTask(id) {
  const task = todoList[id].task;
  const oldDay = todoList[id].day;
  const newDay = nextDay(oldDay);
  addTask(task, newDay);
  deleteTask(id);
}
