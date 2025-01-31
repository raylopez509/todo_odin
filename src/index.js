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

console.log(enterTaskInformation());
