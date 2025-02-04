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

// function enterTaskInformation() {
//   let title = prompt('Enter task title');
//   let description = prompt('Enter task description');
//   let dueDate = prompt('When is it due?');
//   let priority = prompt('what is the priority');
//   let task = new Task(title, description, dueDate, priority);
//   return task;
// }

// createTaskDOM(enterTaskInformation());

function createTaskDOM(task) {
  let taskSection = document.createElement('section');
  let taskContainer = document.querySelector('.task-container');
  taskSection.className = 'expand';
  taskSection.value = task.id;
  taskSection.appendChild(createDOMElement('p', task.title, task.id));
  // taskSection.appendChild(createDOMElement('p', task.description));
  taskSection.appendChild(createDOMElement('p', task.dueDate, task.id));
  // taskSection.appendChild(createDOMElement('p', task.priority));
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

let testTask = new Task('test1', 'test2', 'test3', 'test4');
let testTask2 = new Task('Open this task', 'Show this when you click on the task','2/28/2025','high');

const addTaskButton = document.querySelector('.add-task-button');
addTaskButton.addEventListener('click', () => createTaskDOM(testTask));

let tasks = [];

function addTask(task) {
  task.id = tasks.length;
  tasks.push(task);
  createTaskDOM(task);
}

addTask(testTask);
addTask(testTask2);

console.log(tasks);

const section = document.querySelector('.test');
section.addEventListener('click', (e) => {
  console.log(`.${e.currentTarget.className} > .hide`);
  let toggleDoms = document.querySelector(
    `.${e.currentTarget.className} > p.hide`
  );
  toggleDoms.style.display =
    toggleDoms.style.display === 'none' ? 'block' : 'none';
});