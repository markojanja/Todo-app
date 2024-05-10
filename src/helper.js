const countTasks = (id, obj) => {
  const linkId = document.getElementById(id);

  linkId.innerHTML = obj ? `${id} <span class="badge">${obj.todos.length}</span>` : `${id} <span class="badge">0</span>`;
};

const generateProjectList = (projectList) => {
  const list = document.getElementById('list');

  list.innerHTML = '';
  projectList.map((project) => {
    list.innerHTML += `
      <li class="project-link">
        <div class="link-container">
          <p class="title">${project.name}</p>
          <button class="btn-edit" type="button"><i class="fa-solid fa-pen" data-value="${project.name}"></i></button>
          <button class="btn-delete" type="button"><i class="fa-solid fa-trash" data-value="${project.name}"></i></button>
        </div>

        <form class="modal">
          <input type="text" class="inputVal" id="input-${project.name}" required>
          <button class="add-btn" type="submit" id="btn3"><i class="fa-solid fa-check"></i></button>
        </form>
      </li>
      `;
  });
};

const generateTaskList = (lst) => {
  const taskList = document.getElementById('taskList');
  taskList.innerHTML = '';
  lst.map((todo) => {
    const taskDone = todo.status ? 'st-done' : '';
    taskList.innerHTML += `
          <li class="task-card p-${todo.priority}">
            <button class="status-btn ${taskDone}" data-val="${todo.name}" data-key="${todo.projectKey}"></button>
            <p class="ptt" >${todo.name}</p><span class="date">${todo.date}</span>
            <button class="delete-task" data-val="${todo.name}" data-key="${todo.projectKey}"></button>
          </li>`;
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

export { generateTaskList, generateProjectList, resetTasksView, countTasks };
