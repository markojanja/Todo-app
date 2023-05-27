import Project from "./Project"
import Task from "./Task";
import { isThisWeek,isToday } from "date-fns"


export default class ProjectList{
    constructor() {
        this.projectList = [];
        const storedProjects = JSON.parse(localStorage.getItem('ok'));
      
        if (storedProjects) {
          storedProjects.forEach(projectData => {
            const project = new Project(projectData.name);
      
            projectData.todos.forEach(todoData => {
              const task = new Task(todoData.name, todoData.priority, projectData.name, todoData.date);
              project.todos.push(task);
            });
      
            project.updateStatus = function(title) {
              this.todos.find(todo => {
                if (todo.name === title) {
                  todo.status = !todo.status;
                }
              });
            };
      
            this.projectList.push(project);
          });
        }
      }
      
    addProjects(name){
        const project = new Project(name)

        this.projectList.push(project)
    }
    deleteProjects(projectName){
        const index = this.projectList.findIndex(project => {
            return project.name === projectName
        })
        this.projectList.splice(index, 1)
    }
    updateProjects(projectName,newProjectName){
        const project = this.projectList.find(project=>{
            return projectName === project.name
        })
        project.todos.forEach(todo=>{
          todo.projectKey = newProjectName
        })
        project.name = newProjectName       
        return project
    }

    selectProject(name){
        const project = this.projectList.find(project=>{
            return name === project.name
        })

        return project
    }

    getAllTasks(){
      let arrr = []
      this.projectList.forEach(project=>{
        arrr = project.todos.concat(arrr)
        })

        return {name:"all",todos:arrr}
    }

    filterTodays(){

        const completedTasks = this.projectList.reduce((acc, curr) => {
          const completed = curr.todos.filter(task => isToday(new Date(task.date)));
          return acc.concat(completed);
        }, []);
        
        return {name:"today" ,todos:completedTasks}
        
      }

    filterThisWeek(){
        const thisWeek = this.projectList.reduce((acc,curr)=>{
            const result = curr.todos.filter(task=> isThisWeek(new Date(task.date)));
            return acc.concat(result)

        },[])

        return {name:'week',todos:thisWeek}
    }  

 
}