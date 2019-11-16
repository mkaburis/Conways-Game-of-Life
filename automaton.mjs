export{documentReady}

function conwayCellLogic(x, y) {
    neighborCount = 0;
    isLive = true;

    try {
        // count cell neighbors
    // topleft
    if (x - 1 >= 0 && y - 1 >= 0) { // not out of bounds
        if (stateArray[x - 1][y - 1] == ALIVE) // Cell lives?
            neighborCount++;
    }
    // topCenter
    if (y - 1 >= 0) { // not out of bounds
        if (stateArray[x][y - 1] == ALIVE) // cell lives?
            neighborCount++
    }
    // top right
    if (x + 1 < N && y - 1 >= 0) { // not out of bounds
        if (stateArray[x + 1][y - 1] == ALIVE) // cell lives?
            neighborCount++
    }
    // left
    if (x - 1 >= 0) { // not out of bounds
        if (stateArray[x - 1][y] == ALIVE) // cell lives?
            neighborCount++
    }
    // right
    if (x + 1 < N) { // not out of bounds
        if (stateArray[x + 1][y] == ALIVE) // cell lives?
            neighborCount++
    }
    // bottom left
    if (x - 1 >= 0 && y + 1 < N) { // not out of bounds
        if (stateArray[x - 1][y + 1] == ALIVE) // cell lives?
            neighborCount++
    }
    // bottom center
    if (y + 1 < N) { // not out of bounds
        if (stateArray[x][y + 1] == ALIVE) // cell lives?
            neighborCount++
    }
    // bottom right
    if (x + 1 < N && y + 1 < N) { // not out of bounds
        if (stateArray[x + 1][y + 1] == ALIVE) // cell lives?
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
    if (isLive && (neighborCount == 2 || neighborCount == 3))
        return ALIVE;
    // if dead and neighbors = 3, GO LIVE
    if (isLive == false && neighborCount == 3)
        return ALIVE;
    } catch (error) {
        console.log(error)
    }

    
}

function runAutomaton() {
    for (let i = 0; i < N; i++) {
        for (let j = 0; j < N; j++) {
            // get the next array values
            nextArray[i][j] = conwayCellLogic(i, j);
        }
    }

    // make state array be equal to next array values
    stateArray = nextArray;
    draw();
}

function initSpaceship() {
    let mid_x = floor(N / 2);
    let mid_y = floor(N / 2);

    stateArray[mid_x - 2][mid_y - 2] = 1;
    stateArray[mid_x - 1][mid_y - 2] = 1;
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

function initBlinker() {
    let mid_x = floor(N / 2);
    let mid_y = floor(N / 2);

    stateArray[mid_x + 2][mid_y - 1] = 1;
    stateArray[mid_x + 2][mid_y] = 1;
    stateArray[mid_x + 2][mid_y + 1] = 1;

    stateArray[mid_x - 2][mid_y - 1] = 1;
    stateArray[mid_x - 2][mid_y] = 1;
    stateArray[mid_x - 2][mid_y + 1] = 1;


}

function initPulsar() {
    let mid_x = floor(N / 2);
    let mid_y = floor(N / 2);

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

function initBlank() {
    for (let i = 0; i < N; i++) {
        for (let j = 0; j < N; j++) {
            stateArray[i][j] = 0;
        }
    }
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
        '' : '',
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
        // call function for stepping;
        while(isRunning){
            runAutomaton();
        }
    })

    stopBtn.addEventListener('click', () => {
        isRunning = false;
    })

    stepBtn.addEventListener('click', () => {
        isRunning = false;
        runAutomaton() ;
    })

    listOfConfigs.addEventListener('change', (x, y) => {
        isRunning = false;
        let index = listOfConfigs.selectedIndex;
        let key = listOfConfigs[index].innerHTML;

        initBlank();
        configs[key]();
    })

}