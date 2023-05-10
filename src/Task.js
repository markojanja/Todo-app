export default class Task{
    constructor(name,priority='normal',projectKey,date){
        this.name = name
        this.status = false
        this.priority = priority
        this.date = date
        this.projectKey = projectKey
    }
}