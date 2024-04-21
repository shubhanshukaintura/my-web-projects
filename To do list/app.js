const taskcontainer=document.querySelectorAll("div")[2];
const btn=document.querySelector("button");

const changestatus= (evt)=>{
    let p=evt.target.parentElement.querySelector("p");
    if(evt.target.src.endsWith("incomplete.png")){
        evt.target.src="images/complete.png";
        p.style.textDecoration="line-through";
    }else{
        evt.target.src="images/incomplete.png";
        p.style.textDecoration="none";
    }
    saveData();
}

const deletetask = (evt)=>{
    let task=evt.target.parentElement.parentElement;
    task.remove();
    saveData();
};

const addNewTask = ()=>{
    let task=document.querySelector("input");
    if(task.value===""){
        alert("Please Enter a Task");
    }else{
        let incompimg=document.createElement("img");
        let p=document.createElement("p");
        let delimg=document.createElement("i");
        incompimg.src="images/incomplete.png";
        incompimg.addEventListener("click",(evt)=>{
            changestatus(evt);
        });
        p.innerText=task.value;
        delimg.className="fa-solid fa-xmark";
        delimg.addEventListener("click",(evt)=>{
            deletetask(evt);
        });
        let tasks=document.createElement("div");
        let taskcheck=document.createElement("div");
        let taskdelete=document.createElement("div");
        tasks.className="tasks";
        taskcheck.className="task-check";
        taskdelete.className="task-delete";
        taskcheck.append(incompimg,p);
        taskdelete.append(delimg);
        tasks.append(taskcheck,taskdelete);
        taskcontainer.append(tasks);
        task.value="";
        saveData();
    }
};

btn.addEventListener("click",()=>{
    addNewTask();
})

window.addEventListener("keypress", (evt)=>{
    if(evt.key==="Enter"){
        addNewTask();
    }
});

function saveData(){
    localStorage.setItem("data",taskcontainer.innerHTML);
}

function showData(){
    taskcontainer.innerHTML=localStorage.getItem("data");
}
showData();