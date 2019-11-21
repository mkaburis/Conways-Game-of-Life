const CANVAS_WIDTH = 1080;
const CANVAS_HEIGHT = 756; 
const OPERATION_TIME = 750;
let unit_Arr = [9, 18, 27, 36, 54];
let N_Arr = [120, 60, 40, 30, 20]
let M_Arr = [84, 42, 28, 21, 14]
let UNIT = unit_Arr[1]; // each unit in the world is 18 pixels
let N = N_Arr[1]; // size of x_grid
let M = M_Arr[1]; // size of y_grid
let stateArray // a 2D array with the current states of the grid
let nextArray // 2D array which will hold next state of grid
let isRunning = false;


function setup() {
    canvas = createCanvas(CANVAS_WIDTH, CANVAS_HEIGHT);
    canvas.parent('canvas-container')
    documentReady(); // initialize DOM events
    resetGrid();
}

function resetGrid() {
    stateArray = createArray(N, M);
    nextArray = createArray(N, M);
    initBlank();
}

function draw() {
    for (let y = 0; y < M; y++) {
        for (let x = 0; x < N; x++) {
            let xloc = x * UNIT;
            let yloc = y * UNIT;

            if (stateArray[x][y] == ALIVE) {
                fill(0, 103, 71)
                stroke(0, 103, 71)
                rect(xloc, yloc, UNIT, UNIT)
            } else {
                fill(255)
                stroke(0, 103, 71)
                rect(xloc, yloc, UNIT, UNIT)
            }

        }
    }
}

function createArray(colums, rows) {
    let array = new Array(colums)
    for (let i = 0; i < array.length; i++) {
        // set all values of the array in 0
        array[i] = new Array(rows).fill(0);
    }
    return array;
}

function mousePressed() {
    let x_box;
    let y_box;

    x_box = floor(mouseX / UNIT);
    y_box = floor(mouseY / UNIT);

    if(stateArray[x_box][y_box] == 1)
    {
        stateArray[x_box][y_box] = 0;
    }
    else{
        stateArray[x_box][y_box] = 1;
    }
}




function documentReady() {
    let startBtn = document.getElementById('startBtn');
    let stopBtn = document.getElementById('stopBtn');
    let stepBtn = document.getElementById('stepBtn');
    let listOfConfigs = document.getElementById('listOfConfigs');

    const configs = {
        '': '',
        'Clear': initBlank,
        'Random': initRandom,
        'SpaceShip': initSpaceship,
        'Blinker': initBlinker,
        'Pulsar': initPulsar
    }

    listOfConfigs.innerHTML = '';

    for (const key in configs) {
        let option = document.createElement('option');
        option.innerText = key;
        listOfConfigs.append(option);
    }

    startBtn.addEventListener('click', () => {
        isRunning = true;

        interval = setInterval(automataCore, OPERATION_TIME);
    })

    stopBtn.addEventListener('click', () => {
        isRunning = false;
    })

    stepBtn.addEventListener('click', () => {
        isRunning = false;
        automataCore(true);
    })

    gridRange.addEventListener('change', () =>{
        isRunning = false;
        document.getElementById('generation').innerText = 0;
        let input = parseInt(document.getElementById('gridRange').value);
        listOfConfigs.selectedIndex = 0;
        UNIT = unit_Arr[input];
        N = N_Arr[input];
        M = M_Arr[input];

        resetGrid();
    })

    listOfConfigs.addEventListener('change', () => {
        isRunning = false;
        document.getElementById('generation').innerText = 0;
        let index = listOfConfigs.selectedIndex;
        let key = listOfConfigs[index].innerHTML;

        initBlank();
        configs[key]();
    })
}