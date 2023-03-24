import ProjectList from "./ProjectsList";

export default class UI {
  static loadUI() {
    UI.createProjectController();
    UI.renderProjectList();
    UI.setActiveProject();
    UI.UpdateProjectController();
    UI.toggleFormButtonController();
  }
  static projects = new ProjectList();

  static toggleFormButtonController() {
    const toggleBtn = document.querySelector(".toggle-form");
    toggleBtn.addEventListener("click", () => {
      const form = document.getElementById("myForm");
      form.classList.toggle("show");
    });
  }

  static createProjectController() {
    const myForm = document.getElementById("myForm");
    myForm.addEventListener(
      "submit",
      (e) => {
        e.preventDefault();
        const taskName = document.getElementById("projectName");
        if (!taskName.value) return console.log("this is empty");
        UI.projects.addProjects(taskName.value);
        const p = UI.projects.selectProject(taskName.value);
        UI.renderProject(p);
        this.renderProjectList();
        myForm.reset();
        myForm.classList.remove("show");
      },
      false
    );
  }
  // Update project
  static UpdateProjectController() {
    const cards = document.querySelectorAll(".project-link");
    cards.forEach((card) => {
      const editButton = card.querySelector(".btn-edit");
      editButton.addEventListener("click", (e) => {
        const modal = card.querySelector(".modal");
        let projectName = e.target.dataset.value;
        const input = document.getElementById(`input-${projectName}`);
        input.value = projectName;
        modal.style.display = "flex";

        UI.renderProject(UI.projects.selectProject(projectName));
        modal.addEventListener("submit", (e) => {
          e.preventDefault();

          if (!input.value) return console.log("this is empty");
          this.projects.updateProjects(projectName, input.value);
          this.renderProjectList();
          if (projectName) {
            projectName = input.value;
            UI.renderProject(UI.projects.selectProject(projectName));
          }
          modal.reset();
        });
      });
    });
  }

  //Delete project

  static deleteProjectController() {
    const deleteButtons = document.querySelectorAll(".btn-delete");
    const tasks = document.querySelector("#project");
    this.setActiveProject();

    deleteButtons.forEach((button) => {
      button.addEventListener("click", (e) => {
        const projectName = e.target.dataset.value;
        UI.projects.projectList.forEach((proj) => {
          if (proj !== projectName) tasks.innerHTML = "Project Deleted";
          this.renderProjectList();
        });
        UI.projects.deleteProjects(projectName);
        this.renderProjectList();
      });
    });
  }

  static renderProjectList() {
    const list = document.getElementById("list");
    list.innerHTML = "";
    UI.projects.projectList.map((project) => {
      list.innerHTML += `
      <li class="project-link">
        <div class="link-container">
          <h3 class="title">${project.name}</h3>
          <button class="btn-edit" type="button" data-value="${project.name}"><i class="fa-solid fa-pen" data-value="${project.name}"></i></button>
          <button class="btn-delete" type="button" data-value="${project.name}"><i class="fa-solid fa-trash"></i></button>
        </div>

        <form class="modal">
          <input type="text" class="inputVal" id="input-${project.name}" required>
          <button class="add-btn" type="submit" id="btn3"><i class="fa-solid fa-check"></i></button>
        </form>
      </li>
      `;
    });
    this.UpdateProjectController();
    this.deleteProjectController();
  }

  static setActiveProject() {
    const projectsNames = document.querySelectorAll(".title");
    projectsNames.forEach((name) => {
      name.addEventListener(
        "click",
        () => {
          const projectName = name.textContent;
          const p = UI.projects.selectProject(projectName);
          UI.renderProject(p);
        },
        false
      );
    });
  }

  static renderProject(project) {
    const tasks = document.querySelector("#project");
    tasks.innerHTML = "";
    tasks.innerHTML = `<h1 class='pt'>${project.name}</h1>`;
    tasks.innerHTML += `
    <form action="" id="myForm2" autocomplete="off">
    <label for="project">Enter task name</label>
      <input type="text" name="project" id="taskName2" required>
      <label for="priority">Choose priority</label>
        <select id="select" name="priority">
          <option value="high">high</option>
          <option value="normal">normal</option>
          <option value="low">low</option>
        </select>
      <button type="submit" id="btn"></button>
    </form>
    <ul id="taskList"></ul>`;

    UI.createTaskConroller();
    if (project.todos.length > 0) {
      this.renderTasks()
    }
  }

  // tasks
  // reneder tasks
  static renderTasks() {
    const taskList = document.getElementById("taskList");
    const titleProject = document.querySelector(".pt").textContent;
    const activeProject = UI.projects.selectProject(titleProject);
    taskList.innerHTML = "";
    activeProject.todos.map((todo) => {
      if(!todo.status){
        taskList.innerHTML += `
        <li class="task-card p-${todo.priority}">
          <button class="status-btn" data-val="${todo.name}"></button>
          <p>${todo.name}</p>
          <button class="delete-task" data-value="${todo.name}"></button>
        </li>`;
      }
      else{
        taskList.innerHTML += `
        <li class="task-card p-${todo.priority}">
        <button class="status-btn st-done" data-val="${todo.name}"></button>
        <p>${todo.name}</p>
        <button class="delete-task" data-value="${todo.name}"></button>
        </li>`;
      }

      
    });
    UI.updateTaskController()
    UI.deleteTaskController()
  }
  //add task form handler
  static createTaskConroller() {
    const myForm2 = document.getElementById("myForm2");
    const projectName = document.querySelector(".pt").textContent;
    const activeProject = UI.projects.selectProject(projectName);
    myForm2.addEventListener(
      "submit",
      (e) => {
        e.preventDefault();
        const title = document.getElementById("taskName2");
        const priority = document.getElementById('select')
        // const selectVal =
    
        activeProject.addTodo(title.value,priority.value);
        UI.renderTasks();
        myForm2.reset();
      },
      false
    );
  }
  // updateTask
  static updateTaskController() {
    const statusBtns = document.querySelectorAll('.status-btn')
    const projectName = document.querySelector(".pt").textContent;
    const activeProject = UI.projects.selectProject(projectName);

    statusBtns.forEach(btn=>{
      btn.addEventListener('click',(e)=>{
        const taskName = e.target.dataset.val
        activeProject.updateStatus(taskName)
        UI.renderTasks()
      })
    })
   
  }
  // delete task
  static deleteTaskController(){
    const tasksBtns = document.querySelectorAll('.delete-task')
    const projectName = document.querySelector(".pt").textContent;
    const activeProject = UI.projects.selectProject(projectName);
    console.log(activeProject)
    tasksBtns.forEach(btn=>{
      btn.addEventListener('click',(e)=>{
        const taskName = e.target.dataset.value;
        console.log(taskName)
        activeProject.deleteTodo(taskName)
        this.renderTasks()
      })
    })
  }
}
