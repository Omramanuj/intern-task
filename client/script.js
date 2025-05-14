document.addEventListener("DOMContentLoaded", () => {
  fetchAllTasks();
  
  document.getElementById('task-id').addEventListener('change', function() {
    const selectedId = this.value;
    if (selectedId) {
      fetchTaskById(selectedId);
    } else {
      document.getElementById('task').value = '';
    }
  });
  
  document.getElementById('task-form').addEventListener('submit', function(e) {
    e.preventDefault();
    alert('Form submitted!');
  });
});

function fetchAllTasks() {
  fetch('http://localhost:8080/api/tasks')
    .then(res => res.json())
    .then(tasks => {
      const tasksWithIndex = tasks.map((task, index) => ({
        ...task,
        index: index + 1 
      }));
      displayTasks(tasksWithIndex);
      populateTaskDropdown(tasksWithIndex);
    })
    .catch(err => console.error("Failed to fetch tasks:", err));
}

function fetchTaskById(id) {
  fetch(`http://localhost:8080/api/tasks/${id}`)
    .then(res => res.json())
    .then(task => {
      document.getElementById('task').value = task.task;
    })
    .catch(err => console.error("Failed to fetch task:", err));
}

function displayTasks(tasks) {
  const container = document.getElementById('tasks-container');
  container.innerHTML = '';
  
  tasks.forEach(task => {
    const taskCard = document.createElement('div');
    taskCard.className = 'task-card';
    taskCard.innerHTML = `
      <div>ID: ${task.index}</div>
      <div>${task.task}</div>
    `;
    container.appendChild(taskCard);
  });
}

function populateTaskDropdown(tasks) {
  const dropdown = document.getElementById('task-id');
  
  while (dropdown.options.length > 1) {
    dropdown.remove(1);
  }
  
  tasks.forEach(task => {
    const option = document.createElement('option');
    option.value = task.id; 
    option.textContent = `Task ${task.index}`;
    dropdown.appendChild(option);
  });
}
  