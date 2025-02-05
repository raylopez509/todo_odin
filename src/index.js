import './index.css';

class Task {
  constructor(title, description, dueDate, priority) {
    this.title = title;
    this.description = description;
    this.dueDate = dueDate;
    this.priority = priority;
    this.id = undefined;
  }
}

function createTaskDOM(task) {
  let taskSection = document.createElement('section');
  let taskContainer = document.querySelector('.task-container');
  taskSection.className = 'expand';
  taskSection.value = task.id;
  taskSection.appendChild(createDOMElement('p', task.title, task.id));
  taskSection.appendChild(createDOMElement('p', task.dueDate, task.id));
  taskContainer.appendChild(taskSection);
  taskSection.addEventListener('click', expandSection);
  const deleteButton = document.createElement('button');
  deleteButton.textContent = "Done";
  taskSection.appendChild(deleteButton);
}

function createDOMElement(tag, text, id) {
  let element = document.createElement(tag);
  element.textContent = text;
  element.value = id;
  return element;
}

const expandSection = (event) => {
  console.log("i got clicked");
  let dom = event.target;
  let value = dom.value;
  if(event.target.localName == "button") {
    return;
  }
  else if(event.target !== event.currentTarget) {
    dom = event.currentTarget;
  }
  while (dom.firstChild) {
    dom.removeChild(dom.firstChild);
  }
  dom.addEventListener('click',shrinkSection)
  dom.removeEventListener('click',expandSection);
  dom.appendChild(createDOMElement('p', tasks[value].title, value));
  dom.appendChild(createDOMElement('p', tasks[value].description, value));
  dom.appendChild(createDOMElement('p', tasks[value].dueDate, value));
  dom.appendChild(createDOMElement('p', tasks[value].priority, value));
  const editButton = document.createElement('button');
  editButton.textContent = "Edit";
  dom.appendChild(editButton);
  const deleteButton = document.createElement('button');
  deleteButton.textContent = "Delete";
  dom.appendChild(deleteButton);
  dom.className = '';

};

const shrinkSection = (event) =>{
  let dom = event.target;
  let value = dom.value;
  if(event.target.localName == "button") {
    return;
  }
  else if(event.target !== event.currentTarget) {
    dom = event.currentTarget;
  }
  while (dom.firstChild) {
    dom.removeChild(dom.firstChild);
  }
  dom.addEventListener('click',expandSection)
  dom.removeEventListener('click',shrinkSection);
  dom.appendChild(createDOMElement('p', tasks[value].title, value));
  dom.appendChild(createDOMElement('p', tasks[value].dueDate, value));
  const markCompleteButton = document.createElement('button');
  markCompleteButton.textContent = "Done";
  dom.appendChild(markCompleteButton);
  dom.className = "expand";
}

const addTaskDialog = document.querySelector("#add-task-dialog");

const addTaskButton = document.querySelector('.add-task-button');
addTaskButton.addEventListener('click', () => {
  addTaskDialog.showModal();
});

const cancelButton = document.querySelector('#cancel');
cancelButton.addEventListener('click', (event) => {
  event.preventDefault();
  addTaskDialog.close();
});

const addTask = (event) => {
  event.preventDefault();
  let title = document.querySelector('#title').value;
  let description = document.querySelector('#description').value;
  let dueDate = document.querySelector('#dueDate').value;
  let priority = document.querySelector('#priority').value;
  let task = new Task(title, description, dueDate, priority);
  task.id = tasks.length;
  tasks.push(task);
  createTaskDOM(task); 

  document.querySelector('#title').value = "";
  document.querySelector('#description').value = "";
  document.querySelector('#dueDate').value = "";

  addTaskDialog.close();
}



const addTaskForm = document.querySelector('#add-task-form');
addTaskForm.addEventListener('submit', addTask);

let tasks = [];
let testTask = new Task('Create a todo app', 'make a delete button', '01-01-2025', 'high');
testTask.id = tasks.length;
tasks.push(testTask);
createTaskDOM(testTask); 
