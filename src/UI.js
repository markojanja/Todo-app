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

        UI.renderProject(UI.projects.selectProject(projectName))
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
    <form action="" id="myForm2">
      <input type="text" name="project" id="taskName2" required>
      <button type="submit" id="btn">Add task</button>
    </form>
    <ul id="taskList"></ul>`;

    UI.taskFormHandler();
    if (project.todos.length > 0) {
      const taskList = document.getElementById("taskList");
      project.todos.map((todo) => {
        taskList.innerHTML += `<li>${todo}</li>`;
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
          tasks2.innerHTML += `<li>${todo}</li>`;
        });
        myForm2.reset();
      },
      false
    );
  }
}
