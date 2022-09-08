var app = new Vue({
    el:'#app',
    data:{
        tasks:[],
        newTask:{
        'title':null,
        'project':null,
        'dueTo':null,
        },
        styleEdit:{
          display:'none'
        },
        styleAdd:{
          display:'none'
        },
    },
    methods: {
        getTasks() {
          fetch("http://localhost:3000/tasks/")
            .then((response) => response.json())
            .then((data) =>{
            this.tasks = data;
        });
      },
        addTaskPrompt(){
          this.styleAdd.display = 'block'
        },
        saveTask(){
          const taskData = {
            title:this.newTask.title,
            project:this.newTask.project,
            dueTo:new Date(this.newTask.dueTo).toISOString(),
          }
          fetch("http://localhost:3000/tasks/", {
            method: 'POST',
            headers: {'Content-Type' : 'application/json; charset=UTF-8'},
            body: JSON.stringify(taskData)
          }).then(() =>{
            this.getTasks()
          }).then(()=>this.styleAdd.display = 'none')
        },
        deleteTask(id) {
          fetch(`http://localhost:3000/tasks/${id}`, { method: "DELETE" }).then(()=>{
            this.getTasks()
          })
        },
        
        getTask(id){
          this.styleEdit.display = 'block'
          const editing = this.tasks.filter((task) => task.id == id)[0];
          this.newTask.id = editing.id
          this.newTask.title = editing.title
          this.newTask.project = editing.project
          this.newTask.dueTo = editing.dueTo
        },
        editTask() {
          fetch(`http://localhost:3000/tasks/${this.newTask.id}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              title: this.newTask.title,
              project: this.newTask.project,
              dueTo: this.newTask.dueTo,
            }),
          }).then(() => {
            this.getTasks();
            this.styleEdit.display = 'none'
              })
        },
    },
    created(){
        this.getTasks();
    },
});








// editTask(id) {
//   fetch(`http://localhost:3000/tasks/${id}`, {
//     method: 'PUT',
//     headers: {
//       'Content-Type': 'application/json'
//     },
//     body: JSON.stringify(this.newTask)
//   })
//     .then((data) =>{
//       response.text()
//     })
// },
