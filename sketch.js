
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

function conwayCellLogic (x, y)
{
    neighborCount = 0;
    isLive == true;

    // count cell neighbors
    // topleft
    if (x-1 >= 0 && y-1 >= 0) // not out of bounds
    {
        if (stateArray[x-1][y-1] == 1) // Cell lives?
            neighborCount++;
    }
    // topCenter
    if (y-1 >= 0) // not out of bounds
    {
        if (statArray[x][y-1] == 1) // cell lives?
            neighborCount++
    }
    // top right
    if (x+1 <= MAXRIGHT && y-1 >= 0) // not out of bounds
    {
        if (statArray[x][y-1] == 1) // cell lives?
            neighborCount++
    }
    // left
    if (x-1 >= 0) // not out of bounds
    {
        if (statArray[x][y-1] == 1) // cell lives?
            neighborCount++
    }
    // right
    if (x+1 <= MAXRIGHT) // not out of bounds
    {
        if (statArray[x][y-1] == 1) // cell lives?
            neighborCount++
    }
    // bottom left
    if (x-1 >= 0 && y+1 <= MAXDOWN) // not out of bounds
    {
        if (statArray[x][y-1] == 1) // cell lives?
            neighborCount++
    }
    // bottom center
    if (y+1 <= MAXDOWN) // not out of bounds
    {
        if (statArray[x][y-1] == 1) // cell lives?
            neighborCount++
    }
    // bottom right
    if (x+1 <= MAXRIGHT && y+1 <= MAAXDOWN) // not out of bounds
    {
        if (statArray[x][y-1] == 1) // cell lives?
            neighborCount++
    }

    /**********************************
     *  logic decision tree,          *
     *  If cell should die, set dead  *
     *  if cell should live, set live *
     **********************************/
    // if cell is dead, set tracker dead, need for logic below
    if (!stateArray[x][y])  
        isLive = false; 

    // if neighbors < 2 or > 3, DIE
    if (neighborCount < 2 || neighborCount > 3)
        return false;
    // if live and neighbor is 2 or 3, STAY LIVE
    if (isLive && (neighbor == 2 || neighbor == 3))
        return true;
    // if dead and neighbors = 3, GO LIVE
    if (isLive == false && neighbors == 3)
        return true;
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

function mousePressed()
{
    let x_box;
    let y_box;
    
    x_box = floor(mouseX/N);
    y_box = floor(mouseY/N);
    
    stateArray[x_box][y_box] = 1;
}
