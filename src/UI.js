import Storage from './Storage';
import TaskRenderer from './UITaskRenderer';
import ProjectList from './ProjectsList';
import UIEventHandler from './UIEventHandlers';
import { resetTasksView, generateProjectList } from './helper';

export default class UI {
  static projects = new ProjectList();

  static loadUI() {
    UI.init();
    UI.render();
    UI.renderProjectList();
    UIEventHandler.closeSidebar();
    UIEventHandler.toggleNav();
    UIEventHandler.toggleFormButtonController();
  }

  static init() {
    UI.createProjectController();
    UI.setActiveProject();
    UI.UpdateProjectController();
    resetTasksView('All');
    TaskRenderer.render(UI.projects.getAllTasks(), UI.updateTaskController, UI.deleteTaskController);
  }

  static render() {
    TaskRenderer.renderAllTasks(UI.projects.getAllTasks(), UI.updateTaskController, UI.deleteTaskController);
    TaskRenderer.renderTodaysTasks(UI.projects.filterTodays(), UI.updateTaskController, UI.deleteTaskController);
    TaskRenderer.renderThisWeek(UI.projects.filterThisWeek(), UI.updateTaskController, UI.deleteTaskController);
    TaskRenderer.countTasksByTag(UI.projects.getAllTasks(), UI.projects.filterTodays(), UI.projects.filterThisWeek());
  }

  static createProjectController() {
    const projectForm = document.getElementById('projectForm');
    projectForm.addEventListener(
      'submit',
      (e) => {
        e.preventDefault();
        const taskName = document.getElementById('projectName');
        UI.projects.addProjects(taskName.value);
        Storage.setStorage(UI.projects.projectList);
        const p = UI.projects.selectProject(taskName.value);
        UI.renderProject(p);
        this.renderProjectList();
        projectForm.reset();
        projectForm.classList.remove('show');
      },
      false
    );
  }

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
          UI.projects.updateProjects(projectName, input.value);
          Storage.setStorage(this.projects.projectList);
          UI.renderProjectList();
          if (projectName) {
            projectName = input.value;
            UI.renderProject(UI.projects.selectProject(projectName));
          }
          modal.reset();
        });
      });
    });
  }

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
        Storage.setStorage(this.projects.projectList);

        UI.renderProjectList();
        TaskRenderer.countTasksByTag(UI.projects.getAllTasks(), UI.projects.filterTodays(), UI.projects.filterThisWeek());
      });
    });
  }

  static renderProjectList() {
    const projectList = UI.projects.projectList;

    generateProjectList(projectList);

    UI.UpdateProjectController();
    UI.deleteProjectController();
    UIEventHandler.closeSidebar();
  }

  static setActiveProject() {
    const projectsNames = document.querySelectorAll('.title');
    projectsNames.forEach((name) => {
      name.addEventListener(
        'click',
        () => {
          const projectName = name.textContent;
          const project = UI.projects.selectProject(projectName);
          Storage.setStorage(UI.projects.projectList);
          UI.renderProject(project);
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
    <ul id="taskList"></ul>`;
    UIEventHandler.toggleForm2();
    UI.createTaskConroller();

    if (project.todos.length > 0) {
      TaskRenderer.render(project, UI.updateTaskController, UI.deleteTaskController);
    }
  }

  static createTaskConroller() {
    const taskForm = document.getElementById('taskForm');
    const projectName = document.querySelector('.pt').textContent;
    const form = document.querySelector('.form-container');
    const activeProject = UI.projects.selectProject(projectName);
    taskForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const title = document.getElementById('taskName2');
      const dt = document.getElementById('taskDate');
      const date = new Date(dt.value).toDateString();
      const priority = document.getElementById('select');
      activeProject.addTodo(title.value, priority.value, date);
      Storage.setStorage(UI.projects.projectList);
      TaskRenderer.render(activeProject, UI.updateTaskController, UI.deleteTaskController);
      UI.renderProjectList();
      taskForm.reset();
      form.style.display = 'none';
      TaskRenderer.countTasksByTag(UI.projects.getAllTasks(), UI.projects.filterTodays(), UI.projects.filterThisWeek());
    });
  }

  static updateTaskController(obj) {
    const statusBtns = document.querySelectorAll('.status-btn');

    statusBtns.forEach((btn) => {
      btn.addEventListener('click', (e) => {
        const projectName = e.target.dataset.key;
        let activeProject = UI.projects.selectProject(projectName);
        const taskName = e.target.dataset.val;
        console.log(taskName);
        activeProject.updateStatus(taskName);
        Storage.setStorage(UI.projects.projectList);
        activeProject = obj;
        TaskRenderer.render(activeProject, UI.updateTaskController, UI.deleteTaskController);
      });
    });
  }

  static deleteTaskController(obj) {
    const tasksBtns = document.querySelectorAll('.delete-task');
    tasksBtns.forEach((btn) => {
      btn.addEventListener('click', (e) => {
        const projectName = e.target.dataset.key;
        let activeProject = UI.projects.selectProject(projectName);
        const taskName = e.target.dataset.val;
        activeProject.deleteTodo(taskName);
        Storage.setStorage(UI.projects.projectList);
        switch (obj.name) {
          case 'all':
            activeProject = UI.projects.getAllTasks();
            TaskRenderer.render(activeProject, UI.updateTaskController, UI.deleteTaskController);
            break;
          case 'today':
            activeProject = UI.projects.filterTodays();
            TaskRenderer.render(activeProject, UI.updateTaskController, UI.deleteTaskController);
            break;
          case 'week':
            activeProject = UI.projects.filterThisWeek();
            TaskRenderer.render(activeProject, UI.updateTaskController, UI.deleteTaskController);
            break;
          default:
            activeProject = obj;
            TaskRenderer.render(activeProject, UI.updateTaskController, UI.deleteTaskController);
            break;
        }
        TaskRenderer.countTasksByTag(UI.projects.getAllTasks(), UI.projects.filterTodays(), UI.projects.filterThisWeek());
      });
    });
  }
}
