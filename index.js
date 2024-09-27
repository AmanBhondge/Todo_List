let tolistcontEl = document.getElementById("tolistcont");
let userTodoEl = document.getElementById("userTodo");
let paraEl = document.getElementById("para");



function getTodoFromLOcalStorage() {

    let todoFromLocalStorage = localStorage.getItem("myTodoList");

    if (todoFromLocalStorage === null) {
        return [];

    }
    else {

        let parsedTodo = JSON.parse(todoFromLocalStorage);
        return parsedTodo;
    }
}

let todolist = getTodoFromLOcalStorage();

function onCTodoStatusChange(titleId, checkBoxId, todoId) {

    let myTitleEl = document.getElementById(titleId);
    let myCheckBoxEl = document.getElementById(checkBoxId);


    if (myCheckBoxEl.checked == true) {

        myTitleEl.classList.add("checked");
    }
    else {

        myTitleEl.classList.remove("checked");
    }

    function findIndex(e) {

        return e.id === todoId;
    }

    let changedIndex = todolist.findIndex(findIndex);

    if (todolist[changedIndex].isChecked === false) {

        todolist[changedIndex].isChecked = true;
    }
    else {

        todolist[changedIndex].isChecked = false;

    }

}

function onTodoDelete(mainId) {
    let todoId = "myTodo" + mainId;
    let myTodoEl = document.getElementById(todoId);

    tolistcontEl.removeChild(myTodoEl);
    // Find the index of the todo object in the array
    let index = todolist.findIndex(todo => todo.id == mainId);


    // Remove the todo object from the array
    if (index !== -1) {
        todolist.splice(index, 1);
    }



}

function createAndApendTodo(todo) {

    let checkBoxId = "mycheckbox" + todo.id;
    let titleId = "mytitle" + todo.id;
    let todoId = "myTodo" + todo.id;

    let listContEl = document.createElement("li");
    listContEl.classList.add("list-cont-todo");
    listContEl.id = todoId;
    tolistcontEl.appendChild(listContEl);

    let checkBoxEl = document.createElement("input");
    checkBoxEl.type = "checkbox";
    checkBoxEl.id = checkBoxId;
    if (todo.isChecked === true) {

        checkBoxEl.checked = true;

    }
    checkBoxEl.onclick = function () {
        onCTodoStatusChange(titleId, checkBoxId, todo.id);
    };
    listContEl.appendChild(checkBoxEl);

    let lebelEl = document.createElement("label");
    lebelEl.classList.add("label-cont");
    lebelEl.htmlFor = checkBoxId;
    listContEl.appendChild(lebelEl);

    let titleEl = document.createElement("h5");
    titleEl.textContent = todo.title;
    titleEl.id = titleId;
    if (todo.isChecked === true) {

        titleEl.classList.add("checked");

    }
    lebelEl.appendChild(titleEl);

    let deleteBtnEl = document.createElement("button");
    deleteBtnEl.classList.add("delete-btn");
    deleteBtnEl.onclick = function () {
        onTodoDelete(todo.id);
    }
    lebelEl.appendChild(deleteBtnEl);

    let deleteIconEl = document.createElement("i");
    deleteIconEl.classList.add("fa-solid", "fa-trash");
    deleteBtnEl.appendChild(deleteIconEl);

}

for (let todo of todolist) {

    createAndApendTodo(todo);

}

let todoListLength = todolist.length;

function onAddNewTodo() {

    let userInValue = userTodoEl.value;
    if (userInValue == "") {

        paraEl.textContent = "Please enter valid input!!!!";
    }
    else {
        todoListLength = todoListLength + 1;

        paraEl.textContent = "";

        let newTodo = {

            title: userInValue,
            id: todoListLength,
            isChecked: false

        }

        createAndApendTodo(newTodo);

        todolist.push(newTodo);
        userTodoEl.value = "";
    }



}


function onSaveTodo(todoId) {


    let stringyfyTodo = JSON.stringify(todolist);
    localStorage.setItem("myTodoList", stringyfyTodo);

}
