import './index.css';
import { parse,format } from "date-fns";

const TaskController = (() => {
  class Task {
    constructor(title, description, dueDate, priority, isDone) {
      this.title = title;
      this.description = description;
      this.dueDate = formatDate(dueDate);
      this.priority = priority;
      this.id = undefined;
      this.isDone = isDone;
    }
  }

  const tasks = [];

  function deleteTask(taskId) {
    tasks.splice(taskId, 1);
    for (let i = taskId; i < tasks.length; i++) {
      tasks[i].id = tasks[i].id - 1;
    }
  }

  function updateTask(index, title, description, dueDate, priority, isDone) {
    tasks[index].title = title;
    tasks[index].description = description;
    tasks[index].dueDate = formatDate(dueDate);
    tasks[index].priority = priority;
    tasks[index].isDone = isDone;
  }

  function getTask(index) {
    return tasks[index];
  }

  function createTask(title, description, dueDate, priority, isDone) {
    const task = new Task(title, description, dueDate, priority, isDone);
    task.id = tasks.length;
    tasks.push(task);
    return task;
  }

  function setIsDone(index, isDone) {
    tasks[index].isDone = isDone;
  }

  function formatDate(date) {
    const newDate = parse(date,'yyyy-MM-dd', new Date());
    return format(newDate, 'MM-dd-yyyy');
  }

  return {
    deleteTask,
    updateTask,
    getTask,
    createTask,
    setIsDone,
    tasks,
  };
})();

