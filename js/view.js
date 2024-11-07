import AddTodo from './components/add-Todo.js';
import Modal from './components/modal.js';
import Filter from './components/filters.js';


export default class View {
    constructor() {
        this.model = null;
        this.table = document.getElementById('table');
        this.addTodoForm = new AddTodo();
        this.modal = new Modal();
        this.filters = new Filter();
        this.priority = document.getElementById('priority');
        this.range = document.getElementById('range');
        this.range.innerText = this.priority.value;

        this.addTodoForm.onClick((title, description, priority) => this.addTodo(title, description, priority))
        this.modal.onClick((id, values) => this.editTodo(id, values));
        this.filters.onClick((filters) => this.filter(filters));
    }

    render() {
        const todos = this.model.getTodos();
        todos.forEach((todo) => this.createRow(todo));
    }

    updateRangeValue(value) {
        document.getElementById("range").textContent = value;
    }

    setModel(model) {
        this.model = model;
    }

    filter(filters) {
        const { type, words } = filters;
        const [, ...rows] = this.table.getElementsByTagName('tr');
        for (const row of rows) {
            const [title, description, priority, completed] = row.children;
            let shouldHide = false;

            if (words) {
                shouldHide = !title.innerText.includes(words) && !description.innerText.includes(words) && !priority.innerText.includes(words);
            }
            const shouldBeCompleted = type === 'completed';
            const isCompleted = completed.children[0].checked;

            if (type !== 'all' && shouldBeCompleted !== isCompleted) {
                shouldHide = true;
            }

            if (shouldHide) {
                row.classList.add('d-none');
            } else {
                row.classList.remove('d-none');
            }
        }
    }

    addTodo(title, description, priority) {
        const todo = this.model.addTodo(title, description, priority);
        this.createRow(todo);
    }

    removeTodo(id) {
        this.model.removeTodo(id);
        document.getElementById(id).remove();
    }

    toggleCompleted(id) {
        const index = this.model.findTodo(id);
        this.model.toggleCompleted(index);
    }

    editTodo(id, values) {
        this.model.editTodo(id, values);
        const row = document.getElementById(id);
        row.children[0].innerText = values.title;
        row.children[1].innerText = values.description;
        row.children[2].innerText = values.priority;
        row.children[3].children[0].checked = values.completed;
        ;
    }

    createRow(todo) {
        const row = table.insertRow();
        row.setAttribute('id', todo.id);
        row.innerHTML = `
        <td>${todo.title}</td>
        <td>${todo.description}</td>
        <td class="text-center">${todo.priority}</td>
        <td class="text-center">
        </td>
        <td class="text-right">
        </td>
        `;

        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.checked = todo.completed;
        checkbox.onclick = () => this.toggleCompleted(todo.id);
        row.children[3].appendChild(checkbox);

        const editBtn = document.createElement('button');
        editBtn.classList.add('btn', 'btn-primary', 'mb-1', 'ml-1');
        editBtn.innerHTML = '<i class="fa fa-pencil"></i>';
        editBtn.setAttribute('data-toggle', 'modal');
        editBtn.setAttribute('data-target', '#modal');
        editBtn.onclick = () => this.modal.setValues({
            id: todo.id,
            title: row.children[0].innerText,
            description: row.children[1].innerText,
            priority: row.children[2].innerText,
            completed: row.children[3].children[0].checked,
        });
        row.children[4].appendChild(editBtn);


        const removeBtn = document.createElement('button');
        removeBtn.classList.add('btn', 'btn-danger', 'mb-1', 'ml-1');
        removeBtn.innerHTML = '<i class="fa fa-trash"></i>';
        removeBtn.onclick = () => this.removeTodo(todo.id);
        row.children[4].appendChild(removeBtn);
    }
}