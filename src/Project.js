/* eslint-disable no-param-reassign */
import Task from './Task';

export default class Project {
  constructor(name) {
    this.name = name;
    this.todos = [];
  }

  addTodo(name, priority, date) {
    const task = new Task(name, priority, this.name, date);
    this.todos.push(task);
  }

  deleteTodo(title) {
    const i = this.todos.findIndex((todo) => todo.name === title);
    this.todos.splice(i, 1);
  }

  updateStatus(title) {
    this.todos.find((todo) =>
      todo.name === title ? (todo.status = !todo.status) : false
    );
  }
}
