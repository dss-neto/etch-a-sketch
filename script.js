const body = document.querySelector('body');
body.style.cssText = 'background-color: gray; display: flex; justify-content: center; margin:0; padding:0;'

const container = document.createElement('div');
container.style.cssText = "display: flex; box-sizing: border-box; flex-wrap: wrap; height:100vh; aspect-ratio: 1/1; background-color: white;"
body.appendChild(container);

const buttonContainer = document.createElement('div');
buttonContainer.style.cssText = 'display:flex; flex-wrap: wrap;'
body.appendChild(buttonContainer);


const resetButton = document.createElement('button');
resetButton.style.cssText = 'box-sizing:border-box; text-align: center; height: 40px; width: 140px; margin-left: 20px; margin-top: 20px;';
resetButton.textContent = "Change the grid's row/column";
buttonContainer.appendChild(resetButton);

const randomButton = document.createElement('button');
randomButton.style.cssText = 'box-sizing:border-box; text-align: center; height: 40px; width: 140px; margin-left: 20px; margin-top: 20px;';
randomButton.textContent = "Random color mode";
buttonContainer.appendChild(randomButton);


randomToggle = 0
sizeGlobal = 16;
createSketch(sizeGlobal);
randomButton.addEventListener('click', () => {
    if (randomToggle === 0) {
        randomToggle = 1;
        createSketch(sizeGlobal);
    } else if (randomToggle === 1) {
        randomToggle = 0;
        createSketch(sizeGlobal);
    }

})

resetButton.addEventListener('click', () => {
    while (true) {
        size = prompt("What's the size of the row and column?\nMax: 100", "");
        if (parseInt(size) !== 'NaN' && parseInt(size) < 101) {
            break;
        } else if (size === null) {
            return
        }
    }

    sizeGlobal = parseInt(size);
    createSketch(sizeGlobal);
});

function createSketch(rowColumn) {

    // Remove all columns/rows before adding new ones

    const colBefore = document.querySelectorAll('div.col');
    colBefore.forEach(colItem => {
        container.removeChild(colItem);
    });
    
    // Amount of rows and amount of columns are the same, so I'm gonna refer
    // to them interchangeably

    for (let i = 0; i < (rowColumn*rowColumn); i++) {
        const col = document.createElement('div');
        col.style.cssText = "box-sizing: border-box; aspect-ratio:1/1;"
        col.style.setProperty('--row', rowColumn);
        col.style.flex = '0 0 calc(100%/var(--row))'
        col.setAttribute('class', 'col');
        container.appendChild(col);
    };
    
    const colList = document.querySelectorAll('div.col');
    switch (randomToggle) {
        case 0:
            colList.forEach(col => {
                col.addEventListener('mouseover', () => {
                    col.style.backgroundColor = 'black'
                });
            });
            break;
        
        case 1:
            colList.forEach(col => {
                col.addEventListener('mouseover', () => {
                    col.style.setProperty('--color1', randomFrom0to255());
                    col.style.setProperty('--color2', randomFrom0to255());
                    col.style.setProperty('--color3', randomFrom0to255());
                    col.style.backgroundColor = 'rgb(var(--color1), var(--color2), var(--color3))';
                })
            });
            break;
    }
}

function randomFrom0to255() {
    let min = 0;
    let max = 255;
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

