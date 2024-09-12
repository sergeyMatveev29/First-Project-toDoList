"use strict"
const main = document.getElementById('tasks');
const tasks = document.getElementsByClassName('task');
const checkInput = document.getElementsByClassName('checkInput');
const textArea = document.getElementsByClassName('textarea');
const chosenColor = document.getElementsByClassName('chosen')
const addTask = document.getElementById('addtask');
const deliteChecked = document.getElementById('deliteChecked');
const deliteAll = document.getElementById('deliteAll');
const header = document.getElementById('header');
let root = document.querySelector(':root');
const night = document.getElementById('darkMode');
const colors = {
   orangeMode : "#FFB28B",
   pinkMode : "#FFC1CC",
   lavenderMode : "#CCCCFF",
   blueMode : "#C5E3F6",
   greenMode : "#E0F9B5",
   yellowMode : "#FFFC8B",
   originalMode : "#ffffff",
}

addTask.addEventListener("click", createNewTask, false);
function createNewTask() {
   const newTask = tasks[0].cloneNode(true);
   newTask.classList.remove("zero");
   newTask.firstElementChild.innerHTML = tasks.length  + ".";
   newTask.lastElementChild.id = tasks.length;
   main.appendChild(newTask);
   newTask.addEventListener('mouseenter', reveal, false);
   newTask.addEventListener('mouseleave', hide, false);
   newTask.firstElementChild.nextElementSibling.addEventListener('keyup', saveData);
   saveData();
}

main.onclick = function(event) {
   let target = event.target;
   if (target.tagName === 'BUTTON') {
      deleteTask(target);
   } else if (target.tagName === 'INPUT') {
      crossOut(target);
   } else {
      return;
   }
}

function deleteTask(trashBox) {
   const trashBoxId = trashBox.id;
   const task = tasks[trashBoxId];
   main.removeChild(task);
   for (let i = 0; i < tasks.length; i++) {
      tasks[i].firstElementChild.innerHTML = i + ".";
      tasks[i].lastElementChild.id = i;
   }
   saveData();
}

function crossOut(check) {
   const checkBox = check.closest('div');
   const textArea = checkBox.previousElementSibling;
   if (check.checked) {
      check.setAttribute('checked', true);
      textArea.style.textDecoration = "line-through";
   } else {
      textArea.style.textDecoration = "none";
      check.removeAttribute('checked', true);
   }
   saveData();
}

deliteAll.addEventListener("click", deleteAll);
function deleteAll() {
   if (tasks.length > 1) {
   if (confirm("Are you sure you what to delete all tasks?")) {
   for (let i = tasks.length - 1; i > 0; i--) {
      main.removeChild(tasks[i]);
   }} else {return}} else {return}
   saveData();
}

header.addEventListener('click', colorChange, false);
function colorChange(clicked) {
   let colorBtn = clicked.target;
   if(colorBtn.classList.contains('colorbtn')) {
   chosenColor[0].classList.remove("chosen");
   colorBtn.classList.add('chosen');
   nightMode();
   } else {
      return
   }
}

night.addEventListener('click', nightMode, false);
function nightMode() {
   let chosen = chosenColor[0];
   let chosenId = chosen.id;
   if (night.checked) {
      root.style.setProperty("--gradient-color1", colors[chosenId]);
      root.style.setProperty("--font-color1", colors[chosenId]);
      root.style.setProperty("--background-color1", '#212121');
      localStorage.setItem('mode', "checked");
   } else {
      root.style.setProperty("--gradient-color1", "rgb(0, 0, 0)");
      root.style.setProperty("--font-color1", "rgb(0, 0, 0)");
      root.style.setProperty("--background-color1", colors[chosenId]);
      localStorage.setItem('mode', "unchecked");
   }
   localStorage.setItem('theme', chosenColor[0].id);
} 

deliteChecked.addEventListener('click', deleteCheck, false);
function deleteCheck() {
   for (let i = checkInput.length - 1; i > 0; i--) {
      if (checkInput[i].checked) {
         main.removeChild(tasks[i]);
      }
   for (let i = 0; i < tasks.length; i++) {
         tasks[i].firstElementChild.innerHTML = i + ".";
         tasks[i].lastElementChild.id = i;
      }
   }
   saveData();
}

function reveal(event) {
   const trashBox = event.currentTarget.lastElementChild;
   trashBox.classList.add('slide-in');
   trashBox.classList.remove('slide-out');
}
function hide(event) {
   const trashBox = event.currentTarget.lastElementChild;
   trashBox.classList.remove('slide-in');
   trashBox.classList.add('slide-out');
}

function saveData() {
   localStorage.setItem('data', main.innerHTML);
}

function loadData() {
   themeSet();
   if (localStorage.getItem('mode') === "checked") {
      night.click();
   } else {
      nightMode();
   }
   if (localStorage.getItem('data') != null) {
   main.innerHTML = localStorage.getItem('data');
   } else {return}
}

function themeSet() {
   if (localStorage.getItem('theme') != null) {
   let colorBtn = localStorage.getItem('theme');
   const theme = document.getElementById(colorBtn);
   if (chosenColor[0].id != colorBtn) {
      chosenColor[0].classList.remove("chosen");
      theme.classList.add('chosen');
   }
} else {return}
}

loadData();

for (let i = 0; i < tasks.length; i++) {
   tasks[i].addEventListener('mouseenter', reveal, false);
   tasks[i].addEventListener('mouseleave', hide, false);
   tasks[i].firstElementChild.nextElementSibling.addEventListener('keyup', saveData);
   }
