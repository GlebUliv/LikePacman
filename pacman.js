//############################### DATA ##################################
// game map in memory
// legend of map
const EMPTY = 0;
const PACMAN = 1;
const CHERRY = 2;
const BOMB = 3;

//coords of PACMAN
let pac_r = 0
let pac_c = 0
let pac_d = "right"
let pac_hp = 100
let pac_stat = ""


let map = [
    [1, 0, 0, 0, 0, 0, 3, 0, 0, 0],
    [0, 2, 0, 0, 0, 0, 0, 0, 2, 0],
    [0, 0, 3, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 3, 0, 2, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 2, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 2, 0, 0]
]

//################################ FUNCTIONS(LOGIC) #####################################

// show map
function renderMap(){
    for(let row = 0; row < 10; row++){
        for (let col = 0; col < 10; col++){
            renderCell( map[row][col] )
        }
    }
}

function renderStatus(){
    let hp = document.getElementById('status')
    hp.innerHTML = `
        <p>PACMAN'S Health is ${pac_hp}</p>
    `
}

function clearMap(){
    let div_map = document.getElementById('map')
    while(div_map.children.length>0){
        div_map.removeChild(div_map.children[0])
    }
}

function renderCell( what ){
    let div_map = document.getElementById('map')
    let div = document.createElement('div')
    switch(what){
        case 1:
            div.className = `pacman ${pac_d} ${pac_stat}`
            break;
        case 2:
            div.className = 'cherry'
            break;
        case 3:
            div.className = 'bomb'
            break;
    }
    div_map.appendChild(div)
}




function action(){
    map[pac_r][pac_c] = 0
    switch(event.code){
        case 'ArrowUp':
            moveUp();
            break;
        case 'ArrowDown':
            moveDown();
            break;
        case 'ArrowLeft':
            moveLeft();
            break;
        case 'ArrowRight':
           moveRight();
            break;
    }
    map[pac_r][pac_c] = 1
    clearMap()
    renderMap()
    renderStatus()
}


// function of movements

function checkBomb(){
    if (map[pac_r][pac_c] == 3) {
        pac_hp -= 50
        pac_stat = 'exploding'
        setTimeout(function(){
            pac_stat = ""
            clearMap()
            renderMap()
        },2000)
    }
}

function checkCerry(){
    if (map[pac_r][pac_c] == 2) {
        pac_hp += 10
        pac_stat = 'aura'
        setTimeout(function () {
            pac_stat = ""
            clearMap()
            renderMap()
        }, 2000)
    }
}

function moveRight(){
    pac_d = "right"
    if( pac_c < 9 ){
    pac_c++
    checkBomb()
    checkCerry()
    }
}

function moveLeft(){
    pac_d = "left"
    if( pac_c > 0){
    pac_c--
    checkBomb()
    checkCerry()
    }
}

function moveDown() {
    pac_d = "down"
    if(pac_r < 9 ){
    pac_r++
    checkBomb()
    checkCerry()
    }
}

function moveUp() {
    pac_d = "up"
    if (pac_r > 0 ){
    pac_r--
    checkBomb()
    checkCerry()
    }
}

//-------------------------------------------

clearMap()
renderMap()
renderStatus()
document.body.onkeydown = action;