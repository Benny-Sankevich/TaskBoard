//saving the date and 
function saveTask() {
    const taskBox = document.getElementById("taskBox");
    const dateBox = document.getElementById("dateBox");
    const timeBox = document.getElementById("timeBox");
    //take task values
    let taskMessage = taskBox.value;
    let date = dateBox.value;
    let time = timeBox.value;
    //Validation
    if (taskMessage == "" || taskMessage.replace(/\s+/g, '').length == 0) {
        alert("Insert Message Task");
        taskBox.focus();
        return;
    }
    if (date == "") {
        alert("Choose Date");
        dateBox.focus();
        return;
    }
    // create task object
    const task = { taskMessage, date, time };
    //load all tasks from local storage
    let allTasks = [];
    let allTasksJsonString = localStorage.getItem("allTasks");
    if (allTasksJsonString != null) {
        allTasks = JSON.parse(allTasksJsonString);
    }
    //add the new task to the array
    allTasks.push(task);
    // save the new array back to local storage
    allTasksJsonString = JSON.stringify(allTasks);
    localStorage.setItem("allTasks", allTasksJsonString);

    displayOneTask(allTasks.length - 1);

    taskBox.value = "";
    dateBox.value = "";
    timeBox.value = "";
    taskBox.focus();
}

function displayAllTasks() {
    const container = document.getElementById("container");
    //load all books from local storage
    let allTasks = [];
    let allTasksJsonString = localStorage.getItem("allTasks");
    if (allTasksJsonString != null) {
        allTasks = JSON.parse(allTasksJsonString);
    }
    container.innerHTML = "";

    for (let i = 0; i < allTasks.length; i++) {
        displayOneTask(i);
    }
}

//display new task 
function displayOneTask(i) {
    const container = document.getElementById("container");
    //load all books from local storage
    let allTasks = [];
    let allTasksJsonString = localStorage.getItem("allTasks");
    if (allTasksJsonString != null) {
        allTasks = JSON.parse(allTasksJsonString);
    }
    //create new div
    const div = document.createElement("div");
    div.setAttribute("class", "card");
    div.setAttribute("id", `${i}`);
    div.setAttribute("onmouseenter", "showX(this)");
    div.setAttribute("onmouseleave", "deleteX(this)");
    //create div for data and div for date and time
    const div1 = document.createElement("div");
    const div2 = document.createElement("div");
    //Income of  tesk message information to div1
    div1.setAttribute("class", "taskData")
    div1.innerHTML = `${allTasks[i].taskMessage}`;
    //Income of  date and time   to div2
    div2.setAttribute("class", "dateAndTime")
    div2.innerHTML = `${allTasks[i].date}  <br> ${allTasks[i].time}`;
    // add div date and time to main div
    div.appendChild(div1);
    div.appendChild(div2);
    // add div to container 
    container.appendChild(div);
}

//function for delete when user click on delete icon
function deleteTask() {

    event.currentTarget.parentElement.remove();
    const index = event.currentTarget.parentElement.id;
    let allTasks = [];
    let allTasksJsonString = localStorage.getItem("allTasks");
    if (allTasksJsonString != null) {
        allTasks = JSON.parse(allTasksJsonString);
    }
    //delete massage date
    allTasks.splice(index, 1);
    // input array to jason and string to local storage
    const allTaskJson = JSON.stringify(allTasks);
    localStorage.setItem("allTasks", allTaskJson);
    //if array is null clear local storage
    if (allTasks.length < 1) {
        localStorage.clear();
    }
    //Reinstallation of the index
    const container = document.getElementsByClassName("card");
    for (let i = 0; i < container.length; i++) {
        container[i].setAttribute("id", `${i}`);
    }
}

// function to show x button where onmouseenter
function showX(task) {
    const x = `<svg width="22px" height="22px" viewBox="0 0 16 16" class="bi bi - x - svgClass square - fill" fill="currentColor" xmlns="http://www.w3.org/2000/svg"> <path fill-rule="evenodd" d="M2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2zm3.354 4.646a.5.5 0 1 0-.708.708L7.293 8l-2.647 2.646a.5.5 0 0 0 .708.708L8 8.707l2.646 2.647a.5.5 0 0 0 .708-.708L8.707 8l2.647-2.646a.5.5 0 0 0-.708-.708L8 7.293 5.354 4.646z" /></svg >`;
    const divButtonX = document.createElement("div");
    divButtonX.innerHTML = x;
    divButtonX.setAttribute("id", "xButton");
    divButtonX.setAttribute("onclick", "deleteTask()");
    task.appendChild(divButtonX);
}

//function to hide x button where onmouseleave
function deleteX(task) {
    const button = document.getElementById("xButton");
    (task.contains(button)) ? button.remove() : "";
}

//  When the page loads show box message 
displayAllTasks();