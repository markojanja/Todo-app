import Project from "./Project"


export default class ProjectList{
    constructor(){
        this.projectList = []
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
        project.name = newProjectName       
        return project
    }

    selectProject(name){
        const project = this.projectList.find(project=>{
            return name === project.name
        })

        return project
    }

 
}