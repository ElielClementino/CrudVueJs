var app = new Vue({
    el:'#app',
    data:{
        tasks:[],
        newTask:{
        'title':null,
        'project':null,
        'dueTo':null,
        }
    },
    methods: {
        getTasks() {
          fetch("http://localhost:3000/tasks/")
            .then((response) => response.json())
            .then((data) =>{
            this.tasks = data;
        });
      },
        saveTask(){
          const taskData = {
            title:this.newTask.title,
            project:this.newTask.project,
            date:this.newTask.date,
          }
          fetch("http://localhost:3000/tasks/", {
            method: 'POST',
            headers: {'Content-Type' : 'application/json; charset=UTF-8'},
            body: JSON.stringify(taskData)
          }).then(() =>{
            this.getTasks()
          })
        },
        deleteTask(id) {
          fetch(`http://localhost:3000/tasks/${id}`, { method: "DELETE" });
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
