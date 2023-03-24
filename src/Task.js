export default class Task{
    constructor(name,priority='normal'){
        this.name = name
        this.status = false
        this.priority = priority
    }
}