const DOMController = (() => {
  function createDOMElement(tag, text, id) {
    const element = document.createElement(tag);
    element.textContent = text;
    if (id) {
      element.value = id;
    }
    return element;
  }

  function createTaskDOM(task) {
    const taskSection = createTaskSection(task.id);
    createChildrenDOMsShrink(taskSection, task);
    const taskContainer = document.querySelector('.task-container');
    taskContainer.appendChild(taskSection);
  }

  function createTaskSection(value) {
    const taskSection = document.createElement('section');
    taskSection.classList.add('expand');
    taskSection.value = value;
    taskSection.addEventListener('click', expandSection);
    return taskSection;
  }

  const flipIsDone = (event) => {
    let taskSection = event.target.parentNode;
    let index = taskSection.value;
    let isDone = TaskController.getTask(index).isDone;
    TaskController.setIsDone(index, !isDone);
    if(TaskController.getTask(index).isDone) {
      taskSection.classList.add('done');
    }
    else {
      taskSection.classList.remove('done');
    }
  };

  function createChildrenDOMsShrink(element, task) {
    element.appendChild(createDOMElement('p', task.title, task.id));
    element.appendChild(createDOMElement('p', task.dueDate, task.id));
    const doneButton = document.createElement('button');
    doneButton.textContent = 'Done';
    doneButton.addEventListener('click',flipIsDone);
    element.appendChild(doneButton);
  }

  function createChildrenDOMsExpand(element, task) {
    element.appendChild(createDOMElement('p', task.title, task.id));
    element.appendChild(createDOMElement('p', task.description, task.id));
    element.appendChild(createDOMElement('p', task.dueDate, task.id));
    element.appendChild(createDOMElement('p', task.priority, task.id));
    const editButton = document.createElement('button');
    editButton.textContent = 'Edit';
    editButton.addEventListener('click', editTask);
    element.appendChild(editButton);
    const deleteButton = document.createElement('button');
    deleteButton.textContent = 'Delete';
    deleteButton.addEventListener('click', deleteTask);
    element.appendChild(deleteButton);
  }

  const expandSection = (event) => {
    let dom = event.target;
    if (event.target.localName == 'button') {
      return;
    } else if (event.target !== event.currentTarget) {
      dom = event.currentTarget;
    }
    let task = TaskController.getTask(dom.value);
    while (dom.firstChild) {
      dom.removeChild(dom.firstChild);
    }
    dom.addEventListener('click', shrinkSection);
    dom.removeEventListener('click', expandSection);
    createChildrenDOMsExpand(dom, task);
    dom.classList.remove('expand');
  };

  const shrinkSection = (event) => {
    let dom = event.target;
    if (event.target.localName == 'button') {
      return;
    } else if (event.target !== event.currentTarget) {
      dom = event.currentTarget;
    }
    let task = TaskController.getTask(dom.value);
    while (dom.firstChild) {
      dom.removeChild(dom.firstChild);
    }
    dom.addEventListener('click', expandSection);
    dom.removeEventListener('click', shrinkSection);
    createChildrenDOMsShrink(dom, task);
    dom.classList.add('expand');
  };

  const showTaskDialogAdd = (event) => {
    addTaskDialog.showModal();
    let taskForm = document.querySelector('#add-task-form');
    taskForm.replaceWith(addTaskForm.cloneNode(true));
    taskForm = document.querySelector('#add-task-form');
    taskForm.addEventListener('submit', addTask);
    document.querySelector('#task-dialog-title').textContent = 'Add Task';
    cancel = document.querySelector('#cancel');
    cancel.addEventListener('click', (event) => {
      event.preventDefault();
      addTaskDialog.close();
    });
    let doneEditButton = document.querySelector('#submit');
    doneEditButton.textContent = 'Done';
  };


  const addTaskDialog = document.querySelector('#add-task-dialog');

  const addTaskButton = document.querySelector('.add-task-button');
  addTaskButton.addEventListener('click', showTaskDialogAdd);

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

    const task = TaskController.createTask(
      title,
      description,
      dueDate,
      priority,
      false
    );

    createTaskDOM(task);

    document.querySelector('#title').value = '';
    document.querySelector('#description').value = '';
    document.querySelector('#dueDate').value = '';
    addTaskDialog.close();
  };

  const addTaskForm = document.querySelector('#add-task-form');
  addTaskForm.addEventListener('submit', showTaskDialogAdd);

  const deleteTask = (event) => {
    let element = event.target.parentNode;
    TaskController.deleteTask(element.value);
    let elementTraversal = element.nextElementSibling;
    while (elementTraversal !== null) {
      elementTraversal.value--;
      elementTraversal = elementTraversal.nextElementSibling;
    }
    element.parentNode.removeChild(element);
  };

  const editTask = (event) => {
    addTaskDialog.showModal();
    let taskForm = document.querySelector('#add-task-form');
    taskForm.replaceWith(addTaskForm.cloneNode(true));
    taskForm = document.querySelector('#add-task-form');
    taskForm.addEventListener('submit', (event) =>
      editTaskSubmit(event, index)
    );
    document.querySelector('#task-dialog-title').textContent = 'Edit Task';
    let element = event.target.parentNode;
    let index = element.value;
    console.log(element.value);
    let task = TaskController.getTask(element.value);
    document.querySelector('#title').value = task.title;
    document.querySelector('#description').value = task.description;
    document.querySelector('#dueDate').value = task.dueDate;
    document.querySelector('#priority').value = task.priority;
    cancelButton.addEventListener('click', (event) => {
      event.preventDefault();
      addTaskDialog.close();
    });
    let doneEditButton = document.querySelector('#submit');
    doneEditButton.textContent = 'Done';
  };

  const editTaskSubmit = (event, index) => {
    event.preventDefault();
    let title = document.querySelector('#title').value;
    let description = document.querySelector('#description').value;
    let dueDate = document.querySelector('#dueDate').value;
    let priority = document.querySelector('#priority').value;

    TaskController.updateTask(index, title, description, dueDate, priority);

    console.log(TaskController.tasks);
    let taskContainer = document.querySelector('.task-container').firstChild;
    for (let i = 0; i < index; i++) {
      taskContainer = taskContainer.nextElementSibling;
    }
    let taskElement = taskContainer.firstChild;
    taskElement.textContent = title;
    taskElement = taskElement.nextElementSibling;
    taskElement.textContent = description;
    taskElement = taskElement.nextElementSibling;
    taskElement.textContent = dueDate;
    taskElement = taskElement.nextElementSibling;
    taskElement.textContent = priority;
    document.querySelector('#title').value = '';
    document.querySelector('#description').value = '';
    document.querySelector('#dueDate').value = '';
    addTaskDialog.close();
  };

  let testDOM = TaskController.createTask(
    'Make Edit Button Work',
    'make all of them work',
    '2025-01-01',
    'high',
    false
  );
  createTaskDOM(testDOM);
})();
