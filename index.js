let W = window.innerWidth
let H = window.innerHeight
let biller = []


class Bille {
    constructor(x, y, mvel, mrot, fspeed, r, iq, eyes, mouth, team) {
        this.pos = createVector(x,y)
        this.vel = createVector(0,0)
        this.rot = 0
        this.mvel = mvel
        this.mrot = mrot
        this.fspeed = fspeed //firing speed
        this.r = r
        this.iq = iq //noget med ai
        this.eyes = eyes
        this.mouth = mouth
        this.team = 0
    }

    update() {
        
    }

    render() {

    }
    
}


function setup() {
    createCanvas(window.innerWidth, window.innerHeight)
    background(0)
    
}

function draw() {
    background(0)
    updateEntities()
}
