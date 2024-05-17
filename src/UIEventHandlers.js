export default class UIEventHandler {
  static toggleNav() {
    const navBtn = document.querySelector('.nav-btn');
    const sidebar = document.querySelector('.sidebar');
    const scr = window.matchMedia('(max-width: 768px)');
    if (scr.matches === false) return;
    navBtn.addEventListener('click', () => {
      navBtn.classList.toggle('active');
      sidebar.classList.toggle('toggle');
    });
  }

  static closeSidebar() {
    const navBtn = document.querySelector('.nav-btn');
    const sidebar = document.querySelector('.sidebar');
    const upperLinks = document.querySelectorAll('.project-link-upper');
    const scr = window.matchMedia('(max-width: 768px)');
    const projectLinks = document.querySelectorAll('.title');
    if (scr.matches === false) return;
    upperLinks.forEach((link) => {
      link.addEventListener('click', () => {
        navBtn.classList.remove('active');
        sidebar.classList.remove('toggle');
      });
    });

    projectLinks.forEach((link) => {
      link.addEventListener('click', () => {
        navBtn.classList.remove('active');
        sidebar.classList.remove('toggle');
      });
    });
  }

  static toggleProjectForm() {
    const toggleBtn = document.querySelector('.toggle-form');
    toggleBtn.addEventListener('click', () => {
      const form = document.getElementById('projectForm');
      form.classList.toggle('show');
    });
  }
  static toggleTaskForm() {
    const formBtn = document.querySelector('.toggle-form-2');
    const form = document.querySelector('.form-container');
    const errorSpan = document.querySelector('.error');
    formBtn.addEventListener('click', () => {
      errorSpan.style.display = 'none';
      form.style.display = 'flex';
      const clsBtn = document.querySelector('.close-form-btn');
      const taskForm = document.getElementById('taskForm');
      clsBtn.addEventListener('click', () => {
        taskForm.reset();
        form.style.display = 'none';
      });
    });
  }
}
