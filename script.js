const body = document.querySelector('#body');
const cells = document.querySelectorAll('.cell');
const btnReset = document.querySelector('#btn-reset');

const GRID_SIZE = 16;

function createGrid() {
    const grid = createElement('div', { id: 'grid' });
    for (let i = 0; i < GRID_SIZE * GRID_SIZE; i++) {
        const cell = createElement('div', { id: i, class: 'cell' });
        cell.addEventListener('mouseover', changeCellColour);
        grid.appendChild(cell);
    }
    body.appendChild(grid);
}

createGrid();

btnReset.addEventListener("click", resetGrid);

function changeCellColour(e) {
    e.target.classList.add('fill');
}

function resetGrid() {
    const cells = document.querySelectorAll('.cell');
    cells.forEach(cell => {
        cell.classList.remove('fill');
    });
}

function createElement(tag, attributes = {}, textContent = '') {
    const element = document.createElement(tag);
    Object.keys(attributes).forEach(attr => element.setAttribute(attr, attributes[attr]));
    if (textContent) element.textContent = textContent;
    return element;
}
