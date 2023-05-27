const nameBoard = document.querySelector('.names');
const scoreBoard = document.querySelector('.scores');
const enterNameButton = document.getElementById('enterNameButton');
const nameSpace = document.getElementById('nameSpace');
const overlay = document.querySelector('.overlay');
const modal = document.querySelector('.modal');
const default_NamesList = ['Kevin','Barney','Fred','Double-D','Alf','Mr. Slate','Teddy R.','Marvin','Dexter','Jack'];
const default_ScoresList = [1000, 720, 670, 620, 400, 180, 120, 90, 80, 50];

let playerName ='';
let namesList = [];
let scoresList = [];


/*
    Get player to enter their own name.
*/

checkStorage();
writeOnBoard(nameBoard, namesList);
writeOnBoard(scoreBoard, scoresList);


enterNameButton.addEventListener('click', getName);

function getName() {
    
    playerName = nameSpace.value.trim();

    const newEntry = scoresList.findIndex((oldScore) => oldScore < score);

    namesList.splice(newEntry, 0, playerName)
    namesList.pop();
    scoresList.splice(newEntry, 0, score);
    scoresList.pop();

    localStorage.clear();
    createStorageList(namesList, scoresList);

    for(i=0; i<10; i++){nameBoard.removeChild(nameBoard.firstChild)};
    for(i=0; i<10; i++){scoreBoard.removeChild(scoreBoard.firstChild)};

    writeOnBoard(nameBoard, namesList);
    writeOnBoard(scoreBoard, scoresList);

    overlay.classList.add('inactive');
    modal.classList.add('inactive');
}


//checks whether LS is empty and default-lists must be inserted, then updates regular lists.
function checkStorage(){
    if(localStorage.length === 0) {
        createStorageList(default_NamesList, default_ScoresList);
        updateLists();
    } else {
        updateLists();
    }
}

//updates lists using LS-lists.
function updateLists() {
    for(i=0; i<10; i++) {
            namesList.push(localStorage.getItem('player_'+i));
            scoresList.push(localStorage.getItem('player_' + i + '_score'));
        }
    }


//iterates through arrays and creates the localStorage list.
function createStorageList(names, scores){
    for(i=0; i<10; i++) {
        localStorage.setItem('player_' + i, names[i]);
        localStorage.setItem('player_' + i + '_score', scores[i]);
    }
}

//fills out the HTML lists with the arrays.
function writeOnBoard(board, entries) {
    for(i=0; i<10; i++) {
        const entry = document.createElement('li');
        board.appendChild(entry);
        entry.textContent= (typeof(entries[i]) === 'string' ? entries[i].toUpperCase() : entries[i]);
    }
}

//updates lists, LS-lists and boards, when a new highscore is detected.
function checkScore(){
    
    if(score > scoresList[9]) {
        overlay.classList.remove('inactive');
        modal.classList.remove('inactive');
    };
};

