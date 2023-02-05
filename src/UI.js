import ProjectList from "./ProjectsList";

export default class UI {
  static loadUI() {
    UI.createNewProject();
    UI.renderProjectList();
    UI.setActiveProject();
    UI.UpdateProject();
  }
  static projects = new ProjectList();

  static createNewProject() {
    const myForm = document.getElementById("myForm");
    myForm.addEventListener(
      "submit",
      (e) => {
        e.preventDefault();
        const title = document.getElementById("taskName");
        UI.projects.addProjects(title.value);
        this.renderProjectList();
        myForm.reset();
      },
      false
    );
  }
  // Update project
  static UpdateProject() {
    const cards = document.querySelectorAll(".project-card");
    cards.forEach((card) => {
      const btn = card.querySelector(".btn-edit");
      const modal = card.querySelector(".modal");

      btn.addEventListener("click", (e) => {
        modal.style.display = "block";
        const projectName = e.target.dataset.value;
        modal.addEventListener("submit", (e) => {
          e.preventDefault();
          const input = document.querySelector(`#input-${projectName}`);
          console.log(input.value);
          this.projects.updateProjects(projectName, input.value);
          this.renderProjectList();
          modal.reset();
        });
      });
    });
  }

  //Delete project

  static deleteProject() {
    const deleteButton = document.querySelectorAll(".btn-delete");
    const tasks = document.querySelector("#project");
    this.setActiveProject()

    deleteButton.forEach((bnt) => {
      bnt.addEventListener("click", (e) => {
        const projectName = e.target.dataset.value;
        UI.projects.projectList.forEach(proj=>{
          if (proj!==projectName) tasks.innerHTML = ""
          this.renderProjectList()
        })
        // console.log(UI.projects.projectList)
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
      <div class="project-card">
      <h3 class="title">${project.name}</h3>
      <button class="btn-edit" type="button" data-value="${project.name}">Edit</button>
      <button class="btn-delete" type="button" data-value="${project.name}">delete</button>
        <form class="modal" style="display: none;">
           <input type="text" class="inputVal" id="input-${project.name}">
          <button type="submit" id="btn3">Update</button>
         </form>
      </div>
      `;
    });
    this.UpdateProject();
    this.deleteProject();
  }

  static setActiveProject() {
    const projectsNames = document.querySelectorAll(".title");
    // console.log("hiiii");
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
    tasks.innerHTML=""
    tasks.innerHTML = `<h1 class= 'pt'>${project.name}</h1>`;
    tasks.innerHTML += `
    <form action="" id="myForm2">
      <input type="text" name="project" id="taskName2">
      <button type="submit" id="btn">Add task</button>
    </form>
    <div id="taskList"></div>`;

    UI.taskFormHandler();
    if (project.todos.length > 0) {
      const taskList = document.getElementById("taskList");
      project.todos.map((todo) => {
        taskList.innerHTML += `<p>${todo}</p>`;
      });
    }
  }

  // tasks
  //add task form handler
  static taskFormHandler() {
    const myForm2 = document.getElementById("myForm2");
    const tasks2 = document.getElementById("taskList");
    const titleProject = document.querySelector(".pt").textContent;
    const pr = UI.projects.selectProject(titleProject);
    myForm2.addEventListener(
      "submit",
      (e) => {
        e.preventDefault();
        const title = document.getElementById("taskName2");
        pr.addTodo(title.value);
        tasks2.innerHTML = "";
        pr.todos.map((todo) => {
          tasks2.innerHTML += `<p>${todo}</p>`;
        });
        myForm2.reset();
      },
      false
    );
  }
}
