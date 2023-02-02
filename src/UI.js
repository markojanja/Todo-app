import ProjectList from "./ProjectsList";

export default class UI {

    static loadUI(){
        UI.projectFormHandler()
        UI.render()
    }
    static projects = new ProjectList()

    static projectFormHandler(){
        const myForm = document.getElementById('myForm')
        myForm.addEventListener("submit", (e)=>{
            e.preventDefault()
            const title = document.getElementById('taskName').value
            UI.projects.addProjects(title)
            this.render()
            myForm.reset()
        },false)
}

static render(){
    const list = document.getElementById('list')
    list.innerHTML=""
    UI.projects.projectList.map(project=>{
        list.innerHTML +=`<h1 class="title">${project.name}</h1>`
    })
    
    // UI.projects.listProjects.map(project=>{
    //     console.log(project.name)
    // })
}
}