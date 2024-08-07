const body = document.querySelector('#body');
const inputCells = document.querySelector('#cell-count');
const checkboxEraser = document.querySelector('#eraser');
const btnCreate = document.querySelector('#btn-create');
const btnReset = document.querySelector('#btn-reset');
const cellBg = document.querySelector('#cell-bg');
const cellFill = document.querySelector('#cell-fill');

const GRID_SIZE = 800;

const defaultCellCount = 16;
const defaultCellBg = '#ffffff';
const defaultCellFill = '#000000';

let cellCount = defaultCellCount;
inputCells.value = cellCount;

cellBg.value = defaultCellBg;
cellFill.value = defaultCellFill;

let isDrawing = false;

function createGrid() {
    const cellBgColour = cellBg.value !== defaultCellBg ? cellBg.value : defaultCellBg;
    const CELL_SIZE = GRID_SIZE / cellCount;
    const grid = createElement('div', { 
        id: 'grid',
        style: `height: ${GRID_SIZE}px; width: ${GRID_SIZE}px`
    });
    for (let i = 0; i < cellCount * cellCount; i++) {
        const cell = createElement('div', { 
            id: i,
            class: 'cell',
            style: `height: ${CELL_SIZE}px; width: ${CELL_SIZE}px; background: ${cellBgColour}`
        });
        if (!isDrawing) {
            cell.addEventListener('mouseenter', e => addHighlight(e));
            cell.addEventListener('mouseleave', e => removeHighlight(e));
            cell.addEventListener('click', e => updateCells(e));
        }
        cell.addEventListener('mousedown', () => {
            isDrawing = true;
        });
        cell.addEventListener('mousemove', e => {
            if (isDrawing) updateCells(e);
        });
        grid.appendChild(cell);
    }
    body.appendChild(grid);
}

document.addEventListener('mouseup', () => isDrawing = false);

createGrid();

btnCreate.addEventListener('click', createNewGrid);
btnReset.addEventListener('click', resetGrid);
cellBg.addEventListener('input', changeCellBg);
cellFill.addEventListener('input', changeCellFill);

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
        cell.style.background = defaultCellBg;
    });
    inputCells.value = defaultCellCount;
    cellBg.value = defaultCellBg;
    cellFill.value = defaultCellFill;
}

function addHighlight(e) {
    const highlightValue = `${cellFill.value}30`;
    if (!e.target.classList.contains('fill')) e.target.style.background = highlightValue;
}

function removeHighlight(e) {
    if (!e.target.classList.contains('fill')) e.target.style.background = cellBg.value;
}

function updateCells(e) {
    checkboxEraser.checked ? emptyCells(e) : fillCells(e);
}

function emptyCells(e) {
    if (e.target.classList.contains('fill')) e.target.classList.remove('fill');
    e.target.style.background = cellBg.value;
}

function fillCells(e) {
    if (!e.target.classList.contains('fill')) e.target.classList.add('fill');
    e.target.style.background = cellFill.value;
}

function changeCellBg() {
    const cells = document.querySelectorAll('.cell');
    cells.forEach(cell => {
        if (cell.style.background !== cellBg.value && !cell.classList.contains('fill')) cell.style.background = cellBg.value;
    });
}

function changeCellFill() {
    cellFill.value == defaultCellFill ? defaultCellFill : cellFill.value;
}

function createElement(tag, attributes = {}, textContent = '') {
    const element = document.createElement(tag);
    Object.keys(attributes).forEach(attr => element.setAttribute(attr, attributes[attr]));
    if (textContent) element.textContent = textContent;
    return element;
}
