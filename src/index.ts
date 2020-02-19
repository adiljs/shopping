
const addButton = document.getElementById('addButton') as HTMLInputElement;
const itemToAdd = document.getElementById('itemToAdd') as HTMLInputElement;
const list = document.getElementById('list') as HTMLUListElement;
const count = document.getElementById('count') as HTMLSpanElement;
let items: ShoppingItem[] = [];

const storedItems = localStorage.getItem('shopping-list');
if (storedItems) {
    items = JSON.parse(storedItems);
    items.forEach(createIteminDom);
    updateCount();
}

function updateCount() {
    count.innerText = items.length.toString();
}

addButton.addEventListener('click', addTheItem);

itemToAdd.addEventListener('keydown', function (evt) {
    if (evt.key === 'Enter') {
        addTheItem();
    }
});

interface ShoppingItem {
    description: string;
}

function addTheItem() {
    const item = itemToAdd.value;
    const thingToAdd: ShoppingItem = { description: item };
    items = [thingToAdd, ...items];
    createIteminDom(thingToAdd);
    itemToAdd.value = ''; // clear it out!
    itemToAdd.focus();  // put the cursor there ready for the next item.
    saveIt();
    updateCount();
}

function createIteminDom(item: ShoppingItem) {
    const li = document.createElement('li') as HTMLLIElement;
    li.classList.add('list-group-item');
    const text = document.createTextNode(item.description);
    li.appendChild(text);
    list.insertBefore(li, list.firstChild);

}
// <li class="list-group-item">Cras justo adio</li>

function saveIt() {
    localStorage.setItem('shopping-list', JSON.stringify(items));
}
