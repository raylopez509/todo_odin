import './index.css';

console.log('hi');

class Task {
  constructor(title, description, dueDate, priority) {
    this.title = title;
    this.description = description;
    this.dueDate = dueDate;
    this.priority = priority;
  }
}

function enterTaskInformation() {
  let title = prompt('Enter task title');
  let description = prompt('Enter task description');
  let dueDate = prompt('When is it due?');
  let priority = prompt('what is the priority');
  let task = new Task(title, description, dueDate, priority);
  return task;
}

function createTaskDOM(task) {
  let taskSection = document.createElement("section");
  let taskContainer = document.querySelector(".task-container");
  taskSection.appendChild(createDOMElement("p",task.title));
  taskSection.appendChild(createDOMElement("p",task.description));
  taskSection.appendChild(createDOMElement("p",task.dueDate));
  taskSection.appendChild(createDOMElement("p",task.priority));
  taskContainer.appendChild(taskSection);
}

function createDOMElement(tag, text) {
  let element = document.createElement(tag);
  element.textContent = text;
  return element;
}

// createTaskDOM(enterTaskInformation());

const addTaskButton = document.querySelector(".add-task-button");
addTaskButton.addEventListener("click", () => createTaskDOM(new Task("test1","test2","test3","test4")));

createTaskDOM(new Task("test1","test2","test3","test4"));


