const taskInput=document.querySelector(".new-task");//Add a new task.
const addButton=document.querySelector(".add_button");//first button
const incompleteTaskHolder=document.querySelector(".main_item_incompleted_element");//ul of #incompleteTasks
const completedTasksHolder=document.querySelector(".main_item_completed_element");//completed-tasks

function createNewTaskElement(taskString){    

    const listItem=document.createElement("li");
    const checkBox=document.createElement("input");//checkbx
    const label=document.createElement("label");//label
    const editInput=document.createElement("input");//text
    const editButton=document.createElement("button");//edit button
    const deleteButton=document.createElement("button");//delete button
    const deleteButtonImg=document.createElement("img");//delete button image

    label.innerText=taskString;
    label.className='task';

    checkBox.type="checkbox";
    editInput.type="text";
    editInput.className="task";

    editButton.innerText="Edit"; //innerText encodes special characters, HTML does not.
    editButton.className="edit";

    deleteButton.className="delete";
    deleteButtonImg.src="./remove.svg";
    deleteButton.appendChild(deleteButtonImg);

    listItem.appendChild(checkBox);
    listItem.appendChild(label);
    listItem.appendChild(editInput);
    listItem.appendChild(editButton);
    listItem.appendChild(deleteButton);
    return listItem;
}

function addTask() {
    console.log("Add Task...");
    if (!taskInput.value) {
        return;  
    }
    const listItem=createNewTaskElement(taskInput.value);
    incompleteTaskHolder.appendChild(listItem);
    bindTaskEvents(listItem, taskCompleted);
    taskInput.value="";
}

function editTask(){
    console.log("Edit Task...");
    console.log("Change 'edit' to 'save'");
    const listItem=this.parentNode;
    const editInput=listItem.querySelector("input[type=text]");
    const label=listItem.querySelector("label");
    const editBtn=listItem.querySelector(".edit");
    const containsClass=listItem.classList.contains("incomplited_element_editMode");
    if(containsClass){
        label.innerText=editInput.value;
        editBtn.innerText="Edit";
    }else{
        editInput.value=label.innerText;
        editBtn.innerText="Save";
    }

    listItem.classList.toggle("incomplited_element_editMode"); 
};

function deleteTask(){
    console.log("Delete Task...");
    const listItem=this.parentNode;
    const ul=listItem.parentNode;
    ul.removeChild(listItem);
} 

function taskCompleted(){
    console.log("Complete Task...");
    const listItem=this.parentNode;
    completedTasksHolder.appendChild(listItem);
    bindTaskEvents(listItem, taskIncomplete);
}


function taskIncomplete() {
    console.log("Incomplete Task...");
    const listItem=this.parentNode;
    incompleteTaskHolder.appendChild(listItem);
    bindTaskEvents(listItem,taskCompleted);
}

function ajaxRequest() {
    console.log("AJAX Request");
}

addButton.addEventListener("click",addTask);
/*addButton.addEventListener("click",ajaxRequest);*/


function bindTaskEvents(taskListItem,checkBoxEventHandler) {
    console.log("bind list item events");
    const checkBox=taskListItem.querySelector("input[type=checkbox]");
    const editButton=taskListItem.querySelector("button.edit");
    const deleteButton=taskListItem.querySelector("button.delete");
    editButton.onclick=editTask;
    deleteButton.onclick=deleteTask;
    checkBox.onchange=checkBoxEventHandler;
}

for (let i=0; i<incompleteTaskHolder.children.length;i++){
    bindTaskEvents(incompleteTaskHolder.children[i],taskCompleted);
}

for (var i=0; i<completedTasksHolder.children.length;i++){
    bindTaskEvents(completedTasksHolder.children[i],taskIncomplete);
}
