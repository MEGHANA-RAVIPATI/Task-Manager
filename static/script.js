async function loadTasks(){

    let response = await fetch('/get');

    let data = await response.json();

    let tasksDiv = document.getElementById("tasks");

    tasksDiv.innerHTML = "";

    for(let i = 0; i < data.length; i++){

        let task = data[i];

        let div = document.createElement("div");

        div.classList.add("task");

        div.innerHTML = `

            <div class="left">

                <span class="${task.done ? 'done' : ''}">
                    ${task.task}
                </span>

            </div>

            <div>

                <button class="done-btn"
                onclick="doneTask(${i})">
                    Done
                </button>

                <button class="delete-btn"
                onclick="deleteTask(${i})">
                    Delete
                </button>

            </div>
        `;

        tasksDiv.appendChild(div);
    }
}


async function addTask(){

    let task = document.getElementById("task").value;

    if(task == ""){
        alert("Enter a task");
        return;
    }

    await fetch('/add', {

        method:'POST',

        headers:{
            'Content-Type':'application/json'
        },

        body: JSON.stringify({
            task:task
        })
    });

    document.getElementById("task").value = "";

    loadTasks();
}


async function deleteTask(index){

    await fetch(`/delete/${index}`, {
        method:'DELETE'
    });

    loadTasks();
}


async function doneTask(index){

    await fetch(`/done/${index}`, {
        method:'PUT'
    });

    loadTasks();
}


loadTasks();