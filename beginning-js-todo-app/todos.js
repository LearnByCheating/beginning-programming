/* eslint-disable prefer-destructuring, no-shadow, object-curly-newline, object-shorthand */
const addBtn = document.getElementById('add-btn');
const addForm = document.getElementById('add-form');
const task = document.getElementById('task');
const details = document.getElementById('details');
const submitBtn = document.getElementById('submit-btn');
const cancelBtn = document.getElementById('cancel-btn');
const list = document.getElementById('list');

// Section 1: Seed the List
// Create list item.
const createLi = (todo) => {
  let doneClass = '';
  if (todo.done === true) {
    doneClass = ' text-decoration-line-through';
  }
  const listItem = `<strong id="task-${todo.id}" class="task-elem${doneClass}" style="cursor: pointer;">${todo.task}</strong>
    <i class="remove-icon bi bi-x-circle-fill text-danger float-end" role="button"></i>
    <i class="edit-icon bi bi-pencil-square float-end mx-1 text-dark" role="button"></i>
    <i class="details-icon bi bi-info-circle-fill text-dark float-end ms-2" role="button"></i>
    <p id="details-${todo.id}" class="mb-0 d-none">${todo.details}</p>`;
  return listItem;
};

let id;
// Seed todos and display
const seedTodos = () => {
  const todos = [
    {
      id: 1, task: 'Create To Do list using an object literal', details: 'After completing the Beginning JavaScript tutorial do the To Do list project. Refer to the tutorial for reference.', done: false,
    },
    {
      id: 2, task: 'Create To Do list using a Class', details: 'After completing the To Do list project, modify the JavaScript file to use a Todo Class instead of an object literal.', done: false,
    },
    {
      id: 3, task: 'Final To Do list project', details: 'After finishing the full JavaScript tutorial series, complete the To Do list final version.', done: false,
    },
  ];

  // Populate list with to do items.
  let listItems = '';
  todos.forEach((todo) => {
    listItems += `<li id="${todo.id}" class="list-group-item">${createLi(todo)}</li>`;
  });
  list.innerHTML = listItems;
  id = todos.length;
};
seedTodos();

// Section 2: Form for adding new To Do items.
// Display form to add a to do item.
addBtn.addEventListener('click', () => {
  addForm.classList.remove('d-none');
});

// Hide form when cancel button is clicked.
cancelBtn.addEventListener('click', () => {
  task.value = '';
  details.value = '';
  addForm.classList.add('d-none');
});

// Handle Add Todo form submission.
submitBtn.addEventListener('click', (event) => {
  event.preventDefault();
  id += 1;
  const newTodo = { id: id, task: task.value, details: details.value, done: false };
  const newLi = `<li id="${newTodo.id}" class="list-group-item">${createLi(newTodo)}</li>`;
  list.innerHTML += newLi;
  task.value = '';
  details.value = '';
  addForm.classList.add('d-none');
});

// Section 3: Edit or remove To Do items.
let todo;

// Create the edit form.
const createEdit = (todo) => {
  const editForm = `<div class="form-floating mb-2">
    <input type="text" id="task-${todo.id}" class="form-control mb-2" value="${todo.task}">
    <label for="task">Task:</label>
  </div>
  <div class="form-floating mb-2">
    <textarea id="details-${todo.id}" class="form-control" style="height: 80px">${todo.details}</textarea>
    <label for="details">Details:</label>
  </div>
  <button class="edit-submit-btn btn btn-sm btn-outline-light col-md-2">Save Edit</button>
  <button class="edit-cancel-btn btn btn-sm btn-outline-light col-md-2 float-end">Cancel</button>`;
  return editForm;
};

// Handle clicks on todo items.
list.addEventListener('click', (event) => {
  const li = event.target.parentElement;
  const id = li.id;

  // Handle Done
  if (event.target.classList.contains('task-elem')) {
    event.target.classList.toggle('text-decoration-line-through');

  // Handle toggle details
  } else if (event.target.classList.contains('details-icon')) {
    const details = document.getElementById(`details-${id}`);
    details.classList.toggle('d-none');

  // Handle Edit
  } else if (event.target.classList.contains('edit-icon')) {
    let task = document.getElementById(`task-${id}`);
    task = task.textContent;
    let details = document.getElementById(`details-${id}`);
    details = details.textContent;
    let done = document.getElementById(`task-${id}`);
    done = done.classList.contains('text-decoration-line-through');
    todo = { id, task, details, done };
    li.innerHTML = createEdit(todo);
    li.classList.add('bg-secondary');

  // Handle submit edit form.
  } else if (event.target.classList.contains('edit-submit-btn')) {
    todo.task = document.getElementById(`task-${id}`).value;
    todo.details = document.getElementById(`details-${id}`).value;
    li.innerHTML = createLi(todo);
    li.classList.remove('bg-secondary');
    todo = {};

  // Handle cancel edit
  } else if (event.target.classList.contains('edit-cancel-btn')) {
    li.classList.remove('bg-secondary');
    li.innerHTML = createLi(todo);
    todo = {};

  // Handle remove todo
  } else if (event.target.classList.contains('remove-icon')) {
    li.remove();
  }
});
