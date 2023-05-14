const generateTaskList =(lst)=>{
    const taskList = document.getElementById("taskList");
    taskList.innerHTML = "";
    lst.map((todo) => {
        if(!todo.status){
          taskList.innerHTML += `
          <li class="task-card p-${todo.priority}">
            <button class="status-btn" data-val="${todo.name}" data-key="${todo.projectKey}"></button>
            <p class="ptt" >${todo.name} ${todo.date}</p>
            <button class="delete-task" data-value="${todo.name}" data-keydel="${todo.projectKey}"></button>
          </li>`;
        }
        else{
          taskList.innerHTML += `
          <li class="task-card p-${todo.priority}">
          <button class="status-btn st-done" data-val="${todo.name}" data-key="${todo.projectKey}"></button>
          <p class="ptt">${todo.name} ${todo.date}</p>
          <button class="delete-task" data-value="${todo.name}" data-keydel="${todo.projectKey}"></button>
          </li>`;
        }
  
        
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