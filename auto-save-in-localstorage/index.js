// index.js
function persist() {
    const form = document.getElementById('autoSaveForm');
    for (let i = 0; i < form.elements.length; i++) {
        localStorage.setItem(form.elements[i].id, form.elements[i].value);
    }
}

// Function to load form data from localStorage on page load
function loadFormData() {
    const form = document.getElementById('autoSaveForm');
    for (let i = 0; i < form.elements.length; i++) {
        const field = form.elements[i];
        console.log(form.elements[i], i);

        const storedValue = localStorage.getItem(field.id);
        if (storedValue !== null) {
            field.value = storedValue;
        }
    }
}

document.addEventListener('DOMContentLoaded', loadFormData);
document.addEventListener('input', persist)