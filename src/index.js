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
  if(event.target !== event.currentTarget) {
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
  if(event.target !== event.currentTarget) {
    dom = event.currentTarget;
  }
  while (dom.firstChild) {
    dom.removeChild(dom.firstChild);
  }
  dom.addEventListener('click',expandSection)
  dom.removeEventListener('click',shrinkSection);
  dom.appendChild(createDOMElement('p', tasks[value].title, value));
  dom.appendChild(createDOMElement('p', tasks[value].dueDate, value));
  dom.className = "expand";
}

const addTaskButton = document.querySelector('.add-task-button');
addTaskButton.addEventListener('click', addTask);

function addTask() {
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
}

let tasks = [];
let testTask = new Task('Create a todo app', 'make a delete button', '01-01-2025', 'high');
testTask.id = tasks.length;
tasks.push(testTask);
createTaskDOM(testTask); 
