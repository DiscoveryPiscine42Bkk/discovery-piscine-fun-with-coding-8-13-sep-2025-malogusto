$(function() {
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

  function saveTodos() {
    const todos = [];
    $("#ft_list div").each(function() {
      todos.push($(this).text());
    });
    setCookie("todos", JSON.stringify(todos));
  }

  function addTodo(text, save=true) {
    const div = $("<div>").text(text);
    div.click(function() {
      if (confirm(`Remove this TO DO?\n\n${text}`)) {
        $(this).remove();
        saveTodos();
      }
    });
    $("#ft_list").append(div);
    if (save) saveTodos();
  }

  function loadTodos() {
    const saved = getCookie("todos");
    if (saved) {
      try {
        const todos = JSON.parse(saved);
        todos.forEach(todo => addTodo(todo, false));
      } catch(e) {
        console.error("Error parsing cookie", e);
      }
    }
  }

  $("#newBtn").click(function() {
    const text = prompt("Enter a new TO DO:");
    if (text && text.trim() !== "") {
      addTodo(text.trim());
    }
  });

  loadTodos();
});
