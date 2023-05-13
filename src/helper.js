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
export default generateTaskList