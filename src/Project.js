export default class Project{
    constructor(name){
        this.name = name;
        this.todos = [];
    }

    addTodo(todo){
        this.todos.push(todo)
    }
    deleteTodo(title){
        const i  = this.todos.findIndex(todo=>{
           return todo.name === title
        })
        this.todos.splice(i,1)
    }
}