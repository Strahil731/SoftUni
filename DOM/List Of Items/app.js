function addItem() {
    const input = document.getElementById('newItemText');
    const liElement = document.createElement('li');

    liElement.textContent = input.value;

    const list = document.getElementById('items');
    list.appendChild(liElement);

    input.value = '';
}