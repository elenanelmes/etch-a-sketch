// DOM ELements
const body = document.querySelector('#body');
const cellInput= document.querySelector('#cells');
const eraserCheckbox = document.querySelector('#eraser');
const btnCreate = document.querySelector('#btn-create');
const btnReset = document.querySelector('#btn-reset');
const gridBg = document.querySelector('#grid-bg');
const fill = document.querySelector('#fill');

// Constants
const GRID_SIZE = 800;
const DEFAULT_CELLS = 16;
const DEFAULT_GRID_BG = '#ffffff';
const DEFAULT_FILL = '#000000';

// Variables
let cellCount = DEFAULT_CELLS;
let isDrawing = false;

// Initialise
function initialise() {
    cellInput.value = cellCount;
    gridBg.value = DEFAULT_GRID_BG;
    fill.value = DEFAULT_FILL;

    gridBg.addEventListener('input', changeGridBg);
    fill.addEventListener('input', changeFill);
    btnCreate.addEventListener('click', createGrid);
    btnReset.addEventListener('click', resetGrid);
    document.addEventListener('mouseup', () => isDrawing = false);

    createGrid();
}

// Event Handlers
function changeGridBg() {
    const grid = document.querySelector('#grid');
    grid.style.background = gridBg.value;
    const cells = document.querySelectorAll('.cell');
    cells.forEach(cell => {
        if (cell.style.background !== gridBg.value && !cell.classList.contains('fill')) cell.style.background = 'transparent';
    });
}

function changeFill() {
    hover.style.background = fill.value;
    fill.value == DEFAULT_FILL ? DEFAULT_FILL : fill.value;
}

function resetGrid() {
    const grid = document.querySelector('#grid');
    grid.style.background = DEFAULT_GRID_BG;
    const cells = document.querySelectorAll('.cell');
    cells.forEach(cell => {
        if (cell.classList.contains('fill')) cell.classList.remove('fill');
        cell.style.background = 'transparent';
    });
    cellInput.value = DEFAULT_CELLS;
    gridBg.value = DEFAULT_GRID_BG;
    fill.value = DEFAULT_FILL;
}

// Hover Element & Handlers
const hover = createElement('div', { id: 'hover', style: 'height: 100%; width: 100%; opacity: 0.5; pointer-events: none;' });
hover.style.background = fill.value;

function addHover(e) {
    e.target.appendChild(hover);
}

function removeHover(e) {
    e.target.removeChild(hover);
}

// Cell Update Handlers
function updateCells(e) {
    eraserCheckbox.checked ? emptyCells(e) : fillCells(e);
}

function emptyCells(e) {
    if (e.target.classList.contains('fill')) e.target.classList.remove('fill');
    e.target.style.background = 'transparent';
}

function fillCells(e) {
    if (!e.target.classList.contains('fill')) e.target.classList.add('fill');
    e.target.style.background = fill.value;
}

// Utility Functions
function createGrid() {
    const gridBgColour = gridBg.value !== DEFAULT_GRID_BG ? gridBg.value : DEFAULT_GRID_BG;
    const CELL_SIZE = GRID_SIZE / cellCount;
    const grid = createElement('div', { 
        id: 'grid',
        style: `height: ${GRID_SIZE}px; width: ${GRID_SIZE}px; background: ${gridBgColour}`
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
    body.appendChild(grid);
}

function createElement(tag, attributes = {}) {
    const element = document.createElement(tag);
    Object.keys(attributes).forEach(attr => element.setAttribute(attr, attributes[attr]));
    return element;
}

// Initialise the application
initialise();
