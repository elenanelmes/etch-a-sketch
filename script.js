const body = document.querySelector('#body');
const inputCells = document.querySelector('#cell-count');
const checkboxEraser = document.querySelector('#eraser');
const btnCreate = document.querySelector('#btn-create');
const btnReset = document.querySelector('#btn-reset');

const GRID_SIZE = 800;
let cellCount = 16;

function createGrid() {
    const CELL_SIZE = GRID_SIZE / cellCount;
    const grid = createElement('div', { 
        id: 'grid',
        style: `height: ${GRID_SIZE}px; width: ${GRID_SIZE}px`
    });
    for (let i = 0; i < cellCount * cellCount; i++) {
        const cell = createElement('div', { 
            id: i,
            class: 'cell',
            style: `height: ${CELL_SIZE}px; width: ${CELL_SIZE}px`
        });
        cell.addEventListener('mouseover', updateCells);
        grid.appendChild(cell);
    }
    body.appendChild(grid);
}

createGrid();

btnCreate.addEventListener('click', createNewGrid);
btnReset.addEventListener('click', resetGrid);
checkboxEraser.addEventListener('click', eraseCells);

function createNewGrid() {
    const grid = document.querySelector('#grid');
    grid.remove();

    cellCount = inputCells.value;
    createGrid();
}

function resetGrid() {
    const cells = document.querySelectorAll('.cell');
    cells.forEach(cell => {
        if (cell.classList.contains('fill')) cell.classList.remove('fill');
    });
}

function updateCells(e) {
    checkboxEraser.checked ? emptyCells(e) : fillCells(e);
}

function emptyCells(e) {
    if (e.target.classList.contains('fill')) e.target.classList.remove('fill');
}

function fillCells(e) {
    if (!e.target.classList.contains('fill')) e.target.classList.add('fill');
}

function createElement(tag, attributes = {}, textContent = '') {
    const element = document.createElement(tag);
    Object.keys(attributes).forEach(attr => element.setAttribute(attr, attributes[attr]));
    if (textContent) element.textContent = textContent;
    return element;
}
