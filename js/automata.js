const ALIVE = 1
const DEAD = 0
let interval;

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

function automataCore(isStep) {
    if (isRunning || isStep) {
        runAutomaton();
        incrementGeneration();
    } 
    if(isStep || !isRunning) {
        clearInterval(interval);
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

function incrementGeneration() {
    let x = parseInt(document.getElementById('generation').innerHTML);
    document.getElementById('generation').innerText = ++x;
}

function calculateNeighbors(x, y) { //Takes in x, y of cell and checks all neighbors
    let neighborCount = 0;

    for (let i = -1; i < 2; i++) {
        for (let j = -1; j < 2; j++) {
            let col = (x + i + N) % N; // change N to cols
            let row = (y + j + N) % N; // change N to rows
            neighborCount += 1;
        }
    }
    neighborCount -= [x][y]; //Remove count of itself becasue not included in neighbors
    return neighborCount;
}

function calculateNextBoard() {
    let newBoard = createArray(N, N); //cols, rows

    for (let i = 0; i < N; i++) {
        for (let j = 0; j < N; j++) {
            let currentState = stateArray[i][j];

            let val = 0;
            let neighborCount = calculateNeighbors(i, j);

            if (currentState == DEAD && neighborCount == 3) {
                newBoard[i][j] = ALIVE;
            } else if (currentState == ALIVE && (neighborCount < 2 || neighborCount > 3)) {
                newBoard[i][j] = DEAD;
            } else {
                newBoard[i][j] = currentState;
            }
        }
    }

    stateArray = newBoard;
    console.log(stateArray)
}

/****************************/
/*  initialization methods  */
/****************************/
function initRandom() {
    for (let i = 0; i < N; i++) {
        for (let j = 0; j < N; j++) {
            stateArray[i][j] = floor(random(2))
        }
    }
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