export default class AddTodo {
    constructor(){
        this.btn = document.getElementById('add');
        this.title = document.getElementById('title');
        this.description = document.getElementById('description');
    }

    onClick(callback){
        this.btn.onClick = () => {
            if (title.value === '' || description.value === '') {
                // alert.classList.remove('d-none');
                // alert.innerText = 'Title and description is required';
                // return;
                console.error('Incorrecto');
            } else {
                callback(this.title.value,this.description.value);
            }

        }
    }
}