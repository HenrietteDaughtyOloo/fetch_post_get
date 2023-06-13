const todoContainer = document.getElementById('todos');
const filterDropdown = document.getElementById('filterDropdown');
const addTodoForm = document.getElementById('addTodoForm');
const userIdInput = document.getElementById('userIdInput');
const todoInput = document.getElementById('todoInput');
let todos = []; // Store the todos fetched from the API
// Fetch Todos
const getTodos = () => {
  return fetch('https://dummyjson.com/todos')
    .then(response => response.json())
    .then(response => {
      todos = response.todos;
      return todos;
    })
    .catch(error => error);
};
// Display Todos
const displayTodos = () => {
  todoContainer.innerHTML = ''; // Clear existing todos
  todos.forEach(item => {
    let div = document.createElement('div');
    let todo = document.createElement('h2');
    let completed = document.createElement('p');
    todo.innerHTML = item.todo;
    completed.innerHTML = `Completed: ${item.completed}`;
    div.appendChild(todo);
    div.appendChild(completed);
    div.setAttribute('key', item.id);
    div.setAttribute('class', 'todo');
    todoContainer.appendChild(div);
  });
};
// Filter Todos
const filterTodos = () => {
  const filterValue = filterDropdown.value;
  let filteredTodos = todos;
  if (filterValue === 'completed') {
    filteredTodos = todos.filter(item => item.completed);
  } else if (filterValue === 'incomplete') {
    filteredTodos = todos.filter(item => !item.completed);
  }
  todoContainer.innerHTML = ''; // Clear existing todos
  filteredTodos.forEach(item => {
    let div = document.createElement('div');
    let todo = document.createElement('h2');
    let completed = document.createElement('p');
    todo.innerHTML = item.todo;
    completed.innerHTML = `Completed: ${item.completed}`;
    div.appendChild(todo);
    div.appendChild(completed);
    div.setAttribute('key', item.id);
    div.setAttribute('class', 'todo');
    if (item.completed) {
      div.style.backgroundColor = 'green';
    } else {
      div.style.backgroundColor = 'yellow';
    }
    todoContainer.appendChild(div);
  });
};
// Add Todo
const addTodo = (userId, todo) => {
  const newTodo = {
    userId,
    todo,
    completed: false
  };
  // Send POST request to add new todo
  fetch('https://dummyjson.com/todos/add', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(newTodo)
  })
    .then(response => response.json())
    .then(response => {
      // Update todos array with the newly added todo from the API
      todos.push(response);
      // Refresh the displayed todos
      displayTodos();
    })
    .catch(error => {
      console.error('Error adding todo:', error);
    });
};
// Event listener for dropdown change
filterDropdown.addEventListener('change', filterTodos);
// Event listener for form submission
addTodoForm.addEventListener('submit', event => {
  event.preventDefault(); // Prevent form submission
  const userId = userIdInput.value;
  const todo = todoInput.value;
  if (userId && todo) {
    addTodo(userId, todo);
    // Clear input fields
    userIdInput.value = '';
    todoInput.value = '';
  }
});
// Fetch and display initial todos
getTodos().then(displayTodos);






