const fetchToDos = async () => {
  const response = await fetch("https://dummyjson.com/todos?limit=20&skip=0");
  const todo = await response.json();
  console.log(todo);
  return todo;
};

const rootElement = document.getElementById("root");

const appendToDo = async () => {
  const { limit, skip, todos } = await fetchToDos();
  const container = document.createDocumentFragment();
  todos.forEach((todo) => {
    const div = document.createElement("div");
    div.innerText = todo.todo;
    container.appendChild(div);
  });

  rootElement.appendChild(container);
};

appendToDo();
