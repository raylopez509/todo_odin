import './index.css';

const TaskController = (() => {
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
    
  function deleteTask(taskId) {
    tasks.splice(taskId, 1);
    for(let i = taskId; i < tasks.length; i++) {
      tasks[i].id = tasks[i].id - 1;
    }
  }

  function updateTask(task, index) {
    tasks[index] = task;
  }

  function getTask(index) {
    return tasks[index];
  }

  function createTask(title, description, dueDate, priority) {
    const task = new Task(title, description, dueDate, priority);
    task.id = tasks.length;
    tasks.push(task); 
    return task;
  }

  return {
    deleteTask,
    updateTask,
    getTask,
    createTask,
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
    const doneButton = document.createElement('button');
    doneButton.textContent = "Done";
    element.appendChild(doneButton);  
  }

  function createChildrenDOMsExpand(element, task) {
    element.appendChild(createDOMElement('p', task.title, task.id));
    element.appendChild(createDOMElement('p', task.description, task.id));
    element.appendChild(createDOMElement('p', task.dueDate, task.id));
    element.appendChild(createDOMElement('p', task.priority, task.id));
    const editButton = document.createElement('button');
    editButton.textContent = "Edit";
    element.appendChild(editButton);
    const deleteButton = document.createElement('button');
    deleteButton.textContent = "Delete";
    deleteButton.addEventListener('click',deleteTask);
    element.appendChild(deleteButton);
  }

  const expandSection = (event) => {
    let dom = event.target;
    if(event.target.localName == "button") {
      return;
    }
    else if(event.target !== event.currentTarget) {
      dom = event.currentTarget;
    }
    let task = TaskController.getTask(dom.value);
    while (dom.firstChild) {
      dom.removeChild(dom.firstChild);
    }
    dom.addEventListener('click',shrinkSection)
    dom.removeEventListener('click',expandSection);
    createChildrenDOMsExpand(dom, task);
    dom.className = '';
  };

  const shrinkSection = (event) =>{
    let dom = event.target;
    if(event.target.localName == "button") {
      return;
    }
    else if(event.target !== event.currentTarget) {
      dom = event.currentTarget;
    }
    let task = TaskController.getTask(dom.value);
    while (dom.firstChild) {
      dom.removeChild(dom.firstChild);
    }
    dom.addEventListener('click',expandSection)
    dom.removeEventListener('click',shrinkSection);
    createChildrenDOMsShrink(dom, task);
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
    const task = TaskController.createTask(title, description, dueDate, priority);
                                                                      
    createTaskDOM(task); 

    document.querySelector('#title').value = "";
    document.querySelector('#description').value = "";
    document.querySelector('#dueDate').value = "";
    addTaskDialog.close();
  }

  const addTaskForm = document.querySelector('#add-task-form');
  addTaskForm.addEventListener('submit', addTask);

  const deleteTask = (event) => {
    let element = event.target.parentNode;
    TaskController.deleteTask(element.value);
    let elementTraversal = element.nextElementSibling;
    while(elementTraversal !== null) {
      elementTraversal.value--;
      elementTraversal = elementTraversal.nextElementSibling;
    }
    element.parentNode.removeChild(element);
  }

  let testDOM = TaskController.createTask("Make Edit Button Work","make all of them work", "1-1-2025", "high");
  createTaskDOM(testDOM);
})();

