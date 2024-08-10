// DOM ELements
const body = document.querySelector('#body');
const slider = document.querySelector('#slider');
const sliderLabel = document.querySelector('#slider-label');
const eraserCheckbox = document.querySelector('#eraser');
const resetBtn = document.querySelector('#btn-reset');
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
    slider.value = cellCount;
    sliderLabel.textContent = `${cellCount} x ${cellCount}`;
    gridBg.value = DEFAULT_GRID_BG;
    fill.value = DEFAULT_FILL;

    slider.addEventListener('input', updateGrid);
    gridBg.addEventListener('input', changeGridBg);
    fill.addEventListener('input', changeFill);
    eraserCheckbox.addEventListener('change', changeHoverColour);
    resetBtn.addEventListener('click', resetAll);
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

    if (eraserCheckbox.checked) {
        hover.style.background = gridBg.value;
    }
}

function changeFill() {
    fill.value == DEFAULT_FILL ? DEFAULT_FILL : fill.value;
    hover.style.background = fill.value;
}

function updateGrid() {
    cellCount = slider.value;
    sliderLabel.textContent = `${cellCount} x ${cellCount}`;
    createGrid();
}

function resetAll() {
    window.location.reload();
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

function changeHoverColour() {
    hover.style.background = eraserCheckbox.checked ? gridBg.value : fill.value;
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
    const existingGrid = document.querySelector('#grid');
    if (existingGrid) {
        existingGrid.remove();
    }

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
