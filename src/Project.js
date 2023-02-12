import Task from "./Task";

export default class Project{
    constructor(name){
        this.name = name;
        this.todos = [];
    }

    addTodo(name){
        const task = new Task(name)
        this.todos.push(task)
    }
    deleteTodo(title){
        const i  = this.todos.findIndex(todo=>{
           return todo.name === title
        })
        this.todos.splice(i,1)
    }
}