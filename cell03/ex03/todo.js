const ftList = document.getElementById("ft_list");
const newBtn = document.getElementById("newBtn");

function getCookie(name) {
  const value = "; " + document.cookie;
  const parts = value.split("; " + name + "=");
  if (parts.length === 2) return decodeURIComponent(parts.pop().split(";").shift());
  return null;
}

function setCookie(name, value) {
  const d = new Date();
  d.setTime(d.getTime() + (7*24*60*60*1000));
  document.cookie = `${name}=${encodeURIComponent(value)};expires=${d.toUTCString()};path=/`;
}

function loadTodos() {
  const saved = getCookie("todos");
  if (saved) {
    try {
      const todos = JSON.parse(saved);
      todos.forEach(todo => addTodo(todo, false));
    } catch (e) {
      console.error("Error parsing cookie", e);
    }
  }
}

function saveTodos() {
  const todos = [];
  ftList.querySelectorAll("div").forEach(div => {
    todos.push(div.textContent);
  });
  setCookie("todos", JSON.stringify(todos));
}

function addTodo(text, save = true) {
  const div = document.createElement("div");
  div.textContent = text;

  div.addEventListener("click", () => {
    if (confirm(`Remove this TO DO?\n\n${text}`)) {
      div.remove();
      saveTodos();
    }
  });

  ftList.appendChild(div);
  if (save) saveTodos();
}

newBtn.addEventListener("click", () => {
  const text = prompt("Enter a new TO DO:");
  if (text && text.trim() !== "") {
    addTodo(text.trim());
  }
});

loadTodos();
