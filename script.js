const BODY = document.querySelector('#body');
const CELL_INPUT = document.querySelector('#cells');
const ERASER_CHECKBOX = document.querySelector('#eraser');
const CREATE_BUTTON = document.querySelector('#btn-create');
const RESET_BUTTON = document.querySelector('#btn-reset');
const GRID_BG = document.querySelector('#grid-bg');
const FILL = document.querySelector('#fill');

const GRID_SIZE = 800;
const DEFAULT_CELLS = 16;
const DEFAULT_GRID_BG = '#ffffff';
const DEFAULT_FILL = '#000000';

let cellCount = DEFAULT_CELLS;
let isDrawing = false;

CELL_INPUT.value = cellCount;
GRID_BG.value = DEFAULT_GRID_BG;
FILL.value = DEFAULT_FILL;

function createGrid() {
    const GRID_BGColour = GRID_BG.value !== DEFAULT_GRID_BG ? GRID_BG.value : DEFAULT_GRID_BG;
    const CELL_SIZE = GRID_SIZE / cellCount;
    const grid = createElement('div', { 
        id: 'grid',
        style: `height: ${GRID_SIZE}px; width: ${GRID_SIZE}px; background: ${GRID_BGColour}`
    });
    for (let i = 0; i < cellCount * cellCount; i++) {
        const cell = createElement('div', { 
            id: i,
            class: 'cell',
            style: `height: ${CELL_SIZE}px; width: ${CELL_SIZE}px; background: transparent`
        });
        cell.addEventListener('mouseenter', e => addHover(e));
        cell.addEventListener('mouseleave', e => removeHover(e));
        cell.addEventListener('click', e => updateCells(e));
        cell.addEventListener('mousedown', () => {
            isDrawing = true;
        });
        cell.addEventListener('mousemove', e => {
            if (isDrawing) updateCells(e);
        });
        grid.appendChild(cell);
    }
    BODY.appendChild(grid);
}

createGrid();

document.addEventListener('mouseup', () => isDrawing = false);

CREATE_BUTTON.addEventListener('click', createNewGrid);
RESET_BUTTON.addEventListener('click', resetGrid);
GRID_BG.addEventListener('input', changeGridBg);
FILL.addEventListener('input', changeFill);

function createNewGrid() {
    const grid = document.querySelector('#grid');
    grid.remove();

    cellCount = CELL_INPUT.value;
    createGrid();
}

function resetGrid() {
    const grid = document.querySelector('#grid');
    grid.style.background = DEFAULT_GRID_BG;
    const cells = document.querySelectorAll('.cell');
    cells.forEach(cell => {
        if (cell.classList.contains('fill')) cell.classList.remove('fill');
        cell.style.background = 'transparent';
    });
    CELL_INPUT.value = DEFAULT_CELLS;
    GRID_BG.value = DEFAULT_GRID_BG;
    FILL.value = DEFAULT_FILL;
}

const hover = createElement('div', { id: 'hover', style: 'height: 100%; width: 100%; opacity: 0.5; pointer-events: none;' });
hover.style.background = FILL.value;

function addHover(e) {
    e.target.appendChild(hover);
}

function removeHover(e) {
    e.target.removeChild(hover);
}

function updateCells(e) {
    ERASER_CHECKBOX.checked ? emptyCells(e) : fillCells(e);
}

function emptyCells(e) {
    if (e.target.classList.contains('fill')) e.target.classList.remove('fill');
    e.target.style.background = 'transparent';
}

function fillCells(e) {
    if (!e.target.classList.contains('fill')) e.target.classList.add('fill');
    e.target.style.background = FILL.value;
}

function changeGridBg() {
    const grid = document.querySelector('#grid');
    grid.style.background = GRID_BG.value;
    const cells = document.querySelectorAll('.cell');
    cells.forEach(cell => {
        if (cell.style.background !== GRID_BG.value && !cell.classList.contains('fill')) cell.style.background = 'transparent';
    });
}

function changeFill() {
    hover.style.background = FILL.value;
    FILL.value == defaultFill ? defaultFill : FILL.value;
}

function createElement(tag, attributes = {}) {
    const element = document.createElement(tag);
    Object.keys(attributes).forEach(attr => element.setAttribute(attr, attributes[attr]));
    return element;
}
