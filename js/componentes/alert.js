export default class Alert{
    constructor(alertaId){
        this.alert = document.getElementById(alertaId);
    }

    show(message){
        this.alert.classList.remove('d-none');
        this.alert.innerText = message;
    }

    hide(){
        this.alert.classList.add('d-none');
    }
}