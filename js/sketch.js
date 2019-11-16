
const UNIT = 18; // each unit in the world is 18 pixels
const N = 50; // size of grid
const ALIVE = 1
const DEAD = 0
let stateArray // a 2D array with the current states of the grid
let nextArray // 2D array which will hold next state of grid
let isRunning = false;
let interval;

function setup() {
    canvas = createCanvas(1100, 500);
    canvas.parent('canvas-container')
    // centerCanvas();

    stateArray = createArray(N, N);
    nextArray = createArray(N, N);

    documentReady();

    initRandom();
    //console.log(stateArray);
}

function draw() {
    for (let y = 0; y < N; y++) {
        for (let x = 0; x < N; x++) {
            let xloc = x * UNIT;
            let yloc = y * UNIT;

            if (stateArray[x][y] == ALIVE) {
                fill(0, 103, 71)
                stroke(0, 103, 71)
                rect(xloc, yloc, UNIT, UNIT)
            }
            else {
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

    x_box = floor(mouseX / N);
    y_box = floor(mouseY / N);

    stateArray[x_box][y_box] = 1;
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
        // changes state every 3 seconds until stopped
        interval = setInterval(() => {
            if(isRunning) {
                runAutomaton();
            }
        }, 2500)
    })

    stopBtn.addEventListener('click', () => {
        clearInterval(interval);
        isRunning = false;
    })

    stepBtn.addEventListener('click', () => {
        clearInterval(interval);
        isRunning = false;        
        runAutomaton();
    })

    listOfConfigs.addEventListener('change', (x, y) => {
        isRunning = false;
        let index = listOfConfigs.selectedIndex;
        let key = listOfConfigs[index].innerHTML;

        initBlank();
        configs[key]();
    })
}
