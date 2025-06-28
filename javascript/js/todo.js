const inputBtn = document.getElementById("input-btn");
const todoArea = document.getElementById("todo-area");
const todoCountDisplay = document.getElementById("todo-countArea");

const createButton = (text, onClick) => {
  const button = document.createElement("button");
  button.innerText = text;
  button.addEventListener("click", onClick);
  return button;
};

const createCheckbox = () => {
  const checkbox = document.createElement("input");
  checkbox.type = "checkbox";
  checkbox.addEventListener("click", updateCount);
  return checkbox;
};

const onClickAdd = () => {
  const input = document.getElementById("input-text");
  const inputText = input.value.trim();
  if (!inputText) return;

  input.value = "";

  const todoItem = document.createElement("div");

  const p = document.createElement("p");
  p.innerText = inputText;

  const checkbox = createCheckbox();
  const editButton = createButton("編集", onClickEditTodo);
  const deleteButton = createButton("削除", onClickDeleteTodo);

  todoItem.append(p, checkbox, editButton, deleteButton);
  todoArea.appendChild(todoItem);

  updateCount();
};

const onClickDeleteTodo = (event) => {
  const item = event.target.closest("div");

  if (window.confirm("本当に削除してもよろしいですか？")) {
    item.remove();
  }
  updateCount();
};
const onClickEditTodo = (event) => {
  const item = event.target.closest("div");
  if (!item) return;

  const p = item.querySelector("p");
  const currentText = p.innerText;

  const input = document.createElement("input");
  input.type = "text";
  input.value = currentText;

  item.innerHTML = "";

  const checkbox = createCheckbox();
  const saveButton = createButton("保存", onClickStoreTodo);
  item.append(input, checkbox, saveButton);
};

const onClickStoreTodo = (event) => {
  const item = event.target.closest("div");
  if (!item) return;

  const input = item.querySelector("input[type='text']");
  const inputText = input.value.trim();
  if (!inputText) return;

  item.innerHTML = "";

  const p = document.createElement("p");
  p.innerText = inputText;

  const checkbox = createCheckbox();
  const editButton = createButton("編集", onClickEditTodo);
  const deleteButton = createButton("削除", onClickDeleteTodo);

  item.append(p, checkbox, editButton, deleteButton);
  updateCount();
};
const updateCount = () => {
  const totalTodos = todoArea.childElementCount;
  const completedTodos = todoArea.querySelectorAll(
    'input[type="checkbox"]:checked'
  ).length;
  const inCompleteTodos = totalTodos - completedTodos;
  todoCountDisplay.innerText = `全てのタスク:${totalTodos} / 完了済み: ${completedTodos}/ 未完了: ${inCompleteTodos}`;
};

inputBtn.addEventListener("click", onClickAdd);
