const countTasks = (id, obj) => {
  const linkId = document.getElementById(id);

  linkId.innerHTML = obj
    ? `${id} <span class="badge">${obj.todos.length}</span>`
    : `${id} <span class="badge">0</span>`;
};

const generateTaskList = (lst) => {
  const taskList = document.getElementById('taskList');
  taskList.innerHTML = '';
  lst.map((todo) => {
    const taskDone = todo.status ? 'st-done' : '';
    taskList.innerHTML += `
          <li class="task-card p-${todo.priority}">
            <button class="status-btn ${taskDone}" data-val="${todo.name}" data-key="${todo.projectKey}"></button>
            <p class="ptt" >${todo.name} (${todo.projectKey})</p><span class="date">${todo.date}</span>
            <button class="delete-task" data-val="${todo.name}" data-key="${todo.projectKey}"></button>
          </li>`;
    return 1;
  });
};

const resetTasksView = (title) => {
  const tasks = document.querySelector('#project');
  tasks.innerHTML = '';
  tasks.innerHTML = `
  <h1 class='pt'>${title}</h1>
  <ul id="taskList"></ul>
  `;
};

export { generateTaskList, resetTasksView, countTasks };
