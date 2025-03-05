const body = document.querySelector('body');
body.style.cssText = 'background-color: gray; display: flex; justify-content: center; margin:0; padding:0;';

const container = document.createElement('div');
container.style.cssText = "display: flex; box-sizing: border-box; flex-wrap: wrap; height:100vh; aspect-ratio: 1/1; background-color: white; border: 8px solid blue;";
body.appendChild(container);

const leftDiv = document.createElement('div');
leftDiv.style.cssText = 'display:flex; box-sizing: border-box; flex-flow: column wrap; justify-content: flex-start; gap: 20px;';
body.appendChild(leftDiv);

const buttonContainer = document.createElement('div');
buttonContainer.style.cssText = 'display:flex; box-sizing: border-box; height: fit-content; flex-wrap: wrap; justify-content: flex-start; gap: 2px;';
leftDiv.appendChild(buttonContainer);

const stats = document.createElement('div');
stats.style.cssText = 'display:flex; color:black; padding:8px; background-color: white; border: solid black 2px;font-family: sans-serif; box-sizing: border-box; margin-left: 20px;';
leftDiv.appendChild(stats);

const changeGrid = document.createElement('button');
changeGrid.style.cssText = 'box-sizing:border-box; text-align: center; height: 40px; width: 140px; margin-left: 20px; margin-top: 20px;';
changeGrid.textContent = "Change the grid's row/column";
buttonContainer.appendChild(changeGrid);

const darkButton = document.createElement('button');
darkButton.style.cssText = 'box-sizing:border-box; text-align: center; height: 40px; width: 140px; margin-left: 20px; margin-top: 20px;';
darkButton.textContent = "Lighter to darker";
buttonContainer.appendChild(darkButton);

const randomButton = document.createElement('button');
randomButton.style.cssText = 'box-sizing:border-box; text-align: center; height: 40px; width: 140px; margin-left: 20px; margin-top: 20px;';
randomButton.textContent = "Random color mode";
buttonContainer.appendChild(randomButton);

let darkerToggle = 0;
let randomToggle = 0;
let darkIndex = 1;
let sizeGlobal = 16;
createSketch(sizeGlobal);
updateStats()

darkButton.addEventListener('click', () => {
    switch (darkerToggle) {
        case 0:
            darkerToggle = 1;
            break;
        case 1:
            darkerToggle = 0;
            darkIndex = 1;
            break;
    }

    updateStats()
    createSketch(sizeGlobal);
});

randomButton.addEventListener('click', () => {
    switch (randomToggle) {
        case 0:
            randomToggle = 1;
            break;
        case 1:
            randomToggle = 0;
            break;
    }

    updateStats();
    createSketch(sizeGlobal);
});

changeGrid.addEventListener('click', () => {
    while (true) {
        size = prompt("What's the size of the row and column?\nMax: 100", "");
        if (parseInt(size) !== 'NaN' && parseInt(size) < 101) {
            break;
        } else if (size === null) {
            return;
        }
    }

    sizeGlobal = parseInt(size);
    updateStats()
    createSketch(sizeGlobal);
});

function updateStats() {
    stats.innerHTML = `Current grid: ${sizeGlobal} x ${sizeGlobal}<br>Light to darker: ${darkerToggle}<br>Random colors: ${randomToggle}    `;
}

function randomizeFrom0to255() {
    let min = 0;
    let max = 255;
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function makeDarker(element) {
    element.style.opacity = `${darkIndex}`
    if (darkIndex < 1) {
        darkIndex += 0.1;
    }
}

function createSketch(rowColumn) {

    if (darkerToggle === 1) {
        darkIndex = 0.1;
    }

    // Remove all columns/rows before adding new ones

    const colBefore = document.querySelectorAll('div.col');
    colBefore.forEach(colItem => {
        container.removeChild(colItem);
    });
    
    // Amount of rows and amount of columns are the same, so I'm gonna refer
    // to them interchangeably

    for (let i = 0; i < (rowColumn*rowColumn); i++) {
        const col = document.createElement('div');
        col.style.cssText = "box-sizing: border-box; aspect-ratio:1/1;";
        col.style.setProperty('--row', rowColumn);
        col.style.flex = '0 0 calc(100%/var(--row))';
        col.setAttribute('class', 'col');
        container.appendChild(col);
    }
    
    const colList = document.querySelectorAll('div.col');
    switch (randomToggle) {
        case 0:
            colList.forEach(col => {
                col.addEventListener('mouseover', () => {
                    if (darkerToggle === 1) makeDarker(col);
                    col.style.backgroundColor = 'black';
                });
            });
            break;
        
        case 1:
            colList.forEach(col => {
                col.addEventListener('mouseover', () => {
                    if (darkerToggle === 1) makeDarker(col);
                    col.style.setProperty('--color1', randomizeFrom0to255());
                    col.style.setProperty('--color2', randomizeFrom0to255());
                    col.style.setProperty('--color3', randomizeFrom0to255());
                    col.style.backgroundColor = 'rgb(var(--color1), var(--color2), var(--color3))';
                });
            });
            break;
    }
}