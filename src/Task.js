/* eslint-disable default-param-last */
export default class Task {
  constructor(name, priority = 'normal', projectKey, date, status = false) {
    this.name = name;
    this.status = status;
    this.priority = priority;
    this.date = date;
    this.projectKey = projectKey;
  }
}
