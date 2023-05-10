import Task from "./Task";

export default class Project{
    constructor(name){
        this.name = name;
        this.todos = [];
    }

    addTodo(name,priority){
        const task = new Task(name,priority,this.name)
        this.todos.push(task)
    }
    deleteTodo(title){
        const i  = this.todos.findIndex(todo=>{
           return todo.name === title
        })
        this.todos.splice(i,1)
    }
    updateStatus(title){
        this.todos.find(todo=>{
            if(todo.name===title){
               todo.status = !todo.status
            }
        })
    }
}