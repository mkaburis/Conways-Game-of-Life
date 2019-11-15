
const UNIT = 18; // each unit in the world is 18 pixels
const N = 25; // size of grid
const ALIVE = 1
const DEAD = 0
let stateArray // a 2D array with the current states of the grid


function setup() {
    let canvas = createCanvas(1000, 500);
    canvas.parent('canvas-container')

    stateArray = createArray(N, N);

    initRandom();
    console.log(stateArray);

    
    
    
    // w = 30;
    // // Calculate columns and rows
    // columns = floor(width / w);
    // rows = floor(height / w);
    // // Wacky way to make a 2D array is JS
    // board = new Array(columns);
    // for (let i = 0; i < columns; i++) {
    //   board[i] = new Array(rows);
    // }
    // // Going to use multiple 2D arrays and swap them
    // next = new Array(columns);
    // for (i = 0; i < columns; i++) {
    //   next[i] = new Array(rows);
    // }
}

function draw() {
    for(let y = 0; y < N; y++) {
        for(let x = 0; x < N; x++) {
            let xloc = x * UNIT;
            let yloc = y * UNIT;
            
            if(stateArray[x][y] == ALIVE)
            {
                fill(0, 103, 71)
                stroke(0, 103, 71)
                rect(xloc, yloc, UNIT, UNIT)
            }
            else
            {
                fill(255)
                stroke(0, 103, 71)
                rect(xloc, yloc, UNIT, UNIT)
            }
            
        }
    }
}

function createArray(colums, rows)
{
    let array = new Array(colums)
    for(let i = 0; i < array.length; i++)
    {
        // set all values of the array in 0
        array[i] = new Array(rows).fill(0);
    }
    return array;
}

function initRandom()
{
    for(let i = 0; i < N; i++) {
        for(let j = 0; j < N; j++) {
            stateArray[i][j] = floor(random(2))
        }
    }
}

function initSpaceship()
{
    let mid_x = floor(N/2);
    let mid_y = floor(N/2);
    
    stateArray[mid_x - 2][mid_y -2] = 1;
    stateArray[mid_x - 1][mid_y -2] = 1;
    stateArray[mid_x][mid_y - 2] = 1;
    stateArray[mid_x - 3][mid_y - 1] = 1;
    stateArray[mid_x - 2][mid_y - 1] = 1;
    stateArray[mid_x - 1][mid_y - 1] = 1;
    stateArray[mid_x][mid_y - 1] = 1;
    stateArray[mid_x + 1][mid_y - 1] = 1;
    stateArray[mid_x - 3][mid_y] = 1;
    stateArray[mid_x - 2][mid_y] = 1;
    stateArray[mid_x - 1][mid_y] = 1;
    stateArray[mid_x + 1][mid_y] = 1;
    stateArray[mid_x + 2][mid_y] = 1;
    stateArray[mid_x][mid_y + 1] = 1;
    stateArray[mid_x + 1][mid_y + 1] = 1;
    
}

function initBlinker()
{
     let mid_x = floor(N/2); 
     let mid_y = floor(N/2);
    
    stateArray[mid_x + 2][mid_y - 1] = 1;
    stateArray[mid_x + 2][mid_y] = 1;
    stateArray[mid_x + 2][mid_y + 1] = 1;
    
    stateArray[mid_x - 2][mid_y - 1] = 1;
    stateArray[mid_x - 2][mid_y] = 1;
    stateArray[mid_x - 2][mid_y + 1] = 1;
    
    
}

function initPulsar()
{
     let mid_x = floor(N/2); 
     let mid_y = floor(N/2);
    
    stateArray[mid_x - 1][mid_y - 2] = 1;
    stateArray[mid_x][mid_y - 2] = 1;
    stateArray[mid_x + 1][mid_y - 2] = 1;
    
    stateArray[mid_x - 2][mid_y - 1] = 1;
    stateArray[mid_x][mid_y - 1] = 1;
    stateArray[mid_x + 2][mid_y - 1] = 1;
    
    stateArray[mid_x - 3][mid_y] = 1;
    stateArray[mid_x - 2][mid_y = 1;
    stateArray[mid_x - 1][mid_y] = 1;
    stateArray[mid_x + 1][mid_y] = 1;
    stateArray[mid_x + 2][mid_y] = 1;
    
    stateArray[mid_x - 3][mid_y + 1] = 1;
    stateArray[mid_x][mid_y + 1] = 1;
    stateArray[mid_x + 2][mid_y + 1] = 1;
    
    stateArray[mid_x][mid_y + 2] = 1;
    stateArray[mid_x + 1][mid_y + 2] = 1;
    
    stateArray[mid_x - 1][mid_y + 3] = 1;
    stateArray[mid_x][mid_y + 3] = 1;
}
