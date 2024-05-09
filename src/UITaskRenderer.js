import { generateTaskList, resetTasksView, countTasks } from './helper';

export default class TaskRenderer {
  static render(obj, updateTask, deleteTask) {
    generateTaskList(obj.todos);
    updateTask(obj);
    deleteTask(obj);
  }

  static renderAllTasks(obj, updateTask, deleteTask) {
    const allTasksBtn = document.getElementById('all');

    allTasksBtn.addEventListener('click', () => {
      resetTasksView('All');
      const all = obj;
      countTasks('all', all);
      TaskRenderer.render(all, updateTask, deleteTask);
    });
  }

  static renderTodaysTasks(obj, updateTask, deleteTask) {
    const today = document.getElementById('today');
    today.addEventListener('click', () => {
      resetTasksView('Todays');
      const todays = obj;
      countTasks('today', todays);
      TaskRenderer.render(todays, updateTask, deleteTask);
    });
  }

  static renderThisWeek(obj, updateTask, deleteTask) {
    const weekBtn = document.getElementById('week');

    weekBtn.addEventListener('click', () => {
      resetTasksView('Week');
      const week = obj;
      TaskRenderer.render(week, updateTask, deleteTask);
    });
  }

  static countTasksByTag(allTasks, todaysTasks, weekTasks) {
    countTasks('all', allTasks);
    countTasks('today', todaysTasks);
    countTasks('week', weekTasks);
  }
}
