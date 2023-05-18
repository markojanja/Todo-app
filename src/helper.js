const generateTaskList =(lst)=>{
    const taskList = document.getElementById("taskList");
    taskList.innerHTML = "";
    lst.map((todo) => {
        const taskDone = !todo.status ? "st-done": ""
          taskList.innerHTML += `
          <li class="task-card p-${todo.priority}">
            <button class="status-btn ${taskDone}" data-val="${todo.name}" data-key="${todo.projectKey}"></button>
            <p class="ptt" >${todo.name} ${todo.date}</p>
            <button class="delete-task" data-val="${todo.name}" data-key="${todo.projectKey}"></button>
          </li>`;        
      });
}

const resetTasksView = (title) =>{
  const tasks = document.querySelector("#project");
  tasks.innerHTML = ''
  tasks.innerHTML = `
  <h1 class='pt'>${title}</h1>
  <ul id="taskList"></ul>
  `;
}

export {generateTaskList, resetTasksView}