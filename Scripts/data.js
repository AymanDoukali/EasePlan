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

export let todoList = loadTodoList();

export function saveTodoList() {
  localStorage.setItem("todoList", JSON.stringify(todoList));
}
export function resetTodoList() {
  localStorage.clear();
  render();
}
