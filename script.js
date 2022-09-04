const width = 10;
const grid = document.querySelector('.grid');
let squares;
let score = 0;
const score_display = document.getElementById('score');
const endscore = document.getElementById('endscore');
const start_button = document.getElementById('start_button');
let nextRandom = 0;
let timerId;
const displaySquares = document.querySelectorAll('.mini_grid div');
const displayWidth = 4;
let display_index = 0;
let game_over = false;
const colors = ['blue', 'red', 'orange', 'purple', 'green', 'yellow'];


//Piece squares to be colored on the grid
const next_piece = [
    [1, displayWidth+1, displayWidth*2+1, 2],
    [displayWidth+1, displayWidth+2, displayWidth*2+1, displayWidth*2+2],
    [1, displayWidth+1, displayWidth*2+1, displayWidth*3+1],
    [1, displayWidth, displayWidth+1, displayWidth+2],
    [1, displayWidth+1, displayWidth+2, displayWidth*2+2],
    [2, displayWidth+2, displayWidth+1, displayWidth*2+1]
];

const l_piece = [
    [1, width+1, (width*2)+1, 2],
    [width, width+1, width+2, (width*2)+2],
    [1, width+1, (width*2)+1, width*2],
    [width, width*2, (width*2)+1, (width*2)+2]
];
const square_piece = [
    [0, width, 1, width+1],
    [0, width, 1, width+1],
    [0, width, 1, width+1],
    [0, width, 1, width+1]
];
const column_piece = [
   [1, width+1, (width*2)+1, (width*3)+1],
   [width,width+1, width+2, width+3 ],
   [1, width+1, (width*2)+1, (width*3)+1],
   [width,width+1, width+2, width+3 ]
];
const t_piece = [
    [1, width, width+1, width+2],
    [1, width+1, width+2, (width*2)+1],
    [width, width+1, width+2, (width*2)+1],
    [1, width, width+1, (width*2)+1]
];
const s_piece = [
    [0, width, width+1, (width*2)+1],
    [width+1, width+2,width*2,(width*2)+1],
    [0,width,width+1,(width*2)+1],
    [width+1, width+2,width*2,(width*2)+1]
];

const z_piece = [
    [1, width+1, width, width*2],
    [0, 1, width+1, width+2],
    [1, width+1, width, width*2],
    [0, 1, width+1, width+2]
]


const game_pieces = [l_piece, square_piece, column_piece, t_piece, s_piece, z_piece];

let current_position = 4;
let current_rotation = 0;
let new_piece = Math.floor(Math.random()*6);
let current = game_pieces[new_piece][0];

createBlocks(grid, 199);

function createBlocks(el, num) {for(let i=0; i<=num; i++) {
    const block = document.createElement('div');
    el.appendChild(block);
    
    }

    for(let i=0; i<=9; i++) {
        const block = document.createElement('div');
        block.classList.add('bedrock')
        grid.appendChild(block);
        
        }
        squares = Array.from(document.querySelectorAll('.grid div'));
    
}
    

function draw() {
    current.forEach(el => {
        squares[el + current_position].classList.add('game_piece')
    });
}



function remove() {
    current.forEach(el => {
        squares[el + current_position].classList.remove('game_piece')
    })
}


//Direction Commands:

function control(e) {
    if(e.keyCode === 37) {
        moveLeft();
    } else if(e.keyCode === 38) {
        rotate();
    } else if(e.keyCode === 39) {
        moveRight();
    } else if(e.keyCode === 40) {
        moveDown();
    }
    
}

function moveDown() {
    if(!game_over) {
    remove()
    current_position += 10;
    draw();
    stopFall();
    }
}

function stopFall() {
    if( current.some(el => squares[current_position + el + width].classList.contains('bedrock')) ) 
    {
        current.forEach(el => squares[current_position + el].classList.add('bedrock'));
        
        
        new_piece = nextRandom;
        nextRandom = Math.floor(Math.random()*6);
        current = game_pieces[new_piece][current_rotation];
        current_position = 4;
        draw();
        displayShape();
        scorekeeping();
        gameOver();
    }
}

function moveLeft() {
    if(!game_over) {
        remove();
        const left_edge = current.some(index => (current_position + index) % width === 0);
        
        if(!left_edge) {current_position -= 1;}
        if(current.some(index => squares[current_position + index].classList.contains('bedrock')))
        {
            current_position ++
        }

        draw();
    }
}

function moveRight() {
    if(!game_over) {
        remove();
        const right_edge = current.some(index => (current_position + index) % width === width -1)
        
        if(!right_edge) {current_position +=1}
        if(current.some(index => squares[current_position + index].classList.contains('taken'))) {
        current_position -=1
        }
        
        draw();
    }
  }

function rotate() {
    if(!game_over) {
        remove();
        
        
        current_rotation ++;
        if(current_rotation === 4) {
            current_rotation = 0;
        }

        

        current = game_pieces[new_piece][current_rotation];
        draw();
    }
}

function displayShape() {
    displaySquares.forEach(el => {el.classList.remove('game_piece')})
    next_piece[nextRandom].forEach(el => {displaySquares[display_index + el].classList.add('game_piece')
    })
}

function scorekeeping() {
    for(let i=0; i<199; i+=width) {
       const row = [i, i+1, i+2, i+3, i+4, i+5, i+6, i+7, i+8, i+9];

       if(row.every(el => squares[el].classList.contains('bedrock', 'gamepiece'))) {
        score += 10;
        score_display.innerHTML = score;
        row.forEach(el => {
            squares[el].classList.remove('bedrock', 'game_piece')
        })
        const squares_removed = squares.splice(i, width);
        squares = squares_removed.concat(squares);
        squares.forEach(el => grid.appendChild(el));
       }
    }
}

function gameOver() {
    if(current.some(el => squares[current_position + el].classList.contains('bedrock'))) {
        endscore.innerHTML = 'GAME OVER. Your scored ' + score + ' points!';
        
        clearInterval(timerId);
        game_over = true;
        console.log('game over');
    }
}



document.addEventListener('keydown', control);

start_button.addEventListener('click', () => {
    if(timerId) {
        clearInterval(timerId);
        timerId = null;
    } else {
        draw();
        timerId = setInterval(moveDown, 500);
        nextRandom = Math.floor(Math.random()*5);
        displayShape();
    }
});

