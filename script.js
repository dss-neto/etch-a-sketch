const body = document.querySelector('body');
body.style.cssText = 'background-color: gray; display: flex; justify-content: center; margin:0; padding:0;';

const container = document.createElement('div');
container.style.cssText = "display: flex; box-sizing: border-box; flex-wrap: wrap; height:100vh; aspect-ratio: 1/1; background-color: white; border: 8px solid blue;";
body.appendChild(container);

const rightDiv = document.createElement('div');
rightDiv.style.cssText = 'display:flex; box-sizing: border-box; margin-right:20px; flex-flow: column wrap; justify-content: flex-start; gap: 20px;';
body.appendChild(rightDiv);

const buttonContainer = document.createElement('div');
buttonContainer.style.cssText = 'display:flex; box-sizing: border-box; height: fit-content; flex-wrap: wrap; justify-content: flex-start; gap: 2px;';
rightDiv.appendChild(buttonContainer);

const stats = document.createElement('div');
stats.style.cssText = 'display:flex; color:black; padding:8px; background-color: white; border: solid black 2px;font-family: sans-serif; box-sizing: border-box; margin-left: 20px;';
rightDiv.appendChild(stats);

const changeGrid = document.createElement('button');
changeGrid.style.cssText = 'box-sizing:border-box; text-align: center; height: 40px; width: 140px; margin-left: 20px; margin-top: 20px;';
changeGrid.textContent = "Change the grid's row/column";
changeGrid.setAttribute('id', 'changeGrid');
buttonContainer.appendChild(changeGrid);

const darkButton = document.createElement('button');
darkButton.style.cssText = 'box-sizing:border-box; text-align: center; height: 40px; width: 140px; margin-left: 20px; margin-top: 20px;';
darkButton.textContent = "Light to dark";
darkButton.setAttribute('id', 'darkButton');
buttonContainer.appendChild(darkButton);

const randomButton = document.createElement('button');
randomButton.style.cssText = 'box-sizing:border-box; text-align: center; height: 40px; width: 140px; margin-left: 20px; margin-top: 20px;';
randomButton.textContent = "Random color mode";
randomButton.setAttribute('id', 'randomButton');
buttonContainer.appendChild(randomButton);

const resetButton = document.createElement('button');
resetButton.style.cssText = 'box-sizing:border-box; text-align: center; height: 40px; width: 140px; margin-left: 20px; margin-top: 20px;';
resetButton.textContent = "Erase all";
resetButton.setAttribute('id', 'resetButton');
buttonContainer.appendChild(resetButton);

let darkerToggle = 0;
let randomToggle = 0;
let darkIndex = 1;
let darkCount = 0;
let sizeGlobal = 16;
createSketch(sizeGlobal);
updateStats()

buttonContainer.addEventListener('click', (e) => {
    const target = e.target;

    switch (target.id) {
        case 'darkButton':
            switch (darkerToggle) {
                case 0:
                    darkerToggle = 1;
                    darkIndex = 0.1;
                    darkCount = 10
                    break;
                case 1:
                    darkerToggle = 0;
                    darkIndex = 1;
                    darkCount = 0
                    break;
            }
            break;
        
        case 'randomButton':
            switch (randomToggle) {
                case 0:
                    randomToggle = 1;
                    break;
                case 1:
                    randomToggle = 0;
                    break;
            }
            break;
        
        case 'changeGrid':
            while (true) {
                size = prompt("What's the size of the row and column?\nMax: 100", "");
                if (parseInt(size) !== 'NaN' && parseInt(size) < 101) {
                    break;
                } else if (size === null) {
                    return;
                }
            }
            sizeGlobal = parseInt(size);
            createSketch(sizeGlobal);
            break;
        
        case 'resetButton':
            createSketch(sizeGlobal);
    }
    updateStats();
});

container.addEventListener('mouseover', (e) => {
    const target = e.target;
    switch (target.id) {
        case 'grid':
            switch (randomToggle) {
                case 0:
                    target.style.backgroundColor = 'black';
                    break;
                case 1:
                    target.style.setProperty('--color1', randomizeFrom0to255());
                    target.style.setProperty('--color2', randomizeFrom0to255());
                    target.style.setProperty('--color3', randomizeFrom0to255());
                    target.style.backgroundColor = 'rgb(var(--color1), var(--color2), var(--color3))';
                    break;
            }
            makeDarker(target);
            break;
    }
});

function updateStats() {
    stats.innerHTML = `Current grid: ${sizeGlobal} x ${sizeGlobal}<br>Light to dark: ${darkCount}<br>Random colors: ${randomToggle}    `;
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
        darkCount -= 1;
        updateStats();
    } else if (darkIndex >= 1) {
        darkerToggle = 0;
        updateStats();
    }
}

function createSketch(rowColumn) {

    // Remove all columns/rows before adding new ones

    container.innerHTML = '';
    
    // Amount of rows and amount of columns are the same, so I'm gonna refer
    // to them interchangeably

    for (let i = 0; i < (rowColumn*rowColumn); i++) {
        const col = document.createElement('div');
        col.style.cssText = "box-sizing: border-box; aspect-ratio:1/1;";
        col.style.setProperty('--row', rowColumn);
        col.style.flex = '0 0 calc(100%/var(--row))';
        col.setAttribute('id', 'grid');
        container.appendChild(col);
        }
}