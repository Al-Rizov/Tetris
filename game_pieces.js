//Piece squares to be colored on the grid
const width = 10;
const displayWidth = 4;
const grid = document.querySelector('.grid');
const mini_grid = document.querySelector('.mini_grid');
let squares;

createBlocks(grid, 199);
createBlocks(mini_grid, 15);


function createBlocks(el, num) {
    
    for(let i=0; i<=num; i++) {
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

