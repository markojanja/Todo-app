import { isThisWeek, isToday } from 'date-fns';
import Project from './Project';
import Task from './Task';
import Storage from './Storage';

export default class ProjectList {
  constructor() {
    this.projectList = [];
    const storedProjects = Storage.getStorage();

    console.log(storedProjects);

    if (storedProjects) {
      storedProjects.forEach((projectData) => {
        const project = new Project(projectData.name);

        projectData.todos.forEach((todoData) => {
          const task = new Task(
            todoData.name,
            todoData.priority,
            projectData.name,
            todoData.date,
            todoData.status
          );

          project.todos.push(task);
        });

        this.projectList.push(project);
      });
    }
  }

  addProjects(name) {
    const project = new Project(name);

    this.projectList.push(project);
  }

  deleteProjects(projectName) {
    const index = this.projectList.findIndex(
      (project) => project.name === projectName
    );
    this.projectList.splice(index, 1);
  }

  updateProjects(projectName, newProjectName) {
    const project = this.projectList.find(
      (project) => projectName === project.name
    );
    project.todos.forEach((todo) => {
      todo.projectKey = newProjectName;
    });
    project.name = newProjectName;
    return project;
  }

  selectProject(name) {
    const project = this.projectList.find((project) => name === project.name);

    return project;
  }

  getAllTasks() {
    let arrr = [];
    this.projectList.forEach((project) => {
      arrr = project.todos.concat(arrr);
    });

    return { name: 'all', todos: arrr };
  }

  filterTodays() {
    const completedTasks = this.projectList.reduce((acc, curr) => {
      const completed = curr.todos.filter((task) =>
        isToday(new Date(task.date))
      );
      return acc.concat(completed);
    }, []);

    return { name: 'today', todos: completedTasks };
  }

  filterThisWeek() {
    const thisWeek = this.projectList.reduce((acc, curr) => {
      const result = curr.todos.filter(
        (task) =>
          isThisWeek(new Date(task.date)) && !isToday(new Date(task.date))
      );
      return acc.concat(result);
    }, []);

    return { name: 'week', todos: thisWeek };
  }
}
