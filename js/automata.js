const ALIVE = 1
const DEAD = 0
let interval;

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
    calculateNextBoard();
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
            let row = (y + j + M) % M; // change N to rows
            neighborCount += stateArray[col][row];
        }
    }
    neighborCount -= stateArray[x][y]; //Remove count of itself becasue not included in neighbors
    return neighborCount;
}

function calculateNextBoard() {
    let newBoard = createArray(N, M); //cols, rows

    for (let i = 0; i < N; i++) {
        for (let j = 0; j < M; j++) {
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
    draw();
}

/****************************/
/*  initialization methods  */
/****************************/
function initRandom() {
    for (let i = 0; i < N; i++) {
        for (let j = 0; j < M; j++) {
            stateArray[i][j] = floor(random(2))
        }
    }
}

function initSpaceship() {
    let mid_x = floor(N / 2);
    let mid_y = floor(M / 2);

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
    let mid_y = floor(M / 2);

    stateArray[mid_x + 2][mid_y - 1] = 1;
    stateArray[mid_x + 2][mid_y] = 1;
    stateArray[mid_x + 2][mid_y + 1] = 1;

    stateArray[mid_x - 2][mid_y - 1] = 1;
    stateArray[mid_x - 2][mid_y] = 1;
    stateArray[mid_x - 2][mid_y + 1] = 1;


}

function initPulsar() {
    let x = floor(N / 2);
    let y = floor(M / 2);
    
    stateArray[x - 6][y + 2] = 1;
    stateArray[x - 6][y + 3] = 1;
    stateArray[x - 6][y + 4] = 1;
    stateArray[x - 6][y - 2] = 1;
    stateArray[x - 6][y - 3] = 1;
    stateArray[x - 6][y - 4] = 1;

    stateArray[x - 4][y + 1] = 1;
    stateArray[x - 4][y + 6] = 1;
    stateArray[x - 4][y - 1] = 1;
    stateArray[x - 4][y - 6] = 1;

    stateArray[x - 3][y + 1] = 1;
    stateArray[x - 3][y + 6] = 1;
    stateArray[x - 3][y - 1] = 1;
    stateArray[x - 3][y - 6] = 1;

    stateArray[x - 2][y + 1] = 1;
    stateArray[x - 2][y + 6] = 1;
    stateArray[x - 2][y - 1] = 1;
    stateArray[x - 2][y - 6] = 1;

    stateArray[x - 1][y + 2] = 1;
    stateArray[x - 1][y + 3] = 1;
    stateArray[x - 1][y + 4] = 1;
    stateArray[x - 1][y - 2] = 1;
    stateArray[x - 1][y - 3] = 1;
    stateArray[x - 1][y - 4] = 1;

    stateArray[x + 6][y + 2] = 1;
    stateArray[x + 6][y + 3] = 1;
    stateArray[x + 6][y + 4] = 1;
    stateArray[x + 6][y - 2] = 1;
    stateArray[x + 6][y - 3] = 1;
    stateArray[x + 6][y - 4] = 1;

    stateArray[x + 4][y + 1] = 1;
    stateArray[x + 4][y + 6] = 1;
    stateArray[x + 4][y - 1] = 1;
    stateArray[x + 4][y - 6] = 1;

    stateArray[x + 3][y + 1] = 1;
    stateArray[x + 3][y + 6] = 1;
    stateArray[x + 3][y - 1] = 1;
    stateArray[x + 3][y - 6] = 1;

    stateArray[x + 2][y + 1] = 1;
    stateArray[x + 2][y + 6] = 1;
    stateArray[x + 2][y - 1] = 1;
    stateArray[x + 2][y - 6] = 1;

    stateArray[x + 1][y + 2] = 1;
    stateArray[x + 1][y + 3] = 1;
    stateArray[x + 1][y + 4] = 1;
    stateArray[x + 1][y - 2] = 1;
    stateArray[x + 1][y - 3] = 1;
    stateArray[x + 1][y - 4] = 1;
}

function initGliderGun()
{
    let x = floor(N / 2);
    let y = floor(M / 2);

    stateArray[x - 17][y] = 1;
    stateArray[x - 17][y + 1] = 1;

    stateArray[x - 16][y] = 1;
    stateArray[x - 16][y + 1] = 1;

    stateArray[x - 7][y] = 1;
    stateArray[x - 7][y + 1] = 1;
    stateArray[x - 7][y + 2] = 1;
    
    stateArray[x - 6][y - 1] = 1;
    stateArray[x - 6][y + 3] = 1;

    stateArray[x - 5][y - 2] = 1;
    stateArray[x - 5][y + 4] = 1;

    stateArray[x - 4][y - 2] = 1;
    stateArray[x - 4][y + 4] = 1;

    stateArray[x - 3][y + 1] = 1;

    stateArray[x - 2][y - 1] = 1;
    stateArray[x - 2][y + 3] = 1;

    stateArray[x - 1][y] = 1;
    stateArray[x - 1][y + 1] = 1;
    stateArray[x - 1][y + 2] = 1;

    stateArray[x][y + 1] = 1;

    stateArray[x + 3][y] = 1;
    stateArray[x + 3][y - 1] = 1;
    stateArray[x + 3][y - 2] = 1;

    stateArray[x + 4][y] = 1;
    stateArray[x + 4][y - 1] = 1;
    stateArray[x + 4][y - 2] = 1;

    stateArray[x + 5][y - 3] = 1;
    stateArray[x + 5][y + 1] = 1;

    stateArray[x + 7][y - 3] = 1;
    stateArray[x + 7][y - 4] = 1;
    stateArray[x + 7][y + 1] = 1;
    stateArray[x + 7][y + 2] = 1;

    stateArray[x + 17][y - 1] = 1;
    stateArray[x + 17][y - 2] = 1;

    stateArray[x + 18][y - 1] = 1;
    stateArray[x + 18][y - 2] = 1;


}

function initBlank() {
    for (let i = 0; i < N; i++) {
        for (let j = 0; j < M; j++) {
            stateArray[i][j] = 0;
        }
    }
}
