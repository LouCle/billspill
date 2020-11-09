// Main file
// Initialize global variables
let W = window.innerWidth
let H = window.innerHeight
let borderW = 100
let BILLE_AMOUNT = 6
let borderH = 100
let biller = []
let dnas = [] // dna, where index corresponds to team
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

function keyPressed() {
    mgr.handleEvent("keyPressed")
}

function Menu() {
    this.setup = function() {


    }

    this.menu = ["Evolution", "Skirmish", "Test"]
    this.sel = 0

    

    this.draw = function() {

        background(color(20,120,100))
        textSize(100)
        textAlign(CENTER)
        fill(0)
        text("Billspill", W/2, H/3)
        fill(255)
        text("Billspill", W/2-3, H/3-3)

        textSize(50)
        textAlign(LEFT)

        for (let opt in this.menu) {
            text( ((this.sel == opt) ? "▶ " : "  ") + this.menu[opt], W/3, 2*H/3 + opt*50)
        }

    }

    this.keyPressed = function() {
        console.log(keyCode)
        if (keyCode === DOWN_ARROW) {
            this.sel = (this.sel+1) % this.menu.length
        }
        if (keyCode === UP_ARROW) {
            this.sel = (this.sel-1 < 0) ? this.menu.length-1 : this.sel-1
        }

        // space click
        if (keyCode == 32) {
            if (this.sel == 0) {
                this.sceneManager.showScene(Betting)
            }
        }
    }
}

// scene for each teams respective evolution tree, and betting
function Betting() {

    let nodes = []

    let sel = 0;

    this.setup = function() {
        background(color(20,120,100))

        // if it's the first time you're loading the game, it's as if dnas[] is empty, so we make two basic DNAs for each team
        if (dnas.length == 0) {
            // for now, only 2 teams
            for (let i = 0; i < 2; i++) {
                dnas.push(new BilleDNA([{"iq" : 10}, {"size" : 5}, {"bulletspeed" : 10}]))
            }
        }

        // here we create nodes to be displayed. A node is basically just an upgrade from BilleDNA.upgradetree
        for (let dna_for_team in dnas) {

            // var for parent index
            let p = 0
            for (let upgrade in dnas[dna_for_team].upgradetree) {

                // create parent node, if it's the first upgrade (mutation, evolution whatever)
                if (upgrade == 0) {
                    nodes.push(new Node(100 + dna_for_team * W/2, H/4, null, dna_for_team, dnas[dna_for_team].upgradetree[upgrade]))

                    // since the last pushed node is a parent, set p to that index
                    p = nodes.length - 1
                }

                /* create child nodes, if it's a subsequent upgrade (yada). Form the Node class,
                   its position is given from its parent i.e. nodes[p] */
                if (upgrade > 0) {
                    nodes.push(new Node(null, null, nodes[p], dna_for_team, dnas[dna_for_team].upgradetree[upgrade]))
                }

            }
        }

        // for testing
        console.log(nodes)

        
    }

    this.draw = function() {
        background(color(20,120,100))

        noStroke()
        fill(color('rgba(100,100,100,0.5)'))
        rect(sel*W/2, 0, W/2, H)

        for (let node of nodes) {
            node.render()
        }
    }

    this.keyPressed = function() {
        

        // space click to go to the fight
        // needs to be added: ability to actually bet on a team and so on
        if (keyCode == 32) {
            this.sceneManager.showScene(Game)
        }

        if (keyCode == RIGHT_ARROW) {
            sel = (sel+1) % 2
        }
        if (keyCode == LEFT_ARROW) {
            sel = (sel+1) % 2
        }
    }
}

// scene for beetle teams actually fighting
function Game() {

    this.setup = function () {
        background(0)
        angleMode(DEGREES)

        for (let i = 0; i < BILLE_AMOUNT; i++) {
            // create BILLE_AMOUNT of biller, using the dna of the respective team
            biller[i] = new Bille(random(borderW, W-borderW), random(borderH, H-borderH), dnas[i%2], 5, 5, 30, 10, 10, 50, 500, 200, 60, 5, 2, i%2, 1)
        }
    }

    // Draw function (runs in a loop)
    this.draw = function () {
        background(color(50,150,100))
        updateEntities()
    }
}
