import ProjectList from './ProjectsList';
import UIEventHandler from './UIEventHandlers';

import { generateTaskList, resetTasksView, countTasks } from './helper';

export default class UI {
  static loadUI() {
    UI.init();
    UI.render();
    UI.renderProjectList();
    UIEventHandler.closeSidebar();
    UIEventHandler.toggleNav();
    UIEventHandler.toggleFormButtonController();
  }

  static init() {
    const all = UI.projects.getAllTasks();
    resetTasksView('All');
    this.renderTasks(all);
  }

  static render() {
    const projects = UI.projects;
    UI.createProjectController();
    UI.setActiveProject();
    UI.UpdateProjectController();
    UI.renderTodaysTasks();
    UI.renderThisWeek();
    UI.renderAllTasks();
    countTasks('all', projects.getAllTasks());
    countTasks('today', projects.filterTodays());
    countTasks('week', projects.filterThisWeek());
  }

  static projects = new ProjectList();

  static createProjectController() {
    const projectForm = document.getElementById('projectForm');
    projectForm.addEventListener(
      'submit',
      (e) => {
        e.preventDefault();
        const taskName = document.getElementById('projectName');
        // if (!taskName.value) return console.log("this is empty");
        UI.projects.addProjects(taskName.value);
        localStorage.setItem('ok', JSON.stringify(this.projects.projectList));
        const p = UI.projects.selectProject(taskName.value);
        UI.renderProject(p);
        this.renderProjectList();
        projectForm.reset();
        projectForm.classList.remove('show');
      },
      false
    );
  }
  // Update project

  static UpdateProjectController() {
    const cards = document.querySelectorAll('.project-link');
    cards.forEach((card) => {
      const editButton = card.querySelector('.btn-edit');
      editButton.addEventListener('click', (e) => {
        const modal = card.querySelector('.modal');
        let projectName = e.target.dataset.value;
        const input = document.getElementById(`input-${projectName}`);
        input.value = projectName;
        modal.style.display = 'flex';
        UI.renderProject(UI.projects.selectProject(projectName));
        modal.addEventListener('submit', () => {
          e.preventDefault();
          if (!input.value) return;
          this.projects.updateProjects(projectName, input.value);
          localStorage.setItem('ok', JSON.stringify(this.projects.projectList));
          this.renderProjectList();
          // console.log(projectName)
          if (projectName) {
            projectName = input.value;
            UI.renderProject(UI.projects.selectProject(projectName));
          }
          modal.reset();
        });
      });
    });
  }

  // Delete project

  static deleteProjectController() {
    const deleteButtons = document.querySelectorAll('.btn-delete');
    const tasks = document.querySelector('#project');
    this.setActiveProject();

    deleteButtons.forEach((button) => {
      button.addEventListener('click', (e) => {
        const projectName = e.target.dataset.value;
        console.log(projectName);
        UI.projects.projectList.forEach((proj) => {
          if (proj !== projectName) tasks.innerHTML = 'Project Deleted';
          this.renderProjectList();
        });
        UI.projects.deleteProjects(projectName);
        localStorage.setItem('ok', JSON.stringify(this.projects.projectList));
        this.renderProjectList();
        countTasks('all', UI.projects.getAllTasks());
        countTasks('today', UI.projects.filterTodays());
        countTasks('week', UI.projects.filterThisWeek());
      });
    });
  }

  static renderProjectList() {
    const list = document.getElementById('list');

    list.innerHTML = '';
    UI.projects.projectList.map((project) => {
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
      return 1;
    });

    this.UpdateProjectController();
    this.deleteProjectController();
    UIEventHandler.closeSidebar();
  }

  static setActiveProject() {
    const projectsNames = document.querySelectorAll('.title');
    projectsNames.forEach((name) => {
      name.addEventListener(
        'click',
        () => {
          const projectName = name.textContent;
          const p = UI.projects.selectProject(projectName);
          localStorage.setItem('ok', JSON.stringify(UI.projects.projectList));
          UI.renderProject(p);
        },
        false
      );
    });
  }

