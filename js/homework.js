const form = document.getElementById('listForm');

form.addEventListener('submit', handleFormSubmit);

function handleFormSubmit(event){
    event.preventDefault(); 
    const task  = event.target.task.value;

    const item = document.createElement('li');
    item.className = 'list-group-item';
    item.innerHTML = task

    const display = document.getElementById('ListDisplay')
    display.appendChild(item);

    event.target.task.value = '';

}
