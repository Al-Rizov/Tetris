let score = 0;
const score_display = document.getElementById('score');
const endscore = document.getElementById('endscore');
const start_button = document.getElementById('start_button');
let nextRandom = 0;
let timerId;
const displaySquares = document.querySelectorAll('.mini_grid div');

let display_index = 0;
let game_over = false;
const colors = ['blue', 'red', 'orange', 'purple', 'green', 'yellow'];


function draw() {
    current.forEach(el => {
        squares[el + current_position].classList.add('game_piece')
    });
}



function remove() {
    current.forEach(el => {
        squares[el + current_position].classList.remove('game_piece')
    });
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

        displayShape();
        scorekeeping();
        draw();
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
            current_position ++;
        }
        
        draw();
    }
}

function moveRight() {
    if(!game_over) {
        remove();
        const right_edge = current.some(index => (current_position + index) % width === width -1);
        
        if(!right_edge) {current_position +=1}
        if(current.some(index => squares[current_position + index].classList.contains('bedrock'))) {
        current_position -=1
        }
        
        draw();
    }
  }

function rotate() {
    if(!game_over) {
        remove();
        
        const left_edge = current.some(index => (current_position + index) % width === 0);
        const right_edge = current.some(index => (current_position + index) % width === width -1);
        
        if(!left_edge&&!right_edge){current_rotation ++;}
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
    
    let score_multiplier = 0;
    
    for(let i=0; i<199; i+=width) {
       const row = [i, i+1, i+2, i+3, i+4, i+5, i+6, i+7, i+8, i+9];

       if(row.every(el => squares[el].classList.contains('bedrock', 'gamepiece'))) {
        
        score_multiplier++;
        row.forEach(el => {squares[el].classList.remove('bedrock', 'game_piece');});

        const squares_removed = squares.splice(i, width); 
        squares = squares_removed.concat(squares);
        squares.forEach(el => grid.appendChild(el));
       }
    }
    
    switch(score_multiplier) {
        case 1: score += 10;
        break;
        case 2: score += 30;
        break;
        case 3: score += 50;
        break;
        case 4: score += 80;
        break;
    }
    
    score_display.innerHTML = score;
}

function gameOver() {
    if(current.some(el => squares[current_position + el].classList.contains('bedrock'))) {
        endscore.innerHTML = 'GAME OVER.'+ '<br>' + 'Your scored ' + score + ' points!';
        
        clearInterval(timerId);
        game_over = true;
        checkScore();
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

