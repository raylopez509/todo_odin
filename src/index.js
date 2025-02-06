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

const tasks = [];

const TaskController = (() => {
  // class Task {
  //   constructor(title, description, dueDate, priority) {
  //     this.title = title;
  //     this.description = description;
  //     this.dueDate = dueDate;
  //     this.priority = priority;
  //     this.id = undefined;
  //   }
  // }

  // const tasks = [];
  
  function addTask(task) {
    task.id = task.length;
    tasks.add(task);
  }
  
  function deleteTask(task) {
    let index = task.id;
    tasks.splice(index, 1);
  }

  function updateTask(task, index) {
    tasks[index] = task;
  }

  return {
    addTask,
    deleteTask,
    updateTask
  }
})();

const DOMController = (() => {
  function createDOMElement(tag, text, id) {
    const element = document.createElement(tag);
    element.textContent = text;
    if(id) {
      element.value = id;
    }
    return element;
  }

  function createTaskDOM(task) {
    const taskSection = createTaskSection(task.id);
    createChildrenDOMsShrink(taskSection, task)
    const taskContainer = document.querySelector('.task-container');
    taskContainer.appendChild(taskSection);
  }

  function createTaskSection(value) {
    const taskSection = document.createElement('section');
    taskSection.className = 'expand';
    taskSection.value = value;
    taskSection.addEventListener('click', expandSection);
    return taskSection;
  }

  function createChildrenDOMsShrink(element, task) {
    element.appendChild(createDOMElement('p', task.title, task.id));
    element.appendChild(createDOMElement('p', task.dueDate, task.id));
    const deleteButton = document.createElement('button');
    deleteButton.textContent = "Done";
    element.appendChild(deleteButton);  
  }

  return {
    createDOMElement
  }
})();

function createTaskDOM(task) {
  // let taskSection = document.createElement('section');
  // let taskContainer = document.querySelector('.task-container');
  // taskSection.className = 'expand';
  // taskSection.value = task.id;
  taskSection.appendChild(createDOMElement('p', task.title, task.id));
  taskSection.appendChild(createDOMElement('p', task.dueDate, task.id));
  taskContainer.appendChild(taskSection);
  // taskSection.addEventListener('click', expandSection);
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

let testTask = new Task('Create a todo app', 'make a delete button', '01-01-2025', 'high');
console.log(tasks);
testTask.id = tasks.length;
tasks.push(testTask);
createTaskDOM(testTask); 
