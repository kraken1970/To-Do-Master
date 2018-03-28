const main = (document	 => {
  function createElement(tag, props, ...children) {
    //... - операртор оставшихся параметров
    const element = document.createElement(tag);
  
    Object.keys(props).forEach(key => element[key] = props[key]);
    // метод keys возвращает массив со св-ми обьекта
    // forEach принимает эл-ты массива по порядку и далее что-то с ними делается
    if (children.length > 0) {
      children.forEach(child => {
        if (typeof child === 'string') {
          child = document.createTextNode(child); //создать DOM эл-т из текстовой строки
        }
  
        element.appendChild(child);
  
      });
    }
    return element;
  }
  
  function createTodoItem(title) {
    const checkbox = createElement('input', { type: 'checkbox', className: 'checkbox' });
    
    const label = createElement('label', { className: 'title' }, title);
    
    const editInput = createElement('input', { type: 'text', className: 'textfield' });
    
    const editButton = createElement('button', { className: 'edit' }, 'Изменить');
  
  
    const deleteButton = createElement('button', { className: 'delete' }, 'Удалить');
    
  
    const listItem = createElement('li', { className: 'todo-item' }, checkbox, label, editInput, editButton, deleteButton);
    // listItem.appendChild(checkbox); // добавить ребенка
    // listItem.appendChild(label);
    // listItem.appendChild(editInput);
    // listItem.appendChild(editButton);
    // listItem.appendChild(deleteButton);
  
    bindEvents(listItem);
    
    return listItem;
  }
  
  function bindEvents(todoItem) {
    const checkbox = todoItem.querySelector('.checkbox');
    const editButton = todoItem.querySelector('button.edit');
    const deleteButton = todoItem.querySelector('button.delete');
  
    checkbox.addEventListener('change', toggleTodoItem);
    editButton.addEventListener('click', editTodoItem);
    deleteButton.addEventListener('click', deleteTodoItem);
  
  }
  
  function addTodoItem(events) {
    event.preventDefault();
    if (addInput.value === '') return alert('Необходимо ввести название задачи.');
  
    const todoItem = createTodoItem(addInput.value);
    todoList.appendChild(todoItem);
    addInput.value = '';
  }
  
  function toggleTodoItem() {
    const listItem = this.parentNode; //доступ к родителю т.е. li
    listItem.classList.toggle('completed');
  }
  
  function editTodoItem() {
    const listItem = this.parentNode;
    const title = listItem.querySelector('.title');
    const editInput = listItem.querySelector('.textfield');
    const isEditing = listItem.classList.contains('editing');
  
    if (isEditing) {
      title.innerText = editInput.value;
      this.innerText = 'Изменить';
    } else {
      editInput.value = title.innerText;
      this.innerText = 'Сохранить';//отправить внутренний текст
    }
  
    listItem.classList.toggle('editing');
  }
  
  function deleteTodoItem() {
    const listItem = this.parentNode;
    todoList.removeChild(listItem);
  }
  
  const todoForm = document.getElementById('todo-form');
  const addInput = document.getElementById('add-input');
  const todoList = document.getElementById('todo-list');
  const todoItems = document.querySelectorAll('.todo-item');
  
  function main() {
    todoForm.addEventListener('submit', addTodoItem);
    todoItems.forEach(item => bindEvents(item));
  }
  
  return main;
})(document);

main();


