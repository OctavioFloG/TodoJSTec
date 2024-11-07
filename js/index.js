
import Model from './model.js';
import View from './view.js';
document.addEventListener('DOMContentLoaded', () => {
    const model = new Model();
    const view = new View();
    model.setView(view);
    view.setModel(model);
    view.render();

    
})

document.getElementById("priority").addEventListener("input", function () {
    document.getElementById("range").textContent = this.value;
});

document.getElementById("modal-priority").addEventListener("input", function () {
    document.getElementById("modal-range").textContent = this.value;
});