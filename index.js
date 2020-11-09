// Main file
// Initialize global variables
let W = window.innerWidth
let H = window.innerHeight
let borderW = 100
let BILLE_AMOUNT = 6
let borderH = 100
let biller = [[],[]]
let dnas = [] // dna, where index corresponds to team
let ents = {
    bullets : [],
    explosions : []
}

let ds2 = (x1,y1,x2,y2) => (x2-x1)**2+(y2-y1)**2

const DEAD = 0x123456789

// Function for updating entities (duh)
function updateEntities() {
    // Split these into two, as I think doing them both at once for each beetle could lead to dead beetles being alive for an extra frame, probably not worth splitting the loop for that but w/e I'm tired - H)

    for (let team in biller) {
        for (let i in biller[team]){
            let rcode = biller[team][i].update()
            if (rcode == DEAD) {
                biller[team].splice(i, 1)
            }
        }

    }

    for (let i of Object.keys(ents)) {
        for (let j in ents[i]) {
            let rcode = ents[i][j].update()

            if (rcode == DEAD) {
                ents[i].splice(j,1)
            }
        }
    }
    
    for (let team in biller) {
        for(let i in biller[team]){
            let bille = biller[team][i]
            bille.render()

            // health
            noStroke()
            fill(team ? 20 : 235)
            textSize(30)
            text(i, bille.pos.x, bille.pos.y+40)
        }
    }

    for (let i of Object.keys(ents)) {
        for (let j in ents[i]) {
            ents[i][j].render()
        }
    }
}

let mgr

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

    this.balls = []

    this.menu = ["Evolution", "Skirmish", "Test"]
    this.sel = 0


    this.draw = function() {

        background(color(20,20,20))

        // some background animation
        if (frameCount % 5 == 0) this.balls.push({x:-100,y:random(0,H), vx:random(5,10), vy:random(-5,5)})
        
        noStroke()
        for (let i = 0; i < this.balls.length; i++) {
            let ball = this.balls[i]
            let d = sqrt((ball.x-W/2)**2+(ball.y-H/2)**2)
            let r = 0.2*ball.y -0.01*d
            fill(map(d, 0, W+H, 0, 200))
            ellipse(ball.x,ball.y,r)
            fill(map(d, 0, W+H, 0, 255))
            ellipse(ball.x+r/5,ball.y,r)
            ball.x+=ball.vx
            ball.y+=ball.vy
            if (ball.x > W+r) {
                this.balls.splice(i,1)
            } 
          
        }

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
        background(color(20,20,20))

        // if it's the first time you're loading the game, it's as if dnas[] is empty, so we make two basic DNAs for each team
        if (dnas.length == 0) {
            // for now, only 2 teams
            for (let i = 0; i < 2; i++) {
                dnas.push(new BilleDNA([{"iq" : 10}, {"size" : 5}, {"bulletspeed" : 10}]))
            }
        }

        // here we create nodes to be displayed. A node is basically just an upgrade from BilleDNA.upgradetree
        for (let dna_for_team in dnas) {
            nodes.push([]) // create an array of nodes for each team
            for (let upgrade in dnas[dna_for_team].upgradetree) {
                nodes[dna_for_team].push(new Node(W, H, dna_for_team, dnas[dna_for_team].upgradetree[upgrade]))
            }
        }

        // for testing
        console.log(nodes)

        
    }

    this.draw = function() {
        background(color(20,20,20))

        noStroke()
        fill(235)
        rect(0, 0, W/2, H)
        fill(20)
        rect(W/2, 0, W/2, H)

        for (let team in nodes) {
            for (let node in nodes[team]) {
                nodes[team][node].render(node, nodes[team].length)
            }
        }

        noStroke()
        textSize(W/7)
        textFont("Consolas")
        textAlign(CENTER)
        fill(sel==0?20:235)
        text("BET", W/4+sel*W/4*2, H-H/6)
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
            biller[i%2].push(new Bille(random(borderW, W-borderW), random(borderH, H-borderH), dnas[i%2], i%2))
        }
    }

    // Draw function (runs in a loop)
    this.draw = function () {
        background(color(50,50,50))
        updateEntities()
    }
}
