const myForm = document.querySelector('#task-form');
const myFilter = document.getElementById('filter');
const myClearBtn = document.querySelector('.clear-task');
const myTasks = document.getElementById('task');
const myUl = document.querySelector('.collection');

LoadEventListeners();

function LoadEventListeners() {
    document.addEventListener('DOMContentLoaded', getTasks);
    myForm.addEventListener('submit', addTask);
    myUl.addEventListener('click', removeTask);
    myClearBtn.addEventListener('click', clearTasks);
    myFilter.addEventListener('keyup', filterTasks);
}

function addTask(e) {
    if (myTasks.value === '') {
        alert('Add a task!');
    } else {
        const li = document.createElement('li');
        li.className = 'collection-item';
        li.appendChild(document.createTextNode(myTasks.value))
        const link = document.createElement('a');
        link.className = 'delete-item secondary-content';
        link.innerHTML = '<i class="fa fa-remove" />'
        li.appendChild(link);
        myUl.appendChild(li);

        storeTaskInLocalStorage(myTasks.value);

        myTasks.value = '';
        // Add it to the local storage

        function storeTaskInLocalStorage(task) {
            let tasks;

            if (localStorage.getItem('tasks') === null) {
                tasks = [];
            } else {
                tasks = JSON.parse(localStorage.getItem('tasks'));
            }
            tasks.push(myTasks.value);
            localStorage.setItem('tasks', JSON.stringify(tasks));
        }

    }

    e.preventDefault();
}

function removeTask(e) {
    let allTasks;
    allTasks = JSON.parse(localStorage.getItem('tasks'));
    if (e.target.parentElement.classList.contains('delete-item')) {
        if (confirm(`Are you sure you want to delete ${e.target.parentElement.parentElement.textContent}?`)) {
            e.target.parentElement.parentElement.remove();
            removeTaskFromLS(e.target.parentElement.parentElement);
        }
    }
}

function removeTaskFromLS(myItem) {
    let tasks;
    if (localStorage.getItem('tasks') === null) {
        tasks = [];
    } else {
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }

    tasks.forEach(function(task, index) {
        if (myItem.textContent === task) {
            tasks.splice(index, 1);
        }
    });
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

function clearTasks(e) {
    while (myUl.firstChild) {
        myUl.removeChild(myUl.firstChild);
    }
    localStorage.clear();
}

function filterTasks(e) {
    const text = e.target.value.toLowerCase();

    document.querySelectorAll('.collection-item').forEach(function(task, index) {
        const item = task.firstChild.textContent;
        if (item.toLowerCase().indexOf(text) != -1) {
            task.style.display = 'block';
        } else {
            task.style.display = 'none';
        }

    })

}

function getTasks(e) {

    let allTasks;
    allTasks = JSON.parse(localStorage.getItem('tasks'));
    allTasks.forEach(function(task) {
        const li = document.createElement('li');
        li.className = 'collection-item';
        li.appendChild(document.createTextNode(task));
        const link = document.createElement('a');
        link.className = 'delete-item secondary-content';
        link.innerHTML = '<i class="fa fa-remove" />'
        li.appendChild(link);
        myUl.appendChild(li);
    })
};