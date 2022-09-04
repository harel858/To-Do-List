const todoInput = document.querySelector(".todo-input");
const todoButton = document.querySelector(".submit-button");
const todoList = document.querySelector(".todo-list");
const filterOption = document.querySelector(".filter-todo");
const dateInput = document.querySelector(`.date-input`);

//event listener
todoButton.addEventListener("click", () => {
  if (!todoInput.value || !dateInput.value)
    return alert("todo and deadline are required");
  addTodo();
});
todoList.addEventListener("click", deleteCheck);
filterOption.addEventListener("click", filterTodo);
window.addEventListener("load", getItemsFromLocal);

function getItemsFromLocal() {
  if (localStorage.getItem("todos") == null) return;
  let oldData = JSON.parse(localStorage.getItem("todos"));
  let { todos, deadlineDate } = oldData;
  if (todos.length < 0 || deadlineDate.length < 0) return;
  for (let i = 0; i < todos.length; i++) {
    addTodo(null, todos[i], deadlineDate[i]);
  }
}

function addTodo(_event, todoTask = todoInput.value, date = dateInput.value) {
  console.log(0);
  if (localStorage.getItem("todos")) {
    let oldData = JSON.parse(localStorage.getItem("todos"));
    let { todos, deadlineDate } = oldData;
    if (todos.includes(todoInput.value)) return alert("todo is exist");
  }

  if (!isNaN(parseInt(todoTask))) return alert("todo is invalid");

  //todo div//
  const todoDiv = document.createElement("div");
  todoDiv.classList.add("todo");

  //create li//
  const newTodo = document.createElement("li");
  newTodo.innerHTML = `<p>${todoTask}</p>`;
  newTodo.classList.add("todo-item");
  todoDiv.appendChild(newTodo);

  //check mark button
  const completedButton = document.createElement("button");
  completedButton.innerHTML = '<i class="fas fa-check-square"></i>';
  completedButton.classList.add("check-btn");
  todoDiv.appendChild(completedButton);
  //check trash button
  const trashButton = document.createElement("button");
  trashButton.innerHTML = '<i class="fas fa-trash"></i>';
  trashButton.classList.add("trash-btn");
  todoDiv.appendChild(trashButton);

  /* Edit button */
  const editButton = document.createElement("button");
  editButton.innerHTML = '<i class="fa-solid fa-pen-to-square"></i>';
  editButton.classList.add("edit-btn");
  todoDiv.appendChild(editButton);

  //Deadline

  const deadline = document.createElement("P");
  deadline.innerText = `${date}`;
  deadline.classList.add("deadline");
  todoDiv.appendChild(deadline);

  //APPEND TO LIST

  todoList.appendChild(todoDiv);

  if (
    localStorage.getItem("todos") == null &&
    todoInput.value &&
    dateInput.value
  ) {
    localStorage.setItem(
      "todos",
      JSON.stringify({
        todos: [todoTask],
        deadlineDate: [date],
      })
    );
  } else if (todoInput.value && dateInput.value) {
    let oldData = JSON.parse(localStorage.getItem("todos"));

    let { todos, deadlineDate } = oldData;

    todos = [...todos, todoInput.value];
    deadlineDate = [...deadlineDate, dateInput.value];
    let newData = { todos: todos, deadlineDate: deadlineDate };

    localStorage.setItem("todos", JSON.stringify(newData));
  }

  //clear todo input
  todoInput.value = "";
}

function deleteCheck(e) {
  const item = e.target;
  //delete Todo
  if (item.classList[0] == "trash-btn") {
    const todo = item.parentElement;
    let oldData = JSON.parse(localStorage.getItem("todos"));
    let { todos, deadlineDate } = oldData;
    const li = todo.childNodes[0];
    const deadline = todo.childNodes[4];
    todos = todos.filter((todo) => todo != li.innerText);
    console.log(todo.childNodes[4]);
    deadlineDate = deadlineDate.filter((date) => date != deadline.innerText);
    const newData = { todos: [...todos], deadlineDate: [...deadlineDate] };
    console.log(newData);
    localStorage.setItem("todos", JSON.stringify(newData));

    //Animation
    todo.classList.add("fall");
    //remove item
    todo.addEventListener("transitionend", () => todo.remove());
  }
  if (item.classList[0] == "check-btn") {
    const todo = item.parentElement;
    todo.classList.toggle("completed");
  }
  if (item.classList[0] == "edit-btn") {
    let todo = item.parentElement;
    todo.innerHTML = `<input class="todo edit-input"/>`;
    const completedButton = document.createElement("button");
    completedButton.innerHTML = '<i class="fas fa-check-square"></i>';
    completedButton.classList.add("edit-check");
    todo.appendChild(completedButton);
    completedButton.addEventListener("click", () => {
      let input = document.querySelector(".edit-input");
      let todos = todoList.childNodes;

      if (!input.value || !isNaN(+input.value)) {
        alert("invalid input");
        return;
      }
      let existingValue;
      todos.forEach((todo) => {
        let item = todo.childNodes;
        item.forEach((element) => {
          if (element.innerText == input.value) {
            existingValue = element.innerText;
            alert("Todo is exist");
          }
        });
      });

      if (input.value != existingValue && input.value != "")
        todo.innerHTML = `
      <li class="todo-item">${input.value}</li>
      <button class="check-btn"><i class="fas fa-check-square"></i></button>
      <button class="trash-btn"><i class="fas fa-trash"></i></button>
      <button class="edit-btn"><i class="fa-solid fa-pen-to-square"></i></button>
      `;
    });
  }
}
function filterTodo(e) {
  const todos = todoList.childNodes;
  todos.forEach((todo) => {
    switch (e.target.value) {
      case "all":
        todo.style.display = "flex";
        break;
      case "completed":
        if (todo.classList.contains("completed")) {
          todo.style.display = "flex";
        } else todo.style.display = "none";
        break;
      case "uncompleted":
        if (!todo.classList.contains("completed")) {
          todo.style.display = "flex";
        } else todo.style.display = "none";
    }
  });
}

/*  */
/*   */
