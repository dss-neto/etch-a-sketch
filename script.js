const container = document.createElement('div');
const body = document.querySelector('body');
body.style.cssText = 'background-color: gray; display: flex; justify-content: center; margin:0; padding:0;'
container.style.cssText = "display: flex; box-sizing: border-box; flex-wrap: wrap; height:100vh; aspect-ratio: 1/1; background-color: white;"
body.appendChild(container);

const resetButton = document.createElement('button');

resetButton.style.cssText = 'box-sizing:border-box; text-align: center; height: 40px; width: 140px; margin-left: 20px; margin-top: 20px;'
resetButton.textContent = "Change the grid's row/column"
body.appendChild(resetButton);



resetButton.addEventListener('click', () => {
    while (true) {
        size = prompt("What's the size of the row and column?\nMax: 100", "");
        if (parseInt(size) !== 'NaN' && parseInt(size) < 101) {
            break;
        } else if (size === null) {
            return
        }
    }
    createSketch(parseInt(size));
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

        col.addEventListener('mouseover', () => {
            col.style.backgroundColor = 'black'
        });

        container.appendChild(col);
    };
}