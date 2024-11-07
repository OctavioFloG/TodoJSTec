export default class Model {
    constructor() {
        this.view = null;
        this.todos = JSON.parse(localStorage.getItem('todos'));
        if (!this.todos || this.todos.length < 1) {
            this.todos = [{
                id: 0,
                title: 'Learn JS',
                description: ' Watch JS Tutorials',
                priority: 5,
                completed: false,
            }]
            this.currentId = 1;
        } else {
            this.currentId = this.todos[this.todos.length - 1].id + 1;
        }
        this.save()
        console.log(this.todos);
    }

    setView(view) {
        this.view = view;
    }

    save() {
        localStorage.setItem('todos', JSON.stringify(this.todos));
    }

    getTodos() {
        return this.todos.map((todo)=> ({...todo}))
    }

    findTodo(id) {
        return this.todos.findIndex((todo) => todo.id === id);
    }

    toggleCompleted(id) {
        const index = this.findTodo(id);
        const todo = this.todos[index];
        todo.completed = !todo.completed;
        this.save();
    }
    editTodo(id,values){
        const index = this.findTodo(id);
        Object.assign(this.todos[index], values);
        this.save();
    }

    addTodo(title, description, priority) {
        const todo = {
            id: this.currentId++,
            title,
            description,
            priority,
            completed: false,
        }
        console.log(todo);
        this.todos.push(todo);
        console.log(this.todos);
        this.save();
        return { ...todo };
    }

    
}