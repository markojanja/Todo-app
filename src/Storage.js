export default class Storage {
  static setStorage(project) {
    localStorage.setItem('projects', JSON.stringify(project));
  }
  static getStorage() {
    return JSON.parse(localStorage.getItem('projects'));
  }
}
