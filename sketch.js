
const UNIT = 18; // each unit in the world is 18 pixels
const N = 50; // size of grid
const ALIVE = 1
const DEAD = 0
let stateArray // a 2D array with the current states of the grid
let nextArray // 2D array which will hold next state of grid
let isRunning = false;

function setup() {
    canvas = createCanvas(1100, 500);
    canvas.parent('canvas-container')
    // centerCanvas();

    stateArray = createArray(N, N);

    documentReady();

    initRandom();
    console.log(stateArray);
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
    isLive = true;

    // count cell neighbors
    // topleft
    if (x-1 >= 0 && y-1 >= 0) // not out of bounds
    {
        if (stateArray[x-1][y-1] == ALIVE) // Cell lives?
            neighborCount++;
    }
    // topCenter
    if (y-1 >= 0) // not out of bounds
    {
        if (statArray[x][y-1] == ALIVE) // cell lives?
            neighborCount++
    }
    // top right
    if (x+1 <= N && y-1 >= 0) // not out of bounds
    {
        if (statArray[x+1][y-1] == ALIVE) // cell lives?
            neighborCount++
    }
    // left
    if (x-1 >= 0) // not out of bounds
    {
        if (statArray[x-1][y] == ALIVE) // cell lives?
            neighborCount++
    }
    // right
    if (x+1 <= N) // not out of bounds
    {
        if (statArray[x+1][y] == ALIVE) // cell lives?
            neighborCount++
    }
    // bottom left
    if (x-1 >= 0 && y+1 <= N) // not out of bounds
    {
        if (statArray[x-1][y+1] == ALIVE) // cell lives?
            neighborCount++
    }
    // bottom center
    if (y+1 <= N) // not out of bounds
    {
        if (statArray[x][y+1] == ALIVE) // cell lives?
            neighborCount++
    }
    // bottom right
    if (x+1 <= N && y+1 <= N) // not out of bounds
    {
        if (statArray[x+1][y+1] == ALIVE) // cell lives?
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
        return DEAD;
    // if live and neighbor is 2 or 3, STAY LIVE
    if (isLive && (neighbor == 2 || neighbor == 3))
        return ALIVE;
    // if dead and neighbors = 3, GO LIVE
    if (isLive == false && neighbors == 3)
        return ALIVE;
}

function runAutomaton ()
{
    for (let i = 0; i < N; i++)
    {
        for (let j = 0; j < N; j++)
        {
            // get the next array values
            nextArray[i][j] = conwayCellLogic(i, j);
        }
    }
 
    // make state array be equal to next array values
    stateArray = nextArray;
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
    stateArray[mid_x - 2][mid_y] = 1;
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

function initBlank(){
    for(let i = 0; i < N; i++) {
        for(let j = 0; j < N; j++) {
            stateArray[i][j] = 0;
        }
    }
}

function mousePressed()
{
    let x_box;
    let y_box;
    
    x_box = floor(mouseX/N);
    y_box = floor(mouseY/N);
    
    stateArray[x_box][y_box] = 1;
}


function documentReady(){
    let startBtn = document.getElementById('startBtn');
    let stopBtn = document.getElementById('stopBtn');
    let stepBtn = document.getElementById('stepBtn');
    let listOfConfigs = document.getElementById('listOfConfigs');

    const configs = {
        'Clear' : initBlank,
        'Random' : initRandom,
        'SpaceShip' : initSpaceship,
        'Blinker' : initBlinker,
        'Pulsar' : initPulsar
    }

    listOfConfigs.innerHTML = '';
    
    for (const key in configs) {

        let option = document.createElement('option');
        option.innerText = key;     
        listOfConfigs.append(option);       
    }

    startBtn.addEventListener('click', () => {
        isRunning = true;
        // call function for stepping;
    })

    stopBtn.addEventListener('click', () => {
        isRunning = false;
    })

    stepBtn.addEventListener('click', () => {
        // calls function for next step
    })

    listOfConfigs.addEventListener('change', (x, y) => {
        let index = listOfConfigs.selectedIndex;
        let key = listOfConfigs[index].innerHTML;

        initBlank();
        configs[key]();
    })

}
