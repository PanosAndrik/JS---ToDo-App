document.addEventListener('DOMContentLoaded', function () {
  document.getElementById('addTask').addEventListener('click', addTodo);
  document.getElementById('removeLastTask').addEventListener('click', removeLastTask);
  document.getElementById('removeCompletedTasks').addEventListener('click', removeCompletedTasks);
});

let todoItems = [];

class CreateTodo {
  constructor(taskText) {
      this.taskText = taskText;
      this.checked = false;
      this.id = Date.now();
  }
}

function addTodo() {
  const input = document.getElementById("inputTask");
  const taskText = input.value.trim();
  if (taskText === "") {
      alert("Please enter a task!");
      return;
  }
  const newTodo = new CreateTodo(taskText);
  todoItems.push(newTodo);
  renderTodoList();
  input.value = '';
  input.focus();
}

function renderTodoList() {
  const list = document.getElementById('todo-list');
  list.innerHTML = '';
  todoItems.forEach(todo => {
      const listItem = document.createElement('li');
      listItem.textContent = todo.taskText;
      listItem.className = todo.checked ? 'completed' : '';
      
      const checkbox = document.createElement('input');
      checkbox.type = 'checkbox';
      checkbox.checked = todo.checked;
      checkbox.addEventListener('change', () => {
          todo.checked = checkbox.checked;
          listItem.className = todo.checked ? 'completed' : '';
      });
      
      const deleteButton = document.createElement('span');
      deleteButton.textContent = '×';
      deleteButton.className = 'delete-task';
      deleteButton.addEventListener('click', () => {
          todoItems = todoItems.filter(item => item.id !== todo.id);
          renderTodoList();
      });

      const editButton = document.createElement('span');
      editButton.textContent = '✎';
      editButton.className = 'edit-task';
      editButton.addEventListener('click', () => {
          const newTaskText = prompt('Edit task', todo.taskText);
          if (newTaskText) {
              todo.taskText = newTaskText;
              renderTodoList();
          }
      });

      listItem.appendChild(checkbox);
      listItem.appendChild(deleteButton);
      listItem.appendChild(editButton);
      list.appendChild(listItem);
  });
}

function removeLastTask() {
  if (todoItems.length > 0 && confirm("Are you sure you want to remove the last task?")) {
      todoItems.pop();
      renderTodoList();
  }
}

function removeCompletedTasks() {
  todoItems = todoItems.filter(item => !item.checked);
  renderTodoList();
}
