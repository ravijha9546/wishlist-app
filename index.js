let todoInput = document.querySelector(".input");
let todoButton = document.querySelector(".button");
let todoContainer = document.querySelector(".todos-container");
let todo;
let localData = JSON.parse(localStorage.getItem("todo"));
let todoList = Array.isArray(localData)?localData : [];

function generateCustomUuid() {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
    const r = Math.random() * 16 | 0;
    const v = c === 'x' ? r : (r & 0x3 | 0x8);
    return v.toString(16);
  });
}



todoButton.addEventListener("click", (e)=>{
    let isAdded=false;
    e.preventDefault();
    todo=todoInput.value;
    if(todo.length === 0)alert("Please enter a value")
    for(let i=0;i<todoList.length;i++){
        if(todo==todoList[i].todo){
            isAdded=true;
            alert("Wishlist already added");
        }
    }
         if(!isAdded && todo.length>0){
        todoList.push({id:generateCustomUuid(), todo, isCompleted:false});
        
    }
    localStorage.setItem("todo",JSON.stringify(todoList))
    
    if(!isAdded && todo.length>0)renderToDoList(todoList);   
})
console.log(todoList)
todoContainer.addEventListener("click",(e)=>{
    let key = e.target.dataset.key;
    let delKey= e.target.dataset.todokey;
    todoList = todoList.map(todo => todo.id === key ? {...todo ,isCompleted:!todo.isCompleted}:todo);
    todoList = todoList.filter (todo => todo.id !== delKey);
    localStorage.setItem("todo", JSON.stringify(todoList));
    
    renderToDoList(todoList);
})

function renderToDoList(todoList){
    console.log(todoList);
    todoContainer.innerHTML = todoList.map(({id,todo,isCompleted})=>
    `<div class="relative">
          <input id="item-${id}" type="checkbox" data-key=${id} ${isCompleted?"checked":""}/>
          <label class="todo tood-text t-pointer ${isCompleted?"checked-todo": ""}">${todo}</label>
          <button id="item-${id}" data-todokey=${id} class="t-pointer absolute right-0">Delete</button>
    </div>`)    
}
renderToDoList(todoList);




