let input = document.getElementById('input-Box');
let button = document.getElementById('btn');
let listContainer = document.getElementById('task');
let count = document.getElementById('taskCount');
button.addEventListener('click', () => {
    addTask();
})
function showCount(num) {
    itemCount += num;
    count.innerText = itemCount;
    saveCount();

}
function addTask() {
    if (input.value === '') {
        alert("You must write something!")
    }
    else {
        let li = document.createElement("li");
        li.innerHTML = input.value;
        listContainer.appendChild(li);
        input.value = '';
        let button = document.createElement("button");
        li.appendChild(button);
        let img = document.createElement("img");
        img.src = "images/edit.png";
        li.appendChild(img);
        saveData();
        showCount(1);
    }
    saveCount();
}
listContainer.addEventListener('click', (event) => {
    if (event.target.tagName === 'LI') {
        event.target.classList.toggle("list");

        const clickedListItem = event.target;
        clickedListItem.classList.toggle('completed');
        saveData();
        if (clickedListItem.classList.contains('completed')) {
            showCount(-1);
        } else {
            showCount(1);
        }

    }
    else if (event.target.tagName === 'BUTTON') {
        event.target.parentNode.remove();
        saveData();
        if (parseInt(count.innerText) > 0) {
            showCount(-1);
        }


    }
    else if (event.target.tagName === 'IMG') {
        const clickedListItem = event.target.closest('li');
        const listItemText = clickedListItem.textContent.trim();
        if (listItemText) {
            input.value = listItemText;
        }
        event.target.parentNode.remove();
        saveData();
        showCount(-1);

    }
    saveCount();
});
function saveData() {
    localStorage.setItem("data", listContainer.innerHTML);
}

function showData() {
    listContainer.innerHTML = localStorage.getItem("data");

}
function saveCount() {
    localStorage.setItem("itemCount", itemCount); // Save actual count value
}

function displayCountOnLoad() {
    itemCount = parseInt(localStorage.getItem("itemCount")) || 0;
    count.innerText = itemCount;
}

window.addEventListener('load', displayCountOnLoad);

showData();
displayCount();





