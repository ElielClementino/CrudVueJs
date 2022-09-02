var app = new Vue({
    el:'#app',
    data(){
        return{
            tasks:[],
            title:null,
            project:null,
            dueTo:null,
        }
    },
    methods: {
        getTasks() {
          fetch("http://localhost:3000/taks")
            .then((response) => response.json())
            .then((tasks) =>{
            console.log(tasks)
            this.tasks = tasks
        })},
    },
    created(){
        this.getTasks();
    },
});

function saveTask(task) {
  fetch(`http://localhost:3000/taks`, {
    method: 'POST',
    body: JSON.stringify({
      title: task.title,
      project: task.project,
      dueTo: new Date(task.dueTo).toISOString(),
    }),
    headers: {
      'Content-Type': 'application/json; charset=UTF-8',
    },
  })
    .then((res) => res.json())
    .then((newTask) => {
      console.log('DONE', newTask)
    })
    .catch((error) => {
      console.log('Erro adicionando task:', error)
    })
}