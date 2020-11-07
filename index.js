// Main file
// Initialize global variables
let W = window.innerWidth
let H = window.innerHeight
let borderW = 100
let borderH = 100
let biller = []
let ents = {
    bullets : [],
    explosions : []
}

const DEAD = 0x123456789


// Function for updating entities (duh)
function updateEntities() {
    // Split these into two, as I think doing them both at once for each beetle could lead to dead beetles being alive for an extra frame, probably not worth splitting the loop for that but w/e I'm tired - H)


    for (let i in biller){
        biller[i].update()
        // for(let j = 0; j < biller[i].bulletarray.length; j++){
        //     biller[i].bulletarray[j].update();
        //     biller[i].bulletarray[j].render();
        // }
    }

    for (let i of Object.keys(ents)) {
        for (let j in ents[i]) {
            let rcode = ents[i][j].update()

            if (rcode == DEAD) {
                ents[i].splice(j,1)
            }
        }
    }

    for (let i of Object.keys(ents)) {
        for (let j in ents[i]) {
            ents[i][j].render()
        }
    }

    for(let i in biller){
        biller[i].render()
    }

}

let mgr;

function setup() {
    createCanvas(W, H)
    background(0)

    mgr = new SceneManager()

    mgr.addScene(Game)
    mgr.addScene(Menu)
    mgr.showScene(Menu)
}

function draw() {
    mgr.draw()
}

function Menu() {
    this.setup = function() {}
    this.draw = function() {}
}

function Game() {

    this.setup = function () {
        createCanvas(W, H)
        background(0)
        angleMode(DEGREES)

        for (let i = 0; i < 6; i++){
            biller[i] = new Bille(random(borderW, W-borderW), random(borderH, H-borderH), 5, 5, 30, 10, 10, 50, 500, 200, 60, 5, 2, i%2, 1)
        }
    }

    // Draw function (runs in a loop)
    this.draw = function () {
        background(color(50,150,100))
        updateEntities()
    }
}