  static renderProject(project) {
    const tasks = document.querySelector('#project');
    tasks.innerHTML = '';
    tasks.innerHTML = `
    <h1 class='pt'>${project.name}</h1>
    <button class="toggle-form-2"><i class="fa-sharp fa-solid fa-plus"></i></button>
    `;
    tasks.innerHTML += `
    <div class="form-container">
    <div class="form-title">
    <h2>New task</h2>
    <button class="close-form-btn"><i class="fa-solid fa-xmark"></i></button>
    </div>
    <form action="" id="taskForm" autocomplete="off">
      <label for="taskName2">Task name</label>
      <input type="text" name="taskName2" id="taskName2" required>
      <label for="taskDate">Date</label>
      <input type="date" name="taskDate" id="taskDate" required>
      <label for="select">Priority</label>
        <select id="select" name="select">
          <option value="normal">normal</option>
          <option value="high">high</option>
          <option value="low">low</option>
        </select>
      <button type="submit" id="btn"></button>
    </form>
    </div>
    <ul id="taskList"></ul>`;
    UIEventHandler.toggleForm2();

    UI.createTaskConroller();

    if (project.todos.length > 0) {
      UI.renderTasks(project);
    }
  }

  static renderTasks(obj) {
    generateTaskList(obj.todos);
    UI.updateTaskController(obj);
    UI.deleteTaskController(obj);
    localStorage.setItem('ok', JSON.stringify(UI.projects.projectList));
  }

  // add task form handler

  static createTaskConroller() {
    const taskForm = document.getElementById('taskForm');
    const projectName = document.querySelector('.pt').textContent;
    const activeProject = UI.projects.selectProject(projectName);
    const form = document.querySelector('.form-container');
    taskForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const title = document.getElementById('taskName2');
      const dt = document.getElementById('taskDate');
      const date = new Date(dt.value).toDateString();
      const priority = document.getElementById('select');
      activeProject.addTodo(title.value, priority.value, date);
      localStorage.setItem('ok', JSON.stringify(this.projects.projectList));
      UI.renderTasks(activeProject);
      UI.renderProjectList();
      taskForm.reset();
      form.style.display = 'none';
      countTasks('all', UI.projects.getAllTasks());
      countTasks('today', UI.projects.filterTodays());
      countTasks('week', UI.projects.filterThisWeek());
    });
  }
  // updateTask

  static updateTaskController(obj) {
    const statusBtns = document.querySelectorAll('.status-btn');

    statusBtns.forEach((btn) => {
      btn.addEventListener('click', (e) => {
        const projectName = e.target.dataset.key;

        let activeProject = UI.projects.selectProject(projectName);
        const taskName = e.target.dataset.val;
        console.log(taskName);
        activeProject.updateStatus(taskName);

        localStorage.setItem('ok', JSON.stringify(this.projects.projectList));
        activeProject = obj;
        UI.renderTasks(activeProject);
      });
    });
  }

  // delete task
  static deleteTaskController(obj) {
    const tasksBtns = document.querySelectorAll('.delete-task');
    tasksBtns.forEach((btn) => {
      btn.addEventListener('click', (e) => {
        const projectName = e.target.dataset.key;
        let activeProject = UI.projects.selectProject(projectName);
        const taskName = e.target.dataset.val;
        activeProject.deleteTodo(taskName);
        localStorage.setItem('ok', JSON.stringify(this.projects.projectList));
        switch (obj.name) {
          case 'all':
            activeProject = UI.projects.getAllTasks();
            UI.renderTasks(activeProject);
            break;
          case 'today':
            activeProject = UI.projects.filterTodays();
            UI.renderTasks(activeProject);
            break;
          case 'week':
            activeProject = UI.projects.filterThisWeek();
            UI.renderTasks(activeProject);
            break;
          default:
            activeProject = obj;
            UI.renderTasks(activeProject);
            break;
        }
        countTasks('all', UI.projects.getAllTasks());
        countTasks('today', UI.projects.filterTodays());
        countTasks('week', UI.projects.filterThisWeek());
      });
    });
  }

  static renderAllTasks() {
    const allTasksBtn = document.getElementById('all');

    allTasksBtn.addEventListener('click', () => {
      resetTasksView('All');
      const all = UI.projects.getAllTasks();
      countTasks('all', all);
      UI.renderTasks(all);
      UI.renderProjectList();
    });
  }

  static renderTodaysTasks() {
    const today = document.getElementById('today');
    today.addEventListener('click', () => {
      resetTasksView('Todays');
      const todays = UI.projects.filterTodays();
      countTasks('today', todays);
      UI.renderTasks(todays);
    });
  }

  static renderThisWeek() {
    const weekBtn = document.getElementById('week');

    weekBtn.addEventListener('click', () => {
      resetTasksView('Week');
      let week = UI.projects.filterThisWeek();

      UI.renderTasks(week);
      week = UI.projects.filterThisWeek();
    });
  }
}
